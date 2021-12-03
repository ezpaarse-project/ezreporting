import { RequestHandlerContext, KibanaRequest } from 'kibana/server';
import { KibanaResponseFactory } from '../../../../../src/core/server';
import { SecurityPluginStart } from '../../../../../security/server';
import { logger } from '../../lib/logger';
import { getConfig } from '../../lib/config';

export function getFrequencies(context: RequestHandlerContext, req: KibanaRequest, res: KibanaResponseFactory) {
  logger.info('Sending frequencies');

  return res.ok({
    body: {
      statusCode: 200,
      message: null,
      data: {
        frequencies: getConfig('frequencies'),
      },
    },
  });
};
