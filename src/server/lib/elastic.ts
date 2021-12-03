import { RequestHandlerContext } from 'kibana/server';
import { Client } from '@elastic/elasticsearch';
import { ApiKeyAuth, BasicAuth } from '@elastic/elasticsearch/lib/pool';

export let client;

export function getEsClient({
  node,
  auth,
}: {
  node: string;
  auth?: BasicAuth | ApiKeyAuth;
}) {
  client = new Client({
    node,
    auth,
  });

  return client as unknown;
}

