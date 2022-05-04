import formatDate from 'date-fns/format';
import { enGB } from 'date-fns/locale';
import { getConfig } from '../config';
import { logger } from '../../lib/logger';
import { client } from '../../lib/elastic';
import { getDashboard } from './dashboard';
import Frequency from './frequency';
import reporter from './puppeteer';
import { generateMail, sendMail } from '../mail';
import { socket } from '../../ws';

const index = getConfig('index');
const historyIndex = getConfig('historyIndex');
const kibana = getConfig('kibana');
const sender = getConfig('sender');
const email = getConfig('email');
const frequencies = getConfig('frequencies');

async function getTasks() {
  const res = await client.search({
    index,
    size: 10000,
    body: {
      query: {
        bool: {
          filter: [
            {
              term: {
                enabled: true,
              },
            },
          ],
        },
        range: {
          runAt: {
            lte: new Date(),
          },
        },
      },
    },
  });

  return (res?.body?.hits?.hits) || [];
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class HistoryEntry {
  constructor(taskId) {
    this.id = null;
    this.startTime = null;
    this.endTime = null;

    this.history = {
      taskId,
      executionTime: 0,
      status: 'pending',
      logs: [],
      startTime: new Date(),
      endTime: null,
    };
  }

  setStatus(str) {
    this.history.status = str;
    return this;
  }

  log(type, message) {
    this.history.logs.push({ date: new Date(), type, message });

    if (typeof logger[type] === 'function') {
      logger[type](`${this.history.taskId}: ${message}`);
    }
    return this;
  }

  startTimer() {
    this.startTime = process.hrtime.bigint();
  }

  end() {
    const endTime = process.hrtime.bigint();
    this.startTime = this.startTime || endTime;
    this.history.endTime = new Date();
    this.history.executionTime = Math.floor(Number.parseInt(endTime - this.startTime, 10) / 1e6);

    if (this.history.status !== 'error') {
      this.history.status = 'completed';
    }

    this.log('info', `task terminated in ${this.history.executionTime}ms`);
    return this;
  }

  async save() {
    try {
      const result = await client.index({
        id: this.id,
        index: historyIndex,
        refresh: true,
        body: this.history,
      });

      if (!this.id) {
        const { body = {} } = result || {};
        const { _id: newID } = body;
        this.id = newID;
      }
    } catch (e) {
      this.log('error', `failed to create or update history entry in index (${historyIndex})`);
      logger.error(e);
    }
  }
}

/**
 * Run a task : generate a PDF and send it by mail
 * @param {Object} task the task to run
 */
export async function generateReport(task) {
  const { _id: taskId, _source: taskSource } = task;

  const history = new HistoryEntry(taskId);
  const fullDashboardId = `${taskSource.space}:${taskSource.dashboardId}`;
  let dashboard;

  history.log('info', `fetching dashboard data (id: ${fullDashboardId})`);

  // eslint-disable-next-line no-await-in-loop
  await history.save();
  socket.getIo().to(taskSource.space).emit('updateHistory', taskId);

  try {
    // eslint-disable-next-line no-await-in-loop
    dashboard = await getDashboard(taskSource.dashboardId, taskSource.space);
  } catch (e) {
    history.setStatus('error');
    history.log('error', `dashboard (id: ${fullDashboardId}) not found or removed`);
    logger.error(e);
    
    // eslint-disable-next-line no-await-in-loop
    await history.end().save();
    socket.getIo().to(taskSource.space).emit('updateHistory', taskId);
    return;
  }

  history.log('info', 'adding task to queue');
  await history.save();

  let pdf;
  try {
    // eslint-disable-next-line no-await-in-loop
    pdf = await new Promise((resolve, reject) => {
      reporter.addTask(taskSource)
        .on('start', async () => {
          history.startTimer();
          history.setStatus('ongoing');
          history.log('info', 'task has been started');
          history.save().then(() => socket.getIo().to(taskSource.space).emit('updateHistory', taskId));
        })
        .on('complete', resolve)
        .on('error', reject);
    });
  } catch (e) {
    history.setStatus('error');
    history.log('error', 'failed to generate PDF');
    logger.error(e);

    // eslint-disable-next-line no-await-in-loop
    await history.end().save();
    socket.getIo().to(taskSource.space).emit('updateHistory', taskId);
    return;
  }

  logger.info(`${taskId}: sending mail`);

  const dashboardUrl = `${kibana.external}/${taskSource.space ? `s/${taskSource.space}/` : ''}app/kibana#/dashboard/${taskSource.dashboardId}`;
  const dashboardTitle = (dashboard && dashboard.dashboard && dashboard.dashboard.title) || '';

  const frequency = frequencies.find((f) => f.value === taskSource.frequency);
  const frequencyText = (frequency && frequency.text && frequency.text.toLowerCase()) || 'N/A';

  const now = new Date();
  let emailSent = false;
  let receivers = taskSource.emails;

  if (!Array.isArray(taskSource.emails)) {
    receivers = [receivers];
  }

  for (let i = 0; i < email.attempts; i += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await sendMail({
        from: sender,
        to: receivers.join(','),
        subject: `Reporting ${getConfig('applicationName')} [${taskSource.print ? 'OI - ' : ''}${formatDate(now, 'dd/MM/yyyy')}] - ${dashboardTitle}`,
        attachments: [
          {
            contentType: 'application/pdf',
            filename: `reporting_${getConfig('applicationName').toLowerCase()}_${taskSource.dashboardId}_${formatDate(now, 'dd-MM-yyyy')}.pdf`,
            content: pdf,
            cid: task.dashboardId,
          },
        ],
        ...generateMail('reporting', {
          applicationName: getConfig('applicationName'),
          template: getConfig('email.template'),
          contact: getConfig('contact'),
          appUrl: getConfig('appUrl'),
          network: getConfig('network'),
          reportingDate: formatDate(now, 'PPPP', { locale: enGB }),
          title: dashboardTitle,
          frequency: frequencyText,
          dashboardUrl,
          optimizedForPrinting: taskSource.print,
        }),
      });
      emailSent = true;
      history.log('info', 'the email was sent');
  
      break;
    } catch (e) {
      history.log('warn', `failed to send email (attempts: ${(i + 1)})`);
      logger.error(e);

      // eslint-disable-next-line no-await-in-loop
      await wait(email.interval * (i + 1));
    }
  }

  if (!emailSent) {
    history.setStatus('error');
    history.log('error', 'error when generating or sending emails');
  }

  const sentAt = new Date();
  const freq = new Frequency(taskSource.frequency);

  if (!freq.isValid()) {
    history.setStatus('error');
    history.log('error', 'task frequency is invalid, cannot schedule next run');
  }

  try {
    // eslint-disable-next-line no-await-in-loop
    await client.update({
      index,
      id: taskId,
      body: {
        doc: {
          ...taskSource,
          sentAt,
          runAt: freq.isValid() ? freq.startOfnextPeriod(sentAt) : null,
        },
      },
    });
  } catch (e) {
    history.setStatus('error');
    history.log('error', `Failed to update task data in index (${index})`);
    logger.error(e);
  }
  // eslint-disable-next-line no-await-in-loop
  await history.end().save();
  socket.getIo().to(taskSource.space).emit('updateHistory', taskId);
}

export async function generatePendingReports() {
  logger.info('Looking for pending tasks');
  let tasks;

  try {
    tasks = await getTasks();
  } catch (e) {
    logger.error('Cannot fetch tasks');
    return;
  }

  logger.info(`${tasks.length} pending tasks found`);

  tasks.forEach((task) => {
    generateReport(task)
      .catch((e) => {
        logger.error(`${task.id}: failed to generate report`);
        logger.error(e);
      });
  });
}
