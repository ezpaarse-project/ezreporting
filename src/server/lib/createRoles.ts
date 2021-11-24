import { client } from './elastic';
import { logger } from '../lib/logger';
import { getConfig } from './config';

function createRole(name, privileges) {
  const { index, historyIndex } = getConfig();

  return client.security.putRole({
    name,
    body: {
      cluster: [],
      indices: [
        {
          names: [index, historyIndex],
          privileges,
        },
      ],
    },
  });
}

export async function createRoles() {
  const { roleName } = getConfig();

  try {
    await client.security.getRole({ name: roleName });
    logger.info(`Role [${roleName}] exists`);
  } catch (err) {
    if (err && err.meta && err.meta.statusCode === 404) {
      logger.warn(`Role [${roleName}] not found`);
      await createRole(roleName, ['read', 'write', 'create', 'delete']);
      logger.info(`Role [${roleName}] created`);
    }
  }

  try {
    await client.security.getRole({ name: `${roleName}_read_only` });
    logger.info(`Role [${roleName}_read_only] exists`);
  } catch (err) {
    if (err && err.meta && err.meta.statusCode === 404) {
      logger.warn(`Role [${roleName}_read_only] not found`);
      await createRole(`${roleName}_read_only`, ['read']);
      logger.info(`Role [${roleName}_read_only] created`);
    }
  }
}
