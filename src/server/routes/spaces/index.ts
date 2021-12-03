import { IRouter } from '../../../../../src/core/server';
import { PLUGIN_ID } from '../../../common';
import { getSpaces } from './actions';

export function spacesRouter(router: IRouter) {
  router.get(
    {
      path: '/api/ezreporting/management/spaces',
      validate: false,
      options: {
        authRequired: true,
        tags: [`access:${PLUGIN_ID}-all`],
      },
    },
    getSpaces,
  );
}
