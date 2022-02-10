import { KibanaRequest } from 'kibana/server';
import { SecurityPluginStart } from '../../../../../security/server';

export function getUser({
  security,
  req,
}: {
  security: SecurityPluginStart;
  req: KibanaRequest;
}) {
  const user = security.authc.getCurrentUser(req);
  return user;
}
