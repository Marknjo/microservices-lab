import nats, { Stan } from 'node-nats-streaming';
import { NatsConnectionOptions } from '../types/nats-connection-options.interface';

class NatsConnection {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }

    return this._client;
  }

  connect(options: NatsConnectionOptions) {
    const { clientId, clusterId, url, options: opts } = options;
    this._client = nats.connect(clusterId, clientId, {
      url,
      ...opts,
    });

    return new Promise<void>((resolve, reject) => {
      const stan = this._client;
      if (!stan) {
        return reject('NATS client not connected');
      }

      stan.on('connect', () => {
        console.log('Connection to NATS client successful 🎊🎊🎊');
        // this.close();
        return resolve();
      });

      stan.on('error', err => {
        return reject(err);
      });
    });
  }

  close() {
    this.client.on('close', () => {
      console.log('Terminating Nats server connection...');
      process.exit(process.exitCode || 0);
    });

    process.on('SIGINT', () => this.client.close());
    process.on('SIGTERM', () => this.client.close());
  }
}

export const natsConnection = new NatsConnection();
