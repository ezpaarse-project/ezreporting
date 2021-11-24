import { KibanaRequest } from 'kibana/server';
import { SecurityPluginStart } from '../../../../../security/server';

export function isSuperuser({
  security,
  req,
}: {
  security: SecurityPluginStart;
  req: KibanaRequest;
}) {
  const user = security.authc.getCurrentUser(req);
  return user?.roles.includes('superuser');
}
