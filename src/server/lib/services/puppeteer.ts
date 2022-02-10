import puppeteer from 'puppeteer';
import * as path from 'path';
import fs from 'fs-extra';
import { EventEmitter } from 'events';
import formatDate from 'date-fns/format';
import { enGB, th } from 'date-fns/locale';
import { getConfig } from '../config';
import { getDashboard, buildDashboardUrl } from './dashboard';
import Frequency from './frequency';
import { logger } from '../logger';

const elastic = getConfig('elastic');
const kibana = getConfig('kibana');
const puppeteerTimeout = getConfig('puppeteerTimeout');
const logos = getConfig('logos');

// Useful element classes:
// https://github.com/elastic/kibana/blob/7.14/x-pack/plugins/reporting/server/lib/layouts/index.ts#L32-L37
const selectors = {
  container: '[data-shared-items-container]',
  renderComplete: '[data-shared-item]',
  itemCountsAttribute: 'data-shared-items-count',
};

const assetsDir = path.resolve(__dirname, '..', '..', 'assets');

function loadStyles() {
  return fs.readFile(path.resolve(assetsDir, 'css', 'preserve_layout.css'), 'utf8');
}

function loadLogos() {
  return Promise.all(
    logos.map(async (l) => {
      const logo = { ...l };

      if (logo.link === 'kibana') {
        logo.link = `${kibana.external}/`;
      }
      if (logo.file) {
        logo.base64 = await fs.readFile(path.resolve(assetsDir, logo.file), 'base64');
      }

      return logo;
    }),
  );
}

function insertStyles(page, css) {
  return page.evaluate((styles) => {
    const styleNode = document.createElement('style'); // eslint-disable-line no-undef
    styleNode.type = 'text/css';
    styleNode.innerHTML = styles;
    document.head.appendChild(styleNode); // eslint-disable-line no-undef
  }, css);
}

function positionElements(page, viewport) {
  return page.evaluate((vp, select) => {
    // eslint-disable-next-line no-undef
    const visualizations = document.querySelectorAll(`${select.container} .react-grid-item`);
    const pageHeight = vp.height - vp.margin.top - vp.margin.bottom;

    if (visualizations && visualizations.length) {
      // eslint-disable-next-line no-undef
      const grid = document.querySelector(select.container);
      grid.style.height = `${pageHeight * (visualizations.length - 1)}px`;
    }

    visualizations.forEach((visualization, index) => {
      visualization.style.setProperty('top', `${(pageHeight) * index}px`, 'important');
    });
  }, viewport, selectors);
}

async function waitForCompleteRender(page, visCount) {
  // Wait for all visualizations to be in the DOM
  await page.waitForFunction(
    (selector, numberOfVis) => {
      // eslint-disable-next-line no-undef
      const { length } = document.querySelectorAll(selector);
      return length >= numberOfVis;
    },
    {}, // options
    selectors.renderComplete,
    visCount,
  );

  await page.evaluate((select) => {
    // eslint-disable-next-line no-undef
    const allVis = document.querySelectorAll(select.renderComplete);
    const renderedTasks = [];

    function waitForRender(visualization) {
      return new Promise((resolve) => {
        visualization.addEventListener('renderComplete', () => { resolve(); });
      });
    }

    function waitForRenderDelay() {
      // Time to wait for visualizations that are not evented (official ones are all evented)
      return new Promise((resolve) => setTimeout(resolve, 3000));
    }

    allVis.forEach((visualization) => {
      const isRendered = visualization.getAttribute('data-render-complete');

      if (isRendered === 'disabled') {
        renderedTasks.push(waitForRenderDelay());
      } else if (isRendered === 'false') {
        renderedTasks.push(waitForRender(visualization));
      }
    });

    return Promise.all(renderedTasks);
  }, selectors);
}

