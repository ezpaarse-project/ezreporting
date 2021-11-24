import { Logger } from '../../../../src/core/server';

export let logger: Logger;

export function getLogger(internalLogger: Logger) {
  logger = internalLogger;

  return logger;
}

