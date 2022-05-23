import { RequestHandlerContext } from 'kibana/server';
import { Client } from '@elastic/elasticsearch';
import { ApiKeyAuth, BasicAuth } from '@elastic/elasticsearch/lib/pool';

export let client;

interface IClient {
  node: {
    url: URL,
    auth: {
      username: string,
      password: string,
    },
  },
  ssl: {
    rejectUnauthorized: boolean,
  },
}

export function getEsClient(conf: IClient) {
  client = new Client(conf);

  return client as unknown;
}

