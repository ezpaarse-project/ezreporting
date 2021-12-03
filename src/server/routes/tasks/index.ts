import { schema } from '@kbn/config-schema';

import { IRouter } from '../../../../../src/core/server';
import { PLUGIN_ID } from '../../../common';
import {
  getAll,
  getBySpace,
  store,
  update,
  deleteTask,
  history,
  download,
  validEmail,
} from './actions';

export function tasksRouter(router: IRouter) {
  router.get(
    {
      path: '/api/ezreporting/tasks',
      validate: false,
      options: {
        authRequired: true,
        tags: [`access:${PLUGIN_ID}-read` , `access:${PLUGIN_ID}-all`],
      },
    },
    getBySpace,
  );

  router.get(
    {
      path: '/api/ezreporting/management/tasks',
      validate: false,
      options: {
        authRequired: true,
        tags: [`access:${PLUGIN_ID}-all`],
      },
    },
    getAll,
  );

  router.post(
    {
      path: '/api/ezreporting/tasks',
      validate: {
        body: schema.object({
          dashboardId: schema.string(),
          frequency: schema.string(),
          emails: schema.arrayOf(schema.string()),
          print: schema.boolean(),
          enabled: schema.boolean(),
        }),
      },
      options: {
        authRequired: true,
        tags: [`access:${PLUGIN_ID}-all`],
      },
    },
    store,
  );

  router.patch(
    {
      path: '/api/ezreporting/tasks/{taskId}',
      validate: {
        params: schema.object({
          taskId: schema.string(),
        }),
        body: schema.object({
          dashboardId: schema.string(),
          frequency: schema.string(),
          emails: schema.arrayOf(schema.string()),
          print: schema.boolean(),
          enabled: schema.boolean(),
        }),
      },
      options: {
        authRequired: true,
        tags: [`access:${PLUGIN_ID}-all`],
      },
    },
    update,
  );

  router.delete(
    {
      path: '/api/ezreporting/tasks/{taskId}',
      validate: {
        params: schema.object({
          taskId: schema.string(),
        }),
      },
      options: {
        authRequired: true,
        tags: [`access:${PLUGIN_ID}-all`],
      },
    },
    deleteTask,
  );

  router.get(
    {
      path: '/api/ezreporting/tasks/history/{taskId}',
      validate: {
        params: schema.object({
          taskId: schema.string(),
        }),
      },
      options: {
        authRequired: true,
        tags: [`access:${PLUGIN_ID}-all`],
      },
    },
    history,
  );

  router.get(
    {
      path: '/api/ezreporting/tasks/{taskId}/download',
      validate: {
        params: schema.object({
          taskId: schema.string(),
        }),
      },
      options: {
        authRequired: true,
        tags: [`access:${PLUGIN_ID}-all`],
      },
    },
    download,
  );

  router.post(
    {
      path: '/api/ezreporting/tasks/email',
      validate: {
        body: schema.object({
          email: schema.string(),
        }),
      },
      options: {
        authRequired: true,
        tags: [`access:${PLUGIN_ID}-all`],
        body: {
          accepts: ['application/json'],
        },
      },
    },
    validEmail,
  );

}
