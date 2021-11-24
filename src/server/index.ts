import { PluginInitializerContext, PluginConfigDescriptor } from '../../../src/core/server';
import { EzreportingPlugin } from './plugin';
import { ConfigSchema, configSchema } from '../common/config';

export const config: PluginConfigDescriptor<ConfigSchema> = {
  exposeToBrowser: {
    applicationName: true,
    webSocketPort: true,
  },
  schema: configSchema,
};

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new EzreportingPlugin(initializerContext);
}

export { EzreportingPluginSetup, EzreportingPluginStart } from './types';
