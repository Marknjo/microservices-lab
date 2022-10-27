import nats, { Stan } from 'node-nats-streaming';
import { NatsConnectionOptions } from '../types/nats-connection-options.interface';

class NatsConnection {
  private _client?: Stan;

  connect(options: NatsConnectionOptions) {
    const { clientId, clusterId, url, options: opts } = options;
    this._client = nats.connect(clusterId, clientId, {
      url,
      ...opts,
    });

    return new Promise<Stan>((resolve, reject) => {
      if (!this._client) {
        return reject('NATS client not connected');
      }

      this._client.on('connect', () => {
        console.log('Connection to Nats successful 🎊🎊🎊');

        this._client!.on('close', () => {
          console.log('Terminating Nats server connection...');
          process.exit(process.exitCode || 0);
        });

        return resolve(this._client!);
      });

      this._client.on('error', err => {
        return reject(err);
      });
    });
  }

  close(client: Stan) {
    process.on('SIGINT', () => client.close());
    process.on('SIGTERM', () => client.close());
  }
}

export const natsClient = new NatsConnection();
