import { SecurityPluginStart } from '../../../../security/server';

export let security: SecurityPluginStart;

export function getSecurity(internalScurity: SecurityPluginStart) {
  security = internalScurity;

  return security;
}
