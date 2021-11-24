import get from 'lodash.get';
import { RequestHandlerContext, KibanaRequest } from 'kibana/server';
import { KibanaResponseFactory } from '../../../../../src/core/server';
import { SecurityPluginStart } from '../../../../../security/server';
import { isSuperuser } from '../../lib/isSuperuser';
import { client } from '../../lib/elastic';
import { logger } from '../../lib/logger';
import { security } from '../../lib/security';

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

export function getAll() {
  return async function (context: RequestHandlerContext, req: KibanaRequest, res: KibanaResponseFactory) {
    const isAdmin = isSuperuser({ security, req });
    if (!isAdmin) { return res.forbidden(); }

    logger.info('Get all dashboards');
    const dashboards = await getDashboards();

    return res.ok({
      body: dashboards,
    });
  };
}

export function getBySpace() {
  return async function (context: RequestHandlerContext, req: KibanaRequest, res: KibanaResponseFactory) {
    const { spaceId } = context.core?.savedObjects?.client;

    logger.info('Get all dashboards');
    const dashboards = await getDashboards(spaceId);

    return res.ok({
      body: dashboards,
    });
  };
}