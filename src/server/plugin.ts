import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';
import { SecurityPluginSetup, SecurityPluginStart } from '../../../../security/server';

import { EzReportingPluginSetup, EzReportingPluginStart } from './types';
import { dashboardsRouter } from './routes/dashboards';
import { frequenciesRouter } from './routes/frequencies';
import { spacesRouter } from './routes/spaces';
import { tasksRouter } from './routes/tasks';

import { PluginSetupContract as FeaturesPluginSetup } from '../../../x-pack/plugins/features/server';

import { PLUGIN_NAME, PLUGIN_ID, PLUGIN_DESCRIPTION } from '../common';
import { IServerConfig } from '../common/config';
import { getEsClient } from './lib/elastic';
import { createIndices } from './lib/createIndices';
import { getLogger } from './lib/logger';
import { getConfig, setConfig } from './lib/config';
import { getSecurity } from './lib/security';

import { reportingTemplate } from "./templates/reporting-template";
import { historyTemplate } from "./templates/history-template";
import { activityTemplate } from "./templates/activity-template";
import { createRoles } from './lib/createRoles';
import { socket } from './ws';

import { CronJob } from 'cron';

export interface EzReportingDeps {
  features: FeaturesPluginSetup;
  security?: SecurityPluginSetup;
}

export interface EzReportingStart {
  security?: SecurityPluginStart;
}

export class EzreportingPlugin
  implements Plugin<EzReportingPluginSetup, EzReportingPluginStart, EzReportingDeps> {
  private readonly logger: Logger;
  private config;

  initializerContext: PluginInitializerContext<IServerConfig>;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
    this.initializerContext = initializerContext;
    this.config = this.initializerContext.config.get();
  
    setConfig(this.config);
    getLogger(this.logger);
    getEsClient({
      node: this.config.elastic.baseUrl,
      auth: {
        username: this.config.elastic.username,
        password: this.config.elastic.password,
      }
    });
  }

  public async setup(core: CoreSetup<EzReportingStart>, { features, security }: EzReportingDeps) {
    this.logger.debug(`${PLUGIN_ID}: Setup`);

    const router = core.http.createRouter();

    getSecurity(security);

    // Create ezreporting indices
    await createIndices({
      [this.config.index]: reportingTemplate,
      [this.config.historyIndex]: historyTemplate,
      [this.config.activityIndex]: activityTemplate,
    });

    // Create ezreporting roles
    await createRoles();

    // Create websocket server
    socket.createServer();
    socket.on();

    // Register server side APIs
    dashboardsRouter(router);
    frequenciesRouter(router);
    spacesRouter(router);
    tasksRouter(router);

    const job = new CronJob(this.config.cron, () => {
      const { generatePendingReports } = require('./lib/services/reporting');
      generatePendingReports();
    });
    job.start();

    const applicationName = this.config.applicationName;

    const featuresCategory = {
      id: `${applicationName.toLowerCase()}`,
      label: `${PLUGIN_NAME} ${applicationName}`,
      ariaLabel:`${PLUGIN_NAME} ${applicationName}`,
      order: 1000,
      euiIconType: 'reportingApp',
    };

    features.registerKibanaFeature({
      id: PLUGIN_ID,
      name: `${PLUGIN_NAME} ${applicationName}`,
      category: featuresCategory,
      app: [PLUGIN_ID, 'kibana'],
      catalogue: [PLUGIN_ID],
      privilegesTooltip: PLUGIN_DESCRIPTION,
      management: {
        ezmesure: [`${PLUGIN_ID}_management`],
      },
      privileges: {
        all: {
          app: [PLUGIN_ID, 'kibana'],
          api: [`${PLUGIN_ID}-all`],
          catalogue: [PLUGIN_ID],
          management: {
            ezmesure: [`${PLUGIN_ID}_management`],
          },
          savedObject: {
            all: [],
            read: [],
          },
          ui: ['create', 'edit', 'save', 'download', 'delete', 'show'],
        },
        read: {
          app: [PLUGIN_ID, 'kibana'],
          api: [`${PLUGIN_ID}-read`],
          catalogue: [PLUGIN_ID],
          management: {
            ezmesure: [`${PLUGIN_ID}_management`],
          },
          savedObject: {
            all: [],
            read: [],
          },
          ui: ['view'],
        },
      },
    });

    // Hide reporting in management if user have not superuser role
    features.registerElasticsearchFeature({
      id: `${PLUGIN_ID}_management`,
      catalogue: [`${PLUGIN_ID}_management`],
      management: {
        ezmesure: [`${PLUGIN_ID}_management`],
      },
      privileges: [
        {
          requiredClusterPrivileges: [],
          requiredRoles: ['superuser', 'admin', `${PLUGIN_ID}_management`], // `${PLUGIN_ID}_management` can be create
          ui: [],
        },
      ],
    });

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug(`${PLUGIN_ID}: Started`);
    return {};
  }

  public stop() {
    this.logger.debug(`${PLUGIN_ID}: Stopped`);
    return {};
  }
}
