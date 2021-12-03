import get from 'lodash.get';
import Address from '@hapi/address';
import { RequestHandlerContext, KibanaRequest } from 'kibana/server';
import { KibanaResponseFactory } from '../../../../../src/core/server';
import { isSuperuser } from '../../lib/isSuperuser';
import { logger } from '../../lib/logger';
import { client } from '../../lib/elastic';
import { getConfig } from '../../lib/config';
import { security } from '../../lib/security';
import Frequency from '../../lib/services/frequency';
import { socket } from '../../ws';

async function getTaskHistory(id: number, size: number = 10000) {
  try {
    const { body: histories } = await client.search({
      index: getConfig('historyIndex'),
      timeout: '30s',
      body: {
        size: size,
        sort: {
          startTime: {
            order: 'desc',
          },
        },
        query: {
          bool: {
            must: [
              {
                match: {
                  taskId: id,
                },
              },
            ],
          },
        },
      },
    });

    const hits = get(histories, 'hits.hits');
    return hits.map(({ _source }) => _source);
  } catch (error) {
    return [];
  }
}

async function getTasks(spaceName?: string) {
  let query;

  if (spaceName) {
    query = {
      bool: {
        must: [
          {
            match: {
              space: spaceName,
            },
          },
        ],
      },
    };
  }

  let tasksList;
  try {
    const { body: data } = await client.search({
      index: getConfig('index'),
      timeout: '30s',
      body: {
        size: 10000,
        query,
      },
    });

    tasksList = get(data, 'hits.hits');
  } catch (err) {
    logger.error(err);
    return [];
  }

  const tasks = [];
  for (let i = 0; i < tasksList.length; i += 1) {
    const id = get(tasksList[i], '_id');
    const {
      dashboardId,
      frequency,
      emails,
      createdAt,
      sentAt,
      runAt,
      print,
      space,
      enabled,
    } = get(tasksList[i], '_source');

    let history;
    try {
      const { body: histories } = await client.search({
        index: getConfig('historyIndex'),
        timeout: '30s',
        body: {
          size: 1,
          sort: {
            startTime: {
              order: 'desc',
            },
          },
          query: {
            bool: {
              must: [
                {
                  match: {
                    taskId: id,
                  },
                },
              ],
            },
          },
        },
      });

      const hits = get(histories, 'hits.hits');
      if (hits.length > 0) {
        // eslint-disable-next-line no-underscore-dangle
        history = hits[0]._source;
      }
    } catch (error) {
      history = null;
    }

    tasks.push({
      id,
      dashboardId,
      exists: true,
      space,
      reporting: {
        frequency,
        emails,
        createdAt,
        sentAt,
        runAt,
        print,
        enabled,
      },
      history,
    });
  }

  return tasks;
}

async function getTaskById(id: number, historySize: number = 1000) {
  let task = { id };
  try {
    const { body } = await client.get({
      index: getConfig('index'),
      id,
    });
    task = {
      ...task,
      ...get(body, '_source'),
    };
  } catch (error) {
    return {};
  }

  const {
    dashboardId,
    frequency,
    emails,
    createdAt,
    sentAt,
    runAt,
    print,
    enabled,
    space,
  } = task;

  const history = await getTaskHistory(id, historySize);
  return {
    id,
    dashboardId,
    exists: true,
    space,
    reporting: {
      frequency,
      emails,
      createdAt,
      sentAt,
      runAt,
      print,
      enabled,
    },
    history: history?.[0],
  };
}

export async function getBySpace(context: RequestHandlerContext, req: KibanaRequest, res: KibanaResponseFactory) {
  const { spaceId } = context.core?.savedObjects?.client;

  logger.info(`Get tasks from [${spaceId}] space`);
  const tasks: Array<object> = await getTasks(spaceId);

  return res.ok({
    body: {
      statusCode: 200,
      message: null,
      data: { tasks },
    },
  });
};

export async function getAll(context: RequestHandlerContext, req: KibanaRequest, res: KibanaResponseFactory) {
  const isAdmin = isSuperuser({ security, req });
  if (!isAdmin) { return res.forbidden(); }

  logger.info('Get all tasks');
  const tasks: Array<object> = await getTasks();

  return res.ok({
    body: {
      statusCode: 200,
      message: null,
      data: { tasks },
    },
  });
};

