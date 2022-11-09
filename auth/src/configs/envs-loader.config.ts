import { env } from 'process';
import './dotenv.config';

/**
 * Base interface for the Environment variable types & Names
 */
export interface BaseEnvLoaderTypes {
  API_VERSION: number;
}

/**
 * Supported types of the EnvLoader utility can parse comfortably
 */
export enum EnvLoaderTypes {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  OPTIONAL = 'optional',
}

/**
 * A helper class that loads envs for the app to consume on demand
 *
 */
class EnvLoader {
  private envType?: EnvLoaderTypes;

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

  string() {
    this.envType = EnvLoaderTypes.STRING;
    return this;
  }

  number() {
    this.envType = EnvLoaderTypes.NUMBER;
    return this;
  }

  boolean() {
    this.envType = EnvLoaderTypes.BOOLEAN;
    return this;
  }

  optional() {
    this.envType = EnvLoaderTypes.OPTIONAL;
    return this;
  }

  /**
   * Adds environment variable to the loader collection on program load
   * @param envValue name of the environment variable
   */
  add<T extends BaseEnvLoaderTypes>(envValue: keyof T) {
    if (!this.envType) {
      throw new Error(
        `Environment type node defined! i.e. use EnvLoader.string().add('ENV_NAME')`
      );
    }

    this.rejectIf(envValue);
    /// Check if it is available first
    const parsedValue = this.parseCollectionValueType(
      envValue,
      this.envType
    );

    /// Add to collection
    this.collection = {
      ...this.collection,
      [envValue as string]: parsedValue,
    };

    /// return this
    return this;
  }

  /**
   * Get's a single environment variable from the collection
   * @param key The name of the env to load
   * @returns string | number | boolean - matching key
   */
  get<T extends BaseEnvLoaderTypes>(
    key: keyof T
  ): EnvLoaderTypes | undefined {
    return this.collection[key as string];
  }

  /**
   * Tests if the envs is set and throws error of not
   * @param envName name of the environment variable
   */
  private rejectIf<T extends BaseEnvLoaderTypes>(envName: keyof T) {
    if (this.envType === EnvLoaderTypes.OPTIONAL) return;

    const transformedEnvName = `${envName as string} `;

    if (!Boolean(env[transformedEnvName.trim()])) {
      throw Error(
        `Environment variable ${transformedEnvName}not defined: `
      );
    }
  }

  /**
   * Check supported envs types and fetch from the envs
   *  - Envs must be in the Node Environment
   *  - Uses parse.env to fetch envs
   *  - To auto lint envs names pass interface that extends EnvConfigsValueTypes
   * @param envValue name of the environment variable
   * @param type EnvLoaderTypes type of the environment variable
   * @returns string | number | boolean - parsed envs
   */
  private parseCollectionValueType<T extends BaseEnvLoaderTypes>(
    envValue: keyof T,
    type: EnvLoaderTypes
  ) {
    let collectionValueAs: string | number | boolean;

    switch (type) {
      case EnvLoaderTypes.OPTIONAL:
        console.log({ typeOp: type });

        collectionValueAs = EnvLoaderTypes.OPTIONAL;

      case EnvLoaderTypes.STRING:
        collectionValueAs = env[String(envValue)]!;
        break;

      case EnvLoaderTypes.BOOLEAN:
        collectionValueAs = Boolean(env[String(envValue)]);
        break;

      case EnvLoaderTypes.NUMBER:
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
