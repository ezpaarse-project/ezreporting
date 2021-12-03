import { IRouter } from '../../../../../src/core/server';
import { PLUGIN_ID } from '../../../common';
import { getFrequencies } from './actions';

export function frequenciesRouter(router: IRouter) {
  router.get(
    {
      path: '/api/ezreporting/frequencies',
      validate: false,
      options: {
        authRequired: true,
        tags: [`access:${PLUGIN_ID}-read`],
      },
    },
    getFrequencies,
  );
}
