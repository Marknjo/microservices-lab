import { env } from 'process';
import './dotenv.config';

/**
 * Base interface for the Environment variable types & Names
 */
export interface BaseEnvLoaderTypes {
  DUMMY: undefined;
}

/**
 * Supported types of the EnvLoader utility can parse comfortably
 */
export enum EnvLoaderTypes {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  OPTIONAL = 'optional',
  DEFAULT = 'default',
  CONFIGURE = 'configure', // Represents done phase
}

/**
 * A helper class that loads envs for the app to consume on demand
 *
 */
class EnvLoader {
  private envType?: EnvLoaderTypes;
  private envTracker:
    | {
        envName: string;
        type?: string[];
        default?: string | number | boolean;
        message?: string;
      }[]
    | [] = [];

  private collection: { [key: string]: any } = { API_VERSION: 1 };

  private static _instance?: EnvLoader;

  static get configInstance() {
    if (!this._instance) {
      this._instance = new EnvLoader();
      return this._instance;
    }

    return this._instance;
  }

  constructor() {
    //console.log('\n');
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
   * Declares a String env config option
   * @param message optional custom message if not happy with default
   * @returns EnvLoader
   */
  string(message?: string) {
    this.envType = EnvLoaderTypes.STRING;
    this.listener({ message });

    return this;
  }

  /**
   * Declares a Number env config option
   * @param message optional custom message if not happy with default
   * @returns EnvLoader
   */
  number(message?: string) {
    this.envType = EnvLoaderTypes.NUMBER;
    this.listener({ message });

    return this;
  }

  /**
   * Declares a boolean env config option
   * @param message optional custom message if not happy with default
   * @returns EnvLoader
   */
  boolean(message?: string) {
    this.envType = EnvLoaderTypes.BOOLEAN;
    this.listener({ message });

    return this;
  }

  /**
   * Adds default value
   * @param options Custom message and supported types
   * @returns EnvLoader
   */
  default(options: {
    message?: string;
    value: string | number | boolean;
  }) {
    this.envType = EnvLoaderTypes.DEFAULT;
    this.listener({
      default: options.value,
      message: options.message,
    });
    return this;
  }

  /**
   * Makes an env optional
   * @returns EnvLoader
   */
  optional() {
    this.envType = EnvLoaderTypes.OPTIONAL;
    this.listener({});
    return this;
  }

  /**
   * Must be called close the configuration
   */
  configure() {
    this.envType = EnvLoaderTypes.CONFIGURE;
    this.listener({});
  }

  /**
   * Adds environment variable to the loader collection on program load
   * @param envName name of the environment variable
   */
  add<T extends BaseEnvLoaderTypes>(envName: keyof T) {
    this.listener({
      envName: envName as string,
    });

    // if (!this.envType) {
    //   throw new Error(
    //     `Environment type node defined! i.e. use EnvLoader.string().add('ENV_NAME')`
    //   );
    // }

    // this.rejectIf(envValue);
    // /// Check if it is available first
    // const parsedValue = this.parseCollectionValueType(
    //   envValue,
    //   this.envType
    // );

    // /// Add to collection
    // this.collection = {
    //   ...this.collection,
    //   [envValue as string]: parsedValue,
    // };

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
   * Registers all environment variables to the loader
   *  - Process them
   *  - Evaluate them according to presented rules
   *  - Compile them to a collection
   * @param options can be provided during configuration
   */
  private listener(options: {
    envName?: string;
    message?: string;
    default?: string | number | boolean;
  }) {
    const { envName, message, default: defaultValue } = options;

    /// Add EnvNames to the tracker
    this.addEnvNameToTracker(envName);

    /// Add EnvTypes to the Tracker
    this.addEnvTypesToTracker(envName, message, defaultValue);

    /// Add to Collection Processed envs and env types
    this.processDeclaredEnvs(envName);

    // console.table(this.collection);
  }

  /**
   * Handle adding of envName to the envsTracker
   * @param envName name of the environment variable
   */
  private addEnvNameToTracker(envName?: string) {
    const indexOfEnv =
      envName &&
      this.envTracker.findIndex(value => value.envName === envName);

    if (indexOfEnv === 1) {
      throw new Error(
        `Already declared environment variable name: ${envName}`
      );
    }

    if (envName) {
      this.envTracker = [
        ...this.envTracker,
        {
          envName: envName,
        },
      ];
    }
  }

  /**
   * Handle adding envType to the corresponding envName in the envsTracker
   * @param envName name of the environment variable
   * @param message Optional error message
   * @param defaultValue currently supports number, string, and booleans
   */
  private addEnvTypesToTracker(
    envName?: string,
    message?: string,
    defaultValue?: string | number | boolean
  ) {
    if (
      this.envType &&
      this.envType !== EnvLoaderTypes.CONFIGURE &&
      !envName
    ) {
      const prevEntry = this.envTracker.at(-1);

      if (!prevEntry)
        throw Error(
          'Internal  error, cannot find entry in the tracker collection'
        );

      /// Prevent similar types entry
      if (prevEntry.type && prevEntry.type.includes(this.envType)) {
        throw new Error(
          `Can't add more than one type of '${this.envType}' for environment variable ${prevEntry.envName}`
        );
      }

      /// Prevent duplicate different types entry
      if (
        prevEntry.type &&
        prevEntry.type.length > 1 &&
        prevEntry.type.includes(this.envType)
      ) {
        throw new Error(
          `Already have '${prevEntry.type[0]}' type. Want to replace it with ${this.envType}?`
        );
      }

      /// Add new types to already existing types collection
      if (prevEntry.type) {
        prevEntry.type.push(this.envType);
      }

      /// Add first entry to this env types options
      if (!prevEntry.type) {
        prevEntry.type = [this.envType];
      }

      /// message if attached
      if (message) {
        prevEntry.message = message;
      }

      /// Add default value if provided
      if (defaultValue) {
        prevEntry.default = defaultValue;
      }
    }
  }

  /**
   * Handle adding of envs and their values to the envs collection
   * @param envName name of the environment variable
   */
  private processDeclaredEnvs(envName?: string) {
    if (this.envType) {
      /// Handler subsequent envs after first time
      if (Boolean(envName) && this.envTracker?.length > 1) {
        /// Process the previous element
        this.rejectIfUndefined(2);
        /// Handle single entry -> Select second position from the last
        this.addWithOneOption(2);

        /// Add multiple options;
        this.addWithMultipleOptions(2);
      }

      /// Process last Event
      if (this.envType === EnvLoaderTypes.CONFIGURE) {
        /// Handle rejection for undefined options
        this.rejectIfUndefined(1);

        /// Handle case where options is one
        this.addWithOneOption(1);

        /// Handle case where options is more than one -> Select the last position
        this.addWithMultipleOptions(1);
      }
    }
  }

  /**
   * Gets the last item in the environment tracker (envTracker) collection,
   *  - Checks if there is one collection
   *  - Maps the outcome to correct types
   *
   * @param position there two options,
   * either after done/configure or after all options to a variable are added to the tracker.
   * Position is either 1 or 2
   *
   * @returns Extract the environment name and type
   */
  private extractEnvOptions(position: number) {
    const prevEntry = this.envTracker.at(-position);

    if (!prevEntry) {
      throw new Error('Could not process env value');
    }

    const {
      envName: envName,
      type,
      message,
      default: defaultValue,
    } = prevEntry;

    return {
      envName: envName as keyof BaseEnvLoaderTypes,
      type: type as EnvLoaderTypes[],
      defaultValue,
      message,
    };
  }

  /**
   * Handles adding environnement config to the collection if the options supplied is only one
   * @param position there two options,
   * either after done/configure or after all options to a variable are added to the tracker.
   * Position is either 1 or 2
   */
  private addWithMultipleOptions(position: 1 | 2) {
    const {
      envName,
      type: types,
      defaultValue,
      message,
    } = this.extractEnvOptions(position);

    if (types.length > 1) {
      const filteredType = types.filter(
        type =>
          type !== EnvLoaderTypes.OPTIONAL &&
          type !== EnvLoaderTypes.DEFAULT
      );

      if (filteredType.length > 1) {
        throw new Error(
          `BUG: ${JSON.stringify(
            filteredType
          )} contains unsupported types.`
        );
      }

      const currentType = filteredType.at(0)!;

      this.addToCollectionFactory({
        envName,
        type: currentType as EnvLoaderTypes,
        defaultValue,
        message,
      });
    }
  }

  /**
   * Handles adding environnement config to the collection if the options supplied is only one
   * @param position there two options,
   * either after done/configure or after all options to a variable are added to the tracker.
   * Position is either 1 or 2
   */
  private addWithOneOption(position: 1 | 2) {
    const { envName, type, defaultValue, message } =
      this.extractEnvOptions(position);

    if (type && type.length === 1) {
      const currentType = type.at(0)!;

      this.addToCollectionFactory({
        envName,
        type: currentType as EnvLoaderTypes,
        defaultValue,
        message,
      });
    }
  }

  /**
   * Handles pushing new environment variables to the utility collection
   * @param options to pass to the collection parser
   */
  private addToCollectionFactory(options: {
    envName: keyof BaseEnvLoaderTypes;
    type: EnvLoaderTypes;
    defaultValue?: string | number | boolean;
    message?: string;
  }) {
    const { envName } = options;

    const parsedValue = this.parseCollectionValueType(options);

    this.collection = {
      ...this.collection,
      [envName]: parsedValue,
    };
  }

  /**
   * Tests if the envs is set and throws error of not
   * @param position there two options,
   * either after done/configure or after all options to a variable are added to the tracker.
   * Position is either 1 or 2
   */
  private rejectIfUndefined(position: 1 | 2) {
    const { envName: envName, type: types } =
      this.extractEnvOptions(position);

    if (!types || types.length === 0) {
      throw new Error(
        `${envName} is not properly configured. Ensure to it's type(s)`
      );
    }

    const foundTypes = types.find(
      type => type === EnvLoaderTypes.OPTIONAL
    );

    if (foundTypes) return;

    const transformedEnvName = `${envName as string} `;

    if (!Boolean(env[transformedEnvName.trim()])) {
      throw Error(
        `Environment variable ${transformedEnvName}not defined: `
      );
    }
  }

  /**
   * Tests if the envs is set and throws error of not
   * @param type name of the environment variable
   */
  private rejectIfInvalidType(
    envName: string,
    type: string,
    test: boolean,
    message?: string
  ) {
    if (!test) {
      throw Error(
        message ||
          `Invalid Type: Expects type of ${envName} to be a ${type}`
      );
    }
  }

  /**
   * Check supported envs types and fetch from the envs
   *  - Envs must be in the Node Environment
   *  - Uses parse.env to fetch envs
   *  - To auto lint envs names pass interface that extends EnvConfigsValueTypes
   *
   * @Params options
   * @returns string | number | boolean - parsed envs
   */
  private parseCollectionValueType(options: {
    envName: keyof BaseEnvLoaderTypes;
    type: EnvLoaderTypes;
    defaultValue?: string | number | boolean;
    message?: string;
  }) {
    let collectionValueAs: string | number | boolean;
    const { envName, type, defaultValue, message } = options;

    switch (type) {
      case EnvLoaderTypes.OPTIONAL:
      case EnvLoaderTypes.CONFIGURE:
      case EnvLoaderTypes.DEFAULT:

      case EnvLoaderTypes.STRING:
        const envStrValue = env[String(envName)];
        const useStrValue =
          defaultValue && !envStrValue ? defaultValue : envStrValue;

        this.rejectIfInvalidType(
          envName as string,
          EnvLoaderTypes.STRING,
          typeof useStrValue === 'string',
          message
        );

        collectionValueAs = String(useStrValue);
        break;

      case EnvLoaderTypes.BOOLEAN:
        const envBoolValue = env[String(envName)];
        const useBoolValue =
          defaultValue && !envBoolValue ? defaultValue : envBoolValue;

        this.rejectIfInvalidType(
          envName as string,
          EnvLoaderTypes.BOOLEAN,
          String(useBoolValue) === 'true' ||
            String(useBoolValue) === 'false',
          message
        );

        collectionValueAs = Boolean(useBoolValue);
        break;

      case EnvLoaderTypes.NUMBER:
        const envNumberValue = env[String(envName)];
        const useNumberValue =
          defaultValue && !envNumberValue
            ? defaultValue
            : envNumberValue;

        this.rejectIfInvalidType(
          envName as string,
          EnvLoaderTypes.NUMBER,
          !isNaN(Number(useNumberValue)),
          message
        );

        collectionValueAs = Number(useNumberValue);
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
