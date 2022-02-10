import get from 'lodash.get';
import { RequestHandlerContext, KibanaRequest } from 'kibana/server';
import { KibanaResponseFactory } from '../../../../../src/core/server';
import { SecurityPluginStart } from '../../../../../security/server';
import { isSuperuser } from '../../lib/isSuperuser';
import { client } from '../../lib/elastic';
import { logger } from '../../lib/logger';
import { security } from '../../lib/security';
import { save as saveActivity } from '../../lib/activity';

async function getDashboards(space?: string) {
  const bool = {
    must: [{
      match: {
        type: 'dashboard',
      },
    }],
  };

  if (space) {
    if (space !== 'default') {
      bool.must.push({
        match: {
          namespace: space,
        },
      });
    } else {
      bool.must_not = {
        exists: {
          field: 'namespace',
        },
      };
    }
  }

  let dashboardsList;
  try {
    const { body: data } = await client.search({
      index: '.kibana',
      timeout: '30s',
      body: {
        size: 10000,
        query: {
          bool,
        },
      },
    });
    dashboardsList = get(data, 'hits.hits') || []
  } catch (err) {
    logger.error(err);
  }

  const dashboards = [];
  for (let i = 0; i < dashboardsList.length; i += 1) {
    const id = get(dashboardsList[i], '_id').split(':').pop();
    const { dashboard, namespace } = get(dashboardsList[i], '_source');

    dashboards.push({
      id,
      name: dashboard.title,
      description: dashboard.description,
      namespace: namespace || 'default',
    });
  }
  return dashboards;
}

export async function getAll(context: RequestHandlerContext, req: KibanaRequest, res: KibanaResponseFactory) {
  const isAdmin = isSuperuser({ security, req });
  if (!isAdmin) { return res.forbidden(); }

  const { spaceId } = context.core?.savedObjects?.client;

  logger.info('Get all dashboards');
  const dashboards = await getDashboards();

  await saveActivity('reporting/getDashboards', spaceId, null, req, context);

  return res.ok({
    body: {
      statusCode: 200,
      message: null,
      data: { dashboards },
    },
  });
};

export async function getBySpace(context: RequestHandlerContext, req: KibanaRequest, res: KibanaResponseFactory) {
  const { spaceId } = context.core?.savedObjects?.client;

  logger.info('Get all dashboards');
  const dashboards = await getDashboards(spaceId);

  await saveActivity('reporting/getDashboardsBySpace', spaceId, null, req, context);

  return res.ok({
    body: {
      statusCode: 200,
      message: null,
      data: { dashboards },
    },
  });
};
