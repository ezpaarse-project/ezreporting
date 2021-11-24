import { client } from './elastic';
import { logger } from '../lib/logger';

export async function createIndices(indices: object) {
  for (let i = 0; i < Object.keys(indices).length; i += 1) {
    const index: string = Object.keys(indices)[i];
    const template: string = indices[Object.keys(indices)[i]];

    logger.info(`Index [${index}] exists.`);
    const indexExists = (
      await client.indices.exists({
        index,
      })
    ).body as unknown;
  
    if (!indexExists) {
      logger.info(`Index [${index}] does not exists, create it ...`);
      await client.indices.create({
        index,
        body: template,
      });
    }
  }
}
