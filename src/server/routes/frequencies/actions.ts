import { RequestHandlerContext, KibanaRequest } from 'kibana/server';
import { KibanaResponseFactory } from '../../../../../src/core/server';
import { SecurityPluginStart } from '../../../../../security/server';
import { logger } from '../../lib/logger';
import { getConfig } from '../../lib/config';
import { save as saveActivity } from '../../lib/activity';

export async function getFrequencies(context: RequestHandlerContext, req: KibanaRequest, res: KibanaResponseFactory) {
  logger.info('Sending frequencies');

  const { spaceId } = context.core?.savedObjects?.client;

  await saveActivity('reporting/getFrequencies', spaceId, null, req, context);

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
