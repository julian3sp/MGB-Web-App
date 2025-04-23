
/**
 * Client
**/

import * as runtime from './runtime/binary.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model employee
 * 
 */
export type employee = $Result.DefaultSelection<Prisma.$employeePayload>
/**
 * Model service_request
 * 
 */
export type service_request = $Result.DefaultSelection<Prisma.$service_requestPayload>
/**
 * Model Sanitation
 * 
 */
export type Sanitation = $Result.DefaultSelection<Prisma.$SanitationPayload>
/**
 * Model Language
 * 
 */
export type Language = $Result.DefaultSelection<Prisma.$LanguagePayload>
/**
 * Model Transportation
 * 
 */
export type Transportation = $Result.DefaultSelection<Prisma.$TransportationPayload>
/**
 * Model AudioVisual
 * 
 */
export type AudioVisual = $Result.DefaultSelection<Prisma.$AudioVisualPayload>
/**
 * Model Security
 * 
 */
export type Security = $Result.DefaultSelection<Prisma.$SecurityPayload>
/**
 * Model MedicalDevice
 * 
 */
export type MedicalDevice = $Result.DefaultSelection<Prisma.$MedicalDevicePayload>
/**
 * Model Facilities
 * 
 */
export type Facilities = $Result.DefaultSelection<Prisma.$FacilitiesPayload>
/**
 * Model directory
 * 
 */
export type directory = $Result.DefaultSelection<Prisma.$directoryPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model nodes
 * 
 */
export type nodes = $Result.DefaultSelection<Prisma.$nodesPayload>
/**
 * Model edges
 * 
 */
export type edges = $Result.DefaultSelection<Prisma.$edgesPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Employees
 * const employees = await prisma.employee.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Employees
   * const employees = await prisma.employee.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => $Utils.JsPromise<void> : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.employee`: Exposes CRUD operations for the **employee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employee.findMany()
    * ```
    */
  get employee(): Prisma.employeeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.service_request`: Exposes CRUD operations for the **service_request** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Service_requests
    * const service_requests = await prisma.service_request.findMany()
    * ```
    */
  get service_request(): Prisma.service_requestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sanitation`: Exposes CRUD operations for the **Sanitation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sanitations
    * const sanitations = await prisma.sanitation.findMany()
    * ```
    */
  get sanitation(): Prisma.SanitationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.language`: Exposes CRUD operations for the **Language** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Languages
    * const languages = await prisma.language.findMany()
    * ```
    */
  get language(): Prisma.LanguageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transportation`: Exposes CRUD operations for the **Transportation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transportation
    * const transportation = await prisma.transportation.findMany()
    * ```
    */
  get transportation(): Prisma.TransportationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.audioVisual`: Exposes CRUD operations for the **AudioVisual** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AudioVisuals
    * const audioVisuals = await prisma.audioVisual.findMany()
    * ```
    */
  get audioVisual(): Prisma.AudioVisualDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.security`: Exposes CRUD operations for the **Security** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Securities
    * const securities = await prisma.security.findMany()
    * ```
    */
  get security(): Prisma.SecurityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.medicalDevice`: Exposes CRUD operations for the **MedicalDevice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MedicalDevices
    * const medicalDevices = await prisma.medicalDevice.findMany()
    * ```
    */
  get medicalDevice(): Prisma.MedicalDeviceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.facilities`: Exposes CRUD operations for the **Facilities** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Facilities
    * const facilities = await prisma.facilities.findMany()
    * ```
    */
  get facilities(): Prisma.FacilitiesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.directory`: Exposes CRUD operations for the **directory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Directories
    * const directories = await prisma.directory.findMany()
    * ```
    */
  get directory(): Prisma.directoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.nodes`: Exposes CRUD operations for the **nodes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Nodes
    * const nodes = await prisma.nodes.findMany()
    * ```
    */
  get nodes(): Prisma.nodesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.edges`: Exposes CRUD operations for the **edges** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Edges
    * const edges = await prisma.edges.findMany()
    * ```
    */
  get edges(): Prisma.edgesDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    employee: 'employee',
    service_request: 'service_request',
    Sanitation: 'Sanitation',
    Language: 'Language',
    Transportation: 'Transportation',
    AudioVisual: 'AudioVisual',
    Security: 'Security',
    MedicalDevice: 'MedicalDevice',
    Facilities: 'Facilities',
    directory: 'directory',
    users: 'users',
    nodes: 'nodes',
    edges: 'edges'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "employee" | "service_request" | "sanitation" | "language" | "transportation" | "audioVisual" | "security" | "medicalDevice" | "facilities" | "directory" | "users" | "nodes" | "edges"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      employee: {
        payload: Prisma.$employeePayload<ExtArgs>
        fields: Prisma.employeeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.employeeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.employeeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeePayload>
          }
          findFirst: {
            args: Prisma.employeeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.employeeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeePayload>
          }
          findMany: {
            args: Prisma.employeeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeePayload>[]
          }
          create: {
            args: Prisma.employeeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeePayload>
          }
          createMany: {
            args: Prisma.employeeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.employeeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeePayload>[]
          }
          delete: {
            args: Prisma.employeeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeePayload>
          }
          update: {
            args: Prisma.employeeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeePayload>
          }
          deleteMany: {
            args: Prisma.employeeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.employeeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.employeeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeePayload>[]
          }
          upsert: {
            args: Prisma.employeeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeePayload>
          }
          aggregate: {
            args: Prisma.EmployeeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployee>
          }
          groupBy: {
            args: Prisma.employeeGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeGroupByOutputType>[]
          }
          count: {
            args: Prisma.employeeCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeCountAggregateOutputType> | number
          }
        }
      }
      service_request: {
        payload: Prisma.$service_requestPayload<ExtArgs>
        fields: Prisma.service_requestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.service_requestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_requestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.service_requestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_requestPayload>
          }
          findFirst: {
            args: Prisma.service_requestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_requestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.service_requestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_requestPayload>
          }
          findMany: {
            args: Prisma.service_requestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_requestPayload>[]
          }
          create: {
            args: Prisma.service_requestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_requestPayload>
          }
          createMany: {
            args: Prisma.service_requestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.service_requestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_requestPayload>[]
          }
          delete: {
            args: Prisma.service_requestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_requestPayload>
          }
          update: {
            args: Prisma.service_requestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_requestPayload>
          }
          deleteMany: {
            args: Prisma.service_requestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.service_requestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.service_requestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_requestPayload>[]
          }
          upsert: {
            args: Prisma.service_requestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_requestPayload>
          }
          aggregate: {
            args: Prisma.Service_requestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService_request>
          }
          groupBy: {
            args: Prisma.service_requestGroupByArgs<ExtArgs>
            result: $Utils.Optional<Service_requestGroupByOutputType>[]
          }
          count: {
            args: Prisma.service_requestCountArgs<ExtArgs>
            result: $Utils.Optional<Service_requestCountAggregateOutputType> | number
          }
        }
      }
      Sanitation: {
        payload: Prisma.$SanitationPayload<ExtArgs>
        fields: Prisma.SanitationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SanitationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanitationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SanitationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanitationPayload>
          }
          findFirst: {
            args: Prisma.SanitationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanitationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SanitationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanitationPayload>
          }
          findMany: {
            args: Prisma.SanitationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanitationPayload>[]
          }
          create: {
            args: Prisma.SanitationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanitationPayload>
          }
          createMany: {
            args: Prisma.SanitationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SanitationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanitationPayload>[]
          }
          delete: {
            args: Prisma.SanitationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanitationPayload>
          }
          update: {
            args: Prisma.SanitationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanitationPayload>
          }
          deleteMany: {
            args: Prisma.SanitationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SanitationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SanitationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanitationPayload>[]
          }
          upsert: {
            args: Prisma.SanitationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanitationPayload>
          }
          aggregate: {
            args: Prisma.SanitationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSanitation>
          }
          groupBy: {
            args: Prisma.SanitationGroupByArgs<ExtArgs>
            result: $Utils.Optional<SanitationGroupByOutputType>[]
          }
          count: {
            args: Prisma.SanitationCountArgs<ExtArgs>
            result: $Utils.Optional<SanitationCountAggregateOutputType> | number
          }
        }
      }
      Language: {
        payload: Prisma.$LanguagePayload<ExtArgs>
        fields: Prisma.LanguageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LanguageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LanguagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LanguageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LanguagePayload>
          }
          findFirst: {
            args: Prisma.LanguageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LanguagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LanguageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LanguagePayload>
          }
          findMany: {
            args: Prisma.LanguageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LanguagePayload>[]
          }
          create: {
            args: Prisma.LanguageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LanguagePayload>
          }
          createMany: {
            args: Prisma.LanguageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LanguageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LanguagePayload>[]
          }
          delete: {
            args: Prisma.LanguageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LanguagePayload>
          }
          update: {
            args: Prisma.LanguageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LanguagePayload>
          }
          deleteMany: {
            args: Prisma.LanguageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LanguageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LanguageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LanguagePayload>[]
          }
          upsert: {
            args: Prisma.LanguageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LanguagePayload>
          }
          aggregate: {
            args: Prisma.LanguageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLanguage>
          }
          groupBy: {
            args: Prisma.LanguageGroupByArgs<ExtArgs>
            result: $Utils.Optional<LanguageGroupByOutputType>[]
          }
          count: {
            args: Prisma.LanguageCountArgs<ExtArgs>
            result: $Utils.Optional<LanguageCountAggregateOutputType> | number
          }
        }
      }
      Transportation: {
        payload: Prisma.$TransportationPayload<ExtArgs>
        fields: Prisma.TransportationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransportationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransportationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportationPayload>
          }
          findFirst: {
            args: Prisma.TransportationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransportationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportationPayload>
          }
          findMany: {
            args: Prisma.TransportationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportationPayload>[]
          }
          create: {
            args: Prisma.TransportationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportationPayload>
          }
          createMany: {
            args: Prisma.TransportationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransportationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportationPayload>[]
          }
          delete: {
            args: Prisma.TransportationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportationPayload>
          }
          update: {
            args: Prisma.TransportationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportationPayload>
          }
          deleteMany: {
            args: Prisma.TransportationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransportationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransportationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportationPayload>[]
          }
          upsert: {
            args: Prisma.TransportationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransportationPayload>
          }
          aggregate: {
            args: Prisma.TransportationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransportation>
          }
          groupBy: {
            args: Prisma.TransportationGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransportationGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransportationCountArgs<ExtArgs>
            result: $Utils.Optional<TransportationCountAggregateOutputType> | number
          }
        }
      }
      AudioVisual: {
        payload: Prisma.$AudioVisualPayload<ExtArgs>
        fields: Prisma.AudioVisualFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AudioVisualFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioVisualPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AudioVisualFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioVisualPayload>
          }
          findFirst: {
            args: Prisma.AudioVisualFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioVisualPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AudioVisualFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioVisualPayload>
          }
          findMany: {
            args: Prisma.AudioVisualFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioVisualPayload>[]
          }
          create: {
            args: Prisma.AudioVisualCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioVisualPayload>
          }
          createMany: {
            args: Prisma.AudioVisualCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AudioVisualCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioVisualPayload>[]
          }
          delete: {
            args: Prisma.AudioVisualDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioVisualPayload>
          }
          update: {
            args: Prisma.AudioVisualUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioVisualPayload>
          }
          deleteMany: {
            args: Prisma.AudioVisualDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AudioVisualUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AudioVisualUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioVisualPayload>[]
          }
          upsert: {
            args: Prisma.AudioVisualUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioVisualPayload>
          }
          aggregate: {
            args: Prisma.AudioVisualAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAudioVisual>
          }
          groupBy: {
            args: Prisma.AudioVisualGroupByArgs<ExtArgs>
            result: $Utils.Optional<AudioVisualGroupByOutputType>[]
          }
          count: {
            args: Prisma.AudioVisualCountArgs<ExtArgs>
            result: $Utils.Optional<AudioVisualCountAggregateOutputType> | number
          }
        }
      }
      Security: {
        payload: Prisma.$SecurityPayload<ExtArgs>
        fields: Prisma.SecurityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SecurityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SecurityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityPayload>
          }
          findFirst: {
            args: Prisma.SecurityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SecurityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityPayload>
          }
          findMany: {
            args: Prisma.SecurityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityPayload>[]
          }
          create: {
            args: Prisma.SecurityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityPayload>
          }
          createMany: {
            args: Prisma.SecurityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SecurityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityPayload>[]
          }
          delete: {
            args: Prisma.SecurityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityPayload>
          }
          update: {
            args: Prisma.SecurityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityPayload>
          }
          deleteMany: {
            args: Prisma.SecurityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SecurityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SecurityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityPayload>[]
          }
          upsert: {
            args: Prisma.SecurityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityPayload>
          }
          aggregate: {
            args: Prisma.SecurityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSecurity>
          }
          groupBy: {
            args: Prisma.SecurityGroupByArgs<ExtArgs>
            result: $Utils.Optional<SecurityGroupByOutputType>[]
          }
          count: {
            args: Prisma.SecurityCountArgs<ExtArgs>
            result: $Utils.Optional<SecurityCountAggregateOutputType> | number
          }
        }
      }
      MedicalDevice: {
        payload: Prisma.$MedicalDevicePayload<ExtArgs>
        fields: Prisma.MedicalDeviceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MedicalDeviceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalDevicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MedicalDeviceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalDevicePayload>
          }
          findFirst: {
            args: Prisma.MedicalDeviceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalDevicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MedicalDeviceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalDevicePayload>
          }
          findMany: {
            args: Prisma.MedicalDeviceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalDevicePayload>[]
          }
          create: {
            args: Prisma.MedicalDeviceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalDevicePayload>
          }
          createMany: {
            args: Prisma.MedicalDeviceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MedicalDeviceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalDevicePayload>[]
          }
          delete: {
            args: Prisma.MedicalDeviceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalDevicePayload>
          }
          update: {
            args: Prisma.MedicalDeviceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalDevicePayload>
          }
          deleteMany: {
            args: Prisma.MedicalDeviceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MedicalDeviceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MedicalDeviceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalDevicePayload>[]
          }
          upsert: {
            args: Prisma.MedicalDeviceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalDevicePayload>
          }
          aggregate: {
            args: Prisma.MedicalDeviceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedicalDevice>
          }
          groupBy: {
            args: Prisma.MedicalDeviceGroupByArgs<ExtArgs>
            result: $Utils.Optional<MedicalDeviceGroupByOutputType>[]
          }
          count: {
            args: Prisma.MedicalDeviceCountArgs<ExtArgs>
            result: $Utils.Optional<MedicalDeviceCountAggregateOutputType> | number
          }
        }
      }
      Facilities: {
        payload: Prisma.$FacilitiesPayload<ExtArgs>
        fields: Prisma.FacilitiesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FacilitiesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacilitiesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FacilitiesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacilitiesPayload>
          }
          findFirst: {
            args: Prisma.FacilitiesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacilitiesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FacilitiesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacilitiesPayload>
          }
          findMany: {
            args: Prisma.FacilitiesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacilitiesPayload>[]
          }
          create: {
            args: Prisma.FacilitiesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacilitiesPayload>
          }
          createMany: {
            args: Prisma.FacilitiesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FacilitiesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacilitiesPayload>[]
          }
          delete: {
            args: Prisma.FacilitiesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacilitiesPayload>
          }
          update: {
            args: Prisma.FacilitiesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacilitiesPayload>
          }
          deleteMany: {
            args: Prisma.FacilitiesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FacilitiesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FacilitiesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacilitiesPayload>[]
          }
          upsert: {
            args: Prisma.FacilitiesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacilitiesPayload>
          }
          aggregate: {
            args: Prisma.FacilitiesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFacilities>
          }
          groupBy: {
            args: Prisma.FacilitiesGroupByArgs<ExtArgs>
            result: $Utils.Optional<FacilitiesGroupByOutputType>[]
          }
          count: {
            args: Prisma.FacilitiesCountArgs<ExtArgs>
            result: $Utils.Optional<FacilitiesCountAggregateOutputType> | number
          }
        }
      }
      directory: {
        payload: Prisma.$directoryPayload<ExtArgs>
        fields: Prisma.directoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.directoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$directoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.directoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$directoryPayload>
          }
          findFirst: {
            args: Prisma.directoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$directoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.directoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$directoryPayload>
          }
          findMany: {
            args: Prisma.directoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$directoryPayload>[]
          }
          create: {
            args: Prisma.directoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$directoryPayload>
          }
          createMany: {
            args: Prisma.directoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.directoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$directoryPayload>[]
          }
          delete: {
            args: Prisma.directoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$directoryPayload>
          }
          update: {
            args: Prisma.directoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$directoryPayload>
          }
          deleteMany: {
            args: Prisma.directoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.directoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.directoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$directoryPayload>[]
          }
          upsert: {
            args: Prisma.directoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$directoryPayload>
          }
          aggregate: {
            args: Prisma.DirectoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDirectory>
          }
          groupBy: {
            args: Prisma.directoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<DirectoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.directoryCountArgs<ExtArgs>
            result: $Utils.Optional<DirectoryCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      nodes: {
        payload: Prisma.$nodesPayload<ExtArgs>
        fields: Prisma.nodesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.nodesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nodesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.nodesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nodesPayload>
          }
          findFirst: {
            args: Prisma.nodesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nodesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.nodesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nodesPayload>
          }
          findMany: {
            args: Prisma.nodesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nodesPayload>[]
          }
          create: {
            args: Prisma.nodesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nodesPayload>
          }
          createMany: {
            args: Prisma.nodesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.nodesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nodesPayload>[]
          }
          delete: {
            args: Prisma.nodesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nodesPayload>
          }
          update: {
            args: Prisma.nodesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nodesPayload>
          }
          deleteMany: {
            args: Prisma.nodesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.nodesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.nodesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nodesPayload>[]
          }
          upsert: {
            args: Prisma.nodesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nodesPayload>
          }
          aggregate: {
            args: Prisma.NodesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNodes>
          }
          groupBy: {
            args: Prisma.nodesGroupByArgs<ExtArgs>
            result: $Utils.Optional<NodesGroupByOutputType>[]
          }
          count: {
            args: Prisma.nodesCountArgs<ExtArgs>
            result: $Utils.Optional<NodesCountAggregateOutputType> | number
          }
        }
      }
      edges: {
        payload: Prisma.$edgesPayload<ExtArgs>
        fields: Prisma.edgesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.edgesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$edgesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.edgesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$edgesPayload>
          }
          findFirst: {
            args: Prisma.edgesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$edgesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.edgesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$edgesPayload>
          }
          findMany: {
            args: Prisma.edgesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$edgesPayload>[]
          }
          create: {
            args: Prisma.edgesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$edgesPayload>
          }
          createMany: {
            args: Prisma.edgesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.edgesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$edgesPayload>[]
          }
          delete: {
            args: Prisma.edgesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$edgesPayload>
          }
          update: {
            args: Prisma.edgesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$edgesPayload>
          }
          deleteMany: {
            args: Prisma.edgesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.edgesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.edgesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$edgesPayload>[]
          }
          upsert: {
            args: Prisma.edgesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$edgesPayload>
          }
          aggregate: {
            args: Prisma.EdgesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEdges>
          }
          groupBy: {
            args: Prisma.edgesGroupByArgs<ExtArgs>
            result: $Utils.Optional<EdgesGroupByOutputType>[]
          }
          count: {
            args: Prisma.edgesCountArgs<ExtArgs>
            result: $Utils.Optional<EdgesCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    employee?: employeeOmit
    service_request?: service_requestOmit
    sanitation?: SanitationOmit
    language?: LanguageOmit
    transportation?: TransportationOmit
    audioVisual?: AudioVisualOmit
    security?: SecurityOmit
    medicalDevice?: MedicalDeviceOmit
    facilities?: FacilitiesOmit
    directory?: directoryOmit
    users?: usersOmit
    nodes?: nodesOmit
    edges?: edgesOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type EmployeeCountOutputType
   */

  export type EmployeeCountOutputType = {
    requests: number
  }

  export type EmployeeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requests?: boolean | EmployeeCountOutputTypeCountRequestsArgs
  }

  // Custom InputTypes
  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCountOutputType
     */
    select?: EmployeeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: service_requestWhereInput
  }


  /**
   * Count Type NodesCountOutputType
   */

  export type NodesCountOutputType = {
    outgoingEdges: number
    incomingEdges: number
  }

  export type NodesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    outgoingEdges?: boolean | NodesCountOutputTypeCountOutgoingEdgesArgs
    incomingEdges?: boolean | NodesCountOutputTypeCountIncomingEdgesArgs
  }

  // Custom InputTypes
  /**
   * NodesCountOutputType without action
   */
  export type NodesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NodesCountOutputType
     */
    select?: NodesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NodesCountOutputType without action
   */
  export type NodesCountOutputTypeCountOutgoingEdgesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: edgesWhereInput
  }

  /**
   * NodesCountOutputType without action
   */
  export type NodesCountOutputTypeCountIncomingEdgesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: edgesWhereInput
  }


  /**
   * Models
   */

  /**
   * Model employee
   */

  export type AggregateEmployee = {
    _count: EmployeeCountAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  export type EmployeeMinAggregateOutputType = {
    id: string | null
    employee_name: string | null
    created_at: Date | null
  }

  export type EmployeeMaxAggregateOutputType = {
    id: string | null
    employee_name: string | null
    created_at: Date | null
  }

  export type EmployeeCountAggregateOutputType = {
    id: number
    employee_name: number
    created_at: number
    _all: number
  }


  export type EmployeeMinAggregateInputType = {
    id?: true
    employee_name?: true
    created_at?: true
  }

  export type EmployeeMaxAggregateInputType = {
    id?: true
    employee_name?: true
    created_at?: true
  }

  export type EmployeeCountAggregateInputType = {
    id?: true
    employee_name?: true
    created_at?: true
    _all?: true
  }

  export type EmployeeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which employee to aggregate.
     */
    where?: employeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employees to fetch.
     */
    orderBy?: employeeOrderByWithRelationInput | employeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: employeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned employees
    **/
    _count?: true | EmployeeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeMaxAggregateInputType
  }

  export type GetEmployeeAggregateType<T extends EmployeeAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployee[P]>
      : GetScalarType<T[P], AggregateEmployee[P]>
  }




  export type employeeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: employeeWhereInput
    orderBy?: employeeOrderByWithAggregationInput | employeeOrderByWithAggregationInput[]
    by: EmployeeScalarFieldEnum[] | EmployeeScalarFieldEnum
    having?: employeeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeCountAggregateInputType | true
    _min?: EmployeeMinAggregateInputType
    _max?: EmployeeMaxAggregateInputType
  }

  export type EmployeeGroupByOutputType = {
    id: string
    employee_name: string
    created_at: Date
    _count: EmployeeCountAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  type GetEmployeeGroupByPayload<T extends employeeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
        }
      >
    >


  export type employeeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_name?: boolean
    created_at?: boolean
    requests?: boolean | employee$requestsArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type employeeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_name?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["employee"]>

  export type employeeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employee_name?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["employee"]>

  export type employeeSelectScalar = {
    id?: boolean
    employee_name?: boolean
    created_at?: boolean
  }

  export type employeeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employee_name" | "created_at", ExtArgs["result"]["employee"]>
  export type employeeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requests?: boolean | employee$requestsArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type employeeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type employeeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $employeePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "employee"
    objects: {
      requests: Prisma.$service_requestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employee_name: string
      created_at: Date
    }, ExtArgs["result"]["employee"]>
    composites: {}
  }

  type employeeGetPayload<S extends boolean | null | undefined | employeeDefaultArgs> = $Result.GetResult<Prisma.$employeePayload, S>

  type employeeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<employeeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeCountAggregateInputType | true
    }

  export interface employeeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['employee'], meta: { name: 'employee' } }
    /**
     * Find zero or one Employee that matches the filter.
     * @param {employeeFindUniqueArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends employeeFindUniqueArgs>(args: SelectSubset<T, employeeFindUniqueArgs<ExtArgs>>): Prisma__employeeClient<$Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Employee that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {employeeFindUniqueOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends employeeFindUniqueOrThrowArgs>(args: SelectSubset<T, employeeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__employeeClient<$Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeeFindFirstArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends employeeFindFirstArgs>(args?: SelectSubset<T, employeeFindFirstArgs<ExtArgs>>): Prisma__employeeClient<$Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeeFindFirstOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends employeeFindFirstOrThrowArgs>(args?: SelectSubset<T, employeeFindFirstOrThrowArgs<ExtArgs>>): Prisma__employeeClient<$Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employees
     * const employees = await prisma.employee.findMany()
     * 
     * // Get first 10 Employees
     * const employees = await prisma.employee.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeWithIdOnly = await prisma.employee.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends employeeFindManyArgs>(args?: SelectSubset<T, employeeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Employee.
     * @param {employeeCreateArgs} args - Arguments to create a Employee.
     * @example
     * // Create one Employee
     * const Employee = await prisma.employee.create({
     *   data: {
     *     // ... data to create a Employee
     *   }
     * })
     * 
     */
    create<T extends employeeCreateArgs>(args: SelectSubset<T, employeeCreateArgs<ExtArgs>>): Prisma__employeeClient<$Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Employees.
     * @param {employeeCreateManyArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends employeeCreateManyArgs>(args?: SelectSubset<T, employeeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Employees and returns the data saved in the database.
     * @param {employeeCreateManyAndReturnArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Employees and only return the `id`
     * const employeeWithIdOnly = await prisma.employee.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends employeeCreateManyAndReturnArgs>(args?: SelectSubset<T, employeeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Employee.
     * @param {employeeDeleteArgs} args - Arguments to delete one Employee.
     * @example
     * // Delete one Employee
     * const Employee = await prisma.employee.delete({
     *   where: {
     *     // ... filter to delete one Employee
     *   }
     * })
     * 
     */
    delete<T extends employeeDeleteArgs>(args: SelectSubset<T, employeeDeleteArgs<ExtArgs>>): Prisma__employeeClient<$Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Employee.
     * @param {employeeUpdateArgs} args - Arguments to update one Employee.
     * @example
     * // Update one Employee
     * const employee = await prisma.employee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends employeeUpdateArgs>(args: SelectSubset<T, employeeUpdateArgs<ExtArgs>>): Prisma__employeeClient<$Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Employees.
     * @param {employeeDeleteManyArgs} args - Arguments to filter Employees to delete.
     * @example
     * // Delete a few Employees
     * const { count } = await prisma.employee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends employeeDeleteManyArgs>(args?: SelectSubset<T, employeeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends employeeUpdateManyArgs>(args: SelectSubset<T, employeeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees and returns the data updated in the database.
     * @param {employeeUpdateManyAndReturnArgs} args - Arguments to update many Employees.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Employees and only return the `id`
     * const employeeWithIdOnly = await prisma.employee.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends employeeUpdateManyAndReturnArgs>(args: SelectSubset<T, employeeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Employee.
     * @param {employeeUpsertArgs} args - Arguments to update or create a Employee.
     * @example
     * // Update or create a Employee
     * const employee = await prisma.employee.upsert({
     *   create: {
     *     // ... data to create a Employee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employee we want to update
     *   }
     * })
     */
    upsert<T extends employeeUpsertArgs>(args: SelectSubset<T, employeeUpsertArgs<ExtArgs>>): Prisma__employeeClient<$Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeeCountArgs} args - Arguments to filter Employees to count.
     * @example
     * // Count the number of Employees
     * const count = await prisma.employee.count({
     *   where: {
     *     // ... the filter for the Employees we want to count
     *   }
     * })
    **/
    count<T extends employeeCountArgs>(
      args?: Subset<T, employeeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeAggregateArgs>(args: Subset<T, EmployeeAggregateArgs>): Prisma.PrismaPromise<GetEmployeeAggregateType<T>>

    /**
     * Group by Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends employeeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: employeeGroupByArgs['orderBy'] }
        : { orderBy?: employeeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, employeeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the employee model
   */
  readonly fields: employeeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for employee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__employeeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    requests<T extends employee$requestsArgs<ExtArgs> = {}>(args?: Subset<T, employee$requestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$service_requestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the employee model
   */
  interface employeeFieldRefs {
    readonly id: FieldRef<"employee", 'String'>
    readonly employee_name: FieldRef<"employee", 'String'>
    readonly created_at: FieldRef<"employee", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * employee findUnique
   */
  export type employeeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
    /**
     * Filter, which employee to fetch.
     */
    where: employeeWhereUniqueInput
  }

  /**
   * employee findUniqueOrThrow
   */
  export type employeeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
    /**
     * Filter, which employee to fetch.
     */
    where: employeeWhereUniqueInput
  }

  /**
   * employee findFirst
   */
  export type employeeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
    /**
     * Filter, which employee to fetch.
     */
    where?: employeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employees to fetch.
     */
    orderBy?: employeeOrderByWithRelationInput | employeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for employees.
     */
    cursor?: employeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * employee findFirstOrThrow
   */
  export type employeeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
    /**
     * Filter, which employee to fetch.
     */
    where?: employeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employees to fetch.
     */
    orderBy?: employeeOrderByWithRelationInput | employeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for employees.
     */
    cursor?: employeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * employee findMany
   */
  export type employeeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
    /**
     * Filter, which employees to fetch.
     */
    where?: employeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employees to fetch.
     */
    orderBy?: employeeOrderByWithRelationInput | employeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing employees.
     */
    cursor?: employeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employees.
     */
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * employee create
   */
  export type employeeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
    /**
     * The data needed to create a employee.
     */
    data: XOR<employeeCreateInput, employeeUncheckedCreateInput>
  }

  /**
   * employee createMany
   */
  export type employeeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many employees.
     */
    data: employeeCreateManyInput | employeeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * employee createManyAndReturn
   */
  export type employeeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * The data used to create many employees.
     */
    data: employeeCreateManyInput | employeeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * employee update
   */
  export type employeeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
    /**
     * The data needed to update a employee.
     */
    data: XOR<employeeUpdateInput, employeeUncheckedUpdateInput>
    /**
     * Choose, which employee to update.
     */
    where: employeeWhereUniqueInput
  }

  /**
   * employee updateMany
   */
  export type employeeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update employees.
     */
    data: XOR<employeeUpdateManyMutationInput, employeeUncheckedUpdateManyInput>
    /**
     * Filter which employees to update
     */
    where?: employeeWhereInput
    /**
     * Limit how many employees to update.
     */
    limit?: number
  }

  /**
   * employee updateManyAndReturn
   */
  export type employeeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * The data used to update employees.
     */
    data: XOR<employeeUpdateManyMutationInput, employeeUncheckedUpdateManyInput>
    /**
     * Filter which employees to update
     */
    where?: employeeWhereInput
    /**
     * Limit how many employees to update.
     */
    limit?: number
  }

  /**
   * employee upsert
   */
  export type employeeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
    /**
     * The filter to search for the employee to update in case it exists.
     */
    where: employeeWhereUniqueInput
    /**
     * In case the employee found by the `where` argument doesn't exist, create a new employee with this data.
     */
    create: XOR<employeeCreateInput, employeeUncheckedCreateInput>
    /**
     * In case the employee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<employeeUpdateInput, employeeUncheckedUpdateInput>
  }

  /**
   * employee delete
   */
  export type employeeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
    /**
     * Filter which employee to delete.
     */
    where: employeeWhereUniqueInput
  }

  /**
   * employee deleteMany
   */
  export type employeeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which employees to delete
     */
    where?: employeeWhereInput
    /**
     * Limit how many employees to delete.
     */
    limit?: number
  }

  /**
   * employee.requests
   */
  export type employee$requestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_request
     */
    select?: service_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_request
     */
    omit?: service_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_requestInclude<ExtArgs> | null
    where?: service_requestWhereInput
    orderBy?: service_requestOrderByWithRelationInput | service_requestOrderByWithRelationInput[]
    cursor?: service_requestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Service_requestScalarFieldEnum | Service_requestScalarFieldEnum[]
  }

  /**
   * employee without action
   */
  export type employeeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
  }


  /**
   * Model service_request
   */

  export type AggregateService_request = {
    _count: Service_requestCountAggregateOutputType | null
    _avg: Service_requestAvgAggregateOutputType | null
    _sum: Service_requestSumAggregateOutputType | null
    _min: Service_requestMinAggregateOutputType | null
    _max: Service_requestMaxAggregateOutputType | null
  }

  export type Service_requestAvgAggregateOutputType = {
    request_id: number | null
  }

  export type Service_requestSumAggregateOutputType = {
    request_id: number | null
  }

  export type Service_requestMinAggregateOutputType = {
    request_id: number | null
    name: string | null
    employee_id: string | null
    priority: string | null
    location: string | null
    department: string | null
    status: string | null
    request_type: string | null
    request_date: Date | null
    additional_comments: string | null
    assigned_employee: string | null
  }

  export type Service_requestMaxAggregateOutputType = {
    request_id: number | null
    name: string | null
    employee_id: string | null
    priority: string | null
    location: string | null
    department: string | null
    status: string | null
    request_type: string | null
    request_date: Date | null
    additional_comments: string | null
    assigned_employee: string | null
  }

  export type Service_requestCountAggregateOutputType = {
    request_id: number
    name: number
    employee_id: number
    priority: number
    location: number
    department: number
    status: number
    request_type: number
    request_date: number
    additional_comments: number
    assigned_employee: number
    _all: number
  }


  export type Service_requestAvgAggregateInputType = {
    request_id?: true
  }

  export type Service_requestSumAggregateInputType = {
    request_id?: true
  }

  export type Service_requestMinAggregateInputType = {
    request_id?: true
    name?: true
    employee_id?: true
    priority?: true
    location?: true
    department?: true
    status?: true
    request_type?: true
    request_date?: true
    additional_comments?: true
    assigned_employee?: true
  }

  export type Service_requestMaxAggregateInputType = {
    request_id?: true
    name?: true
    employee_id?: true
    priority?: true
    location?: true
    department?: true
    status?: true
    request_type?: true
    request_date?: true
    additional_comments?: true
    assigned_employee?: true
  }

  export type Service_requestCountAggregateInputType = {
    request_id?: true
    name?: true
    employee_id?: true
    priority?: true
    location?: true
    department?: true
    status?: true
    request_type?: true
    request_date?: true
    additional_comments?: true
    assigned_employee?: true
    _all?: true
  }

  export type Service_requestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which service_request to aggregate.
     */
    where?: service_requestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of service_requests to fetch.
     */
    orderBy?: service_requestOrderByWithRelationInput | service_requestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: service_requestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` service_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` service_requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned service_requests
    **/
    _count?: true | Service_requestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Service_requestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Service_requestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Service_requestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Service_requestMaxAggregateInputType
  }

  export type GetService_requestAggregateType<T extends Service_requestAggregateArgs> = {
        [P in keyof T & keyof AggregateService_request]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService_request[P]>
      : GetScalarType<T[P], AggregateService_request[P]>
  }




  export type service_requestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: service_requestWhereInput
    orderBy?: service_requestOrderByWithAggregationInput | service_requestOrderByWithAggregationInput[]
    by: Service_requestScalarFieldEnum[] | Service_requestScalarFieldEnum
    having?: service_requestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Service_requestCountAggregateInputType | true
    _avg?: Service_requestAvgAggregateInputType
    _sum?: Service_requestSumAggregateInputType
    _min?: Service_requestMinAggregateInputType
    _max?: Service_requestMaxAggregateInputType
  }

  export type Service_requestGroupByOutputType = {
    request_id: number
    name: string
    employee_id: string
    priority: string
    location: string
    department: string
    status: string
    request_type: string
    request_date: Date
    additional_comments: string | null
    assigned_employee: string | null
    _count: Service_requestCountAggregateOutputType | null
    _avg: Service_requestAvgAggregateOutputType | null
    _sum: Service_requestSumAggregateOutputType | null
    _min: Service_requestMinAggregateOutputType | null
    _max: Service_requestMaxAggregateOutputType | null
  }

  type GetService_requestGroupByPayload<T extends service_requestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Service_requestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Service_requestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Service_requestGroupByOutputType[P]>
            : GetScalarType<T[P], Service_requestGroupByOutputType[P]>
        }
      >
    >


  export type service_requestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    name?: boolean
    employee_id?: boolean
    priority?: boolean
    location?: boolean
    department?: boolean
    status?: boolean
    request_type?: boolean
    request_date?: boolean
    additional_comments?: boolean
    assigned_employee?: boolean
    employee?: boolean | service_request$employeeArgs<ExtArgs>
    sanitation?: boolean | service_request$sanitationArgs<ExtArgs>
    language?: boolean | service_request$languageArgs<ExtArgs>
    audioVisual?: boolean | service_request$audioVisualArgs<ExtArgs>
    security?: boolean | service_request$securityArgs<ExtArgs>
    transportation?: boolean | service_request$transportationArgs<ExtArgs>
    medicalDevice?: boolean | service_request$medicalDeviceArgs<ExtArgs>
    facilities?: boolean | service_request$facilitiesArgs<ExtArgs>
  }, ExtArgs["result"]["service_request"]>

  export type service_requestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    name?: boolean
    employee_id?: boolean
    priority?: boolean
    location?: boolean
    department?: boolean
    status?: boolean
    request_type?: boolean
    request_date?: boolean
    additional_comments?: boolean
    assigned_employee?: boolean
    employee?: boolean | service_request$employeeArgs<ExtArgs>
  }, ExtArgs["result"]["service_request"]>

  export type service_requestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    name?: boolean
    employee_id?: boolean
    priority?: boolean
    location?: boolean
    department?: boolean
    status?: boolean
    request_type?: boolean
    request_date?: boolean
    additional_comments?: boolean
    assigned_employee?: boolean
    employee?: boolean | service_request$employeeArgs<ExtArgs>
  }, ExtArgs["result"]["service_request"]>

  export type service_requestSelectScalar = {
    request_id?: boolean
    name?: boolean
    employee_id?: boolean
    priority?: boolean
    location?: boolean
    department?: boolean
    status?: boolean
    request_type?: boolean
    request_date?: boolean
    additional_comments?: boolean
    assigned_employee?: boolean
  }

  export type service_requestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"request_id" | "name" | "employee_id" | "priority" | "location" | "department" | "status" | "request_type" | "request_date" | "additional_comments" | "assigned_employee", ExtArgs["result"]["service_request"]>
  export type service_requestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | service_request$employeeArgs<ExtArgs>
    sanitation?: boolean | service_request$sanitationArgs<ExtArgs>
    language?: boolean | service_request$languageArgs<ExtArgs>
    audioVisual?: boolean | service_request$audioVisualArgs<ExtArgs>
    security?: boolean | service_request$securityArgs<ExtArgs>
    transportation?: boolean | service_request$transportationArgs<ExtArgs>
    medicalDevice?: boolean | service_request$medicalDeviceArgs<ExtArgs>
    facilities?: boolean | service_request$facilitiesArgs<ExtArgs>
  }
  export type service_requestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | service_request$employeeArgs<ExtArgs>
  }
  export type service_requestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | service_request$employeeArgs<ExtArgs>
  }

  export type $service_requestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "service_request"
    objects: {
      employee: Prisma.$employeePayload<ExtArgs> | null
      sanitation: Prisma.$SanitationPayload<ExtArgs> | null
      language: Prisma.$LanguagePayload<ExtArgs> | null
      audioVisual: Prisma.$AudioVisualPayload<ExtArgs> | null
      security: Prisma.$SecurityPayload<ExtArgs> | null
      transportation: Prisma.$TransportationPayload<ExtArgs> | null
      medicalDevice: Prisma.$MedicalDevicePayload<ExtArgs> | null
      facilities: Prisma.$FacilitiesPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      request_id: number
      name: string
      employee_id: string
      priority: string
      location: string
      department: string
      status: string
      request_type: string
      request_date: Date
      additional_comments: string | null
      assigned_employee: string | null
    }, ExtArgs["result"]["service_request"]>
    composites: {}
  }

  type service_requestGetPayload<S extends boolean | null | undefined | service_requestDefaultArgs> = $Result.GetResult<Prisma.$service_requestPayload, S>

  type service_requestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<service_requestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Service_requestCountAggregateInputType | true
    }

  export interface service_requestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['service_request'], meta: { name: 'service_request' } }
    /**
     * Find zero or one Service_request that matches the filter.
     * @param {service_requestFindUniqueArgs} args - Arguments to find a Service_request
     * @example
     * // Get one Service_request
     * const service_request = await prisma.service_request.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends service_requestFindUniqueArgs>(args: SelectSubset<T, service_requestFindUniqueArgs<ExtArgs>>): Prisma__service_requestClient<$Result.GetResult<Prisma.$service_requestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Service_request that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {service_requestFindUniqueOrThrowArgs} args - Arguments to find a Service_request
     * @example
     * // Get one Service_request
     * const service_request = await prisma.service_request.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends service_requestFindUniqueOrThrowArgs>(args: SelectSubset<T, service_requestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__service_requestClient<$Result.GetResult<Prisma.$service_requestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service_request that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_requestFindFirstArgs} args - Arguments to find a Service_request
     * @example
     * // Get one Service_request
     * const service_request = await prisma.service_request.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends service_requestFindFirstArgs>(args?: SelectSubset<T, service_requestFindFirstArgs<ExtArgs>>): Prisma__service_requestClient<$Result.GetResult<Prisma.$service_requestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service_request that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_requestFindFirstOrThrowArgs} args - Arguments to find a Service_request
     * @example
     * // Get one Service_request
     * const service_request = await prisma.service_request.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends service_requestFindFirstOrThrowArgs>(args?: SelectSubset<T, service_requestFindFirstOrThrowArgs<ExtArgs>>): Prisma__service_requestClient<$Result.GetResult<Prisma.$service_requestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Service_requests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_requestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Service_requests
     * const service_requests = await prisma.service_request.findMany()
     * 
     * // Get first 10 Service_requests
     * const service_requests = await prisma.service_request.findMany({ take: 10 })
     * 
     * // Only select the `request_id`
     * const service_requestWithRequest_idOnly = await prisma.service_request.findMany({ select: { request_id: true } })
     * 
     */
    findMany<T extends service_requestFindManyArgs>(args?: SelectSubset<T, service_requestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$service_requestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Service_request.
     * @param {service_requestCreateArgs} args - Arguments to create a Service_request.
     * @example
     * // Create one Service_request
     * const Service_request = await prisma.service_request.create({
     *   data: {
     *     // ... data to create a Service_request
     *   }
     * })
     * 
     */
    create<T extends service_requestCreateArgs>(args: SelectSubset<T, service_requestCreateArgs<ExtArgs>>): Prisma__service_requestClient<$Result.GetResult<Prisma.$service_requestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Service_requests.
     * @param {service_requestCreateManyArgs} args - Arguments to create many Service_requests.
     * @example
     * // Create many Service_requests
     * const service_request = await prisma.service_request.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends service_requestCreateManyArgs>(args?: SelectSubset<T, service_requestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Service_requests and returns the data saved in the database.
     * @param {service_requestCreateManyAndReturnArgs} args - Arguments to create many Service_requests.
     * @example
     * // Create many Service_requests
     * const service_request = await prisma.service_request.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Service_requests and only return the `request_id`
     * const service_requestWithRequest_idOnly = await prisma.service_request.createManyAndReturn({
     *   select: { request_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends service_requestCreateManyAndReturnArgs>(args?: SelectSubset<T, service_requestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$service_requestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Service_request.
     * @param {service_requestDeleteArgs} args - Arguments to delete one Service_request.
     * @example
     * // Delete one Service_request
     * const Service_request = await prisma.service_request.delete({
     *   where: {
     *     // ... filter to delete one Service_request
     *   }
     * })
     * 
     */
    delete<T extends service_requestDeleteArgs>(args: SelectSubset<T, service_requestDeleteArgs<ExtArgs>>): Prisma__service_requestClient<$Result.GetResult<Prisma.$service_requestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Service_request.
     * @param {service_requestUpdateArgs} args - Arguments to update one Service_request.
     * @example
     * // Update one Service_request
     * const service_request = await prisma.service_request.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends service_requestUpdateArgs>(args: SelectSubset<T, service_requestUpdateArgs<ExtArgs>>): Prisma__service_requestClient<$Result.GetResult<Prisma.$service_requestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Service_requests.
     * @param {service_requestDeleteManyArgs} args - Arguments to filter Service_requests to delete.
     * @example
     * // Delete a few Service_requests
     * const { count } = await prisma.service_request.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends service_requestDeleteManyArgs>(args?: SelectSubset<T, service_requestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Service_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_requestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Service_requests
     * const service_request = await prisma.service_request.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends service_requestUpdateManyArgs>(args: SelectSubset<T, service_requestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Service_requests and returns the data updated in the database.
     * @param {service_requestUpdateManyAndReturnArgs} args - Arguments to update many Service_requests.
     * @example
     * // Update many Service_requests
     * const service_request = await prisma.service_request.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Service_requests and only return the `request_id`
     * const service_requestWithRequest_idOnly = await prisma.service_request.updateManyAndReturn({
     *   select: { request_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends service_requestUpdateManyAndReturnArgs>(args: SelectSubset<T, service_requestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$service_requestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Service_request.
     * @param {service_requestUpsertArgs} args - Arguments to update or create a Service_request.
     * @example
     * // Update or create a Service_request
     * const service_request = await prisma.service_request.upsert({
     *   create: {
     *     // ... data to create a Service_request
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service_request we want to update
     *   }
     * })
     */
    upsert<T extends service_requestUpsertArgs>(args: SelectSubset<T, service_requestUpsertArgs<ExtArgs>>): Prisma__service_requestClient<$Result.GetResult<Prisma.$service_requestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Service_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_requestCountArgs} args - Arguments to filter Service_requests to count.
     * @example
     * // Count the number of Service_requests
     * const count = await prisma.service_request.count({
     *   where: {
     *     // ... the filter for the Service_requests we want to count
     *   }
     * })
    **/
    count<T extends service_requestCountArgs>(
      args?: Subset<T, service_requestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Service_requestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service_request.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Service_requestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Service_requestAggregateArgs>(args: Subset<T, Service_requestAggregateArgs>): Prisma.PrismaPromise<GetService_requestAggregateType<T>>

    /**
     * Group by Service_request.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_requestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends service_requestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: service_requestGroupByArgs['orderBy'] }
        : { orderBy?: service_requestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, service_requestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetService_requestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the service_request model
   */
  readonly fields: service_requestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for service_request.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__service_requestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends service_request$employeeArgs<ExtArgs> = {}>(args?: Subset<T, service_request$employeeArgs<ExtArgs>>): Prisma__employeeClient<$Result.GetResult<Prisma.$employeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    sanitation<T extends service_request$sanitationArgs<ExtArgs> = {}>(args?: Subset<T, service_request$sanitationArgs<ExtArgs>>): Prisma__SanitationClient<$Result.GetResult<Prisma.$SanitationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    language<T extends service_request$languageArgs<ExtArgs> = {}>(args?: Subset<T, service_request$languageArgs<ExtArgs>>): Prisma__LanguageClient<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    audioVisual<T extends service_request$audioVisualArgs<ExtArgs> = {}>(args?: Subset<T, service_request$audioVisualArgs<ExtArgs>>): Prisma__AudioVisualClient<$Result.GetResult<Prisma.$AudioVisualPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    security<T extends service_request$securityArgs<ExtArgs> = {}>(args?: Subset<T, service_request$securityArgs<ExtArgs>>): Prisma__SecurityClient<$Result.GetResult<Prisma.$SecurityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    transportation<T extends service_request$transportationArgs<ExtArgs> = {}>(args?: Subset<T, service_request$transportationArgs<ExtArgs>>): Prisma__TransportationClient<$Result.GetResult<Prisma.$TransportationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    medicalDevice<T extends service_request$medicalDeviceArgs<ExtArgs> = {}>(args?: Subset<T, service_request$medicalDeviceArgs<ExtArgs>>): Prisma__MedicalDeviceClient<$Result.GetResult<Prisma.$MedicalDevicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    facilities<T extends service_request$facilitiesArgs<ExtArgs> = {}>(args?: Subset<T, service_request$facilitiesArgs<ExtArgs>>): Prisma__FacilitiesClient<$Result.GetResult<Prisma.$FacilitiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the service_request model
   */
  interface service_requestFieldRefs {
    readonly request_id: FieldRef<"service_request", 'Int'>
    readonly name: FieldRef<"service_request", 'String'>
    readonly employee_id: FieldRef<"service_request", 'String'>
    readonly priority: FieldRef<"service_request", 'String'>
    readonly location: FieldRef<"service_request", 'String'>
    readonly department: FieldRef<"service_request", 'String'>
    readonly status: FieldRef<"service_request", 'String'>
    readonly request_type: FieldRef<"service_request", 'String'>
    readonly request_date: FieldRef<"service_request", 'DateTime'>
    readonly additional_comments: FieldRef<"service_request", 'String'>
    readonly assigned_employee: FieldRef<"service_request", 'String'>
  }
    

  // Custom InputTypes
  /**
   * service_request findUnique
   */
  export type service_requestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_request
     */
    select?: service_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_request
     */
    omit?: service_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_requestInclude<ExtArgs> | null
    /**
     * Filter, which service_request to fetch.
     */
    where: service_requestWhereUniqueInput
  }

  /**
   * service_request findUniqueOrThrow
   */
  export type service_requestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_request
     */
    select?: service_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_request
     */
    omit?: service_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_requestInclude<ExtArgs> | null
    /**
     * Filter, which service_request to fetch.
     */
    where: service_requestWhereUniqueInput
  }

  /**
   * service_request findFirst
   */
  export type service_requestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_request
     */
    select?: service_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_request
     */
    omit?: service_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_requestInclude<ExtArgs> | null
    /**
     * Filter, which service_request to fetch.
     */
    where?: service_requestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of service_requests to fetch.
     */
    orderBy?: service_requestOrderByWithRelationInput | service_requestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for service_requests.
     */
    cursor?: service_requestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` service_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` service_requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of service_requests.
     */
    distinct?: Service_requestScalarFieldEnum | Service_requestScalarFieldEnum[]
  }

  /**
   * service_request findFirstOrThrow
   */
  export type service_requestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_request
     */
    select?: service_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_request
     */
    omit?: service_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_requestInclude<ExtArgs> | null
    /**
     * Filter, which service_request to fetch.
     */
    where?: service_requestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of service_requests to fetch.
     */
    orderBy?: service_requestOrderByWithRelationInput | service_requestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for service_requests.
     */
    cursor?: service_requestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` service_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` service_requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of service_requests.
     */
    distinct?: Service_requestScalarFieldEnum | Service_requestScalarFieldEnum[]
  }

  /**
   * service_request findMany
   */
  export type service_requestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_request
     */
    select?: service_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_request
     */
    omit?: service_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_requestInclude<ExtArgs> | null
    /**
     * Filter, which service_requests to fetch.
     */
    where?: service_requestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of service_requests to fetch.
     */
    orderBy?: service_requestOrderByWithRelationInput | service_requestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing service_requests.
     */
    cursor?: service_requestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` service_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` service_requests.
     */
    skip?: number
    distinct?: Service_requestScalarFieldEnum | Service_requestScalarFieldEnum[]
  }

  /**
   * service_request create
   */
  export type service_requestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_request
     */
    select?: service_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_request
     */
    omit?: service_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_requestInclude<ExtArgs> | null
    /**
     * The data needed to create a service_request.
     */
    data: XOR<service_requestCreateInput, service_requestUncheckedCreateInput>
  }

  /**
   * service_request createMany
   */
  export type service_requestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many service_requests.
     */
    data: service_requestCreateManyInput | service_requestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * service_request createManyAndReturn
   */
  export type service_requestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_request
     */
    select?: service_requestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the service_request
     */
    omit?: service_requestOmit<ExtArgs> | null
    /**
     * The data used to create many service_requests.
     */
    data: service_requestCreateManyInput | service_requestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_requestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * service_request update
   */
  export type service_requestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_request
     */
    select?: service_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_request
     */
    omit?: service_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_requestInclude<ExtArgs> | null
    /**
     * The data needed to update a service_request.
     */
    data: XOR<service_requestUpdateInput, service_requestUncheckedUpdateInput>
    /**
     * Choose, which service_request to update.
     */
    where: service_requestWhereUniqueInput
  }

  /**
   * service_request updateMany
   */
  export type service_requestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update service_requests.
     */
    data: XOR<service_requestUpdateManyMutationInput, service_requestUncheckedUpdateManyInput>
    /**
     * Filter which service_requests to update
     */
    where?: service_requestWhereInput
    /**
     * Limit how many service_requests to update.
     */
    limit?: number
  }

  /**
   * service_request updateManyAndReturn
   */
  export type service_requestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_request
     */
    select?: service_requestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the service_request
     */
    omit?: service_requestOmit<ExtArgs> | null
    /**
     * The data used to update service_requests.
     */
    data: XOR<service_requestUpdateManyMutationInput, service_requestUncheckedUpdateManyInput>
    /**
     * Filter which service_requests to update
     */
    where?: service_requestWhereInput
    /**
     * Limit how many service_requests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_requestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * service_request upsert
   */
  export type service_requestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_request
     */
    select?: service_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_request
     */
    omit?: service_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_requestInclude<ExtArgs> | null
    /**
     * The filter to search for the service_request to update in case it exists.
     */
    where: service_requestWhereUniqueInput
    /**
     * In case the service_request found by the `where` argument doesn't exist, create a new service_request with this data.
     */
    create: XOR<service_requestCreateInput, service_requestUncheckedCreateInput>
    /**
     * In case the service_request was found with the provided `where` argument, update it with this data.
     */
    update: XOR<service_requestUpdateInput, service_requestUncheckedUpdateInput>
  }

  /**
   * service_request delete
   */
  export type service_requestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_request
     */
    select?: service_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_request
     */
    omit?: service_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_requestInclude<ExtArgs> | null
    /**
     * Filter which service_request to delete.
     */
    where: service_requestWhereUniqueInput
  }

  /**
   * service_request deleteMany
   */
  export type service_requestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which service_requests to delete
     */
    where?: service_requestWhereInput
    /**
     * Limit how many service_requests to delete.
     */
    limit?: number
  }

  /**
   * service_request.employee
   */
  export type service_request$employeeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employee
     */
    select?: employeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employee
     */
    omit?: employeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeeInclude<ExtArgs> | null
    where?: employeeWhereInput
  }

  /**
   * service_request.sanitation
   */
  export type service_request$sanitationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanitation
     */
    select?: SanitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sanitation
     */
    omit?: SanitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanitationInclude<ExtArgs> | null
    where?: SanitationWhereInput
  }

  /**
   * service_request.language
   */
  export type service_request$languageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageInclude<ExtArgs> | null
    where?: LanguageWhereInput
  }

  /**
   * service_request.audioVisual
   */
  export type service_request$audioVisualArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioVisual
     */
    select?: AudioVisualSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioVisual
     */
    omit?: AudioVisualOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioVisualInclude<ExtArgs> | null
    where?: AudioVisualWhereInput
  }

  /**
   * service_request.security
   */
  export type service_request$securityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Security
     */
    select?: SecuritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Security
     */
    omit?: SecurityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityInclude<ExtArgs> | null
    where?: SecurityWhereInput
  }

  /**
   * service_request.transportation
   */
  export type service_request$transportationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transportation
     */
    select?: TransportationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transportation
     */
    omit?: TransportationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportationInclude<ExtArgs> | null
    where?: TransportationWhereInput
  }

  /**
   * service_request.medicalDevice
   */
  export type service_request$medicalDeviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDevice
     */
    select?: MedicalDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDevice
     */
    omit?: MedicalDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDeviceInclude<ExtArgs> | null
    where?: MedicalDeviceWhereInput
  }

  /**
   * service_request.facilities
   */
  export type service_request$facilitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facilities
     */
    select?: FacilitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Facilities
     */
    omit?: FacilitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacilitiesInclude<ExtArgs> | null
    where?: FacilitiesWhereInput
  }

  /**
   * service_request without action
   */
  export type service_requestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_request
     */
    select?: service_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_request
     */
    omit?: service_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_requestInclude<ExtArgs> | null
  }


  /**
   * Model Sanitation
   */

  export type AggregateSanitation = {
    _count: SanitationCountAggregateOutputType | null
    _avg: SanitationAvgAggregateOutputType | null
    _sum: SanitationSumAggregateOutputType | null
    _min: SanitationMinAggregateOutputType | null
    _max: SanitationMaxAggregateOutputType | null
  }

  export type SanitationAvgAggregateOutputType = {
    request_id: number | null
    sanitationId: number | null
  }

  export type SanitationSumAggregateOutputType = {
    request_id: number | null
    sanitationId: number | null
  }

  export type SanitationMinAggregateOutputType = {
    request_id: number | null
    cleaningType: string | null
    contaminant: string | null
    sanitationId: number | null
  }

  export type SanitationMaxAggregateOutputType = {
    request_id: number | null
    cleaningType: string | null
    contaminant: string | null
    sanitationId: number | null
  }

  export type SanitationCountAggregateOutputType = {
    request_id: number
    cleaningType: number
    contaminant: number
    sanitationId: number
    _all: number
  }


  export type SanitationAvgAggregateInputType = {
    request_id?: true
    sanitationId?: true
  }

  export type SanitationSumAggregateInputType = {
    request_id?: true
    sanitationId?: true
  }

  export type SanitationMinAggregateInputType = {
    request_id?: true
    cleaningType?: true
    contaminant?: true
    sanitationId?: true
  }

  export type SanitationMaxAggregateInputType = {
    request_id?: true
    cleaningType?: true
    contaminant?: true
    sanitationId?: true
  }

  export type SanitationCountAggregateInputType = {
    request_id?: true
    cleaningType?: true
    contaminant?: true
    sanitationId?: true
    _all?: true
  }

  export type SanitationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sanitation to aggregate.
     */
    where?: SanitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sanitations to fetch.
     */
    orderBy?: SanitationOrderByWithRelationInput | SanitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SanitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sanitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sanitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sanitations
    **/
    _count?: true | SanitationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SanitationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SanitationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SanitationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SanitationMaxAggregateInputType
  }

  export type GetSanitationAggregateType<T extends SanitationAggregateArgs> = {
        [P in keyof T & keyof AggregateSanitation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSanitation[P]>
      : GetScalarType<T[P], AggregateSanitation[P]>
  }




  export type SanitationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SanitationWhereInput
    orderBy?: SanitationOrderByWithAggregationInput | SanitationOrderByWithAggregationInput[]
    by: SanitationScalarFieldEnum[] | SanitationScalarFieldEnum
    having?: SanitationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SanitationCountAggregateInputType | true
    _avg?: SanitationAvgAggregateInputType
    _sum?: SanitationSumAggregateInputType
    _min?: SanitationMinAggregateInputType
    _max?: SanitationMaxAggregateInputType
  }

  export type SanitationGroupByOutputType = {
    request_id: number
    cleaningType: string
    contaminant: string | null
    sanitationId: number
    _count: SanitationCountAggregateOutputType | null
    _avg: SanitationAvgAggregateOutputType | null
    _sum: SanitationSumAggregateOutputType | null
    _min: SanitationMinAggregateOutputType | null
    _max: SanitationMaxAggregateOutputType | null
  }

  type GetSanitationGroupByPayload<T extends SanitationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SanitationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SanitationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SanitationGroupByOutputType[P]>
            : GetScalarType<T[P], SanitationGroupByOutputType[P]>
        }
      >
    >


  export type SanitationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    cleaningType?: boolean
    contaminant?: boolean
    sanitationId?: boolean
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sanitation"]>

  export type SanitationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    cleaningType?: boolean
    contaminant?: boolean
    sanitationId?: boolean
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sanitation"]>

  export type SanitationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    cleaningType?: boolean
    contaminant?: boolean
    sanitationId?: boolean
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sanitation"]>

  export type SanitationSelectScalar = {
    request_id?: boolean
    cleaningType?: boolean
    contaminant?: boolean
    sanitationId?: boolean
  }

  export type SanitationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"request_id" | "cleaningType" | "contaminant" | "sanitationId", ExtArgs["result"]["sanitation"]>
  export type SanitationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }
  export type SanitationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }
  export type SanitationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }

  export type $SanitationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sanitation"
    objects: {
      service_request: Prisma.$service_requestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      request_id: number
      cleaningType: string
      contaminant: string | null
      sanitationId: number
    }, ExtArgs["result"]["sanitation"]>
    composites: {}
  }

  type SanitationGetPayload<S extends boolean | null | undefined | SanitationDefaultArgs> = $Result.GetResult<Prisma.$SanitationPayload, S>

  type SanitationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SanitationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SanitationCountAggregateInputType | true
    }

  export interface SanitationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sanitation'], meta: { name: 'Sanitation' } }
    /**
     * Find zero or one Sanitation that matches the filter.
     * @param {SanitationFindUniqueArgs} args - Arguments to find a Sanitation
     * @example
     * // Get one Sanitation
     * const sanitation = await prisma.sanitation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SanitationFindUniqueArgs>(args: SelectSubset<T, SanitationFindUniqueArgs<ExtArgs>>): Prisma__SanitationClient<$Result.GetResult<Prisma.$SanitationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sanitation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SanitationFindUniqueOrThrowArgs} args - Arguments to find a Sanitation
     * @example
     * // Get one Sanitation
     * const sanitation = await prisma.sanitation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SanitationFindUniqueOrThrowArgs>(args: SelectSubset<T, SanitationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SanitationClient<$Result.GetResult<Prisma.$SanitationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sanitation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SanitationFindFirstArgs} args - Arguments to find a Sanitation
     * @example
     * // Get one Sanitation
     * const sanitation = await prisma.sanitation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SanitationFindFirstArgs>(args?: SelectSubset<T, SanitationFindFirstArgs<ExtArgs>>): Prisma__SanitationClient<$Result.GetResult<Prisma.$SanitationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sanitation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SanitationFindFirstOrThrowArgs} args - Arguments to find a Sanitation
     * @example
     * // Get one Sanitation
     * const sanitation = await prisma.sanitation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SanitationFindFirstOrThrowArgs>(args?: SelectSubset<T, SanitationFindFirstOrThrowArgs<ExtArgs>>): Prisma__SanitationClient<$Result.GetResult<Prisma.$SanitationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sanitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SanitationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sanitations
     * const sanitations = await prisma.sanitation.findMany()
     * 
     * // Get first 10 Sanitations
     * const sanitations = await prisma.sanitation.findMany({ take: 10 })
     * 
     * // Only select the `request_id`
     * const sanitationWithRequest_idOnly = await prisma.sanitation.findMany({ select: { request_id: true } })
     * 
     */
    findMany<T extends SanitationFindManyArgs>(args?: SelectSubset<T, SanitationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SanitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sanitation.
     * @param {SanitationCreateArgs} args - Arguments to create a Sanitation.
     * @example
     * // Create one Sanitation
     * const Sanitation = await prisma.sanitation.create({
     *   data: {
     *     // ... data to create a Sanitation
     *   }
     * })
     * 
     */
    create<T extends SanitationCreateArgs>(args: SelectSubset<T, SanitationCreateArgs<ExtArgs>>): Prisma__SanitationClient<$Result.GetResult<Prisma.$SanitationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sanitations.
     * @param {SanitationCreateManyArgs} args - Arguments to create many Sanitations.
     * @example
     * // Create many Sanitations
     * const sanitation = await prisma.sanitation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SanitationCreateManyArgs>(args?: SelectSubset<T, SanitationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sanitations and returns the data saved in the database.
     * @param {SanitationCreateManyAndReturnArgs} args - Arguments to create many Sanitations.
     * @example
     * // Create many Sanitations
     * const sanitation = await prisma.sanitation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sanitations and only return the `request_id`
     * const sanitationWithRequest_idOnly = await prisma.sanitation.createManyAndReturn({
     *   select: { request_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SanitationCreateManyAndReturnArgs>(args?: SelectSubset<T, SanitationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SanitationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sanitation.
     * @param {SanitationDeleteArgs} args - Arguments to delete one Sanitation.
     * @example
     * // Delete one Sanitation
     * const Sanitation = await prisma.sanitation.delete({
     *   where: {
     *     // ... filter to delete one Sanitation
     *   }
     * })
     * 
     */
    delete<T extends SanitationDeleteArgs>(args: SelectSubset<T, SanitationDeleteArgs<ExtArgs>>): Prisma__SanitationClient<$Result.GetResult<Prisma.$SanitationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sanitation.
     * @param {SanitationUpdateArgs} args - Arguments to update one Sanitation.
     * @example
     * // Update one Sanitation
     * const sanitation = await prisma.sanitation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SanitationUpdateArgs>(args: SelectSubset<T, SanitationUpdateArgs<ExtArgs>>): Prisma__SanitationClient<$Result.GetResult<Prisma.$SanitationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sanitations.
     * @param {SanitationDeleteManyArgs} args - Arguments to filter Sanitations to delete.
     * @example
     * // Delete a few Sanitations
     * const { count } = await prisma.sanitation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SanitationDeleteManyArgs>(args?: SelectSubset<T, SanitationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sanitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SanitationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sanitations
     * const sanitation = await prisma.sanitation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SanitationUpdateManyArgs>(args: SelectSubset<T, SanitationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sanitations and returns the data updated in the database.
     * @param {SanitationUpdateManyAndReturnArgs} args - Arguments to update many Sanitations.
     * @example
     * // Update many Sanitations
     * const sanitation = await prisma.sanitation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sanitations and only return the `request_id`
     * const sanitationWithRequest_idOnly = await prisma.sanitation.updateManyAndReturn({
     *   select: { request_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SanitationUpdateManyAndReturnArgs>(args: SelectSubset<T, SanitationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SanitationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sanitation.
     * @param {SanitationUpsertArgs} args - Arguments to update or create a Sanitation.
     * @example
     * // Update or create a Sanitation
     * const sanitation = await prisma.sanitation.upsert({
     *   create: {
     *     // ... data to create a Sanitation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sanitation we want to update
     *   }
     * })
     */
    upsert<T extends SanitationUpsertArgs>(args: SelectSubset<T, SanitationUpsertArgs<ExtArgs>>): Prisma__SanitationClient<$Result.GetResult<Prisma.$SanitationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sanitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SanitationCountArgs} args - Arguments to filter Sanitations to count.
     * @example
     * // Count the number of Sanitations
     * const count = await prisma.sanitation.count({
     *   where: {
     *     // ... the filter for the Sanitations we want to count
     *   }
     * })
    **/
    count<T extends SanitationCountArgs>(
      args?: Subset<T, SanitationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SanitationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sanitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SanitationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SanitationAggregateArgs>(args: Subset<T, SanitationAggregateArgs>): Prisma.PrismaPromise<GetSanitationAggregateType<T>>

    /**
     * Group by Sanitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SanitationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SanitationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SanitationGroupByArgs['orderBy'] }
        : { orderBy?: SanitationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SanitationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSanitationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sanitation model
   */
  readonly fields: SanitationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sanitation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SanitationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service_request<T extends service_requestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, service_requestDefaultArgs<ExtArgs>>): Prisma__service_requestClient<$Result.GetResult<Prisma.$service_requestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Sanitation model
   */
  interface SanitationFieldRefs {
    readonly request_id: FieldRef<"Sanitation", 'Int'>
    readonly cleaningType: FieldRef<"Sanitation", 'String'>
    readonly contaminant: FieldRef<"Sanitation", 'String'>
    readonly sanitationId: FieldRef<"Sanitation", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Sanitation findUnique
   */
  export type SanitationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanitation
     */
    select?: SanitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sanitation
     */
    omit?: SanitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanitationInclude<ExtArgs> | null
    /**
     * Filter, which Sanitation to fetch.
     */
    where: SanitationWhereUniqueInput
  }

  /**
   * Sanitation findUniqueOrThrow
   */
  export type SanitationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanitation
     */
    select?: SanitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sanitation
     */
    omit?: SanitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanitationInclude<ExtArgs> | null
    /**
     * Filter, which Sanitation to fetch.
     */
    where: SanitationWhereUniqueInput
  }

  /**
   * Sanitation findFirst
   */
  export type SanitationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanitation
     */
    select?: SanitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sanitation
     */
    omit?: SanitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanitationInclude<ExtArgs> | null
    /**
     * Filter, which Sanitation to fetch.
     */
    where?: SanitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sanitations to fetch.
     */
    orderBy?: SanitationOrderByWithRelationInput | SanitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sanitations.
     */
    cursor?: SanitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sanitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sanitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sanitations.
     */
    distinct?: SanitationScalarFieldEnum | SanitationScalarFieldEnum[]
  }

  /**
   * Sanitation findFirstOrThrow
   */
  export type SanitationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanitation
     */
    select?: SanitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sanitation
     */
    omit?: SanitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanitationInclude<ExtArgs> | null
    /**
     * Filter, which Sanitation to fetch.
     */
    where?: SanitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sanitations to fetch.
     */
    orderBy?: SanitationOrderByWithRelationInput | SanitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sanitations.
     */
    cursor?: SanitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sanitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sanitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sanitations.
     */
    distinct?: SanitationScalarFieldEnum | SanitationScalarFieldEnum[]
  }

  /**
   * Sanitation findMany
   */
  export type SanitationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanitation
     */
    select?: SanitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sanitation
     */
    omit?: SanitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanitationInclude<ExtArgs> | null
    /**
     * Filter, which Sanitations to fetch.
     */
    where?: SanitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sanitations to fetch.
     */
    orderBy?: SanitationOrderByWithRelationInput | SanitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sanitations.
     */
    cursor?: SanitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sanitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sanitations.
     */
    skip?: number
    distinct?: SanitationScalarFieldEnum | SanitationScalarFieldEnum[]
  }

  /**
   * Sanitation create
   */
  export type SanitationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanitation
     */
    select?: SanitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sanitation
     */
    omit?: SanitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanitationInclude<ExtArgs> | null
    /**
     * The data needed to create a Sanitation.
     */
    data: XOR<SanitationCreateInput, SanitationUncheckedCreateInput>
  }

  /**
   * Sanitation createMany
   */
  export type SanitationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sanitations.
     */
    data: SanitationCreateManyInput | SanitationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sanitation createManyAndReturn
   */
  export type SanitationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanitation
     */
    select?: SanitationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sanitation
     */
    omit?: SanitationOmit<ExtArgs> | null
    /**
     * The data used to create many Sanitations.
     */
    data: SanitationCreateManyInput | SanitationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanitationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Sanitation update
   */
  export type SanitationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanitation
     */
    select?: SanitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sanitation
     */
    omit?: SanitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanitationInclude<ExtArgs> | null
    /**
     * The data needed to update a Sanitation.
     */
    data: XOR<SanitationUpdateInput, SanitationUncheckedUpdateInput>
    /**
     * Choose, which Sanitation to update.
     */
    where: SanitationWhereUniqueInput
  }

  /**
   * Sanitation updateMany
   */
  export type SanitationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sanitations.
     */
    data: XOR<SanitationUpdateManyMutationInput, SanitationUncheckedUpdateManyInput>
    /**
     * Filter which Sanitations to update
     */
    where?: SanitationWhereInput
    /**
     * Limit how many Sanitations to update.
     */
    limit?: number
  }

  /**
   * Sanitation updateManyAndReturn
   */
  export type SanitationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanitation
     */
    select?: SanitationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sanitation
     */
    omit?: SanitationOmit<ExtArgs> | null
    /**
     * The data used to update Sanitations.
     */
    data: XOR<SanitationUpdateManyMutationInput, SanitationUncheckedUpdateManyInput>
    /**
     * Filter which Sanitations to update
     */
    where?: SanitationWhereInput
    /**
     * Limit how many Sanitations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanitationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Sanitation upsert
   */
  export type SanitationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanitation
     */
    select?: SanitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sanitation
     */
    omit?: SanitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanitationInclude<ExtArgs> | null
    /**
     * The filter to search for the Sanitation to update in case it exists.
     */
    where: SanitationWhereUniqueInput
    /**
     * In case the Sanitation found by the `where` argument doesn't exist, create a new Sanitation with this data.
     */
    create: XOR<SanitationCreateInput, SanitationUncheckedCreateInput>
    /**
     * In case the Sanitation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SanitationUpdateInput, SanitationUncheckedUpdateInput>
  }

  /**
   * Sanitation delete
   */
  export type SanitationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanitation
     */
    select?: SanitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sanitation
     */
    omit?: SanitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanitationInclude<ExtArgs> | null
    /**
     * Filter which Sanitation to delete.
     */
    where: SanitationWhereUniqueInput
  }

  /**
   * Sanitation deleteMany
   */
  export type SanitationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sanitations to delete
     */
    where?: SanitationWhereInput
    /**
     * Limit how many Sanitations to delete.
     */
    limit?: number
  }

  /**
   * Sanitation without action
   */
  export type SanitationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanitation
     */
    select?: SanitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sanitation
     */
    omit?: SanitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanitationInclude<ExtArgs> | null
  }


  /**
   * Model Language
   */

  export type AggregateLanguage = {
    _count: LanguageCountAggregateOutputType | null
    _avg: LanguageAvgAggregateOutputType | null
    _sum: LanguageSumAggregateOutputType | null
    _min: LanguageMinAggregateOutputType | null
    _max: LanguageMaxAggregateOutputType | null
  }

  export type LanguageAvgAggregateOutputType = {
    request_id: number | null
    languageId: number | null
  }

  export type LanguageSumAggregateOutputType = {
    request_id: number | null
    languageId: number | null
  }

  export type LanguageMinAggregateOutputType = {
    request_id: number | null
    sourceLanguage: string | null
    targetLanguage: string | null
    languageId: number | null
  }

  export type LanguageMaxAggregateOutputType = {
    request_id: number | null
    sourceLanguage: string | null
    targetLanguage: string | null
    languageId: number | null
  }

  export type LanguageCountAggregateOutputType = {
    request_id: number
    sourceLanguage: number
    targetLanguage: number
    languageId: number
    _all: number
  }


  export type LanguageAvgAggregateInputType = {
    request_id?: true
    languageId?: true
  }

  export type LanguageSumAggregateInputType = {
    request_id?: true
    languageId?: true
  }

  export type LanguageMinAggregateInputType = {
    request_id?: true
    sourceLanguage?: true
    targetLanguage?: true
    languageId?: true
  }

  export type LanguageMaxAggregateInputType = {
    request_id?: true
    sourceLanguage?: true
    targetLanguage?: true
    languageId?: true
  }

  export type LanguageCountAggregateInputType = {
    request_id?: true
    sourceLanguage?: true
    targetLanguage?: true
    languageId?: true
    _all?: true
  }

  export type LanguageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Language to aggregate.
     */
    where?: LanguageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Languages to fetch.
     */
    orderBy?: LanguageOrderByWithRelationInput | LanguageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LanguageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Languages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Languages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Languages
    **/
    _count?: true | LanguageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LanguageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LanguageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LanguageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LanguageMaxAggregateInputType
  }

  export type GetLanguageAggregateType<T extends LanguageAggregateArgs> = {
        [P in keyof T & keyof AggregateLanguage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLanguage[P]>
      : GetScalarType<T[P], AggregateLanguage[P]>
  }




  export type LanguageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LanguageWhereInput
    orderBy?: LanguageOrderByWithAggregationInput | LanguageOrderByWithAggregationInput[]
    by: LanguageScalarFieldEnum[] | LanguageScalarFieldEnum
    having?: LanguageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LanguageCountAggregateInputType | true
    _avg?: LanguageAvgAggregateInputType
    _sum?: LanguageSumAggregateInputType
    _min?: LanguageMinAggregateInputType
    _max?: LanguageMaxAggregateInputType
  }

  export type LanguageGroupByOutputType = {
    request_id: number
    sourceLanguage: string
    targetLanguage: string
    languageId: number
    _count: LanguageCountAggregateOutputType | null
    _avg: LanguageAvgAggregateOutputType | null
    _sum: LanguageSumAggregateOutputType | null
    _min: LanguageMinAggregateOutputType | null
    _max: LanguageMaxAggregateOutputType | null
  }

  type GetLanguageGroupByPayload<T extends LanguageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LanguageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LanguageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LanguageGroupByOutputType[P]>
            : GetScalarType<T[P], LanguageGroupByOutputType[P]>
        }
      >
    >


  export type LanguageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    sourceLanguage?: boolean
    targetLanguage?: boolean
    languageId?: boolean
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["language"]>

  export type LanguageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    sourceLanguage?: boolean
    targetLanguage?: boolean
    languageId?: boolean
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["language"]>

  export type LanguageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    sourceLanguage?: boolean
    targetLanguage?: boolean
    languageId?: boolean
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["language"]>

  export type LanguageSelectScalar = {
    request_id?: boolean
    sourceLanguage?: boolean
    targetLanguage?: boolean
    languageId?: boolean
  }

  export type LanguageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"request_id" | "sourceLanguage" | "targetLanguage" | "languageId", ExtArgs["result"]["language"]>
  export type LanguageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }
  export type LanguageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }
  export type LanguageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }

  export type $LanguagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Language"
    objects: {
      service_request: Prisma.$service_requestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      request_id: number
      sourceLanguage: string
      targetLanguage: string
      languageId: number
    }, ExtArgs["result"]["language"]>
    composites: {}
  }

  type LanguageGetPayload<S extends boolean | null | undefined | LanguageDefaultArgs> = $Result.GetResult<Prisma.$LanguagePayload, S>

  type LanguageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LanguageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LanguageCountAggregateInputType | true
    }

  export interface LanguageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Language'], meta: { name: 'Language' } }
    /**
     * Find zero or one Language that matches the filter.
     * @param {LanguageFindUniqueArgs} args - Arguments to find a Language
     * @example
     * // Get one Language
     * const language = await prisma.language.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LanguageFindUniqueArgs>(args: SelectSubset<T, LanguageFindUniqueArgs<ExtArgs>>): Prisma__LanguageClient<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Language that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LanguageFindUniqueOrThrowArgs} args - Arguments to find a Language
     * @example
     * // Get one Language
     * const language = await prisma.language.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LanguageFindUniqueOrThrowArgs>(args: SelectSubset<T, LanguageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LanguageClient<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Language that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LanguageFindFirstArgs} args - Arguments to find a Language
     * @example
     * // Get one Language
     * const language = await prisma.language.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LanguageFindFirstArgs>(args?: SelectSubset<T, LanguageFindFirstArgs<ExtArgs>>): Prisma__LanguageClient<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Language that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LanguageFindFirstOrThrowArgs} args - Arguments to find a Language
     * @example
     * // Get one Language
     * const language = await prisma.language.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LanguageFindFirstOrThrowArgs>(args?: SelectSubset<T, LanguageFindFirstOrThrowArgs<ExtArgs>>): Prisma__LanguageClient<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Languages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LanguageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Languages
     * const languages = await prisma.language.findMany()
     * 
     * // Get first 10 Languages
     * const languages = await prisma.language.findMany({ take: 10 })
     * 
     * // Only select the `request_id`
     * const languageWithRequest_idOnly = await prisma.language.findMany({ select: { request_id: true } })
     * 
     */
    findMany<T extends LanguageFindManyArgs>(args?: SelectSubset<T, LanguageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Language.
     * @param {LanguageCreateArgs} args - Arguments to create a Language.
     * @example
     * // Create one Language
     * const Language = await prisma.language.create({
     *   data: {
     *     // ... data to create a Language
     *   }
     * })
     * 
     */
    create<T extends LanguageCreateArgs>(args: SelectSubset<T, LanguageCreateArgs<ExtArgs>>): Prisma__LanguageClient<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Languages.
     * @param {LanguageCreateManyArgs} args - Arguments to create many Languages.
     * @example
     * // Create many Languages
     * const language = await prisma.language.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LanguageCreateManyArgs>(args?: SelectSubset<T, LanguageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Languages and returns the data saved in the database.
     * @param {LanguageCreateManyAndReturnArgs} args - Arguments to create many Languages.
     * @example
     * // Create many Languages
     * const language = await prisma.language.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Languages and only return the `request_id`
     * const languageWithRequest_idOnly = await prisma.language.createManyAndReturn({
     *   select: { request_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LanguageCreateManyAndReturnArgs>(args?: SelectSubset<T, LanguageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Language.
     * @param {LanguageDeleteArgs} args - Arguments to delete one Language.
     * @example
     * // Delete one Language
     * const Language = await prisma.language.delete({
     *   where: {
     *     // ... filter to delete one Language
     *   }
     * })
     * 
     */
    delete<T extends LanguageDeleteArgs>(args: SelectSubset<T, LanguageDeleteArgs<ExtArgs>>): Prisma__LanguageClient<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Language.
     * @param {LanguageUpdateArgs} args - Arguments to update one Language.
     * @example
     * // Update one Language
     * const language = await prisma.language.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LanguageUpdateArgs>(args: SelectSubset<T, LanguageUpdateArgs<ExtArgs>>): Prisma__LanguageClient<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Languages.
     * @param {LanguageDeleteManyArgs} args - Arguments to filter Languages to delete.
     * @example
     * // Delete a few Languages
     * const { count } = await prisma.language.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LanguageDeleteManyArgs>(args?: SelectSubset<T, LanguageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Languages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LanguageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Languages
     * const language = await prisma.language.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LanguageUpdateManyArgs>(args: SelectSubset<T, LanguageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Languages and returns the data updated in the database.
     * @param {LanguageUpdateManyAndReturnArgs} args - Arguments to update many Languages.
     * @example
     * // Update many Languages
     * const language = await prisma.language.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Languages and only return the `request_id`
     * const languageWithRequest_idOnly = await prisma.language.updateManyAndReturn({
     *   select: { request_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LanguageUpdateManyAndReturnArgs>(args: SelectSubset<T, LanguageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Language.
     * @param {LanguageUpsertArgs} args - Arguments to update or create a Language.
     * @example
     * // Update or create a Language
     * const language = await prisma.language.upsert({
     *   create: {
     *     // ... data to create a Language
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Language we want to update
     *   }
     * })
     */
    upsert<T extends LanguageUpsertArgs>(args: SelectSubset<T, LanguageUpsertArgs<ExtArgs>>): Prisma__LanguageClient<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Languages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LanguageCountArgs} args - Arguments to filter Languages to count.
     * @example
     * // Count the number of Languages
     * const count = await prisma.language.count({
     *   where: {
     *     // ... the filter for the Languages we want to count
     *   }
     * })
    **/
    count<T extends LanguageCountArgs>(
      args?: Subset<T, LanguageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LanguageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Language.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LanguageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LanguageAggregateArgs>(args: Subset<T, LanguageAggregateArgs>): Prisma.PrismaPromise<GetLanguageAggregateType<T>>

    /**
     * Group by Language.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LanguageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LanguageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LanguageGroupByArgs['orderBy'] }
        : { orderBy?: LanguageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LanguageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLanguageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Language model
   */
  readonly fields: LanguageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Language.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LanguageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service_request<T extends service_requestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, service_requestDefaultArgs<ExtArgs>>): Prisma__service_requestClient<$Result.GetResult<Prisma.$service_requestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Language model
   */
  interface LanguageFieldRefs {
    readonly request_id: FieldRef<"Language", 'Int'>
    readonly sourceLanguage: FieldRef<"Language", 'String'>
    readonly targetLanguage: FieldRef<"Language", 'String'>
    readonly languageId: FieldRef<"Language", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Language findUnique
   */
  export type LanguageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageInclude<ExtArgs> | null
    /**
     * Filter, which Language to fetch.
     */
    where: LanguageWhereUniqueInput
  }

  /**
   * Language findUniqueOrThrow
   */
  export type LanguageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageInclude<ExtArgs> | null
    /**
     * Filter, which Language to fetch.
     */
    where: LanguageWhereUniqueInput
  }

  /**
   * Language findFirst
   */
  export type LanguageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageInclude<ExtArgs> | null
    /**
     * Filter, which Language to fetch.
     */
    where?: LanguageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Languages to fetch.
     */
    orderBy?: LanguageOrderByWithRelationInput | LanguageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Languages.
     */
    cursor?: LanguageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Languages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Languages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Languages.
     */
    distinct?: LanguageScalarFieldEnum | LanguageScalarFieldEnum[]
  }

  /**
   * Language findFirstOrThrow
   */
  export type LanguageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageInclude<ExtArgs> | null
    /**
     * Filter, which Language to fetch.
     */
    where?: LanguageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Languages to fetch.
     */
    orderBy?: LanguageOrderByWithRelationInput | LanguageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Languages.
     */
    cursor?: LanguageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Languages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Languages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Languages.
     */
    distinct?: LanguageScalarFieldEnum | LanguageScalarFieldEnum[]
  }

  /**
   * Language findMany
   */
  export type LanguageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageInclude<ExtArgs> | null
    /**
     * Filter, which Languages to fetch.
     */
    where?: LanguageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Languages to fetch.
     */
    orderBy?: LanguageOrderByWithRelationInput | LanguageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Languages.
     */
    cursor?: LanguageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Languages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Languages.
     */
    skip?: number
    distinct?: LanguageScalarFieldEnum | LanguageScalarFieldEnum[]
  }

  /**
   * Language create
   */
  export type LanguageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageInclude<ExtArgs> | null
    /**
     * The data needed to create a Language.
     */
    data: XOR<LanguageCreateInput, LanguageUncheckedCreateInput>
  }

  /**
   * Language createMany
   */
  export type LanguageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Languages.
     */
    data: LanguageCreateManyInput | LanguageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Language createManyAndReturn
   */
  export type LanguageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * The data used to create many Languages.
     */
    data: LanguageCreateManyInput | LanguageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Language update
   */
  export type LanguageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageInclude<ExtArgs> | null
    /**
     * The data needed to update a Language.
     */
    data: XOR<LanguageUpdateInput, LanguageUncheckedUpdateInput>
    /**
     * Choose, which Language to update.
     */
    where: LanguageWhereUniqueInput
  }

  /**
   * Language updateMany
   */
  export type LanguageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Languages.
     */
    data: XOR<LanguageUpdateManyMutationInput, LanguageUncheckedUpdateManyInput>
    /**
     * Filter which Languages to update
     */
    where?: LanguageWhereInput
    /**
     * Limit how many Languages to update.
     */
    limit?: number
  }

  /**
   * Language updateManyAndReturn
   */
  export type LanguageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * The data used to update Languages.
     */
    data: XOR<LanguageUpdateManyMutationInput, LanguageUncheckedUpdateManyInput>
    /**
     * Filter which Languages to update
     */
    where?: LanguageWhereInput
    /**
     * Limit how many Languages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Language upsert
   */
  export type LanguageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageInclude<ExtArgs> | null
    /**
     * The filter to search for the Language to update in case it exists.
     */
    where: LanguageWhereUniqueInput
    /**
     * In case the Language found by the `where` argument doesn't exist, create a new Language with this data.
     */
    create: XOR<LanguageCreateInput, LanguageUncheckedCreateInput>
    /**
     * In case the Language was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LanguageUpdateInput, LanguageUncheckedUpdateInput>
  }

  /**
   * Language delete
   */
  export type LanguageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageInclude<ExtArgs> | null
    /**
     * Filter which Language to delete.
     */
    where: LanguageWhereUniqueInput
  }

  /**
   * Language deleteMany
   */
  export type LanguageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Languages to delete
     */
    where?: LanguageWhereInput
    /**
     * Limit how many Languages to delete.
     */
    limit?: number
  }

  /**
   * Language without action
   */
  export type LanguageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageInclude<ExtArgs> | null
  }


  /**
   * Model Transportation
   */

  export type AggregateTransportation = {
    _count: TransportationCountAggregateOutputType | null
    _avg: TransportationAvgAggregateOutputType | null
    _sum: TransportationSumAggregateOutputType | null
    _min: TransportationMinAggregateOutputType | null
    _max: TransportationMaxAggregateOutputType | null
  }

  export type TransportationAvgAggregateOutputType = {
    request_id: number | null
    transportationId: number | null
  }

  export type TransportationSumAggregateOutputType = {
    request_id: number | null
    transportationId: number | null
  }

  export type TransportationMinAggregateOutputType = {
    request_id: number | null
    transportationType: string | null
    transportationDestination: string | null
    transportationId: number | null
  }

  export type TransportationMaxAggregateOutputType = {
    request_id: number | null
    transportationType: string | null
    transportationDestination: string | null
    transportationId: number | null
  }

  export type TransportationCountAggregateOutputType = {
    request_id: number
    transportationType: number
    transportationDestination: number
    transportationId: number
    _all: number
  }


  export type TransportationAvgAggregateInputType = {
    request_id?: true
    transportationId?: true
  }

  export type TransportationSumAggregateInputType = {
    request_id?: true
    transportationId?: true
  }

  export type TransportationMinAggregateInputType = {
    request_id?: true
    transportationType?: true
    transportationDestination?: true
    transportationId?: true
  }

  export type TransportationMaxAggregateInputType = {
    request_id?: true
    transportationType?: true
    transportationDestination?: true
    transportationId?: true
  }

  export type TransportationCountAggregateInputType = {
    request_id?: true
    transportationType?: true
    transportationDestination?: true
    transportationId?: true
    _all?: true
  }

  export type TransportationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transportation to aggregate.
     */
    where?: TransportationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transportation to fetch.
     */
    orderBy?: TransportationOrderByWithRelationInput | TransportationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransportationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transportation from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transportation.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transportation
    **/
    _count?: true | TransportationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransportationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransportationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransportationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransportationMaxAggregateInputType
  }

  export type GetTransportationAggregateType<T extends TransportationAggregateArgs> = {
        [P in keyof T & keyof AggregateTransportation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransportation[P]>
      : GetScalarType<T[P], AggregateTransportation[P]>
  }




  export type TransportationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransportationWhereInput
    orderBy?: TransportationOrderByWithAggregationInput | TransportationOrderByWithAggregationInput[]
    by: TransportationScalarFieldEnum[] | TransportationScalarFieldEnum
    having?: TransportationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransportationCountAggregateInputType | true
    _avg?: TransportationAvgAggregateInputType
    _sum?: TransportationSumAggregateInputType
    _min?: TransportationMinAggregateInputType
    _max?: TransportationMaxAggregateInputType
  }

  export type TransportationGroupByOutputType = {
    request_id: number
    transportationType: string
    transportationDestination: string
    transportationId: number
    _count: TransportationCountAggregateOutputType | null
    _avg: TransportationAvgAggregateOutputType | null
    _sum: TransportationSumAggregateOutputType | null
    _min: TransportationMinAggregateOutputType | null
    _max: TransportationMaxAggregateOutputType | null
  }

  type GetTransportationGroupByPayload<T extends TransportationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransportationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransportationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransportationGroupByOutputType[P]>
            : GetScalarType<T[P], TransportationGroupByOutputType[P]>
        }
      >
    >


  export type TransportationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    transportationType?: boolean
    transportationDestination?: boolean
    transportationId?: boolean
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transportation"]>

  export type TransportationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    transportationType?: boolean
    transportationDestination?: boolean
    transportationId?: boolean
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transportation"]>

  export type TransportationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    transportationType?: boolean
    transportationDestination?: boolean
    transportationId?: boolean
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transportation"]>

  export type TransportationSelectScalar = {
    request_id?: boolean
    transportationType?: boolean
    transportationDestination?: boolean
    transportationId?: boolean
  }

  export type TransportationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"request_id" | "transportationType" | "transportationDestination" | "transportationId", ExtArgs["result"]["transportation"]>
  export type TransportationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }
  export type TransportationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }
  export type TransportationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }

  export type $TransportationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transportation"
    objects: {
      service_request: Prisma.$service_requestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      request_id: number
      transportationType: string
      transportationDestination: string
      transportationId: number
    }, ExtArgs["result"]["transportation"]>
    composites: {}
  }

  type TransportationGetPayload<S extends boolean | null | undefined | TransportationDefaultArgs> = $Result.GetResult<Prisma.$TransportationPayload, S>

  type TransportationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransportationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransportationCountAggregateInputType | true
    }

  export interface TransportationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transportation'], meta: { name: 'Transportation' } }
    /**
     * Find zero or one Transportation that matches the filter.
     * @param {TransportationFindUniqueArgs} args - Arguments to find a Transportation
     * @example
     * // Get one Transportation
     * const transportation = await prisma.transportation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransportationFindUniqueArgs>(args: SelectSubset<T, TransportationFindUniqueArgs<ExtArgs>>): Prisma__TransportationClient<$Result.GetResult<Prisma.$TransportationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transportation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransportationFindUniqueOrThrowArgs} args - Arguments to find a Transportation
     * @example
     * // Get one Transportation
     * const transportation = await prisma.transportation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransportationFindUniqueOrThrowArgs>(args: SelectSubset<T, TransportationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransportationClient<$Result.GetResult<Prisma.$TransportationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transportation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransportationFindFirstArgs} args - Arguments to find a Transportation
     * @example
     * // Get one Transportation
     * const transportation = await prisma.transportation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransportationFindFirstArgs>(args?: SelectSubset<T, TransportationFindFirstArgs<ExtArgs>>): Prisma__TransportationClient<$Result.GetResult<Prisma.$TransportationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transportation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransportationFindFirstOrThrowArgs} args - Arguments to find a Transportation
     * @example
     * // Get one Transportation
     * const transportation = await prisma.transportation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransportationFindFirstOrThrowArgs>(args?: SelectSubset<T, TransportationFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransportationClient<$Result.GetResult<Prisma.$TransportationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transportation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransportationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transportation
     * const transportation = await prisma.transportation.findMany()
     * 
     * // Get first 10 Transportation
     * const transportation = await prisma.transportation.findMany({ take: 10 })
     * 
     * // Only select the `request_id`
     * const transportationWithRequest_idOnly = await prisma.transportation.findMany({ select: { request_id: true } })
     * 
     */
    findMany<T extends TransportationFindManyArgs>(args?: SelectSubset<T, TransportationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransportationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transportation.
     * @param {TransportationCreateArgs} args - Arguments to create a Transportation.
     * @example
     * // Create one Transportation
     * const Transportation = await prisma.transportation.create({
     *   data: {
     *     // ... data to create a Transportation
     *   }
     * })
     * 
     */
    create<T extends TransportationCreateArgs>(args: SelectSubset<T, TransportationCreateArgs<ExtArgs>>): Prisma__TransportationClient<$Result.GetResult<Prisma.$TransportationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transportation.
     * @param {TransportationCreateManyArgs} args - Arguments to create many Transportation.
     * @example
     * // Create many Transportation
     * const transportation = await prisma.transportation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransportationCreateManyArgs>(args?: SelectSubset<T, TransportationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transportation and returns the data saved in the database.
     * @param {TransportationCreateManyAndReturnArgs} args - Arguments to create many Transportation.
     * @example
     * // Create many Transportation
     * const transportation = await prisma.transportation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transportation and only return the `request_id`
     * const transportationWithRequest_idOnly = await prisma.transportation.createManyAndReturn({
     *   select: { request_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransportationCreateManyAndReturnArgs>(args?: SelectSubset<T, TransportationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransportationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transportation.
     * @param {TransportationDeleteArgs} args - Arguments to delete one Transportation.
     * @example
     * // Delete one Transportation
     * const Transportation = await prisma.transportation.delete({
     *   where: {
     *     // ... filter to delete one Transportation
     *   }
     * })
     * 
     */
    delete<T extends TransportationDeleteArgs>(args: SelectSubset<T, TransportationDeleteArgs<ExtArgs>>): Prisma__TransportationClient<$Result.GetResult<Prisma.$TransportationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transportation.
     * @param {TransportationUpdateArgs} args - Arguments to update one Transportation.
     * @example
     * // Update one Transportation
     * const transportation = await prisma.transportation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransportationUpdateArgs>(args: SelectSubset<T, TransportationUpdateArgs<ExtArgs>>): Prisma__TransportationClient<$Result.GetResult<Prisma.$TransportationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transportation.
     * @param {TransportationDeleteManyArgs} args - Arguments to filter Transportation to delete.
     * @example
     * // Delete a few Transportation
     * const { count } = await prisma.transportation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransportationDeleteManyArgs>(args?: SelectSubset<T, TransportationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transportation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransportationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transportation
     * const transportation = await prisma.transportation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransportationUpdateManyArgs>(args: SelectSubset<T, TransportationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transportation and returns the data updated in the database.
     * @param {TransportationUpdateManyAndReturnArgs} args - Arguments to update many Transportation.
     * @example
     * // Update many Transportation
     * const transportation = await prisma.transportation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transportation and only return the `request_id`
     * const transportationWithRequest_idOnly = await prisma.transportation.updateManyAndReturn({
     *   select: { request_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransportationUpdateManyAndReturnArgs>(args: SelectSubset<T, TransportationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransportationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transportation.
     * @param {TransportationUpsertArgs} args - Arguments to update or create a Transportation.
     * @example
     * // Update or create a Transportation
     * const transportation = await prisma.transportation.upsert({
     *   create: {
     *     // ... data to create a Transportation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transportation we want to update
     *   }
     * })
     */
    upsert<T extends TransportationUpsertArgs>(args: SelectSubset<T, TransportationUpsertArgs<ExtArgs>>): Prisma__TransportationClient<$Result.GetResult<Prisma.$TransportationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transportation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransportationCountArgs} args - Arguments to filter Transportation to count.
     * @example
     * // Count the number of Transportation
     * const count = await prisma.transportation.count({
     *   where: {
     *     // ... the filter for the Transportation we want to count
     *   }
     * })
    **/
    count<T extends TransportationCountArgs>(
      args?: Subset<T, TransportationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransportationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transportation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransportationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransportationAggregateArgs>(args: Subset<T, TransportationAggregateArgs>): Prisma.PrismaPromise<GetTransportationAggregateType<T>>

    /**
     * Group by Transportation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransportationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransportationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransportationGroupByArgs['orderBy'] }
        : { orderBy?: TransportationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransportationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransportationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transportation model
   */
  readonly fields: TransportationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transportation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransportationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service_request<T extends service_requestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, service_requestDefaultArgs<ExtArgs>>): Prisma__service_requestClient<$Result.GetResult<Prisma.$service_requestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transportation model
   */
  interface TransportationFieldRefs {
    readonly request_id: FieldRef<"Transportation", 'Int'>
    readonly transportationType: FieldRef<"Transportation", 'String'>
    readonly transportationDestination: FieldRef<"Transportation", 'String'>
    readonly transportationId: FieldRef<"Transportation", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Transportation findUnique
   */
  export type TransportationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transportation
     */
    select?: TransportationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transportation
     */
    omit?: TransportationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportationInclude<ExtArgs> | null
    /**
     * Filter, which Transportation to fetch.
     */
    where: TransportationWhereUniqueInput
  }

  /**
   * Transportation findUniqueOrThrow
   */
  export type TransportationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transportation
     */
    select?: TransportationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transportation
     */
    omit?: TransportationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportationInclude<ExtArgs> | null
    /**
     * Filter, which Transportation to fetch.
     */
    where: TransportationWhereUniqueInput
  }

  /**
   * Transportation findFirst
   */
  export type TransportationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transportation
     */
    select?: TransportationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transportation
     */
    omit?: TransportationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportationInclude<ExtArgs> | null
    /**
     * Filter, which Transportation to fetch.
     */
    where?: TransportationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transportation to fetch.
     */
    orderBy?: TransportationOrderByWithRelationInput | TransportationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transportation.
     */
    cursor?: TransportationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transportation from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transportation.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transportation.
     */
    distinct?: TransportationScalarFieldEnum | TransportationScalarFieldEnum[]
  }

  /**
   * Transportation findFirstOrThrow
   */
  export type TransportationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transportation
     */
    select?: TransportationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transportation
     */
    omit?: TransportationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportationInclude<ExtArgs> | null
    /**
     * Filter, which Transportation to fetch.
     */
    where?: TransportationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transportation to fetch.
     */
    orderBy?: TransportationOrderByWithRelationInput | TransportationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transportation.
     */
    cursor?: TransportationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transportation from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transportation.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transportation.
     */
    distinct?: TransportationScalarFieldEnum | TransportationScalarFieldEnum[]
  }

  /**
   * Transportation findMany
   */
  export type TransportationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transportation
     */
    select?: TransportationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transportation
     */
    omit?: TransportationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportationInclude<ExtArgs> | null
    /**
     * Filter, which Transportation to fetch.
     */
    where?: TransportationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transportation to fetch.
     */
    orderBy?: TransportationOrderByWithRelationInput | TransportationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transportation.
     */
    cursor?: TransportationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transportation from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transportation.
     */
    skip?: number
    distinct?: TransportationScalarFieldEnum | TransportationScalarFieldEnum[]
  }

  /**
   * Transportation create
   */
  export type TransportationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transportation
     */
    select?: TransportationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transportation
     */
    omit?: TransportationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportationInclude<ExtArgs> | null
    /**
     * The data needed to create a Transportation.
     */
    data: XOR<TransportationCreateInput, TransportationUncheckedCreateInput>
  }

  /**
   * Transportation createMany
   */
  export type TransportationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transportation.
     */
    data: TransportationCreateManyInput | TransportationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transportation createManyAndReturn
   */
  export type TransportationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transportation
     */
    select?: TransportationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transportation
     */
    omit?: TransportationOmit<ExtArgs> | null
    /**
     * The data used to create many Transportation.
     */
    data: TransportationCreateManyInput | TransportationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transportation update
   */
  export type TransportationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transportation
     */
    select?: TransportationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transportation
     */
    omit?: TransportationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportationInclude<ExtArgs> | null
    /**
     * The data needed to update a Transportation.
     */
    data: XOR<TransportationUpdateInput, TransportationUncheckedUpdateInput>
    /**
     * Choose, which Transportation to update.
     */
    where: TransportationWhereUniqueInput
  }

  /**
   * Transportation updateMany
   */
  export type TransportationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transportation.
     */
    data: XOR<TransportationUpdateManyMutationInput, TransportationUncheckedUpdateManyInput>
    /**
     * Filter which Transportation to update
     */
    where?: TransportationWhereInput
    /**
     * Limit how many Transportation to update.
     */
    limit?: number
  }

  /**
   * Transportation updateManyAndReturn
   */
  export type TransportationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transportation
     */
    select?: TransportationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transportation
     */
    omit?: TransportationOmit<ExtArgs> | null
    /**
     * The data used to update Transportation.
     */
    data: XOR<TransportationUpdateManyMutationInput, TransportationUncheckedUpdateManyInput>
    /**
     * Filter which Transportation to update
     */
    where?: TransportationWhereInput
    /**
     * Limit how many Transportation to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transportation upsert
   */
  export type TransportationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transportation
     */
    select?: TransportationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transportation
     */
    omit?: TransportationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportationInclude<ExtArgs> | null
    /**
     * The filter to search for the Transportation to update in case it exists.
     */
    where: TransportationWhereUniqueInput
    /**
     * In case the Transportation found by the `where` argument doesn't exist, create a new Transportation with this data.
     */
    create: XOR<TransportationCreateInput, TransportationUncheckedCreateInput>
    /**
     * In case the Transportation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransportationUpdateInput, TransportationUncheckedUpdateInput>
  }

  /**
   * Transportation delete
   */
  export type TransportationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transportation
     */
    select?: TransportationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transportation
     */
    omit?: TransportationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportationInclude<ExtArgs> | null
    /**
     * Filter which Transportation to delete.
     */
    where: TransportationWhereUniqueInput
  }

  /**
   * Transportation deleteMany
   */
  export type TransportationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transportation to delete
     */
    where?: TransportationWhereInput
    /**
     * Limit how many Transportation to delete.
     */
    limit?: number
  }

  /**
   * Transportation without action
   */
  export type TransportationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transportation
     */
    select?: TransportationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transportation
     */
    omit?: TransportationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransportationInclude<ExtArgs> | null
  }


  /**
   * Model AudioVisual
   */

  export type AggregateAudioVisual = {
    _count: AudioVisualCountAggregateOutputType | null
    _avg: AudioVisualAvgAggregateOutputType | null
    _sum: AudioVisualSumAggregateOutputType | null
    _min: AudioVisualMinAggregateOutputType | null
    _max: AudioVisualMaxAggregateOutputType | null
  }

  export type AudioVisualAvgAggregateOutputType = {
    request_id: number | null
    audioVisualId: number | null
  }

  export type AudioVisualSumAggregateOutputType = {
    request_id: number | null
    audioVisualId: number | null
  }

  export type AudioVisualMinAggregateOutputType = {
    request_id: number | null
    accommodationType: string | null
    accommodationDetails: string | null
    audioVisualId: number | null
  }

  export type AudioVisualMaxAggregateOutputType = {
    request_id: number | null
    accommodationType: string | null
    accommodationDetails: string | null
    audioVisualId: number | null
  }

  export type AudioVisualCountAggregateOutputType = {
    request_id: number
    accommodationType: number
    accommodationDetails: number
    audioVisualId: number
    _all: number
  }


  export type AudioVisualAvgAggregateInputType = {
    request_id?: true
    audioVisualId?: true
  }

  export type AudioVisualSumAggregateInputType = {
    request_id?: true
    audioVisualId?: true
  }

  export type AudioVisualMinAggregateInputType = {
    request_id?: true
    accommodationType?: true
    accommodationDetails?: true
    audioVisualId?: true
  }

  export type AudioVisualMaxAggregateInputType = {
    request_id?: true
    accommodationType?: true
    accommodationDetails?: true
    audioVisualId?: true
  }

  export type AudioVisualCountAggregateInputType = {
    request_id?: true
    accommodationType?: true
    accommodationDetails?: true
    audioVisualId?: true
    _all?: true
  }

  export type AudioVisualAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AudioVisual to aggregate.
     */
    where?: AudioVisualWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AudioVisuals to fetch.
     */
    orderBy?: AudioVisualOrderByWithRelationInput | AudioVisualOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AudioVisualWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AudioVisuals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AudioVisuals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AudioVisuals
    **/
    _count?: true | AudioVisualCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AudioVisualAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AudioVisualSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AudioVisualMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AudioVisualMaxAggregateInputType
  }

  export type GetAudioVisualAggregateType<T extends AudioVisualAggregateArgs> = {
        [P in keyof T & keyof AggregateAudioVisual]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAudioVisual[P]>
      : GetScalarType<T[P], AggregateAudioVisual[P]>
  }




  export type AudioVisualGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AudioVisualWhereInput
    orderBy?: AudioVisualOrderByWithAggregationInput | AudioVisualOrderByWithAggregationInput[]
    by: AudioVisualScalarFieldEnum[] | AudioVisualScalarFieldEnum
    having?: AudioVisualScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AudioVisualCountAggregateInputType | true
    _avg?: AudioVisualAvgAggregateInputType
    _sum?: AudioVisualSumAggregateInputType
    _min?: AudioVisualMinAggregateInputType
    _max?: AudioVisualMaxAggregateInputType
  }

  export type AudioVisualGroupByOutputType = {
    request_id: number
    accommodationType: string
    accommodationDetails: string | null
    audioVisualId: number
    _count: AudioVisualCountAggregateOutputType | null
    _avg: AudioVisualAvgAggregateOutputType | null
    _sum: AudioVisualSumAggregateOutputType | null
    _min: AudioVisualMinAggregateOutputType | null
    _max: AudioVisualMaxAggregateOutputType | null
  }

  type GetAudioVisualGroupByPayload<T extends AudioVisualGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AudioVisualGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AudioVisualGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AudioVisualGroupByOutputType[P]>
            : GetScalarType<T[P], AudioVisualGroupByOutputType[P]>
        }
      >
    >


  export type AudioVisualSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    accommodationType?: boolean
    accommodationDetails?: boolean
    audioVisualId?: boolean
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["audioVisual"]>

  export type AudioVisualSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    accommodationType?: boolean
    accommodationDetails?: boolean
    audioVisualId?: boolean
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["audioVisual"]>

  export type AudioVisualSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    accommodationType?: boolean
    accommodationDetails?: boolean
    audioVisualId?: boolean
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["audioVisual"]>

  export type AudioVisualSelectScalar = {
    request_id?: boolean
    accommodationType?: boolean
    accommodationDetails?: boolean
    audioVisualId?: boolean
  }

  export type AudioVisualOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"request_id" | "accommodationType" | "accommodationDetails" | "audioVisualId", ExtArgs["result"]["audioVisual"]>
  export type AudioVisualInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }
  export type AudioVisualIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }
  export type AudioVisualIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }

  export type $AudioVisualPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AudioVisual"
    objects: {
      service_request: Prisma.$service_requestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      request_id: number
      accommodationType: string
      accommodationDetails: string | null
      audioVisualId: number
    }, ExtArgs["result"]["audioVisual"]>
    composites: {}
  }

  type AudioVisualGetPayload<S extends boolean | null | undefined | AudioVisualDefaultArgs> = $Result.GetResult<Prisma.$AudioVisualPayload, S>

  type AudioVisualCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AudioVisualFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AudioVisualCountAggregateInputType | true
    }

  export interface AudioVisualDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AudioVisual'], meta: { name: 'AudioVisual' } }
    /**
     * Find zero or one AudioVisual that matches the filter.
     * @param {AudioVisualFindUniqueArgs} args - Arguments to find a AudioVisual
     * @example
     * // Get one AudioVisual
     * const audioVisual = await prisma.audioVisual.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AudioVisualFindUniqueArgs>(args: SelectSubset<T, AudioVisualFindUniqueArgs<ExtArgs>>): Prisma__AudioVisualClient<$Result.GetResult<Prisma.$AudioVisualPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AudioVisual that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AudioVisualFindUniqueOrThrowArgs} args - Arguments to find a AudioVisual
     * @example
     * // Get one AudioVisual
     * const audioVisual = await prisma.audioVisual.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AudioVisualFindUniqueOrThrowArgs>(args: SelectSubset<T, AudioVisualFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AudioVisualClient<$Result.GetResult<Prisma.$AudioVisualPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AudioVisual that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudioVisualFindFirstArgs} args - Arguments to find a AudioVisual
     * @example
     * // Get one AudioVisual
     * const audioVisual = await prisma.audioVisual.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AudioVisualFindFirstArgs>(args?: SelectSubset<T, AudioVisualFindFirstArgs<ExtArgs>>): Prisma__AudioVisualClient<$Result.GetResult<Prisma.$AudioVisualPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AudioVisual that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudioVisualFindFirstOrThrowArgs} args - Arguments to find a AudioVisual
     * @example
     * // Get one AudioVisual
     * const audioVisual = await prisma.audioVisual.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AudioVisualFindFirstOrThrowArgs>(args?: SelectSubset<T, AudioVisualFindFirstOrThrowArgs<ExtArgs>>): Prisma__AudioVisualClient<$Result.GetResult<Prisma.$AudioVisualPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AudioVisuals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudioVisualFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AudioVisuals
     * const audioVisuals = await prisma.audioVisual.findMany()
     * 
     * // Get first 10 AudioVisuals
     * const audioVisuals = await prisma.audioVisual.findMany({ take: 10 })
     * 
     * // Only select the `request_id`
     * const audioVisualWithRequest_idOnly = await prisma.audioVisual.findMany({ select: { request_id: true } })
     * 
     */
    findMany<T extends AudioVisualFindManyArgs>(args?: SelectSubset<T, AudioVisualFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AudioVisualPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AudioVisual.
     * @param {AudioVisualCreateArgs} args - Arguments to create a AudioVisual.
     * @example
     * // Create one AudioVisual
     * const AudioVisual = await prisma.audioVisual.create({
     *   data: {
     *     // ... data to create a AudioVisual
     *   }
     * })
     * 
     */
    create<T extends AudioVisualCreateArgs>(args: SelectSubset<T, AudioVisualCreateArgs<ExtArgs>>): Prisma__AudioVisualClient<$Result.GetResult<Prisma.$AudioVisualPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AudioVisuals.
     * @param {AudioVisualCreateManyArgs} args - Arguments to create many AudioVisuals.
     * @example
     * // Create many AudioVisuals
     * const audioVisual = await prisma.audioVisual.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AudioVisualCreateManyArgs>(args?: SelectSubset<T, AudioVisualCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AudioVisuals and returns the data saved in the database.
     * @param {AudioVisualCreateManyAndReturnArgs} args - Arguments to create many AudioVisuals.
     * @example
     * // Create many AudioVisuals
     * const audioVisual = await prisma.audioVisual.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AudioVisuals and only return the `request_id`
     * const audioVisualWithRequest_idOnly = await prisma.audioVisual.createManyAndReturn({
     *   select: { request_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AudioVisualCreateManyAndReturnArgs>(args?: SelectSubset<T, AudioVisualCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AudioVisualPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AudioVisual.
     * @param {AudioVisualDeleteArgs} args - Arguments to delete one AudioVisual.
     * @example
     * // Delete one AudioVisual
     * const AudioVisual = await prisma.audioVisual.delete({
     *   where: {
     *     // ... filter to delete one AudioVisual
     *   }
     * })
     * 
     */
    delete<T extends AudioVisualDeleteArgs>(args: SelectSubset<T, AudioVisualDeleteArgs<ExtArgs>>): Prisma__AudioVisualClient<$Result.GetResult<Prisma.$AudioVisualPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AudioVisual.
     * @param {AudioVisualUpdateArgs} args - Arguments to update one AudioVisual.
     * @example
     * // Update one AudioVisual
     * const audioVisual = await prisma.audioVisual.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AudioVisualUpdateArgs>(args: SelectSubset<T, AudioVisualUpdateArgs<ExtArgs>>): Prisma__AudioVisualClient<$Result.GetResult<Prisma.$AudioVisualPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AudioVisuals.
     * @param {AudioVisualDeleteManyArgs} args - Arguments to filter AudioVisuals to delete.
     * @example
     * // Delete a few AudioVisuals
     * const { count } = await prisma.audioVisual.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AudioVisualDeleteManyArgs>(args?: SelectSubset<T, AudioVisualDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AudioVisuals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudioVisualUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AudioVisuals
     * const audioVisual = await prisma.audioVisual.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AudioVisualUpdateManyArgs>(args: SelectSubset<T, AudioVisualUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AudioVisuals and returns the data updated in the database.
     * @param {AudioVisualUpdateManyAndReturnArgs} args - Arguments to update many AudioVisuals.
     * @example
     * // Update many AudioVisuals
     * const audioVisual = await prisma.audioVisual.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AudioVisuals and only return the `request_id`
     * const audioVisualWithRequest_idOnly = await prisma.audioVisual.updateManyAndReturn({
     *   select: { request_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AudioVisualUpdateManyAndReturnArgs>(args: SelectSubset<T, AudioVisualUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AudioVisualPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AudioVisual.
     * @param {AudioVisualUpsertArgs} args - Arguments to update or create a AudioVisual.
     * @example
     * // Update or create a AudioVisual
     * const audioVisual = await prisma.audioVisual.upsert({
     *   create: {
     *     // ... data to create a AudioVisual
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AudioVisual we want to update
     *   }
     * })
     */
    upsert<T extends AudioVisualUpsertArgs>(args: SelectSubset<T, AudioVisualUpsertArgs<ExtArgs>>): Prisma__AudioVisualClient<$Result.GetResult<Prisma.$AudioVisualPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AudioVisuals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudioVisualCountArgs} args - Arguments to filter AudioVisuals to count.
     * @example
     * // Count the number of AudioVisuals
     * const count = await prisma.audioVisual.count({
     *   where: {
     *     // ... the filter for the AudioVisuals we want to count
     *   }
     * })
    **/
    count<T extends AudioVisualCountArgs>(
      args?: Subset<T, AudioVisualCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AudioVisualCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AudioVisual.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudioVisualAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AudioVisualAggregateArgs>(args: Subset<T, AudioVisualAggregateArgs>): Prisma.PrismaPromise<GetAudioVisualAggregateType<T>>

    /**
     * Group by AudioVisual.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudioVisualGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AudioVisualGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AudioVisualGroupByArgs['orderBy'] }
        : { orderBy?: AudioVisualGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AudioVisualGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAudioVisualGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AudioVisual model
   */
  readonly fields: AudioVisualFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AudioVisual.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AudioVisualClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service_request<T extends service_requestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, service_requestDefaultArgs<ExtArgs>>): Prisma__service_requestClient<$Result.GetResult<Prisma.$service_requestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AudioVisual model
   */
  interface AudioVisualFieldRefs {
    readonly request_id: FieldRef<"AudioVisual", 'Int'>
    readonly accommodationType: FieldRef<"AudioVisual", 'String'>
    readonly accommodationDetails: FieldRef<"AudioVisual", 'String'>
    readonly audioVisualId: FieldRef<"AudioVisual", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * AudioVisual findUnique
   */
  export type AudioVisualFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioVisual
     */
    select?: AudioVisualSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioVisual
     */
    omit?: AudioVisualOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioVisualInclude<ExtArgs> | null
    /**
     * Filter, which AudioVisual to fetch.
     */
    where: AudioVisualWhereUniqueInput
  }

  /**
   * AudioVisual findUniqueOrThrow
   */
  export type AudioVisualFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioVisual
     */
    select?: AudioVisualSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioVisual
     */
    omit?: AudioVisualOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioVisualInclude<ExtArgs> | null
    /**
     * Filter, which AudioVisual to fetch.
     */
    where: AudioVisualWhereUniqueInput
  }

  /**
   * AudioVisual findFirst
   */
  export type AudioVisualFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioVisual
     */
    select?: AudioVisualSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioVisual
     */
    omit?: AudioVisualOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioVisualInclude<ExtArgs> | null
    /**
     * Filter, which AudioVisual to fetch.
     */
    where?: AudioVisualWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AudioVisuals to fetch.
     */
    orderBy?: AudioVisualOrderByWithRelationInput | AudioVisualOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AudioVisuals.
     */
    cursor?: AudioVisualWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AudioVisuals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AudioVisuals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AudioVisuals.
     */
    distinct?: AudioVisualScalarFieldEnum | AudioVisualScalarFieldEnum[]
  }

  /**
   * AudioVisual findFirstOrThrow
   */
  export type AudioVisualFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioVisual
     */
    select?: AudioVisualSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioVisual
     */
    omit?: AudioVisualOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioVisualInclude<ExtArgs> | null
    /**
     * Filter, which AudioVisual to fetch.
     */
    where?: AudioVisualWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AudioVisuals to fetch.
     */
    orderBy?: AudioVisualOrderByWithRelationInput | AudioVisualOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AudioVisuals.
     */
    cursor?: AudioVisualWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AudioVisuals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AudioVisuals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AudioVisuals.
     */
    distinct?: AudioVisualScalarFieldEnum | AudioVisualScalarFieldEnum[]
  }

  /**
   * AudioVisual findMany
   */
  export type AudioVisualFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioVisual
     */
    select?: AudioVisualSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioVisual
     */
    omit?: AudioVisualOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioVisualInclude<ExtArgs> | null
    /**
     * Filter, which AudioVisuals to fetch.
     */
    where?: AudioVisualWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AudioVisuals to fetch.
     */
    orderBy?: AudioVisualOrderByWithRelationInput | AudioVisualOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AudioVisuals.
     */
    cursor?: AudioVisualWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AudioVisuals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AudioVisuals.
     */
    skip?: number
    distinct?: AudioVisualScalarFieldEnum | AudioVisualScalarFieldEnum[]
  }

  /**
   * AudioVisual create
   */
  export type AudioVisualCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioVisual
     */
    select?: AudioVisualSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioVisual
     */
    omit?: AudioVisualOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioVisualInclude<ExtArgs> | null
    /**
     * The data needed to create a AudioVisual.
     */
    data: XOR<AudioVisualCreateInput, AudioVisualUncheckedCreateInput>
  }

  /**
   * AudioVisual createMany
   */
  export type AudioVisualCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AudioVisuals.
     */
    data: AudioVisualCreateManyInput | AudioVisualCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AudioVisual createManyAndReturn
   */
  export type AudioVisualCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioVisual
     */
    select?: AudioVisualSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AudioVisual
     */
    omit?: AudioVisualOmit<ExtArgs> | null
    /**
     * The data used to create many AudioVisuals.
     */
    data: AudioVisualCreateManyInput | AudioVisualCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioVisualIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AudioVisual update
   */
  export type AudioVisualUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioVisual
     */
    select?: AudioVisualSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioVisual
     */
    omit?: AudioVisualOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioVisualInclude<ExtArgs> | null
    /**
     * The data needed to update a AudioVisual.
     */
    data: XOR<AudioVisualUpdateInput, AudioVisualUncheckedUpdateInput>
    /**
     * Choose, which AudioVisual to update.
     */
    where: AudioVisualWhereUniqueInput
  }

  /**
   * AudioVisual updateMany
   */
  export type AudioVisualUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AudioVisuals.
     */
    data: XOR<AudioVisualUpdateManyMutationInput, AudioVisualUncheckedUpdateManyInput>
    /**
     * Filter which AudioVisuals to update
     */
    where?: AudioVisualWhereInput
    /**
     * Limit how many AudioVisuals to update.
     */
    limit?: number
  }

  /**
   * AudioVisual updateManyAndReturn
   */
  export type AudioVisualUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioVisual
     */
    select?: AudioVisualSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AudioVisual
     */
    omit?: AudioVisualOmit<ExtArgs> | null
    /**
     * The data used to update AudioVisuals.
     */
    data: XOR<AudioVisualUpdateManyMutationInput, AudioVisualUncheckedUpdateManyInput>
    /**
     * Filter which AudioVisuals to update
     */
    where?: AudioVisualWhereInput
    /**
     * Limit how many AudioVisuals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioVisualIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AudioVisual upsert
   */
  export type AudioVisualUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioVisual
     */
    select?: AudioVisualSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioVisual
     */
    omit?: AudioVisualOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioVisualInclude<ExtArgs> | null
    /**
     * The filter to search for the AudioVisual to update in case it exists.
     */
    where: AudioVisualWhereUniqueInput
    /**
     * In case the AudioVisual found by the `where` argument doesn't exist, create a new AudioVisual with this data.
     */
    create: XOR<AudioVisualCreateInput, AudioVisualUncheckedCreateInput>
    /**
     * In case the AudioVisual was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AudioVisualUpdateInput, AudioVisualUncheckedUpdateInput>
  }

  /**
   * AudioVisual delete
   */
  export type AudioVisualDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioVisual
     */
    select?: AudioVisualSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioVisual
     */
    omit?: AudioVisualOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioVisualInclude<ExtArgs> | null
    /**
     * Filter which AudioVisual to delete.
     */
    where: AudioVisualWhereUniqueInput
  }

  /**
   * AudioVisual deleteMany
   */
  export type AudioVisualDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AudioVisuals to delete
     */
    where?: AudioVisualWhereInput
    /**
     * Limit how many AudioVisuals to delete.
     */
    limit?: number
  }

  /**
   * AudioVisual without action
   */
  export type AudioVisualDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioVisual
     */
    select?: AudioVisualSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioVisual
     */
    omit?: AudioVisualOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioVisualInclude<ExtArgs> | null
  }


  /**
   * Model Security
   */

  export type AggregateSecurity = {
    _count: SecurityCountAggregateOutputType | null
    _avg: SecurityAvgAggregateOutputType | null
    _sum: SecuritySumAggregateOutputType | null
    _min: SecurityMinAggregateOutputType | null
    _max: SecurityMaxAggregateOutputType | null
  }

  export type SecurityAvgAggregateOutputType = {
    request_id: number | null
    securityId: number | null
  }

  export type SecuritySumAggregateOutputType = {
    request_id: number | null
    securityId: number | null
  }

  export type SecurityMinAggregateOutputType = {
    request_id: number | null
    accessZones: string | null
    securityIssue: string | null
    securityId: number | null
  }

  export type SecurityMaxAggregateOutputType = {
    request_id: number | null
    accessZones: string | null
    securityIssue: string | null
    securityId: number | null
  }

  export type SecurityCountAggregateOutputType = {
    request_id: number
    accessZones: number
    securityIssue: number
    securityId: number
    _all: number
  }


  export type SecurityAvgAggregateInputType = {
    request_id?: true
    securityId?: true
  }

  export type SecuritySumAggregateInputType = {
    request_id?: true
    securityId?: true
  }

  export type SecurityMinAggregateInputType = {
    request_id?: true
    accessZones?: true
    securityIssue?: true
    securityId?: true
  }

  export type SecurityMaxAggregateInputType = {
    request_id?: true
    accessZones?: true
    securityIssue?: true
    securityId?: true
  }

  export type SecurityCountAggregateInputType = {
    request_id?: true
    accessZones?: true
    securityIssue?: true
    securityId?: true
    _all?: true
  }

  export type SecurityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Security to aggregate.
     */
    where?: SecurityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Securities to fetch.
     */
    orderBy?: SecurityOrderByWithRelationInput | SecurityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SecurityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Securities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Securities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Securities
    **/
    _count?: true | SecurityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SecurityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SecuritySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SecurityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SecurityMaxAggregateInputType
  }

  export type GetSecurityAggregateType<T extends SecurityAggregateArgs> = {
        [P in keyof T & keyof AggregateSecurity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSecurity[P]>
      : GetScalarType<T[P], AggregateSecurity[P]>
  }




  export type SecurityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SecurityWhereInput
    orderBy?: SecurityOrderByWithAggregationInput | SecurityOrderByWithAggregationInput[]
    by: SecurityScalarFieldEnum[] | SecurityScalarFieldEnum
    having?: SecurityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SecurityCountAggregateInputType | true
    _avg?: SecurityAvgAggregateInputType
    _sum?: SecuritySumAggregateInputType
    _min?: SecurityMinAggregateInputType
    _max?: SecurityMaxAggregateInputType
  }

  export type SecurityGroupByOutputType = {
    request_id: number
    accessZones: string
    securityIssue: string
    securityId: number
    _count: SecurityCountAggregateOutputType | null
    _avg: SecurityAvgAggregateOutputType | null
    _sum: SecuritySumAggregateOutputType | null
    _min: SecurityMinAggregateOutputType | null
    _max: SecurityMaxAggregateOutputType | null
  }

  type GetSecurityGroupByPayload<T extends SecurityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SecurityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SecurityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SecurityGroupByOutputType[P]>
            : GetScalarType<T[P], SecurityGroupByOutputType[P]>
        }
      >
    >


  export type SecuritySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    accessZones?: boolean
    securityIssue?: boolean
    securityId?: boolean
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["security"]>

  export type SecuritySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    accessZones?: boolean
    securityIssue?: boolean
    securityId?: boolean
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["security"]>

  export type SecuritySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    accessZones?: boolean
    securityIssue?: boolean
    securityId?: boolean
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["security"]>

  export type SecuritySelectScalar = {
    request_id?: boolean
    accessZones?: boolean
    securityIssue?: boolean
    securityId?: boolean
  }

  export type SecurityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"request_id" | "accessZones" | "securityIssue" | "securityId", ExtArgs["result"]["security"]>
  export type SecurityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }
  export type SecurityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }
  export type SecurityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }

  export type $SecurityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Security"
    objects: {
      service_request: Prisma.$service_requestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      request_id: number
      accessZones: string
      securityIssue: string
      securityId: number
    }, ExtArgs["result"]["security"]>
    composites: {}
  }

  type SecurityGetPayload<S extends boolean | null | undefined | SecurityDefaultArgs> = $Result.GetResult<Prisma.$SecurityPayload, S>

  type SecurityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SecurityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SecurityCountAggregateInputType | true
    }

  export interface SecurityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Security'], meta: { name: 'Security' } }
    /**
     * Find zero or one Security that matches the filter.
     * @param {SecurityFindUniqueArgs} args - Arguments to find a Security
     * @example
     * // Get one Security
     * const security = await prisma.security.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SecurityFindUniqueArgs>(args: SelectSubset<T, SecurityFindUniqueArgs<ExtArgs>>): Prisma__SecurityClient<$Result.GetResult<Prisma.$SecurityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Security that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SecurityFindUniqueOrThrowArgs} args - Arguments to find a Security
     * @example
     * // Get one Security
     * const security = await prisma.security.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SecurityFindUniqueOrThrowArgs>(args: SelectSubset<T, SecurityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SecurityClient<$Result.GetResult<Prisma.$SecurityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Security that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityFindFirstArgs} args - Arguments to find a Security
     * @example
     * // Get one Security
     * const security = await prisma.security.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SecurityFindFirstArgs>(args?: SelectSubset<T, SecurityFindFirstArgs<ExtArgs>>): Prisma__SecurityClient<$Result.GetResult<Prisma.$SecurityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Security that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityFindFirstOrThrowArgs} args - Arguments to find a Security
     * @example
     * // Get one Security
     * const security = await prisma.security.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SecurityFindFirstOrThrowArgs>(args?: SelectSubset<T, SecurityFindFirstOrThrowArgs<ExtArgs>>): Prisma__SecurityClient<$Result.GetResult<Prisma.$SecurityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Securities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Securities
     * const securities = await prisma.security.findMany()
     * 
     * // Get first 10 Securities
     * const securities = await prisma.security.findMany({ take: 10 })
     * 
     * // Only select the `request_id`
     * const securityWithRequest_idOnly = await prisma.security.findMany({ select: { request_id: true } })
     * 
     */
    findMany<T extends SecurityFindManyArgs>(args?: SelectSubset<T, SecurityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecurityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Security.
     * @param {SecurityCreateArgs} args - Arguments to create a Security.
     * @example
     * // Create one Security
     * const Security = await prisma.security.create({
     *   data: {
     *     // ... data to create a Security
     *   }
     * })
     * 
     */
    create<T extends SecurityCreateArgs>(args: SelectSubset<T, SecurityCreateArgs<ExtArgs>>): Prisma__SecurityClient<$Result.GetResult<Prisma.$SecurityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Securities.
     * @param {SecurityCreateManyArgs} args - Arguments to create many Securities.
     * @example
     * // Create many Securities
     * const security = await prisma.security.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SecurityCreateManyArgs>(args?: SelectSubset<T, SecurityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Securities and returns the data saved in the database.
     * @param {SecurityCreateManyAndReturnArgs} args - Arguments to create many Securities.
     * @example
     * // Create many Securities
     * const security = await prisma.security.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Securities and only return the `request_id`
     * const securityWithRequest_idOnly = await prisma.security.createManyAndReturn({
     *   select: { request_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SecurityCreateManyAndReturnArgs>(args?: SelectSubset<T, SecurityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecurityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Security.
     * @param {SecurityDeleteArgs} args - Arguments to delete one Security.
     * @example
     * // Delete one Security
     * const Security = await prisma.security.delete({
     *   where: {
     *     // ... filter to delete one Security
     *   }
     * })
     * 
     */
    delete<T extends SecurityDeleteArgs>(args: SelectSubset<T, SecurityDeleteArgs<ExtArgs>>): Prisma__SecurityClient<$Result.GetResult<Prisma.$SecurityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Security.
     * @param {SecurityUpdateArgs} args - Arguments to update one Security.
     * @example
     * // Update one Security
     * const security = await prisma.security.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SecurityUpdateArgs>(args: SelectSubset<T, SecurityUpdateArgs<ExtArgs>>): Prisma__SecurityClient<$Result.GetResult<Prisma.$SecurityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Securities.
     * @param {SecurityDeleteManyArgs} args - Arguments to filter Securities to delete.
     * @example
     * // Delete a few Securities
     * const { count } = await prisma.security.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SecurityDeleteManyArgs>(args?: SelectSubset<T, SecurityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Securities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Securities
     * const security = await prisma.security.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SecurityUpdateManyArgs>(args: SelectSubset<T, SecurityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Securities and returns the data updated in the database.
     * @param {SecurityUpdateManyAndReturnArgs} args - Arguments to update many Securities.
     * @example
     * // Update many Securities
     * const security = await prisma.security.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Securities and only return the `request_id`
     * const securityWithRequest_idOnly = await prisma.security.updateManyAndReturn({
     *   select: { request_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SecurityUpdateManyAndReturnArgs>(args: SelectSubset<T, SecurityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecurityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Security.
     * @param {SecurityUpsertArgs} args - Arguments to update or create a Security.
     * @example
     * // Update or create a Security
     * const security = await prisma.security.upsert({
     *   create: {
     *     // ... data to create a Security
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Security we want to update
     *   }
     * })
     */
    upsert<T extends SecurityUpsertArgs>(args: SelectSubset<T, SecurityUpsertArgs<ExtArgs>>): Prisma__SecurityClient<$Result.GetResult<Prisma.$SecurityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Securities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityCountArgs} args - Arguments to filter Securities to count.
     * @example
     * // Count the number of Securities
     * const count = await prisma.security.count({
     *   where: {
     *     // ... the filter for the Securities we want to count
     *   }
     * })
    **/
    count<T extends SecurityCountArgs>(
      args?: Subset<T, SecurityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SecurityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Security.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SecurityAggregateArgs>(args: Subset<T, SecurityAggregateArgs>): Prisma.PrismaPromise<GetSecurityAggregateType<T>>

    /**
     * Group by Security.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SecurityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SecurityGroupByArgs['orderBy'] }
        : { orderBy?: SecurityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SecurityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSecurityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Security model
   */
  readonly fields: SecurityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Security.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SecurityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service_request<T extends service_requestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, service_requestDefaultArgs<ExtArgs>>): Prisma__service_requestClient<$Result.GetResult<Prisma.$service_requestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Security model
   */
  interface SecurityFieldRefs {
    readonly request_id: FieldRef<"Security", 'Int'>
    readonly accessZones: FieldRef<"Security", 'String'>
    readonly securityIssue: FieldRef<"Security", 'String'>
    readonly securityId: FieldRef<"Security", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Security findUnique
   */
  export type SecurityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Security
     */
    select?: SecuritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Security
     */
    omit?: SecurityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityInclude<ExtArgs> | null
    /**
     * Filter, which Security to fetch.
     */
    where: SecurityWhereUniqueInput
  }

  /**
   * Security findUniqueOrThrow
   */
  export type SecurityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Security
     */
    select?: SecuritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Security
     */
    omit?: SecurityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityInclude<ExtArgs> | null
    /**
     * Filter, which Security to fetch.
     */
    where: SecurityWhereUniqueInput
  }

  /**
   * Security findFirst
   */
  export type SecurityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Security
     */
    select?: SecuritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Security
     */
    omit?: SecurityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityInclude<ExtArgs> | null
    /**
     * Filter, which Security to fetch.
     */
    where?: SecurityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Securities to fetch.
     */
    orderBy?: SecurityOrderByWithRelationInput | SecurityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Securities.
     */
    cursor?: SecurityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Securities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Securities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Securities.
     */
    distinct?: SecurityScalarFieldEnum | SecurityScalarFieldEnum[]
  }

  /**
   * Security findFirstOrThrow
   */
  export type SecurityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Security
     */
    select?: SecuritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Security
     */
    omit?: SecurityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityInclude<ExtArgs> | null
    /**
     * Filter, which Security to fetch.
     */
    where?: SecurityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Securities to fetch.
     */
    orderBy?: SecurityOrderByWithRelationInput | SecurityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Securities.
     */
    cursor?: SecurityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Securities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Securities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Securities.
     */
    distinct?: SecurityScalarFieldEnum | SecurityScalarFieldEnum[]
  }

  /**
   * Security findMany
   */
  export type SecurityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Security
     */
    select?: SecuritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Security
     */
    omit?: SecurityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityInclude<ExtArgs> | null
    /**
     * Filter, which Securities to fetch.
     */
    where?: SecurityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Securities to fetch.
     */
    orderBy?: SecurityOrderByWithRelationInput | SecurityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Securities.
     */
    cursor?: SecurityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Securities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Securities.
     */
    skip?: number
    distinct?: SecurityScalarFieldEnum | SecurityScalarFieldEnum[]
  }

  /**
   * Security create
   */
  export type SecurityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Security
     */
    select?: SecuritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Security
     */
    omit?: SecurityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityInclude<ExtArgs> | null
    /**
     * The data needed to create a Security.
     */
    data: XOR<SecurityCreateInput, SecurityUncheckedCreateInput>
  }

  /**
   * Security createMany
   */
  export type SecurityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Securities.
     */
    data: SecurityCreateManyInput | SecurityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Security createManyAndReturn
   */
  export type SecurityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Security
     */
    select?: SecuritySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Security
     */
    omit?: SecurityOmit<ExtArgs> | null
    /**
     * The data used to create many Securities.
     */
    data: SecurityCreateManyInput | SecurityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Security update
   */
  export type SecurityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Security
     */
    select?: SecuritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Security
     */
    omit?: SecurityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityInclude<ExtArgs> | null
    /**
     * The data needed to update a Security.
     */
    data: XOR<SecurityUpdateInput, SecurityUncheckedUpdateInput>
    /**
     * Choose, which Security to update.
     */
    where: SecurityWhereUniqueInput
  }

  /**
   * Security updateMany
   */
  export type SecurityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Securities.
     */
    data: XOR<SecurityUpdateManyMutationInput, SecurityUncheckedUpdateManyInput>
    /**
     * Filter which Securities to update
     */
    where?: SecurityWhereInput
    /**
     * Limit how many Securities to update.
     */
    limit?: number
  }

  /**
   * Security updateManyAndReturn
   */
  export type SecurityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Security
     */
    select?: SecuritySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Security
     */
    omit?: SecurityOmit<ExtArgs> | null
    /**
     * The data used to update Securities.
     */
    data: XOR<SecurityUpdateManyMutationInput, SecurityUncheckedUpdateManyInput>
    /**
     * Filter which Securities to update
     */
    where?: SecurityWhereInput
    /**
     * Limit how many Securities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Security upsert
   */
  export type SecurityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Security
     */
    select?: SecuritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Security
     */
    omit?: SecurityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityInclude<ExtArgs> | null
    /**
     * The filter to search for the Security to update in case it exists.
     */
    where: SecurityWhereUniqueInput
    /**
     * In case the Security found by the `where` argument doesn't exist, create a new Security with this data.
     */
    create: XOR<SecurityCreateInput, SecurityUncheckedCreateInput>
    /**
     * In case the Security was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SecurityUpdateInput, SecurityUncheckedUpdateInput>
  }

  /**
   * Security delete
   */
  export type SecurityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Security
     */
    select?: SecuritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Security
     */
    omit?: SecurityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityInclude<ExtArgs> | null
    /**
     * Filter which Security to delete.
     */
    where: SecurityWhereUniqueInput
  }

  /**
   * Security deleteMany
   */
  export type SecurityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Securities to delete
     */
    where?: SecurityWhereInput
    /**
     * Limit how many Securities to delete.
     */
    limit?: number
  }

  /**
   * Security without action
   */
  export type SecurityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Security
     */
    select?: SecuritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Security
     */
    omit?: SecurityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityInclude<ExtArgs> | null
  }


  /**
   * Model MedicalDevice
   */

  export type AggregateMedicalDevice = {
    _count: MedicalDeviceCountAggregateOutputType | null
    _avg: MedicalDeviceAvgAggregateOutputType | null
    _sum: MedicalDeviceSumAggregateOutputType | null
    _min: MedicalDeviceMinAggregateOutputType | null
    _max: MedicalDeviceMaxAggregateOutputType | null
  }

  export type MedicalDeviceAvgAggregateOutputType = {
    request_id: number | null
    medicalDeviceId: number | null
  }

  export type MedicalDeviceSumAggregateOutputType = {
    request_id: number | null
    medicalDeviceId: number | null
  }

  export type MedicalDeviceMinAggregateOutputType = {
    request_id: number | null
    device: string | null
    operatorRequired: string | null
    medicalDeviceId: number | null
  }

  export type MedicalDeviceMaxAggregateOutputType = {
    request_id: number | null
    device: string | null
    operatorRequired: string | null
    medicalDeviceId: number | null
  }

  export type MedicalDeviceCountAggregateOutputType = {
    request_id: number
    device: number
    operatorRequired: number
    medicalDeviceId: number
    _all: number
  }


  export type MedicalDeviceAvgAggregateInputType = {
    request_id?: true
    medicalDeviceId?: true
  }

  export type MedicalDeviceSumAggregateInputType = {
    request_id?: true
    medicalDeviceId?: true
  }

  export type MedicalDeviceMinAggregateInputType = {
    request_id?: true
    device?: true
    operatorRequired?: true
    medicalDeviceId?: true
  }

  export type MedicalDeviceMaxAggregateInputType = {
    request_id?: true
    device?: true
    operatorRequired?: true
    medicalDeviceId?: true
  }

  export type MedicalDeviceCountAggregateInputType = {
    request_id?: true
    device?: true
    operatorRequired?: true
    medicalDeviceId?: true
    _all?: true
  }

  export type MedicalDeviceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MedicalDevice to aggregate.
     */
    where?: MedicalDeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalDevices to fetch.
     */
    orderBy?: MedicalDeviceOrderByWithRelationInput | MedicalDeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MedicalDeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalDevices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalDevices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MedicalDevices
    **/
    _count?: true | MedicalDeviceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MedicalDeviceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MedicalDeviceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MedicalDeviceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MedicalDeviceMaxAggregateInputType
  }

  export type GetMedicalDeviceAggregateType<T extends MedicalDeviceAggregateArgs> = {
        [P in keyof T & keyof AggregateMedicalDevice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedicalDevice[P]>
      : GetScalarType<T[P], AggregateMedicalDevice[P]>
  }




  export type MedicalDeviceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicalDeviceWhereInput
    orderBy?: MedicalDeviceOrderByWithAggregationInput | MedicalDeviceOrderByWithAggregationInput[]
    by: MedicalDeviceScalarFieldEnum[] | MedicalDeviceScalarFieldEnum
    having?: MedicalDeviceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MedicalDeviceCountAggregateInputType | true
    _avg?: MedicalDeviceAvgAggregateInputType
    _sum?: MedicalDeviceSumAggregateInputType
    _min?: MedicalDeviceMinAggregateInputType
    _max?: MedicalDeviceMaxAggregateInputType
  }

  export type MedicalDeviceGroupByOutputType = {
    request_id: number
    device: string
    operatorRequired: string
    medicalDeviceId: number
    _count: MedicalDeviceCountAggregateOutputType | null
    _avg: MedicalDeviceAvgAggregateOutputType | null
    _sum: MedicalDeviceSumAggregateOutputType | null
    _min: MedicalDeviceMinAggregateOutputType | null
    _max: MedicalDeviceMaxAggregateOutputType | null
  }

  type GetMedicalDeviceGroupByPayload<T extends MedicalDeviceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MedicalDeviceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MedicalDeviceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MedicalDeviceGroupByOutputType[P]>
            : GetScalarType<T[P], MedicalDeviceGroupByOutputType[P]>
        }
      >
    >


  export type MedicalDeviceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    device?: boolean
    operatorRequired?: boolean
    medicalDeviceId?: boolean
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicalDevice"]>

  export type MedicalDeviceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    device?: boolean
    operatorRequired?: boolean
    medicalDeviceId?: boolean
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicalDevice"]>

  export type MedicalDeviceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    device?: boolean
    operatorRequired?: boolean
    medicalDeviceId?: boolean
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicalDevice"]>

  export type MedicalDeviceSelectScalar = {
    request_id?: boolean
    device?: boolean
    operatorRequired?: boolean
    medicalDeviceId?: boolean
  }

  export type MedicalDeviceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"request_id" | "device" | "operatorRequired" | "medicalDeviceId", ExtArgs["result"]["medicalDevice"]>
  export type MedicalDeviceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }
  export type MedicalDeviceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }
  export type MedicalDeviceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }

  export type $MedicalDevicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MedicalDevice"
    objects: {
      service_request: Prisma.$service_requestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      request_id: number
      device: string
      operatorRequired: string
      medicalDeviceId: number
    }, ExtArgs["result"]["medicalDevice"]>
    composites: {}
  }

  type MedicalDeviceGetPayload<S extends boolean | null | undefined | MedicalDeviceDefaultArgs> = $Result.GetResult<Prisma.$MedicalDevicePayload, S>

  type MedicalDeviceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MedicalDeviceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MedicalDeviceCountAggregateInputType | true
    }

  export interface MedicalDeviceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MedicalDevice'], meta: { name: 'MedicalDevice' } }
    /**
     * Find zero or one MedicalDevice that matches the filter.
     * @param {MedicalDeviceFindUniqueArgs} args - Arguments to find a MedicalDevice
     * @example
     * // Get one MedicalDevice
     * const medicalDevice = await prisma.medicalDevice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MedicalDeviceFindUniqueArgs>(args: SelectSubset<T, MedicalDeviceFindUniqueArgs<ExtArgs>>): Prisma__MedicalDeviceClient<$Result.GetResult<Prisma.$MedicalDevicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MedicalDevice that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MedicalDeviceFindUniqueOrThrowArgs} args - Arguments to find a MedicalDevice
     * @example
     * // Get one MedicalDevice
     * const medicalDevice = await prisma.medicalDevice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MedicalDeviceFindUniqueOrThrowArgs>(args: SelectSubset<T, MedicalDeviceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MedicalDeviceClient<$Result.GetResult<Prisma.$MedicalDevicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MedicalDevice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalDeviceFindFirstArgs} args - Arguments to find a MedicalDevice
     * @example
     * // Get one MedicalDevice
     * const medicalDevice = await prisma.medicalDevice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MedicalDeviceFindFirstArgs>(args?: SelectSubset<T, MedicalDeviceFindFirstArgs<ExtArgs>>): Prisma__MedicalDeviceClient<$Result.GetResult<Prisma.$MedicalDevicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MedicalDevice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalDeviceFindFirstOrThrowArgs} args - Arguments to find a MedicalDevice
     * @example
     * // Get one MedicalDevice
     * const medicalDevice = await prisma.medicalDevice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MedicalDeviceFindFirstOrThrowArgs>(args?: SelectSubset<T, MedicalDeviceFindFirstOrThrowArgs<ExtArgs>>): Prisma__MedicalDeviceClient<$Result.GetResult<Prisma.$MedicalDevicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MedicalDevices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalDeviceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MedicalDevices
     * const medicalDevices = await prisma.medicalDevice.findMany()
     * 
     * // Get first 10 MedicalDevices
     * const medicalDevices = await prisma.medicalDevice.findMany({ take: 10 })
     * 
     * // Only select the `request_id`
     * const medicalDeviceWithRequest_idOnly = await prisma.medicalDevice.findMany({ select: { request_id: true } })
     * 
     */
    findMany<T extends MedicalDeviceFindManyArgs>(args?: SelectSubset<T, MedicalDeviceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalDevicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MedicalDevice.
     * @param {MedicalDeviceCreateArgs} args - Arguments to create a MedicalDevice.
     * @example
     * // Create one MedicalDevice
     * const MedicalDevice = await prisma.medicalDevice.create({
     *   data: {
     *     // ... data to create a MedicalDevice
     *   }
     * })
     * 
     */
    create<T extends MedicalDeviceCreateArgs>(args: SelectSubset<T, MedicalDeviceCreateArgs<ExtArgs>>): Prisma__MedicalDeviceClient<$Result.GetResult<Prisma.$MedicalDevicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MedicalDevices.
     * @param {MedicalDeviceCreateManyArgs} args - Arguments to create many MedicalDevices.
     * @example
     * // Create many MedicalDevices
     * const medicalDevice = await prisma.medicalDevice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MedicalDeviceCreateManyArgs>(args?: SelectSubset<T, MedicalDeviceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MedicalDevices and returns the data saved in the database.
     * @param {MedicalDeviceCreateManyAndReturnArgs} args - Arguments to create many MedicalDevices.
     * @example
     * // Create many MedicalDevices
     * const medicalDevice = await prisma.medicalDevice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MedicalDevices and only return the `request_id`
     * const medicalDeviceWithRequest_idOnly = await prisma.medicalDevice.createManyAndReturn({
     *   select: { request_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MedicalDeviceCreateManyAndReturnArgs>(args?: SelectSubset<T, MedicalDeviceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalDevicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MedicalDevice.
     * @param {MedicalDeviceDeleteArgs} args - Arguments to delete one MedicalDevice.
     * @example
     * // Delete one MedicalDevice
     * const MedicalDevice = await prisma.medicalDevice.delete({
     *   where: {
     *     // ... filter to delete one MedicalDevice
     *   }
     * })
     * 
     */
    delete<T extends MedicalDeviceDeleteArgs>(args: SelectSubset<T, MedicalDeviceDeleteArgs<ExtArgs>>): Prisma__MedicalDeviceClient<$Result.GetResult<Prisma.$MedicalDevicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MedicalDevice.
     * @param {MedicalDeviceUpdateArgs} args - Arguments to update one MedicalDevice.
     * @example
     * // Update one MedicalDevice
     * const medicalDevice = await prisma.medicalDevice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MedicalDeviceUpdateArgs>(args: SelectSubset<T, MedicalDeviceUpdateArgs<ExtArgs>>): Prisma__MedicalDeviceClient<$Result.GetResult<Prisma.$MedicalDevicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MedicalDevices.
     * @param {MedicalDeviceDeleteManyArgs} args - Arguments to filter MedicalDevices to delete.
     * @example
     * // Delete a few MedicalDevices
     * const { count } = await prisma.medicalDevice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MedicalDeviceDeleteManyArgs>(args?: SelectSubset<T, MedicalDeviceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MedicalDevices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalDeviceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MedicalDevices
     * const medicalDevice = await prisma.medicalDevice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MedicalDeviceUpdateManyArgs>(args: SelectSubset<T, MedicalDeviceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MedicalDevices and returns the data updated in the database.
     * @param {MedicalDeviceUpdateManyAndReturnArgs} args - Arguments to update many MedicalDevices.
     * @example
     * // Update many MedicalDevices
     * const medicalDevice = await prisma.medicalDevice.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MedicalDevices and only return the `request_id`
     * const medicalDeviceWithRequest_idOnly = await prisma.medicalDevice.updateManyAndReturn({
     *   select: { request_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MedicalDeviceUpdateManyAndReturnArgs>(args: SelectSubset<T, MedicalDeviceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalDevicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MedicalDevice.
     * @param {MedicalDeviceUpsertArgs} args - Arguments to update or create a MedicalDevice.
     * @example
     * // Update or create a MedicalDevice
     * const medicalDevice = await prisma.medicalDevice.upsert({
     *   create: {
     *     // ... data to create a MedicalDevice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MedicalDevice we want to update
     *   }
     * })
     */
    upsert<T extends MedicalDeviceUpsertArgs>(args: SelectSubset<T, MedicalDeviceUpsertArgs<ExtArgs>>): Prisma__MedicalDeviceClient<$Result.GetResult<Prisma.$MedicalDevicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MedicalDevices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalDeviceCountArgs} args - Arguments to filter MedicalDevices to count.
     * @example
     * // Count the number of MedicalDevices
     * const count = await prisma.medicalDevice.count({
     *   where: {
     *     // ... the filter for the MedicalDevices we want to count
     *   }
     * })
    **/
    count<T extends MedicalDeviceCountArgs>(
      args?: Subset<T, MedicalDeviceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MedicalDeviceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MedicalDevice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalDeviceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MedicalDeviceAggregateArgs>(args: Subset<T, MedicalDeviceAggregateArgs>): Prisma.PrismaPromise<GetMedicalDeviceAggregateType<T>>

    /**
     * Group by MedicalDevice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalDeviceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MedicalDeviceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MedicalDeviceGroupByArgs['orderBy'] }
        : { orderBy?: MedicalDeviceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MedicalDeviceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMedicalDeviceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MedicalDevice model
   */
  readonly fields: MedicalDeviceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MedicalDevice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MedicalDeviceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service_request<T extends service_requestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, service_requestDefaultArgs<ExtArgs>>): Prisma__service_requestClient<$Result.GetResult<Prisma.$service_requestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MedicalDevice model
   */
  interface MedicalDeviceFieldRefs {
    readonly request_id: FieldRef<"MedicalDevice", 'Int'>
    readonly device: FieldRef<"MedicalDevice", 'String'>
    readonly operatorRequired: FieldRef<"MedicalDevice", 'String'>
    readonly medicalDeviceId: FieldRef<"MedicalDevice", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * MedicalDevice findUnique
   */
  export type MedicalDeviceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDevice
     */
    select?: MedicalDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDevice
     */
    omit?: MedicalDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDeviceInclude<ExtArgs> | null
    /**
     * Filter, which MedicalDevice to fetch.
     */
    where: MedicalDeviceWhereUniqueInput
  }

  /**
   * MedicalDevice findUniqueOrThrow
   */
  export type MedicalDeviceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDevice
     */
    select?: MedicalDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDevice
     */
    omit?: MedicalDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDeviceInclude<ExtArgs> | null
    /**
     * Filter, which MedicalDevice to fetch.
     */
    where: MedicalDeviceWhereUniqueInput
  }

  /**
   * MedicalDevice findFirst
   */
  export type MedicalDeviceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDevice
     */
    select?: MedicalDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDevice
     */
    omit?: MedicalDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDeviceInclude<ExtArgs> | null
    /**
     * Filter, which MedicalDevice to fetch.
     */
    where?: MedicalDeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalDevices to fetch.
     */
    orderBy?: MedicalDeviceOrderByWithRelationInput | MedicalDeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MedicalDevices.
     */
    cursor?: MedicalDeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalDevices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalDevices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MedicalDevices.
     */
    distinct?: MedicalDeviceScalarFieldEnum | MedicalDeviceScalarFieldEnum[]
  }

  /**
   * MedicalDevice findFirstOrThrow
   */
  export type MedicalDeviceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDevice
     */
    select?: MedicalDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDevice
     */
    omit?: MedicalDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDeviceInclude<ExtArgs> | null
    /**
     * Filter, which MedicalDevice to fetch.
     */
    where?: MedicalDeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalDevices to fetch.
     */
    orderBy?: MedicalDeviceOrderByWithRelationInput | MedicalDeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MedicalDevices.
     */
    cursor?: MedicalDeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalDevices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalDevices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MedicalDevices.
     */
    distinct?: MedicalDeviceScalarFieldEnum | MedicalDeviceScalarFieldEnum[]
  }

  /**
   * MedicalDevice findMany
   */
  export type MedicalDeviceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDevice
     */
    select?: MedicalDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDevice
     */
    omit?: MedicalDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDeviceInclude<ExtArgs> | null
    /**
     * Filter, which MedicalDevices to fetch.
     */
    where?: MedicalDeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalDevices to fetch.
     */
    orderBy?: MedicalDeviceOrderByWithRelationInput | MedicalDeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MedicalDevices.
     */
    cursor?: MedicalDeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalDevices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalDevices.
     */
    skip?: number
    distinct?: MedicalDeviceScalarFieldEnum | MedicalDeviceScalarFieldEnum[]
  }

  /**
   * MedicalDevice create
   */
  export type MedicalDeviceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDevice
     */
    select?: MedicalDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDevice
     */
    omit?: MedicalDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDeviceInclude<ExtArgs> | null
    /**
     * The data needed to create a MedicalDevice.
     */
    data: XOR<MedicalDeviceCreateInput, MedicalDeviceUncheckedCreateInput>
  }

  /**
   * MedicalDevice createMany
   */
  export type MedicalDeviceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MedicalDevices.
     */
    data: MedicalDeviceCreateManyInput | MedicalDeviceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MedicalDevice createManyAndReturn
   */
  export type MedicalDeviceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDevice
     */
    select?: MedicalDeviceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDevice
     */
    omit?: MedicalDeviceOmit<ExtArgs> | null
    /**
     * The data used to create many MedicalDevices.
     */
    data: MedicalDeviceCreateManyInput | MedicalDeviceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDeviceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MedicalDevice update
   */
  export type MedicalDeviceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDevice
     */
    select?: MedicalDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDevice
     */
    omit?: MedicalDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDeviceInclude<ExtArgs> | null
    /**
     * The data needed to update a MedicalDevice.
     */
    data: XOR<MedicalDeviceUpdateInput, MedicalDeviceUncheckedUpdateInput>
    /**
     * Choose, which MedicalDevice to update.
     */
    where: MedicalDeviceWhereUniqueInput
  }

  /**
   * MedicalDevice updateMany
   */
  export type MedicalDeviceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MedicalDevices.
     */
    data: XOR<MedicalDeviceUpdateManyMutationInput, MedicalDeviceUncheckedUpdateManyInput>
    /**
     * Filter which MedicalDevices to update
     */
    where?: MedicalDeviceWhereInput
    /**
     * Limit how many MedicalDevices to update.
     */
    limit?: number
  }

  /**
   * MedicalDevice updateManyAndReturn
   */
  export type MedicalDeviceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDevice
     */
    select?: MedicalDeviceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDevice
     */
    omit?: MedicalDeviceOmit<ExtArgs> | null
    /**
     * The data used to update MedicalDevices.
     */
    data: XOR<MedicalDeviceUpdateManyMutationInput, MedicalDeviceUncheckedUpdateManyInput>
    /**
     * Filter which MedicalDevices to update
     */
    where?: MedicalDeviceWhereInput
    /**
     * Limit how many MedicalDevices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDeviceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MedicalDevice upsert
   */
  export type MedicalDeviceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDevice
     */
    select?: MedicalDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDevice
     */
    omit?: MedicalDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDeviceInclude<ExtArgs> | null
    /**
     * The filter to search for the MedicalDevice to update in case it exists.
     */
    where: MedicalDeviceWhereUniqueInput
    /**
     * In case the MedicalDevice found by the `where` argument doesn't exist, create a new MedicalDevice with this data.
     */
    create: XOR<MedicalDeviceCreateInput, MedicalDeviceUncheckedCreateInput>
    /**
     * In case the MedicalDevice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MedicalDeviceUpdateInput, MedicalDeviceUncheckedUpdateInput>
  }

  /**
   * MedicalDevice delete
   */
  export type MedicalDeviceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDevice
     */
    select?: MedicalDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDevice
     */
    omit?: MedicalDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDeviceInclude<ExtArgs> | null
    /**
     * Filter which MedicalDevice to delete.
     */
    where: MedicalDeviceWhereUniqueInput
  }

  /**
   * MedicalDevice deleteMany
   */
  export type MedicalDeviceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MedicalDevices to delete
     */
    where?: MedicalDeviceWhereInput
    /**
     * Limit how many MedicalDevices to delete.
     */
    limit?: number
  }

  /**
   * MedicalDevice without action
   */
  export type MedicalDeviceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDevice
     */
    select?: MedicalDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDevice
     */
    omit?: MedicalDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDeviceInclude<ExtArgs> | null
  }


  /**
   * Model Facilities
   */

  export type AggregateFacilities = {
    _count: FacilitiesCountAggregateOutputType | null
    _avg: FacilitiesAvgAggregateOutputType | null
    _sum: FacilitiesSumAggregateOutputType | null
    _min: FacilitiesMinAggregateOutputType | null
    _max: FacilitiesMaxAggregateOutputType | null
  }

  export type FacilitiesAvgAggregateOutputType = {
    request_id: number | null
    facilitiesID: number | null
  }

  export type FacilitiesSumAggregateOutputType = {
    request_id: number | null
    facilitiesID: number | null
  }

  export type FacilitiesMinAggregateOutputType = {
    request_id: number | null
    maintenanceType: string | null
    equipmentType: string | null
    facilitiesID: number | null
  }

  export type FacilitiesMaxAggregateOutputType = {
    request_id: number | null
    maintenanceType: string | null
    equipmentType: string | null
    facilitiesID: number | null
  }

  export type FacilitiesCountAggregateOutputType = {
    request_id: number
    maintenanceType: number
    equipmentType: number
    facilitiesID: number
    _all: number
  }


  export type FacilitiesAvgAggregateInputType = {
    request_id?: true
    facilitiesID?: true
  }

  export type FacilitiesSumAggregateInputType = {
    request_id?: true
    facilitiesID?: true
  }

  export type FacilitiesMinAggregateInputType = {
    request_id?: true
    maintenanceType?: true
    equipmentType?: true
    facilitiesID?: true
  }

  export type FacilitiesMaxAggregateInputType = {
    request_id?: true
    maintenanceType?: true
    equipmentType?: true
    facilitiesID?: true
  }

  export type FacilitiesCountAggregateInputType = {
    request_id?: true
    maintenanceType?: true
    equipmentType?: true
    facilitiesID?: true
    _all?: true
  }

  export type FacilitiesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Facilities to aggregate.
     */
    where?: FacilitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Facilities to fetch.
     */
    orderBy?: FacilitiesOrderByWithRelationInput | FacilitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FacilitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Facilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Facilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Facilities
    **/
    _count?: true | FacilitiesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FacilitiesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FacilitiesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FacilitiesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FacilitiesMaxAggregateInputType
  }

  export type GetFacilitiesAggregateType<T extends FacilitiesAggregateArgs> = {
        [P in keyof T & keyof AggregateFacilities]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFacilities[P]>
      : GetScalarType<T[P], AggregateFacilities[P]>
  }




  export type FacilitiesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FacilitiesWhereInput
    orderBy?: FacilitiesOrderByWithAggregationInput | FacilitiesOrderByWithAggregationInput[]
    by: FacilitiesScalarFieldEnum[] | FacilitiesScalarFieldEnum
    having?: FacilitiesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FacilitiesCountAggregateInputType | true
    _avg?: FacilitiesAvgAggregateInputType
    _sum?: FacilitiesSumAggregateInputType
    _min?: FacilitiesMinAggregateInputType
    _max?: FacilitiesMaxAggregateInputType
  }

  export type FacilitiesGroupByOutputType = {
    request_id: number
    maintenanceType: string
    equipmentType: string
    facilitiesID: number
    _count: FacilitiesCountAggregateOutputType | null
    _avg: FacilitiesAvgAggregateOutputType | null
    _sum: FacilitiesSumAggregateOutputType | null
    _min: FacilitiesMinAggregateOutputType | null
    _max: FacilitiesMaxAggregateOutputType | null
  }

  type GetFacilitiesGroupByPayload<T extends FacilitiesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FacilitiesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FacilitiesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FacilitiesGroupByOutputType[P]>
            : GetScalarType<T[P], FacilitiesGroupByOutputType[P]>
        }
      >
    >


  export type FacilitiesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    maintenanceType?: boolean
    equipmentType?: boolean
    facilitiesID?: boolean
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["facilities"]>

  export type FacilitiesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    maintenanceType?: boolean
    equipmentType?: boolean
    facilitiesID?: boolean
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["facilities"]>

  export type FacilitiesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    request_id?: boolean
    maintenanceType?: boolean
    equipmentType?: boolean
    facilitiesID?: boolean
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["facilities"]>

  export type FacilitiesSelectScalar = {
    request_id?: boolean
    maintenanceType?: boolean
    equipmentType?: boolean
    facilitiesID?: boolean
  }

  export type FacilitiesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"request_id" | "maintenanceType" | "equipmentType" | "facilitiesID", ExtArgs["result"]["facilities"]>
  export type FacilitiesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }
  export type FacilitiesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }
  export type FacilitiesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_request?: boolean | service_requestDefaultArgs<ExtArgs>
  }

  export type $FacilitiesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Facilities"
    objects: {
      service_request: Prisma.$service_requestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      request_id: number
      maintenanceType: string
      equipmentType: string
      facilitiesID: number
    }, ExtArgs["result"]["facilities"]>
    composites: {}
  }

  type FacilitiesGetPayload<S extends boolean | null | undefined | FacilitiesDefaultArgs> = $Result.GetResult<Prisma.$FacilitiesPayload, S>

  type FacilitiesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FacilitiesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FacilitiesCountAggregateInputType | true
    }

  export interface FacilitiesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Facilities'], meta: { name: 'Facilities' } }
    /**
     * Find zero or one Facilities that matches the filter.
     * @param {FacilitiesFindUniqueArgs} args - Arguments to find a Facilities
     * @example
     * // Get one Facilities
     * const facilities = await prisma.facilities.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FacilitiesFindUniqueArgs>(args: SelectSubset<T, FacilitiesFindUniqueArgs<ExtArgs>>): Prisma__FacilitiesClient<$Result.GetResult<Prisma.$FacilitiesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Facilities that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FacilitiesFindUniqueOrThrowArgs} args - Arguments to find a Facilities
     * @example
     * // Get one Facilities
     * const facilities = await prisma.facilities.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FacilitiesFindUniqueOrThrowArgs>(args: SelectSubset<T, FacilitiesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FacilitiesClient<$Result.GetResult<Prisma.$FacilitiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Facilities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacilitiesFindFirstArgs} args - Arguments to find a Facilities
     * @example
     * // Get one Facilities
     * const facilities = await prisma.facilities.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FacilitiesFindFirstArgs>(args?: SelectSubset<T, FacilitiesFindFirstArgs<ExtArgs>>): Prisma__FacilitiesClient<$Result.GetResult<Prisma.$FacilitiesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Facilities that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacilitiesFindFirstOrThrowArgs} args - Arguments to find a Facilities
     * @example
     * // Get one Facilities
     * const facilities = await prisma.facilities.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FacilitiesFindFirstOrThrowArgs>(args?: SelectSubset<T, FacilitiesFindFirstOrThrowArgs<ExtArgs>>): Prisma__FacilitiesClient<$Result.GetResult<Prisma.$FacilitiesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Facilities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacilitiesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Facilities
     * const facilities = await prisma.facilities.findMany()
     * 
     * // Get first 10 Facilities
     * const facilities = await prisma.facilities.findMany({ take: 10 })
     * 
     * // Only select the `request_id`
     * const facilitiesWithRequest_idOnly = await prisma.facilities.findMany({ select: { request_id: true } })
     * 
     */
    findMany<T extends FacilitiesFindManyArgs>(args?: SelectSubset<T, FacilitiesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacilitiesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Facilities.
     * @param {FacilitiesCreateArgs} args - Arguments to create a Facilities.
     * @example
     * // Create one Facilities
     * const Facilities = await prisma.facilities.create({
     *   data: {
     *     // ... data to create a Facilities
     *   }
     * })
     * 
     */
    create<T extends FacilitiesCreateArgs>(args: SelectSubset<T, FacilitiesCreateArgs<ExtArgs>>): Prisma__FacilitiesClient<$Result.GetResult<Prisma.$FacilitiesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Facilities.
     * @param {FacilitiesCreateManyArgs} args - Arguments to create many Facilities.
     * @example
     * // Create many Facilities
     * const facilities = await prisma.facilities.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FacilitiesCreateManyArgs>(args?: SelectSubset<T, FacilitiesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Facilities and returns the data saved in the database.
     * @param {FacilitiesCreateManyAndReturnArgs} args - Arguments to create many Facilities.
     * @example
     * // Create many Facilities
     * const facilities = await prisma.facilities.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Facilities and only return the `request_id`
     * const facilitiesWithRequest_idOnly = await prisma.facilities.createManyAndReturn({
     *   select: { request_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FacilitiesCreateManyAndReturnArgs>(args?: SelectSubset<T, FacilitiesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacilitiesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Facilities.
     * @param {FacilitiesDeleteArgs} args - Arguments to delete one Facilities.
     * @example
     * // Delete one Facilities
     * const Facilities = await prisma.facilities.delete({
     *   where: {
     *     // ... filter to delete one Facilities
     *   }
     * })
     * 
     */
    delete<T extends FacilitiesDeleteArgs>(args: SelectSubset<T, FacilitiesDeleteArgs<ExtArgs>>): Prisma__FacilitiesClient<$Result.GetResult<Prisma.$FacilitiesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Facilities.
     * @param {FacilitiesUpdateArgs} args - Arguments to update one Facilities.
     * @example
     * // Update one Facilities
     * const facilities = await prisma.facilities.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FacilitiesUpdateArgs>(args: SelectSubset<T, FacilitiesUpdateArgs<ExtArgs>>): Prisma__FacilitiesClient<$Result.GetResult<Prisma.$FacilitiesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Facilities.
     * @param {FacilitiesDeleteManyArgs} args - Arguments to filter Facilities to delete.
     * @example
     * // Delete a few Facilities
     * const { count } = await prisma.facilities.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FacilitiesDeleteManyArgs>(args?: SelectSubset<T, FacilitiesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Facilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacilitiesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Facilities
     * const facilities = await prisma.facilities.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FacilitiesUpdateManyArgs>(args: SelectSubset<T, FacilitiesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Facilities and returns the data updated in the database.
     * @param {FacilitiesUpdateManyAndReturnArgs} args - Arguments to update many Facilities.
     * @example
     * // Update many Facilities
     * const facilities = await prisma.facilities.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Facilities and only return the `request_id`
     * const facilitiesWithRequest_idOnly = await prisma.facilities.updateManyAndReturn({
     *   select: { request_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FacilitiesUpdateManyAndReturnArgs>(args: SelectSubset<T, FacilitiesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacilitiesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Facilities.
     * @param {FacilitiesUpsertArgs} args - Arguments to update or create a Facilities.
     * @example
     * // Update or create a Facilities
     * const facilities = await prisma.facilities.upsert({
     *   create: {
     *     // ... data to create a Facilities
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Facilities we want to update
     *   }
     * })
     */
    upsert<T extends FacilitiesUpsertArgs>(args: SelectSubset<T, FacilitiesUpsertArgs<ExtArgs>>): Prisma__FacilitiesClient<$Result.GetResult<Prisma.$FacilitiesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Facilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacilitiesCountArgs} args - Arguments to filter Facilities to count.
     * @example
     * // Count the number of Facilities
     * const count = await prisma.facilities.count({
     *   where: {
     *     // ... the filter for the Facilities we want to count
     *   }
     * })
    **/
    count<T extends FacilitiesCountArgs>(
      args?: Subset<T, FacilitiesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FacilitiesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Facilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacilitiesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FacilitiesAggregateArgs>(args: Subset<T, FacilitiesAggregateArgs>): Prisma.PrismaPromise<GetFacilitiesAggregateType<T>>

    /**
     * Group by Facilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacilitiesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FacilitiesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FacilitiesGroupByArgs['orderBy'] }
        : { orderBy?: FacilitiesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FacilitiesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFacilitiesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Facilities model
   */
  readonly fields: FacilitiesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Facilities.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FacilitiesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service_request<T extends service_requestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, service_requestDefaultArgs<ExtArgs>>): Prisma__service_requestClient<$Result.GetResult<Prisma.$service_requestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Facilities model
   */
  interface FacilitiesFieldRefs {
    readonly request_id: FieldRef<"Facilities", 'Int'>
    readonly maintenanceType: FieldRef<"Facilities", 'String'>
    readonly equipmentType: FieldRef<"Facilities", 'String'>
    readonly facilitiesID: FieldRef<"Facilities", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Facilities findUnique
   */
  export type FacilitiesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facilities
     */
    select?: FacilitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Facilities
     */
    omit?: FacilitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacilitiesInclude<ExtArgs> | null
    /**
     * Filter, which Facilities to fetch.
     */
    where: FacilitiesWhereUniqueInput
  }

  /**
   * Facilities findUniqueOrThrow
   */
  export type FacilitiesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facilities
     */
    select?: FacilitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Facilities
     */
    omit?: FacilitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacilitiesInclude<ExtArgs> | null
    /**
     * Filter, which Facilities to fetch.
     */
    where: FacilitiesWhereUniqueInput
  }

  /**
   * Facilities findFirst
   */
  export type FacilitiesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facilities
     */
    select?: FacilitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Facilities
     */
    omit?: FacilitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacilitiesInclude<ExtArgs> | null
    /**
     * Filter, which Facilities to fetch.
     */
    where?: FacilitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Facilities to fetch.
     */
    orderBy?: FacilitiesOrderByWithRelationInput | FacilitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Facilities.
     */
    cursor?: FacilitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Facilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Facilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Facilities.
     */
    distinct?: FacilitiesScalarFieldEnum | FacilitiesScalarFieldEnum[]
  }

  /**
   * Facilities findFirstOrThrow
   */
  export type FacilitiesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facilities
     */
    select?: FacilitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Facilities
     */
    omit?: FacilitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacilitiesInclude<ExtArgs> | null
    /**
     * Filter, which Facilities to fetch.
     */
    where?: FacilitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Facilities to fetch.
     */
    orderBy?: FacilitiesOrderByWithRelationInput | FacilitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Facilities.
     */
    cursor?: FacilitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Facilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Facilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Facilities.
     */
    distinct?: FacilitiesScalarFieldEnum | FacilitiesScalarFieldEnum[]
  }

  /**
   * Facilities findMany
   */
  export type FacilitiesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facilities
     */
    select?: FacilitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Facilities
     */
    omit?: FacilitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacilitiesInclude<ExtArgs> | null
    /**
     * Filter, which Facilities to fetch.
     */
    where?: FacilitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Facilities to fetch.
     */
    orderBy?: FacilitiesOrderByWithRelationInput | FacilitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Facilities.
     */
    cursor?: FacilitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Facilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Facilities.
     */
    skip?: number
    distinct?: FacilitiesScalarFieldEnum | FacilitiesScalarFieldEnum[]
  }

  /**
   * Facilities create
   */
  export type FacilitiesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facilities
     */
    select?: FacilitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Facilities
     */
    omit?: FacilitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacilitiesInclude<ExtArgs> | null
    /**
     * The data needed to create a Facilities.
     */
    data: XOR<FacilitiesCreateInput, FacilitiesUncheckedCreateInput>
  }

  /**
   * Facilities createMany
   */
  export type FacilitiesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Facilities.
     */
    data: FacilitiesCreateManyInput | FacilitiesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Facilities createManyAndReturn
   */
  export type FacilitiesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facilities
     */
    select?: FacilitiesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Facilities
     */
    omit?: FacilitiesOmit<ExtArgs> | null
    /**
     * The data used to create many Facilities.
     */
    data: FacilitiesCreateManyInput | FacilitiesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacilitiesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Facilities update
   */
  export type FacilitiesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facilities
     */
    select?: FacilitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Facilities
     */
    omit?: FacilitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacilitiesInclude<ExtArgs> | null
    /**
     * The data needed to update a Facilities.
     */
    data: XOR<FacilitiesUpdateInput, FacilitiesUncheckedUpdateInput>
    /**
     * Choose, which Facilities to update.
     */
    where: FacilitiesWhereUniqueInput
  }

  /**
   * Facilities updateMany
   */
  export type FacilitiesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Facilities.
     */
    data: XOR<FacilitiesUpdateManyMutationInput, FacilitiesUncheckedUpdateManyInput>
    /**
     * Filter which Facilities to update
     */
    where?: FacilitiesWhereInput
    /**
     * Limit how many Facilities to update.
     */
    limit?: number
  }

  /**
   * Facilities updateManyAndReturn
   */
  export type FacilitiesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facilities
     */
    select?: FacilitiesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Facilities
     */
    omit?: FacilitiesOmit<ExtArgs> | null
    /**
     * The data used to update Facilities.
     */
    data: XOR<FacilitiesUpdateManyMutationInput, FacilitiesUncheckedUpdateManyInput>
    /**
     * Filter which Facilities to update
     */
    where?: FacilitiesWhereInput
    /**
     * Limit how many Facilities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacilitiesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Facilities upsert
   */
  export type FacilitiesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facilities
     */
    select?: FacilitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Facilities
     */
    omit?: FacilitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacilitiesInclude<ExtArgs> | null
    /**
     * The filter to search for the Facilities to update in case it exists.
     */
    where: FacilitiesWhereUniqueInput
    /**
     * In case the Facilities found by the `where` argument doesn't exist, create a new Facilities with this data.
     */
    create: XOR<FacilitiesCreateInput, FacilitiesUncheckedCreateInput>
    /**
     * In case the Facilities was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FacilitiesUpdateInput, FacilitiesUncheckedUpdateInput>
  }

  /**
   * Facilities delete
   */
  export type FacilitiesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facilities
     */
    select?: FacilitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Facilities
     */
    omit?: FacilitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacilitiesInclude<ExtArgs> | null
    /**
     * Filter which Facilities to delete.
     */
    where: FacilitiesWhereUniqueInput
  }

  /**
   * Facilities deleteMany
   */
  export type FacilitiesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Facilities to delete
     */
    where?: FacilitiesWhereInput
    /**
     * Limit how many Facilities to delete.
     */
    limit?: number
  }

  /**
   * Facilities without action
   */
  export type FacilitiesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Facilities
     */
    select?: FacilitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Facilities
     */
    omit?: FacilitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacilitiesInclude<ExtArgs> | null
  }


  /**
   * Model directory
   */

  export type AggregateDirectory = {
    _count: DirectoryCountAggregateOutputType | null
    _avg: DirectoryAvgAggregateOutputType | null
    _sum: DirectorySumAggregateOutputType | null
    _min: DirectoryMinAggregateOutputType | null
    _max: DirectoryMaxAggregateOutputType | null
  }

  export type DirectoryAvgAggregateOutputType = {
    id: number | null
  }

  export type DirectorySumAggregateOutputType = {
    id: number | null
  }

  export type DirectoryMinAggregateOutputType = {
    id: number | null
    name: string | null
    services: string | null
    location: string | null
    telephone: string | null
  }

  export type DirectoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
    services: string | null
    location: string | null
    telephone: string | null
  }

  export type DirectoryCountAggregateOutputType = {
    id: number
    name: number
    services: number
    location: number
    telephone: number
    _all: number
  }


  export type DirectoryAvgAggregateInputType = {
    id?: true
  }

  export type DirectorySumAggregateInputType = {
    id?: true
  }

  export type DirectoryMinAggregateInputType = {
    id?: true
    name?: true
    services?: true
    location?: true
    telephone?: true
  }

  export type DirectoryMaxAggregateInputType = {
    id?: true
    name?: true
    services?: true
    location?: true
    telephone?: true
  }

  export type DirectoryCountAggregateInputType = {
    id?: true
    name?: true
    services?: true
    location?: true
    telephone?: true
    _all?: true
  }

  export type DirectoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which directory to aggregate.
     */
    where?: directoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of directories to fetch.
     */
    orderBy?: directoryOrderByWithRelationInput | directoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: directoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` directories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` directories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned directories
    **/
    _count?: true | DirectoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DirectoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DirectorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DirectoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DirectoryMaxAggregateInputType
  }

  export type GetDirectoryAggregateType<T extends DirectoryAggregateArgs> = {
        [P in keyof T & keyof AggregateDirectory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDirectory[P]>
      : GetScalarType<T[P], AggregateDirectory[P]>
  }




  export type directoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: directoryWhereInput
    orderBy?: directoryOrderByWithAggregationInput | directoryOrderByWithAggregationInput[]
    by: DirectoryScalarFieldEnum[] | DirectoryScalarFieldEnum
    having?: directoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DirectoryCountAggregateInputType | true
    _avg?: DirectoryAvgAggregateInputType
    _sum?: DirectorySumAggregateInputType
    _min?: DirectoryMinAggregateInputType
    _max?: DirectoryMaxAggregateInputType
  }

  export type DirectoryGroupByOutputType = {
    id: number
    name: string
    services: string
    location: string
    telephone: string
    _count: DirectoryCountAggregateOutputType | null
    _avg: DirectoryAvgAggregateOutputType | null
    _sum: DirectorySumAggregateOutputType | null
    _min: DirectoryMinAggregateOutputType | null
    _max: DirectoryMaxAggregateOutputType | null
  }

  type GetDirectoryGroupByPayload<T extends directoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DirectoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DirectoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DirectoryGroupByOutputType[P]>
            : GetScalarType<T[P], DirectoryGroupByOutputType[P]>
        }
      >
    >


  export type directorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    services?: boolean
    location?: boolean
    telephone?: boolean
  }, ExtArgs["result"]["directory"]>

  export type directorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    services?: boolean
    location?: boolean
    telephone?: boolean
  }, ExtArgs["result"]["directory"]>

  export type directorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    services?: boolean
    location?: boolean
    telephone?: boolean
  }, ExtArgs["result"]["directory"]>

  export type directorySelectScalar = {
    id?: boolean
    name?: boolean
    services?: boolean
    location?: boolean
    telephone?: boolean
  }

  export type directoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "services" | "location" | "telephone", ExtArgs["result"]["directory"]>

  export type $directoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "directory"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      services: string
      location: string
      telephone: string
    }, ExtArgs["result"]["directory"]>
    composites: {}
  }

  type directoryGetPayload<S extends boolean | null | undefined | directoryDefaultArgs> = $Result.GetResult<Prisma.$directoryPayload, S>

  type directoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<directoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DirectoryCountAggregateInputType | true
    }

  export interface directoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['directory'], meta: { name: 'directory' } }
    /**
     * Find zero or one Directory that matches the filter.
     * @param {directoryFindUniqueArgs} args - Arguments to find a Directory
     * @example
     * // Get one Directory
     * const directory = await prisma.directory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends directoryFindUniqueArgs>(args: SelectSubset<T, directoryFindUniqueArgs<ExtArgs>>): Prisma__directoryClient<$Result.GetResult<Prisma.$directoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Directory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {directoryFindUniqueOrThrowArgs} args - Arguments to find a Directory
     * @example
     * // Get one Directory
     * const directory = await prisma.directory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends directoryFindUniqueOrThrowArgs>(args: SelectSubset<T, directoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__directoryClient<$Result.GetResult<Prisma.$directoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Directory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {directoryFindFirstArgs} args - Arguments to find a Directory
     * @example
     * // Get one Directory
     * const directory = await prisma.directory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends directoryFindFirstArgs>(args?: SelectSubset<T, directoryFindFirstArgs<ExtArgs>>): Prisma__directoryClient<$Result.GetResult<Prisma.$directoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Directory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {directoryFindFirstOrThrowArgs} args - Arguments to find a Directory
     * @example
     * // Get one Directory
     * const directory = await prisma.directory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends directoryFindFirstOrThrowArgs>(args?: SelectSubset<T, directoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__directoryClient<$Result.GetResult<Prisma.$directoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Directories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {directoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Directories
     * const directories = await prisma.directory.findMany()
     * 
     * // Get first 10 Directories
     * const directories = await prisma.directory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const directoryWithIdOnly = await prisma.directory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends directoryFindManyArgs>(args?: SelectSubset<T, directoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$directoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Directory.
     * @param {directoryCreateArgs} args - Arguments to create a Directory.
     * @example
     * // Create one Directory
     * const Directory = await prisma.directory.create({
     *   data: {
     *     // ... data to create a Directory
     *   }
     * })
     * 
     */
    create<T extends directoryCreateArgs>(args: SelectSubset<T, directoryCreateArgs<ExtArgs>>): Prisma__directoryClient<$Result.GetResult<Prisma.$directoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Directories.
     * @param {directoryCreateManyArgs} args - Arguments to create many Directories.
     * @example
     * // Create many Directories
     * const directory = await prisma.directory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends directoryCreateManyArgs>(args?: SelectSubset<T, directoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Directories and returns the data saved in the database.
     * @param {directoryCreateManyAndReturnArgs} args - Arguments to create many Directories.
     * @example
     * // Create many Directories
     * const directory = await prisma.directory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Directories and only return the `id`
     * const directoryWithIdOnly = await prisma.directory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends directoryCreateManyAndReturnArgs>(args?: SelectSubset<T, directoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$directoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Directory.
     * @param {directoryDeleteArgs} args - Arguments to delete one Directory.
     * @example
     * // Delete one Directory
     * const Directory = await prisma.directory.delete({
     *   where: {
     *     // ... filter to delete one Directory
     *   }
     * })
     * 
     */
    delete<T extends directoryDeleteArgs>(args: SelectSubset<T, directoryDeleteArgs<ExtArgs>>): Prisma__directoryClient<$Result.GetResult<Prisma.$directoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Directory.
     * @param {directoryUpdateArgs} args - Arguments to update one Directory.
     * @example
     * // Update one Directory
     * const directory = await prisma.directory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends directoryUpdateArgs>(args: SelectSubset<T, directoryUpdateArgs<ExtArgs>>): Prisma__directoryClient<$Result.GetResult<Prisma.$directoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Directories.
     * @param {directoryDeleteManyArgs} args - Arguments to filter Directories to delete.
     * @example
     * // Delete a few Directories
     * const { count } = await prisma.directory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends directoryDeleteManyArgs>(args?: SelectSubset<T, directoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Directories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {directoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Directories
     * const directory = await prisma.directory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends directoryUpdateManyArgs>(args: SelectSubset<T, directoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Directories and returns the data updated in the database.
     * @param {directoryUpdateManyAndReturnArgs} args - Arguments to update many Directories.
     * @example
     * // Update many Directories
     * const directory = await prisma.directory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Directories and only return the `id`
     * const directoryWithIdOnly = await prisma.directory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends directoryUpdateManyAndReturnArgs>(args: SelectSubset<T, directoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$directoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Directory.
     * @param {directoryUpsertArgs} args - Arguments to update or create a Directory.
     * @example
     * // Update or create a Directory
     * const directory = await prisma.directory.upsert({
     *   create: {
     *     // ... data to create a Directory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Directory we want to update
     *   }
     * })
     */
    upsert<T extends directoryUpsertArgs>(args: SelectSubset<T, directoryUpsertArgs<ExtArgs>>): Prisma__directoryClient<$Result.GetResult<Prisma.$directoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Directories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {directoryCountArgs} args - Arguments to filter Directories to count.
     * @example
     * // Count the number of Directories
     * const count = await prisma.directory.count({
     *   where: {
     *     // ... the filter for the Directories we want to count
     *   }
     * })
    **/
    count<T extends directoryCountArgs>(
      args?: Subset<T, directoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DirectoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Directory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DirectoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DirectoryAggregateArgs>(args: Subset<T, DirectoryAggregateArgs>): Prisma.PrismaPromise<GetDirectoryAggregateType<T>>

    /**
     * Group by Directory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {directoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends directoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: directoryGroupByArgs['orderBy'] }
        : { orderBy?: directoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, directoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDirectoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the directory model
   */
  readonly fields: directoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for directory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__directoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the directory model
   */
  interface directoryFieldRefs {
    readonly id: FieldRef<"directory", 'Int'>
    readonly name: FieldRef<"directory", 'String'>
    readonly services: FieldRef<"directory", 'String'>
    readonly location: FieldRef<"directory", 'String'>
    readonly telephone: FieldRef<"directory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * directory findUnique
   */
  export type directoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the directory
     */
    select?: directorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the directory
     */
    omit?: directoryOmit<ExtArgs> | null
    /**
     * Filter, which directory to fetch.
     */
    where: directoryWhereUniqueInput
  }

  /**
   * directory findUniqueOrThrow
   */
  export type directoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the directory
     */
    select?: directorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the directory
     */
    omit?: directoryOmit<ExtArgs> | null
    /**
     * Filter, which directory to fetch.
     */
    where: directoryWhereUniqueInput
  }

  /**
   * directory findFirst
   */
  export type directoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the directory
     */
    select?: directorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the directory
     */
    omit?: directoryOmit<ExtArgs> | null
    /**
     * Filter, which directory to fetch.
     */
    where?: directoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of directories to fetch.
     */
    orderBy?: directoryOrderByWithRelationInput | directoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for directories.
     */
    cursor?: directoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` directories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` directories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of directories.
     */
    distinct?: DirectoryScalarFieldEnum | DirectoryScalarFieldEnum[]
  }

  /**
   * directory findFirstOrThrow
   */
  export type directoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the directory
     */
    select?: directorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the directory
     */
    omit?: directoryOmit<ExtArgs> | null
    /**
     * Filter, which directory to fetch.
     */
    where?: directoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of directories to fetch.
     */
    orderBy?: directoryOrderByWithRelationInput | directoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for directories.
     */
    cursor?: directoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` directories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` directories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of directories.
     */
    distinct?: DirectoryScalarFieldEnum | DirectoryScalarFieldEnum[]
  }

  /**
   * directory findMany
   */
  export type directoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the directory
     */
    select?: directorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the directory
     */
    omit?: directoryOmit<ExtArgs> | null
    /**
     * Filter, which directories to fetch.
     */
    where?: directoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of directories to fetch.
     */
    orderBy?: directoryOrderByWithRelationInput | directoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing directories.
     */
    cursor?: directoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` directories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` directories.
     */
    skip?: number
    distinct?: DirectoryScalarFieldEnum | DirectoryScalarFieldEnum[]
  }

  /**
   * directory create
   */
  export type directoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the directory
     */
    select?: directorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the directory
     */
    omit?: directoryOmit<ExtArgs> | null
    /**
     * The data needed to create a directory.
     */
    data: XOR<directoryCreateInput, directoryUncheckedCreateInput>
  }

  /**
   * directory createMany
   */
  export type directoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many directories.
     */
    data: directoryCreateManyInput | directoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * directory createManyAndReturn
   */
  export type directoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the directory
     */
    select?: directorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the directory
     */
    omit?: directoryOmit<ExtArgs> | null
    /**
     * The data used to create many directories.
     */
    data: directoryCreateManyInput | directoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * directory update
   */
  export type directoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the directory
     */
    select?: directorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the directory
     */
    omit?: directoryOmit<ExtArgs> | null
    /**
     * The data needed to update a directory.
     */
    data: XOR<directoryUpdateInput, directoryUncheckedUpdateInput>
    /**
     * Choose, which directory to update.
     */
    where: directoryWhereUniqueInput
  }

  /**
   * directory updateMany
   */
  export type directoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update directories.
     */
    data: XOR<directoryUpdateManyMutationInput, directoryUncheckedUpdateManyInput>
    /**
     * Filter which directories to update
     */
    where?: directoryWhereInput
    /**
     * Limit how many directories to update.
     */
    limit?: number
  }

  /**
   * directory updateManyAndReturn
   */
  export type directoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the directory
     */
    select?: directorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the directory
     */
    omit?: directoryOmit<ExtArgs> | null
    /**
     * The data used to update directories.
     */
    data: XOR<directoryUpdateManyMutationInput, directoryUncheckedUpdateManyInput>
    /**
     * Filter which directories to update
     */
    where?: directoryWhereInput
    /**
     * Limit how many directories to update.
     */
    limit?: number
  }

  /**
   * directory upsert
   */
  export type directoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the directory
     */
    select?: directorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the directory
     */
    omit?: directoryOmit<ExtArgs> | null
    /**
     * The filter to search for the directory to update in case it exists.
     */
    where: directoryWhereUniqueInput
    /**
     * In case the directory found by the `where` argument doesn't exist, create a new directory with this data.
     */
    create: XOR<directoryCreateInput, directoryUncheckedCreateInput>
    /**
     * In case the directory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<directoryUpdateInput, directoryUncheckedUpdateInput>
  }

  /**
   * directory delete
   */
  export type directoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the directory
     */
    select?: directorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the directory
     */
    omit?: directoryOmit<ExtArgs> | null
    /**
     * Filter which directory to delete.
     */
    where: directoryWhereUniqueInput
  }

  /**
   * directory deleteMany
   */
  export type directoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which directories to delete
     */
    where?: directoryWhereInput
    /**
     * Limit how many directories to delete.
     */
    limit?: number
  }

  /**
   * directory without action
   */
  export type directoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the directory
     */
    select?: directorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the directory
     */
    omit?: directoryOmit<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    first_name: string | null
    last_name: string | null
    email: string | null
    password: string | null
  }

  export type UsersMaxAggregateOutputType = {
    first_name: string | null
    last_name: string | null
    email: string | null
    password: string | null
  }

  export type UsersCountAggregateOutputType = {
    first_name: number
    last_name: number
    email: number
    password: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    first_name?: true
    last_name?: true
    email?: true
    password?: true
  }

  export type UsersMaxAggregateInputType = {
    first_name?: true
    last_name?: true
    email?: true
    password?: true
  }

  export type UsersCountAggregateInputType = {
    first_name?: true
    last_name?: true
    email?: true
    password?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    first_name: string
    last_name: string
    email: string
    password: string
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    password?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    password?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    password?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    password?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"first_name" | "last_name" | "email" | "password", ExtArgs["result"]["users"]>

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      first_name: string
      last_name: string
      email: string
      password: string
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `first_name`
     * const usersWithFirst_nameOnly = await prisma.users.findMany({ select: { first_name: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `first_name`
     * const usersWithFirst_nameOnly = await prisma.users.createManyAndReturn({
     *   select: { first_name: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `first_name`
     * const usersWithFirst_nameOnly = await prisma.users.updateManyAndReturn({
     *   select: { first_name: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly first_name: FieldRef<"users", 'String'>
    readonly last_name: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password: FieldRef<"users", 'String'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
  }


  /**
   * Model nodes
   */

  export type AggregateNodes = {
    _count: NodesCountAggregateOutputType | null
    _avg: NodesAvgAggregateOutputType | null
    _sum: NodesSumAggregateOutputType | null
    _min: NodesMinAggregateOutputType | null
    _max: NodesMaxAggregateOutputType | null
  }

  export type NodesAvgAggregateOutputType = {
    id: number | null
    floor: number | null
    x: number | null
    y: number | null
    edgeCost: number | null
    totalCost: number | null
  }

  export type NodesSumAggregateOutputType = {
    id: number | null
    floor: number | null
    x: number | null
    y: number | null
    edgeCost: number | null
    totalCost: number | null
  }

  export type NodesMinAggregateOutputType = {
    id: number | null
    building: string | null
    floor: number | null
    name: string | null
    x: number | null
    y: number | null
    edgeCost: number | null
    totalCost: number | null
  }

  export type NodesMaxAggregateOutputType = {
    id: number | null
    building: string | null
    floor: number | null
    name: string | null
    x: number | null
    y: number | null
    edgeCost: number | null
    totalCost: number | null
  }

  export type NodesCountAggregateOutputType = {
    id: number
    building: number
    floor: number
    name: number
    x: number
    y: number
    edgeCost: number
    totalCost: number
    _all: number
  }


  export type NodesAvgAggregateInputType = {
    id?: true
    floor?: true
    x?: true
    y?: true
    edgeCost?: true
    totalCost?: true
  }

  export type NodesSumAggregateInputType = {
    id?: true
    floor?: true
    x?: true
    y?: true
    edgeCost?: true
    totalCost?: true
  }

  export type NodesMinAggregateInputType = {
    id?: true
    building?: true
    floor?: true
    name?: true
    x?: true
    y?: true
    edgeCost?: true
    totalCost?: true
  }

  export type NodesMaxAggregateInputType = {
    id?: true
    building?: true
    floor?: true
    name?: true
    x?: true
    y?: true
    edgeCost?: true
    totalCost?: true
  }

  export type NodesCountAggregateInputType = {
    id?: true
    building?: true
    floor?: true
    name?: true
    x?: true
    y?: true
    edgeCost?: true
    totalCost?: true
    _all?: true
  }

  export type NodesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which nodes to aggregate.
     */
    where?: nodesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of nodes to fetch.
     */
    orderBy?: nodesOrderByWithRelationInput | nodesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: nodesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` nodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` nodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned nodes
    **/
    _count?: true | NodesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NodesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NodesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NodesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NodesMaxAggregateInputType
  }

  export type GetNodesAggregateType<T extends NodesAggregateArgs> = {
        [P in keyof T & keyof AggregateNodes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNodes[P]>
      : GetScalarType<T[P], AggregateNodes[P]>
  }




  export type nodesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: nodesWhereInput
    orderBy?: nodesOrderByWithAggregationInput | nodesOrderByWithAggregationInput[]
    by: NodesScalarFieldEnum[] | NodesScalarFieldEnum
    having?: nodesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NodesCountAggregateInputType | true
    _avg?: NodesAvgAggregateInputType
    _sum?: NodesSumAggregateInputType
    _min?: NodesMinAggregateInputType
    _max?: NodesMaxAggregateInputType
  }

  export type NodesGroupByOutputType = {
    id: number
    building: string
    floor: number
    name: string | null
    x: number
    y: number
    edgeCost: number
    totalCost: number
    _count: NodesCountAggregateOutputType | null
    _avg: NodesAvgAggregateOutputType | null
    _sum: NodesSumAggregateOutputType | null
    _min: NodesMinAggregateOutputType | null
    _max: NodesMaxAggregateOutputType | null
  }

  type GetNodesGroupByPayload<T extends nodesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NodesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NodesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NodesGroupByOutputType[P]>
            : GetScalarType<T[P], NodesGroupByOutputType[P]>
        }
      >
    >


  export type nodesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    building?: boolean
    floor?: boolean
    name?: boolean
    x?: boolean
    y?: boolean
    edgeCost?: boolean
    totalCost?: boolean
    outgoingEdges?: boolean | nodes$outgoingEdgesArgs<ExtArgs>
    incomingEdges?: boolean | nodes$incomingEdgesArgs<ExtArgs>
    _count?: boolean | NodesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nodes"]>

  export type nodesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    building?: boolean
    floor?: boolean
    name?: boolean
    x?: boolean
    y?: boolean
    edgeCost?: boolean
    totalCost?: boolean
  }, ExtArgs["result"]["nodes"]>

  export type nodesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    building?: boolean
    floor?: boolean
    name?: boolean
    x?: boolean
    y?: boolean
    edgeCost?: boolean
    totalCost?: boolean
  }, ExtArgs["result"]["nodes"]>

  export type nodesSelectScalar = {
    id?: boolean
    building?: boolean
    floor?: boolean
    name?: boolean
    x?: boolean
    y?: boolean
    edgeCost?: boolean
    totalCost?: boolean
  }

  export type nodesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "building" | "floor" | "name" | "x" | "y" | "edgeCost" | "totalCost", ExtArgs["result"]["nodes"]>
  export type nodesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    outgoingEdges?: boolean | nodes$outgoingEdgesArgs<ExtArgs>
    incomingEdges?: boolean | nodes$incomingEdgesArgs<ExtArgs>
    _count?: boolean | NodesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type nodesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type nodesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $nodesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "nodes"
    objects: {
      outgoingEdges: Prisma.$edgesPayload<ExtArgs>[]
      incomingEdges: Prisma.$edgesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      building: string
      floor: number
      name: string | null
      x: number
      y: number
      edgeCost: number
      totalCost: number
    }, ExtArgs["result"]["nodes"]>
    composites: {}
  }

  type nodesGetPayload<S extends boolean | null | undefined | nodesDefaultArgs> = $Result.GetResult<Prisma.$nodesPayload, S>

  type nodesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<nodesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NodesCountAggregateInputType | true
    }

  export interface nodesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['nodes'], meta: { name: 'nodes' } }
    /**
     * Find zero or one Nodes that matches the filter.
     * @param {nodesFindUniqueArgs} args - Arguments to find a Nodes
     * @example
     * // Get one Nodes
     * const nodes = await prisma.nodes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends nodesFindUniqueArgs>(args: SelectSubset<T, nodesFindUniqueArgs<ExtArgs>>): Prisma__nodesClient<$Result.GetResult<Prisma.$nodesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Nodes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {nodesFindUniqueOrThrowArgs} args - Arguments to find a Nodes
     * @example
     * // Get one Nodes
     * const nodes = await prisma.nodes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends nodesFindUniqueOrThrowArgs>(args: SelectSubset<T, nodesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__nodesClient<$Result.GetResult<Prisma.$nodesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Nodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nodesFindFirstArgs} args - Arguments to find a Nodes
     * @example
     * // Get one Nodes
     * const nodes = await prisma.nodes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends nodesFindFirstArgs>(args?: SelectSubset<T, nodesFindFirstArgs<ExtArgs>>): Prisma__nodesClient<$Result.GetResult<Prisma.$nodesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Nodes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nodesFindFirstOrThrowArgs} args - Arguments to find a Nodes
     * @example
     * // Get one Nodes
     * const nodes = await prisma.nodes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends nodesFindFirstOrThrowArgs>(args?: SelectSubset<T, nodesFindFirstOrThrowArgs<ExtArgs>>): Prisma__nodesClient<$Result.GetResult<Prisma.$nodesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Nodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nodesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Nodes
     * const nodes = await prisma.nodes.findMany()
     * 
     * // Get first 10 Nodes
     * const nodes = await prisma.nodes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nodesWithIdOnly = await prisma.nodes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends nodesFindManyArgs>(args?: SelectSubset<T, nodesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$nodesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Nodes.
     * @param {nodesCreateArgs} args - Arguments to create a Nodes.
     * @example
     * // Create one Nodes
     * const Nodes = await prisma.nodes.create({
     *   data: {
     *     // ... data to create a Nodes
     *   }
     * })
     * 
     */
    create<T extends nodesCreateArgs>(args: SelectSubset<T, nodesCreateArgs<ExtArgs>>): Prisma__nodesClient<$Result.GetResult<Prisma.$nodesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Nodes.
     * @param {nodesCreateManyArgs} args - Arguments to create many Nodes.
     * @example
     * // Create many Nodes
     * const nodes = await prisma.nodes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends nodesCreateManyArgs>(args?: SelectSubset<T, nodesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Nodes and returns the data saved in the database.
     * @param {nodesCreateManyAndReturnArgs} args - Arguments to create many Nodes.
     * @example
     * // Create many Nodes
     * const nodes = await prisma.nodes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Nodes and only return the `id`
     * const nodesWithIdOnly = await prisma.nodes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends nodesCreateManyAndReturnArgs>(args?: SelectSubset<T, nodesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$nodesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Nodes.
     * @param {nodesDeleteArgs} args - Arguments to delete one Nodes.
     * @example
     * // Delete one Nodes
     * const Nodes = await prisma.nodes.delete({
     *   where: {
     *     // ... filter to delete one Nodes
     *   }
     * })
     * 
     */
    delete<T extends nodesDeleteArgs>(args: SelectSubset<T, nodesDeleteArgs<ExtArgs>>): Prisma__nodesClient<$Result.GetResult<Prisma.$nodesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Nodes.
     * @param {nodesUpdateArgs} args - Arguments to update one Nodes.
     * @example
     * // Update one Nodes
     * const nodes = await prisma.nodes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends nodesUpdateArgs>(args: SelectSubset<T, nodesUpdateArgs<ExtArgs>>): Prisma__nodesClient<$Result.GetResult<Prisma.$nodesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Nodes.
     * @param {nodesDeleteManyArgs} args - Arguments to filter Nodes to delete.
     * @example
     * // Delete a few Nodes
     * const { count } = await prisma.nodes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends nodesDeleteManyArgs>(args?: SelectSubset<T, nodesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Nodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nodesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Nodes
     * const nodes = await prisma.nodes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends nodesUpdateManyArgs>(args: SelectSubset<T, nodesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Nodes and returns the data updated in the database.
     * @param {nodesUpdateManyAndReturnArgs} args - Arguments to update many Nodes.
     * @example
     * // Update many Nodes
     * const nodes = await prisma.nodes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Nodes and only return the `id`
     * const nodesWithIdOnly = await prisma.nodes.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends nodesUpdateManyAndReturnArgs>(args: SelectSubset<T, nodesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$nodesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Nodes.
     * @param {nodesUpsertArgs} args - Arguments to update or create a Nodes.
     * @example
     * // Update or create a Nodes
     * const nodes = await prisma.nodes.upsert({
     *   create: {
     *     // ... data to create a Nodes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Nodes we want to update
     *   }
     * })
     */
    upsert<T extends nodesUpsertArgs>(args: SelectSubset<T, nodesUpsertArgs<ExtArgs>>): Prisma__nodesClient<$Result.GetResult<Prisma.$nodesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Nodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nodesCountArgs} args - Arguments to filter Nodes to count.
     * @example
     * // Count the number of Nodes
     * const count = await prisma.nodes.count({
     *   where: {
     *     // ... the filter for the Nodes we want to count
     *   }
     * })
    **/
    count<T extends nodesCountArgs>(
      args?: Subset<T, nodesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NodesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Nodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NodesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NodesAggregateArgs>(args: Subset<T, NodesAggregateArgs>): Prisma.PrismaPromise<GetNodesAggregateType<T>>

    /**
     * Group by Nodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nodesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends nodesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: nodesGroupByArgs['orderBy'] }
        : { orderBy?: nodesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, nodesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNodesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the nodes model
   */
  readonly fields: nodesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for nodes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__nodesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    outgoingEdges<T extends nodes$outgoingEdgesArgs<ExtArgs> = {}>(args?: Subset<T, nodes$outgoingEdgesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$edgesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    incomingEdges<T extends nodes$incomingEdgesArgs<ExtArgs> = {}>(args?: Subset<T, nodes$incomingEdgesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$edgesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the nodes model
   */
  interface nodesFieldRefs {
    readonly id: FieldRef<"nodes", 'Int'>
    readonly building: FieldRef<"nodes", 'String'>
    readonly floor: FieldRef<"nodes", 'Int'>
    readonly name: FieldRef<"nodes", 'String'>
    readonly x: FieldRef<"nodes", 'Float'>
    readonly y: FieldRef<"nodes", 'Float'>
    readonly edgeCost: FieldRef<"nodes", 'Int'>
    readonly totalCost: FieldRef<"nodes", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * nodes findUnique
   */
  export type nodesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nodes
     */
    select?: nodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nodes
     */
    omit?: nodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nodesInclude<ExtArgs> | null
    /**
     * Filter, which nodes to fetch.
     */
    where: nodesWhereUniqueInput
  }

  /**
   * nodes findUniqueOrThrow
   */
  export type nodesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nodes
     */
    select?: nodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nodes
     */
    omit?: nodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nodesInclude<ExtArgs> | null
    /**
     * Filter, which nodes to fetch.
     */
    where: nodesWhereUniqueInput
  }

  /**
   * nodes findFirst
   */
  export type nodesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nodes
     */
    select?: nodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nodes
     */
    omit?: nodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nodesInclude<ExtArgs> | null
    /**
     * Filter, which nodes to fetch.
     */
    where?: nodesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of nodes to fetch.
     */
    orderBy?: nodesOrderByWithRelationInput | nodesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for nodes.
     */
    cursor?: nodesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` nodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` nodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of nodes.
     */
    distinct?: NodesScalarFieldEnum | NodesScalarFieldEnum[]
  }

  /**
   * nodes findFirstOrThrow
   */
  export type nodesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nodes
     */
    select?: nodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nodes
     */
    omit?: nodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nodesInclude<ExtArgs> | null
    /**
     * Filter, which nodes to fetch.
     */
    where?: nodesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of nodes to fetch.
     */
    orderBy?: nodesOrderByWithRelationInput | nodesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for nodes.
     */
    cursor?: nodesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` nodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` nodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of nodes.
     */
    distinct?: NodesScalarFieldEnum | NodesScalarFieldEnum[]
  }

  /**
   * nodes findMany
   */
  export type nodesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nodes
     */
    select?: nodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nodes
     */
    omit?: nodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nodesInclude<ExtArgs> | null
    /**
     * Filter, which nodes to fetch.
     */
    where?: nodesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of nodes to fetch.
     */
    orderBy?: nodesOrderByWithRelationInput | nodesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing nodes.
     */
    cursor?: nodesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` nodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` nodes.
     */
    skip?: number
    distinct?: NodesScalarFieldEnum | NodesScalarFieldEnum[]
  }

  /**
   * nodes create
   */
  export type nodesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nodes
     */
    select?: nodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nodes
     */
    omit?: nodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nodesInclude<ExtArgs> | null
    /**
     * The data needed to create a nodes.
     */
    data: XOR<nodesCreateInput, nodesUncheckedCreateInput>
  }

  /**
   * nodes createMany
   */
  export type nodesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many nodes.
     */
    data: nodesCreateManyInput | nodesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * nodes createManyAndReturn
   */
  export type nodesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nodes
     */
    select?: nodesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the nodes
     */
    omit?: nodesOmit<ExtArgs> | null
    /**
     * The data used to create many nodes.
     */
    data: nodesCreateManyInput | nodesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * nodes update
   */
  export type nodesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nodes
     */
    select?: nodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nodes
     */
    omit?: nodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nodesInclude<ExtArgs> | null
    /**
     * The data needed to update a nodes.
     */
    data: XOR<nodesUpdateInput, nodesUncheckedUpdateInput>
    /**
     * Choose, which nodes to update.
     */
    where: nodesWhereUniqueInput
  }

  /**
   * nodes updateMany
   */
  export type nodesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update nodes.
     */
    data: XOR<nodesUpdateManyMutationInput, nodesUncheckedUpdateManyInput>
    /**
     * Filter which nodes to update
     */
    where?: nodesWhereInput
    /**
     * Limit how many nodes to update.
     */
    limit?: number
  }

  /**
   * nodes updateManyAndReturn
   */
  export type nodesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nodes
     */
    select?: nodesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the nodes
     */
    omit?: nodesOmit<ExtArgs> | null
    /**
     * The data used to update nodes.
     */
    data: XOR<nodesUpdateManyMutationInput, nodesUncheckedUpdateManyInput>
    /**
     * Filter which nodes to update
     */
    where?: nodesWhereInput
    /**
     * Limit how many nodes to update.
     */
    limit?: number
  }

  /**
   * nodes upsert
   */
  export type nodesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nodes
     */
    select?: nodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nodes
     */
    omit?: nodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nodesInclude<ExtArgs> | null
    /**
     * The filter to search for the nodes to update in case it exists.
     */
    where: nodesWhereUniqueInput
    /**
     * In case the nodes found by the `where` argument doesn't exist, create a new nodes with this data.
     */
    create: XOR<nodesCreateInput, nodesUncheckedCreateInput>
    /**
     * In case the nodes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<nodesUpdateInput, nodesUncheckedUpdateInput>
  }

  /**
   * nodes delete
   */
  export type nodesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nodes
     */
    select?: nodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nodes
     */
    omit?: nodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nodesInclude<ExtArgs> | null
    /**
     * Filter which nodes to delete.
     */
    where: nodesWhereUniqueInput
  }

  /**
   * nodes deleteMany
   */
  export type nodesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which nodes to delete
     */
    where?: nodesWhereInput
    /**
     * Limit how many nodes to delete.
     */
    limit?: number
  }

  /**
   * nodes.outgoingEdges
   */
  export type nodes$outgoingEdgesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the edges
     */
    select?: edgesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the edges
     */
    omit?: edgesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: edgesInclude<ExtArgs> | null
    where?: edgesWhereInput
    orderBy?: edgesOrderByWithRelationInput | edgesOrderByWithRelationInput[]
    cursor?: edgesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EdgesScalarFieldEnum | EdgesScalarFieldEnum[]
  }

  /**
   * nodes.incomingEdges
   */
  export type nodes$incomingEdgesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the edges
     */
    select?: edgesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the edges
     */
    omit?: edgesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: edgesInclude<ExtArgs> | null
    where?: edgesWhereInput
    orderBy?: edgesOrderByWithRelationInput | edgesOrderByWithRelationInput[]
    cursor?: edgesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EdgesScalarFieldEnum | EdgesScalarFieldEnum[]
  }

  /**
   * nodes without action
   */
  export type nodesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nodes
     */
    select?: nodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nodes
     */
    omit?: nodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nodesInclude<ExtArgs> | null
  }


  /**
   * Model edges
   */

  export type AggregateEdges = {
    _count: EdgesCountAggregateOutputType | null
    _avg: EdgesAvgAggregateOutputType | null
    _sum: EdgesSumAggregateOutputType | null
    _min: EdgesMinAggregateOutputType | null
    _max: EdgesMaxAggregateOutputType | null
  }

  export type EdgesAvgAggregateOutputType = {
    id: number | null
    sourceId: number | null
    targetId: number | null
    weight: number | null
  }

  export type EdgesSumAggregateOutputType = {
    id: number | null
    sourceId: number | null
    targetId: number | null
    weight: number | null
  }

  export type EdgesMinAggregateOutputType = {
    id: number | null
    sourceId: number | null
    targetId: number | null
    weight: number | null
  }

  export type EdgesMaxAggregateOutputType = {
    id: number | null
    sourceId: number | null
    targetId: number | null
    weight: number | null
  }

  export type EdgesCountAggregateOutputType = {
    id: number
    sourceId: number
    targetId: number
    weight: number
    _all: number
  }


  export type EdgesAvgAggregateInputType = {
    id?: true
    sourceId?: true
    targetId?: true
    weight?: true
  }

  export type EdgesSumAggregateInputType = {
    id?: true
    sourceId?: true
    targetId?: true
    weight?: true
  }

  export type EdgesMinAggregateInputType = {
    id?: true
    sourceId?: true
    targetId?: true
    weight?: true
  }

  export type EdgesMaxAggregateInputType = {
    id?: true
    sourceId?: true
    targetId?: true
    weight?: true
  }

  export type EdgesCountAggregateInputType = {
    id?: true
    sourceId?: true
    targetId?: true
    weight?: true
    _all?: true
  }

  export type EdgesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which edges to aggregate.
     */
    where?: edgesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of edges to fetch.
     */
    orderBy?: edgesOrderByWithRelationInput | edgesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: edgesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` edges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` edges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned edges
    **/
    _count?: true | EdgesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EdgesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EdgesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EdgesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EdgesMaxAggregateInputType
  }

  export type GetEdgesAggregateType<T extends EdgesAggregateArgs> = {
        [P in keyof T & keyof AggregateEdges]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEdges[P]>
      : GetScalarType<T[P], AggregateEdges[P]>
  }




  export type edgesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: edgesWhereInput
    orderBy?: edgesOrderByWithAggregationInput | edgesOrderByWithAggregationInput[]
    by: EdgesScalarFieldEnum[] | EdgesScalarFieldEnum
    having?: edgesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EdgesCountAggregateInputType | true
    _avg?: EdgesAvgAggregateInputType
    _sum?: EdgesSumAggregateInputType
    _min?: EdgesMinAggregateInputType
    _max?: EdgesMaxAggregateInputType
  }

  export type EdgesGroupByOutputType = {
    id: number
    sourceId: number
    targetId: number
    weight: number
    _count: EdgesCountAggregateOutputType | null
    _avg: EdgesAvgAggregateOutputType | null
    _sum: EdgesSumAggregateOutputType | null
    _min: EdgesMinAggregateOutputType | null
    _max: EdgesMaxAggregateOutputType | null
  }

  type GetEdgesGroupByPayload<T extends edgesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EdgesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EdgesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EdgesGroupByOutputType[P]>
            : GetScalarType<T[P], EdgesGroupByOutputType[P]>
        }
      >
    >


  export type edgesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sourceId?: boolean
    targetId?: boolean
    weight?: boolean
    sourceNode?: boolean | nodesDefaultArgs<ExtArgs>
    targetNode?: boolean | nodesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["edges"]>

  export type edgesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sourceId?: boolean
    targetId?: boolean
    weight?: boolean
    sourceNode?: boolean | nodesDefaultArgs<ExtArgs>
    targetNode?: boolean | nodesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["edges"]>

  export type edgesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sourceId?: boolean
    targetId?: boolean
    weight?: boolean
    sourceNode?: boolean | nodesDefaultArgs<ExtArgs>
    targetNode?: boolean | nodesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["edges"]>

  export type edgesSelectScalar = {
    id?: boolean
    sourceId?: boolean
    targetId?: boolean
    weight?: boolean
  }

  export type edgesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sourceId" | "targetId" | "weight", ExtArgs["result"]["edges"]>
  export type edgesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sourceNode?: boolean | nodesDefaultArgs<ExtArgs>
    targetNode?: boolean | nodesDefaultArgs<ExtArgs>
  }
  export type edgesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sourceNode?: boolean | nodesDefaultArgs<ExtArgs>
    targetNode?: boolean | nodesDefaultArgs<ExtArgs>
  }
  export type edgesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sourceNode?: boolean | nodesDefaultArgs<ExtArgs>
    targetNode?: boolean | nodesDefaultArgs<ExtArgs>
  }

  export type $edgesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "edges"
    objects: {
      sourceNode: Prisma.$nodesPayload<ExtArgs>
      targetNode: Prisma.$nodesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      sourceId: number
      targetId: number
      weight: number
    }, ExtArgs["result"]["edges"]>
    composites: {}
  }

  type edgesGetPayload<S extends boolean | null | undefined | edgesDefaultArgs> = $Result.GetResult<Prisma.$edgesPayload, S>

  type edgesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<edgesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EdgesCountAggregateInputType | true
    }

  export interface edgesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['edges'], meta: { name: 'edges' } }
    /**
     * Find zero or one Edges that matches the filter.
     * @param {edgesFindUniqueArgs} args - Arguments to find a Edges
     * @example
     * // Get one Edges
     * const edges = await prisma.edges.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends edgesFindUniqueArgs>(args: SelectSubset<T, edgesFindUniqueArgs<ExtArgs>>): Prisma__edgesClient<$Result.GetResult<Prisma.$edgesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Edges that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {edgesFindUniqueOrThrowArgs} args - Arguments to find a Edges
     * @example
     * // Get one Edges
     * const edges = await prisma.edges.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends edgesFindUniqueOrThrowArgs>(args: SelectSubset<T, edgesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__edgesClient<$Result.GetResult<Prisma.$edgesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Edges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {edgesFindFirstArgs} args - Arguments to find a Edges
     * @example
     * // Get one Edges
     * const edges = await prisma.edges.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends edgesFindFirstArgs>(args?: SelectSubset<T, edgesFindFirstArgs<ExtArgs>>): Prisma__edgesClient<$Result.GetResult<Prisma.$edgesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Edges that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {edgesFindFirstOrThrowArgs} args - Arguments to find a Edges
     * @example
     * // Get one Edges
     * const edges = await prisma.edges.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends edgesFindFirstOrThrowArgs>(args?: SelectSubset<T, edgesFindFirstOrThrowArgs<ExtArgs>>): Prisma__edgesClient<$Result.GetResult<Prisma.$edgesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Edges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {edgesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Edges
     * const edges = await prisma.edges.findMany()
     * 
     * // Get first 10 Edges
     * const edges = await prisma.edges.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const edgesWithIdOnly = await prisma.edges.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends edgesFindManyArgs>(args?: SelectSubset<T, edgesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$edgesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Edges.
     * @param {edgesCreateArgs} args - Arguments to create a Edges.
     * @example
     * // Create one Edges
     * const Edges = await prisma.edges.create({
     *   data: {
     *     // ... data to create a Edges
     *   }
     * })
     * 
     */
    create<T extends edgesCreateArgs>(args: SelectSubset<T, edgesCreateArgs<ExtArgs>>): Prisma__edgesClient<$Result.GetResult<Prisma.$edgesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Edges.
     * @param {edgesCreateManyArgs} args - Arguments to create many Edges.
     * @example
     * // Create many Edges
     * const edges = await prisma.edges.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends edgesCreateManyArgs>(args?: SelectSubset<T, edgesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Edges and returns the data saved in the database.
     * @param {edgesCreateManyAndReturnArgs} args - Arguments to create many Edges.
     * @example
     * // Create many Edges
     * const edges = await prisma.edges.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Edges and only return the `id`
     * const edgesWithIdOnly = await prisma.edges.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends edgesCreateManyAndReturnArgs>(args?: SelectSubset<T, edgesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$edgesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Edges.
     * @param {edgesDeleteArgs} args - Arguments to delete one Edges.
     * @example
     * // Delete one Edges
     * const Edges = await prisma.edges.delete({
     *   where: {
     *     // ... filter to delete one Edges
     *   }
     * })
     * 
     */
    delete<T extends edgesDeleteArgs>(args: SelectSubset<T, edgesDeleteArgs<ExtArgs>>): Prisma__edgesClient<$Result.GetResult<Prisma.$edgesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Edges.
     * @param {edgesUpdateArgs} args - Arguments to update one Edges.
     * @example
     * // Update one Edges
     * const edges = await prisma.edges.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends edgesUpdateArgs>(args: SelectSubset<T, edgesUpdateArgs<ExtArgs>>): Prisma__edgesClient<$Result.GetResult<Prisma.$edgesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Edges.
     * @param {edgesDeleteManyArgs} args - Arguments to filter Edges to delete.
     * @example
     * // Delete a few Edges
     * const { count } = await prisma.edges.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends edgesDeleteManyArgs>(args?: SelectSubset<T, edgesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Edges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {edgesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Edges
     * const edges = await prisma.edges.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends edgesUpdateManyArgs>(args: SelectSubset<T, edgesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Edges and returns the data updated in the database.
     * @param {edgesUpdateManyAndReturnArgs} args - Arguments to update many Edges.
     * @example
     * // Update many Edges
     * const edges = await prisma.edges.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Edges and only return the `id`
     * const edgesWithIdOnly = await prisma.edges.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends edgesUpdateManyAndReturnArgs>(args: SelectSubset<T, edgesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$edgesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Edges.
     * @param {edgesUpsertArgs} args - Arguments to update or create a Edges.
     * @example
     * // Update or create a Edges
     * const edges = await prisma.edges.upsert({
     *   create: {
     *     // ... data to create a Edges
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Edges we want to update
     *   }
     * })
     */
    upsert<T extends edgesUpsertArgs>(args: SelectSubset<T, edgesUpsertArgs<ExtArgs>>): Prisma__edgesClient<$Result.GetResult<Prisma.$edgesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Edges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {edgesCountArgs} args - Arguments to filter Edges to count.
     * @example
     * // Count the number of Edges
     * const count = await prisma.edges.count({
     *   where: {
     *     // ... the filter for the Edges we want to count
     *   }
     * })
    **/
    count<T extends edgesCountArgs>(
      args?: Subset<T, edgesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EdgesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Edges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EdgesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EdgesAggregateArgs>(args: Subset<T, EdgesAggregateArgs>): Prisma.PrismaPromise<GetEdgesAggregateType<T>>

    /**
     * Group by Edges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {edgesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends edgesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: edgesGroupByArgs['orderBy'] }
        : { orderBy?: edgesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, edgesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEdgesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the edges model
   */
  readonly fields: edgesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for edges.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__edgesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sourceNode<T extends nodesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, nodesDefaultArgs<ExtArgs>>): Prisma__nodesClient<$Result.GetResult<Prisma.$nodesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    targetNode<T extends nodesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, nodesDefaultArgs<ExtArgs>>): Prisma__nodesClient<$Result.GetResult<Prisma.$nodesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the edges model
   */
  interface edgesFieldRefs {
    readonly id: FieldRef<"edges", 'Int'>
    readonly sourceId: FieldRef<"edges", 'Int'>
    readonly targetId: FieldRef<"edges", 'Int'>
    readonly weight: FieldRef<"edges", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * edges findUnique
   */
  export type edgesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the edges
     */
    select?: edgesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the edges
     */
    omit?: edgesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: edgesInclude<ExtArgs> | null
    /**
     * Filter, which edges to fetch.
     */
    where: edgesWhereUniqueInput
  }

  /**
   * edges findUniqueOrThrow
   */
  export type edgesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the edges
     */
    select?: edgesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the edges
     */
    omit?: edgesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: edgesInclude<ExtArgs> | null
    /**
     * Filter, which edges to fetch.
     */
    where: edgesWhereUniqueInput
  }

  /**
   * edges findFirst
   */
  export type edgesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the edges
     */
    select?: edgesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the edges
     */
    omit?: edgesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: edgesInclude<ExtArgs> | null
    /**
     * Filter, which edges to fetch.
     */
    where?: edgesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of edges to fetch.
     */
    orderBy?: edgesOrderByWithRelationInput | edgesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for edges.
     */
    cursor?: edgesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` edges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` edges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of edges.
     */
    distinct?: EdgesScalarFieldEnum | EdgesScalarFieldEnum[]
  }

  /**
   * edges findFirstOrThrow
   */
  export type edgesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the edges
     */
    select?: edgesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the edges
     */
    omit?: edgesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: edgesInclude<ExtArgs> | null
    /**
     * Filter, which edges to fetch.
     */
    where?: edgesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of edges to fetch.
     */
    orderBy?: edgesOrderByWithRelationInput | edgesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for edges.
     */
    cursor?: edgesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` edges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` edges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of edges.
     */
    distinct?: EdgesScalarFieldEnum | EdgesScalarFieldEnum[]
  }

  /**
   * edges findMany
   */
  export type edgesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the edges
     */
    select?: edgesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the edges
     */
    omit?: edgesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: edgesInclude<ExtArgs> | null
    /**
     * Filter, which edges to fetch.
     */
    where?: edgesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of edges to fetch.
     */
    orderBy?: edgesOrderByWithRelationInput | edgesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing edges.
     */
    cursor?: edgesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` edges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` edges.
     */
    skip?: number
    distinct?: EdgesScalarFieldEnum | EdgesScalarFieldEnum[]
  }

  /**
   * edges create
   */
  export type edgesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the edges
     */
    select?: edgesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the edges
     */
    omit?: edgesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: edgesInclude<ExtArgs> | null
    /**
     * The data needed to create a edges.
     */
    data: XOR<edgesCreateInput, edgesUncheckedCreateInput>
  }

  /**
   * edges createMany
   */
  export type edgesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many edges.
     */
    data: edgesCreateManyInput | edgesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * edges createManyAndReturn
   */
  export type edgesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the edges
     */
    select?: edgesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the edges
     */
    omit?: edgesOmit<ExtArgs> | null
    /**
     * The data used to create many edges.
     */
    data: edgesCreateManyInput | edgesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: edgesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * edges update
   */
  export type edgesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the edges
     */
    select?: edgesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the edges
     */
    omit?: edgesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: edgesInclude<ExtArgs> | null
    /**
     * The data needed to update a edges.
     */
    data: XOR<edgesUpdateInput, edgesUncheckedUpdateInput>
    /**
     * Choose, which edges to update.
     */
    where: edgesWhereUniqueInput
  }

  /**
   * edges updateMany
   */
  export type edgesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update edges.
     */
    data: XOR<edgesUpdateManyMutationInput, edgesUncheckedUpdateManyInput>
    /**
     * Filter which edges to update
     */
    where?: edgesWhereInput
    /**
     * Limit how many edges to update.
     */
    limit?: number
  }

  /**
   * edges updateManyAndReturn
   */
  export type edgesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the edges
     */
    select?: edgesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the edges
     */
    omit?: edgesOmit<ExtArgs> | null
    /**
     * The data used to update edges.
     */
    data: XOR<edgesUpdateManyMutationInput, edgesUncheckedUpdateManyInput>
    /**
     * Filter which edges to update
     */
    where?: edgesWhereInput
    /**
     * Limit how many edges to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: edgesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * edges upsert
   */
  export type edgesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the edges
     */
    select?: edgesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the edges
     */
    omit?: edgesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: edgesInclude<ExtArgs> | null
    /**
     * The filter to search for the edges to update in case it exists.
     */
    where: edgesWhereUniqueInput
    /**
     * In case the edges found by the `where` argument doesn't exist, create a new edges with this data.
     */
    create: XOR<edgesCreateInput, edgesUncheckedCreateInput>
    /**
     * In case the edges was found with the provided `where` argument, update it with this data.
     */
    update: XOR<edgesUpdateInput, edgesUncheckedUpdateInput>
  }

  /**
   * edges delete
   */
  export type edgesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the edges
     */
    select?: edgesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the edges
     */
    omit?: edgesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: edgesInclude<ExtArgs> | null
    /**
     * Filter which edges to delete.
     */
    where: edgesWhereUniqueInput
  }

  /**
   * edges deleteMany
   */
  export type edgesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which edges to delete
     */
    where?: edgesWhereInput
    /**
     * Limit how many edges to delete.
     */
    limit?: number
  }

  /**
   * edges without action
   */
  export type edgesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the edges
     */
    select?: edgesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the edges
     */
    omit?: edgesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: edgesInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const EmployeeScalarFieldEnum: {
    id: 'id',
    employee_name: 'employee_name',
    created_at: 'created_at'
  };

  export type EmployeeScalarFieldEnum = (typeof EmployeeScalarFieldEnum)[keyof typeof EmployeeScalarFieldEnum]


  export const Service_requestScalarFieldEnum: {
    request_id: 'request_id',
    name: 'name',
    employee_id: 'employee_id',
    priority: 'priority',
    location: 'location',
    department: 'department',
    status: 'status',
    request_type: 'request_type',
    request_date: 'request_date',
    additional_comments: 'additional_comments',
    assigned_employee: 'assigned_employee'
  };

  export type Service_requestScalarFieldEnum = (typeof Service_requestScalarFieldEnum)[keyof typeof Service_requestScalarFieldEnum]


  export const SanitationScalarFieldEnum: {
    request_id: 'request_id',
    cleaningType: 'cleaningType',
    contaminant: 'contaminant',
    sanitationId: 'sanitationId'
  };

  export type SanitationScalarFieldEnum = (typeof SanitationScalarFieldEnum)[keyof typeof SanitationScalarFieldEnum]


  export const LanguageScalarFieldEnum: {
    request_id: 'request_id',
    sourceLanguage: 'sourceLanguage',
    targetLanguage: 'targetLanguage',
    languageId: 'languageId'
  };

  export type LanguageScalarFieldEnum = (typeof LanguageScalarFieldEnum)[keyof typeof LanguageScalarFieldEnum]


  export const TransportationScalarFieldEnum: {
    request_id: 'request_id',
    transportationType: 'transportationType',
    transportationDestination: 'transportationDestination',
    transportationId: 'transportationId'
  };

  export type TransportationScalarFieldEnum = (typeof TransportationScalarFieldEnum)[keyof typeof TransportationScalarFieldEnum]


  export const AudioVisualScalarFieldEnum: {
    request_id: 'request_id',
    accommodationType: 'accommodationType',
    accommodationDetails: 'accommodationDetails',
    audioVisualId: 'audioVisualId'
  };

  export type AudioVisualScalarFieldEnum = (typeof AudioVisualScalarFieldEnum)[keyof typeof AudioVisualScalarFieldEnum]


  export const SecurityScalarFieldEnum: {
    request_id: 'request_id',
    accessZones: 'accessZones',
    securityIssue: 'securityIssue',
    securityId: 'securityId'
  };

  export type SecurityScalarFieldEnum = (typeof SecurityScalarFieldEnum)[keyof typeof SecurityScalarFieldEnum]


  export const MedicalDeviceScalarFieldEnum: {
    request_id: 'request_id',
    device: 'device',
    operatorRequired: 'operatorRequired',
    medicalDeviceId: 'medicalDeviceId'
  };

  export type MedicalDeviceScalarFieldEnum = (typeof MedicalDeviceScalarFieldEnum)[keyof typeof MedicalDeviceScalarFieldEnum]


  export const FacilitiesScalarFieldEnum: {
    request_id: 'request_id',
    maintenanceType: 'maintenanceType',
    equipmentType: 'equipmentType',
    facilitiesID: 'facilitiesID'
  };

  export type FacilitiesScalarFieldEnum = (typeof FacilitiesScalarFieldEnum)[keyof typeof FacilitiesScalarFieldEnum]


  export const DirectoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    services: 'services',
    location: 'location',
    telephone: 'telephone'
  };

  export type DirectoryScalarFieldEnum = (typeof DirectoryScalarFieldEnum)[keyof typeof DirectoryScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    first_name: 'first_name',
    last_name: 'last_name',
    email: 'email',
    password: 'password'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const NodesScalarFieldEnum: {
    id: 'id',
    building: 'building',
    floor: 'floor',
    name: 'name',
    x: 'x',
    y: 'y',
    edgeCost: 'edgeCost',
    totalCost: 'totalCost'
  };

  export type NodesScalarFieldEnum = (typeof NodesScalarFieldEnum)[keyof typeof NodesScalarFieldEnum]


  export const EdgesScalarFieldEnum: {
    id: 'id',
    sourceId: 'sourceId',
    targetId: 'targetId',
    weight: 'weight'
  };

  export type EdgesScalarFieldEnum = (typeof EdgesScalarFieldEnum)[keyof typeof EdgesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type employeeWhereInput = {
    AND?: employeeWhereInput | employeeWhereInput[]
    OR?: employeeWhereInput[]
    NOT?: employeeWhereInput | employeeWhereInput[]
    id?: StringFilter<"employee"> | string
    employee_name?: StringFilter<"employee"> | string
    created_at?: DateTimeFilter<"employee"> | Date | string
    requests?: Service_requestListRelationFilter
  }

  export type employeeOrderByWithRelationInput = {
    id?: SortOrder
    employee_name?: SortOrder
    created_at?: SortOrder
    requests?: service_requestOrderByRelationAggregateInput
  }

  export type employeeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: employeeWhereInput | employeeWhereInput[]
    OR?: employeeWhereInput[]
    NOT?: employeeWhereInput | employeeWhereInput[]
    employee_name?: StringFilter<"employee"> | string
    created_at?: DateTimeFilter<"employee"> | Date | string
    requests?: Service_requestListRelationFilter
  }, "id">

  export type employeeOrderByWithAggregationInput = {
    id?: SortOrder
    employee_name?: SortOrder
    created_at?: SortOrder
    _count?: employeeCountOrderByAggregateInput
    _max?: employeeMaxOrderByAggregateInput
    _min?: employeeMinOrderByAggregateInput
  }

  export type employeeScalarWhereWithAggregatesInput = {
    AND?: employeeScalarWhereWithAggregatesInput | employeeScalarWhereWithAggregatesInput[]
    OR?: employeeScalarWhereWithAggregatesInput[]
    NOT?: employeeScalarWhereWithAggregatesInput | employeeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"employee"> | string
    employee_name?: StringWithAggregatesFilter<"employee"> | string
    created_at?: DateTimeWithAggregatesFilter<"employee"> | Date | string
  }

  export type service_requestWhereInput = {
    AND?: service_requestWhereInput | service_requestWhereInput[]
    OR?: service_requestWhereInput[]
    NOT?: service_requestWhereInput | service_requestWhereInput[]
    request_id?: IntFilter<"service_request"> | number
    name?: StringFilter<"service_request"> | string
    employee_id?: StringFilter<"service_request"> | string
    priority?: StringFilter<"service_request"> | string
    location?: StringFilter<"service_request"> | string
    department?: StringFilter<"service_request"> | string
    status?: StringFilter<"service_request"> | string
    request_type?: StringFilter<"service_request"> | string
    request_date?: DateTimeFilter<"service_request"> | Date | string
    additional_comments?: StringNullableFilter<"service_request"> | string | null
    assigned_employee?: StringNullableFilter<"service_request"> | string | null
    employee?: XOR<EmployeeNullableScalarRelationFilter, employeeWhereInput> | null
    sanitation?: XOR<SanitationNullableScalarRelationFilter, SanitationWhereInput> | null
    language?: XOR<LanguageNullableScalarRelationFilter, LanguageWhereInput> | null
    audioVisual?: XOR<AudioVisualNullableScalarRelationFilter, AudioVisualWhereInput> | null
    security?: XOR<SecurityNullableScalarRelationFilter, SecurityWhereInput> | null
    transportation?: XOR<TransportationNullableScalarRelationFilter, TransportationWhereInput> | null
    medicalDevice?: XOR<MedicalDeviceNullableScalarRelationFilter, MedicalDeviceWhereInput> | null
    facilities?: XOR<FacilitiesNullableScalarRelationFilter, FacilitiesWhereInput> | null
  }

  export type service_requestOrderByWithRelationInput = {
    request_id?: SortOrder
    name?: SortOrder
    employee_id?: SortOrder
    priority?: SortOrder
    location?: SortOrder
    department?: SortOrder
    status?: SortOrder
    request_type?: SortOrder
    request_date?: SortOrder
    additional_comments?: SortOrderInput | SortOrder
    assigned_employee?: SortOrderInput | SortOrder
    employee?: employeeOrderByWithRelationInput
    sanitation?: SanitationOrderByWithRelationInput
    language?: LanguageOrderByWithRelationInput
    audioVisual?: AudioVisualOrderByWithRelationInput
    security?: SecurityOrderByWithRelationInput
    transportation?: TransportationOrderByWithRelationInput
    medicalDevice?: MedicalDeviceOrderByWithRelationInput
    facilities?: FacilitiesOrderByWithRelationInput
  }

  export type service_requestWhereUniqueInput = Prisma.AtLeast<{
    request_id?: number
    AND?: service_requestWhereInput | service_requestWhereInput[]
    OR?: service_requestWhereInput[]
    NOT?: service_requestWhereInput | service_requestWhereInput[]
    name?: StringFilter<"service_request"> | string
    employee_id?: StringFilter<"service_request"> | string
    priority?: StringFilter<"service_request"> | string
    location?: StringFilter<"service_request"> | string
    department?: StringFilter<"service_request"> | string
    status?: StringFilter<"service_request"> | string
    request_type?: StringFilter<"service_request"> | string
    request_date?: DateTimeFilter<"service_request"> | Date | string
    additional_comments?: StringNullableFilter<"service_request"> | string | null
    assigned_employee?: StringNullableFilter<"service_request"> | string | null
    employee?: XOR<EmployeeNullableScalarRelationFilter, employeeWhereInput> | null
    sanitation?: XOR<SanitationNullableScalarRelationFilter, SanitationWhereInput> | null
    language?: XOR<LanguageNullableScalarRelationFilter, LanguageWhereInput> | null
    audioVisual?: XOR<AudioVisualNullableScalarRelationFilter, AudioVisualWhereInput> | null
    security?: XOR<SecurityNullableScalarRelationFilter, SecurityWhereInput> | null
    transportation?: XOR<TransportationNullableScalarRelationFilter, TransportationWhereInput> | null
    medicalDevice?: XOR<MedicalDeviceNullableScalarRelationFilter, MedicalDeviceWhereInput> | null
    facilities?: XOR<FacilitiesNullableScalarRelationFilter, FacilitiesWhereInput> | null
  }, "request_id">

  export type service_requestOrderByWithAggregationInput = {
    request_id?: SortOrder
    name?: SortOrder
    employee_id?: SortOrder
    priority?: SortOrder
    location?: SortOrder
    department?: SortOrder
    status?: SortOrder
    request_type?: SortOrder
    request_date?: SortOrder
    additional_comments?: SortOrderInput | SortOrder
    assigned_employee?: SortOrderInput | SortOrder
    _count?: service_requestCountOrderByAggregateInput
    _avg?: service_requestAvgOrderByAggregateInput
    _max?: service_requestMaxOrderByAggregateInput
    _min?: service_requestMinOrderByAggregateInput
    _sum?: service_requestSumOrderByAggregateInput
  }

  export type service_requestScalarWhereWithAggregatesInput = {
    AND?: service_requestScalarWhereWithAggregatesInput | service_requestScalarWhereWithAggregatesInput[]
    OR?: service_requestScalarWhereWithAggregatesInput[]
    NOT?: service_requestScalarWhereWithAggregatesInput | service_requestScalarWhereWithAggregatesInput[]
    request_id?: IntWithAggregatesFilter<"service_request"> | number
    name?: StringWithAggregatesFilter<"service_request"> | string
    employee_id?: StringWithAggregatesFilter<"service_request"> | string
    priority?: StringWithAggregatesFilter<"service_request"> | string
    location?: StringWithAggregatesFilter<"service_request"> | string
    department?: StringWithAggregatesFilter<"service_request"> | string
    status?: StringWithAggregatesFilter<"service_request"> | string
    request_type?: StringWithAggregatesFilter<"service_request"> | string
    request_date?: DateTimeWithAggregatesFilter<"service_request"> | Date | string
    additional_comments?: StringNullableWithAggregatesFilter<"service_request"> | string | null
    assigned_employee?: StringNullableWithAggregatesFilter<"service_request"> | string | null
  }

  export type SanitationWhereInput = {
    AND?: SanitationWhereInput | SanitationWhereInput[]
    OR?: SanitationWhereInput[]
    NOT?: SanitationWhereInput | SanitationWhereInput[]
    request_id?: IntFilter<"Sanitation"> | number
    cleaningType?: StringFilter<"Sanitation"> | string
    contaminant?: StringNullableFilter<"Sanitation"> | string | null
    sanitationId?: IntFilter<"Sanitation"> | number
    service_request?: XOR<Service_requestScalarRelationFilter, service_requestWhereInput>
  }

  export type SanitationOrderByWithRelationInput = {
    request_id?: SortOrder
    cleaningType?: SortOrder
    contaminant?: SortOrderInput | SortOrder
    sanitationId?: SortOrder
    service_request?: service_requestOrderByWithRelationInput
  }

  export type SanitationWhereUniqueInput = Prisma.AtLeast<{
    request_id?: number
    sanitationId?: number
    AND?: SanitationWhereInput | SanitationWhereInput[]
    OR?: SanitationWhereInput[]
    NOT?: SanitationWhereInput | SanitationWhereInput[]
    cleaningType?: StringFilter<"Sanitation"> | string
    contaminant?: StringNullableFilter<"Sanitation"> | string | null
    service_request?: XOR<Service_requestScalarRelationFilter, service_requestWhereInput>
  }, "request_id" | "sanitationId">

  export type SanitationOrderByWithAggregationInput = {
    request_id?: SortOrder
    cleaningType?: SortOrder
    contaminant?: SortOrderInput | SortOrder
    sanitationId?: SortOrder
    _count?: SanitationCountOrderByAggregateInput
    _avg?: SanitationAvgOrderByAggregateInput
    _max?: SanitationMaxOrderByAggregateInput
    _min?: SanitationMinOrderByAggregateInput
    _sum?: SanitationSumOrderByAggregateInput
  }

  export type SanitationScalarWhereWithAggregatesInput = {
    AND?: SanitationScalarWhereWithAggregatesInput | SanitationScalarWhereWithAggregatesInput[]
    OR?: SanitationScalarWhereWithAggregatesInput[]
    NOT?: SanitationScalarWhereWithAggregatesInput | SanitationScalarWhereWithAggregatesInput[]
    request_id?: IntWithAggregatesFilter<"Sanitation"> | number
    cleaningType?: StringWithAggregatesFilter<"Sanitation"> | string
    contaminant?: StringNullableWithAggregatesFilter<"Sanitation"> | string | null
    sanitationId?: IntWithAggregatesFilter<"Sanitation"> | number
  }

  export type LanguageWhereInput = {
    AND?: LanguageWhereInput | LanguageWhereInput[]
    OR?: LanguageWhereInput[]
    NOT?: LanguageWhereInput | LanguageWhereInput[]
    request_id?: IntFilter<"Language"> | number
    sourceLanguage?: StringFilter<"Language"> | string
    targetLanguage?: StringFilter<"Language"> | string
    languageId?: IntFilter<"Language"> | number
    service_request?: XOR<Service_requestScalarRelationFilter, service_requestWhereInput>
  }

  export type LanguageOrderByWithRelationInput = {
    request_id?: SortOrder
    sourceLanguage?: SortOrder
    targetLanguage?: SortOrder
    languageId?: SortOrder
    service_request?: service_requestOrderByWithRelationInput
  }

  export type LanguageWhereUniqueInput = Prisma.AtLeast<{
    request_id?: number
    languageId?: number
    AND?: LanguageWhereInput | LanguageWhereInput[]
    OR?: LanguageWhereInput[]
    NOT?: LanguageWhereInput | LanguageWhereInput[]
    sourceLanguage?: StringFilter<"Language"> | string
    targetLanguage?: StringFilter<"Language"> | string
    service_request?: XOR<Service_requestScalarRelationFilter, service_requestWhereInput>
  }, "request_id" | "languageId">

  export type LanguageOrderByWithAggregationInput = {
    request_id?: SortOrder
    sourceLanguage?: SortOrder
    targetLanguage?: SortOrder
    languageId?: SortOrder
    _count?: LanguageCountOrderByAggregateInput
    _avg?: LanguageAvgOrderByAggregateInput
    _max?: LanguageMaxOrderByAggregateInput
    _min?: LanguageMinOrderByAggregateInput
    _sum?: LanguageSumOrderByAggregateInput
  }

  export type LanguageScalarWhereWithAggregatesInput = {
    AND?: LanguageScalarWhereWithAggregatesInput | LanguageScalarWhereWithAggregatesInput[]
    OR?: LanguageScalarWhereWithAggregatesInput[]
    NOT?: LanguageScalarWhereWithAggregatesInput | LanguageScalarWhereWithAggregatesInput[]
    request_id?: IntWithAggregatesFilter<"Language"> | number
    sourceLanguage?: StringWithAggregatesFilter<"Language"> | string
    targetLanguage?: StringWithAggregatesFilter<"Language"> | string
    languageId?: IntWithAggregatesFilter<"Language"> | number
  }

  export type TransportationWhereInput = {
    AND?: TransportationWhereInput | TransportationWhereInput[]
    OR?: TransportationWhereInput[]
    NOT?: TransportationWhereInput | TransportationWhereInput[]
    request_id?: IntFilter<"Transportation"> | number
    transportationType?: StringFilter<"Transportation"> | string
    transportationDestination?: StringFilter<"Transportation"> | string
    transportationId?: IntFilter<"Transportation"> | number
    service_request?: XOR<Service_requestScalarRelationFilter, service_requestWhereInput>
  }

  export type TransportationOrderByWithRelationInput = {
    request_id?: SortOrder
    transportationType?: SortOrder
    transportationDestination?: SortOrder
    transportationId?: SortOrder
    service_request?: service_requestOrderByWithRelationInput
  }

  export type TransportationWhereUniqueInput = Prisma.AtLeast<{
    request_id?: number
    transportationId?: number
    AND?: TransportationWhereInput | TransportationWhereInput[]
    OR?: TransportationWhereInput[]
    NOT?: TransportationWhereInput | TransportationWhereInput[]
    transportationType?: StringFilter<"Transportation"> | string
    transportationDestination?: StringFilter<"Transportation"> | string
    service_request?: XOR<Service_requestScalarRelationFilter, service_requestWhereInput>
  }, "request_id" | "transportationId">

  export type TransportationOrderByWithAggregationInput = {
    request_id?: SortOrder
    transportationType?: SortOrder
    transportationDestination?: SortOrder
    transportationId?: SortOrder
    _count?: TransportationCountOrderByAggregateInput
    _avg?: TransportationAvgOrderByAggregateInput
    _max?: TransportationMaxOrderByAggregateInput
    _min?: TransportationMinOrderByAggregateInput
    _sum?: TransportationSumOrderByAggregateInput
  }

  export type TransportationScalarWhereWithAggregatesInput = {
    AND?: TransportationScalarWhereWithAggregatesInput | TransportationScalarWhereWithAggregatesInput[]
    OR?: TransportationScalarWhereWithAggregatesInput[]
    NOT?: TransportationScalarWhereWithAggregatesInput | TransportationScalarWhereWithAggregatesInput[]
    request_id?: IntWithAggregatesFilter<"Transportation"> | number
    transportationType?: StringWithAggregatesFilter<"Transportation"> | string
    transportationDestination?: StringWithAggregatesFilter<"Transportation"> | string
    transportationId?: IntWithAggregatesFilter<"Transportation"> | number
  }

  export type AudioVisualWhereInput = {
    AND?: AudioVisualWhereInput | AudioVisualWhereInput[]
    OR?: AudioVisualWhereInput[]
    NOT?: AudioVisualWhereInput | AudioVisualWhereInput[]
    request_id?: IntFilter<"AudioVisual"> | number
    accommodationType?: StringFilter<"AudioVisual"> | string
    accommodationDetails?: StringNullableFilter<"AudioVisual"> | string | null
    audioVisualId?: IntFilter<"AudioVisual"> | number
    service_request?: XOR<Service_requestScalarRelationFilter, service_requestWhereInput>
  }

  export type AudioVisualOrderByWithRelationInput = {
    request_id?: SortOrder
    accommodationType?: SortOrder
    accommodationDetails?: SortOrderInput | SortOrder
    audioVisualId?: SortOrder
    service_request?: service_requestOrderByWithRelationInput
  }

  export type AudioVisualWhereUniqueInput = Prisma.AtLeast<{
    request_id?: number
    audioVisualId?: number
    AND?: AudioVisualWhereInput | AudioVisualWhereInput[]
    OR?: AudioVisualWhereInput[]
    NOT?: AudioVisualWhereInput | AudioVisualWhereInput[]
    accommodationType?: StringFilter<"AudioVisual"> | string
    accommodationDetails?: StringNullableFilter<"AudioVisual"> | string | null
    service_request?: XOR<Service_requestScalarRelationFilter, service_requestWhereInput>
  }, "request_id" | "audioVisualId">

  export type AudioVisualOrderByWithAggregationInput = {
    request_id?: SortOrder
    accommodationType?: SortOrder
    accommodationDetails?: SortOrderInput | SortOrder
    audioVisualId?: SortOrder
    _count?: AudioVisualCountOrderByAggregateInput
    _avg?: AudioVisualAvgOrderByAggregateInput
    _max?: AudioVisualMaxOrderByAggregateInput
    _min?: AudioVisualMinOrderByAggregateInput
    _sum?: AudioVisualSumOrderByAggregateInput
  }

  export type AudioVisualScalarWhereWithAggregatesInput = {
    AND?: AudioVisualScalarWhereWithAggregatesInput | AudioVisualScalarWhereWithAggregatesInput[]
    OR?: AudioVisualScalarWhereWithAggregatesInput[]
    NOT?: AudioVisualScalarWhereWithAggregatesInput | AudioVisualScalarWhereWithAggregatesInput[]
    request_id?: IntWithAggregatesFilter<"AudioVisual"> | number
    accommodationType?: StringWithAggregatesFilter<"AudioVisual"> | string
    accommodationDetails?: StringNullableWithAggregatesFilter<"AudioVisual"> | string | null
    audioVisualId?: IntWithAggregatesFilter<"AudioVisual"> | number
  }

  export type SecurityWhereInput = {
    AND?: SecurityWhereInput | SecurityWhereInput[]
    OR?: SecurityWhereInput[]
    NOT?: SecurityWhereInput | SecurityWhereInput[]
    request_id?: IntFilter<"Security"> | number
    accessZones?: StringFilter<"Security"> | string
    securityIssue?: StringFilter<"Security"> | string
    securityId?: IntFilter<"Security"> | number
    service_request?: XOR<Service_requestScalarRelationFilter, service_requestWhereInput>
  }

  export type SecurityOrderByWithRelationInput = {
    request_id?: SortOrder
    accessZones?: SortOrder
    securityIssue?: SortOrder
    securityId?: SortOrder
    service_request?: service_requestOrderByWithRelationInput
  }

  export type SecurityWhereUniqueInput = Prisma.AtLeast<{
    request_id?: number
    securityId?: number
    AND?: SecurityWhereInput | SecurityWhereInput[]
    OR?: SecurityWhereInput[]
    NOT?: SecurityWhereInput | SecurityWhereInput[]
    accessZones?: StringFilter<"Security"> | string
    securityIssue?: StringFilter<"Security"> | string
    service_request?: XOR<Service_requestScalarRelationFilter, service_requestWhereInput>
  }, "request_id" | "securityId">

  export type SecurityOrderByWithAggregationInput = {
    request_id?: SortOrder
    accessZones?: SortOrder
    securityIssue?: SortOrder
    securityId?: SortOrder
    _count?: SecurityCountOrderByAggregateInput
    _avg?: SecurityAvgOrderByAggregateInput
    _max?: SecurityMaxOrderByAggregateInput
    _min?: SecurityMinOrderByAggregateInput
    _sum?: SecuritySumOrderByAggregateInput
  }

  export type SecurityScalarWhereWithAggregatesInput = {
    AND?: SecurityScalarWhereWithAggregatesInput | SecurityScalarWhereWithAggregatesInput[]
    OR?: SecurityScalarWhereWithAggregatesInput[]
    NOT?: SecurityScalarWhereWithAggregatesInput | SecurityScalarWhereWithAggregatesInput[]
    request_id?: IntWithAggregatesFilter<"Security"> | number
    accessZones?: StringWithAggregatesFilter<"Security"> | string
    securityIssue?: StringWithAggregatesFilter<"Security"> | string
    securityId?: IntWithAggregatesFilter<"Security"> | number
  }

  export type MedicalDeviceWhereInput = {
    AND?: MedicalDeviceWhereInput | MedicalDeviceWhereInput[]
    OR?: MedicalDeviceWhereInput[]
    NOT?: MedicalDeviceWhereInput | MedicalDeviceWhereInput[]
    request_id?: IntFilter<"MedicalDevice"> | number
    device?: StringFilter<"MedicalDevice"> | string
    operatorRequired?: StringFilter<"MedicalDevice"> | string
    medicalDeviceId?: IntFilter<"MedicalDevice"> | number
    service_request?: XOR<Service_requestScalarRelationFilter, service_requestWhereInput>
  }

  export type MedicalDeviceOrderByWithRelationInput = {
    request_id?: SortOrder
    device?: SortOrder
    operatorRequired?: SortOrder
    medicalDeviceId?: SortOrder
    service_request?: service_requestOrderByWithRelationInput
  }

  export type MedicalDeviceWhereUniqueInput = Prisma.AtLeast<{
    request_id?: number
    medicalDeviceId?: number
    AND?: MedicalDeviceWhereInput | MedicalDeviceWhereInput[]
    OR?: MedicalDeviceWhereInput[]
    NOT?: MedicalDeviceWhereInput | MedicalDeviceWhereInput[]
    device?: StringFilter<"MedicalDevice"> | string
    operatorRequired?: StringFilter<"MedicalDevice"> | string
    service_request?: XOR<Service_requestScalarRelationFilter, service_requestWhereInput>
  }, "request_id" | "medicalDeviceId">

  export type MedicalDeviceOrderByWithAggregationInput = {
    request_id?: SortOrder
    device?: SortOrder
    operatorRequired?: SortOrder
    medicalDeviceId?: SortOrder
    _count?: MedicalDeviceCountOrderByAggregateInput
    _avg?: MedicalDeviceAvgOrderByAggregateInput
    _max?: MedicalDeviceMaxOrderByAggregateInput
    _min?: MedicalDeviceMinOrderByAggregateInput
    _sum?: MedicalDeviceSumOrderByAggregateInput
  }

  export type MedicalDeviceScalarWhereWithAggregatesInput = {
    AND?: MedicalDeviceScalarWhereWithAggregatesInput | MedicalDeviceScalarWhereWithAggregatesInput[]
    OR?: MedicalDeviceScalarWhereWithAggregatesInput[]
    NOT?: MedicalDeviceScalarWhereWithAggregatesInput | MedicalDeviceScalarWhereWithAggregatesInput[]
    request_id?: IntWithAggregatesFilter<"MedicalDevice"> | number
    device?: StringWithAggregatesFilter<"MedicalDevice"> | string
    operatorRequired?: StringWithAggregatesFilter<"MedicalDevice"> | string
    medicalDeviceId?: IntWithAggregatesFilter<"MedicalDevice"> | number
  }

  export type FacilitiesWhereInput = {
    AND?: FacilitiesWhereInput | FacilitiesWhereInput[]
    OR?: FacilitiesWhereInput[]
    NOT?: FacilitiesWhereInput | FacilitiesWhereInput[]
    request_id?: IntFilter<"Facilities"> | number
    maintenanceType?: StringFilter<"Facilities"> | string
    equipmentType?: StringFilter<"Facilities"> | string
    facilitiesID?: IntFilter<"Facilities"> | number
    service_request?: XOR<Service_requestScalarRelationFilter, service_requestWhereInput>
  }

  export type FacilitiesOrderByWithRelationInput = {
    request_id?: SortOrder
    maintenanceType?: SortOrder
    equipmentType?: SortOrder
    facilitiesID?: SortOrder
    service_request?: service_requestOrderByWithRelationInput
  }

  export type FacilitiesWhereUniqueInput = Prisma.AtLeast<{
    request_id?: number
    facilitiesID?: number
    AND?: FacilitiesWhereInput | FacilitiesWhereInput[]
    OR?: FacilitiesWhereInput[]
    NOT?: FacilitiesWhereInput | FacilitiesWhereInput[]
    maintenanceType?: StringFilter<"Facilities"> | string
    equipmentType?: StringFilter<"Facilities"> | string
    service_request?: XOR<Service_requestScalarRelationFilter, service_requestWhereInput>
  }, "request_id" | "facilitiesID">

  export type FacilitiesOrderByWithAggregationInput = {
    request_id?: SortOrder
    maintenanceType?: SortOrder
    equipmentType?: SortOrder
    facilitiesID?: SortOrder
    _count?: FacilitiesCountOrderByAggregateInput
    _avg?: FacilitiesAvgOrderByAggregateInput
    _max?: FacilitiesMaxOrderByAggregateInput
    _min?: FacilitiesMinOrderByAggregateInput
    _sum?: FacilitiesSumOrderByAggregateInput
  }

  export type FacilitiesScalarWhereWithAggregatesInput = {
    AND?: FacilitiesScalarWhereWithAggregatesInput | FacilitiesScalarWhereWithAggregatesInput[]
    OR?: FacilitiesScalarWhereWithAggregatesInput[]
    NOT?: FacilitiesScalarWhereWithAggregatesInput | FacilitiesScalarWhereWithAggregatesInput[]
    request_id?: IntWithAggregatesFilter<"Facilities"> | number
    maintenanceType?: StringWithAggregatesFilter<"Facilities"> | string
    equipmentType?: StringWithAggregatesFilter<"Facilities"> | string
    facilitiesID?: IntWithAggregatesFilter<"Facilities"> | number
  }

  export type directoryWhereInput = {
    AND?: directoryWhereInput | directoryWhereInput[]
    OR?: directoryWhereInput[]
    NOT?: directoryWhereInput | directoryWhereInput[]
    id?: IntFilter<"directory"> | number
    name?: StringFilter<"directory"> | string
    services?: StringFilter<"directory"> | string
    location?: StringFilter<"directory"> | string
    telephone?: StringFilter<"directory"> | string
  }

  export type directoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    services?: SortOrder
    location?: SortOrder
    telephone?: SortOrder
  }

  export type directoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: directoryWhereInput | directoryWhereInput[]
    OR?: directoryWhereInput[]
    NOT?: directoryWhereInput | directoryWhereInput[]
    name?: StringFilter<"directory"> | string
    services?: StringFilter<"directory"> | string
    location?: StringFilter<"directory"> | string
    telephone?: StringFilter<"directory"> | string
  }, "id">

  export type directoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    services?: SortOrder
    location?: SortOrder
    telephone?: SortOrder
    _count?: directoryCountOrderByAggregateInput
    _avg?: directoryAvgOrderByAggregateInput
    _max?: directoryMaxOrderByAggregateInput
    _min?: directoryMinOrderByAggregateInput
    _sum?: directorySumOrderByAggregateInput
  }

  export type directoryScalarWhereWithAggregatesInput = {
    AND?: directoryScalarWhereWithAggregatesInput | directoryScalarWhereWithAggregatesInput[]
    OR?: directoryScalarWhereWithAggregatesInput[]
    NOT?: directoryScalarWhereWithAggregatesInput | directoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"directory"> | number
    name?: StringWithAggregatesFilter<"directory"> | string
    services?: StringWithAggregatesFilter<"directory"> | string
    location?: StringWithAggregatesFilter<"directory"> | string
    telephone?: StringWithAggregatesFilter<"directory"> | string
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    first_name?: StringFilter<"users"> | string
    last_name?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
  }

  export type usersOrderByWithRelationInput = {
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    first_name?: StringFilter<"users"> | string
    last_name?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
  }, "email">

  export type usersOrderByWithAggregationInput = {
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    _count?: usersCountOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    first_name?: StringWithAggregatesFilter<"users"> | string
    last_name?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    password?: StringWithAggregatesFilter<"users"> | string
  }

  export type nodesWhereInput = {
    AND?: nodesWhereInput | nodesWhereInput[]
    OR?: nodesWhereInput[]
    NOT?: nodesWhereInput | nodesWhereInput[]
    id?: IntFilter<"nodes"> | number
    building?: StringFilter<"nodes"> | string
    floor?: IntFilter<"nodes"> | number
    name?: StringNullableFilter<"nodes"> | string | null
    x?: FloatFilter<"nodes"> | number
    y?: FloatFilter<"nodes"> | number
    edgeCost?: IntFilter<"nodes"> | number
    totalCost?: IntFilter<"nodes"> | number
    outgoingEdges?: EdgesListRelationFilter
    incomingEdges?: EdgesListRelationFilter
  }

  export type nodesOrderByWithRelationInput = {
    id?: SortOrder
    building?: SortOrder
    floor?: SortOrder
    name?: SortOrderInput | SortOrder
    x?: SortOrder
    y?: SortOrder
    edgeCost?: SortOrder
    totalCost?: SortOrder
    outgoingEdges?: edgesOrderByRelationAggregateInput
    incomingEdges?: edgesOrderByRelationAggregateInput
  }

  export type nodesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: nodesWhereInput | nodesWhereInput[]
    OR?: nodesWhereInput[]
    NOT?: nodesWhereInput | nodesWhereInput[]
    building?: StringFilter<"nodes"> | string
    floor?: IntFilter<"nodes"> | number
    name?: StringNullableFilter<"nodes"> | string | null
    x?: FloatFilter<"nodes"> | number
    y?: FloatFilter<"nodes"> | number
    edgeCost?: IntFilter<"nodes"> | number
    totalCost?: IntFilter<"nodes"> | number
    outgoingEdges?: EdgesListRelationFilter
    incomingEdges?: EdgesListRelationFilter
  }, "id">

  export type nodesOrderByWithAggregationInput = {
    id?: SortOrder
    building?: SortOrder
    floor?: SortOrder
    name?: SortOrderInput | SortOrder
    x?: SortOrder
    y?: SortOrder
    edgeCost?: SortOrder
    totalCost?: SortOrder
    _count?: nodesCountOrderByAggregateInput
    _avg?: nodesAvgOrderByAggregateInput
    _max?: nodesMaxOrderByAggregateInput
    _min?: nodesMinOrderByAggregateInput
    _sum?: nodesSumOrderByAggregateInput
  }

  export type nodesScalarWhereWithAggregatesInput = {
    AND?: nodesScalarWhereWithAggregatesInput | nodesScalarWhereWithAggregatesInput[]
    OR?: nodesScalarWhereWithAggregatesInput[]
    NOT?: nodesScalarWhereWithAggregatesInput | nodesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"nodes"> | number
    building?: StringWithAggregatesFilter<"nodes"> | string
    floor?: IntWithAggregatesFilter<"nodes"> | number
    name?: StringNullableWithAggregatesFilter<"nodes"> | string | null
    x?: FloatWithAggregatesFilter<"nodes"> | number
    y?: FloatWithAggregatesFilter<"nodes"> | number
    edgeCost?: IntWithAggregatesFilter<"nodes"> | number
    totalCost?: IntWithAggregatesFilter<"nodes"> | number
  }

  export type edgesWhereInput = {
    AND?: edgesWhereInput | edgesWhereInput[]
    OR?: edgesWhereInput[]
    NOT?: edgesWhereInput | edgesWhereInput[]
    id?: IntFilter<"edges"> | number
    sourceId?: IntFilter<"edges"> | number
    targetId?: IntFilter<"edges"> | number
    weight?: FloatFilter<"edges"> | number
    sourceNode?: XOR<NodesScalarRelationFilter, nodesWhereInput>
    targetNode?: XOR<NodesScalarRelationFilter, nodesWhereInput>
  }

  export type edgesOrderByWithRelationInput = {
    id?: SortOrder
    sourceId?: SortOrder
    targetId?: SortOrder
    weight?: SortOrder
    sourceNode?: nodesOrderByWithRelationInput
    targetNode?: nodesOrderByWithRelationInput
  }

  export type edgesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: edgesWhereInput | edgesWhereInput[]
    OR?: edgesWhereInput[]
    NOT?: edgesWhereInput | edgesWhereInput[]
    sourceId?: IntFilter<"edges"> | number
    targetId?: IntFilter<"edges"> | number
    weight?: FloatFilter<"edges"> | number
    sourceNode?: XOR<NodesScalarRelationFilter, nodesWhereInput>
    targetNode?: XOR<NodesScalarRelationFilter, nodesWhereInput>
  }, "id">

  export type edgesOrderByWithAggregationInput = {
    id?: SortOrder
    sourceId?: SortOrder
    targetId?: SortOrder
    weight?: SortOrder
    _count?: edgesCountOrderByAggregateInput
    _avg?: edgesAvgOrderByAggregateInput
    _max?: edgesMaxOrderByAggregateInput
    _min?: edgesMinOrderByAggregateInput
    _sum?: edgesSumOrderByAggregateInput
  }

  export type edgesScalarWhereWithAggregatesInput = {
    AND?: edgesScalarWhereWithAggregatesInput | edgesScalarWhereWithAggregatesInput[]
    OR?: edgesScalarWhereWithAggregatesInput[]
    NOT?: edgesScalarWhereWithAggregatesInput | edgesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"edges"> | number
    sourceId?: IntWithAggregatesFilter<"edges"> | number
    targetId?: IntWithAggregatesFilter<"edges"> | number
    weight?: FloatWithAggregatesFilter<"edges"> | number
  }

  export type employeeCreateInput = {
    id: string
    employee_name: string
    created_at?: Date | string
    requests?: service_requestCreateNestedManyWithoutEmployeeInput
  }

  export type employeeUncheckedCreateInput = {
    id: string
    employee_name: string
    created_at?: Date | string
    requests?: service_requestUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type employeeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    requests?: service_requestUpdateManyWithoutEmployeeNestedInput
  }

  export type employeeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    requests?: service_requestUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type employeeCreateManyInput = {
    id: string
    employee_name: string
    created_at?: Date | string
  }

  export type employeeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type employeeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type service_requestCreateInput = {
    name: string
    employee_id: string
    priority: string
    location: string
    department: string
    status: string
    request_type: string
    request_date?: Date | string
    additional_comments?: string | null
    employee?: employeeCreateNestedOneWithoutRequestsInput
    sanitation?: SanitationCreateNestedOneWithoutService_requestInput
    language?: LanguageCreateNestedOneWithoutService_requestInput
    audioVisual?: AudioVisualCreateNestedOneWithoutService_requestInput
    security?: SecurityCreateNestedOneWithoutService_requestInput
    transportation?: TransportationCreateNestedOneWithoutService_requestInput
    medicalDevice?: MedicalDeviceCreateNestedOneWithoutService_requestInput
    facilities?: FacilitiesCreateNestedOneWithoutService_requestInput
  }

  export type service_requestUncheckedCreateInput = {
    request_id?: number
    name: string
    employee_id: string
    priority: string
    location: string
    department: string
    status: string
    request_type: string
    request_date?: Date | string
    additional_comments?: string | null
    assigned_employee?: string | null
    sanitation?: SanitationUncheckedCreateNestedOneWithoutService_requestInput
    language?: LanguageUncheckedCreateNestedOneWithoutService_requestInput
    audioVisual?: AudioVisualUncheckedCreateNestedOneWithoutService_requestInput
    security?: SecurityUncheckedCreateNestedOneWithoutService_requestInput
    transportation?: TransportationUncheckedCreateNestedOneWithoutService_requestInput
    medicalDevice?: MedicalDeviceUncheckedCreateNestedOneWithoutService_requestInput
    facilities?: FacilitiesUncheckedCreateNestedOneWithoutService_requestInput
  }

  export type service_requestUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    request_type?: StringFieldUpdateOperationsInput | string
    request_date?: DateTimeFieldUpdateOperationsInput | Date | string
    additional_comments?: NullableStringFieldUpdateOperationsInput | string | null
    employee?: employeeUpdateOneWithoutRequestsNestedInput
    sanitation?: SanitationUpdateOneWithoutService_requestNestedInput
    language?: LanguageUpdateOneWithoutService_requestNestedInput
    audioVisual?: AudioVisualUpdateOneWithoutService_requestNestedInput
    security?: SecurityUpdateOneWithoutService_requestNestedInput
    transportation?: TransportationUpdateOneWithoutService_requestNestedInput
    medicalDevice?: MedicalDeviceUpdateOneWithoutService_requestNestedInput
    facilities?: FacilitiesUpdateOneWithoutService_requestNestedInput
  }

  export type service_requestUncheckedUpdateInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    request_type?: StringFieldUpdateOperationsInput | string
    request_date?: DateTimeFieldUpdateOperationsInput | Date | string
    additional_comments?: NullableStringFieldUpdateOperationsInput | string | null
    assigned_employee?: NullableStringFieldUpdateOperationsInput | string | null
    sanitation?: SanitationUncheckedUpdateOneWithoutService_requestNestedInput
    language?: LanguageUncheckedUpdateOneWithoutService_requestNestedInput
    audioVisual?: AudioVisualUncheckedUpdateOneWithoutService_requestNestedInput
    security?: SecurityUncheckedUpdateOneWithoutService_requestNestedInput
    transportation?: TransportationUncheckedUpdateOneWithoutService_requestNestedInput
    medicalDevice?: MedicalDeviceUncheckedUpdateOneWithoutService_requestNestedInput
    facilities?: FacilitiesUncheckedUpdateOneWithoutService_requestNestedInput
  }

  export type service_requestCreateManyInput = {
    request_id?: number
    name: string
    employee_id: string
    priority: string
    location: string
    department: string
    status: string
    request_type: string
    request_date?: Date | string
    additional_comments?: string | null
    assigned_employee?: string | null
  }

  export type service_requestUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    request_type?: StringFieldUpdateOperationsInput | string
    request_date?: DateTimeFieldUpdateOperationsInput | Date | string
    additional_comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type service_requestUncheckedUpdateManyInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    request_type?: StringFieldUpdateOperationsInput | string
    request_date?: DateTimeFieldUpdateOperationsInput | Date | string
    additional_comments?: NullableStringFieldUpdateOperationsInput | string | null
    assigned_employee?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SanitationCreateInput = {
    cleaningType: string
    contaminant?: string | null
    service_request: service_requestCreateNestedOneWithoutSanitationInput
  }

  export type SanitationUncheckedCreateInput = {
    request_id?: number
    cleaningType: string
    contaminant?: string | null
    sanitationId: number
  }

  export type SanitationUpdateInput = {
    cleaningType?: StringFieldUpdateOperationsInput | string
    contaminant?: NullableStringFieldUpdateOperationsInput | string | null
    service_request?: service_requestUpdateOneRequiredWithoutSanitationNestedInput
  }

  export type SanitationUncheckedUpdateInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    cleaningType?: StringFieldUpdateOperationsInput | string
    contaminant?: NullableStringFieldUpdateOperationsInput | string | null
    sanitationId?: IntFieldUpdateOperationsInput | number
  }

  export type SanitationCreateManyInput = {
    request_id?: number
    cleaningType: string
    contaminant?: string | null
    sanitationId: number
  }

  export type SanitationUpdateManyMutationInput = {
    cleaningType?: StringFieldUpdateOperationsInput | string
    contaminant?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SanitationUncheckedUpdateManyInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    cleaningType?: StringFieldUpdateOperationsInput | string
    contaminant?: NullableStringFieldUpdateOperationsInput | string | null
    sanitationId?: IntFieldUpdateOperationsInput | number
  }

  export type LanguageCreateInput = {
    sourceLanguage: string
    targetLanguage: string
    service_request: service_requestCreateNestedOneWithoutLanguageInput
  }

  export type LanguageUncheckedCreateInput = {
    request_id?: number
    sourceLanguage: string
    targetLanguage: string
    languageId: number
  }

  export type LanguageUpdateInput = {
    sourceLanguage?: StringFieldUpdateOperationsInput | string
    targetLanguage?: StringFieldUpdateOperationsInput | string
    service_request?: service_requestUpdateOneRequiredWithoutLanguageNestedInput
  }

  export type LanguageUncheckedUpdateInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    sourceLanguage?: StringFieldUpdateOperationsInput | string
    targetLanguage?: StringFieldUpdateOperationsInput | string
    languageId?: IntFieldUpdateOperationsInput | number
  }

  export type LanguageCreateManyInput = {
    request_id?: number
    sourceLanguage: string
    targetLanguage: string
    languageId: number
  }

  export type LanguageUpdateManyMutationInput = {
    sourceLanguage?: StringFieldUpdateOperationsInput | string
    targetLanguage?: StringFieldUpdateOperationsInput | string
  }

  export type LanguageUncheckedUpdateManyInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    sourceLanguage?: StringFieldUpdateOperationsInput | string
    targetLanguage?: StringFieldUpdateOperationsInput | string
    languageId?: IntFieldUpdateOperationsInput | number
  }

  export type TransportationCreateInput = {
    transportationType: string
    transportationDestination: string
    service_request: service_requestCreateNestedOneWithoutTransportationInput
  }

  export type TransportationUncheckedCreateInput = {
    request_id?: number
    transportationType: string
    transportationDestination: string
    transportationId: number
  }

  export type TransportationUpdateInput = {
    transportationType?: StringFieldUpdateOperationsInput | string
    transportationDestination?: StringFieldUpdateOperationsInput | string
    service_request?: service_requestUpdateOneRequiredWithoutTransportationNestedInput
  }

  export type TransportationUncheckedUpdateInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    transportationType?: StringFieldUpdateOperationsInput | string
    transportationDestination?: StringFieldUpdateOperationsInput | string
    transportationId?: IntFieldUpdateOperationsInput | number
  }

  export type TransportationCreateManyInput = {
    request_id?: number
    transportationType: string
    transportationDestination: string
    transportationId: number
  }

  export type TransportationUpdateManyMutationInput = {
    transportationType?: StringFieldUpdateOperationsInput | string
    transportationDestination?: StringFieldUpdateOperationsInput | string
  }

  export type TransportationUncheckedUpdateManyInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    transportationType?: StringFieldUpdateOperationsInput | string
    transportationDestination?: StringFieldUpdateOperationsInput | string
    transportationId?: IntFieldUpdateOperationsInput | number
  }

  export type AudioVisualCreateInput = {
    accommodationType: string
    accommodationDetails?: string | null
    service_request: service_requestCreateNestedOneWithoutAudioVisualInput
  }

  export type AudioVisualUncheckedCreateInput = {
    request_id?: number
    accommodationType: string
    accommodationDetails?: string | null
    audioVisualId: number
  }

  export type AudioVisualUpdateInput = {
    accommodationType?: StringFieldUpdateOperationsInput | string
    accommodationDetails?: NullableStringFieldUpdateOperationsInput | string | null
    service_request?: service_requestUpdateOneRequiredWithoutAudioVisualNestedInput
  }

  export type AudioVisualUncheckedUpdateInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    accommodationType?: StringFieldUpdateOperationsInput | string
    accommodationDetails?: NullableStringFieldUpdateOperationsInput | string | null
    audioVisualId?: IntFieldUpdateOperationsInput | number
  }

  export type AudioVisualCreateManyInput = {
    request_id?: number
    accommodationType: string
    accommodationDetails?: string | null
    audioVisualId: number
  }

  export type AudioVisualUpdateManyMutationInput = {
    accommodationType?: StringFieldUpdateOperationsInput | string
    accommodationDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AudioVisualUncheckedUpdateManyInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    accommodationType?: StringFieldUpdateOperationsInput | string
    accommodationDetails?: NullableStringFieldUpdateOperationsInput | string | null
    audioVisualId?: IntFieldUpdateOperationsInput | number
  }

  export type SecurityCreateInput = {
    accessZones: string
    securityIssue: string
    service_request: service_requestCreateNestedOneWithoutSecurityInput
  }

  export type SecurityUncheckedCreateInput = {
    request_id?: number
    accessZones: string
    securityIssue: string
    securityId: number
  }

  export type SecurityUpdateInput = {
    accessZones?: StringFieldUpdateOperationsInput | string
    securityIssue?: StringFieldUpdateOperationsInput | string
    service_request?: service_requestUpdateOneRequiredWithoutSecurityNestedInput
  }

  export type SecurityUncheckedUpdateInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    accessZones?: StringFieldUpdateOperationsInput | string
    securityIssue?: StringFieldUpdateOperationsInput | string
    securityId?: IntFieldUpdateOperationsInput | number
  }

  export type SecurityCreateManyInput = {
    request_id?: number
    accessZones: string
    securityIssue: string
    securityId: number
  }

  export type SecurityUpdateManyMutationInput = {
    accessZones?: StringFieldUpdateOperationsInput | string
    securityIssue?: StringFieldUpdateOperationsInput | string
  }

  export type SecurityUncheckedUpdateManyInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    accessZones?: StringFieldUpdateOperationsInput | string
    securityIssue?: StringFieldUpdateOperationsInput | string
    securityId?: IntFieldUpdateOperationsInput | number
  }

  export type MedicalDeviceCreateInput = {
    device: string
    operatorRequired: string
    service_request: service_requestCreateNestedOneWithoutMedicalDeviceInput
  }

  export type MedicalDeviceUncheckedCreateInput = {
    request_id?: number
    device: string
    operatorRequired: string
    medicalDeviceId: number
  }

  export type MedicalDeviceUpdateInput = {
    device?: StringFieldUpdateOperationsInput | string
    operatorRequired?: StringFieldUpdateOperationsInput | string
    service_request?: service_requestUpdateOneRequiredWithoutMedicalDeviceNestedInput
  }

  export type MedicalDeviceUncheckedUpdateInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    device?: StringFieldUpdateOperationsInput | string
    operatorRequired?: StringFieldUpdateOperationsInput | string
    medicalDeviceId?: IntFieldUpdateOperationsInput | number
  }

  export type MedicalDeviceCreateManyInput = {
    request_id?: number
    device: string
    operatorRequired: string
    medicalDeviceId: number
  }

  export type MedicalDeviceUpdateManyMutationInput = {
    device?: StringFieldUpdateOperationsInput | string
    operatorRequired?: StringFieldUpdateOperationsInput | string
  }

  export type MedicalDeviceUncheckedUpdateManyInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    device?: StringFieldUpdateOperationsInput | string
    operatorRequired?: StringFieldUpdateOperationsInput | string
    medicalDeviceId?: IntFieldUpdateOperationsInput | number
  }

  export type FacilitiesCreateInput = {
    maintenanceType: string
    equipmentType: string
    service_request: service_requestCreateNestedOneWithoutFacilitiesInput
  }

  export type FacilitiesUncheckedCreateInput = {
    request_id?: number
    maintenanceType: string
    equipmentType: string
    facilitiesID: number
  }

  export type FacilitiesUpdateInput = {
    maintenanceType?: StringFieldUpdateOperationsInput | string
    equipmentType?: StringFieldUpdateOperationsInput | string
    service_request?: service_requestUpdateOneRequiredWithoutFacilitiesNestedInput
  }

  export type FacilitiesUncheckedUpdateInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    maintenanceType?: StringFieldUpdateOperationsInput | string
    equipmentType?: StringFieldUpdateOperationsInput | string
    facilitiesID?: IntFieldUpdateOperationsInput | number
  }

  export type FacilitiesCreateManyInput = {
    request_id?: number
    maintenanceType: string
    equipmentType: string
    facilitiesID: number
  }

  export type FacilitiesUpdateManyMutationInput = {
    maintenanceType?: StringFieldUpdateOperationsInput | string
    equipmentType?: StringFieldUpdateOperationsInput | string
  }

  export type FacilitiesUncheckedUpdateManyInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    maintenanceType?: StringFieldUpdateOperationsInput | string
    equipmentType?: StringFieldUpdateOperationsInput | string
    facilitiesID?: IntFieldUpdateOperationsInput | number
  }

  export type directoryCreateInput = {
    name: string
    services: string
    location: string
    telephone: string
  }

  export type directoryUncheckedCreateInput = {
    id?: number
    name: string
    services: string
    location: string
    telephone: string
  }

  export type directoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    services?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    telephone?: StringFieldUpdateOperationsInput | string
  }

  export type directoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    services?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    telephone?: StringFieldUpdateOperationsInput | string
  }

  export type directoryCreateManyInput = {
    id?: number
    name: string
    services: string
    location: string
    telephone: string
  }

  export type directoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    services?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    telephone?: StringFieldUpdateOperationsInput | string
  }

  export type directoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    services?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    telephone?: StringFieldUpdateOperationsInput | string
  }

  export type usersCreateInput = {
    first_name: string
    last_name: string
    email: string
    password: string
  }

  export type usersUncheckedCreateInput = {
    first_name: string
    last_name: string
    email: string
    password: string
  }

  export type usersUpdateInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type usersUncheckedUpdateInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type usersCreateManyInput = {
    first_name: string
    last_name: string
    email: string
    password: string
  }

  export type usersUpdateManyMutationInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type usersUncheckedUpdateManyInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type nodesCreateInput = {
    building: string
    floor: number
    name?: string | null
    x: number
    y: number
    edgeCost?: number
    totalCost?: number
    outgoingEdges?: edgesCreateNestedManyWithoutSourceNodeInput
    incomingEdges?: edgesCreateNestedManyWithoutTargetNodeInput
  }

  export type nodesUncheckedCreateInput = {
    id?: number
    building: string
    floor: number
    name?: string | null
    x: number
    y: number
    edgeCost?: number
    totalCost?: number
    outgoingEdges?: edgesUncheckedCreateNestedManyWithoutSourceNodeInput
    incomingEdges?: edgesUncheckedCreateNestedManyWithoutTargetNodeInput
  }

  export type nodesUpdateInput = {
    building?: StringFieldUpdateOperationsInput | string
    floor?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    x?: FloatFieldUpdateOperationsInput | number
    y?: FloatFieldUpdateOperationsInput | number
    edgeCost?: IntFieldUpdateOperationsInput | number
    totalCost?: IntFieldUpdateOperationsInput | number
    outgoingEdges?: edgesUpdateManyWithoutSourceNodeNestedInput
    incomingEdges?: edgesUpdateManyWithoutTargetNodeNestedInput
  }

  export type nodesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    building?: StringFieldUpdateOperationsInput | string
    floor?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    x?: FloatFieldUpdateOperationsInput | number
    y?: FloatFieldUpdateOperationsInput | number
    edgeCost?: IntFieldUpdateOperationsInput | number
    totalCost?: IntFieldUpdateOperationsInput | number
    outgoingEdges?: edgesUncheckedUpdateManyWithoutSourceNodeNestedInput
    incomingEdges?: edgesUncheckedUpdateManyWithoutTargetNodeNestedInput
  }

  export type nodesCreateManyInput = {
    id?: number
    building: string
    floor: number
    name?: string | null
    x: number
    y: number
    edgeCost?: number
    totalCost?: number
  }

  export type nodesUpdateManyMutationInput = {
    building?: StringFieldUpdateOperationsInput | string
    floor?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    x?: FloatFieldUpdateOperationsInput | number
    y?: FloatFieldUpdateOperationsInput | number
    edgeCost?: IntFieldUpdateOperationsInput | number
    totalCost?: IntFieldUpdateOperationsInput | number
  }

  export type nodesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    building?: StringFieldUpdateOperationsInput | string
    floor?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    x?: FloatFieldUpdateOperationsInput | number
    y?: FloatFieldUpdateOperationsInput | number
    edgeCost?: IntFieldUpdateOperationsInput | number
    totalCost?: IntFieldUpdateOperationsInput | number
  }

  export type edgesCreateInput = {
    weight: number
    sourceNode: nodesCreateNestedOneWithoutOutgoingEdgesInput
    targetNode: nodesCreateNestedOneWithoutIncomingEdgesInput
  }

  export type edgesUncheckedCreateInput = {
    id?: number
    sourceId: number
    targetId: number
    weight: number
  }

  export type edgesUpdateInput = {
    weight?: FloatFieldUpdateOperationsInput | number
    sourceNode?: nodesUpdateOneRequiredWithoutOutgoingEdgesNestedInput
    targetNode?: nodesUpdateOneRequiredWithoutIncomingEdgesNestedInput
  }

  export type edgesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    sourceId?: IntFieldUpdateOperationsInput | number
    targetId?: IntFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
  }

  export type edgesCreateManyInput = {
    id?: number
    sourceId: number
    targetId: number
    weight: number
  }

  export type edgesUpdateManyMutationInput = {
    weight?: FloatFieldUpdateOperationsInput | number
  }

  export type edgesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    sourceId?: IntFieldUpdateOperationsInput | number
    targetId?: IntFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type Service_requestListRelationFilter = {
    every?: service_requestWhereInput
    some?: service_requestWhereInput
    none?: service_requestWhereInput
  }

  export type service_requestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type employeeCountOrderByAggregateInput = {
    id?: SortOrder
    employee_name?: SortOrder
    created_at?: SortOrder
  }

  export type employeeMaxOrderByAggregateInput = {
    id?: SortOrder
    employee_name?: SortOrder
    created_at?: SortOrder
  }

  export type employeeMinOrderByAggregateInput = {
    id?: SortOrder
    employee_name?: SortOrder
    created_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EmployeeNullableScalarRelationFilter = {
    is?: employeeWhereInput | null
    isNot?: employeeWhereInput | null
  }

  export type SanitationNullableScalarRelationFilter = {
    is?: SanitationWhereInput | null
    isNot?: SanitationWhereInput | null
  }

  export type LanguageNullableScalarRelationFilter = {
    is?: LanguageWhereInput | null
    isNot?: LanguageWhereInput | null
  }

  export type AudioVisualNullableScalarRelationFilter = {
    is?: AudioVisualWhereInput | null
    isNot?: AudioVisualWhereInput | null
  }

  export type SecurityNullableScalarRelationFilter = {
    is?: SecurityWhereInput | null
    isNot?: SecurityWhereInput | null
  }

  export type TransportationNullableScalarRelationFilter = {
    is?: TransportationWhereInput | null
    isNot?: TransportationWhereInput | null
  }

  export type MedicalDeviceNullableScalarRelationFilter = {
    is?: MedicalDeviceWhereInput | null
    isNot?: MedicalDeviceWhereInput | null
  }

  export type FacilitiesNullableScalarRelationFilter = {
    is?: FacilitiesWhereInput | null
    isNot?: FacilitiesWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type service_requestCountOrderByAggregateInput = {
    request_id?: SortOrder
    name?: SortOrder
    employee_id?: SortOrder
    priority?: SortOrder
    location?: SortOrder
    department?: SortOrder
    status?: SortOrder
    request_type?: SortOrder
    request_date?: SortOrder
    additional_comments?: SortOrder
    assigned_employee?: SortOrder
  }

  export type service_requestAvgOrderByAggregateInput = {
    request_id?: SortOrder
  }

  export type service_requestMaxOrderByAggregateInput = {
    request_id?: SortOrder
    name?: SortOrder
    employee_id?: SortOrder
    priority?: SortOrder
    location?: SortOrder
    department?: SortOrder
    status?: SortOrder
    request_type?: SortOrder
    request_date?: SortOrder
    additional_comments?: SortOrder
    assigned_employee?: SortOrder
  }

  export type service_requestMinOrderByAggregateInput = {
    request_id?: SortOrder
    name?: SortOrder
    employee_id?: SortOrder
    priority?: SortOrder
    location?: SortOrder
    department?: SortOrder
    status?: SortOrder
    request_type?: SortOrder
    request_date?: SortOrder
    additional_comments?: SortOrder
    assigned_employee?: SortOrder
  }

  export type service_requestSumOrderByAggregateInput = {
    request_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type Service_requestScalarRelationFilter = {
    is?: service_requestWhereInput
    isNot?: service_requestWhereInput
  }

  export type SanitationCountOrderByAggregateInput = {
    request_id?: SortOrder
    cleaningType?: SortOrder
    contaminant?: SortOrder
    sanitationId?: SortOrder
  }

  export type SanitationAvgOrderByAggregateInput = {
    request_id?: SortOrder
    sanitationId?: SortOrder
  }

  export type SanitationMaxOrderByAggregateInput = {
    request_id?: SortOrder
    cleaningType?: SortOrder
    contaminant?: SortOrder
    sanitationId?: SortOrder
  }

  export type SanitationMinOrderByAggregateInput = {
    request_id?: SortOrder
    cleaningType?: SortOrder
    contaminant?: SortOrder
    sanitationId?: SortOrder
  }

  export type SanitationSumOrderByAggregateInput = {
    request_id?: SortOrder
    sanitationId?: SortOrder
  }

  export type LanguageCountOrderByAggregateInput = {
    request_id?: SortOrder
    sourceLanguage?: SortOrder
    targetLanguage?: SortOrder
    languageId?: SortOrder
  }

  export type LanguageAvgOrderByAggregateInput = {
    request_id?: SortOrder
    languageId?: SortOrder
  }

  export type LanguageMaxOrderByAggregateInput = {
    request_id?: SortOrder
    sourceLanguage?: SortOrder
    targetLanguage?: SortOrder
    languageId?: SortOrder
  }

  export type LanguageMinOrderByAggregateInput = {
    request_id?: SortOrder
    sourceLanguage?: SortOrder
    targetLanguage?: SortOrder
    languageId?: SortOrder
  }

  export type LanguageSumOrderByAggregateInput = {
    request_id?: SortOrder
    languageId?: SortOrder
  }

  export type TransportationCountOrderByAggregateInput = {
    request_id?: SortOrder
    transportationType?: SortOrder
    transportationDestination?: SortOrder
    transportationId?: SortOrder
  }

  export type TransportationAvgOrderByAggregateInput = {
    request_id?: SortOrder
    transportationId?: SortOrder
  }

  export type TransportationMaxOrderByAggregateInput = {
    request_id?: SortOrder
    transportationType?: SortOrder
    transportationDestination?: SortOrder
    transportationId?: SortOrder
  }

  export type TransportationMinOrderByAggregateInput = {
    request_id?: SortOrder
    transportationType?: SortOrder
    transportationDestination?: SortOrder
    transportationId?: SortOrder
  }

  export type TransportationSumOrderByAggregateInput = {
    request_id?: SortOrder
    transportationId?: SortOrder
  }

  export type AudioVisualCountOrderByAggregateInput = {
    request_id?: SortOrder
    accommodationType?: SortOrder
    accommodationDetails?: SortOrder
    audioVisualId?: SortOrder
  }

  export type AudioVisualAvgOrderByAggregateInput = {
    request_id?: SortOrder
    audioVisualId?: SortOrder
  }

  export type AudioVisualMaxOrderByAggregateInput = {
    request_id?: SortOrder
    accommodationType?: SortOrder
    accommodationDetails?: SortOrder
    audioVisualId?: SortOrder
  }

  export type AudioVisualMinOrderByAggregateInput = {
    request_id?: SortOrder
    accommodationType?: SortOrder
    accommodationDetails?: SortOrder
    audioVisualId?: SortOrder
  }

  export type AudioVisualSumOrderByAggregateInput = {
    request_id?: SortOrder
    audioVisualId?: SortOrder
  }

  export type SecurityCountOrderByAggregateInput = {
    request_id?: SortOrder
    accessZones?: SortOrder
    securityIssue?: SortOrder
    securityId?: SortOrder
  }

  export type SecurityAvgOrderByAggregateInput = {
    request_id?: SortOrder
    securityId?: SortOrder
  }

  export type SecurityMaxOrderByAggregateInput = {
    request_id?: SortOrder
    accessZones?: SortOrder
    securityIssue?: SortOrder
    securityId?: SortOrder
  }

  export type SecurityMinOrderByAggregateInput = {
    request_id?: SortOrder
    accessZones?: SortOrder
    securityIssue?: SortOrder
    securityId?: SortOrder
  }

  export type SecuritySumOrderByAggregateInput = {
    request_id?: SortOrder
    securityId?: SortOrder
  }

  export type MedicalDeviceCountOrderByAggregateInput = {
    request_id?: SortOrder
    device?: SortOrder
    operatorRequired?: SortOrder
    medicalDeviceId?: SortOrder
  }

  export type MedicalDeviceAvgOrderByAggregateInput = {
    request_id?: SortOrder
    medicalDeviceId?: SortOrder
  }

  export type MedicalDeviceMaxOrderByAggregateInput = {
    request_id?: SortOrder
    device?: SortOrder
    operatorRequired?: SortOrder
    medicalDeviceId?: SortOrder
  }

  export type MedicalDeviceMinOrderByAggregateInput = {
    request_id?: SortOrder
    device?: SortOrder
    operatorRequired?: SortOrder
    medicalDeviceId?: SortOrder
  }

  export type MedicalDeviceSumOrderByAggregateInput = {
    request_id?: SortOrder
    medicalDeviceId?: SortOrder
  }

  export type FacilitiesCountOrderByAggregateInput = {
    request_id?: SortOrder
    maintenanceType?: SortOrder
    equipmentType?: SortOrder
    facilitiesID?: SortOrder
  }

  export type FacilitiesAvgOrderByAggregateInput = {
    request_id?: SortOrder
    facilitiesID?: SortOrder
  }

  export type FacilitiesMaxOrderByAggregateInput = {
    request_id?: SortOrder
    maintenanceType?: SortOrder
    equipmentType?: SortOrder
    facilitiesID?: SortOrder
  }

  export type FacilitiesMinOrderByAggregateInput = {
    request_id?: SortOrder
    maintenanceType?: SortOrder
    equipmentType?: SortOrder
    facilitiesID?: SortOrder
  }

  export type FacilitiesSumOrderByAggregateInput = {
    request_id?: SortOrder
    facilitiesID?: SortOrder
  }

  export type directoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    services?: SortOrder
    location?: SortOrder
    telephone?: SortOrder
  }

  export type directoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type directoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    services?: SortOrder
    location?: SortOrder
    telephone?: SortOrder
  }

  export type directoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    services?: SortOrder
    location?: SortOrder
    telephone?: SortOrder
  }

  export type directorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EdgesListRelationFilter = {
    every?: edgesWhereInput
    some?: edgesWhereInput
    none?: edgesWhereInput
  }

  export type edgesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type nodesCountOrderByAggregateInput = {
    id?: SortOrder
    building?: SortOrder
    floor?: SortOrder
    name?: SortOrder
    x?: SortOrder
    y?: SortOrder
    edgeCost?: SortOrder
    totalCost?: SortOrder
  }

  export type nodesAvgOrderByAggregateInput = {
    id?: SortOrder
    floor?: SortOrder
    x?: SortOrder
    y?: SortOrder
    edgeCost?: SortOrder
    totalCost?: SortOrder
  }

  export type nodesMaxOrderByAggregateInput = {
    id?: SortOrder
    building?: SortOrder
    floor?: SortOrder
    name?: SortOrder
    x?: SortOrder
    y?: SortOrder
    edgeCost?: SortOrder
    totalCost?: SortOrder
  }

  export type nodesMinOrderByAggregateInput = {
    id?: SortOrder
    building?: SortOrder
    floor?: SortOrder
    name?: SortOrder
    x?: SortOrder
    y?: SortOrder
    edgeCost?: SortOrder
    totalCost?: SortOrder
  }

  export type nodesSumOrderByAggregateInput = {
    id?: SortOrder
    floor?: SortOrder
    x?: SortOrder
    y?: SortOrder
    edgeCost?: SortOrder
    totalCost?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NodesScalarRelationFilter = {
    is?: nodesWhereInput
    isNot?: nodesWhereInput
  }

  export type edgesCountOrderByAggregateInput = {
    id?: SortOrder
    sourceId?: SortOrder
    targetId?: SortOrder
    weight?: SortOrder
  }

  export type edgesAvgOrderByAggregateInput = {
    id?: SortOrder
    sourceId?: SortOrder
    targetId?: SortOrder
    weight?: SortOrder
  }

  export type edgesMaxOrderByAggregateInput = {
    id?: SortOrder
    sourceId?: SortOrder
    targetId?: SortOrder
    weight?: SortOrder
  }

  export type edgesMinOrderByAggregateInput = {
    id?: SortOrder
    sourceId?: SortOrder
    targetId?: SortOrder
    weight?: SortOrder
  }

  export type edgesSumOrderByAggregateInput = {
    id?: SortOrder
    sourceId?: SortOrder
    targetId?: SortOrder
    weight?: SortOrder
  }

  export type service_requestCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<service_requestCreateWithoutEmployeeInput, service_requestUncheckedCreateWithoutEmployeeInput> | service_requestCreateWithoutEmployeeInput[] | service_requestUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: service_requestCreateOrConnectWithoutEmployeeInput | service_requestCreateOrConnectWithoutEmployeeInput[]
    createMany?: service_requestCreateManyEmployeeInputEnvelope
    connect?: service_requestWhereUniqueInput | service_requestWhereUniqueInput[]
  }

  export type service_requestUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<service_requestCreateWithoutEmployeeInput, service_requestUncheckedCreateWithoutEmployeeInput> | service_requestCreateWithoutEmployeeInput[] | service_requestUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: service_requestCreateOrConnectWithoutEmployeeInput | service_requestCreateOrConnectWithoutEmployeeInput[]
    createMany?: service_requestCreateManyEmployeeInputEnvelope
    connect?: service_requestWhereUniqueInput | service_requestWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type service_requestUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<service_requestCreateWithoutEmployeeInput, service_requestUncheckedCreateWithoutEmployeeInput> | service_requestCreateWithoutEmployeeInput[] | service_requestUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: service_requestCreateOrConnectWithoutEmployeeInput | service_requestCreateOrConnectWithoutEmployeeInput[]
    upsert?: service_requestUpsertWithWhereUniqueWithoutEmployeeInput | service_requestUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: service_requestCreateManyEmployeeInputEnvelope
    set?: service_requestWhereUniqueInput | service_requestWhereUniqueInput[]
    disconnect?: service_requestWhereUniqueInput | service_requestWhereUniqueInput[]
    delete?: service_requestWhereUniqueInput | service_requestWhereUniqueInput[]
    connect?: service_requestWhereUniqueInput | service_requestWhereUniqueInput[]
    update?: service_requestUpdateWithWhereUniqueWithoutEmployeeInput | service_requestUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: service_requestUpdateManyWithWhereWithoutEmployeeInput | service_requestUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: service_requestScalarWhereInput | service_requestScalarWhereInput[]
  }

  export type service_requestUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<service_requestCreateWithoutEmployeeInput, service_requestUncheckedCreateWithoutEmployeeInput> | service_requestCreateWithoutEmployeeInput[] | service_requestUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: service_requestCreateOrConnectWithoutEmployeeInput | service_requestCreateOrConnectWithoutEmployeeInput[]
    upsert?: service_requestUpsertWithWhereUniqueWithoutEmployeeInput | service_requestUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: service_requestCreateManyEmployeeInputEnvelope
    set?: service_requestWhereUniqueInput | service_requestWhereUniqueInput[]
    disconnect?: service_requestWhereUniqueInput | service_requestWhereUniqueInput[]
    delete?: service_requestWhereUniqueInput | service_requestWhereUniqueInput[]
    connect?: service_requestWhereUniqueInput | service_requestWhereUniqueInput[]
    update?: service_requestUpdateWithWhereUniqueWithoutEmployeeInput | service_requestUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: service_requestUpdateManyWithWhereWithoutEmployeeInput | service_requestUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: service_requestScalarWhereInput | service_requestScalarWhereInput[]
  }

  export type employeeCreateNestedOneWithoutRequestsInput = {
    create?: XOR<employeeCreateWithoutRequestsInput, employeeUncheckedCreateWithoutRequestsInput>
    connectOrCreate?: employeeCreateOrConnectWithoutRequestsInput
    connect?: employeeWhereUniqueInput
  }

  export type SanitationCreateNestedOneWithoutService_requestInput = {
    create?: XOR<SanitationCreateWithoutService_requestInput, SanitationUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: SanitationCreateOrConnectWithoutService_requestInput
    connect?: SanitationWhereUniqueInput
  }

  export type LanguageCreateNestedOneWithoutService_requestInput = {
    create?: XOR<LanguageCreateWithoutService_requestInput, LanguageUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: LanguageCreateOrConnectWithoutService_requestInput
    connect?: LanguageWhereUniqueInput
  }

  export type AudioVisualCreateNestedOneWithoutService_requestInput = {
    create?: XOR<AudioVisualCreateWithoutService_requestInput, AudioVisualUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: AudioVisualCreateOrConnectWithoutService_requestInput
    connect?: AudioVisualWhereUniqueInput
  }

  export type SecurityCreateNestedOneWithoutService_requestInput = {
    create?: XOR<SecurityCreateWithoutService_requestInput, SecurityUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: SecurityCreateOrConnectWithoutService_requestInput
    connect?: SecurityWhereUniqueInput
  }

  export type TransportationCreateNestedOneWithoutService_requestInput = {
    create?: XOR<TransportationCreateWithoutService_requestInput, TransportationUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: TransportationCreateOrConnectWithoutService_requestInput
    connect?: TransportationWhereUniqueInput
  }

  export type MedicalDeviceCreateNestedOneWithoutService_requestInput = {
    create?: XOR<MedicalDeviceCreateWithoutService_requestInput, MedicalDeviceUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: MedicalDeviceCreateOrConnectWithoutService_requestInput
    connect?: MedicalDeviceWhereUniqueInput
  }

  export type FacilitiesCreateNestedOneWithoutService_requestInput = {
    create?: XOR<FacilitiesCreateWithoutService_requestInput, FacilitiesUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: FacilitiesCreateOrConnectWithoutService_requestInput
    connect?: FacilitiesWhereUniqueInput
  }

  export type SanitationUncheckedCreateNestedOneWithoutService_requestInput = {
    create?: XOR<SanitationCreateWithoutService_requestInput, SanitationUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: SanitationCreateOrConnectWithoutService_requestInput
    connect?: SanitationWhereUniqueInput
  }

  export type LanguageUncheckedCreateNestedOneWithoutService_requestInput = {
    create?: XOR<LanguageCreateWithoutService_requestInput, LanguageUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: LanguageCreateOrConnectWithoutService_requestInput
    connect?: LanguageWhereUniqueInput
  }

  export type AudioVisualUncheckedCreateNestedOneWithoutService_requestInput = {
    create?: XOR<AudioVisualCreateWithoutService_requestInput, AudioVisualUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: AudioVisualCreateOrConnectWithoutService_requestInput
    connect?: AudioVisualWhereUniqueInput
  }

  export type SecurityUncheckedCreateNestedOneWithoutService_requestInput = {
    create?: XOR<SecurityCreateWithoutService_requestInput, SecurityUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: SecurityCreateOrConnectWithoutService_requestInput
    connect?: SecurityWhereUniqueInput
  }

  export type TransportationUncheckedCreateNestedOneWithoutService_requestInput = {
    create?: XOR<TransportationCreateWithoutService_requestInput, TransportationUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: TransportationCreateOrConnectWithoutService_requestInput
    connect?: TransportationWhereUniqueInput
  }

  export type MedicalDeviceUncheckedCreateNestedOneWithoutService_requestInput = {
    create?: XOR<MedicalDeviceCreateWithoutService_requestInput, MedicalDeviceUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: MedicalDeviceCreateOrConnectWithoutService_requestInput
    connect?: MedicalDeviceWhereUniqueInput
  }

  export type FacilitiesUncheckedCreateNestedOneWithoutService_requestInput = {
    create?: XOR<FacilitiesCreateWithoutService_requestInput, FacilitiesUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: FacilitiesCreateOrConnectWithoutService_requestInput
    connect?: FacilitiesWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type employeeUpdateOneWithoutRequestsNestedInput = {
    create?: XOR<employeeCreateWithoutRequestsInput, employeeUncheckedCreateWithoutRequestsInput>
    connectOrCreate?: employeeCreateOrConnectWithoutRequestsInput
    upsert?: employeeUpsertWithoutRequestsInput
    disconnect?: employeeWhereInput | boolean
    delete?: employeeWhereInput | boolean
    connect?: employeeWhereUniqueInput
    update?: XOR<XOR<employeeUpdateToOneWithWhereWithoutRequestsInput, employeeUpdateWithoutRequestsInput>, employeeUncheckedUpdateWithoutRequestsInput>
  }

  export type SanitationUpdateOneWithoutService_requestNestedInput = {
    create?: XOR<SanitationCreateWithoutService_requestInput, SanitationUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: SanitationCreateOrConnectWithoutService_requestInput
    upsert?: SanitationUpsertWithoutService_requestInput
    disconnect?: SanitationWhereInput | boolean
    delete?: SanitationWhereInput | boolean
    connect?: SanitationWhereUniqueInput
    update?: XOR<XOR<SanitationUpdateToOneWithWhereWithoutService_requestInput, SanitationUpdateWithoutService_requestInput>, SanitationUncheckedUpdateWithoutService_requestInput>
  }

  export type LanguageUpdateOneWithoutService_requestNestedInput = {
    create?: XOR<LanguageCreateWithoutService_requestInput, LanguageUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: LanguageCreateOrConnectWithoutService_requestInput
    upsert?: LanguageUpsertWithoutService_requestInput
    disconnect?: LanguageWhereInput | boolean
    delete?: LanguageWhereInput | boolean
    connect?: LanguageWhereUniqueInput
    update?: XOR<XOR<LanguageUpdateToOneWithWhereWithoutService_requestInput, LanguageUpdateWithoutService_requestInput>, LanguageUncheckedUpdateWithoutService_requestInput>
  }

  export type AudioVisualUpdateOneWithoutService_requestNestedInput = {
    create?: XOR<AudioVisualCreateWithoutService_requestInput, AudioVisualUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: AudioVisualCreateOrConnectWithoutService_requestInput
    upsert?: AudioVisualUpsertWithoutService_requestInput
    disconnect?: AudioVisualWhereInput | boolean
    delete?: AudioVisualWhereInput | boolean
    connect?: AudioVisualWhereUniqueInput
    update?: XOR<XOR<AudioVisualUpdateToOneWithWhereWithoutService_requestInput, AudioVisualUpdateWithoutService_requestInput>, AudioVisualUncheckedUpdateWithoutService_requestInput>
  }

  export type SecurityUpdateOneWithoutService_requestNestedInput = {
    create?: XOR<SecurityCreateWithoutService_requestInput, SecurityUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: SecurityCreateOrConnectWithoutService_requestInput
    upsert?: SecurityUpsertWithoutService_requestInput
    disconnect?: SecurityWhereInput | boolean
    delete?: SecurityWhereInput | boolean
    connect?: SecurityWhereUniqueInput
    update?: XOR<XOR<SecurityUpdateToOneWithWhereWithoutService_requestInput, SecurityUpdateWithoutService_requestInput>, SecurityUncheckedUpdateWithoutService_requestInput>
  }

  export type TransportationUpdateOneWithoutService_requestNestedInput = {
    create?: XOR<TransportationCreateWithoutService_requestInput, TransportationUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: TransportationCreateOrConnectWithoutService_requestInput
    upsert?: TransportationUpsertWithoutService_requestInput
    disconnect?: TransportationWhereInput | boolean
    delete?: TransportationWhereInput | boolean
    connect?: TransportationWhereUniqueInput
    update?: XOR<XOR<TransportationUpdateToOneWithWhereWithoutService_requestInput, TransportationUpdateWithoutService_requestInput>, TransportationUncheckedUpdateWithoutService_requestInput>
  }

  export type MedicalDeviceUpdateOneWithoutService_requestNestedInput = {
    create?: XOR<MedicalDeviceCreateWithoutService_requestInput, MedicalDeviceUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: MedicalDeviceCreateOrConnectWithoutService_requestInput
    upsert?: MedicalDeviceUpsertWithoutService_requestInput
    disconnect?: MedicalDeviceWhereInput | boolean
    delete?: MedicalDeviceWhereInput | boolean
    connect?: MedicalDeviceWhereUniqueInput
    update?: XOR<XOR<MedicalDeviceUpdateToOneWithWhereWithoutService_requestInput, MedicalDeviceUpdateWithoutService_requestInput>, MedicalDeviceUncheckedUpdateWithoutService_requestInput>
  }

  export type FacilitiesUpdateOneWithoutService_requestNestedInput = {
    create?: XOR<FacilitiesCreateWithoutService_requestInput, FacilitiesUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: FacilitiesCreateOrConnectWithoutService_requestInput
    upsert?: FacilitiesUpsertWithoutService_requestInput
    disconnect?: FacilitiesWhereInput | boolean
    delete?: FacilitiesWhereInput | boolean
    connect?: FacilitiesWhereUniqueInput
    update?: XOR<XOR<FacilitiesUpdateToOneWithWhereWithoutService_requestInput, FacilitiesUpdateWithoutService_requestInput>, FacilitiesUncheckedUpdateWithoutService_requestInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SanitationUncheckedUpdateOneWithoutService_requestNestedInput = {
    create?: XOR<SanitationCreateWithoutService_requestInput, SanitationUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: SanitationCreateOrConnectWithoutService_requestInput
    upsert?: SanitationUpsertWithoutService_requestInput
    disconnect?: SanitationWhereInput | boolean
    delete?: SanitationWhereInput | boolean
    connect?: SanitationWhereUniqueInput
    update?: XOR<XOR<SanitationUpdateToOneWithWhereWithoutService_requestInput, SanitationUpdateWithoutService_requestInput>, SanitationUncheckedUpdateWithoutService_requestInput>
  }

  export type LanguageUncheckedUpdateOneWithoutService_requestNestedInput = {
    create?: XOR<LanguageCreateWithoutService_requestInput, LanguageUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: LanguageCreateOrConnectWithoutService_requestInput
    upsert?: LanguageUpsertWithoutService_requestInput
    disconnect?: LanguageWhereInput | boolean
    delete?: LanguageWhereInput | boolean
    connect?: LanguageWhereUniqueInput
    update?: XOR<XOR<LanguageUpdateToOneWithWhereWithoutService_requestInput, LanguageUpdateWithoutService_requestInput>, LanguageUncheckedUpdateWithoutService_requestInput>
  }

  export type AudioVisualUncheckedUpdateOneWithoutService_requestNestedInput = {
    create?: XOR<AudioVisualCreateWithoutService_requestInput, AudioVisualUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: AudioVisualCreateOrConnectWithoutService_requestInput
    upsert?: AudioVisualUpsertWithoutService_requestInput
    disconnect?: AudioVisualWhereInput | boolean
    delete?: AudioVisualWhereInput | boolean
    connect?: AudioVisualWhereUniqueInput
    update?: XOR<XOR<AudioVisualUpdateToOneWithWhereWithoutService_requestInput, AudioVisualUpdateWithoutService_requestInput>, AudioVisualUncheckedUpdateWithoutService_requestInput>
  }

  export type SecurityUncheckedUpdateOneWithoutService_requestNestedInput = {
    create?: XOR<SecurityCreateWithoutService_requestInput, SecurityUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: SecurityCreateOrConnectWithoutService_requestInput
    upsert?: SecurityUpsertWithoutService_requestInput
    disconnect?: SecurityWhereInput | boolean
    delete?: SecurityWhereInput | boolean
    connect?: SecurityWhereUniqueInput
    update?: XOR<XOR<SecurityUpdateToOneWithWhereWithoutService_requestInput, SecurityUpdateWithoutService_requestInput>, SecurityUncheckedUpdateWithoutService_requestInput>
  }

  export type TransportationUncheckedUpdateOneWithoutService_requestNestedInput = {
    create?: XOR<TransportationCreateWithoutService_requestInput, TransportationUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: TransportationCreateOrConnectWithoutService_requestInput
    upsert?: TransportationUpsertWithoutService_requestInput
    disconnect?: TransportationWhereInput | boolean
    delete?: TransportationWhereInput | boolean
    connect?: TransportationWhereUniqueInput
    update?: XOR<XOR<TransportationUpdateToOneWithWhereWithoutService_requestInput, TransportationUpdateWithoutService_requestInput>, TransportationUncheckedUpdateWithoutService_requestInput>
  }

  export type MedicalDeviceUncheckedUpdateOneWithoutService_requestNestedInput = {
    create?: XOR<MedicalDeviceCreateWithoutService_requestInput, MedicalDeviceUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: MedicalDeviceCreateOrConnectWithoutService_requestInput
    upsert?: MedicalDeviceUpsertWithoutService_requestInput
    disconnect?: MedicalDeviceWhereInput | boolean
    delete?: MedicalDeviceWhereInput | boolean
    connect?: MedicalDeviceWhereUniqueInput
    update?: XOR<XOR<MedicalDeviceUpdateToOneWithWhereWithoutService_requestInput, MedicalDeviceUpdateWithoutService_requestInput>, MedicalDeviceUncheckedUpdateWithoutService_requestInput>
  }

  export type FacilitiesUncheckedUpdateOneWithoutService_requestNestedInput = {
    create?: XOR<FacilitiesCreateWithoutService_requestInput, FacilitiesUncheckedCreateWithoutService_requestInput>
    connectOrCreate?: FacilitiesCreateOrConnectWithoutService_requestInput
    upsert?: FacilitiesUpsertWithoutService_requestInput
    disconnect?: FacilitiesWhereInput | boolean
    delete?: FacilitiesWhereInput | boolean
    connect?: FacilitiesWhereUniqueInput
    update?: XOR<XOR<FacilitiesUpdateToOneWithWhereWithoutService_requestInput, FacilitiesUpdateWithoutService_requestInput>, FacilitiesUncheckedUpdateWithoutService_requestInput>
  }

  export type service_requestCreateNestedOneWithoutSanitationInput = {
    create?: XOR<service_requestCreateWithoutSanitationInput, service_requestUncheckedCreateWithoutSanitationInput>
    connectOrCreate?: service_requestCreateOrConnectWithoutSanitationInput
    connect?: service_requestWhereUniqueInput
  }

  export type service_requestUpdateOneRequiredWithoutSanitationNestedInput = {
    create?: XOR<service_requestCreateWithoutSanitationInput, service_requestUncheckedCreateWithoutSanitationInput>
    connectOrCreate?: service_requestCreateOrConnectWithoutSanitationInput
    upsert?: service_requestUpsertWithoutSanitationInput
    connect?: service_requestWhereUniqueInput
    update?: XOR<XOR<service_requestUpdateToOneWithWhereWithoutSanitationInput, service_requestUpdateWithoutSanitationInput>, service_requestUncheckedUpdateWithoutSanitationInput>
  }

  export type service_requestCreateNestedOneWithoutLanguageInput = {
    create?: XOR<service_requestCreateWithoutLanguageInput, service_requestUncheckedCreateWithoutLanguageInput>
    connectOrCreate?: service_requestCreateOrConnectWithoutLanguageInput
    connect?: service_requestWhereUniqueInput
  }

  export type service_requestUpdateOneRequiredWithoutLanguageNestedInput = {
    create?: XOR<service_requestCreateWithoutLanguageInput, service_requestUncheckedCreateWithoutLanguageInput>
    connectOrCreate?: service_requestCreateOrConnectWithoutLanguageInput
    upsert?: service_requestUpsertWithoutLanguageInput
    connect?: service_requestWhereUniqueInput
    update?: XOR<XOR<service_requestUpdateToOneWithWhereWithoutLanguageInput, service_requestUpdateWithoutLanguageInput>, service_requestUncheckedUpdateWithoutLanguageInput>
  }

  export type service_requestCreateNestedOneWithoutTransportationInput = {
    create?: XOR<service_requestCreateWithoutTransportationInput, service_requestUncheckedCreateWithoutTransportationInput>
    connectOrCreate?: service_requestCreateOrConnectWithoutTransportationInput
    connect?: service_requestWhereUniqueInput
  }

  export type service_requestUpdateOneRequiredWithoutTransportationNestedInput = {
    create?: XOR<service_requestCreateWithoutTransportationInput, service_requestUncheckedCreateWithoutTransportationInput>
    connectOrCreate?: service_requestCreateOrConnectWithoutTransportationInput
    upsert?: service_requestUpsertWithoutTransportationInput
    connect?: service_requestWhereUniqueInput
    update?: XOR<XOR<service_requestUpdateToOneWithWhereWithoutTransportationInput, service_requestUpdateWithoutTransportationInput>, service_requestUncheckedUpdateWithoutTransportationInput>
  }

  export type service_requestCreateNestedOneWithoutAudioVisualInput = {
    create?: XOR<service_requestCreateWithoutAudioVisualInput, service_requestUncheckedCreateWithoutAudioVisualInput>
    connectOrCreate?: service_requestCreateOrConnectWithoutAudioVisualInput
    connect?: service_requestWhereUniqueInput
  }

  export type service_requestUpdateOneRequiredWithoutAudioVisualNestedInput = {
    create?: XOR<service_requestCreateWithoutAudioVisualInput, service_requestUncheckedCreateWithoutAudioVisualInput>
    connectOrCreate?: service_requestCreateOrConnectWithoutAudioVisualInput
    upsert?: service_requestUpsertWithoutAudioVisualInput
    connect?: service_requestWhereUniqueInput
    update?: XOR<XOR<service_requestUpdateToOneWithWhereWithoutAudioVisualInput, service_requestUpdateWithoutAudioVisualInput>, service_requestUncheckedUpdateWithoutAudioVisualInput>
  }

  export type service_requestCreateNestedOneWithoutSecurityInput = {
    create?: XOR<service_requestCreateWithoutSecurityInput, service_requestUncheckedCreateWithoutSecurityInput>
    connectOrCreate?: service_requestCreateOrConnectWithoutSecurityInput
    connect?: service_requestWhereUniqueInput
  }

  export type service_requestUpdateOneRequiredWithoutSecurityNestedInput = {
    create?: XOR<service_requestCreateWithoutSecurityInput, service_requestUncheckedCreateWithoutSecurityInput>
    connectOrCreate?: service_requestCreateOrConnectWithoutSecurityInput
    upsert?: service_requestUpsertWithoutSecurityInput
    connect?: service_requestWhereUniqueInput
    update?: XOR<XOR<service_requestUpdateToOneWithWhereWithoutSecurityInput, service_requestUpdateWithoutSecurityInput>, service_requestUncheckedUpdateWithoutSecurityInput>
  }

  export type service_requestCreateNestedOneWithoutMedicalDeviceInput = {
    create?: XOR<service_requestCreateWithoutMedicalDeviceInput, service_requestUncheckedCreateWithoutMedicalDeviceInput>
    connectOrCreate?: service_requestCreateOrConnectWithoutMedicalDeviceInput
    connect?: service_requestWhereUniqueInput
  }

  export type service_requestUpdateOneRequiredWithoutMedicalDeviceNestedInput = {
    create?: XOR<service_requestCreateWithoutMedicalDeviceInput, service_requestUncheckedCreateWithoutMedicalDeviceInput>
    connectOrCreate?: service_requestCreateOrConnectWithoutMedicalDeviceInput
    upsert?: service_requestUpsertWithoutMedicalDeviceInput
    connect?: service_requestWhereUniqueInput
    update?: XOR<XOR<service_requestUpdateToOneWithWhereWithoutMedicalDeviceInput, service_requestUpdateWithoutMedicalDeviceInput>, service_requestUncheckedUpdateWithoutMedicalDeviceInput>
  }

  export type service_requestCreateNestedOneWithoutFacilitiesInput = {
    create?: XOR<service_requestCreateWithoutFacilitiesInput, service_requestUncheckedCreateWithoutFacilitiesInput>
    connectOrCreate?: service_requestCreateOrConnectWithoutFacilitiesInput
    connect?: service_requestWhereUniqueInput
  }

  export type service_requestUpdateOneRequiredWithoutFacilitiesNestedInput = {
    create?: XOR<service_requestCreateWithoutFacilitiesInput, service_requestUncheckedCreateWithoutFacilitiesInput>
    connectOrCreate?: service_requestCreateOrConnectWithoutFacilitiesInput
    upsert?: service_requestUpsertWithoutFacilitiesInput
    connect?: service_requestWhereUniqueInput
    update?: XOR<XOR<service_requestUpdateToOneWithWhereWithoutFacilitiesInput, service_requestUpdateWithoutFacilitiesInput>, service_requestUncheckedUpdateWithoutFacilitiesInput>
  }

  export type edgesCreateNestedManyWithoutSourceNodeInput = {
    create?: XOR<edgesCreateWithoutSourceNodeInput, edgesUncheckedCreateWithoutSourceNodeInput> | edgesCreateWithoutSourceNodeInput[] | edgesUncheckedCreateWithoutSourceNodeInput[]
    connectOrCreate?: edgesCreateOrConnectWithoutSourceNodeInput | edgesCreateOrConnectWithoutSourceNodeInput[]
    createMany?: edgesCreateManySourceNodeInputEnvelope
    connect?: edgesWhereUniqueInput | edgesWhereUniqueInput[]
  }

  export type edgesCreateNestedManyWithoutTargetNodeInput = {
    create?: XOR<edgesCreateWithoutTargetNodeInput, edgesUncheckedCreateWithoutTargetNodeInput> | edgesCreateWithoutTargetNodeInput[] | edgesUncheckedCreateWithoutTargetNodeInput[]
    connectOrCreate?: edgesCreateOrConnectWithoutTargetNodeInput | edgesCreateOrConnectWithoutTargetNodeInput[]
    createMany?: edgesCreateManyTargetNodeInputEnvelope
    connect?: edgesWhereUniqueInput | edgesWhereUniqueInput[]
  }

  export type edgesUncheckedCreateNestedManyWithoutSourceNodeInput = {
    create?: XOR<edgesCreateWithoutSourceNodeInput, edgesUncheckedCreateWithoutSourceNodeInput> | edgesCreateWithoutSourceNodeInput[] | edgesUncheckedCreateWithoutSourceNodeInput[]
    connectOrCreate?: edgesCreateOrConnectWithoutSourceNodeInput | edgesCreateOrConnectWithoutSourceNodeInput[]
    createMany?: edgesCreateManySourceNodeInputEnvelope
    connect?: edgesWhereUniqueInput | edgesWhereUniqueInput[]
  }

  export type edgesUncheckedCreateNestedManyWithoutTargetNodeInput = {
    create?: XOR<edgesCreateWithoutTargetNodeInput, edgesUncheckedCreateWithoutTargetNodeInput> | edgesCreateWithoutTargetNodeInput[] | edgesUncheckedCreateWithoutTargetNodeInput[]
    connectOrCreate?: edgesCreateOrConnectWithoutTargetNodeInput | edgesCreateOrConnectWithoutTargetNodeInput[]
    createMany?: edgesCreateManyTargetNodeInputEnvelope
    connect?: edgesWhereUniqueInput | edgesWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type edgesUpdateManyWithoutSourceNodeNestedInput = {
    create?: XOR<edgesCreateWithoutSourceNodeInput, edgesUncheckedCreateWithoutSourceNodeInput> | edgesCreateWithoutSourceNodeInput[] | edgesUncheckedCreateWithoutSourceNodeInput[]
    connectOrCreate?: edgesCreateOrConnectWithoutSourceNodeInput | edgesCreateOrConnectWithoutSourceNodeInput[]
    upsert?: edgesUpsertWithWhereUniqueWithoutSourceNodeInput | edgesUpsertWithWhereUniqueWithoutSourceNodeInput[]
    createMany?: edgesCreateManySourceNodeInputEnvelope
    set?: edgesWhereUniqueInput | edgesWhereUniqueInput[]
    disconnect?: edgesWhereUniqueInput | edgesWhereUniqueInput[]
    delete?: edgesWhereUniqueInput | edgesWhereUniqueInput[]
    connect?: edgesWhereUniqueInput | edgesWhereUniqueInput[]
    update?: edgesUpdateWithWhereUniqueWithoutSourceNodeInput | edgesUpdateWithWhereUniqueWithoutSourceNodeInput[]
    updateMany?: edgesUpdateManyWithWhereWithoutSourceNodeInput | edgesUpdateManyWithWhereWithoutSourceNodeInput[]
    deleteMany?: edgesScalarWhereInput | edgesScalarWhereInput[]
  }

  export type edgesUpdateManyWithoutTargetNodeNestedInput = {
    create?: XOR<edgesCreateWithoutTargetNodeInput, edgesUncheckedCreateWithoutTargetNodeInput> | edgesCreateWithoutTargetNodeInput[] | edgesUncheckedCreateWithoutTargetNodeInput[]
    connectOrCreate?: edgesCreateOrConnectWithoutTargetNodeInput | edgesCreateOrConnectWithoutTargetNodeInput[]
    upsert?: edgesUpsertWithWhereUniqueWithoutTargetNodeInput | edgesUpsertWithWhereUniqueWithoutTargetNodeInput[]
    createMany?: edgesCreateManyTargetNodeInputEnvelope
    set?: edgesWhereUniqueInput | edgesWhereUniqueInput[]
    disconnect?: edgesWhereUniqueInput | edgesWhereUniqueInput[]
    delete?: edgesWhereUniqueInput | edgesWhereUniqueInput[]
    connect?: edgesWhereUniqueInput | edgesWhereUniqueInput[]
    update?: edgesUpdateWithWhereUniqueWithoutTargetNodeInput | edgesUpdateWithWhereUniqueWithoutTargetNodeInput[]
    updateMany?: edgesUpdateManyWithWhereWithoutTargetNodeInput | edgesUpdateManyWithWhereWithoutTargetNodeInput[]
    deleteMany?: edgesScalarWhereInput | edgesScalarWhereInput[]
  }

  export type edgesUncheckedUpdateManyWithoutSourceNodeNestedInput = {
    create?: XOR<edgesCreateWithoutSourceNodeInput, edgesUncheckedCreateWithoutSourceNodeInput> | edgesCreateWithoutSourceNodeInput[] | edgesUncheckedCreateWithoutSourceNodeInput[]
    connectOrCreate?: edgesCreateOrConnectWithoutSourceNodeInput | edgesCreateOrConnectWithoutSourceNodeInput[]
    upsert?: edgesUpsertWithWhereUniqueWithoutSourceNodeInput | edgesUpsertWithWhereUniqueWithoutSourceNodeInput[]
    createMany?: edgesCreateManySourceNodeInputEnvelope
    set?: edgesWhereUniqueInput | edgesWhereUniqueInput[]
    disconnect?: edgesWhereUniqueInput | edgesWhereUniqueInput[]
    delete?: edgesWhereUniqueInput | edgesWhereUniqueInput[]
    connect?: edgesWhereUniqueInput | edgesWhereUniqueInput[]
    update?: edgesUpdateWithWhereUniqueWithoutSourceNodeInput | edgesUpdateWithWhereUniqueWithoutSourceNodeInput[]
    updateMany?: edgesUpdateManyWithWhereWithoutSourceNodeInput | edgesUpdateManyWithWhereWithoutSourceNodeInput[]
    deleteMany?: edgesScalarWhereInput | edgesScalarWhereInput[]
  }

  export type edgesUncheckedUpdateManyWithoutTargetNodeNestedInput = {
    create?: XOR<edgesCreateWithoutTargetNodeInput, edgesUncheckedCreateWithoutTargetNodeInput> | edgesCreateWithoutTargetNodeInput[] | edgesUncheckedCreateWithoutTargetNodeInput[]
    connectOrCreate?: edgesCreateOrConnectWithoutTargetNodeInput | edgesCreateOrConnectWithoutTargetNodeInput[]
    upsert?: edgesUpsertWithWhereUniqueWithoutTargetNodeInput | edgesUpsertWithWhereUniqueWithoutTargetNodeInput[]
    createMany?: edgesCreateManyTargetNodeInputEnvelope
    set?: edgesWhereUniqueInput | edgesWhereUniqueInput[]
    disconnect?: edgesWhereUniqueInput | edgesWhereUniqueInput[]
    delete?: edgesWhereUniqueInput | edgesWhereUniqueInput[]
    connect?: edgesWhereUniqueInput | edgesWhereUniqueInput[]
    update?: edgesUpdateWithWhereUniqueWithoutTargetNodeInput | edgesUpdateWithWhereUniqueWithoutTargetNodeInput[]
    updateMany?: edgesUpdateManyWithWhereWithoutTargetNodeInput | edgesUpdateManyWithWhereWithoutTargetNodeInput[]
    deleteMany?: edgesScalarWhereInput | edgesScalarWhereInput[]
  }

  export type nodesCreateNestedOneWithoutOutgoingEdgesInput = {
    create?: XOR<nodesCreateWithoutOutgoingEdgesInput, nodesUncheckedCreateWithoutOutgoingEdgesInput>
    connectOrCreate?: nodesCreateOrConnectWithoutOutgoingEdgesInput
    connect?: nodesWhereUniqueInput
  }

  export type nodesCreateNestedOneWithoutIncomingEdgesInput = {
    create?: XOR<nodesCreateWithoutIncomingEdgesInput, nodesUncheckedCreateWithoutIncomingEdgesInput>
    connectOrCreate?: nodesCreateOrConnectWithoutIncomingEdgesInput
    connect?: nodesWhereUniqueInput
  }

  export type nodesUpdateOneRequiredWithoutOutgoingEdgesNestedInput = {
    create?: XOR<nodesCreateWithoutOutgoingEdgesInput, nodesUncheckedCreateWithoutOutgoingEdgesInput>
    connectOrCreate?: nodesCreateOrConnectWithoutOutgoingEdgesInput
    upsert?: nodesUpsertWithoutOutgoingEdgesInput
    connect?: nodesWhereUniqueInput
    update?: XOR<XOR<nodesUpdateToOneWithWhereWithoutOutgoingEdgesInput, nodesUpdateWithoutOutgoingEdgesInput>, nodesUncheckedUpdateWithoutOutgoingEdgesInput>
  }

  export type nodesUpdateOneRequiredWithoutIncomingEdgesNestedInput = {
    create?: XOR<nodesCreateWithoutIncomingEdgesInput, nodesUncheckedCreateWithoutIncomingEdgesInput>
    connectOrCreate?: nodesCreateOrConnectWithoutIncomingEdgesInput
    upsert?: nodesUpsertWithoutIncomingEdgesInput
    connect?: nodesWhereUniqueInput
    update?: XOR<XOR<nodesUpdateToOneWithWhereWithoutIncomingEdgesInput, nodesUpdateWithoutIncomingEdgesInput>, nodesUncheckedUpdateWithoutIncomingEdgesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type service_requestCreateWithoutEmployeeInput = {
    name: string
    employee_id: string
    priority: string
    location: string
    department: string
    status: string
    request_type: string
    request_date?: Date | string
    additional_comments?: string | null
    sanitation?: SanitationCreateNestedOneWithoutService_requestInput
    language?: LanguageCreateNestedOneWithoutService_requestInput
    audioVisual?: AudioVisualCreateNestedOneWithoutService_requestInput
    security?: SecurityCreateNestedOneWithoutService_requestInput
    transportation?: TransportationCreateNestedOneWithoutService_requestInput
    medicalDevice?: MedicalDeviceCreateNestedOneWithoutService_requestInput
    facilities?: FacilitiesCreateNestedOneWithoutService_requestInput
  }

  export type service_requestUncheckedCreateWithoutEmployeeInput = {
    request_id?: number
    name: string
    employee_id: string
    priority: string
    location: string
    department: string
    status: string
    request_type: string
    request_date?: Date | string
    additional_comments?: string | null
    sanitation?: SanitationUncheckedCreateNestedOneWithoutService_requestInput
    language?: LanguageUncheckedCreateNestedOneWithoutService_requestInput
    audioVisual?: AudioVisualUncheckedCreateNestedOneWithoutService_requestInput
    security?: SecurityUncheckedCreateNestedOneWithoutService_requestInput
    transportation?: TransportationUncheckedCreateNestedOneWithoutService_requestInput
    medicalDevice?: MedicalDeviceUncheckedCreateNestedOneWithoutService_requestInput
    facilities?: FacilitiesUncheckedCreateNestedOneWithoutService_requestInput
  }

  export type service_requestCreateOrConnectWithoutEmployeeInput = {
    where: service_requestWhereUniqueInput
    create: XOR<service_requestCreateWithoutEmployeeInput, service_requestUncheckedCreateWithoutEmployeeInput>
  }

  export type service_requestCreateManyEmployeeInputEnvelope = {
    data: service_requestCreateManyEmployeeInput | service_requestCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type service_requestUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: service_requestWhereUniqueInput
    update: XOR<service_requestUpdateWithoutEmployeeInput, service_requestUncheckedUpdateWithoutEmployeeInput>
    create: XOR<service_requestCreateWithoutEmployeeInput, service_requestUncheckedCreateWithoutEmployeeInput>
  }

  export type service_requestUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: service_requestWhereUniqueInput
    data: XOR<service_requestUpdateWithoutEmployeeInput, service_requestUncheckedUpdateWithoutEmployeeInput>
  }

  export type service_requestUpdateManyWithWhereWithoutEmployeeInput = {
    where: service_requestScalarWhereInput
    data: XOR<service_requestUpdateManyMutationInput, service_requestUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type service_requestScalarWhereInput = {
    AND?: service_requestScalarWhereInput | service_requestScalarWhereInput[]
    OR?: service_requestScalarWhereInput[]
    NOT?: service_requestScalarWhereInput | service_requestScalarWhereInput[]
    request_id?: IntFilter<"service_request"> | number
    name?: StringFilter<"service_request"> | string
    employee_id?: StringFilter<"service_request"> | string
    priority?: StringFilter<"service_request"> | string
    location?: StringFilter<"service_request"> | string
    department?: StringFilter<"service_request"> | string
    status?: StringFilter<"service_request"> | string
    request_type?: StringFilter<"service_request"> | string
    request_date?: DateTimeFilter<"service_request"> | Date | string
    additional_comments?: StringNullableFilter<"service_request"> | string | null
    assigned_employee?: StringNullableFilter<"service_request"> | string | null
  }

  export type employeeCreateWithoutRequestsInput = {
    id: string
    employee_name: string
    created_at?: Date | string
  }

  export type employeeUncheckedCreateWithoutRequestsInput = {
    id: string
    employee_name: string
    created_at?: Date | string
  }

  export type employeeCreateOrConnectWithoutRequestsInput = {
    where: employeeWhereUniqueInput
    create: XOR<employeeCreateWithoutRequestsInput, employeeUncheckedCreateWithoutRequestsInput>
  }

  export type SanitationCreateWithoutService_requestInput = {
    cleaningType: string
    contaminant?: string | null
  }

  export type SanitationUncheckedCreateWithoutService_requestInput = {
    request_id?: number
    cleaningType: string
    contaminant?: string | null
  }

  export type SanitationCreateOrConnectWithoutService_requestInput = {
    where: SanitationWhereUniqueInput
    create: XOR<SanitationCreateWithoutService_requestInput, SanitationUncheckedCreateWithoutService_requestInput>
  }

  export type LanguageCreateWithoutService_requestInput = {
    sourceLanguage: string
    targetLanguage: string
  }

  export type LanguageUncheckedCreateWithoutService_requestInput = {
    request_id?: number
    sourceLanguage: string
    targetLanguage: string
  }

  export type LanguageCreateOrConnectWithoutService_requestInput = {
    where: LanguageWhereUniqueInput
    create: XOR<LanguageCreateWithoutService_requestInput, LanguageUncheckedCreateWithoutService_requestInput>
  }

  export type AudioVisualCreateWithoutService_requestInput = {
    accommodationType: string
    accommodationDetails?: string | null
  }

  export type AudioVisualUncheckedCreateWithoutService_requestInput = {
    request_id?: number
    accommodationType: string
    accommodationDetails?: string | null
  }

  export type AudioVisualCreateOrConnectWithoutService_requestInput = {
    where: AudioVisualWhereUniqueInput
    create: XOR<AudioVisualCreateWithoutService_requestInput, AudioVisualUncheckedCreateWithoutService_requestInput>
  }

  export type SecurityCreateWithoutService_requestInput = {
    accessZones: string
    securityIssue: string
  }

  export type SecurityUncheckedCreateWithoutService_requestInput = {
    request_id?: number
    accessZones: string
    securityIssue: string
  }

  export type SecurityCreateOrConnectWithoutService_requestInput = {
    where: SecurityWhereUniqueInput
    create: XOR<SecurityCreateWithoutService_requestInput, SecurityUncheckedCreateWithoutService_requestInput>
  }

  export type TransportationCreateWithoutService_requestInput = {
    transportationType: string
    transportationDestination: string
  }

  export type TransportationUncheckedCreateWithoutService_requestInput = {
    request_id?: number
    transportationType: string
    transportationDestination: string
  }

  export type TransportationCreateOrConnectWithoutService_requestInput = {
    where: TransportationWhereUniqueInput
    create: XOR<TransportationCreateWithoutService_requestInput, TransportationUncheckedCreateWithoutService_requestInput>
  }

  export type MedicalDeviceCreateWithoutService_requestInput = {
    device: string
    operatorRequired: string
  }

  export type MedicalDeviceUncheckedCreateWithoutService_requestInput = {
    request_id?: number
    device: string
    operatorRequired: string
  }

  export type MedicalDeviceCreateOrConnectWithoutService_requestInput = {
    where: MedicalDeviceWhereUniqueInput
    create: XOR<MedicalDeviceCreateWithoutService_requestInput, MedicalDeviceUncheckedCreateWithoutService_requestInput>
  }

  export type FacilitiesCreateWithoutService_requestInput = {
    maintenanceType: string
    equipmentType: string
  }

  export type FacilitiesUncheckedCreateWithoutService_requestInput = {
    request_id?: number
    maintenanceType: string
    equipmentType: string
  }

  export type FacilitiesCreateOrConnectWithoutService_requestInput = {
    where: FacilitiesWhereUniqueInput
    create: XOR<FacilitiesCreateWithoutService_requestInput, FacilitiesUncheckedCreateWithoutService_requestInput>
  }

  export type employeeUpsertWithoutRequestsInput = {
    update: XOR<employeeUpdateWithoutRequestsInput, employeeUncheckedUpdateWithoutRequestsInput>
    create: XOR<employeeCreateWithoutRequestsInput, employeeUncheckedCreateWithoutRequestsInput>
    where?: employeeWhereInput
  }

  export type employeeUpdateToOneWithWhereWithoutRequestsInput = {
    where?: employeeWhereInput
    data: XOR<employeeUpdateWithoutRequestsInput, employeeUncheckedUpdateWithoutRequestsInput>
  }

  export type employeeUpdateWithoutRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type employeeUncheckedUpdateWithoutRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SanitationUpsertWithoutService_requestInput = {
    update: XOR<SanitationUpdateWithoutService_requestInput, SanitationUncheckedUpdateWithoutService_requestInput>
    create: XOR<SanitationCreateWithoutService_requestInput, SanitationUncheckedCreateWithoutService_requestInput>
    where?: SanitationWhereInput
  }

  export type SanitationUpdateToOneWithWhereWithoutService_requestInput = {
    where?: SanitationWhereInput
    data: XOR<SanitationUpdateWithoutService_requestInput, SanitationUncheckedUpdateWithoutService_requestInput>
  }

  export type SanitationUpdateWithoutService_requestInput = {
    cleaningType?: StringFieldUpdateOperationsInput | string
    contaminant?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SanitationUncheckedUpdateWithoutService_requestInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    cleaningType?: StringFieldUpdateOperationsInput | string
    contaminant?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LanguageUpsertWithoutService_requestInput = {
    update: XOR<LanguageUpdateWithoutService_requestInput, LanguageUncheckedUpdateWithoutService_requestInput>
    create: XOR<LanguageCreateWithoutService_requestInput, LanguageUncheckedCreateWithoutService_requestInput>
    where?: LanguageWhereInput
  }

  export type LanguageUpdateToOneWithWhereWithoutService_requestInput = {
    where?: LanguageWhereInput
    data: XOR<LanguageUpdateWithoutService_requestInput, LanguageUncheckedUpdateWithoutService_requestInput>
  }

  export type LanguageUpdateWithoutService_requestInput = {
    sourceLanguage?: StringFieldUpdateOperationsInput | string
    targetLanguage?: StringFieldUpdateOperationsInput | string
  }

  export type LanguageUncheckedUpdateWithoutService_requestInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    sourceLanguage?: StringFieldUpdateOperationsInput | string
    targetLanguage?: StringFieldUpdateOperationsInput | string
  }

  export type AudioVisualUpsertWithoutService_requestInput = {
    update: XOR<AudioVisualUpdateWithoutService_requestInput, AudioVisualUncheckedUpdateWithoutService_requestInput>
    create: XOR<AudioVisualCreateWithoutService_requestInput, AudioVisualUncheckedCreateWithoutService_requestInput>
    where?: AudioVisualWhereInput
  }

  export type AudioVisualUpdateToOneWithWhereWithoutService_requestInput = {
    where?: AudioVisualWhereInput
    data: XOR<AudioVisualUpdateWithoutService_requestInput, AudioVisualUncheckedUpdateWithoutService_requestInput>
  }

  export type AudioVisualUpdateWithoutService_requestInput = {
    accommodationType?: StringFieldUpdateOperationsInput | string
    accommodationDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AudioVisualUncheckedUpdateWithoutService_requestInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    accommodationType?: StringFieldUpdateOperationsInput | string
    accommodationDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SecurityUpsertWithoutService_requestInput = {
    update: XOR<SecurityUpdateWithoutService_requestInput, SecurityUncheckedUpdateWithoutService_requestInput>
    create: XOR<SecurityCreateWithoutService_requestInput, SecurityUncheckedCreateWithoutService_requestInput>
    where?: SecurityWhereInput
  }

  export type SecurityUpdateToOneWithWhereWithoutService_requestInput = {
    where?: SecurityWhereInput
    data: XOR<SecurityUpdateWithoutService_requestInput, SecurityUncheckedUpdateWithoutService_requestInput>
  }

  export type SecurityUpdateWithoutService_requestInput = {
    accessZones?: StringFieldUpdateOperationsInput | string
    securityIssue?: StringFieldUpdateOperationsInput | string
  }

  export type SecurityUncheckedUpdateWithoutService_requestInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    accessZones?: StringFieldUpdateOperationsInput | string
    securityIssue?: StringFieldUpdateOperationsInput | string
  }

  export type TransportationUpsertWithoutService_requestInput = {
    update: XOR<TransportationUpdateWithoutService_requestInput, TransportationUncheckedUpdateWithoutService_requestInput>
    create: XOR<TransportationCreateWithoutService_requestInput, TransportationUncheckedCreateWithoutService_requestInput>
    where?: TransportationWhereInput
  }

  export type TransportationUpdateToOneWithWhereWithoutService_requestInput = {
    where?: TransportationWhereInput
    data: XOR<TransportationUpdateWithoutService_requestInput, TransportationUncheckedUpdateWithoutService_requestInput>
  }

  export type TransportationUpdateWithoutService_requestInput = {
    transportationType?: StringFieldUpdateOperationsInput | string
    transportationDestination?: StringFieldUpdateOperationsInput | string
  }

  export type TransportationUncheckedUpdateWithoutService_requestInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    transportationType?: StringFieldUpdateOperationsInput | string
    transportationDestination?: StringFieldUpdateOperationsInput | string
  }

  export type MedicalDeviceUpsertWithoutService_requestInput = {
    update: XOR<MedicalDeviceUpdateWithoutService_requestInput, MedicalDeviceUncheckedUpdateWithoutService_requestInput>
    create: XOR<MedicalDeviceCreateWithoutService_requestInput, MedicalDeviceUncheckedCreateWithoutService_requestInput>
    where?: MedicalDeviceWhereInput
  }

  export type MedicalDeviceUpdateToOneWithWhereWithoutService_requestInput = {
    where?: MedicalDeviceWhereInput
    data: XOR<MedicalDeviceUpdateWithoutService_requestInput, MedicalDeviceUncheckedUpdateWithoutService_requestInput>
  }

  export type MedicalDeviceUpdateWithoutService_requestInput = {
    device?: StringFieldUpdateOperationsInput | string
    operatorRequired?: StringFieldUpdateOperationsInput | string
  }

  export type MedicalDeviceUncheckedUpdateWithoutService_requestInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    device?: StringFieldUpdateOperationsInput | string
    operatorRequired?: StringFieldUpdateOperationsInput | string
  }

  export type FacilitiesUpsertWithoutService_requestInput = {
    update: XOR<FacilitiesUpdateWithoutService_requestInput, FacilitiesUncheckedUpdateWithoutService_requestInput>
    create: XOR<FacilitiesCreateWithoutService_requestInput, FacilitiesUncheckedCreateWithoutService_requestInput>
    where?: FacilitiesWhereInput
  }

  export type FacilitiesUpdateToOneWithWhereWithoutService_requestInput = {
    where?: FacilitiesWhereInput
    data: XOR<FacilitiesUpdateWithoutService_requestInput, FacilitiesUncheckedUpdateWithoutService_requestInput>
  }

  export type FacilitiesUpdateWithoutService_requestInput = {
    maintenanceType?: StringFieldUpdateOperationsInput | string
    equipmentType?: StringFieldUpdateOperationsInput | string
  }

  export type FacilitiesUncheckedUpdateWithoutService_requestInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    maintenanceType?: StringFieldUpdateOperationsInput | string
    equipmentType?: StringFieldUpdateOperationsInput | string
  }

  export type service_requestCreateWithoutSanitationInput = {
    name: string
    employee_id: string
    priority: string
    location: string
    department: string
    status: string
    request_type: string
    request_date?: Date | string
    additional_comments?: string | null
    employee?: employeeCreateNestedOneWithoutRequestsInput
    language?: LanguageCreateNestedOneWithoutService_requestInput
    audioVisual?: AudioVisualCreateNestedOneWithoutService_requestInput
    security?: SecurityCreateNestedOneWithoutService_requestInput
    transportation?: TransportationCreateNestedOneWithoutService_requestInput
    medicalDevice?: MedicalDeviceCreateNestedOneWithoutService_requestInput
    facilities?: FacilitiesCreateNestedOneWithoutService_requestInput
  }

  export type service_requestUncheckedCreateWithoutSanitationInput = {
    request_id?: number
    name: string
    employee_id: string
    priority: string
    location: string
    department: string
    status: string
    request_type: string
    request_date?: Date | string
    additional_comments?: string | null
    assigned_employee?: string | null
    language?: LanguageUncheckedCreateNestedOneWithoutService_requestInput
    audioVisual?: AudioVisualUncheckedCreateNestedOneWithoutService_requestInput
    security?: SecurityUncheckedCreateNestedOneWithoutService_requestInput
    transportation?: TransportationUncheckedCreateNestedOneWithoutService_requestInput
    medicalDevice?: MedicalDeviceUncheckedCreateNestedOneWithoutService_requestInput
    facilities?: FacilitiesUncheckedCreateNestedOneWithoutService_requestInput
  }

  export type service_requestCreateOrConnectWithoutSanitationInput = {
    where: service_requestWhereUniqueInput
    create: XOR<service_requestCreateWithoutSanitationInput, service_requestUncheckedCreateWithoutSanitationInput>
  }

  export type service_requestUpsertWithoutSanitationInput = {
    update: XOR<service_requestUpdateWithoutSanitationInput, service_requestUncheckedUpdateWithoutSanitationInput>
    create: XOR<service_requestCreateWithoutSanitationInput, service_requestUncheckedCreateWithoutSanitationInput>
    where?: service_requestWhereInput
  }

  export type service_requestUpdateToOneWithWhereWithoutSanitationInput = {
    where?: service_requestWhereInput
    data: XOR<service_requestUpdateWithoutSanitationInput, service_requestUncheckedUpdateWithoutSanitationInput>
  }

  export type service_requestUpdateWithoutSanitationInput = {
    name?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    request_type?: StringFieldUpdateOperationsInput | string
    request_date?: DateTimeFieldUpdateOperationsInput | Date | string
    additional_comments?: NullableStringFieldUpdateOperationsInput | string | null
    employee?: employeeUpdateOneWithoutRequestsNestedInput
    language?: LanguageUpdateOneWithoutService_requestNestedInput
    audioVisual?: AudioVisualUpdateOneWithoutService_requestNestedInput
    security?: SecurityUpdateOneWithoutService_requestNestedInput
    transportation?: TransportationUpdateOneWithoutService_requestNestedInput
    medicalDevice?: MedicalDeviceUpdateOneWithoutService_requestNestedInput
    facilities?: FacilitiesUpdateOneWithoutService_requestNestedInput
  }

  export type service_requestUncheckedUpdateWithoutSanitationInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    request_type?: StringFieldUpdateOperationsInput | string
    request_date?: DateTimeFieldUpdateOperationsInput | Date | string
    additional_comments?: NullableStringFieldUpdateOperationsInput | string | null
    assigned_employee?: NullableStringFieldUpdateOperationsInput | string | null
    language?: LanguageUncheckedUpdateOneWithoutService_requestNestedInput
    audioVisual?: AudioVisualUncheckedUpdateOneWithoutService_requestNestedInput
    security?: SecurityUncheckedUpdateOneWithoutService_requestNestedInput
    transportation?: TransportationUncheckedUpdateOneWithoutService_requestNestedInput
    medicalDevice?: MedicalDeviceUncheckedUpdateOneWithoutService_requestNestedInput
    facilities?: FacilitiesUncheckedUpdateOneWithoutService_requestNestedInput
  }

  export type service_requestCreateWithoutLanguageInput = {
    name: string
    employee_id: string
    priority: string
    location: string
    department: string
    status: string
    request_type: string
    request_date?: Date | string
    additional_comments?: string | null
    employee?: employeeCreateNestedOneWithoutRequestsInput
    sanitation?: SanitationCreateNestedOneWithoutService_requestInput
    audioVisual?: AudioVisualCreateNestedOneWithoutService_requestInput
    security?: SecurityCreateNestedOneWithoutService_requestInput
    transportation?: TransportationCreateNestedOneWithoutService_requestInput
    medicalDevice?: MedicalDeviceCreateNestedOneWithoutService_requestInput
    facilities?: FacilitiesCreateNestedOneWithoutService_requestInput
  }

  export type service_requestUncheckedCreateWithoutLanguageInput = {
    request_id?: number
    name: string
    employee_id: string
    priority: string
    location: string
    department: string
    status: string
    request_type: string
    request_date?: Date | string
    additional_comments?: string | null
    assigned_employee?: string | null
    sanitation?: SanitationUncheckedCreateNestedOneWithoutService_requestInput
    audioVisual?: AudioVisualUncheckedCreateNestedOneWithoutService_requestInput
    security?: SecurityUncheckedCreateNestedOneWithoutService_requestInput
    transportation?: TransportationUncheckedCreateNestedOneWithoutService_requestInput
    medicalDevice?: MedicalDeviceUncheckedCreateNestedOneWithoutService_requestInput
    facilities?: FacilitiesUncheckedCreateNestedOneWithoutService_requestInput
  }

  export type service_requestCreateOrConnectWithoutLanguageInput = {
    where: service_requestWhereUniqueInput
    create: XOR<service_requestCreateWithoutLanguageInput, service_requestUncheckedCreateWithoutLanguageInput>
  }

  export type service_requestUpsertWithoutLanguageInput = {
    update: XOR<service_requestUpdateWithoutLanguageInput, service_requestUncheckedUpdateWithoutLanguageInput>
    create: XOR<service_requestCreateWithoutLanguageInput, service_requestUncheckedCreateWithoutLanguageInput>
    where?: service_requestWhereInput
  }

  export type service_requestUpdateToOneWithWhereWithoutLanguageInput = {
    where?: service_requestWhereInput
    data: XOR<service_requestUpdateWithoutLanguageInput, service_requestUncheckedUpdateWithoutLanguageInput>
  }

  export type service_requestUpdateWithoutLanguageInput = {
    name?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    request_type?: StringFieldUpdateOperationsInput | string
    request_date?: DateTimeFieldUpdateOperationsInput | Date | string
    additional_comments?: NullableStringFieldUpdateOperationsInput | string | null
    employee?: employeeUpdateOneWithoutRequestsNestedInput
    sanitation?: SanitationUpdateOneWithoutService_requestNestedInput
    audioVisual?: AudioVisualUpdateOneWithoutService_requestNestedInput
    security?: SecurityUpdateOneWithoutService_requestNestedInput
    transportation?: TransportationUpdateOneWithoutService_requestNestedInput
    medicalDevice?: MedicalDeviceUpdateOneWithoutService_requestNestedInput
    facilities?: FacilitiesUpdateOneWithoutService_requestNestedInput
  }

  export type service_requestUncheckedUpdateWithoutLanguageInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    request_type?: StringFieldUpdateOperationsInput | string
    request_date?: DateTimeFieldUpdateOperationsInput | Date | string
    additional_comments?: NullableStringFieldUpdateOperationsInput | string | null
    assigned_employee?: NullableStringFieldUpdateOperationsInput | string | null
    sanitation?: SanitationUncheckedUpdateOneWithoutService_requestNestedInput
    audioVisual?: AudioVisualUncheckedUpdateOneWithoutService_requestNestedInput
    security?: SecurityUncheckedUpdateOneWithoutService_requestNestedInput
    transportation?: TransportationUncheckedUpdateOneWithoutService_requestNestedInput
    medicalDevice?: MedicalDeviceUncheckedUpdateOneWithoutService_requestNestedInput
    facilities?: FacilitiesUncheckedUpdateOneWithoutService_requestNestedInput
  }

  export type service_requestCreateWithoutTransportationInput = {
    name: string
    employee_id: string
    priority: string
    location: string
    department: string
    status: string
    request_type: string
    request_date?: Date | string
    additional_comments?: string | null
    employee?: employeeCreateNestedOneWithoutRequestsInput
    sanitation?: SanitationCreateNestedOneWithoutService_requestInput
    language?: LanguageCreateNestedOneWithoutService_requestInput
    audioVisual?: AudioVisualCreateNestedOneWithoutService_requestInput
    security?: SecurityCreateNestedOneWithoutService_requestInput
    medicalDevice?: MedicalDeviceCreateNestedOneWithoutService_requestInput
    facilities?: FacilitiesCreateNestedOneWithoutService_requestInput
  }

  export type service_requestUncheckedCreateWithoutTransportationInput = {
    request_id?: number
    name: string
    employee_id: string
    priority: string
    location: string
    department: string
    status: string
    request_type: string
    request_date?: Date | string
    additional_comments?: string | null
    assigned_employee?: string | null
    sanitation?: SanitationUncheckedCreateNestedOneWithoutService_requestInput
    language?: LanguageUncheckedCreateNestedOneWithoutService_requestInput
    audioVisual?: AudioVisualUncheckedCreateNestedOneWithoutService_requestInput
    security?: SecurityUncheckedCreateNestedOneWithoutService_requestInput
    medicalDevice?: MedicalDeviceUncheckedCreateNestedOneWithoutService_requestInput
    facilities?: FacilitiesUncheckedCreateNestedOneWithoutService_requestInput
  }

  export type service_requestCreateOrConnectWithoutTransportationInput = {
    where: service_requestWhereUniqueInput
    create: XOR<service_requestCreateWithoutTransportationInput, service_requestUncheckedCreateWithoutTransportationInput>
  }

  export type service_requestUpsertWithoutTransportationInput = {
    update: XOR<service_requestUpdateWithoutTransportationInput, service_requestUncheckedUpdateWithoutTransportationInput>
    create: XOR<service_requestCreateWithoutTransportationInput, service_requestUncheckedCreateWithoutTransportationInput>
    where?: service_requestWhereInput
  }

  export type service_requestUpdateToOneWithWhereWithoutTransportationInput = {
    where?: service_requestWhereInput
    data: XOR<service_requestUpdateWithoutTransportationInput, service_requestUncheckedUpdateWithoutTransportationInput>
  }

  export type service_requestUpdateWithoutTransportationInput = {
    name?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    request_type?: StringFieldUpdateOperationsInput | string
    request_date?: DateTimeFieldUpdateOperationsInput | Date | string
    additional_comments?: NullableStringFieldUpdateOperationsInput | string | null
    employee?: employeeUpdateOneWithoutRequestsNestedInput
    sanitation?: SanitationUpdateOneWithoutService_requestNestedInput
    language?: LanguageUpdateOneWithoutService_requestNestedInput
    audioVisual?: AudioVisualUpdateOneWithoutService_requestNestedInput
    security?: SecurityUpdateOneWithoutService_requestNestedInput
    medicalDevice?: MedicalDeviceUpdateOneWithoutService_requestNestedInput
    facilities?: FacilitiesUpdateOneWithoutService_requestNestedInput
  }

  export type service_requestUncheckedUpdateWithoutTransportationInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    request_type?: StringFieldUpdateOperationsInput | string
    request_date?: DateTimeFieldUpdateOperationsInput | Date | string
    additional_comments?: NullableStringFieldUpdateOperationsInput | string | null
    assigned_employee?: NullableStringFieldUpdateOperationsInput | string | null
    sanitation?: SanitationUncheckedUpdateOneWithoutService_requestNestedInput
    language?: LanguageUncheckedUpdateOneWithoutService_requestNestedInput
    audioVisual?: AudioVisualUncheckedUpdateOneWithoutService_requestNestedInput
    security?: SecurityUncheckedUpdateOneWithoutService_requestNestedInput
    medicalDevice?: MedicalDeviceUncheckedUpdateOneWithoutService_requestNestedInput
    facilities?: FacilitiesUncheckedUpdateOneWithoutService_requestNestedInput
  }

  export type service_requestCreateWithoutAudioVisualInput = {
    name: string
    employee_id: string
    priority: string
    location: string
    department: string
    status: string
    request_type: string
    request_date?: Date | string
    additional_comments?: string | null
    employee?: employeeCreateNestedOneWithoutRequestsInput
    sanitation?: SanitationCreateNestedOneWithoutService_requestInput
    language?: LanguageCreateNestedOneWithoutService_requestInput
    security?: SecurityCreateNestedOneWithoutService_requestInput
    transportation?: TransportationCreateNestedOneWithoutService_requestInput
    medicalDevice?: MedicalDeviceCreateNestedOneWithoutService_requestInput
    facilities?: FacilitiesCreateNestedOneWithoutService_requestInput
  }

  export type service_requestUncheckedCreateWithoutAudioVisualInput = {
    request_id?: number
    name: string
    employee_id: string
    priority: string
    location: string
    department: string
    status: string
    request_type: string
    request_date?: Date | string
    additional_comments?: string | null
    assigned_employee?: string | null
    sanitation?: SanitationUncheckedCreateNestedOneWithoutService_requestInput
    language?: LanguageUncheckedCreateNestedOneWithoutService_requestInput
    security?: SecurityUncheckedCreateNestedOneWithoutService_requestInput
    transportation?: TransportationUncheckedCreateNestedOneWithoutService_requestInput
    medicalDevice?: MedicalDeviceUncheckedCreateNestedOneWithoutService_requestInput
    facilities?: FacilitiesUncheckedCreateNestedOneWithoutService_requestInput
  }

  export type service_requestCreateOrConnectWithoutAudioVisualInput = {
    where: service_requestWhereUniqueInput
    create: XOR<service_requestCreateWithoutAudioVisualInput, service_requestUncheckedCreateWithoutAudioVisualInput>
  }

  export type service_requestUpsertWithoutAudioVisualInput = {
    update: XOR<service_requestUpdateWithoutAudioVisualInput, service_requestUncheckedUpdateWithoutAudioVisualInput>
    create: XOR<service_requestCreateWithoutAudioVisualInput, service_requestUncheckedCreateWithoutAudioVisualInput>
    where?: service_requestWhereInput
  }

  export type service_requestUpdateToOneWithWhereWithoutAudioVisualInput = {
    where?: service_requestWhereInput
    data: XOR<service_requestUpdateWithoutAudioVisualInput, service_requestUncheckedUpdateWithoutAudioVisualInput>
  }

  export type service_requestUpdateWithoutAudioVisualInput = {
    name?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    request_type?: StringFieldUpdateOperationsInput | string
    request_date?: DateTimeFieldUpdateOperationsInput | Date | string
    additional_comments?: NullableStringFieldUpdateOperationsInput | string | null
    employee?: employeeUpdateOneWithoutRequestsNestedInput
    sanitation?: SanitationUpdateOneWithoutService_requestNestedInput
    language?: LanguageUpdateOneWithoutService_requestNestedInput
    security?: SecurityUpdateOneWithoutService_requestNestedInput
    transportation?: TransportationUpdateOneWithoutService_requestNestedInput
    medicalDevice?: MedicalDeviceUpdateOneWithoutService_requestNestedInput
    facilities?: FacilitiesUpdateOneWithoutService_requestNestedInput
  }

  export type service_requestUncheckedUpdateWithoutAudioVisualInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    request_type?: StringFieldUpdateOperationsInput | string
    request_date?: DateTimeFieldUpdateOperationsInput | Date | string
    additional_comments?: NullableStringFieldUpdateOperationsInput | string | null
    assigned_employee?: NullableStringFieldUpdateOperationsInput | string | null
    sanitation?: SanitationUncheckedUpdateOneWithoutService_requestNestedInput
    language?: LanguageUncheckedUpdateOneWithoutService_requestNestedInput
    security?: SecurityUncheckedUpdateOneWithoutService_requestNestedInput
    transportation?: TransportationUncheckedUpdateOneWithoutService_requestNestedInput
    medicalDevice?: MedicalDeviceUncheckedUpdateOneWithoutService_requestNestedInput
    facilities?: FacilitiesUncheckedUpdateOneWithoutService_requestNestedInput
  }

  export type service_requestCreateWithoutSecurityInput = {
    name: string
    employee_id: string
    priority: string
    location: string
    department: string
    status: string
    request_type: string
    request_date?: Date | string
    additional_comments?: string | null
    employee?: employeeCreateNestedOneWithoutRequestsInput
    sanitation?: SanitationCreateNestedOneWithoutService_requestInput
    language?: LanguageCreateNestedOneWithoutService_requestInput
    audioVisual?: AudioVisualCreateNestedOneWithoutService_requestInput
    transportation?: TransportationCreateNestedOneWithoutService_requestInput
    medicalDevice?: MedicalDeviceCreateNestedOneWithoutService_requestInput
    facilities?: FacilitiesCreateNestedOneWithoutService_requestInput
  }

  export type service_requestUncheckedCreateWithoutSecurityInput = {
    request_id?: number
    name: string
    employee_id: string
    priority: string
    location: string
    department: string
    status: string
    request_type: string
    request_date?: Date | string
    additional_comments?: string | null
    assigned_employee?: string | null
    sanitation?: SanitationUncheckedCreateNestedOneWithoutService_requestInput
    language?: LanguageUncheckedCreateNestedOneWithoutService_requestInput
    audioVisual?: AudioVisualUncheckedCreateNestedOneWithoutService_requestInput
    transportation?: TransportationUncheckedCreateNestedOneWithoutService_requestInput
    medicalDevice?: MedicalDeviceUncheckedCreateNestedOneWithoutService_requestInput
    facilities?: FacilitiesUncheckedCreateNestedOneWithoutService_requestInput
  }

  export type service_requestCreateOrConnectWithoutSecurityInput = {
    where: service_requestWhereUniqueInput
    create: XOR<service_requestCreateWithoutSecurityInput, service_requestUncheckedCreateWithoutSecurityInput>
  }

  export type service_requestUpsertWithoutSecurityInput = {
    update: XOR<service_requestUpdateWithoutSecurityInput, service_requestUncheckedUpdateWithoutSecurityInput>
    create: XOR<service_requestCreateWithoutSecurityInput, service_requestUncheckedCreateWithoutSecurityInput>
    where?: service_requestWhereInput
  }

  export type service_requestUpdateToOneWithWhereWithoutSecurityInput = {
    where?: service_requestWhereInput
    data: XOR<service_requestUpdateWithoutSecurityInput, service_requestUncheckedUpdateWithoutSecurityInput>
  }

  export type service_requestUpdateWithoutSecurityInput = {
    name?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    request_type?: StringFieldUpdateOperationsInput | string
    request_date?: DateTimeFieldUpdateOperationsInput | Date | string
    additional_comments?: NullableStringFieldUpdateOperationsInput | string | null
    employee?: employeeUpdateOneWithoutRequestsNestedInput
    sanitation?: SanitationUpdateOneWithoutService_requestNestedInput
    language?: LanguageUpdateOneWithoutService_requestNestedInput
    audioVisual?: AudioVisualUpdateOneWithoutService_requestNestedInput
    transportation?: TransportationUpdateOneWithoutService_requestNestedInput
    medicalDevice?: MedicalDeviceUpdateOneWithoutService_requestNestedInput
    facilities?: FacilitiesUpdateOneWithoutService_requestNestedInput
  }

  export type service_requestUncheckedUpdateWithoutSecurityInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    request_type?: StringFieldUpdateOperationsInput | string
    request_date?: DateTimeFieldUpdateOperationsInput | Date | string
    additional_comments?: NullableStringFieldUpdateOperationsInput | string | null
    assigned_employee?: NullableStringFieldUpdateOperationsInput | string | null
    sanitation?: SanitationUncheckedUpdateOneWithoutService_requestNestedInput
    language?: LanguageUncheckedUpdateOneWithoutService_requestNestedInput
    audioVisual?: AudioVisualUncheckedUpdateOneWithoutService_requestNestedInput
    transportation?: TransportationUncheckedUpdateOneWithoutService_requestNestedInput
    medicalDevice?: MedicalDeviceUncheckedUpdateOneWithoutService_requestNestedInput
    facilities?: FacilitiesUncheckedUpdateOneWithoutService_requestNestedInput
  }

  export type service_requestCreateWithoutMedicalDeviceInput = {
    name: string
    employee_id: string
    priority: string
    location: string
    department: string
    status: string
    request_type: string
    request_date?: Date | string
    additional_comments?: string | null
    employee?: employeeCreateNestedOneWithoutRequestsInput
    sanitation?: SanitationCreateNestedOneWithoutService_requestInput
    language?: LanguageCreateNestedOneWithoutService_requestInput
    audioVisual?: AudioVisualCreateNestedOneWithoutService_requestInput
    security?: SecurityCreateNestedOneWithoutService_requestInput
    transportation?: TransportationCreateNestedOneWithoutService_requestInput
    facilities?: FacilitiesCreateNestedOneWithoutService_requestInput
  }

  export type service_requestUncheckedCreateWithoutMedicalDeviceInput = {
    request_id?: number
    name: string
    employee_id: string
    priority: string
    location: string
    department: string
    status: string
    request_type: string
    request_date?: Date | string
    additional_comments?: string | null
    assigned_employee?: string | null
    sanitation?: SanitationUncheckedCreateNestedOneWithoutService_requestInput
    language?: LanguageUncheckedCreateNestedOneWithoutService_requestInput
    audioVisual?: AudioVisualUncheckedCreateNestedOneWithoutService_requestInput
    security?: SecurityUncheckedCreateNestedOneWithoutService_requestInput
    transportation?: TransportationUncheckedCreateNestedOneWithoutService_requestInput
    facilities?: FacilitiesUncheckedCreateNestedOneWithoutService_requestInput
  }

  export type service_requestCreateOrConnectWithoutMedicalDeviceInput = {
    where: service_requestWhereUniqueInput
    create: XOR<service_requestCreateWithoutMedicalDeviceInput, service_requestUncheckedCreateWithoutMedicalDeviceInput>
  }

  export type service_requestUpsertWithoutMedicalDeviceInput = {
    update: XOR<service_requestUpdateWithoutMedicalDeviceInput, service_requestUncheckedUpdateWithoutMedicalDeviceInput>
    create: XOR<service_requestCreateWithoutMedicalDeviceInput, service_requestUncheckedCreateWithoutMedicalDeviceInput>
    where?: service_requestWhereInput
  }

  export type service_requestUpdateToOneWithWhereWithoutMedicalDeviceInput = {
    where?: service_requestWhereInput
    data: XOR<service_requestUpdateWithoutMedicalDeviceInput, service_requestUncheckedUpdateWithoutMedicalDeviceInput>
  }

  export type service_requestUpdateWithoutMedicalDeviceInput = {
    name?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    request_type?: StringFieldUpdateOperationsInput | string
    request_date?: DateTimeFieldUpdateOperationsInput | Date | string
    additional_comments?: NullableStringFieldUpdateOperationsInput | string | null
    employee?: employeeUpdateOneWithoutRequestsNestedInput
    sanitation?: SanitationUpdateOneWithoutService_requestNestedInput
    language?: LanguageUpdateOneWithoutService_requestNestedInput
    audioVisual?: AudioVisualUpdateOneWithoutService_requestNestedInput
    security?: SecurityUpdateOneWithoutService_requestNestedInput
    transportation?: TransportationUpdateOneWithoutService_requestNestedInput
    facilities?: FacilitiesUpdateOneWithoutService_requestNestedInput
  }

  export type service_requestUncheckedUpdateWithoutMedicalDeviceInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    request_type?: StringFieldUpdateOperationsInput | string
    request_date?: DateTimeFieldUpdateOperationsInput | Date | string
    additional_comments?: NullableStringFieldUpdateOperationsInput | string | null
    assigned_employee?: NullableStringFieldUpdateOperationsInput | string | null
    sanitation?: SanitationUncheckedUpdateOneWithoutService_requestNestedInput
    language?: LanguageUncheckedUpdateOneWithoutService_requestNestedInput
    audioVisual?: AudioVisualUncheckedUpdateOneWithoutService_requestNestedInput
    security?: SecurityUncheckedUpdateOneWithoutService_requestNestedInput
    transportation?: TransportationUncheckedUpdateOneWithoutService_requestNestedInput
    facilities?: FacilitiesUncheckedUpdateOneWithoutService_requestNestedInput
  }

  export type service_requestCreateWithoutFacilitiesInput = {
    name: string
    employee_id: string
    priority: string
    location: string
    department: string
    status: string
    request_type: string
    request_date?: Date | string
    additional_comments?: string | null
    employee?: employeeCreateNestedOneWithoutRequestsInput
    sanitation?: SanitationCreateNestedOneWithoutService_requestInput
    language?: LanguageCreateNestedOneWithoutService_requestInput
    audioVisual?: AudioVisualCreateNestedOneWithoutService_requestInput
    security?: SecurityCreateNestedOneWithoutService_requestInput
    transportation?: TransportationCreateNestedOneWithoutService_requestInput
    medicalDevice?: MedicalDeviceCreateNestedOneWithoutService_requestInput
  }

  export type service_requestUncheckedCreateWithoutFacilitiesInput = {
    request_id?: number
    name: string
    employee_id: string
    priority: string
    location: string
    department: string
    status: string
    request_type: string
    request_date?: Date | string
    additional_comments?: string | null
    assigned_employee?: string | null
    sanitation?: SanitationUncheckedCreateNestedOneWithoutService_requestInput
    language?: LanguageUncheckedCreateNestedOneWithoutService_requestInput
    audioVisual?: AudioVisualUncheckedCreateNestedOneWithoutService_requestInput
    security?: SecurityUncheckedCreateNestedOneWithoutService_requestInput
    transportation?: TransportationUncheckedCreateNestedOneWithoutService_requestInput
    medicalDevice?: MedicalDeviceUncheckedCreateNestedOneWithoutService_requestInput
  }

  export type service_requestCreateOrConnectWithoutFacilitiesInput = {
    where: service_requestWhereUniqueInput
    create: XOR<service_requestCreateWithoutFacilitiesInput, service_requestUncheckedCreateWithoutFacilitiesInput>
  }

  export type service_requestUpsertWithoutFacilitiesInput = {
    update: XOR<service_requestUpdateWithoutFacilitiesInput, service_requestUncheckedUpdateWithoutFacilitiesInput>
    create: XOR<service_requestCreateWithoutFacilitiesInput, service_requestUncheckedCreateWithoutFacilitiesInput>
    where?: service_requestWhereInput
  }

  export type service_requestUpdateToOneWithWhereWithoutFacilitiesInput = {
    where?: service_requestWhereInput
    data: XOR<service_requestUpdateWithoutFacilitiesInput, service_requestUncheckedUpdateWithoutFacilitiesInput>
  }

  export type service_requestUpdateWithoutFacilitiesInput = {
    name?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    request_type?: StringFieldUpdateOperationsInput | string
    request_date?: DateTimeFieldUpdateOperationsInput | Date | string
    additional_comments?: NullableStringFieldUpdateOperationsInput | string | null
    employee?: employeeUpdateOneWithoutRequestsNestedInput
    sanitation?: SanitationUpdateOneWithoutService_requestNestedInput
    language?: LanguageUpdateOneWithoutService_requestNestedInput
    audioVisual?: AudioVisualUpdateOneWithoutService_requestNestedInput
    security?: SecurityUpdateOneWithoutService_requestNestedInput
    transportation?: TransportationUpdateOneWithoutService_requestNestedInput
    medicalDevice?: MedicalDeviceUpdateOneWithoutService_requestNestedInput
  }

  export type service_requestUncheckedUpdateWithoutFacilitiesInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    request_type?: StringFieldUpdateOperationsInput | string
    request_date?: DateTimeFieldUpdateOperationsInput | Date | string
    additional_comments?: NullableStringFieldUpdateOperationsInput | string | null
    assigned_employee?: NullableStringFieldUpdateOperationsInput | string | null
    sanitation?: SanitationUncheckedUpdateOneWithoutService_requestNestedInput
    language?: LanguageUncheckedUpdateOneWithoutService_requestNestedInput
    audioVisual?: AudioVisualUncheckedUpdateOneWithoutService_requestNestedInput
    security?: SecurityUncheckedUpdateOneWithoutService_requestNestedInput
    transportation?: TransportationUncheckedUpdateOneWithoutService_requestNestedInput
    medicalDevice?: MedicalDeviceUncheckedUpdateOneWithoutService_requestNestedInput
  }

  export type edgesCreateWithoutSourceNodeInput = {
    weight: number
    targetNode: nodesCreateNestedOneWithoutIncomingEdgesInput
  }

  export type edgesUncheckedCreateWithoutSourceNodeInput = {
    id?: number
    targetId: number
    weight: number
  }

  export type edgesCreateOrConnectWithoutSourceNodeInput = {
    where: edgesWhereUniqueInput
    create: XOR<edgesCreateWithoutSourceNodeInput, edgesUncheckedCreateWithoutSourceNodeInput>
  }

  export type edgesCreateManySourceNodeInputEnvelope = {
    data: edgesCreateManySourceNodeInput | edgesCreateManySourceNodeInput[]
    skipDuplicates?: boolean
  }

  export type edgesCreateWithoutTargetNodeInput = {
    weight: number
    sourceNode: nodesCreateNestedOneWithoutOutgoingEdgesInput
  }

  export type edgesUncheckedCreateWithoutTargetNodeInput = {
    id?: number
    sourceId: number
    weight: number
  }

  export type edgesCreateOrConnectWithoutTargetNodeInput = {
    where: edgesWhereUniqueInput
    create: XOR<edgesCreateWithoutTargetNodeInput, edgesUncheckedCreateWithoutTargetNodeInput>
  }

  export type edgesCreateManyTargetNodeInputEnvelope = {
    data: edgesCreateManyTargetNodeInput | edgesCreateManyTargetNodeInput[]
    skipDuplicates?: boolean
  }

  export type edgesUpsertWithWhereUniqueWithoutSourceNodeInput = {
    where: edgesWhereUniqueInput
    update: XOR<edgesUpdateWithoutSourceNodeInput, edgesUncheckedUpdateWithoutSourceNodeInput>
    create: XOR<edgesCreateWithoutSourceNodeInput, edgesUncheckedCreateWithoutSourceNodeInput>
  }

  export type edgesUpdateWithWhereUniqueWithoutSourceNodeInput = {
    where: edgesWhereUniqueInput
    data: XOR<edgesUpdateWithoutSourceNodeInput, edgesUncheckedUpdateWithoutSourceNodeInput>
  }

  export type edgesUpdateManyWithWhereWithoutSourceNodeInput = {
    where: edgesScalarWhereInput
    data: XOR<edgesUpdateManyMutationInput, edgesUncheckedUpdateManyWithoutSourceNodeInput>
  }

  export type edgesScalarWhereInput = {
    AND?: edgesScalarWhereInput | edgesScalarWhereInput[]
    OR?: edgesScalarWhereInput[]
    NOT?: edgesScalarWhereInput | edgesScalarWhereInput[]
    id?: IntFilter<"edges"> | number
    sourceId?: IntFilter<"edges"> | number
    targetId?: IntFilter<"edges"> | number
    weight?: FloatFilter<"edges"> | number
  }

  export type edgesUpsertWithWhereUniqueWithoutTargetNodeInput = {
    where: edgesWhereUniqueInput
    update: XOR<edgesUpdateWithoutTargetNodeInput, edgesUncheckedUpdateWithoutTargetNodeInput>
    create: XOR<edgesCreateWithoutTargetNodeInput, edgesUncheckedCreateWithoutTargetNodeInput>
  }

  export type edgesUpdateWithWhereUniqueWithoutTargetNodeInput = {
    where: edgesWhereUniqueInput
    data: XOR<edgesUpdateWithoutTargetNodeInput, edgesUncheckedUpdateWithoutTargetNodeInput>
  }

  export type edgesUpdateManyWithWhereWithoutTargetNodeInput = {
    where: edgesScalarWhereInput
    data: XOR<edgesUpdateManyMutationInput, edgesUncheckedUpdateManyWithoutTargetNodeInput>
  }

  export type nodesCreateWithoutOutgoingEdgesInput = {
    building: string
    floor: number
    name?: string | null
    x: number
    y: number
    edgeCost?: number
    totalCost?: number
    incomingEdges?: edgesCreateNestedManyWithoutTargetNodeInput
  }

  export type nodesUncheckedCreateWithoutOutgoingEdgesInput = {
    id?: number
    building: string
    floor: number
    name?: string | null
    x: number
    y: number
    edgeCost?: number
    totalCost?: number
    incomingEdges?: edgesUncheckedCreateNestedManyWithoutTargetNodeInput
  }

  export type nodesCreateOrConnectWithoutOutgoingEdgesInput = {
    where: nodesWhereUniqueInput
    create: XOR<nodesCreateWithoutOutgoingEdgesInput, nodesUncheckedCreateWithoutOutgoingEdgesInput>
  }

  export type nodesCreateWithoutIncomingEdgesInput = {
    building: string
    floor: number
    name?: string | null
    x: number
    y: number
    edgeCost?: number
    totalCost?: number
    outgoingEdges?: edgesCreateNestedManyWithoutSourceNodeInput
  }

  export type nodesUncheckedCreateWithoutIncomingEdgesInput = {
    id?: number
    building: string
    floor: number
    name?: string | null
    x: number
    y: number
    edgeCost?: number
    totalCost?: number
    outgoingEdges?: edgesUncheckedCreateNestedManyWithoutSourceNodeInput
  }

  export type nodesCreateOrConnectWithoutIncomingEdgesInput = {
    where: nodesWhereUniqueInput
    create: XOR<nodesCreateWithoutIncomingEdgesInput, nodesUncheckedCreateWithoutIncomingEdgesInput>
  }

  export type nodesUpsertWithoutOutgoingEdgesInput = {
    update: XOR<nodesUpdateWithoutOutgoingEdgesInput, nodesUncheckedUpdateWithoutOutgoingEdgesInput>
    create: XOR<nodesCreateWithoutOutgoingEdgesInput, nodesUncheckedCreateWithoutOutgoingEdgesInput>
    where?: nodesWhereInput
  }

  export type nodesUpdateToOneWithWhereWithoutOutgoingEdgesInput = {
    where?: nodesWhereInput
    data: XOR<nodesUpdateWithoutOutgoingEdgesInput, nodesUncheckedUpdateWithoutOutgoingEdgesInput>
  }

  export type nodesUpdateWithoutOutgoingEdgesInput = {
    building?: StringFieldUpdateOperationsInput | string
    floor?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    x?: FloatFieldUpdateOperationsInput | number
    y?: FloatFieldUpdateOperationsInput | number
    edgeCost?: IntFieldUpdateOperationsInput | number
    totalCost?: IntFieldUpdateOperationsInput | number
    incomingEdges?: edgesUpdateManyWithoutTargetNodeNestedInput
  }

  export type nodesUncheckedUpdateWithoutOutgoingEdgesInput = {
    id?: IntFieldUpdateOperationsInput | number
    building?: StringFieldUpdateOperationsInput | string
    floor?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    x?: FloatFieldUpdateOperationsInput | number
    y?: FloatFieldUpdateOperationsInput | number
    edgeCost?: IntFieldUpdateOperationsInput | number
    totalCost?: IntFieldUpdateOperationsInput | number
    incomingEdges?: edgesUncheckedUpdateManyWithoutTargetNodeNestedInput
  }

  export type nodesUpsertWithoutIncomingEdgesInput = {
    update: XOR<nodesUpdateWithoutIncomingEdgesInput, nodesUncheckedUpdateWithoutIncomingEdgesInput>
    create: XOR<nodesCreateWithoutIncomingEdgesInput, nodesUncheckedCreateWithoutIncomingEdgesInput>
    where?: nodesWhereInput
  }

  export type nodesUpdateToOneWithWhereWithoutIncomingEdgesInput = {
    where?: nodesWhereInput
    data: XOR<nodesUpdateWithoutIncomingEdgesInput, nodesUncheckedUpdateWithoutIncomingEdgesInput>
  }

  export type nodesUpdateWithoutIncomingEdgesInput = {
    building?: StringFieldUpdateOperationsInput | string
    floor?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    x?: FloatFieldUpdateOperationsInput | number
    y?: FloatFieldUpdateOperationsInput | number
    edgeCost?: IntFieldUpdateOperationsInput | number
    totalCost?: IntFieldUpdateOperationsInput | number
    outgoingEdges?: edgesUpdateManyWithoutSourceNodeNestedInput
  }

  export type nodesUncheckedUpdateWithoutIncomingEdgesInput = {
    id?: IntFieldUpdateOperationsInput | number
    building?: StringFieldUpdateOperationsInput | string
    floor?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    x?: FloatFieldUpdateOperationsInput | number
    y?: FloatFieldUpdateOperationsInput | number
    edgeCost?: IntFieldUpdateOperationsInput | number
    totalCost?: IntFieldUpdateOperationsInput | number
    outgoingEdges?: edgesUncheckedUpdateManyWithoutSourceNodeNestedInput
  }

  export type service_requestCreateManyEmployeeInput = {
    request_id?: number
    name: string
    employee_id: string
    priority: string
    location: string
    department: string
    status: string
    request_type: string
    request_date?: Date | string
    additional_comments?: string | null
  }

  export type service_requestUpdateWithoutEmployeeInput = {
    name?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    request_type?: StringFieldUpdateOperationsInput | string
    request_date?: DateTimeFieldUpdateOperationsInput | Date | string
    additional_comments?: NullableStringFieldUpdateOperationsInput | string | null
    sanitation?: SanitationUpdateOneWithoutService_requestNestedInput
    language?: LanguageUpdateOneWithoutService_requestNestedInput
    audioVisual?: AudioVisualUpdateOneWithoutService_requestNestedInput
    security?: SecurityUpdateOneWithoutService_requestNestedInput
    transportation?: TransportationUpdateOneWithoutService_requestNestedInput
    medicalDevice?: MedicalDeviceUpdateOneWithoutService_requestNestedInput
    facilities?: FacilitiesUpdateOneWithoutService_requestNestedInput
  }

  export type service_requestUncheckedUpdateWithoutEmployeeInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    request_type?: StringFieldUpdateOperationsInput | string
    request_date?: DateTimeFieldUpdateOperationsInput | Date | string
    additional_comments?: NullableStringFieldUpdateOperationsInput | string | null
    sanitation?: SanitationUncheckedUpdateOneWithoutService_requestNestedInput
    language?: LanguageUncheckedUpdateOneWithoutService_requestNestedInput
    audioVisual?: AudioVisualUncheckedUpdateOneWithoutService_requestNestedInput
    security?: SecurityUncheckedUpdateOneWithoutService_requestNestedInput
    transportation?: TransportationUncheckedUpdateOneWithoutService_requestNestedInput
    medicalDevice?: MedicalDeviceUncheckedUpdateOneWithoutService_requestNestedInput
    facilities?: FacilitiesUncheckedUpdateOneWithoutService_requestNestedInput
  }

  export type service_requestUncheckedUpdateManyWithoutEmployeeInput = {
    request_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    request_type?: StringFieldUpdateOperationsInput | string
    request_date?: DateTimeFieldUpdateOperationsInput | Date | string
    additional_comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type edgesCreateManySourceNodeInput = {
    id?: number
    targetId: number
    weight: number
  }

  export type edgesCreateManyTargetNodeInput = {
    id?: number
    sourceId: number
    weight: number
  }

  export type edgesUpdateWithoutSourceNodeInput = {
    weight?: FloatFieldUpdateOperationsInput | number
    targetNode?: nodesUpdateOneRequiredWithoutIncomingEdgesNestedInput
  }

  export type edgesUncheckedUpdateWithoutSourceNodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    targetId?: IntFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
  }

  export type edgesUncheckedUpdateManyWithoutSourceNodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    targetId?: IntFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
  }

  export type edgesUpdateWithoutTargetNodeInput = {
    weight?: FloatFieldUpdateOperationsInput | number
    sourceNode?: nodesUpdateOneRequiredWithoutOutgoingEdgesNestedInput
  }

  export type edgesUncheckedUpdateWithoutTargetNodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    sourceId?: IntFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
  }

  export type edgesUncheckedUpdateManyWithoutTargetNodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    sourceId?: IntFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}