import * as rison from 'rison';
import { client } from '../elastic';

export async function getDashboard(dashboardId, namespace) {
  if (namespace === 'default') {
    namespace = null;
  }

  const { body: data } = await client.getSource({
    index: '.kibana',
    id: `${namespace ? `${namespace}:` : ''}dashboard:${dashboardId}`,
  });

  if (data && data.type === 'dashboard') {
    return data;
  }

  return null;
};

export function buildDashboardUrl(dashboardId, space, period) {
  if (!dashboardId || !period) {
    return null;
  }

  const { from, to } = period;
  const gData = rison.encode({
    time: { from, to },
  });

  const aData = rison.encode({
    timeRestore: true,
  });

  if (space === 'default') {
    space = null;
  }

  return `${space ? `s/${space}/` : ''}app/kibana#/dashboard/${dashboardId}?_g=${encodeURIComponent(gData)}&_a=${encodeURIComponent(aData)}`;
};

