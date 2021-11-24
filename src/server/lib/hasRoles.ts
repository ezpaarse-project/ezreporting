import { KibanaRequest } from 'kibana/server';
import { SecurityPluginStart } from '../../../../../security/server';

export function hasRoles({
  security,
  req,
  roles,
}: {
  security: SecurityPluginStart;
  req: KibanaRequest;
  roles: Array<string>;
}) {
  const user = security.authc.getCurrentUser(req);
  return roles.some((role) => user?.roles.includes(role));
}
