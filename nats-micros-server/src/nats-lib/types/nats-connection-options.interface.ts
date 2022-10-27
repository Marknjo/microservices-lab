import { StanOptions } from 'node-nats-streaming';

export interface NatsConnectionOptions {
  clusterId: string;
  clientId: string;
  url: string;
  options?: StanOptions;
}
