import { IRouter } from '../../../../../src/core/server';
import { PLUGIN_ID } from '../../../common';
import { getAll, getBySpace } from './actions';

export function dashboardsRouter(router: IRouter) {
  router.get(
    {
      path: '/api/ezreporting/management/dashboards',
      validate: false,
      options: {
        authRequired: true,
        tags: [`access:${PLUGIN_ID}-all`],
      },
    },
    getAll,
  );

  router.get(
    {
      path: '/api/ezreporting/dashboards',
      validate: false,
      options: {
        authRequired: true,
        tags: [`access:${PLUGIN_ID}-read`],
      },
    },
    getBySpace,
  );
}
