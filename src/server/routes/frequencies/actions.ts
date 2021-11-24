import { RequestHandlerContext, KibanaRequest } from 'kibana/server';
import { KibanaResponseFactory } from '../../../../../src/core/server';
import { SecurityPluginStart } from '../../../../../security/server';
import { logger } from '../../lib/logger';
import { getConfig } from '../../lib/config';

export function getFrequencies() {
  return function (context: RequestHandlerContext, req: KibanaRequest, res: KibanaResponseFactory) {
    logger.info('Sending frequencies');
    return res.ok({
      body: getConfig().frequencies,
    });
  };
}