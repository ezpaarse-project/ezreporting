import { RequestHandlerContext, KibanaRequest } from 'kibana/server';
import { client } from './elastic';
import { logger } from './logger';
import { security } from '../lib/security';
import { getUser } from '../lib/getUser';
import { getConfig } from './config';

export async function save(
  action: string,
  spaceId: string,
  taskId: string,
  req: KibanaRequest,
  context: RequestHandlerContext,
) {
  const user = getUser({ security, req });

  const activity = {
    datetime: Date.now(),
    action,
    user: user?.username,
    taskId,
    spaceId,
    dashboardName: null,
    request: {
      method: req?.route?.method,
      url: req?.route?.path,
      remoteIP: req?.headers?.host,
      userAgent: req?.headers['user-agent'],
      query: req?.body || req?.query || req?.params,
    },
  };

  return client.index({
    index: getConfig('activityIndex'),
    refresh: true,
    body: activity,
  });
}
