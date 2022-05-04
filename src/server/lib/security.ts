import { SecurityPluginStart } from '../../../../security/server';

export let security: SecurityPluginStart;

export function getSecurity(internalSecurity: SecurityPluginStart) {
  security = internalSecurity;

  return security;
}
