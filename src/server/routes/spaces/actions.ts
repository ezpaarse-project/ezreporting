import get from 'lodash.get';
import { RequestHandlerContext, KibanaRequest } from 'kibana/server';
import { KibanaResponseFactory } from '../../../../../src/core/server';
import { isSuperuser } from '../../lib/isSuperuser';
import { client } from '../../lib/elastic';
import { logger } from '../../lib/logger';
import { security } from '../../lib/security';
import { save as saveActivity } from '../../lib/activity';

export async function getSpaces(context: RequestHandlerContext, req: KibanaRequest, res: KibanaResponseFactory) {
  const isAdmin = isSuperuser({ security, req });
  if (!isAdmin) { return res.forbidden(); }

  const { spaceId } = context.core?.savedObjects?.client;

  logger.info('Get Kibana spaces');
  let spacesSource = []; 
  try {
    const { body } = await client.search({
      index: '.kibana',
      timeout: '30s',
      body: {
        size: 10000,
        query: {
          bool: {
            must: [
              {
                match: {
                  type: 'space',
                },
              },
            ],
          },
        },
      },
    });
    spacesSource = get(body, 'hits.hits');
  } catch (error) {
    logger.error(error);
    return res.customError({ statusCode: 500, body: error });
  }

  logger.info('Flat Kibana spaces');
  let spaces = [];
  if (spacesSource.length > 0) {
    spaces = spacesSource.map(({ _id: id, _source: source }) => ({
      id,
      name: id.split(':').pop(),
      color: source.space.color || '#00bfb3',
    }));
  }

  await saveActivity('reporting/getSpaces', spaceId, null, req, context);

  return res.ok({
    body: {
      statusCode: 200,
      message: null,
      data: { spaces },
    },
  });
};