export async function store(context: RequestHandlerContext, req: KibanaRequest, res: KibanaResponseFactory) {
  const { body } = req;
  const frequency = new Frequency(body.frequency);

  if (!frequency.isValid()) {
    return res.badRequest({ body: 'Invalid frequency' });
  }
  
  const { spaceId } = context.core?.savedObjects?.client;

  const now = new Date();
  body.createdAt = now;
  body.updatedAt = now;
  body.sentAt = null;
  body.runAt = frequency.startOfnextPeriod(now);
  body.space = spaceId;

  let taskId;  
  try {
    const res = await client.index({
      index: getConfig('index'),
      refresh: true,
      body,
    });
    taskId = get(res, 'body._id');
  } catch (err) {
    logger.error(err);
    return res.customError({ statusCode: 500, body: err });
  }

  const task = await getTaskById(taskId, 1);

  return res.ok({
    body: {
      statusCode: 200,
      message: 'Task created successfully',
      data: { task },
    },
  });
}

export async function update(context: RequestHandlerContext, req: KibanaRequest, res: KibanaResponseFactory) {
  const now = new Date();
  const { body, params } = req;
  const { taskId: id } = params;
  const frequency = new Frequency(body.frequency);

  if (!frequency.isValid()) {
    return res.badRequest({ body: 'Invalid frequency' });
  }

  const doc = {
    ...body,
    runAt: frequency.startOfnextPeriod(now),
    updatedAt: now,
  };

  try {
    await client.update({
      index: getConfig('index'),
      id,
      refresh: true,
      body: { doc },
    });
  } catch (err) {
    logger.error(err);
    return res.customError({ statusCode: 500, body: err });
  }

  const task = await getTaskById(id, 1);

  return res.ok({
    body: {
      statusCode: 200,
      message: 'Task updated successfully',
      data: { task },
    },
  });
};

export async function deleteTask(context: RequestHandlerContext, req: KibanaRequest, res: KibanaResponseFactory) {
  const { taskId } = req.params;

  try {
    await client.delete({
      id: taskId,
      refresh: true,
      index: getConfig('index'),
    });
  } catch (err) {
    logger.error(err);
    return res.customError({ statusCode: 500, body: err });
  }

  try {
    await client.deleteByQuery({
      index: getConfig('historyIndex'),
      refresh: true,
      body: {
        query: {
          match: {
            taskId,
          },
        },
      },
    });
  } catch (err) {
    logger.error(err);
    return res.customError({ statusCode: 500, body: err });
  }

  return res.ok({
    body: {
      statusCode: 200,
      message: 'Task deleted successfully',
      data: { taskId },
    },
  });
};

export async function history(context: RequestHandlerContext, req: KibanaRequest, res: KibanaResponseFactory) {
  const { taskId: id } = req.params;
  
  let history = [];
  try {
    const { body: data } = await client.search({
      index: getConfig('historyIndex'),
      timeout: '30s',
      body: {
        size: 10000,
        sort: {
          startTime: {
            order: 'desc',
          },
        },
        query: {
          bool: {
            must: [
              {
                match: {
                  taskId: id,
                },
              },
            ],
          },
        },
      },
    });

    const hits = get(data, 'hits.hits');

    if (hits) {
      history = hits.map((historyItem) => {
        const { _source: historySource, _id: historyId } = historyItem;

        return {
          id: historyId,
          ...historySource,
        };
      });
    }
  } catch (err) {
    logger.error(err);
    return res.customError({ statusCode: 500, body: err });
  }

  return res.ok({
    body: {
      statusCode: 200,
      message: 'History loaded successfully',
      data: { history },
    },
  });
};

export async function download(context: RequestHandlerContext, req: KibanaRequest, res: KibanaResponseFactory) {
  const { taskId } = req.params;
  
  let task;
  try {
    const { body } = await client.get({ id: taskId, index: getConfig('index') });
    task = body;
  } catch (e) {
    logger.error(e);
    return res.notFound({ body: `Cannot find task ${taskId}` });
  }

  if (!task) {
    return res.notFound({ body: `Cannot find task ${taskId}` });
  }

  const { _source: source } = task;
  const frequencyData = getConfig('frequencies').find((freq) => freq.value === source.frequency);

  if (!frequencyData) {
    return res.customError({ statusCode: 500, body: `No frequency data found for task ${taskId}` });
  }

  try {
    const { generateReport } = require('../../lib/services/reporting');
    generateReport(task);
  } catch (err) {
    logger.error(err);
    return res.customError({ statusCode: 500, body: err });
  }

  return res.ok({
    body: {
      statusCode: 200,
      message: 'Launch of the generation of the reporting task',
      data: { task: await getTaskById(taskId, 1) },
    },
  });
};

export async function validEmail(context: RequestHandlerContext, req: KibanaRequest, res: KibanaResponseFactory) {
  const { email } = req.body;

  if (!Address.email.isValid(email)) {
    return res.badRequest();
  }

  return res.ok({
    body: {
      statusCode: 200,
      message: 'Email valid',
      data: {},
    },
  });
};