function changeTables(page) {
  return page.evaluate(async () => {
    function delay(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    const embPanelContent = Array.from(document.querySelectorAll('.embPanel__content'))
      .filter((el) => el.querySelector('.euiDataGridHeader'));
    await delay(1000);

    embPanelContent.forEach((embPanel) => {
      const tableHeader = embPanel.querySelector('.euiDataGridHeader');

      const table = document.createElement('table');
      table.style.setProperty('border-collapse', 'collapse');
      table.style.setProperty('width', '100%', 'important');
      table.style.setProperty('max-height', '100%', 'important');
      table.style.setProperty('font-size', '14px');

      const thead = document.createElement('thead');
      thead.style.setProperty('text-align', 'center');
      thead.style.setProperty('background-color', '#eee');
      thead.style.setProperty('font-weight', 'bold');

      const trHead = document.createElement('tr');
      trHead.style.setProperty('height', '24px');

      let columns = 0;

      tableHeader.childNodes.forEach((node) => {
        const td = document.createElement('td');
        td.style.setProperty('border', '1px solid black');
        td.style.setProperty('text-align', 'center');
        td.style.setProperty('vertical-align', 'middle');
        td.style.setProperty('height', '24px');

        td.innerText = node.querySelector('.euiDataGridHeaderCell__content').innerText;
        trHead.appendChild(td);
        columns = columns + 1;
      });

      thead.appendChild(trHead);
      table.appendChild(thead);

      let tableElements = Array.from(embPanel.querySelectorAll('.euiDataGridRowCell'));
      const tbody = document.createElement('tbody');

      while (tableElements.length > 0) {
        const elements = tableElements.slice(0, columns);
        tableElements = tableElements.slice(columns);

        const trBody = document.createElement('tr');
        trBody.style.setProperty('height', '24px');

        elements.forEach((el) => {
          const td = document.createElement('td');
          td.style.setProperty('border', '1px solid black');
          td.style.setProperty('text-align', 'center');
          td.style.setProperty('vertical-align', 'middle');
          td.style.setProperty('height', '24px');

          td.innerText = el.querySelector('.tbvChartCellContent').innerText;
          trBody.appendChild(td);
        });
        tbody.appendChild(trBody);
        table.appendChild(tbody);
      }

      embPanel.replaceChildren(table);
    });
  });
}

class Reporter {
  constructor() {
    this.browser = null;
    this.busy = false;
    this.tasks = [];
  }

  /**
   * Launch a browser if there's no instance yet
   */
  async launchBrowser() {
    if (this.browser) { return; }

    this.browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      headless: true,
      devtools: false,
      slowMo: 10,
      ignoreDefaultArgs: ['--enable-automation'],
      defaultViewport: null,
      args: [
        '--no-sandbox',
        '--no-zygote',
        '--disable-setuid-sandbox', // Absolute trust of the open content in chromium
        '--disable-dev-shm-usage',
      ],
    });
  }

  /**
   * Close the current browser
   */
  async closeBrowser() {
    if (this.browser) {
      // const pages = await this.browser.pages();
      // await Promise.all(pages.map((page) => page.close()));
      await this.browser.close();
      this.browser = null;
    }
  }

  /**
   * Create a new page, launch browser if needed
   */
  async newPage() {
    const page = await this.browser.newPage();
    page.setDefaultNavigationTimeout(puppeteerTimeout);
    page.setDefaultTimeout(puppeteerTimeout);

    return page;
  }

  addTask(task = {}) {
    const frequency = new Frequency(task.frequency);

    if (!frequency.isValid()) {
      throw new Error('invalid task frequency');
    }

    const emitter = new EventEmitter();
    this.tasks.push([task, emitter]);
    this.performTasks();

    return emitter;
  }

  async performTasks() {
    if (this.busy) { return; }
    this.busy = true;

    try {
      await this.launchBrowser();
    } catch (e) {
      logger.error('Failed to launch browser');
      logger.error(e);
      this.busy = false;
      this.tasks.forEach(([, emitter]) => emitter.emit('error', e));
      return;
    }

    while (this.tasks.length > 0) {
      const [task, emitter] = this.tasks.shift();
      let page;

      emitter.emit('start');

      try {
        page = await this.newPage(); // eslint-disable-line no-await-in-loop
        const pdf = await Reporter.generatePDF(page, task); // eslint-disable-line no-await-in-loop
        emitter.emit('complete', pdf);
      } catch (e) {
        emitter.emit('error', e);
      }

      try {
        if (page) {
          await page.close(); // eslint-disable-line no-await-in-loop
        }
      } catch (e) {
        logger.error('Failed to close page');
        logger.error(e);
      }
    }

    try {
      await this.closeBrowser();
    } catch (e) {
      logger.error('Failed to close browser');
      logger.error(e);
    }

    this.busy = false;
  }

  static async generatePDF(page, task) {
    const {
      dashboardId,
      space,
      frequency: frequencyString,
      print,
    } = task;

    const frequency = new Frequency(frequencyString);

    if (!frequency.isValid()) {
      throw new Error('invalid task frequency');
    }

    const now = new Date();
    const period = {
      from: frequency.startOfPreviousPeriod(now),
      to: frequency.startOfCurrentPeriod(now),
    };

    const { dashboard } = (await getDashboard(dashboardId, space)) || {};
    const dashboardUrl = buildDashboardUrl(dashboardId, space, period);
    const dashboardTitle = dashboard && dashboard.title;

    await page.goto(`${kibana.internal || kibana.external}/${dashboardUrl}`, {
      waitUntil: 'load',
    });

    // Wait for either login form or dashboard wrapper
    await page.waitFor(`.login-form, ${selectors.container}`);

    const loginForm = await page.$('.login-form');
    if (loginForm) {
      await page.type('input[name=username]', elastic.username);
      await page.type('input[name=password]', elastic.password);
      await page.keyboard.press('Enter');
      await page.waitFor(selectors.container);
    }

    const dashboardViewport = await page.$(selectors.container);
    const boundingBox = await dashboardViewport.boundingBox();

    // 792x1122 = A4 at 96PPI
    const viewport = {
      width: 1122,
      height: print ? 792 : boundingBox.height,
      margin: {
        left: 50,
        right: 50,
        top: 85,
        bottom: 45,
      },
    };

    await page.setViewport({
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
    });

    let styles = await loadStyles();

    styles += `
      #dashboardChrome {
        display: none;
        height: 0;
        width: 0;
      }
      body {
        padding: 0 !important;
        min-width: ${viewport.width}px !important;
        width: ${viewport.width}px !important;
      }
    `;

    if (print) {
      styles += `
        body {
          min-width: ${viewport.width - viewport.margin.right - viewport.margin.left}px !important;
          width: ${viewport.width - viewport.margin.right - viewport.margin.left}px !important;
        }
        ${selectors.container} .react-grid-item {
          left: 0 !important;
          z-index: 1 !important;
          width: ${viewport.width - viewport.margin.right - viewport.margin.left}px !important;
          height: ${viewport.height - viewport.margin.top - viewport.margin.bottom}px !important;
          transform: none !important;
          -webkit-transform: none !important;
        }
        ${selectors.container} .euiPanel {
          box-shadow: none;
          -webkit-box-shadow: none;
          background-color: inherit !important;
        }
      `;
    }

    const visCount = await page.evaluate(
      (el, attr) => el.getAttribute(attr),
      dashboardViewport,
      selectors.itemCountsAttribute,
    );

    await insertStyles(page, styles);
    await waitForCompleteRender(page, visCount);

    if (print) {
      await changeTables(page);

      await positionElements(page, viewport);
    }

    dashboardViewport.dispose();

    await page.waitFor(5000);

    const logoHtml = (await loadLogos()).map((logo) => `
      <a href="${logo.link}">
        <img src="data:image/png;base64,${logo.base64}" style="max-height: 20px; margin-right: 5px; vertical-align: middle;" />
      </a>
    `);

    const pdfOptions = {
      margin: {
        left: `${viewport.margin.left}px`,
        right: `${viewport.margin.right}px`,
        top: `${viewport.margin.top}px`,
        bottom: `${viewport.margin.bottom}px`,
      },
      printBackground: false,
      displayHeaderFooter: true,
      headerTemplate: `
        <style>#header, #footer { padding: 10px !important; }</style>
        <div style="width: ${viewport.width}px; color: black; text-align: center; line-height: 5px">
          <h1 style="font-size: 14px;"><a href="${kibana.external}/${dashboardUrl}">${dashboardTitle}</a></h1>
          <p style="font-size: 10px;">
            Report covering the period from ${formatDate(period.from, 'Pp', { locale: enGB })} to ${formatDate(period.to, 'Pp', { locale: enGB })}
          </p>
          <p style="font-size: 10px;">Generated on ${formatDate(new Date(), 'PPPP', { locale: enGB })}</p>
        </div>
      `,
      footerTemplate: `
        <div style="width: ${viewport.width}px; color: black; position: relative;">
          ${logoHtml}
          <div style="position: absolute; right: 0; bottom: 0; font-size: 8px;">
            <span class="pageNumber"></span> / <span class="totalPages"></span>
          </div>
        </div>
      `,
    };

    if (print) {
      pdfOptions.width = viewport.width;
      pdfOptions.height = viewport.height;
    } else {
      const height = (boundingBox.height + viewport.margin.top + viewport.margin.bottom);
      pdfOptions.width = viewport.width;
      pdfOptions.height = Math.max(height, 600);
    }

    return page.pdf(pdfOptions);
  }
}

export default new Reporter();
