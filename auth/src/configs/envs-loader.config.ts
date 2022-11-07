import { env } from 'process';
import './dotenv.config';

/**
 * Base interface for the Environment variable types & Names
 */
export interface BaseEnvLoaderTypes {
  API_VERSION: number;
}

/**
 * Supported types the EnvLoader utility can parse comfortably
 */
export enum SupportedEnvLoaderTypes {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
}

/**
 * A helper class that loads envs for the app to consume on demand
 *
 */
class EnvLoader {
  private collection: { [key: string]: any } = { API_VERSION: 1 };

  private static _instance?: EnvLoader;

  static get configInstance() {
    if (!this._instance) {
      this._instance = new EnvLoader();
      return this._instance;
    }

    return this._instance;
  }

  /**
   * Fetches all environment variables
   * @returns all loaded envs
   */
  allEnvs<T extends BaseEnvLoaderTypes>(): Promise<T> {
    return new Promise(resolve => {
      resolve(this.collection as T);
    });
  }

  /**
   * Tests if the envs is set and throws error of not
   * @param envName name of the environment variable
   */
  private rejectIf<T extends BaseEnvLoaderTypes>(envName: keyof T) {
    const transformedEnvName = `${envName as string} `;

    if (!Boolean(env[transformedEnvName.trim()])) {
      throw Error(
        `Environment variable ${transformedEnvName}not defined: `
      );
    }
  }

  /**
   * Adds environment variable to the loader collection on program load
   * @param envValue name of the environment variable
   * @param type string | number | boolean type of the environment variable
   */
  add<T extends BaseEnvLoaderTypes>(
    envValue: keyof T,
    type: SupportedEnvLoaderTypes
  ) {
    this.rejectIf(envValue);
    /// Check if it is available first
    const parsedValue = this.parseCollectionValueType(envValue, type);

    /// Add to collection
    this.collection = {
      ...this.collection,
      [envValue as string]: parsedValue,
    };
  }

  /**
   * Get's a single environment variable from the collection
   * @param key The name of the env to load
   * @returns string | number | boolean - matching key
   */
  use<T extends BaseEnvLoaderTypes>(key: keyof T) {
    return this.collection[key as string];
  }

  /**
   * Check supported envs types and fetch from the envs
   *  - Envs must be in the Node Environment
   *  - Uses parse.env to fetch envs
   *  - To auto lint envs names pass interface that extends EnvConfigsValueTypes
   * @param envValue name of the environment variable
   * @param type string | number | boolean type of the environment variable
   * @returns string | number | boolean - parsed envs
   */
  private parseCollectionValueType<T extends BaseEnvLoaderTypes>(
    envValue: keyof T,
    type: SupportedEnvLoaderTypes
  ) {
    let collectionValueAs: string | number | boolean;

    switch (type) {
      case SupportedEnvLoaderTypes.STRING:
        collectionValueAs = env[String(envValue)]!;
        break;

      case SupportedEnvLoaderTypes.BOOLEAN:
        collectionValueAs = Boolean(env[String(envValue)]);
        break;

      case SupportedEnvLoaderTypes.NUMBER:
        collectionValueAs = +env[String(envValue)]!;
        break;

      default:
        throw new Error('Unsupported environment variable type');
    }

    return collectionValueAs;
  }
}

/// Initialize Environment loader
const envLoader = EnvLoader.configInstance;
export { envLoader };
