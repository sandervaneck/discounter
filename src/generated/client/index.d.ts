
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Item
 * 
 */
export type Item = $Result.DefaultSelection<Prisma.$ItemPayload>
/**
 * Model DiscountCode
 * 
 */
export type DiscountCode = $Result.DefaultSelection<Prisma.$DiscountCodePayload>
/**
 * Model DiscountCodeItem
 * 
 */
export type DiscountCodeItem = $Result.DefaultSelection<Prisma.$DiscountCodeItemPayload>
/**
 * Model Redemption
 * 
 */
export type Redemption = $Result.DefaultSelection<Prisma.$RedemptionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserType: {
  influencer: 'influencer',
  business: 'business'
};

export type UserType = (typeof UserType)[keyof typeof UserType]


export const DiscountStatus: {
  available: 'available',
  awarded: 'awarded',
  used: 'used',
  expired: 'expired'
};

export type DiscountStatus = (typeof DiscountStatus)[keyof typeof DiscountStatus]


export const Platform: {
  Instagram: 'Instagram',
  TikTok: 'TikTok'
};

export type Platform = (typeof Platform)[keyof typeof Platform]

}

export type UserType = $Enums.UserType

export const UserType: typeof $Enums.UserType

export type DiscountStatus = $Enums.DiscountStatus

export const DiscountStatus: typeof $Enums.DiscountStatus

export type Platform = $Enums.Platform

export const Platform: typeof $Enums.Platform

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.item`: Exposes CRUD operations for the **Item** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Items
    * const items = await prisma.item.findMany()
    * ```
    */
  get item(): Prisma.ItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.discountCode`: Exposes CRUD operations for the **DiscountCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DiscountCodes
    * const discountCodes = await prisma.discountCode.findMany()
    * ```
    */
  get discountCode(): Prisma.DiscountCodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.discountCodeItem`: Exposes CRUD operations for the **DiscountCodeItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DiscountCodeItems
    * const discountCodeItems = await prisma.discountCodeItem.findMany()
    * ```
    */
  get discountCodeItem(): Prisma.DiscountCodeItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.redemption`: Exposes CRUD operations for the **Redemption** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Redemptions
    * const redemptions = await prisma.redemption.findMany()
    * ```
    */
  get redemption(): Prisma.RedemptionDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
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
    User: 'User',
    Item: 'Item',
    DiscountCode: 'DiscountCode',
    DiscountCodeItem: 'DiscountCodeItem',
    Redemption: 'Redemption'
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
      modelProps: "user" | "item" | "discountCode" | "discountCodeItem" | "redemption"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Item: {
        payload: Prisma.$ItemPayload<ExtArgs>
        fields: Prisma.ItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          findFirst: {
            args: Prisma.ItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          findMany: {
            args: Prisma.ItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>[]
          }
          create: {
            args: Prisma.ItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          createMany: {
            args: Prisma.ItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>[]
          }
          delete: {
            args: Prisma.ItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          update: {
            args: Prisma.ItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          deleteMany: {
            args: Prisma.ItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>[]
          }
          upsert: {
            args: Prisma.ItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          aggregate: {
            args: Prisma.ItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItem>
          }
          groupBy: {
            args: Prisma.ItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemCountArgs<ExtArgs>
            result: $Utils.Optional<ItemCountAggregateOutputType> | number
          }
        }
      }
      DiscountCode: {
        payload: Prisma.$DiscountCodePayload<ExtArgs>
        fields: Prisma.DiscountCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DiscountCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscountCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DiscountCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscountCodePayload>
          }
          findFirst: {
            args: Prisma.DiscountCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscountCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DiscountCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscountCodePayload>
          }
          findMany: {
            args: Prisma.DiscountCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscountCodePayload>[]
          }
          create: {
            args: Prisma.DiscountCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscountCodePayload>
          }
          createMany: {
            args: Prisma.DiscountCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DiscountCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscountCodePayload>[]
          }
          delete: {
            args: Prisma.DiscountCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscountCodePayload>
          }
          update: {
            args: Prisma.DiscountCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscountCodePayload>
          }
          deleteMany: {
            args: Prisma.DiscountCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DiscountCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DiscountCodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscountCodePayload>[]
          }
          upsert: {
            args: Prisma.DiscountCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscountCodePayload>
          }
          aggregate: {
            args: Prisma.DiscountCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDiscountCode>
          }
          groupBy: {
            args: Prisma.DiscountCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<DiscountCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.DiscountCodeCountArgs<ExtArgs>
            result: $Utils.Optional<DiscountCodeCountAggregateOutputType> | number
          }
        }
      }
      DiscountCodeItem: {
        payload: Prisma.$DiscountCodeItemPayload<ExtArgs>
        fields: Prisma.DiscountCodeItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DiscountCodeItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscountCodeItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DiscountCodeItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscountCodeItemPayload>
          }
          findFirst: {
            args: Prisma.DiscountCodeItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscountCodeItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DiscountCodeItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscountCodeItemPayload>
          }
          findMany: {
            args: Prisma.DiscountCodeItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscountCodeItemPayload>[]
          }
          create: {
            args: Prisma.DiscountCodeItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscountCodeItemPayload>
          }
          createMany: {
            args: Prisma.DiscountCodeItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DiscountCodeItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscountCodeItemPayload>[]
          }
          delete: {
            args: Prisma.DiscountCodeItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscountCodeItemPayload>
          }
          update: {
            args: Prisma.DiscountCodeItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscountCodeItemPayload>
          }
          deleteMany: {
            args: Prisma.DiscountCodeItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DiscountCodeItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DiscountCodeItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscountCodeItemPayload>[]
          }
          upsert: {
            args: Prisma.DiscountCodeItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscountCodeItemPayload>
          }
          aggregate: {
            args: Prisma.DiscountCodeItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDiscountCodeItem>
          }
          groupBy: {
            args: Prisma.DiscountCodeItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<DiscountCodeItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.DiscountCodeItemCountArgs<ExtArgs>
            result: $Utils.Optional<DiscountCodeItemCountAggregateOutputType> | number
          }
        }
      }
      Redemption: {
        payload: Prisma.$RedemptionPayload<ExtArgs>
        fields: Prisma.RedemptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RedemptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedemptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RedemptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedemptionPayload>
          }
          findFirst: {
            args: Prisma.RedemptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedemptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RedemptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedemptionPayload>
          }
          findMany: {
            args: Prisma.RedemptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedemptionPayload>[]
          }
          create: {
            args: Prisma.RedemptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedemptionPayload>
          }
          createMany: {
            args: Prisma.RedemptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RedemptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedemptionPayload>[]
          }
          delete: {
            args: Prisma.RedemptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedemptionPayload>
          }
          update: {
            args: Prisma.RedemptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedemptionPayload>
          }
          deleteMany: {
            args: Prisma.RedemptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RedemptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RedemptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedemptionPayload>[]
          }
          upsert: {
            args: Prisma.RedemptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedemptionPayload>
          }
          aggregate: {
            args: Prisma.RedemptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRedemption>
          }
          groupBy: {
            args: Prisma.RedemptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RedemptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RedemptionCountArgs<ExtArgs>
            result: $Utils.Optional<RedemptionCountAggregateOutputType> | number
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
    user?: UserOmit
    item?: ItemOmit
    discountCode?: DiscountCodeOmit
    discountCodeItem?: DiscountCodeItemOmit
    redemption?: RedemptionOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    discounts: number
    items: number
    redemptions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    discounts?: boolean | UserCountOutputTypeCountDiscountsArgs
    items?: boolean | UserCountOutputTypeCountItemsArgs
    redemptions?: boolean | UserCountOutputTypeCountRedemptionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDiscountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiscountCodeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRedemptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RedemptionWhereInput
  }


  /**
   * Count Type ItemCountOutputType
   */

  export type ItemCountOutputType = {
    discounts: number
  }

  export type ItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    discounts?: boolean | ItemCountOutputTypeCountDiscountsArgs
  }

  // Custom InputTypes
  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemCountOutputType
     */
    select?: ItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeCountDiscountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiscountCodeItemWhereInput
  }


  /**
   * Count Type DiscountCodeCountOutputType
   */

  export type DiscountCodeCountOutputType = {
    applicableItems: number
    redemptions: number
  }

  export type DiscountCodeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applicableItems?: boolean | DiscountCodeCountOutputTypeCountApplicableItemsArgs
    redemptions?: boolean | DiscountCodeCountOutputTypeCountRedemptionsArgs
  }

  // Custom InputTypes
  /**
   * DiscountCodeCountOutputType without action
   */
  export type DiscountCodeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCodeCountOutputType
     */
    select?: DiscountCodeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DiscountCodeCountOutputType without action
   */
  export type DiscountCodeCountOutputTypeCountApplicableItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiscountCodeItemWhereInput
  }

  /**
   * DiscountCodeCountOutputType without action
   */
  export type DiscountCodeCountOutputTypeCountRedemptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RedemptionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    userType: $Enums.UserType | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    userType: $Enums.UserType | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    userType: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    userType?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    userType?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    userType?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    password: string
    userType: $Enums.UserType
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    userType?: boolean
    discounts?: boolean | User$discountsArgs<ExtArgs>
    items?: boolean | User$itemsArgs<ExtArgs>
    redemptions?: boolean | User$redemptionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    userType?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    userType?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    userType?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "userType", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    discounts?: boolean | User$discountsArgs<ExtArgs>
    items?: boolean | User$itemsArgs<ExtArgs>
    redemptions?: boolean | User$redemptionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      discounts: Prisma.$DiscountCodePayload<ExtArgs>[]
      items: Prisma.$ItemPayload<ExtArgs>[]
      redemptions: Prisma.$RedemptionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      userType: $Enums.UserType
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    discounts<T extends User$discountsArgs<ExtArgs> = {}>(args?: Subset<T, User$discountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscountCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    items<T extends User$itemsArgs<ExtArgs> = {}>(args?: Subset<T, User$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    redemptions<T extends User$redemptionsArgs<ExtArgs> = {}>(args?: Subset<T, User$redemptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RedemptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly userType: FieldRef<"User", 'UserType'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.discounts
   */
  export type User$discountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCode
     */
    select?: DiscountCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCode
     */
    omit?: DiscountCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeInclude<ExtArgs> | null
    where?: DiscountCodeWhereInput
    orderBy?: DiscountCodeOrderByWithRelationInput | DiscountCodeOrderByWithRelationInput[]
    cursor?: DiscountCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DiscountCodeScalarFieldEnum | DiscountCodeScalarFieldEnum[]
  }

  /**
   * User.items
   */
  export type User$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    cursor?: ItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * User.redemptions
   */
  export type User$redemptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Redemption
     */
    select?: RedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Redemption
     */
    omit?: RedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedemptionInclude<ExtArgs> | null
    where?: RedemptionWhereInput
    orderBy?: RedemptionOrderByWithRelationInput | RedemptionOrderByWithRelationInput[]
    cursor?: RedemptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RedemptionScalarFieldEnum | RedemptionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Item
   */

  export type AggregateItem = {
    _count: ItemCountAggregateOutputType | null
    _avg: ItemAvgAggregateOutputType | null
    _sum: ItemSumAggregateOutputType | null
    _min: ItemMinAggregateOutputType | null
    _max: ItemMaxAggregateOutputType | null
  }

  export type ItemAvgAggregateOutputType = {
    id: number | null
    restaurantId: number | null
  }

  export type ItemSumAggregateOutputType = {
    id: number | null
    restaurantId: number | null
  }

  export type ItemMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    restaurantId: number | null
  }

  export type ItemMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    restaurantId: number | null
  }

  export type ItemCountAggregateOutputType = {
    id: number
    name: number
    description: number
    restaurantId: number
    _all: number
  }


  export type ItemAvgAggregateInputType = {
    id?: true
    restaurantId?: true
  }

  export type ItemSumAggregateInputType = {
    id?: true
    restaurantId?: true
  }

  export type ItemMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    restaurantId?: true
  }

  export type ItemMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    restaurantId?: true
  }

  export type ItemCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    restaurantId?: true
    _all?: true
  }

  export type ItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Item to aggregate.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Items
    **/
    _count?: true | ItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemMaxAggregateInputType
  }

  export type GetItemAggregateType<T extends ItemAggregateArgs> = {
        [P in keyof T & keyof AggregateItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItem[P]>
      : GetScalarType<T[P], AggregateItem[P]>
  }




  export type ItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithAggregationInput | ItemOrderByWithAggregationInput[]
    by: ItemScalarFieldEnum[] | ItemScalarFieldEnum
    having?: ItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemCountAggregateInputType | true
    _avg?: ItemAvgAggregateInputType
    _sum?: ItemSumAggregateInputType
    _min?: ItemMinAggregateInputType
    _max?: ItemMaxAggregateInputType
  }

  export type ItemGroupByOutputType = {
    id: number
    name: string
    description: string | null
    restaurantId: number
    _count: ItemCountAggregateOutputType | null
    _avg: ItemAvgAggregateOutputType | null
    _sum: ItemSumAggregateOutputType | null
    _min: ItemMinAggregateOutputType | null
    _max: ItemMaxAggregateOutputType | null
  }

  type GetItemGroupByPayload<T extends ItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemGroupByOutputType[P]>
            : GetScalarType<T[P], ItemGroupByOutputType[P]>
        }
      >
    >


  export type ItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    restaurantId?: boolean
    discounts?: boolean | Item$discountsArgs<ExtArgs>
    restaurant?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | ItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["item"]>

  export type ItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    restaurantId?: boolean
    restaurant?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["item"]>

  export type ItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    restaurantId?: boolean
    restaurant?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["item"]>

  export type ItemSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    restaurantId?: boolean
  }

  export type ItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "restaurantId", ExtArgs["result"]["item"]>
  export type ItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    discounts?: boolean | Item$discountsArgs<ExtArgs>
    restaurant?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | ItemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restaurant?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restaurant?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Item"
    objects: {
      discounts: Prisma.$DiscountCodeItemPayload<ExtArgs>[]
      restaurant: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      restaurantId: number
    }, ExtArgs["result"]["item"]>
    composites: {}
  }

  type ItemGetPayload<S extends boolean | null | undefined | ItemDefaultArgs> = $Result.GetResult<Prisma.$ItemPayload, S>

  type ItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemCountAggregateInputType | true
    }

  export interface ItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Item'], meta: { name: 'Item' } }
    /**
     * Find zero or one Item that matches the filter.
     * @param {ItemFindUniqueArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemFindUniqueArgs>(args: SelectSubset<T, ItemFindUniqueArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Item that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemFindUniqueOrThrowArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindFirstArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemFindFirstArgs>(args?: SelectSubset<T, ItemFindFirstArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindFirstOrThrowArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Items
     * const items = await prisma.item.findMany()
     * 
     * // Get first 10 Items
     * const items = await prisma.item.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemWithIdOnly = await prisma.item.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemFindManyArgs>(args?: SelectSubset<T, ItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Item.
     * @param {ItemCreateArgs} args - Arguments to create a Item.
     * @example
     * // Create one Item
     * const Item = await prisma.item.create({
     *   data: {
     *     // ... data to create a Item
     *   }
     * })
     * 
     */
    create<T extends ItemCreateArgs>(args: SelectSubset<T, ItemCreateArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Items.
     * @param {ItemCreateManyArgs} args - Arguments to create many Items.
     * @example
     * // Create many Items
     * const item = await prisma.item.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemCreateManyArgs>(args?: SelectSubset<T, ItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Items and returns the data saved in the database.
     * @param {ItemCreateManyAndReturnArgs} args - Arguments to create many Items.
     * @example
     * // Create many Items
     * const item = await prisma.item.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Items and only return the `id`
     * const itemWithIdOnly = await prisma.item.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItemCreateManyAndReturnArgs>(args?: SelectSubset<T, ItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Item.
     * @param {ItemDeleteArgs} args - Arguments to delete one Item.
     * @example
     * // Delete one Item
     * const Item = await prisma.item.delete({
     *   where: {
     *     // ... filter to delete one Item
     *   }
     * })
     * 
     */
    delete<T extends ItemDeleteArgs>(args: SelectSubset<T, ItemDeleteArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Item.
     * @param {ItemUpdateArgs} args - Arguments to update one Item.
     * @example
     * // Update one Item
     * const item = await prisma.item.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemUpdateArgs>(args: SelectSubset<T, ItemUpdateArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Items.
     * @param {ItemDeleteManyArgs} args - Arguments to filter Items to delete.
     * @example
     * // Delete a few Items
     * const { count } = await prisma.item.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemDeleteManyArgs>(args?: SelectSubset<T, ItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Items
     * const item = await prisma.item.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemUpdateManyArgs>(args: SelectSubset<T, ItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Items and returns the data updated in the database.
     * @param {ItemUpdateManyAndReturnArgs} args - Arguments to update many Items.
     * @example
     * // Update many Items
     * const item = await prisma.item.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Items and only return the `id`
     * const itemWithIdOnly = await prisma.item.updateManyAndReturn({
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
    updateManyAndReturn<T extends ItemUpdateManyAndReturnArgs>(args: SelectSubset<T, ItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Item.
     * @param {ItemUpsertArgs} args - Arguments to update or create a Item.
     * @example
     * // Update or create a Item
     * const item = await prisma.item.upsert({
     *   create: {
     *     // ... data to create a Item
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Item we want to update
     *   }
     * })
     */
    upsert<T extends ItemUpsertArgs>(args: SelectSubset<T, ItemUpsertArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemCountArgs} args - Arguments to filter Items to count.
     * @example
     * // Count the number of Items
     * const count = await prisma.item.count({
     *   where: {
     *     // ... the filter for the Items we want to count
     *   }
     * })
    **/
    count<T extends ItemCountArgs>(
      args?: Subset<T, ItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ItemAggregateArgs>(args: Subset<T, ItemAggregateArgs>): Prisma.PrismaPromise<GetItemAggregateType<T>>

    /**
     * Group by Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemGroupByArgs} args - Group by arguments.
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
      T extends ItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemGroupByArgs['orderBy'] }
        : { orderBy?: ItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Item model
   */
  readonly fields: ItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Item.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    discounts<T extends Item$discountsArgs<ExtArgs> = {}>(args?: Subset<T, Item$discountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscountCodeItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    restaurant<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Item model
   */
  interface ItemFieldRefs {
    readonly id: FieldRef<"Item", 'Int'>
    readonly name: FieldRef<"Item", 'String'>
    readonly description: FieldRef<"Item", 'String'>
    readonly restaurantId: FieldRef<"Item", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Item findUnique
   */
  export type ItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item findUniqueOrThrow
   */
  export type ItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item findFirst
   */
  export type ItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Items.
     */
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item findFirstOrThrow
   */
  export type ItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Items.
     */
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item findMany
   */
  export type ItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Items to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item create
   */
  export type ItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The data needed to create a Item.
     */
    data: XOR<ItemCreateInput, ItemUncheckedCreateInput>
  }

  /**
   * Item createMany
   */
  export type ItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Items.
     */
    data: ItemCreateManyInput | ItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Item createManyAndReturn
   */
  export type ItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * The data used to create many Items.
     */
    data: ItemCreateManyInput | ItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Item update
   */
  export type ItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The data needed to update a Item.
     */
    data: XOR<ItemUpdateInput, ItemUncheckedUpdateInput>
    /**
     * Choose, which Item to update.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item updateMany
   */
  export type ItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Items.
     */
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyInput>
    /**
     * Filter which Items to update
     */
    where?: ItemWhereInput
    /**
     * Limit how many Items to update.
     */
    limit?: number
  }

  /**
   * Item updateManyAndReturn
   */
  export type ItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * The data used to update Items.
     */
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyInput>
    /**
     * Filter which Items to update
     */
    where?: ItemWhereInput
    /**
     * Limit how many Items to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Item upsert
   */
  export type ItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The filter to search for the Item to update in case it exists.
     */
    where: ItemWhereUniqueInput
    /**
     * In case the Item found by the `where` argument doesn't exist, create a new Item with this data.
     */
    create: XOR<ItemCreateInput, ItemUncheckedCreateInput>
    /**
     * In case the Item was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemUpdateInput, ItemUncheckedUpdateInput>
  }

  /**
   * Item delete
   */
  export type ItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter which Item to delete.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item deleteMany
   */
  export type ItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Items to delete
     */
    where?: ItemWhereInput
    /**
     * Limit how many Items to delete.
     */
    limit?: number
  }

  /**
   * Item.discounts
   */
  export type Item$discountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCodeItem
     */
    select?: DiscountCodeItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCodeItem
     */
    omit?: DiscountCodeItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeItemInclude<ExtArgs> | null
    where?: DiscountCodeItemWhereInput
    orderBy?: DiscountCodeItemOrderByWithRelationInput | DiscountCodeItemOrderByWithRelationInput[]
    cursor?: DiscountCodeItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DiscountCodeItemScalarFieldEnum | DiscountCodeItemScalarFieldEnum[]
  }

  /**
   * Item without action
   */
  export type ItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
  }


  /**
   * Model DiscountCode
   */

  export type AggregateDiscountCode = {
    _count: DiscountCodeCountAggregateOutputType | null
    _avg: DiscountCodeAvgAggregateOutputType | null
    _sum: DiscountCodeSumAggregateOutputType | null
    _min: DiscountCodeMinAggregateOutputType | null
    _max: DiscountCodeMaxAggregateOutputType | null
  }

  export type DiscountCodeAvgAggregateOutputType = {
    id: number | null
    discountPercent: number | null
    restaurantId: number | null
  }

  export type DiscountCodeSumAggregateOutputType = {
    id: number | null
    discountPercent: number | null
    restaurantId: number | null
  }

  export type DiscountCodeMinAggregateOutputType = {
    id: number | null
    code: string | null
    activationTime: Date | null
    expirationTime: Date | null
    discountPercent: number | null
    restaurantId: number | null
  }

  export type DiscountCodeMaxAggregateOutputType = {
    id: number | null
    code: string | null
    activationTime: Date | null
    expirationTime: Date | null
    discountPercent: number | null
    restaurantId: number | null
  }

  export type DiscountCodeCountAggregateOutputType = {
    id: number
    code: number
    activationTime: number
    expirationTime: number
    discountPercent: number
    requirements: number
    restaurantId: number
    _all: number
  }


  export type DiscountCodeAvgAggregateInputType = {
    id?: true
    discountPercent?: true
    restaurantId?: true
  }

  export type DiscountCodeSumAggregateInputType = {
    id?: true
    discountPercent?: true
    restaurantId?: true
  }

  export type DiscountCodeMinAggregateInputType = {
    id?: true
    code?: true
    activationTime?: true
    expirationTime?: true
    discountPercent?: true
    restaurantId?: true
  }

  export type DiscountCodeMaxAggregateInputType = {
    id?: true
    code?: true
    activationTime?: true
    expirationTime?: true
    discountPercent?: true
    restaurantId?: true
  }

  export type DiscountCodeCountAggregateInputType = {
    id?: true
    code?: true
    activationTime?: true
    expirationTime?: true
    discountPercent?: true
    requirements?: true
    restaurantId?: true
    _all?: true
  }

  export type DiscountCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DiscountCode to aggregate.
     */
    where?: DiscountCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscountCodes to fetch.
     */
    orderBy?: DiscountCodeOrderByWithRelationInput | DiscountCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DiscountCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscountCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscountCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DiscountCodes
    **/
    _count?: true | DiscountCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DiscountCodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DiscountCodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DiscountCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DiscountCodeMaxAggregateInputType
  }

  export type GetDiscountCodeAggregateType<T extends DiscountCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateDiscountCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDiscountCode[P]>
      : GetScalarType<T[P], AggregateDiscountCode[P]>
  }




  export type DiscountCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiscountCodeWhereInput
    orderBy?: DiscountCodeOrderByWithAggregationInput | DiscountCodeOrderByWithAggregationInput[]
    by: DiscountCodeScalarFieldEnum[] | DiscountCodeScalarFieldEnum
    having?: DiscountCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DiscountCodeCountAggregateInputType | true
    _avg?: DiscountCodeAvgAggregateInputType
    _sum?: DiscountCodeSumAggregateInputType
    _min?: DiscountCodeMinAggregateInputType
    _max?: DiscountCodeMaxAggregateInputType
  }

  export type DiscountCodeGroupByOutputType = {
    id: number
    code: string
    activationTime: Date
    expirationTime: Date
    discountPercent: number
    requirements: JsonValue
    restaurantId: number
    _count: DiscountCodeCountAggregateOutputType | null
    _avg: DiscountCodeAvgAggregateOutputType | null
    _sum: DiscountCodeSumAggregateOutputType | null
    _min: DiscountCodeMinAggregateOutputType | null
    _max: DiscountCodeMaxAggregateOutputType | null
  }

  type GetDiscountCodeGroupByPayload<T extends DiscountCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DiscountCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DiscountCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DiscountCodeGroupByOutputType[P]>
            : GetScalarType<T[P], DiscountCodeGroupByOutputType[P]>
        }
      >
    >


  export type DiscountCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    activationTime?: boolean
    expirationTime?: boolean
    discountPercent?: boolean
    requirements?: boolean
    restaurantId?: boolean
    restaurant?: boolean | UserDefaultArgs<ExtArgs>
    applicableItems?: boolean | DiscountCode$applicableItemsArgs<ExtArgs>
    redemptions?: boolean | DiscountCode$redemptionsArgs<ExtArgs>
    _count?: boolean | DiscountCodeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["discountCode"]>

  export type DiscountCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    activationTime?: boolean
    expirationTime?: boolean
    discountPercent?: boolean
    requirements?: boolean
    restaurantId?: boolean
    restaurant?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["discountCode"]>

  export type DiscountCodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    activationTime?: boolean
    expirationTime?: boolean
    discountPercent?: boolean
    requirements?: boolean
    restaurantId?: boolean
    restaurant?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["discountCode"]>

  export type DiscountCodeSelectScalar = {
    id?: boolean
    code?: boolean
    activationTime?: boolean
    expirationTime?: boolean
    discountPercent?: boolean
    requirements?: boolean
    restaurantId?: boolean
  }

  export type DiscountCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "activationTime" | "expirationTime" | "discountPercent" | "requirements" | "restaurantId", ExtArgs["result"]["discountCode"]>
  export type DiscountCodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restaurant?: boolean | UserDefaultArgs<ExtArgs>
    applicableItems?: boolean | DiscountCode$applicableItemsArgs<ExtArgs>
    redemptions?: boolean | DiscountCode$redemptionsArgs<ExtArgs>
    _count?: boolean | DiscountCodeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DiscountCodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restaurant?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DiscountCodeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restaurant?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DiscountCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DiscountCode"
    objects: {
      restaurant: Prisma.$UserPayload<ExtArgs>
      applicableItems: Prisma.$DiscountCodeItemPayload<ExtArgs>[]
      redemptions: Prisma.$RedemptionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      activationTime: Date
      expirationTime: Date
      discountPercent: number
      requirements: Prisma.JsonValue
      restaurantId: number
    }, ExtArgs["result"]["discountCode"]>
    composites: {}
  }

  type DiscountCodeGetPayload<S extends boolean | null | undefined | DiscountCodeDefaultArgs> = $Result.GetResult<Prisma.$DiscountCodePayload, S>

  type DiscountCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DiscountCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DiscountCodeCountAggregateInputType | true
    }

  export interface DiscountCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DiscountCode'], meta: { name: 'DiscountCode' } }
    /**
     * Find zero or one DiscountCode that matches the filter.
     * @param {DiscountCodeFindUniqueArgs} args - Arguments to find a DiscountCode
     * @example
     * // Get one DiscountCode
     * const discountCode = await prisma.discountCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DiscountCodeFindUniqueArgs>(args: SelectSubset<T, DiscountCodeFindUniqueArgs<ExtArgs>>): Prisma__DiscountCodeClient<$Result.GetResult<Prisma.$DiscountCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DiscountCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DiscountCodeFindUniqueOrThrowArgs} args - Arguments to find a DiscountCode
     * @example
     * // Get one DiscountCode
     * const discountCode = await prisma.discountCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DiscountCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, DiscountCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DiscountCodeClient<$Result.GetResult<Prisma.$DiscountCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DiscountCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscountCodeFindFirstArgs} args - Arguments to find a DiscountCode
     * @example
     * // Get one DiscountCode
     * const discountCode = await prisma.discountCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DiscountCodeFindFirstArgs>(args?: SelectSubset<T, DiscountCodeFindFirstArgs<ExtArgs>>): Prisma__DiscountCodeClient<$Result.GetResult<Prisma.$DiscountCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DiscountCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscountCodeFindFirstOrThrowArgs} args - Arguments to find a DiscountCode
     * @example
     * // Get one DiscountCode
     * const discountCode = await prisma.discountCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DiscountCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, DiscountCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__DiscountCodeClient<$Result.GetResult<Prisma.$DiscountCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DiscountCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscountCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DiscountCodes
     * const discountCodes = await prisma.discountCode.findMany()
     * 
     * // Get first 10 DiscountCodes
     * const discountCodes = await prisma.discountCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const discountCodeWithIdOnly = await prisma.discountCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DiscountCodeFindManyArgs>(args?: SelectSubset<T, DiscountCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscountCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DiscountCode.
     * @param {DiscountCodeCreateArgs} args - Arguments to create a DiscountCode.
     * @example
     * // Create one DiscountCode
     * const DiscountCode = await prisma.discountCode.create({
     *   data: {
     *     // ... data to create a DiscountCode
     *   }
     * })
     * 
     */
    create<T extends DiscountCodeCreateArgs>(args: SelectSubset<T, DiscountCodeCreateArgs<ExtArgs>>): Prisma__DiscountCodeClient<$Result.GetResult<Prisma.$DiscountCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DiscountCodes.
     * @param {DiscountCodeCreateManyArgs} args - Arguments to create many DiscountCodes.
     * @example
     * // Create many DiscountCodes
     * const discountCode = await prisma.discountCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DiscountCodeCreateManyArgs>(args?: SelectSubset<T, DiscountCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DiscountCodes and returns the data saved in the database.
     * @param {DiscountCodeCreateManyAndReturnArgs} args - Arguments to create many DiscountCodes.
     * @example
     * // Create many DiscountCodes
     * const discountCode = await prisma.discountCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DiscountCodes and only return the `id`
     * const discountCodeWithIdOnly = await prisma.discountCode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DiscountCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, DiscountCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscountCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DiscountCode.
     * @param {DiscountCodeDeleteArgs} args - Arguments to delete one DiscountCode.
     * @example
     * // Delete one DiscountCode
     * const DiscountCode = await prisma.discountCode.delete({
     *   where: {
     *     // ... filter to delete one DiscountCode
     *   }
     * })
     * 
     */
    delete<T extends DiscountCodeDeleteArgs>(args: SelectSubset<T, DiscountCodeDeleteArgs<ExtArgs>>): Prisma__DiscountCodeClient<$Result.GetResult<Prisma.$DiscountCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DiscountCode.
     * @param {DiscountCodeUpdateArgs} args - Arguments to update one DiscountCode.
     * @example
     * // Update one DiscountCode
     * const discountCode = await prisma.discountCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DiscountCodeUpdateArgs>(args: SelectSubset<T, DiscountCodeUpdateArgs<ExtArgs>>): Prisma__DiscountCodeClient<$Result.GetResult<Prisma.$DiscountCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DiscountCodes.
     * @param {DiscountCodeDeleteManyArgs} args - Arguments to filter DiscountCodes to delete.
     * @example
     * // Delete a few DiscountCodes
     * const { count } = await prisma.discountCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DiscountCodeDeleteManyArgs>(args?: SelectSubset<T, DiscountCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DiscountCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscountCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DiscountCodes
     * const discountCode = await prisma.discountCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DiscountCodeUpdateManyArgs>(args: SelectSubset<T, DiscountCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DiscountCodes and returns the data updated in the database.
     * @param {DiscountCodeUpdateManyAndReturnArgs} args - Arguments to update many DiscountCodes.
     * @example
     * // Update many DiscountCodes
     * const discountCode = await prisma.discountCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DiscountCodes and only return the `id`
     * const discountCodeWithIdOnly = await prisma.discountCode.updateManyAndReturn({
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
    updateManyAndReturn<T extends DiscountCodeUpdateManyAndReturnArgs>(args: SelectSubset<T, DiscountCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscountCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DiscountCode.
     * @param {DiscountCodeUpsertArgs} args - Arguments to update or create a DiscountCode.
     * @example
     * // Update or create a DiscountCode
     * const discountCode = await prisma.discountCode.upsert({
     *   create: {
     *     // ... data to create a DiscountCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DiscountCode we want to update
     *   }
     * })
     */
    upsert<T extends DiscountCodeUpsertArgs>(args: SelectSubset<T, DiscountCodeUpsertArgs<ExtArgs>>): Prisma__DiscountCodeClient<$Result.GetResult<Prisma.$DiscountCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DiscountCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscountCodeCountArgs} args - Arguments to filter DiscountCodes to count.
     * @example
     * // Count the number of DiscountCodes
     * const count = await prisma.discountCode.count({
     *   where: {
     *     // ... the filter for the DiscountCodes we want to count
     *   }
     * })
    **/
    count<T extends DiscountCodeCountArgs>(
      args?: Subset<T, DiscountCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DiscountCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DiscountCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscountCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DiscountCodeAggregateArgs>(args: Subset<T, DiscountCodeAggregateArgs>): Prisma.PrismaPromise<GetDiscountCodeAggregateType<T>>

    /**
     * Group by DiscountCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscountCodeGroupByArgs} args - Group by arguments.
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
      T extends DiscountCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DiscountCodeGroupByArgs['orderBy'] }
        : { orderBy?: DiscountCodeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DiscountCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiscountCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DiscountCode model
   */
  readonly fields: DiscountCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DiscountCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DiscountCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    restaurant<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    applicableItems<T extends DiscountCode$applicableItemsArgs<ExtArgs> = {}>(args?: Subset<T, DiscountCode$applicableItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscountCodeItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    redemptions<T extends DiscountCode$redemptionsArgs<ExtArgs> = {}>(args?: Subset<T, DiscountCode$redemptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RedemptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the DiscountCode model
   */
  interface DiscountCodeFieldRefs {
    readonly id: FieldRef<"DiscountCode", 'Int'>
    readonly code: FieldRef<"DiscountCode", 'String'>
    readonly activationTime: FieldRef<"DiscountCode", 'DateTime'>
    readonly expirationTime: FieldRef<"DiscountCode", 'DateTime'>
    readonly discountPercent: FieldRef<"DiscountCode", 'Float'>
    readonly requirements: FieldRef<"DiscountCode", 'Json'>
    readonly restaurantId: FieldRef<"DiscountCode", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * DiscountCode findUnique
   */
  export type DiscountCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCode
     */
    select?: DiscountCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCode
     */
    omit?: DiscountCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeInclude<ExtArgs> | null
    /**
     * Filter, which DiscountCode to fetch.
     */
    where: DiscountCodeWhereUniqueInput
  }

  /**
   * DiscountCode findUniqueOrThrow
   */
  export type DiscountCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCode
     */
    select?: DiscountCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCode
     */
    omit?: DiscountCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeInclude<ExtArgs> | null
    /**
     * Filter, which DiscountCode to fetch.
     */
    where: DiscountCodeWhereUniqueInput
  }

  /**
   * DiscountCode findFirst
   */
  export type DiscountCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCode
     */
    select?: DiscountCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCode
     */
    omit?: DiscountCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeInclude<ExtArgs> | null
    /**
     * Filter, which DiscountCode to fetch.
     */
    where?: DiscountCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscountCodes to fetch.
     */
    orderBy?: DiscountCodeOrderByWithRelationInput | DiscountCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DiscountCodes.
     */
    cursor?: DiscountCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscountCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscountCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DiscountCodes.
     */
    distinct?: DiscountCodeScalarFieldEnum | DiscountCodeScalarFieldEnum[]
  }

  /**
   * DiscountCode findFirstOrThrow
   */
  export type DiscountCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCode
     */
    select?: DiscountCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCode
     */
    omit?: DiscountCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeInclude<ExtArgs> | null
    /**
     * Filter, which DiscountCode to fetch.
     */
    where?: DiscountCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscountCodes to fetch.
     */
    orderBy?: DiscountCodeOrderByWithRelationInput | DiscountCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DiscountCodes.
     */
    cursor?: DiscountCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscountCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscountCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DiscountCodes.
     */
    distinct?: DiscountCodeScalarFieldEnum | DiscountCodeScalarFieldEnum[]
  }

  /**
   * DiscountCode findMany
   */
  export type DiscountCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCode
     */
    select?: DiscountCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCode
     */
    omit?: DiscountCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeInclude<ExtArgs> | null
    /**
     * Filter, which DiscountCodes to fetch.
     */
    where?: DiscountCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscountCodes to fetch.
     */
    orderBy?: DiscountCodeOrderByWithRelationInput | DiscountCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DiscountCodes.
     */
    cursor?: DiscountCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscountCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscountCodes.
     */
    skip?: number
    distinct?: DiscountCodeScalarFieldEnum | DiscountCodeScalarFieldEnum[]
  }

  /**
   * DiscountCode create
   */
  export type DiscountCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCode
     */
    select?: DiscountCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCode
     */
    omit?: DiscountCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeInclude<ExtArgs> | null
    /**
     * The data needed to create a DiscountCode.
     */
    data: XOR<DiscountCodeCreateInput, DiscountCodeUncheckedCreateInput>
  }

  /**
   * DiscountCode createMany
   */
  export type DiscountCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DiscountCodes.
     */
    data: DiscountCodeCreateManyInput | DiscountCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DiscountCode createManyAndReturn
   */
  export type DiscountCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCode
     */
    select?: DiscountCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCode
     */
    omit?: DiscountCodeOmit<ExtArgs> | null
    /**
     * The data used to create many DiscountCodes.
     */
    data: DiscountCodeCreateManyInput | DiscountCodeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DiscountCode update
   */
  export type DiscountCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCode
     */
    select?: DiscountCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCode
     */
    omit?: DiscountCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeInclude<ExtArgs> | null
    /**
     * The data needed to update a DiscountCode.
     */
    data: XOR<DiscountCodeUpdateInput, DiscountCodeUncheckedUpdateInput>
    /**
     * Choose, which DiscountCode to update.
     */
    where: DiscountCodeWhereUniqueInput
  }

  /**
   * DiscountCode updateMany
   */
  export type DiscountCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DiscountCodes.
     */
    data: XOR<DiscountCodeUpdateManyMutationInput, DiscountCodeUncheckedUpdateManyInput>
    /**
     * Filter which DiscountCodes to update
     */
    where?: DiscountCodeWhereInput
    /**
     * Limit how many DiscountCodes to update.
     */
    limit?: number
  }

  /**
   * DiscountCode updateManyAndReturn
   */
  export type DiscountCodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCode
     */
    select?: DiscountCodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCode
     */
    omit?: DiscountCodeOmit<ExtArgs> | null
    /**
     * The data used to update DiscountCodes.
     */
    data: XOR<DiscountCodeUpdateManyMutationInput, DiscountCodeUncheckedUpdateManyInput>
    /**
     * Filter which DiscountCodes to update
     */
    where?: DiscountCodeWhereInput
    /**
     * Limit how many DiscountCodes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DiscountCode upsert
   */
  export type DiscountCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCode
     */
    select?: DiscountCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCode
     */
    omit?: DiscountCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeInclude<ExtArgs> | null
    /**
     * The filter to search for the DiscountCode to update in case it exists.
     */
    where: DiscountCodeWhereUniqueInput
    /**
     * In case the DiscountCode found by the `where` argument doesn't exist, create a new DiscountCode with this data.
     */
    create: XOR<DiscountCodeCreateInput, DiscountCodeUncheckedCreateInput>
    /**
     * In case the DiscountCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DiscountCodeUpdateInput, DiscountCodeUncheckedUpdateInput>
  }

  /**
   * DiscountCode delete
   */
  export type DiscountCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCode
     */
    select?: DiscountCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCode
     */
    omit?: DiscountCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeInclude<ExtArgs> | null
    /**
     * Filter which DiscountCode to delete.
     */
    where: DiscountCodeWhereUniqueInput
  }

  /**
   * DiscountCode deleteMany
   */
  export type DiscountCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DiscountCodes to delete
     */
    where?: DiscountCodeWhereInput
    /**
     * Limit how many DiscountCodes to delete.
     */
    limit?: number
  }

  /**
   * DiscountCode.applicableItems
   */
  export type DiscountCode$applicableItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCodeItem
     */
    select?: DiscountCodeItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCodeItem
     */
    omit?: DiscountCodeItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeItemInclude<ExtArgs> | null
    where?: DiscountCodeItemWhereInput
    orderBy?: DiscountCodeItemOrderByWithRelationInput | DiscountCodeItemOrderByWithRelationInput[]
    cursor?: DiscountCodeItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DiscountCodeItemScalarFieldEnum | DiscountCodeItemScalarFieldEnum[]
  }

  /**
   * DiscountCode.redemptions
   */
  export type DiscountCode$redemptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Redemption
     */
    select?: RedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Redemption
     */
    omit?: RedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedemptionInclude<ExtArgs> | null
    where?: RedemptionWhereInput
    orderBy?: RedemptionOrderByWithRelationInput | RedemptionOrderByWithRelationInput[]
    cursor?: RedemptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RedemptionScalarFieldEnum | RedemptionScalarFieldEnum[]
  }

  /**
   * DiscountCode without action
   */
  export type DiscountCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCode
     */
    select?: DiscountCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCode
     */
    omit?: DiscountCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeInclude<ExtArgs> | null
  }


  /**
   * Model DiscountCodeItem
   */

  export type AggregateDiscountCodeItem = {
    _count: DiscountCodeItemCountAggregateOutputType | null
    _avg: DiscountCodeItemAvgAggregateOutputType | null
    _sum: DiscountCodeItemSumAggregateOutputType | null
    _min: DiscountCodeItemMinAggregateOutputType | null
    _max: DiscountCodeItemMaxAggregateOutputType | null
  }

  export type DiscountCodeItemAvgAggregateOutputType = {
    id: number | null
    discountCodeId: number | null
    itemId: number | null
  }

  export type DiscountCodeItemSumAggregateOutputType = {
    id: number | null
    discountCodeId: number | null
    itemId: number | null
  }

  export type DiscountCodeItemMinAggregateOutputType = {
    id: number | null
    discountCodeId: number | null
    itemId: number | null
  }

  export type DiscountCodeItemMaxAggregateOutputType = {
    id: number | null
    discountCodeId: number | null
    itemId: number | null
  }

  export type DiscountCodeItemCountAggregateOutputType = {
    id: number
    discountCodeId: number
    itemId: number
    _all: number
  }


  export type DiscountCodeItemAvgAggregateInputType = {
    id?: true
    discountCodeId?: true
    itemId?: true
  }

  export type DiscountCodeItemSumAggregateInputType = {
    id?: true
    discountCodeId?: true
    itemId?: true
  }

  export type DiscountCodeItemMinAggregateInputType = {
    id?: true
    discountCodeId?: true
    itemId?: true
  }

  export type DiscountCodeItemMaxAggregateInputType = {
    id?: true
    discountCodeId?: true
    itemId?: true
  }

  export type DiscountCodeItemCountAggregateInputType = {
    id?: true
    discountCodeId?: true
    itemId?: true
    _all?: true
  }

  export type DiscountCodeItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DiscountCodeItem to aggregate.
     */
    where?: DiscountCodeItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscountCodeItems to fetch.
     */
    orderBy?: DiscountCodeItemOrderByWithRelationInput | DiscountCodeItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DiscountCodeItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscountCodeItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscountCodeItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DiscountCodeItems
    **/
    _count?: true | DiscountCodeItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DiscountCodeItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DiscountCodeItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DiscountCodeItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DiscountCodeItemMaxAggregateInputType
  }

  export type GetDiscountCodeItemAggregateType<T extends DiscountCodeItemAggregateArgs> = {
        [P in keyof T & keyof AggregateDiscountCodeItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDiscountCodeItem[P]>
      : GetScalarType<T[P], AggregateDiscountCodeItem[P]>
  }




  export type DiscountCodeItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiscountCodeItemWhereInput
    orderBy?: DiscountCodeItemOrderByWithAggregationInput | DiscountCodeItemOrderByWithAggregationInput[]
    by: DiscountCodeItemScalarFieldEnum[] | DiscountCodeItemScalarFieldEnum
    having?: DiscountCodeItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DiscountCodeItemCountAggregateInputType | true
    _avg?: DiscountCodeItemAvgAggregateInputType
    _sum?: DiscountCodeItemSumAggregateInputType
    _min?: DiscountCodeItemMinAggregateInputType
    _max?: DiscountCodeItemMaxAggregateInputType
  }

  export type DiscountCodeItemGroupByOutputType = {
    id: number
    discountCodeId: number
    itemId: number
    _count: DiscountCodeItemCountAggregateOutputType | null
    _avg: DiscountCodeItemAvgAggregateOutputType | null
    _sum: DiscountCodeItemSumAggregateOutputType | null
    _min: DiscountCodeItemMinAggregateOutputType | null
    _max: DiscountCodeItemMaxAggregateOutputType | null
  }

  type GetDiscountCodeItemGroupByPayload<T extends DiscountCodeItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DiscountCodeItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DiscountCodeItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DiscountCodeItemGroupByOutputType[P]>
            : GetScalarType<T[P], DiscountCodeItemGroupByOutputType[P]>
        }
      >
    >


  export type DiscountCodeItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    discountCodeId?: boolean
    itemId?: boolean
    discountCode?: boolean | DiscountCodeDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["discountCodeItem"]>

  export type DiscountCodeItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    discountCodeId?: boolean
    itemId?: boolean
    discountCode?: boolean | DiscountCodeDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["discountCodeItem"]>

  export type DiscountCodeItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    discountCodeId?: boolean
    itemId?: boolean
    discountCode?: boolean | DiscountCodeDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["discountCodeItem"]>

  export type DiscountCodeItemSelectScalar = {
    id?: boolean
    discountCodeId?: boolean
    itemId?: boolean
  }

  export type DiscountCodeItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "discountCodeId" | "itemId", ExtArgs["result"]["discountCodeItem"]>
  export type DiscountCodeItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    discountCode?: boolean | DiscountCodeDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }
  export type DiscountCodeItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    discountCode?: boolean | DiscountCodeDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }
  export type DiscountCodeItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    discountCode?: boolean | DiscountCodeDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }

  export type $DiscountCodeItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DiscountCodeItem"
    objects: {
      discountCode: Prisma.$DiscountCodePayload<ExtArgs>
      item: Prisma.$ItemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      discountCodeId: number
      itemId: number
    }, ExtArgs["result"]["discountCodeItem"]>
    composites: {}
  }

  type DiscountCodeItemGetPayload<S extends boolean | null | undefined | DiscountCodeItemDefaultArgs> = $Result.GetResult<Prisma.$DiscountCodeItemPayload, S>

  type DiscountCodeItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DiscountCodeItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DiscountCodeItemCountAggregateInputType | true
    }

  export interface DiscountCodeItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DiscountCodeItem'], meta: { name: 'DiscountCodeItem' } }
    /**
     * Find zero or one DiscountCodeItem that matches the filter.
     * @param {DiscountCodeItemFindUniqueArgs} args - Arguments to find a DiscountCodeItem
     * @example
     * // Get one DiscountCodeItem
     * const discountCodeItem = await prisma.discountCodeItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DiscountCodeItemFindUniqueArgs>(args: SelectSubset<T, DiscountCodeItemFindUniqueArgs<ExtArgs>>): Prisma__DiscountCodeItemClient<$Result.GetResult<Prisma.$DiscountCodeItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DiscountCodeItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DiscountCodeItemFindUniqueOrThrowArgs} args - Arguments to find a DiscountCodeItem
     * @example
     * // Get one DiscountCodeItem
     * const discountCodeItem = await prisma.discountCodeItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DiscountCodeItemFindUniqueOrThrowArgs>(args: SelectSubset<T, DiscountCodeItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DiscountCodeItemClient<$Result.GetResult<Prisma.$DiscountCodeItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DiscountCodeItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscountCodeItemFindFirstArgs} args - Arguments to find a DiscountCodeItem
     * @example
     * // Get one DiscountCodeItem
     * const discountCodeItem = await prisma.discountCodeItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DiscountCodeItemFindFirstArgs>(args?: SelectSubset<T, DiscountCodeItemFindFirstArgs<ExtArgs>>): Prisma__DiscountCodeItemClient<$Result.GetResult<Prisma.$DiscountCodeItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DiscountCodeItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscountCodeItemFindFirstOrThrowArgs} args - Arguments to find a DiscountCodeItem
     * @example
     * // Get one DiscountCodeItem
     * const discountCodeItem = await prisma.discountCodeItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DiscountCodeItemFindFirstOrThrowArgs>(args?: SelectSubset<T, DiscountCodeItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__DiscountCodeItemClient<$Result.GetResult<Prisma.$DiscountCodeItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DiscountCodeItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscountCodeItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DiscountCodeItems
     * const discountCodeItems = await prisma.discountCodeItem.findMany()
     * 
     * // Get first 10 DiscountCodeItems
     * const discountCodeItems = await prisma.discountCodeItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const discountCodeItemWithIdOnly = await prisma.discountCodeItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DiscountCodeItemFindManyArgs>(args?: SelectSubset<T, DiscountCodeItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscountCodeItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DiscountCodeItem.
     * @param {DiscountCodeItemCreateArgs} args - Arguments to create a DiscountCodeItem.
     * @example
     * // Create one DiscountCodeItem
     * const DiscountCodeItem = await prisma.discountCodeItem.create({
     *   data: {
     *     // ... data to create a DiscountCodeItem
     *   }
     * })
     * 
     */
    create<T extends DiscountCodeItemCreateArgs>(args: SelectSubset<T, DiscountCodeItemCreateArgs<ExtArgs>>): Prisma__DiscountCodeItemClient<$Result.GetResult<Prisma.$DiscountCodeItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DiscountCodeItems.
     * @param {DiscountCodeItemCreateManyArgs} args - Arguments to create many DiscountCodeItems.
     * @example
     * // Create many DiscountCodeItems
     * const discountCodeItem = await prisma.discountCodeItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DiscountCodeItemCreateManyArgs>(args?: SelectSubset<T, DiscountCodeItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DiscountCodeItems and returns the data saved in the database.
     * @param {DiscountCodeItemCreateManyAndReturnArgs} args - Arguments to create many DiscountCodeItems.
     * @example
     * // Create many DiscountCodeItems
     * const discountCodeItem = await prisma.discountCodeItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DiscountCodeItems and only return the `id`
     * const discountCodeItemWithIdOnly = await prisma.discountCodeItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DiscountCodeItemCreateManyAndReturnArgs>(args?: SelectSubset<T, DiscountCodeItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscountCodeItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DiscountCodeItem.
     * @param {DiscountCodeItemDeleteArgs} args - Arguments to delete one DiscountCodeItem.
     * @example
     * // Delete one DiscountCodeItem
     * const DiscountCodeItem = await prisma.discountCodeItem.delete({
     *   where: {
     *     // ... filter to delete one DiscountCodeItem
     *   }
     * })
     * 
     */
    delete<T extends DiscountCodeItemDeleteArgs>(args: SelectSubset<T, DiscountCodeItemDeleteArgs<ExtArgs>>): Prisma__DiscountCodeItemClient<$Result.GetResult<Prisma.$DiscountCodeItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DiscountCodeItem.
     * @param {DiscountCodeItemUpdateArgs} args - Arguments to update one DiscountCodeItem.
     * @example
     * // Update one DiscountCodeItem
     * const discountCodeItem = await prisma.discountCodeItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DiscountCodeItemUpdateArgs>(args: SelectSubset<T, DiscountCodeItemUpdateArgs<ExtArgs>>): Prisma__DiscountCodeItemClient<$Result.GetResult<Prisma.$DiscountCodeItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DiscountCodeItems.
     * @param {DiscountCodeItemDeleteManyArgs} args - Arguments to filter DiscountCodeItems to delete.
     * @example
     * // Delete a few DiscountCodeItems
     * const { count } = await prisma.discountCodeItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DiscountCodeItemDeleteManyArgs>(args?: SelectSubset<T, DiscountCodeItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DiscountCodeItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscountCodeItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DiscountCodeItems
     * const discountCodeItem = await prisma.discountCodeItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DiscountCodeItemUpdateManyArgs>(args: SelectSubset<T, DiscountCodeItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DiscountCodeItems and returns the data updated in the database.
     * @param {DiscountCodeItemUpdateManyAndReturnArgs} args - Arguments to update many DiscountCodeItems.
     * @example
     * // Update many DiscountCodeItems
     * const discountCodeItem = await prisma.discountCodeItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DiscountCodeItems and only return the `id`
     * const discountCodeItemWithIdOnly = await prisma.discountCodeItem.updateManyAndReturn({
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
    updateManyAndReturn<T extends DiscountCodeItemUpdateManyAndReturnArgs>(args: SelectSubset<T, DiscountCodeItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscountCodeItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DiscountCodeItem.
     * @param {DiscountCodeItemUpsertArgs} args - Arguments to update or create a DiscountCodeItem.
     * @example
     * // Update or create a DiscountCodeItem
     * const discountCodeItem = await prisma.discountCodeItem.upsert({
     *   create: {
     *     // ... data to create a DiscountCodeItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DiscountCodeItem we want to update
     *   }
     * })
     */
    upsert<T extends DiscountCodeItemUpsertArgs>(args: SelectSubset<T, DiscountCodeItemUpsertArgs<ExtArgs>>): Prisma__DiscountCodeItemClient<$Result.GetResult<Prisma.$DiscountCodeItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DiscountCodeItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscountCodeItemCountArgs} args - Arguments to filter DiscountCodeItems to count.
     * @example
     * // Count the number of DiscountCodeItems
     * const count = await prisma.discountCodeItem.count({
     *   where: {
     *     // ... the filter for the DiscountCodeItems we want to count
     *   }
     * })
    **/
    count<T extends DiscountCodeItemCountArgs>(
      args?: Subset<T, DiscountCodeItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DiscountCodeItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DiscountCodeItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscountCodeItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DiscountCodeItemAggregateArgs>(args: Subset<T, DiscountCodeItemAggregateArgs>): Prisma.PrismaPromise<GetDiscountCodeItemAggregateType<T>>

    /**
     * Group by DiscountCodeItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscountCodeItemGroupByArgs} args - Group by arguments.
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
      T extends DiscountCodeItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DiscountCodeItemGroupByArgs['orderBy'] }
        : { orderBy?: DiscountCodeItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DiscountCodeItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiscountCodeItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DiscountCodeItem model
   */
  readonly fields: DiscountCodeItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DiscountCodeItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DiscountCodeItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    discountCode<T extends DiscountCodeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DiscountCodeDefaultArgs<ExtArgs>>): Prisma__DiscountCodeClient<$Result.GetResult<Prisma.$DiscountCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    item<T extends ItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ItemDefaultArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the DiscountCodeItem model
   */
  interface DiscountCodeItemFieldRefs {
    readonly id: FieldRef<"DiscountCodeItem", 'Int'>
    readonly discountCodeId: FieldRef<"DiscountCodeItem", 'Int'>
    readonly itemId: FieldRef<"DiscountCodeItem", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * DiscountCodeItem findUnique
   */
  export type DiscountCodeItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCodeItem
     */
    select?: DiscountCodeItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCodeItem
     */
    omit?: DiscountCodeItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeItemInclude<ExtArgs> | null
    /**
     * Filter, which DiscountCodeItem to fetch.
     */
    where: DiscountCodeItemWhereUniqueInput
  }

  /**
   * DiscountCodeItem findUniqueOrThrow
   */
  export type DiscountCodeItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCodeItem
     */
    select?: DiscountCodeItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCodeItem
     */
    omit?: DiscountCodeItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeItemInclude<ExtArgs> | null
    /**
     * Filter, which DiscountCodeItem to fetch.
     */
    where: DiscountCodeItemWhereUniqueInput
  }

  /**
   * DiscountCodeItem findFirst
   */
  export type DiscountCodeItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCodeItem
     */
    select?: DiscountCodeItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCodeItem
     */
    omit?: DiscountCodeItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeItemInclude<ExtArgs> | null
    /**
     * Filter, which DiscountCodeItem to fetch.
     */
    where?: DiscountCodeItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscountCodeItems to fetch.
     */
    orderBy?: DiscountCodeItemOrderByWithRelationInput | DiscountCodeItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DiscountCodeItems.
     */
    cursor?: DiscountCodeItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscountCodeItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscountCodeItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DiscountCodeItems.
     */
    distinct?: DiscountCodeItemScalarFieldEnum | DiscountCodeItemScalarFieldEnum[]
  }

  /**
   * DiscountCodeItem findFirstOrThrow
   */
  export type DiscountCodeItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCodeItem
     */
    select?: DiscountCodeItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCodeItem
     */
    omit?: DiscountCodeItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeItemInclude<ExtArgs> | null
    /**
     * Filter, which DiscountCodeItem to fetch.
     */
    where?: DiscountCodeItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscountCodeItems to fetch.
     */
    orderBy?: DiscountCodeItemOrderByWithRelationInput | DiscountCodeItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DiscountCodeItems.
     */
    cursor?: DiscountCodeItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscountCodeItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscountCodeItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DiscountCodeItems.
     */
    distinct?: DiscountCodeItemScalarFieldEnum | DiscountCodeItemScalarFieldEnum[]
  }

  /**
   * DiscountCodeItem findMany
   */
  export type DiscountCodeItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCodeItem
     */
    select?: DiscountCodeItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCodeItem
     */
    omit?: DiscountCodeItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeItemInclude<ExtArgs> | null
    /**
     * Filter, which DiscountCodeItems to fetch.
     */
    where?: DiscountCodeItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscountCodeItems to fetch.
     */
    orderBy?: DiscountCodeItemOrderByWithRelationInput | DiscountCodeItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DiscountCodeItems.
     */
    cursor?: DiscountCodeItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscountCodeItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscountCodeItems.
     */
    skip?: number
    distinct?: DiscountCodeItemScalarFieldEnum | DiscountCodeItemScalarFieldEnum[]
  }

  /**
   * DiscountCodeItem create
   */
  export type DiscountCodeItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCodeItem
     */
    select?: DiscountCodeItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCodeItem
     */
    omit?: DiscountCodeItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeItemInclude<ExtArgs> | null
    /**
     * The data needed to create a DiscountCodeItem.
     */
    data: XOR<DiscountCodeItemCreateInput, DiscountCodeItemUncheckedCreateInput>
  }

  /**
   * DiscountCodeItem createMany
   */
  export type DiscountCodeItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DiscountCodeItems.
     */
    data: DiscountCodeItemCreateManyInput | DiscountCodeItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DiscountCodeItem createManyAndReturn
   */
  export type DiscountCodeItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCodeItem
     */
    select?: DiscountCodeItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCodeItem
     */
    omit?: DiscountCodeItemOmit<ExtArgs> | null
    /**
     * The data used to create many DiscountCodeItems.
     */
    data: DiscountCodeItemCreateManyInput | DiscountCodeItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DiscountCodeItem update
   */
  export type DiscountCodeItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCodeItem
     */
    select?: DiscountCodeItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCodeItem
     */
    omit?: DiscountCodeItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeItemInclude<ExtArgs> | null
    /**
     * The data needed to update a DiscountCodeItem.
     */
    data: XOR<DiscountCodeItemUpdateInput, DiscountCodeItemUncheckedUpdateInput>
    /**
     * Choose, which DiscountCodeItem to update.
     */
    where: DiscountCodeItemWhereUniqueInput
  }

  /**
   * DiscountCodeItem updateMany
   */
  export type DiscountCodeItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DiscountCodeItems.
     */
    data: XOR<DiscountCodeItemUpdateManyMutationInput, DiscountCodeItemUncheckedUpdateManyInput>
    /**
     * Filter which DiscountCodeItems to update
     */
    where?: DiscountCodeItemWhereInput
    /**
     * Limit how many DiscountCodeItems to update.
     */
    limit?: number
  }

  /**
   * DiscountCodeItem updateManyAndReturn
   */
  export type DiscountCodeItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCodeItem
     */
    select?: DiscountCodeItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCodeItem
     */
    omit?: DiscountCodeItemOmit<ExtArgs> | null
    /**
     * The data used to update DiscountCodeItems.
     */
    data: XOR<DiscountCodeItemUpdateManyMutationInput, DiscountCodeItemUncheckedUpdateManyInput>
    /**
     * Filter which DiscountCodeItems to update
     */
    where?: DiscountCodeItemWhereInput
    /**
     * Limit how many DiscountCodeItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DiscountCodeItem upsert
   */
  export type DiscountCodeItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCodeItem
     */
    select?: DiscountCodeItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCodeItem
     */
    omit?: DiscountCodeItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeItemInclude<ExtArgs> | null
    /**
     * The filter to search for the DiscountCodeItem to update in case it exists.
     */
    where: DiscountCodeItemWhereUniqueInput
    /**
     * In case the DiscountCodeItem found by the `where` argument doesn't exist, create a new DiscountCodeItem with this data.
     */
    create: XOR<DiscountCodeItemCreateInput, DiscountCodeItemUncheckedCreateInput>
    /**
     * In case the DiscountCodeItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DiscountCodeItemUpdateInput, DiscountCodeItemUncheckedUpdateInput>
  }

  /**
   * DiscountCodeItem delete
   */
  export type DiscountCodeItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCodeItem
     */
    select?: DiscountCodeItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCodeItem
     */
    omit?: DiscountCodeItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeItemInclude<ExtArgs> | null
    /**
     * Filter which DiscountCodeItem to delete.
     */
    where: DiscountCodeItemWhereUniqueInput
  }

  /**
   * DiscountCodeItem deleteMany
   */
  export type DiscountCodeItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DiscountCodeItems to delete
     */
    where?: DiscountCodeItemWhereInput
    /**
     * Limit how many DiscountCodeItems to delete.
     */
    limit?: number
  }

  /**
   * DiscountCodeItem without action
   */
  export type DiscountCodeItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscountCodeItem
     */
    select?: DiscountCodeItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscountCodeItem
     */
    omit?: DiscountCodeItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscountCodeItemInclude<ExtArgs> | null
  }


  /**
   * Model Redemption
   */

  export type AggregateRedemption = {
    _count: RedemptionCountAggregateOutputType | null
    _avg: RedemptionAvgAggregateOutputType | null
    _sum: RedemptionSumAggregateOutputType | null
    _min: RedemptionMinAggregateOutputType | null
    _max: RedemptionMaxAggregateOutputType | null
  }

  export type RedemptionAvgAggregateOutputType = {
    id: number | null
    influencerId: number | null
    discountCodeId: number | null
  }

  export type RedemptionSumAggregateOutputType = {
    id: number | null
    influencerId: number | null
    discountCodeId: number | null
  }

  export type RedemptionMinAggregateOutputType = {
    id: number | null
    influencerId: number | null
    discountCodeId: number | null
    status: $Enums.DiscountStatus | null
    redeemedAt: Date | null
  }

  export type RedemptionMaxAggregateOutputType = {
    id: number | null
    influencerId: number | null
    discountCodeId: number | null
    status: $Enums.DiscountStatus | null
    redeemedAt: Date | null
  }

  export type RedemptionCountAggregateOutputType = {
    id: number
    influencerId: number
    discountCodeId: number
    status: number
    redeemedAt: number
    _all: number
  }


  export type RedemptionAvgAggregateInputType = {
    id?: true
    influencerId?: true
    discountCodeId?: true
  }

  export type RedemptionSumAggregateInputType = {
    id?: true
    influencerId?: true
    discountCodeId?: true
  }

  export type RedemptionMinAggregateInputType = {
    id?: true
    influencerId?: true
    discountCodeId?: true
    status?: true
    redeemedAt?: true
  }

  export type RedemptionMaxAggregateInputType = {
    id?: true
    influencerId?: true
    discountCodeId?: true
    status?: true
    redeemedAt?: true
  }

  export type RedemptionCountAggregateInputType = {
    id?: true
    influencerId?: true
    discountCodeId?: true
    status?: true
    redeemedAt?: true
    _all?: true
  }

  export type RedemptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Redemption to aggregate.
     */
    where?: RedemptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Redemptions to fetch.
     */
    orderBy?: RedemptionOrderByWithRelationInput | RedemptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RedemptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Redemptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Redemptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Redemptions
    **/
    _count?: true | RedemptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RedemptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RedemptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RedemptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RedemptionMaxAggregateInputType
  }

  export type GetRedemptionAggregateType<T extends RedemptionAggregateArgs> = {
        [P in keyof T & keyof AggregateRedemption]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRedemption[P]>
      : GetScalarType<T[P], AggregateRedemption[P]>
  }




  export type RedemptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RedemptionWhereInput
    orderBy?: RedemptionOrderByWithAggregationInput | RedemptionOrderByWithAggregationInput[]
    by: RedemptionScalarFieldEnum[] | RedemptionScalarFieldEnum
    having?: RedemptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RedemptionCountAggregateInputType | true
    _avg?: RedemptionAvgAggregateInputType
    _sum?: RedemptionSumAggregateInputType
    _min?: RedemptionMinAggregateInputType
    _max?: RedemptionMaxAggregateInputType
  }

  export type RedemptionGroupByOutputType = {
    id: number
    influencerId: number
    discountCodeId: number
    status: $Enums.DiscountStatus
    redeemedAt: Date | null
    _count: RedemptionCountAggregateOutputType | null
    _avg: RedemptionAvgAggregateOutputType | null
    _sum: RedemptionSumAggregateOutputType | null
    _min: RedemptionMinAggregateOutputType | null
    _max: RedemptionMaxAggregateOutputType | null
  }

  type GetRedemptionGroupByPayload<T extends RedemptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RedemptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RedemptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RedemptionGroupByOutputType[P]>
            : GetScalarType<T[P], RedemptionGroupByOutputType[P]>
        }
      >
    >


  export type RedemptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    influencerId?: boolean
    discountCodeId?: boolean
    status?: boolean
    redeemedAt?: boolean
    discountCode?: boolean | DiscountCodeDefaultArgs<ExtArgs>
    influencer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["redemption"]>

  export type RedemptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    influencerId?: boolean
    discountCodeId?: boolean
    status?: boolean
    redeemedAt?: boolean
    discountCode?: boolean | DiscountCodeDefaultArgs<ExtArgs>
    influencer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["redemption"]>

  export type RedemptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    influencerId?: boolean
    discountCodeId?: boolean
    status?: boolean
    redeemedAt?: boolean
    discountCode?: boolean | DiscountCodeDefaultArgs<ExtArgs>
    influencer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["redemption"]>

  export type RedemptionSelectScalar = {
    id?: boolean
    influencerId?: boolean
    discountCodeId?: boolean
    status?: boolean
    redeemedAt?: boolean
  }

  export type RedemptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "influencerId" | "discountCodeId" | "status" | "redeemedAt", ExtArgs["result"]["redemption"]>
  export type RedemptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    discountCode?: boolean | DiscountCodeDefaultArgs<ExtArgs>
    influencer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RedemptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    discountCode?: boolean | DiscountCodeDefaultArgs<ExtArgs>
    influencer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RedemptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    discountCode?: boolean | DiscountCodeDefaultArgs<ExtArgs>
    influencer?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RedemptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Redemption"
    objects: {
      discountCode: Prisma.$DiscountCodePayload<ExtArgs>
      influencer: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      influencerId: number
      discountCodeId: number
      status: $Enums.DiscountStatus
      redeemedAt: Date | null
    }, ExtArgs["result"]["redemption"]>
    composites: {}
  }

  type RedemptionGetPayload<S extends boolean | null | undefined | RedemptionDefaultArgs> = $Result.GetResult<Prisma.$RedemptionPayload, S>

  type RedemptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RedemptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RedemptionCountAggregateInputType | true
    }

  export interface RedemptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Redemption'], meta: { name: 'Redemption' } }
    /**
     * Find zero or one Redemption that matches the filter.
     * @param {RedemptionFindUniqueArgs} args - Arguments to find a Redemption
     * @example
     * // Get one Redemption
     * const redemption = await prisma.redemption.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RedemptionFindUniqueArgs>(args: SelectSubset<T, RedemptionFindUniqueArgs<ExtArgs>>): Prisma__RedemptionClient<$Result.GetResult<Prisma.$RedemptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Redemption that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RedemptionFindUniqueOrThrowArgs} args - Arguments to find a Redemption
     * @example
     * // Get one Redemption
     * const redemption = await prisma.redemption.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RedemptionFindUniqueOrThrowArgs>(args: SelectSubset<T, RedemptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RedemptionClient<$Result.GetResult<Prisma.$RedemptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Redemption that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedemptionFindFirstArgs} args - Arguments to find a Redemption
     * @example
     * // Get one Redemption
     * const redemption = await prisma.redemption.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RedemptionFindFirstArgs>(args?: SelectSubset<T, RedemptionFindFirstArgs<ExtArgs>>): Prisma__RedemptionClient<$Result.GetResult<Prisma.$RedemptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Redemption that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedemptionFindFirstOrThrowArgs} args - Arguments to find a Redemption
     * @example
     * // Get one Redemption
     * const redemption = await prisma.redemption.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RedemptionFindFirstOrThrowArgs>(args?: SelectSubset<T, RedemptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RedemptionClient<$Result.GetResult<Prisma.$RedemptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Redemptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedemptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Redemptions
     * const redemptions = await prisma.redemption.findMany()
     * 
     * // Get first 10 Redemptions
     * const redemptions = await prisma.redemption.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const redemptionWithIdOnly = await prisma.redemption.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RedemptionFindManyArgs>(args?: SelectSubset<T, RedemptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RedemptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Redemption.
     * @param {RedemptionCreateArgs} args - Arguments to create a Redemption.
     * @example
     * // Create one Redemption
     * const Redemption = await prisma.redemption.create({
     *   data: {
     *     // ... data to create a Redemption
     *   }
     * })
     * 
     */
    create<T extends RedemptionCreateArgs>(args: SelectSubset<T, RedemptionCreateArgs<ExtArgs>>): Prisma__RedemptionClient<$Result.GetResult<Prisma.$RedemptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Redemptions.
     * @param {RedemptionCreateManyArgs} args - Arguments to create many Redemptions.
     * @example
     * // Create many Redemptions
     * const redemption = await prisma.redemption.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RedemptionCreateManyArgs>(args?: SelectSubset<T, RedemptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Redemptions and returns the data saved in the database.
     * @param {RedemptionCreateManyAndReturnArgs} args - Arguments to create many Redemptions.
     * @example
     * // Create many Redemptions
     * const redemption = await prisma.redemption.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Redemptions and only return the `id`
     * const redemptionWithIdOnly = await prisma.redemption.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RedemptionCreateManyAndReturnArgs>(args?: SelectSubset<T, RedemptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RedemptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Redemption.
     * @param {RedemptionDeleteArgs} args - Arguments to delete one Redemption.
     * @example
     * // Delete one Redemption
     * const Redemption = await prisma.redemption.delete({
     *   where: {
     *     // ... filter to delete one Redemption
     *   }
     * })
     * 
     */
    delete<T extends RedemptionDeleteArgs>(args: SelectSubset<T, RedemptionDeleteArgs<ExtArgs>>): Prisma__RedemptionClient<$Result.GetResult<Prisma.$RedemptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Redemption.
     * @param {RedemptionUpdateArgs} args - Arguments to update one Redemption.
     * @example
     * // Update one Redemption
     * const redemption = await prisma.redemption.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RedemptionUpdateArgs>(args: SelectSubset<T, RedemptionUpdateArgs<ExtArgs>>): Prisma__RedemptionClient<$Result.GetResult<Prisma.$RedemptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Redemptions.
     * @param {RedemptionDeleteManyArgs} args - Arguments to filter Redemptions to delete.
     * @example
     * // Delete a few Redemptions
     * const { count } = await prisma.redemption.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RedemptionDeleteManyArgs>(args?: SelectSubset<T, RedemptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Redemptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedemptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Redemptions
     * const redemption = await prisma.redemption.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RedemptionUpdateManyArgs>(args: SelectSubset<T, RedemptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Redemptions and returns the data updated in the database.
     * @param {RedemptionUpdateManyAndReturnArgs} args - Arguments to update many Redemptions.
     * @example
     * // Update many Redemptions
     * const redemption = await prisma.redemption.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Redemptions and only return the `id`
     * const redemptionWithIdOnly = await prisma.redemption.updateManyAndReturn({
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
    updateManyAndReturn<T extends RedemptionUpdateManyAndReturnArgs>(args: SelectSubset<T, RedemptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RedemptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Redemption.
     * @param {RedemptionUpsertArgs} args - Arguments to update or create a Redemption.
     * @example
     * // Update or create a Redemption
     * const redemption = await prisma.redemption.upsert({
     *   create: {
     *     // ... data to create a Redemption
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Redemption we want to update
     *   }
     * })
     */
    upsert<T extends RedemptionUpsertArgs>(args: SelectSubset<T, RedemptionUpsertArgs<ExtArgs>>): Prisma__RedemptionClient<$Result.GetResult<Prisma.$RedemptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Redemptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedemptionCountArgs} args - Arguments to filter Redemptions to count.
     * @example
     * // Count the number of Redemptions
     * const count = await prisma.redemption.count({
     *   where: {
     *     // ... the filter for the Redemptions we want to count
     *   }
     * })
    **/
    count<T extends RedemptionCountArgs>(
      args?: Subset<T, RedemptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RedemptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Redemption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedemptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RedemptionAggregateArgs>(args: Subset<T, RedemptionAggregateArgs>): Prisma.PrismaPromise<GetRedemptionAggregateType<T>>

    /**
     * Group by Redemption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedemptionGroupByArgs} args - Group by arguments.
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
      T extends RedemptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RedemptionGroupByArgs['orderBy'] }
        : { orderBy?: RedemptionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RedemptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRedemptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Redemption model
   */
  readonly fields: RedemptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Redemption.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RedemptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    discountCode<T extends DiscountCodeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DiscountCodeDefaultArgs<ExtArgs>>): Prisma__DiscountCodeClient<$Result.GetResult<Prisma.$DiscountCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    influencer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Redemption model
   */
  interface RedemptionFieldRefs {
    readonly id: FieldRef<"Redemption", 'Int'>
    readonly influencerId: FieldRef<"Redemption", 'Int'>
    readonly discountCodeId: FieldRef<"Redemption", 'Int'>
    readonly status: FieldRef<"Redemption", 'DiscountStatus'>
    readonly redeemedAt: FieldRef<"Redemption", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Redemption findUnique
   */
  export type RedemptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Redemption
     */
    select?: RedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Redemption
     */
    omit?: RedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedemptionInclude<ExtArgs> | null
    /**
     * Filter, which Redemption to fetch.
     */
    where: RedemptionWhereUniqueInput
  }

  /**
   * Redemption findUniqueOrThrow
   */
  export type RedemptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Redemption
     */
    select?: RedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Redemption
     */
    omit?: RedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedemptionInclude<ExtArgs> | null
    /**
     * Filter, which Redemption to fetch.
     */
    where: RedemptionWhereUniqueInput
  }

  /**
   * Redemption findFirst
   */
  export type RedemptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Redemption
     */
    select?: RedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Redemption
     */
    omit?: RedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedemptionInclude<ExtArgs> | null
    /**
     * Filter, which Redemption to fetch.
     */
    where?: RedemptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Redemptions to fetch.
     */
    orderBy?: RedemptionOrderByWithRelationInput | RedemptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Redemptions.
     */
    cursor?: RedemptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Redemptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Redemptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Redemptions.
     */
    distinct?: RedemptionScalarFieldEnum | RedemptionScalarFieldEnum[]
  }

  /**
   * Redemption findFirstOrThrow
   */
  export type RedemptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Redemption
     */
    select?: RedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Redemption
     */
    omit?: RedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedemptionInclude<ExtArgs> | null
    /**
     * Filter, which Redemption to fetch.
     */
    where?: RedemptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Redemptions to fetch.
     */
    orderBy?: RedemptionOrderByWithRelationInput | RedemptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Redemptions.
     */
    cursor?: RedemptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Redemptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Redemptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Redemptions.
     */
    distinct?: RedemptionScalarFieldEnum | RedemptionScalarFieldEnum[]
  }

  /**
   * Redemption findMany
   */
  export type RedemptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Redemption
     */
    select?: RedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Redemption
     */
    omit?: RedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedemptionInclude<ExtArgs> | null
    /**
     * Filter, which Redemptions to fetch.
     */
    where?: RedemptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Redemptions to fetch.
     */
    orderBy?: RedemptionOrderByWithRelationInput | RedemptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Redemptions.
     */
    cursor?: RedemptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Redemptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Redemptions.
     */
    skip?: number
    distinct?: RedemptionScalarFieldEnum | RedemptionScalarFieldEnum[]
  }

  /**
   * Redemption create
   */
  export type RedemptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Redemption
     */
    select?: RedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Redemption
     */
    omit?: RedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedemptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Redemption.
     */
    data: XOR<RedemptionCreateInput, RedemptionUncheckedCreateInput>
  }

  /**
   * Redemption createMany
   */
  export type RedemptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Redemptions.
     */
    data: RedemptionCreateManyInput | RedemptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Redemption createManyAndReturn
   */
  export type RedemptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Redemption
     */
    select?: RedemptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Redemption
     */
    omit?: RedemptionOmit<ExtArgs> | null
    /**
     * The data used to create many Redemptions.
     */
    data: RedemptionCreateManyInput | RedemptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedemptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Redemption update
   */
  export type RedemptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Redemption
     */
    select?: RedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Redemption
     */
    omit?: RedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedemptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Redemption.
     */
    data: XOR<RedemptionUpdateInput, RedemptionUncheckedUpdateInput>
    /**
     * Choose, which Redemption to update.
     */
    where: RedemptionWhereUniqueInput
  }

  /**
   * Redemption updateMany
   */
  export type RedemptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Redemptions.
     */
    data: XOR<RedemptionUpdateManyMutationInput, RedemptionUncheckedUpdateManyInput>
    /**
     * Filter which Redemptions to update
     */
    where?: RedemptionWhereInput
    /**
     * Limit how many Redemptions to update.
     */
    limit?: number
  }

  /**
   * Redemption updateManyAndReturn
   */
  export type RedemptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Redemption
     */
    select?: RedemptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Redemption
     */
    omit?: RedemptionOmit<ExtArgs> | null
    /**
     * The data used to update Redemptions.
     */
    data: XOR<RedemptionUpdateManyMutationInput, RedemptionUncheckedUpdateManyInput>
    /**
     * Filter which Redemptions to update
     */
    where?: RedemptionWhereInput
    /**
     * Limit how many Redemptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedemptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Redemption upsert
   */
  export type RedemptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Redemption
     */
    select?: RedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Redemption
     */
    omit?: RedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedemptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Redemption to update in case it exists.
     */
    where: RedemptionWhereUniqueInput
    /**
     * In case the Redemption found by the `where` argument doesn't exist, create a new Redemption with this data.
     */
    create: XOR<RedemptionCreateInput, RedemptionUncheckedCreateInput>
    /**
     * In case the Redemption was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RedemptionUpdateInput, RedemptionUncheckedUpdateInput>
  }

  /**
   * Redemption delete
   */
  export type RedemptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Redemption
     */
    select?: RedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Redemption
     */
    omit?: RedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedemptionInclude<ExtArgs> | null
    /**
     * Filter which Redemption to delete.
     */
    where: RedemptionWhereUniqueInput
  }

  /**
   * Redemption deleteMany
   */
  export type RedemptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Redemptions to delete
     */
    where?: RedemptionWhereInput
    /**
     * Limit how many Redemptions to delete.
     */
    limit?: number
  }

  /**
   * Redemption without action
   */
  export type RedemptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Redemption
     */
    select?: RedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Redemption
     */
    omit?: RedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedemptionInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    userType: 'userType'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ItemScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    restaurantId: 'restaurantId'
  };

  export type ItemScalarFieldEnum = (typeof ItemScalarFieldEnum)[keyof typeof ItemScalarFieldEnum]


  export const DiscountCodeScalarFieldEnum: {
    id: 'id',
    code: 'code',
    activationTime: 'activationTime',
    expirationTime: 'expirationTime',
    discountPercent: 'discountPercent',
    requirements: 'requirements',
    restaurantId: 'restaurantId'
  };

  export type DiscountCodeScalarFieldEnum = (typeof DiscountCodeScalarFieldEnum)[keyof typeof DiscountCodeScalarFieldEnum]


  export const DiscountCodeItemScalarFieldEnum: {
    id: 'id',
    discountCodeId: 'discountCodeId',
    itemId: 'itemId'
  };

  export type DiscountCodeItemScalarFieldEnum = (typeof DiscountCodeItemScalarFieldEnum)[keyof typeof DiscountCodeItemScalarFieldEnum]


  export const RedemptionScalarFieldEnum: {
    id: 'id',
    influencerId: 'influencerId',
    discountCodeId: 'discountCodeId',
    status: 'status',
    redeemedAt: 'redeemedAt'
  };

  export type RedemptionScalarFieldEnum = (typeof RedemptionScalarFieldEnum)[keyof typeof RedemptionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserType'
   */
  export type EnumUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserType'>
    


  /**
   * Reference to a field of type 'UserType[]'
   */
  export type ListEnumUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserType[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DiscountStatus'
   */
  export type EnumDiscountStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DiscountStatus'>
    


  /**
   * Reference to a field of type 'DiscountStatus[]'
   */
  export type ListEnumDiscountStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DiscountStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    userType?: EnumUserTypeFilter<"User"> | $Enums.UserType
    discounts?: DiscountCodeListRelationFilter
    items?: ItemListRelationFilter
    redemptions?: RedemptionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    userType?: SortOrder
    discounts?: DiscountCodeOrderByRelationAggregateInput
    items?: ItemOrderByRelationAggregateInput
    redemptions?: RedemptionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    userType?: EnumUserTypeFilter<"User"> | $Enums.UserType
    discounts?: DiscountCodeListRelationFilter
    items?: ItemListRelationFilter
    redemptions?: RedemptionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    userType?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    userType?: EnumUserTypeWithAggregatesFilter<"User"> | $Enums.UserType
  }

  export type ItemWhereInput = {
    AND?: ItemWhereInput | ItemWhereInput[]
    OR?: ItemWhereInput[]
    NOT?: ItemWhereInput | ItemWhereInput[]
    id?: IntFilter<"Item"> | number
    name?: StringFilter<"Item"> | string
    description?: StringNullableFilter<"Item"> | string | null
    restaurantId?: IntFilter<"Item"> | number
    discounts?: DiscountCodeItemListRelationFilter
    restaurant?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ItemOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    restaurantId?: SortOrder
    discounts?: DiscountCodeItemOrderByRelationAggregateInput
    restaurant?: UserOrderByWithRelationInput
  }

  export type ItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ItemWhereInput | ItemWhereInput[]
    OR?: ItemWhereInput[]
    NOT?: ItemWhereInput | ItemWhereInput[]
    name?: StringFilter<"Item"> | string
    description?: StringNullableFilter<"Item"> | string | null
    restaurantId?: IntFilter<"Item"> | number
    discounts?: DiscountCodeItemListRelationFilter
    restaurant?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ItemOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    restaurantId?: SortOrder
    _count?: ItemCountOrderByAggregateInput
    _avg?: ItemAvgOrderByAggregateInput
    _max?: ItemMaxOrderByAggregateInput
    _min?: ItemMinOrderByAggregateInput
    _sum?: ItemSumOrderByAggregateInput
  }

  export type ItemScalarWhereWithAggregatesInput = {
    AND?: ItemScalarWhereWithAggregatesInput | ItemScalarWhereWithAggregatesInput[]
    OR?: ItemScalarWhereWithAggregatesInput[]
    NOT?: ItemScalarWhereWithAggregatesInput | ItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Item"> | number
    name?: StringWithAggregatesFilter<"Item"> | string
    description?: StringNullableWithAggregatesFilter<"Item"> | string | null
    restaurantId?: IntWithAggregatesFilter<"Item"> | number
  }

  export type DiscountCodeWhereInput = {
    AND?: DiscountCodeWhereInput | DiscountCodeWhereInput[]
    OR?: DiscountCodeWhereInput[]
    NOT?: DiscountCodeWhereInput | DiscountCodeWhereInput[]
    id?: IntFilter<"DiscountCode"> | number
    code?: StringFilter<"DiscountCode"> | string
    activationTime?: DateTimeFilter<"DiscountCode"> | Date | string
    expirationTime?: DateTimeFilter<"DiscountCode"> | Date | string
    discountPercent?: FloatFilter<"DiscountCode"> | number
    requirements?: JsonFilter<"DiscountCode">
    restaurantId?: IntFilter<"DiscountCode"> | number
    restaurant?: XOR<UserScalarRelationFilter, UserWhereInput>
    applicableItems?: DiscountCodeItemListRelationFilter
    redemptions?: RedemptionListRelationFilter
  }

  export type DiscountCodeOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    activationTime?: SortOrder
    expirationTime?: SortOrder
    discountPercent?: SortOrder
    requirements?: SortOrder
    restaurantId?: SortOrder
    restaurant?: UserOrderByWithRelationInput
    applicableItems?: DiscountCodeItemOrderByRelationAggregateInput
    redemptions?: RedemptionOrderByRelationAggregateInput
  }

  export type DiscountCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: DiscountCodeWhereInput | DiscountCodeWhereInput[]
    OR?: DiscountCodeWhereInput[]
    NOT?: DiscountCodeWhereInput | DiscountCodeWhereInput[]
    activationTime?: DateTimeFilter<"DiscountCode"> | Date | string
    expirationTime?: DateTimeFilter<"DiscountCode"> | Date | string
    discountPercent?: FloatFilter<"DiscountCode"> | number
    requirements?: JsonFilter<"DiscountCode">
    restaurantId?: IntFilter<"DiscountCode"> | number
    restaurant?: XOR<UserScalarRelationFilter, UserWhereInput>
    applicableItems?: DiscountCodeItemListRelationFilter
    redemptions?: RedemptionListRelationFilter
  }, "id" | "code">

  export type DiscountCodeOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    activationTime?: SortOrder
    expirationTime?: SortOrder
    discountPercent?: SortOrder
    requirements?: SortOrder
    restaurantId?: SortOrder
    _count?: DiscountCodeCountOrderByAggregateInput
    _avg?: DiscountCodeAvgOrderByAggregateInput
    _max?: DiscountCodeMaxOrderByAggregateInput
    _min?: DiscountCodeMinOrderByAggregateInput
    _sum?: DiscountCodeSumOrderByAggregateInput
  }

  export type DiscountCodeScalarWhereWithAggregatesInput = {
    AND?: DiscountCodeScalarWhereWithAggregatesInput | DiscountCodeScalarWhereWithAggregatesInput[]
    OR?: DiscountCodeScalarWhereWithAggregatesInput[]
    NOT?: DiscountCodeScalarWhereWithAggregatesInput | DiscountCodeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DiscountCode"> | number
    code?: StringWithAggregatesFilter<"DiscountCode"> | string
    activationTime?: DateTimeWithAggregatesFilter<"DiscountCode"> | Date | string
    expirationTime?: DateTimeWithAggregatesFilter<"DiscountCode"> | Date | string
    discountPercent?: FloatWithAggregatesFilter<"DiscountCode"> | number
    requirements?: JsonWithAggregatesFilter<"DiscountCode">
    restaurantId?: IntWithAggregatesFilter<"DiscountCode"> | number
  }

  export type DiscountCodeItemWhereInput = {
    AND?: DiscountCodeItemWhereInput | DiscountCodeItemWhereInput[]
    OR?: DiscountCodeItemWhereInput[]
    NOT?: DiscountCodeItemWhereInput | DiscountCodeItemWhereInput[]
    id?: IntFilter<"DiscountCodeItem"> | number
    discountCodeId?: IntFilter<"DiscountCodeItem"> | number
    itemId?: IntFilter<"DiscountCodeItem"> | number
    discountCode?: XOR<DiscountCodeScalarRelationFilter, DiscountCodeWhereInput>
    item?: XOR<ItemScalarRelationFilter, ItemWhereInput>
  }

  export type DiscountCodeItemOrderByWithRelationInput = {
    id?: SortOrder
    discountCodeId?: SortOrder
    itemId?: SortOrder
    discountCode?: DiscountCodeOrderByWithRelationInput
    item?: ItemOrderByWithRelationInput
  }

  export type DiscountCodeItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DiscountCodeItemWhereInput | DiscountCodeItemWhereInput[]
    OR?: DiscountCodeItemWhereInput[]
    NOT?: DiscountCodeItemWhereInput | DiscountCodeItemWhereInput[]
    discountCodeId?: IntFilter<"DiscountCodeItem"> | number
    itemId?: IntFilter<"DiscountCodeItem"> | number
    discountCode?: XOR<DiscountCodeScalarRelationFilter, DiscountCodeWhereInput>
    item?: XOR<ItemScalarRelationFilter, ItemWhereInput>
  }, "id">

  export type DiscountCodeItemOrderByWithAggregationInput = {
    id?: SortOrder
    discountCodeId?: SortOrder
    itemId?: SortOrder
    _count?: DiscountCodeItemCountOrderByAggregateInput
    _avg?: DiscountCodeItemAvgOrderByAggregateInput
    _max?: DiscountCodeItemMaxOrderByAggregateInput
    _min?: DiscountCodeItemMinOrderByAggregateInput
    _sum?: DiscountCodeItemSumOrderByAggregateInput
  }

  export type DiscountCodeItemScalarWhereWithAggregatesInput = {
    AND?: DiscountCodeItemScalarWhereWithAggregatesInput | DiscountCodeItemScalarWhereWithAggregatesInput[]
    OR?: DiscountCodeItemScalarWhereWithAggregatesInput[]
    NOT?: DiscountCodeItemScalarWhereWithAggregatesInput | DiscountCodeItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DiscountCodeItem"> | number
    discountCodeId?: IntWithAggregatesFilter<"DiscountCodeItem"> | number
    itemId?: IntWithAggregatesFilter<"DiscountCodeItem"> | number
  }

  export type RedemptionWhereInput = {
    AND?: RedemptionWhereInput | RedemptionWhereInput[]
    OR?: RedemptionWhereInput[]
    NOT?: RedemptionWhereInput | RedemptionWhereInput[]
    id?: IntFilter<"Redemption"> | number
    influencerId?: IntFilter<"Redemption"> | number
    discountCodeId?: IntFilter<"Redemption"> | number
    status?: EnumDiscountStatusFilter<"Redemption"> | $Enums.DiscountStatus
    redeemedAt?: DateTimeNullableFilter<"Redemption"> | Date | string | null
    discountCode?: XOR<DiscountCodeScalarRelationFilter, DiscountCodeWhereInput>
    influencer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RedemptionOrderByWithRelationInput = {
    id?: SortOrder
    influencerId?: SortOrder
    discountCodeId?: SortOrder
    status?: SortOrder
    redeemedAt?: SortOrderInput | SortOrder
    discountCode?: DiscountCodeOrderByWithRelationInput
    influencer?: UserOrderByWithRelationInput
  }

  export type RedemptionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RedemptionWhereInput | RedemptionWhereInput[]
    OR?: RedemptionWhereInput[]
    NOT?: RedemptionWhereInput | RedemptionWhereInput[]
    influencerId?: IntFilter<"Redemption"> | number
    discountCodeId?: IntFilter<"Redemption"> | number
    status?: EnumDiscountStatusFilter<"Redemption"> | $Enums.DiscountStatus
    redeemedAt?: DateTimeNullableFilter<"Redemption"> | Date | string | null
    discountCode?: XOR<DiscountCodeScalarRelationFilter, DiscountCodeWhereInput>
    influencer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type RedemptionOrderByWithAggregationInput = {
    id?: SortOrder
    influencerId?: SortOrder
    discountCodeId?: SortOrder
    status?: SortOrder
    redeemedAt?: SortOrderInput | SortOrder
    _count?: RedemptionCountOrderByAggregateInput
    _avg?: RedemptionAvgOrderByAggregateInput
    _max?: RedemptionMaxOrderByAggregateInput
    _min?: RedemptionMinOrderByAggregateInput
    _sum?: RedemptionSumOrderByAggregateInput
  }

  export type RedemptionScalarWhereWithAggregatesInput = {
    AND?: RedemptionScalarWhereWithAggregatesInput | RedemptionScalarWhereWithAggregatesInput[]
    OR?: RedemptionScalarWhereWithAggregatesInput[]
    NOT?: RedemptionScalarWhereWithAggregatesInput | RedemptionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Redemption"> | number
    influencerId?: IntWithAggregatesFilter<"Redemption"> | number
    discountCodeId?: IntWithAggregatesFilter<"Redemption"> | number
    status?: EnumDiscountStatusWithAggregatesFilter<"Redemption"> | $Enums.DiscountStatus
    redeemedAt?: DateTimeNullableWithAggregatesFilter<"Redemption"> | Date | string | null
  }

  export type UserCreateInput = {
    email: string
    password: string
    userType: $Enums.UserType
    discounts?: DiscountCodeCreateNestedManyWithoutRestaurantInput
    items?: ItemCreateNestedManyWithoutRestaurantInput
    redemptions?: RedemptionCreateNestedManyWithoutInfluencerInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    userType: $Enums.UserType
    discounts?: DiscountCodeUncheckedCreateNestedManyWithoutRestaurantInput
    items?: ItemUncheckedCreateNestedManyWithoutRestaurantInput
    redemptions?: RedemptionUncheckedCreateNestedManyWithoutInfluencerInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    discounts?: DiscountCodeUpdateManyWithoutRestaurantNestedInput
    items?: ItemUpdateManyWithoutRestaurantNestedInput
    redemptions?: RedemptionUpdateManyWithoutInfluencerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    discounts?: DiscountCodeUncheckedUpdateManyWithoutRestaurantNestedInput
    items?: ItemUncheckedUpdateManyWithoutRestaurantNestedInput
    redemptions?: RedemptionUncheckedUpdateManyWithoutInfluencerNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password: string
    userType: $Enums.UserType
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
  }

  export type ItemCreateInput = {
    name: string
    description?: string | null
    discounts?: DiscountCodeItemCreateNestedManyWithoutItemInput
    restaurant: UserCreateNestedOneWithoutItemsInput
  }

  export type ItemUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    restaurantId: number
    discounts?: DiscountCodeItemUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    discounts?: DiscountCodeItemUpdateManyWithoutItemNestedInput
    restaurant?: UserUpdateOneRequiredWithoutItemsNestedInput
  }

  export type ItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    restaurantId?: IntFieldUpdateOperationsInput | number
    discounts?: DiscountCodeItemUncheckedUpdateManyWithoutItemNestedInput
  }

  export type ItemCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    restaurantId: number
  }

  export type ItemUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    restaurantId?: IntFieldUpdateOperationsInput | number
  }

  export type DiscountCodeCreateInput = {
    code: string
    activationTime: Date | string
    expirationTime: Date | string
    discountPercent: number
    requirements: JsonNullValueInput | InputJsonValue
    restaurant: UserCreateNestedOneWithoutDiscountsInput
    applicableItems?: DiscountCodeItemCreateNestedManyWithoutDiscountCodeInput
    redemptions?: RedemptionCreateNestedManyWithoutDiscountCodeInput
  }

  export type DiscountCodeUncheckedCreateInput = {
    id?: number
    code: string
    activationTime: Date | string
    expirationTime: Date | string
    discountPercent: number
    requirements: JsonNullValueInput | InputJsonValue
    restaurantId: number
    applicableItems?: DiscountCodeItemUncheckedCreateNestedManyWithoutDiscountCodeInput
    redemptions?: RedemptionUncheckedCreateNestedManyWithoutDiscountCodeInput
  }

  export type DiscountCodeUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    activationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    discountPercent?: FloatFieldUpdateOperationsInput | number
    requirements?: JsonNullValueInput | InputJsonValue
    restaurant?: UserUpdateOneRequiredWithoutDiscountsNestedInput
    applicableItems?: DiscountCodeItemUpdateManyWithoutDiscountCodeNestedInput
    redemptions?: RedemptionUpdateManyWithoutDiscountCodeNestedInput
  }

  export type DiscountCodeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    activationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    discountPercent?: FloatFieldUpdateOperationsInput | number
    requirements?: JsonNullValueInput | InputJsonValue
    restaurantId?: IntFieldUpdateOperationsInput | number
    applicableItems?: DiscountCodeItemUncheckedUpdateManyWithoutDiscountCodeNestedInput
    redemptions?: RedemptionUncheckedUpdateManyWithoutDiscountCodeNestedInput
  }

  export type DiscountCodeCreateManyInput = {
    id?: number
    code: string
    activationTime: Date | string
    expirationTime: Date | string
    discountPercent: number
    requirements: JsonNullValueInput | InputJsonValue
    restaurantId: number
  }

  export type DiscountCodeUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    activationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    discountPercent?: FloatFieldUpdateOperationsInput | number
    requirements?: JsonNullValueInput | InputJsonValue
  }

  export type DiscountCodeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    activationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    discountPercent?: FloatFieldUpdateOperationsInput | number
    requirements?: JsonNullValueInput | InputJsonValue
    restaurantId?: IntFieldUpdateOperationsInput | number
  }

  export type DiscountCodeItemCreateInput = {
    discountCode: DiscountCodeCreateNestedOneWithoutApplicableItemsInput
    item: ItemCreateNestedOneWithoutDiscountsInput
  }

  export type DiscountCodeItemUncheckedCreateInput = {
    id?: number
    discountCodeId: number
    itemId: number
  }

  export type DiscountCodeItemUpdateInput = {
    discountCode?: DiscountCodeUpdateOneRequiredWithoutApplicableItemsNestedInput
    item?: ItemUpdateOneRequiredWithoutDiscountsNestedInput
  }

  export type DiscountCodeItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    discountCodeId?: IntFieldUpdateOperationsInput | number
    itemId?: IntFieldUpdateOperationsInput | number
  }

  export type DiscountCodeItemCreateManyInput = {
    id?: number
    discountCodeId: number
    itemId: number
  }

  export type DiscountCodeItemUpdateManyMutationInput = {

  }

  export type DiscountCodeItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    discountCodeId?: IntFieldUpdateOperationsInput | number
    itemId?: IntFieldUpdateOperationsInput | number
  }

  export type RedemptionCreateInput = {
    status: $Enums.DiscountStatus
    redeemedAt?: Date | string | null
    discountCode: DiscountCodeCreateNestedOneWithoutRedemptionsInput
    influencer: UserCreateNestedOneWithoutRedemptionsInput
  }

  export type RedemptionUncheckedCreateInput = {
    id?: number
    influencerId: number
    discountCodeId: number
    status: $Enums.DiscountStatus
    redeemedAt?: Date | string | null
  }

  export type RedemptionUpdateInput = {
    status?: EnumDiscountStatusFieldUpdateOperationsInput | $Enums.DiscountStatus
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discountCode?: DiscountCodeUpdateOneRequiredWithoutRedemptionsNestedInput
    influencer?: UserUpdateOneRequiredWithoutRedemptionsNestedInput
  }

  export type RedemptionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    influencerId?: IntFieldUpdateOperationsInput | number
    discountCodeId?: IntFieldUpdateOperationsInput | number
    status?: EnumDiscountStatusFieldUpdateOperationsInput | $Enums.DiscountStatus
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RedemptionCreateManyInput = {
    id?: number
    influencerId: number
    discountCodeId: number
    status: $Enums.DiscountStatus
    redeemedAt?: Date | string | null
  }

  export type RedemptionUpdateManyMutationInput = {
    status?: EnumDiscountStatusFieldUpdateOperationsInput | $Enums.DiscountStatus
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RedemptionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    influencerId?: IntFieldUpdateOperationsInput | number
    discountCodeId?: IntFieldUpdateOperationsInput | number
    status?: EnumDiscountStatusFieldUpdateOperationsInput | $Enums.DiscountStatus
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type EnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType
  }

  export type DiscountCodeListRelationFilter = {
    every?: DiscountCodeWhereInput
    some?: DiscountCodeWhereInput
    none?: DiscountCodeWhereInput
  }

  export type ItemListRelationFilter = {
    every?: ItemWhereInput
    some?: ItemWhereInput
    none?: ItemWhereInput
  }

  export type RedemptionListRelationFilter = {
    every?: RedemptionWhereInput
    some?: RedemptionWhereInput
    none?: RedemptionWhereInput
  }

  export type DiscountCodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RedemptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    userType?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    userType?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    userType?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type EnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserTypeFilter<$PrismaModel>
    _max?: NestedEnumUserTypeFilter<$PrismaModel>
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

  export type DiscountCodeItemListRelationFilter = {
    every?: DiscountCodeItemWhereInput
    some?: DiscountCodeItemWhereInput
    none?: DiscountCodeItemWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DiscountCodeItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ItemCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    restaurantId?: SortOrder
  }

  export type ItemAvgOrderByAggregateInput = {
    id?: SortOrder
    restaurantId?: SortOrder
  }

  export type ItemMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    restaurantId?: SortOrder
  }

  export type ItemMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    restaurantId?: SortOrder
  }

  export type ItemSumOrderByAggregateInput = {
    id?: SortOrder
    restaurantId?: SortOrder
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
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DiscountCodeCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    activationTime?: SortOrder
    expirationTime?: SortOrder
    discountPercent?: SortOrder
    requirements?: SortOrder
    restaurantId?: SortOrder
  }

  export type DiscountCodeAvgOrderByAggregateInput = {
    id?: SortOrder
    discountPercent?: SortOrder
    restaurantId?: SortOrder
  }

  export type DiscountCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    activationTime?: SortOrder
    expirationTime?: SortOrder
    discountPercent?: SortOrder
    restaurantId?: SortOrder
  }

  export type DiscountCodeMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    activationTime?: SortOrder
    expirationTime?: SortOrder
    discountPercent?: SortOrder
    restaurantId?: SortOrder
  }

  export type DiscountCodeSumOrderByAggregateInput = {
    id?: SortOrder
    discountPercent?: SortOrder
    restaurantId?: SortOrder
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
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DiscountCodeScalarRelationFilter = {
    is?: DiscountCodeWhereInput
    isNot?: DiscountCodeWhereInput
  }

  export type ItemScalarRelationFilter = {
    is?: ItemWhereInput
    isNot?: ItemWhereInput
  }

  export type DiscountCodeItemCountOrderByAggregateInput = {
    id?: SortOrder
    discountCodeId?: SortOrder
    itemId?: SortOrder
  }

  export type DiscountCodeItemAvgOrderByAggregateInput = {
    id?: SortOrder
    discountCodeId?: SortOrder
    itemId?: SortOrder
  }

  export type DiscountCodeItemMaxOrderByAggregateInput = {
    id?: SortOrder
    discountCodeId?: SortOrder
    itemId?: SortOrder
  }

  export type DiscountCodeItemMinOrderByAggregateInput = {
    id?: SortOrder
    discountCodeId?: SortOrder
    itemId?: SortOrder
  }

  export type DiscountCodeItemSumOrderByAggregateInput = {
    id?: SortOrder
    discountCodeId?: SortOrder
    itemId?: SortOrder
  }

  export type EnumDiscountStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DiscountStatus | EnumDiscountStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DiscountStatus[] | ListEnumDiscountStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DiscountStatus[] | ListEnumDiscountStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDiscountStatusFilter<$PrismaModel> | $Enums.DiscountStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type RedemptionCountOrderByAggregateInput = {
    id?: SortOrder
    influencerId?: SortOrder
    discountCodeId?: SortOrder
    status?: SortOrder
    redeemedAt?: SortOrder
  }

  export type RedemptionAvgOrderByAggregateInput = {
    id?: SortOrder
    influencerId?: SortOrder
    discountCodeId?: SortOrder
  }

  export type RedemptionMaxOrderByAggregateInput = {
    id?: SortOrder
    influencerId?: SortOrder
    discountCodeId?: SortOrder
    status?: SortOrder
    redeemedAt?: SortOrder
  }

  export type RedemptionMinOrderByAggregateInput = {
    id?: SortOrder
    influencerId?: SortOrder
    discountCodeId?: SortOrder
    status?: SortOrder
    redeemedAt?: SortOrder
  }

  export type RedemptionSumOrderByAggregateInput = {
    id?: SortOrder
    influencerId?: SortOrder
    discountCodeId?: SortOrder
  }

  export type EnumDiscountStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DiscountStatus | EnumDiscountStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DiscountStatus[] | ListEnumDiscountStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DiscountStatus[] | ListEnumDiscountStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDiscountStatusWithAggregatesFilter<$PrismaModel> | $Enums.DiscountStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDiscountStatusFilter<$PrismaModel>
    _max?: NestedEnumDiscountStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DiscountCodeCreateNestedManyWithoutRestaurantInput = {
    create?: XOR<DiscountCodeCreateWithoutRestaurantInput, DiscountCodeUncheckedCreateWithoutRestaurantInput> | DiscountCodeCreateWithoutRestaurantInput[] | DiscountCodeUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: DiscountCodeCreateOrConnectWithoutRestaurantInput | DiscountCodeCreateOrConnectWithoutRestaurantInput[]
    createMany?: DiscountCodeCreateManyRestaurantInputEnvelope
    connect?: DiscountCodeWhereUniqueInput | DiscountCodeWhereUniqueInput[]
  }

  export type ItemCreateNestedManyWithoutRestaurantInput = {
    create?: XOR<ItemCreateWithoutRestaurantInput, ItemUncheckedCreateWithoutRestaurantInput> | ItemCreateWithoutRestaurantInput[] | ItemUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutRestaurantInput | ItemCreateOrConnectWithoutRestaurantInput[]
    createMany?: ItemCreateManyRestaurantInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type RedemptionCreateNestedManyWithoutInfluencerInput = {
    create?: XOR<RedemptionCreateWithoutInfluencerInput, RedemptionUncheckedCreateWithoutInfluencerInput> | RedemptionCreateWithoutInfluencerInput[] | RedemptionUncheckedCreateWithoutInfluencerInput[]
    connectOrCreate?: RedemptionCreateOrConnectWithoutInfluencerInput | RedemptionCreateOrConnectWithoutInfluencerInput[]
    createMany?: RedemptionCreateManyInfluencerInputEnvelope
    connect?: RedemptionWhereUniqueInput | RedemptionWhereUniqueInput[]
  }

  export type DiscountCodeUncheckedCreateNestedManyWithoutRestaurantInput = {
    create?: XOR<DiscountCodeCreateWithoutRestaurantInput, DiscountCodeUncheckedCreateWithoutRestaurantInput> | DiscountCodeCreateWithoutRestaurantInput[] | DiscountCodeUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: DiscountCodeCreateOrConnectWithoutRestaurantInput | DiscountCodeCreateOrConnectWithoutRestaurantInput[]
    createMany?: DiscountCodeCreateManyRestaurantInputEnvelope
    connect?: DiscountCodeWhereUniqueInput | DiscountCodeWhereUniqueInput[]
  }

  export type ItemUncheckedCreateNestedManyWithoutRestaurantInput = {
    create?: XOR<ItemCreateWithoutRestaurantInput, ItemUncheckedCreateWithoutRestaurantInput> | ItemCreateWithoutRestaurantInput[] | ItemUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutRestaurantInput | ItemCreateOrConnectWithoutRestaurantInput[]
    createMany?: ItemCreateManyRestaurantInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type RedemptionUncheckedCreateNestedManyWithoutInfluencerInput = {
    create?: XOR<RedemptionCreateWithoutInfluencerInput, RedemptionUncheckedCreateWithoutInfluencerInput> | RedemptionCreateWithoutInfluencerInput[] | RedemptionUncheckedCreateWithoutInfluencerInput[]
    connectOrCreate?: RedemptionCreateOrConnectWithoutInfluencerInput | RedemptionCreateOrConnectWithoutInfluencerInput[]
    createMany?: RedemptionCreateManyInfluencerInputEnvelope
    connect?: RedemptionWhereUniqueInput | RedemptionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserTypeFieldUpdateOperationsInput = {
    set?: $Enums.UserType
  }

  export type DiscountCodeUpdateManyWithoutRestaurantNestedInput = {
    create?: XOR<DiscountCodeCreateWithoutRestaurantInput, DiscountCodeUncheckedCreateWithoutRestaurantInput> | DiscountCodeCreateWithoutRestaurantInput[] | DiscountCodeUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: DiscountCodeCreateOrConnectWithoutRestaurantInput | DiscountCodeCreateOrConnectWithoutRestaurantInput[]
    upsert?: DiscountCodeUpsertWithWhereUniqueWithoutRestaurantInput | DiscountCodeUpsertWithWhereUniqueWithoutRestaurantInput[]
    createMany?: DiscountCodeCreateManyRestaurantInputEnvelope
    set?: DiscountCodeWhereUniqueInput | DiscountCodeWhereUniqueInput[]
    disconnect?: DiscountCodeWhereUniqueInput | DiscountCodeWhereUniqueInput[]
    delete?: DiscountCodeWhereUniqueInput | DiscountCodeWhereUniqueInput[]
    connect?: DiscountCodeWhereUniqueInput | DiscountCodeWhereUniqueInput[]
    update?: DiscountCodeUpdateWithWhereUniqueWithoutRestaurantInput | DiscountCodeUpdateWithWhereUniqueWithoutRestaurantInput[]
    updateMany?: DiscountCodeUpdateManyWithWhereWithoutRestaurantInput | DiscountCodeUpdateManyWithWhereWithoutRestaurantInput[]
    deleteMany?: DiscountCodeScalarWhereInput | DiscountCodeScalarWhereInput[]
  }

  export type ItemUpdateManyWithoutRestaurantNestedInput = {
    create?: XOR<ItemCreateWithoutRestaurantInput, ItemUncheckedCreateWithoutRestaurantInput> | ItemCreateWithoutRestaurantInput[] | ItemUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutRestaurantInput | ItemCreateOrConnectWithoutRestaurantInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutRestaurantInput | ItemUpsertWithWhereUniqueWithoutRestaurantInput[]
    createMany?: ItemCreateManyRestaurantInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutRestaurantInput | ItemUpdateWithWhereUniqueWithoutRestaurantInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutRestaurantInput | ItemUpdateManyWithWhereWithoutRestaurantInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type RedemptionUpdateManyWithoutInfluencerNestedInput = {
    create?: XOR<RedemptionCreateWithoutInfluencerInput, RedemptionUncheckedCreateWithoutInfluencerInput> | RedemptionCreateWithoutInfluencerInput[] | RedemptionUncheckedCreateWithoutInfluencerInput[]
    connectOrCreate?: RedemptionCreateOrConnectWithoutInfluencerInput | RedemptionCreateOrConnectWithoutInfluencerInput[]
    upsert?: RedemptionUpsertWithWhereUniqueWithoutInfluencerInput | RedemptionUpsertWithWhereUniqueWithoutInfluencerInput[]
    createMany?: RedemptionCreateManyInfluencerInputEnvelope
    set?: RedemptionWhereUniqueInput | RedemptionWhereUniqueInput[]
    disconnect?: RedemptionWhereUniqueInput | RedemptionWhereUniqueInput[]
    delete?: RedemptionWhereUniqueInput | RedemptionWhereUniqueInput[]
    connect?: RedemptionWhereUniqueInput | RedemptionWhereUniqueInput[]
    update?: RedemptionUpdateWithWhereUniqueWithoutInfluencerInput | RedemptionUpdateWithWhereUniqueWithoutInfluencerInput[]
    updateMany?: RedemptionUpdateManyWithWhereWithoutInfluencerInput | RedemptionUpdateManyWithWhereWithoutInfluencerInput[]
    deleteMany?: RedemptionScalarWhereInput | RedemptionScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DiscountCodeUncheckedUpdateManyWithoutRestaurantNestedInput = {
    create?: XOR<DiscountCodeCreateWithoutRestaurantInput, DiscountCodeUncheckedCreateWithoutRestaurantInput> | DiscountCodeCreateWithoutRestaurantInput[] | DiscountCodeUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: DiscountCodeCreateOrConnectWithoutRestaurantInput | DiscountCodeCreateOrConnectWithoutRestaurantInput[]
    upsert?: DiscountCodeUpsertWithWhereUniqueWithoutRestaurantInput | DiscountCodeUpsertWithWhereUniqueWithoutRestaurantInput[]
    createMany?: DiscountCodeCreateManyRestaurantInputEnvelope
    set?: DiscountCodeWhereUniqueInput | DiscountCodeWhereUniqueInput[]
    disconnect?: DiscountCodeWhereUniqueInput | DiscountCodeWhereUniqueInput[]
    delete?: DiscountCodeWhereUniqueInput | DiscountCodeWhereUniqueInput[]
    connect?: DiscountCodeWhereUniqueInput | DiscountCodeWhereUniqueInput[]
    update?: DiscountCodeUpdateWithWhereUniqueWithoutRestaurantInput | DiscountCodeUpdateWithWhereUniqueWithoutRestaurantInput[]
    updateMany?: DiscountCodeUpdateManyWithWhereWithoutRestaurantInput | DiscountCodeUpdateManyWithWhereWithoutRestaurantInput[]
    deleteMany?: DiscountCodeScalarWhereInput | DiscountCodeScalarWhereInput[]
  }

  export type ItemUncheckedUpdateManyWithoutRestaurantNestedInput = {
    create?: XOR<ItemCreateWithoutRestaurantInput, ItemUncheckedCreateWithoutRestaurantInput> | ItemCreateWithoutRestaurantInput[] | ItemUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutRestaurantInput | ItemCreateOrConnectWithoutRestaurantInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutRestaurantInput | ItemUpsertWithWhereUniqueWithoutRestaurantInput[]
    createMany?: ItemCreateManyRestaurantInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutRestaurantInput | ItemUpdateWithWhereUniqueWithoutRestaurantInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutRestaurantInput | ItemUpdateManyWithWhereWithoutRestaurantInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type RedemptionUncheckedUpdateManyWithoutInfluencerNestedInput = {
    create?: XOR<RedemptionCreateWithoutInfluencerInput, RedemptionUncheckedCreateWithoutInfluencerInput> | RedemptionCreateWithoutInfluencerInput[] | RedemptionUncheckedCreateWithoutInfluencerInput[]
    connectOrCreate?: RedemptionCreateOrConnectWithoutInfluencerInput | RedemptionCreateOrConnectWithoutInfluencerInput[]
    upsert?: RedemptionUpsertWithWhereUniqueWithoutInfluencerInput | RedemptionUpsertWithWhereUniqueWithoutInfluencerInput[]
    createMany?: RedemptionCreateManyInfluencerInputEnvelope
    set?: RedemptionWhereUniqueInput | RedemptionWhereUniqueInput[]
    disconnect?: RedemptionWhereUniqueInput | RedemptionWhereUniqueInput[]
    delete?: RedemptionWhereUniqueInput | RedemptionWhereUniqueInput[]
    connect?: RedemptionWhereUniqueInput | RedemptionWhereUniqueInput[]
    update?: RedemptionUpdateWithWhereUniqueWithoutInfluencerInput | RedemptionUpdateWithWhereUniqueWithoutInfluencerInput[]
    updateMany?: RedemptionUpdateManyWithWhereWithoutInfluencerInput | RedemptionUpdateManyWithWhereWithoutInfluencerInput[]
    deleteMany?: RedemptionScalarWhereInput | RedemptionScalarWhereInput[]
  }

  export type DiscountCodeItemCreateNestedManyWithoutItemInput = {
    create?: XOR<DiscountCodeItemCreateWithoutItemInput, DiscountCodeItemUncheckedCreateWithoutItemInput> | DiscountCodeItemCreateWithoutItemInput[] | DiscountCodeItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: DiscountCodeItemCreateOrConnectWithoutItemInput | DiscountCodeItemCreateOrConnectWithoutItemInput[]
    createMany?: DiscountCodeItemCreateManyItemInputEnvelope
    connect?: DiscountCodeItemWhereUniqueInput | DiscountCodeItemWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutItemsInput = {
    create?: XOR<UserCreateWithoutItemsInput, UserUncheckedCreateWithoutItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutItemsInput
    connect?: UserWhereUniqueInput
  }

  export type DiscountCodeItemUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<DiscountCodeItemCreateWithoutItemInput, DiscountCodeItemUncheckedCreateWithoutItemInput> | DiscountCodeItemCreateWithoutItemInput[] | DiscountCodeItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: DiscountCodeItemCreateOrConnectWithoutItemInput | DiscountCodeItemCreateOrConnectWithoutItemInput[]
    createMany?: DiscountCodeItemCreateManyItemInputEnvelope
    connect?: DiscountCodeItemWhereUniqueInput | DiscountCodeItemWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DiscountCodeItemUpdateManyWithoutItemNestedInput = {
    create?: XOR<DiscountCodeItemCreateWithoutItemInput, DiscountCodeItemUncheckedCreateWithoutItemInput> | DiscountCodeItemCreateWithoutItemInput[] | DiscountCodeItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: DiscountCodeItemCreateOrConnectWithoutItemInput | DiscountCodeItemCreateOrConnectWithoutItemInput[]
    upsert?: DiscountCodeItemUpsertWithWhereUniqueWithoutItemInput | DiscountCodeItemUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: DiscountCodeItemCreateManyItemInputEnvelope
    set?: DiscountCodeItemWhereUniqueInput | DiscountCodeItemWhereUniqueInput[]
    disconnect?: DiscountCodeItemWhereUniqueInput | DiscountCodeItemWhereUniqueInput[]
    delete?: DiscountCodeItemWhereUniqueInput | DiscountCodeItemWhereUniqueInput[]
    connect?: DiscountCodeItemWhereUniqueInput | DiscountCodeItemWhereUniqueInput[]
    update?: DiscountCodeItemUpdateWithWhereUniqueWithoutItemInput | DiscountCodeItemUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: DiscountCodeItemUpdateManyWithWhereWithoutItemInput | DiscountCodeItemUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: DiscountCodeItemScalarWhereInput | DiscountCodeItemScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<UserCreateWithoutItemsInput, UserUncheckedCreateWithoutItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutItemsInput
    upsert?: UserUpsertWithoutItemsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutItemsInput, UserUpdateWithoutItemsInput>, UserUncheckedUpdateWithoutItemsInput>
  }

  export type DiscountCodeItemUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<DiscountCodeItemCreateWithoutItemInput, DiscountCodeItemUncheckedCreateWithoutItemInput> | DiscountCodeItemCreateWithoutItemInput[] | DiscountCodeItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: DiscountCodeItemCreateOrConnectWithoutItemInput | DiscountCodeItemCreateOrConnectWithoutItemInput[]
    upsert?: DiscountCodeItemUpsertWithWhereUniqueWithoutItemInput | DiscountCodeItemUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: DiscountCodeItemCreateManyItemInputEnvelope
    set?: DiscountCodeItemWhereUniqueInput | DiscountCodeItemWhereUniqueInput[]
    disconnect?: DiscountCodeItemWhereUniqueInput | DiscountCodeItemWhereUniqueInput[]
    delete?: DiscountCodeItemWhereUniqueInput | DiscountCodeItemWhereUniqueInput[]
    connect?: DiscountCodeItemWhereUniqueInput | DiscountCodeItemWhereUniqueInput[]
    update?: DiscountCodeItemUpdateWithWhereUniqueWithoutItemInput | DiscountCodeItemUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: DiscountCodeItemUpdateManyWithWhereWithoutItemInput | DiscountCodeItemUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: DiscountCodeItemScalarWhereInput | DiscountCodeItemScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDiscountsInput = {
    create?: XOR<UserCreateWithoutDiscountsInput, UserUncheckedCreateWithoutDiscountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDiscountsInput
    connect?: UserWhereUniqueInput
  }

  export type DiscountCodeItemCreateNestedManyWithoutDiscountCodeInput = {
    create?: XOR<DiscountCodeItemCreateWithoutDiscountCodeInput, DiscountCodeItemUncheckedCreateWithoutDiscountCodeInput> | DiscountCodeItemCreateWithoutDiscountCodeInput[] | DiscountCodeItemUncheckedCreateWithoutDiscountCodeInput[]
    connectOrCreate?: DiscountCodeItemCreateOrConnectWithoutDiscountCodeInput | DiscountCodeItemCreateOrConnectWithoutDiscountCodeInput[]
    createMany?: DiscountCodeItemCreateManyDiscountCodeInputEnvelope
    connect?: DiscountCodeItemWhereUniqueInput | DiscountCodeItemWhereUniqueInput[]
  }

  export type RedemptionCreateNestedManyWithoutDiscountCodeInput = {
    create?: XOR<RedemptionCreateWithoutDiscountCodeInput, RedemptionUncheckedCreateWithoutDiscountCodeInput> | RedemptionCreateWithoutDiscountCodeInput[] | RedemptionUncheckedCreateWithoutDiscountCodeInput[]
    connectOrCreate?: RedemptionCreateOrConnectWithoutDiscountCodeInput | RedemptionCreateOrConnectWithoutDiscountCodeInput[]
    createMany?: RedemptionCreateManyDiscountCodeInputEnvelope
    connect?: RedemptionWhereUniqueInput | RedemptionWhereUniqueInput[]
  }

  export type DiscountCodeItemUncheckedCreateNestedManyWithoutDiscountCodeInput = {
    create?: XOR<DiscountCodeItemCreateWithoutDiscountCodeInput, DiscountCodeItemUncheckedCreateWithoutDiscountCodeInput> | DiscountCodeItemCreateWithoutDiscountCodeInput[] | DiscountCodeItemUncheckedCreateWithoutDiscountCodeInput[]
    connectOrCreate?: DiscountCodeItemCreateOrConnectWithoutDiscountCodeInput | DiscountCodeItemCreateOrConnectWithoutDiscountCodeInput[]
    createMany?: DiscountCodeItemCreateManyDiscountCodeInputEnvelope
    connect?: DiscountCodeItemWhereUniqueInput | DiscountCodeItemWhereUniqueInput[]
  }

  export type RedemptionUncheckedCreateNestedManyWithoutDiscountCodeInput = {
    create?: XOR<RedemptionCreateWithoutDiscountCodeInput, RedemptionUncheckedCreateWithoutDiscountCodeInput> | RedemptionCreateWithoutDiscountCodeInput[] | RedemptionUncheckedCreateWithoutDiscountCodeInput[]
    connectOrCreate?: RedemptionCreateOrConnectWithoutDiscountCodeInput | RedemptionCreateOrConnectWithoutDiscountCodeInput[]
    createMany?: RedemptionCreateManyDiscountCodeInputEnvelope
    connect?: RedemptionWhereUniqueInput | RedemptionWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutDiscountsNestedInput = {
    create?: XOR<UserCreateWithoutDiscountsInput, UserUncheckedCreateWithoutDiscountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDiscountsInput
    upsert?: UserUpsertWithoutDiscountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDiscountsInput, UserUpdateWithoutDiscountsInput>, UserUncheckedUpdateWithoutDiscountsInput>
  }

  export type DiscountCodeItemUpdateManyWithoutDiscountCodeNestedInput = {
    create?: XOR<DiscountCodeItemCreateWithoutDiscountCodeInput, DiscountCodeItemUncheckedCreateWithoutDiscountCodeInput> | DiscountCodeItemCreateWithoutDiscountCodeInput[] | DiscountCodeItemUncheckedCreateWithoutDiscountCodeInput[]
    connectOrCreate?: DiscountCodeItemCreateOrConnectWithoutDiscountCodeInput | DiscountCodeItemCreateOrConnectWithoutDiscountCodeInput[]
    upsert?: DiscountCodeItemUpsertWithWhereUniqueWithoutDiscountCodeInput | DiscountCodeItemUpsertWithWhereUniqueWithoutDiscountCodeInput[]
    createMany?: DiscountCodeItemCreateManyDiscountCodeInputEnvelope
    set?: DiscountCodeItemWhereUniqueInput | DiscountCodeItemWhereUniqueInput[]
    disconnect?: DiscountCodeItemWhereUniqueInput | DiscountCodeItemWhereUniqueInput[]
    delete?: DiscountCodeItemWhereUniqueInput | DiscountCodeItemWhereUniqueInput[]
    connect?: DiscountCodeItemWhereUniqueInput | DiscountCodeItemWhereUniqueInput[]
    update?: DiscountCodeItemUpdateWithWhereUniqueWithoutDiscountCodeInput | DiscountCodeItemUpdateWithWhereUniqueWithoutDiscountCodeInput[]
    updateMany?: DiscountCodeItemUpdateManyWithWhereWithoutDiscountCodeInput | DiscountCodeItemUpdateManyWithWhereWithoutDiscountCodeInput[]
    deleteMany?: DiscountCodeItemScalarWhereInput | DiscountCodeItemScalarWhereInput[]
  }

  export type RedemptionUpdateManyWithoutDiscountCodeNestedInput = {
    create?: XOR<RedemptionCreateWithoutDiscountCodeInput, RedemptionUncheckedCreateWithoutDiscountCodeInput> | RedemptionCreateWithoutDiscountCodeInput[] | RedemptionUncheckedCreateWithoutDiscountCodeInput[]
    connectOrCreate?: RedemptionCreateOrConnectWithoutDiscountCodeInput | RedemptionCreateOrConnectWithoutDiscountCodeInput[]
    upsert?: RedemptionUpsertWithWhereUniqueWithoutDiscountCodeInput | RedemptionUpsertWithWhereUniqueWithoutDiscountCodeInput[]
    createMany?: RedemptionCreateManyDiscountCodeInputEnvelope
    set?: RedemptionWhereUniqueInput | RedemptionWhereUniqueInput[]
    disconnect?: RedemptionWhereUniqueInput | RedemptionWhereUniqueInput[]
    delete?: RedemptionWhereUniqueInput | RedemptionWhereUniqueInput[]
    connect?: RedemptionWhereUniqueInput | RedemptionWhereUniqueInput[]
    update?: RedemptionUpdateWithWhereUniqueWithoutDiscountCodeInput | RedemptionUpdateWithWhereUniqueWithoutDiscountCodeInput[]
    updateMany?: RedemptionUpdateManyWithWhereWithoutDiscountCodeInput | RedemptionUpdateManyWithWhereWithoutDiscountCodeInput[]
    deleteMany?: RedemptionScalarWhereInput | RedemptionScalarWhereInput[]
  }

  export type DiscountCodeItemUncheckedUpdateManyWithoutDiscountCodeNestedInput = {
    create?: XOR<DiscountCodeItemCreateWithoutDiscountCodeInput, DiscountCodeItemUncheckedCreateWithoutDiscountCodeInput> | DiscountCodeItemCreateWithoutDiscountCodeInput[] | DiscountCodeItemUncheckedCreateWithoutDiscountCodeInput[]
    connectOrCreate?: DiscountCodeItemCreateOrConnectWithoutDiscountCodeInput | DiscountCodeItemCreateOrConnectWithoutDiscountCodeInput[]
    upsert?: DiscountCodeItemUpsertWithWhereUniqueWithoutDiscountCodeInput | DiscountCodeItemUpsertWithWhereUniqueWithoutDiscountCodeInput[]
    createMany?: DiscountCodeItemCreateManyDiscountCodeInputEnvelope
    set?: DiscountCodeItemWhereUniqueInput | DiscountCodeItemWhereUniqueInput[]
    disconnect?: DiscountCodeItemWhereUniqueInput | DiscountCodeItemWhereUniqueInput[]
    delete?: DiscountCodeItemWhereUniqueInput | DiscountCodeItemWhereUniqueInput[]
    connect?: DiscountCodeItemWhereUniqueInput | DiscountCodeItemWhereUniqueInput[]
    update?: DiscountCodeItemUpdateWithWhereUniqueWithoutDiscountCodeInput | DiscountCodeItemUpdateWithWhereUniqueWithoutDiscountCodeInput[]
    updateMany?: DiscountCodeItemUpdateManyWithWhereWithoutDiscountCodeInput | DiscountCodeItemUpdateManyWithWhereWithoutDiscountCodeInput[]
    deleteMany?: DiscountCodeItemScalarWhereInput | DiscountCodeItemScalarWhereInput[]
  }

  export type RedemptionUncheckedUpdateManyWithoutDiscountCodeNestedInput = {
    create?: XOR<RedemptionCreateWithoutDiscountCodeInput, RedemptionUncheckedCreateWithoutDiscountCodeInput> | RedemptionCreateWithoutDiscountCodeInput[] | RedemptionUncheckedCreateWithoutDiscountCodeInput[]
    connectOrCreate?: RedemptionCreateOrConnectWithoutDiscountCodeInput | RedemptionCreateOrConnectWithoutDiscountCodeInput[]
    upsert?: RedemptionUpsertWithWhereUniqueWithoutDiscountCodeInput | RedemptionUpsertWithWhereUniqueWithoutDiscountCodeInput[]
    createMany?: RedemptionCreateManyDiscountCodeInputEnvelope
    set?: RedemptionWhereUniqueInput | RedemptionWhereUniqueInput[]
    disconnect?: RedemptionWhereUniqueInput | RedemptionWhereUniqueInput[]
    delete?: RedemptionWhereUniqueInput | RedemptionWhereUniqueInput[]
    connect?: RedemptionWhereUniqueInput | RedemptionWhereUniqueInput[]
    update?: RedemptionUpdateWithWhereUniqueWithoutDiscountCodeInput | RedemptionUpdateWithWhereUniqueWithoutDiscountCodeInput[]
    updateMany?: RedemptionUpdateManyWithWhereWithoutDiscountCodeInput | RedemptionUpdateManyWithWhereWithoutDiscountCodeInput[]
    deleteMany?: RedemptionScalarWhereInput | RedemptionScalarWhereInput[]
  }

  export type DiscountCodeCreateNestedOneWithoutApplicableItemsInput = {
    create?: XOR<DiscountCodeCreateWithoutApplicableItemsInput, DiscountCodeUncheckedCreateWithoutApplicableItemsInput>
    connectOrCreate?: DiscountCodeCreateOrConnectWithoutApplicableItemsInput
    connect?: DiscountCodeWhereUniqueInput
  }

  export type ItemCreateNestedOneWithoutDiscountsInput = {
    create?: XOR<ItemCreateWithoutDiscountsInput, ItemUncheckedCreateWithoutDiscountsInput>
    connectOrCreate?: ItemCreateOrConnectWithoutDiscountsInput
    connect?: ItemWhereUniqueInput
  }

  export type DiscountCodeUpdateOneRequiredWithoutApplicableItemsNestedInput = {
    create?: XOR<DiscountCodeCreateWithoutApplicableItemsInput, DiscountCodeUncheckedCreateWithoutApplicableItemsInput>
    connectOrCreate?: DiscountCodeCreateOrConnectWithoutApplicableItemsInput
    upsert?: DiscountCodeUpsertWithoutApplicableItemsInput
    connect?: DiscountCodeWhereUniqueInput
    update?: XOR<XOR<DiscountCodeUpdateToOneWithWhereWithoutApplicableItemsInput, DiscountCodeUpdateWithoutApplicableItemsInput>, DiscountCodeUncheckedUpdateWithoutApplicableItemsInput>
  }

  export type ItemUpdateOneRequiredWithoutDiscountsNestedInput = {
    create?: XOR<ItemCreateWithoutDiscountsInput, ItemUncheckedCreateWithoutDiscountsInput>
    connectOrCreate?: ItemCreateOrConnectWithoutDiscountsInput
    upsert?: ItemUpsertWithoutDiscountsInput
    connect?: ItemWhereUniqueInput
    update?: XOR<XOR<ItemUpdateToOneWithWhereWithoutDiscountsInput, ItemUpdateWithoutDiscountsInput>, ItemUncheckedUpdateWithoutDiscountsInput>
  }

  export type DiscountCodeCreateNestedOneWithoutRedemptionsInput = {
    create?: XOR<DiscountCodeCreateWithoutRedemptionsInput, DiscountCodeUncheckedCreateWithoutRedemptionsInput>
    connectOrCreate?: DiscountCodeCreateOrConnectWithoutRedemptionsInput
    connect?: DiscountCodeWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRedemptionsInput = {
    create?: XOR<UserCreateWithoutRedemptionsInput, UserUncheckedCreateWithoutRedemptionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRedemptionsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumDiscountStatusFieldUpdateOperationsInput = {
    set?: $Enums.DiscountStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DiscountCodeUpdateOneRequiredWithoutRedemptionsNestedInput = {
    create?: XOR<DiscountCodeCreateWithoutRedemptionsInput, DiscountCodeUncheckedCreateWithoutRedemptionsInput>
    connectOrCreate?: DiscountCodeCreateOrConnectWithoutRedemptionsInput
    upsert?: DiscountCodeUpsertWithoutRedemptionsInput
    connect?: DiscountCodeWhereUniqueInput
    update?: XOR<XOR<DiscountCodeUpdateToOneWithWhereWithoutRedemptionsInput, DiscountCodeUpdateWithoutRedemptionsInput>, DiscountCodeUncheckedUpdateWithoutRedemptionsInput>
  }

  export type UserUpdateOneRequiredWithoutRedemptionsNestedInput = {
    create?: XOR<UserCreateWithoutRedemptionsInput, UserUncheckedCreateWithoutRedemptionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRedemptionsInput
    upsert?: UserUpsertWithoutRedemptionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRedemptionsInput, UserUpdateWithoutRedemptionsInput>, UserUncheckedUpdateWithoutRedemptionsInput>
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

  export type NestedEnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType
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

  export type NestedEnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserTypeFilter<$PrismaModel>
    _max?: NestedEnumUserTypeFilter<$PrismaModel>
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
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumDiscountStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DiscountStatus | EnumDiscountStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DiscountStatus[] | ListEnumDiscountStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DiscountStatus[] | ListEnumDiscountStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDiscountStatusFilter<$PrismaModel> | $Enums.DiscountStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumDiscountStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DiscountStatus | EnumDiscountStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DiscountStatus[] | ListEnumDiscountStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DiscountStatus[] | ListEnumDiscountStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDiscountStatusWithAggregatesFilter<$PrismaModel> | $Enums.DiscountStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDiscountStatusFilter<$PrismaModel>
    _max?: NestedEnumDiscountStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DiscountCodeCreateWithoutRestaurantInput = {
    code: string
    activationTime: Date | string
    expirationTime: Date | string
    discountPercent: number
    requirements: JsonNullValueInput | InputJsonValue
    applicableItems?: DiscountCodeItemCreateNestedManyWithoutDiscountCodeInput
    redemptions?: RedemptionCreateNestedManyWithoutDiscountCodeInput
  }

  export type DiscountCodeUncheckedCreateWithoutRestaurantInput = {
    id?: number
    code: string
    activationTime: Date | string
    expirationTime: Date | string
    discountPercent: number
    requirements: JsonNullValueInput | InputJsonValue
    applicableItems?: DiscountCodeItemUncheckedCreateNestedManyWithoutDiscountCodeInput
    redemptions?: RedemptionUncheckedCreateNestedManyWithoutDiscountCodeInput
  }

  export type DiscountCodeCreateOrConnectWithoutRestaurantInput = {
    where: DiscountCodeWhereUniqueInput
    create: XOR<DiscountCodeCreateWithoutRestaurantInput, DiscountCodeUncheckedCreateWithoutRestaurantInput>
  }

  export type DiscountCodeCreateManyRestaurantInputEnvelope = {
    data: DiscountCodeCreateManyRestaurantInput | DiscountCodeCreateManyRestaurantInput[]
    skipDuplicates?: boolean
  }

  export type ItemCreateWithoutRestaurantInput = {
    name: string
    description?: string | null
    discounts?: DiscountCodeItemCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateWithoutRestaurantInput = {
    id?: number
    name: string
    description?: string | null
    discounts?: DiscountCodeItemUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemCreateOrConnectWithoutRestaurantInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutRestaurantInput, ItemUncheckedCreateWithoutRestaurantInput>
  }

  export type ItemCreateManyRestaurantInputEnvelope = {
    data: ItemCreateManyRestaurantInput | ItemCreateManyRestaurantInput[]
    skipDuplicates?: boolean
  }

  export type RedemptionCreateWithoutInfluencerInput = {
    status: $Enums.DiscountStatus
    redeemedAt?: Date | string | null
    discountCode: DiscountCodeCreateNestedOneWithoutRedemptionsInput
  }

  export type RedemptionUncheckedCreateWithoutInfluencerInput = {
    id?: number
    discountCodeId: number
    status: $Enums.DiscountStatus
    redeemedAt?: Date | string | null
  }

  export type RedemptionCreateOrConnectWithoutInfluencerInput = {
    where: RedemptionWhereUniqueInput
    create: XOR<RedemptionCreateWithoutInfluencerInput, RedemptionUncheckedCreateWithoutInfluencerInput>
  }

  export type RedemptionCreateManyInfluencerInputEnvelope = {
    data: RedemptionCreateManyInfluencerInput | RedemptionCreateManyInfluencerInput[]
    skipDuplicates?: boolean
  }

  export type DiscountCodeUpsertWithWhereUniqueWithoutRestaurantInput = {
    where: DiscountCodeWhereUniqueInput
    update: XOR<DiscountCodeUpdateWithoutRestaurantInput, DiscountCodeUncheckedUpdateWithoutRestaurantInput>
    create: XOR<DiscountCodeCreateWithoutRestaurantInput, DiscountCodeUncheckedCreateWithoutRestaurantInput>
  }

  export type DiscountCodeUpdateWithWhereUniqueWithoutRestaurantInput = {
    where: DiscountCodeWhereUniqueInput
    data: XOR<DiscountCodeUpdateWithoutRestaurantInput, DiscountCodeUncheckedUpdateWithoutRestaurantInput>
  }

  export type DiscountCodeUpdateManyWithWhereWithoutRestaurantInput = {
    where: DiscountCodeScalarWhereInput
    data: XOR<DiscountCodeUpdateManyMutationInput, DiscountCodeUncheckedUpdateManyWithoutRestaurantInput>
  }

  export type DiscountCodeScalarWhereInput = {
    AND?: DiscountCodeScalarWhereInput | DiscountCodeScalarWhereInput[]
    OR?: DiscountCodeScalarWhereInput[]
    NOT?: DiscountCodeScalarWhereInput | DiscountCodeScalarWhereInput[]
    id?: IntFilter<"DiscountCode"> | number
    code?: StringFilter<"DiscountCode"> | string
    activationTime?: DateTimeFilter<"DiscountCode"> | Date | string
    expirationTime?: DateTimeFilter<"DiscountCode"> | Date | string
    discountPercent?: FloatFilter<"DiscountCode"> | number
    requirements?: JsonFilter<"DiscountCode">
    restaurantId?: IntFilter<"DiscountCode"> | number
  }

  export type ItemUpsertWithWhereUniqueWithoutRestaurantInput = {
    where: ItemWhereUniqueInput
    update: XOR<ItemUpdateWithoutRestaurantInput, ItemUncheckedUpdateWithoutRestaurantInput>
    create: XOR<ItemCreateWithoutRestaurantInput, ItemUncheckedCreateWithoutRestaurantInput>
  }

  export type ItemUpdateWithWhereUniqueWithoutRestaurantInput = {
    where: ItemWhereUniqueInput
    data: XOR<ItemUpdateWithoutRestaurantInput, ItemUncheckedUpdateWithoutRestaurantInput>
  }

  export type ItemUpdateManyWithWhereWithoutRestaurantInput = {
    where: ItemScalarWhereInput
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyWithoutRestaurantInput>
  }

  export type ItemScalarWhereInput = {
    AND?: ItemScalarWhereInput | ItemScalarWhereInput[]
    OR?: ItemScalarWhereInput[]
    NOT?: ItemScalarWhereInput | ItemScalarWhereInput[]
    id?: IntFilter<"Item"> | number
    name?: StringFilter<"Item"> | string
    description?: StringNullableFilter<"Item"> | string | null
    restaurantId?: IntFilter<"Item"> | number
  }

  export type RedemptionUpsertWithWhereUniqueWithoutInfluencerInput = {
    where: RedemptionWhereUniqueInput
    update: XOR<RedemptionUpdateWithoutInfluencerInput, RedemptionUncheckedUpdateWithoutInfluencerInput>
    create: XOR<RedemptionCreateWithoutInfluencerInput, RedemptionUncheckedCreateWithoutInfluencerInput>
  }

  export type RedemptionUpdateWithWhereUniqueWithoutInfluencerInput = {
    where: RedemptionWhereUniqueInput
    data: XOR<RedemptionUpdateWithoutInfluencerInput, RedemptionUncheckedUpdateWithoutInfluencerInput>
  }

  export type RedemptionUpdateManyWithWhereWithoutInfluencerInput = {
    where: RedemptionScalarWhereInput
    data: XOR<RedemptionUpdateManyMutationInput, RedemptionUncheckedUpdateManyWithoutInfluencerInput>
  }

  export type RedemptionScalarWhereInput = {
    AND?: RedemptionScalarWhereInput | RedemptionScalarWhereInput[]
    OR?: RedemptionScalarWhereInput[]
    NOT?: RedemptionScalarWhereInput | RedemptionScalarWhereInput[]
    id?: IntFilter<"Redemption"> | number
    influencerId?: IntFilter<"Redemption"> | number
    discountCodeId?: IntFilter<"Redemption"> | number
    status?: EnumDiscountStatusFilter<"Redemption"> | $Enums.DiscountStatus
    redeemedAt?: DateTimeNullableFilter<"Redemption"> | Date | string | null
  }

  export type DiscountCodeItemCreateWithoutItemInput = {
    discountCode: DiscountCodeCreateNestedOneWithoutApplicableItemsInput
  }

  export type DiscountCodeItemUncheckedCreateWithoutItemInput = {
    id?: number
    discountCodeId: number
  }

  export type DiscountCodeItemCreateOrConnectWithoutItemInput = {
    where: DiscountCodeItemWhereUniqueInput
    create: XOR<DiscountCodeItemCreateWithoutItemInput, DiscountCodeItemUncheckedCreateWithoutItemInput>
  }

  export type DiscountCodeItemCreateManyItemInputEnvelope = {
    data: DiscountCodeItemCreateManyItemInput | DiscountCodeItemCreateManyItemInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutItemsInput = {
    email: string
    password: string
    userType: $Enums.UserType
    discounts?: DiscountCodeCreateNestedManyWithoutRestaurantInput
    redemptions?: RedemptionCreateNestedManyWithoutInfluencerInput
  }

  export type UserUncheckedCreateWithoutItemsInput = {
    id?: number
    email: string
    password: string
    userType: $Enums.UserType
    discounts?: DiscountCodeUncheckedCreateNestedManyWithoutRestaurantInput
    redemptions?: RedemptionUncheckedCreateNestedManyWithoutInfluencerInput
  }

  export type UserCreateOrConnectWithoutItemsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutItemsInput, UserUncheckedCreateWithoutItemsInput>
  }

  export type DiscountCodeItemUpsertWithWhereUniqueWithoutItemInput = {
    where: DiscountCodeItemWhereUniqueInput
    update: XOR<DiscountCodeItemUpdateWithoutItemInput, DiscountCodeItemUncheckedUpdateWithoutItemInput>
    create: XOR<DiscountCodeItemCreateWithoutItemInput, DiscountCodeItemUncheckedCreateWithoutItemInput>
  }

  export type DiscountCodeItemUpdateWithWhereUniqueWithoutItemInput = {
    where: DiscountCodeItemWhereUniqueInput
    data: XOR<DiscountCodeItemUpdateWithoutItemInput, DiscountCodeItemUncheckedUpdateWithoutItemInput>
  }

  export type DiscountCodeItemUpdateManyWithWhereWithoutItemInput = {
    where: DiscountCodeItemScalarWhereInput
    data: XOR<DiscountCodeItemUpdateManyMutationInput, DiscountCodeItemUncheckedUpdateManyWithoutItemInput>
  }

  export type DiscountCodeItemScalarWhereInput = {
    AND?: DiscountCodeItemScalarWhereInput | DiscountCodeItemScalarWhereInput[]
    OR?: DiscountCodeItemScalarWhereInput[]
    NOT?: DiscountCodeItemScalarWhereInput | DiscountCodeItemScalarWhereInput[]
    id?: IntFilter<"DiscountCodeItem"> | number
    discountCodeId?: IntFilter<"DiscountCodeItem"> | number
    itemId?: IntFilter<"DiscountCodeItem"> | number
  }

  export type UserUpsertWithoutItemsInput = {
    update: XOR<UserUpdateWithoutItemsInput, UserUncheckedUpdateWithoutItemsInput>
    create: XOR<UserCreateWithoutItemsInput, UserUncheckedCreateWithoutItemsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutItemsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutItemsInput, UserUncheckedUpdateWithoutItemsInput>
  }

  export type UserUpdateWithoutItemsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    discounts?: DiscountCodeUpdateManyWithoutRestaurantNestedInput
    redemptions?: RedemptionUpdateManyWithoutInfluencerNestedInput
  }

  export type UserUncheckedUpdateWithoutItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    discounts?: DiscountCodeUncheckedUpdateManyWithoutRestaurantNestedInput
    redemptions?: RedemptionUncheckedUpdateManyWithoutInfluencerNestedInput
  }

  export type UserCreateWithoutDiscountsInput = {
    email: string
    password: string
    userType: $Enums.UserType
    items?: ItemCreateNestedManyWithoutRestaurantInput
    redemptions?: RedemptionCreateNestedManyWithoutInfluencerInput
  }

  export type UserUncheckedCreateWithoutDiscountsInput = {
    id?: number
    email: string
    password: string
    userType: $Enums.UserType
    items?: ItemUncheckedCreateNestedManyWithoutRestaurantInput
    redemptions?: RedemptionUncheckedCreateNestedManyWithoutInfluencerInput
  }

  export type UserCreateOrConnectWithoutDiscountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDiscountsInput, UserUncheckedCreateWithoutDiscountsInput>
  }

  export type DiscountCodeItemCreateWithoutDiscountCodeInput = {
    item: ItemCreateNestedOneWithoutDiscountsInput
  }

  export type DiscountCodeItemUncheckedCreateWithoutDiscountCodeInput = {
    id?: number
    itemId: number
  }

  export type DiscountCodeItemCreateOrConnectWithoutDiscountCodeInput = {
    where: DiscountCodeItemWhereUniqueInput
    create: XOR<DiscountCodeItemCreateWithoutDiscountCodeInput, DiscountCodeItemUncheckedCreateWithoutDiscountCodeInput>
  }

  export type DiscountCodeItemCreateManyDiscountCodeInputEnvelope = {
    data: DiscountCodeItemCreateManyDiscountCodeInput | DiscountCodeItemCreateManyDiscountCodeInput[]
    skipDuplicates?: boolean
  }

  export type RedemptionCreateWithoutDiscountCodeInput = {
    status: $Enums.DiscountStatus
    redeemedAt?: Date | string | null
    influencer: UserCreateNestedOneWithoutRedemptionsInput
  }

  export type RedemptionUncheckedCreateWithoutDiscountCodeInput = {
    id?: number
    influencerId: number
    status: $Enums.DiscountStatus
    redeemedAt?: Date | string | null
  }

  export type RedemptionCreateOrConnectWithoutDiscountCodeInput = {
    where: RedemptionWhereUniqueInput
    create: XOR<RedemptionCreateWithoutDiscountCodeInput, RedemptionUncheckedCreateWithoutDiscountCodeInput>
  }

  export type RedemptionCreateManyDiscountCodeInputEnvelope = {
    data: RedemptionCreateManyDiscountCodeInput | RedemptionCreateManyDiscountCodeInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDiscountsInput = {
    update: XOR<UserUpdateWithoutDiscountsInput, UserUncheckedUpdateWithoutDiscountsInput>
    create: XOR<UserCreateWithoutDiscountsInput, UserUncheckedCreateWithoutDiscountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDiscountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDiscountsInput, UserUncheckedUpdateWithoutDiscountsInput>
  }

  export type UserUpdateWithoutDiscountsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    items?: ItemUpdateManyWithoutRestaurantNestedInput
    redemptions?: RedemptionUpdateManyWithoutInfluencerNestedInput
  }

  export type UserUncheckedUpdateWithoutDiscountsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    items?: ItemUncheckedUpdateManyWithoutRestaurantNestedInput
    redemptions?: RedemptionUncheckedUpdateManyWithoutInfluencerNestedInput
  }

  export type DiscountCodeItemUpsertWithWhereUniqueWithoutDiscountCodeInput = {
    where: DiscountCodeItemWhereUniqueInput
    update: XOR<DiscountCodeItemUpdateWithoutDiscountCodeInput, DiscountCodeItemUncheckedUpdateWithoutDiscountCodeInput>
    create: XOR<DiscountCodeItemCreateWithoutDiscountCodeInput, DiscountCodeItemUncheckedCreateWithoutDiscountCodeInput>
  }

  export type DiscountCodeItemUpdateWithWhereUniqueWithoutDiscountCodeInput = {
    where: DiscountCodeItemWhereUniqueInput
    data: XOR<DiscountCodeItemUpdateWithoutDiscountCodeInput, DiscountCodeItemUncheckedUpdateWithoutDiscountCodeInput>
  }

  export type DiscountCodeItemUpdateManyWithWhereWithoutDiscountCodeInput = {
    where: DiscountCodeItemScalarWhereInput
    data: XOR<DiscountCodeItemUpdateManyMutationInput, DiscountCodeItemUncheckedUpdateManyWithoutDiscountCodeInput>
  }

  export type RedemptionUpsertWithWhereUniqueWithoutDiscountCodeInput = {
    where: RedemptionWhereUniqueInput
    update: XOR<RedemptionUpdateWithoutDiscountCodeInput, RedemptionUncheckedUpdateWithoutDiscountCodeInput>
    create: XOR<RedemptionCreateWithoutDiscountCodeInput, RedemptionUncheckedCreateWithoutDiscountCodeInput>
  }

  export type RedemptionUpdateWithWhereUniqueWithoutDiscountCodeInput = {
    where: RedemptionWhereUniqueInput
    data: XOR<RedemptionUpdateWithoutDiscountCodeInput, RedemptionUncheckedUpdateWithoutDiscountCodeInput>
  }

  export type RedemptionUpdateManyWithWhereWithoutDiscountCodeInput = {
    where: RedemptionScalarWhereInput
    data: XOR<RedemptionUpdateManyMutationInput, RedemptionUncheckedUpdateManyWithoutDiscountCodeInput>
  }

  export type DiscountCodeCreateWithoutApplicableItemsInput = {
    code: string
    activationTime: Date | string
    expirationTime: Date | string
    discountPercent: number
    requirements: JsonNullValueInput | InputJsonValue
    restaurant: UserCreateNestedOneWithoutDiscountsInput
    redemptions?: RedemptionCreateNestedManyWithoutDiscountCodeInput
  }

  export type DiscountCodeUncheckedCreateWithoutApplicableItemsInput = {
    id?: number
    code: string
    activationTime: Date | string
    expirationTime: Date | string
    discountPercent: number
    requirements: JsonNullValueInput | InputJsonValue
    restaurantId: number
    redemptions?: RedemptionUncheckedCreateNestedManyWithoutDiscountCodeInput
  }

  export type DiscountCodeCreateOrConnectWithoutApplicableItemsInput = {
    where: DiscountCodeWhereUniqueInput
    create: XOR<DiscountCodeCreateWithoutApplicableItemsInput, DiscountCodeUncheckedCreateWithoutApplicableItemsInput>
  }

  export type ItemCreateWithoutDiscountsInput = {
    name: string
    description?: string | null
    restaurant: UserCreateNestedOneWithoutItemsInput
  }

  export type ItemUncheckedCreateWithoutDiscountsInput = {
    id?: number
    name: string
    description?: string | null
    restaurantId: number
  }

  export type ItemCreateOrConnectWithoutDiscountsInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutDiscountsInput, ItemUncheckedCreateWithoutDiscountsInput>
  }

  export type DiscountCodeUpsertWithoutApplicableItemsInput = {
    update: XOR<DiscountCodeUpdateWithoutApplicableItemsInput, DiscountCodeUncheckedUpdateWithoutApplicableItemsInput>
    create: XOR<DiscountCodeCreateWithoutApplicableItemsInput, DiscountCodeUncheckedCreateWithoutApplicableItemsInput>
    where?: DiscountCodeWhereInput
  }

  export type DiscountCodeUpdateToOneWithWhereWithoutApplicableItemsInput = {
    where?: DiscountCodeWhereInput
    data: XOR<DiscountCodeUpdateWithoutApplicableItemsInput, DiscountCodeUncheckedUpdateWithoutApplicableItemsInput>
  }

  export type DiscountCodeUpdateWithoutApplicableItemsInput = {
    code?: StringFieldUpdateOperationsInput | string
    activationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    discountPercent?: FloatFieldUpdateOperationsInput | number
    requirements?: JsonNullValueInput | InputJsonValue
    restaurant?: UserUpdateOneRequiredWithoutDiscountsNestedInput
    redemptions?: RedemptionUpdateManyWithoutDiscountCodeNestedInput
  }

  export type DiscountCodeUncheckedUpdateWithoutApplicableItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    activationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    discountPercent?: FloatFieldUpdateOperationsInput | number
    requirements?: JsonNullValueInput | InputJsonValue
    restaurantId?: IntFieldUpdateOperationsInput | number
    redemptions?: RedemptionUncheckedUpdateManyWithoutDiscountCodeNestedInput
  }

  export type ItemUpsertWithoutDiscountsInput = {
    update: XOR<ItemUpdateWithoutDiscountsInput, ItemUncheckedUpdateWithoutDiscountsInput>
    create: XOR<ItemCreateWithoutDiscountsInput, ItemUncheckedCreateWithoutDiscountsInput>
    where?: ItemWhereInput
  }

  export type ItemUpdateToOneWithWhereWithoutDiscountsInput = {
    where?: ItemWhereInput
    data: XOR<ItemUpdateWithoutDiscountsInput, ItemUncheckedUpdateWithoutDiscountsInput>
  }

  export type ItemUpdateWithoutDiscountsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    restaurant?: UserUpdateOneRequiredWithoutItemsNestedInput
  }

  export type ItemUncheckedUpdateWithoutDiscountsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    restaurantId?: IntFieldUpdateOperationsInput | number
  }

  export type DiscountCodeCreateWithoutRedemptionsInput = {
    code: string
    activationTime: Date | string
    expirationTime: Date | string
    discountPercent: number
    requirements: JsonNullValueInput | InputJsonValue
    restaurant: UserCreateNestedOneWithoutDiscountsInput
    applicableItems?: DiscountCodeItemCreateNestedManyWithoutDiscountCodeInput
  }

  export type DiscountCodeUncheckedCreateWithoutRedemptionsInput = {
    id?: number
    code: string
    activationTime: Date | string
    expirationTime: Date | string
    discountPercent: number
    requirements: JsonNullValueInput | InputJsonValue
    restaurantId: number
    applicableItems?: DiscountCodeItemUncheckedCreateNestedManyWithoutDiscountCodeInput
  }

  export type DiscountCodeCreateOrConnectWithoutRedemptionsInput = {
    where: DiscountCodeWhereUniqueInput
    create: XOR<DiscountCodeCreateWithoutRedemptionsInput, DiscountCodeUncheckedCreateWithoutRedemptionsInput>
  }

  export type UserCreateWithoutRedemptionsInput = {
    email: string
    password: string
    userType: $Enums.UserType
    discounts?: DiscountCodeCreateNestedManyWithoutRestaurantInput
    items?: ItemCreateNestedManyWithoutRestaurantInput
  }

  export type UserUncheckedCreateWithoutRedemptionsInput = {
    id?: number
    email: string
    password: string
    userType: $Enums.UserType
    discounts?: DiscountCodeUncheckedCreateNestedManyWithoutRestaurantInput
    items?: ItemUncheckedCreateNestedManyWithoutRestaurantInput
  }

  export type UserCreateOrConnectWithoutRedemptionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRedemptionsInput, UserUncheckedCreateWithoutRedemptionsInput>
  }

  export type DiscountCodeUpsertWithoutRedemptionsInput = {
    update: XOR<DiscountCodeUpdateWithoutRedemptionsInput, DiscountCodeUncheckedUpdateWithoutRedemptionsInput>
    create: XOR<DiscountCodeCreateWithoutRedemptionsInput, DiscountCodeUncheckedCreateWithoutRedemptionsInput>
    where?: DiscountCodeWhereInput
  }

  export type DiscountCodeUpdateToOneWithWhereWithoutRedemptionsInput = {
    where?: DiscountCodeWhereInput
    data: XOR<DiscountCodeUpdateWithoutRedemptionsInput, DiscountCodeUncheckedUpdateWithoutRedemptionsInput>
  }

  export type DiscountCodeUpdateWithoutRedemptionsInput = {
    code?: StringFieldUpdateOperationsInput | string
    activationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    discountPercent?: FloatFieldUpdateOperationsInput | number
    requirements?: JsonNullValueInput | InputJsonValue
    restaurant?: UserUpdateOneRequiredWithoutDiscountsNestedInput
    applicableItems?: DiscountCodeItemUpdateManyWithoutDiscountCodeNestedInput
  }

  export type DiscountCodeUncheckedUpdateWithoutRedemptionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    activationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    discountPercent?: FloatFieldUpdateOperationsInput | number
    requirements?: JsonNullValueInput | InputJsonValue
    restaurantId?: IntFieldUpdateOperationsInput | number
    applicableItems?: DiscountCodeItemUncheckedUpdateManyWithoutDiscountCodeNestedInput
  }

  export type UserUpsertWithoutRedemptionsInput = {
    update: XOR<UserUpdateWithoutRedemptionsInput, UserUncheckedUpdateWithoutRedemptionsInput>
    create: XOR<UserCreateWithoutRedemptionsInput, UserUncheckedCreateWithoutRedemptionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRedemptionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRedemptionsInput, UserUncheckedUpdateWithoutRedemptionsInput>
  }

  export type UserUpdateWithoutRedemptionsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    discounts?: DiscountCodeUpdateManyWithoutRestaurantNestedInput
    items?: ItemUpdateManyWithoutRestaurantNestedInput
  }

  export type UserUncheckedUpdateWithoutRedemptionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    discounts?: DiscountCodeUncheckedUpdateManyWithoutRestaurantNestedInput
    items?: ItemUncheckedUpdateManyWithoutRestaurantNestedInput
  }

  export type DiscountCodeCreateManyRestaurantInput = {
    id?: number
    code: string
    activationTime: Date | string
    expirationTime: Date | string
    discountPercent: number
    requirements: JsonNullValueInput | InputJsonValue
  }

  export type ItemCreateManyRestaurantInput = {
    id?: number
    name: string
    description?: string | null
  }

  export type RedemptionCreateManyInfluencerInput = {
    id?: number
    discountCodeId: number
    status: $Enums.DiscountStatus
    redeemedAt?: Date | string | null
  }

  export type DiscountCodeUpdateWithoutRestaurantInput = {
    code?: StringFieldUpdateOperationsInput | string
    activationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    discountPercent?: FloatFieldUpdateOperationsInput | number
    requirements?: JsonNullValueInput | InputJsonValue
    applicableItems?: DiscountCodeItemUpdateManyWithoutDiscountCodeNestedInput
    redemptions?: RedemptionUpdateManyWithoutDiscountCodeNestedInput
  }

  export type DiscountCodeUncheckedUpdateWithoutRestaurantInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    activationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    discountPercent?: FloatFieldUpdateOperationsInput | number
    requirements?: JsonNullValueInput | InputJsonValue
    applicableItems?: DiscountCodeItemUncheckedUpdateManyWithoutDiscountCodeNestedInput
    redemptions?: RedemptionUncheckedUpdateManyWithoutDiscountCodeNestedInput
  }

  export type DiscountCodeUncheckedUpdateManyWithoutRestaurantInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    activationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationTime?: DateTimeFieldUpdateOperationsInput | Date | string
    discountPercent?: FloatFieldUpdateOperationsInput | number
    requirements?: JsonNullValueInput | InputJsonValue
  }

  export type ItemUpdateWithoutRestaurantInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    discounts?: DiscountCodeItemUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateWithoutRestaurantInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    discounts?: DiscountCodeItemUncheckedUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateManyWithoutRestaurantInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RedemptionUpdateWithoutInfluencerInput = {
    status?: EnumDiscountStatusFieldUpdateOperationsInput | $Enums.DiscountStatus
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discountCode?: DiscountCodeUpdateOneRequiredWithoutRedemptionsNestedInput
  }

  export type RedemptionUncheckedUpdateWithoutInfluencerInput = {
    id?: IntFieldUpdateOperationsInput | number
    discountCodeId?: IntFieldUpdateOperationsInput | number
    status?: EnumDiscountStatusFieldUpdateOperationsInput | $Enums.DiscountStatus
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RedemptionUncheckedUpdateManyWithoutInfluencerInput = {
    id?: IntFieldUpdateOperationsInput | number
    discountCodeId?: IntFieldUpdateOperationsInput | number
    status?: EnumDiscountStatusFieldUpdateOperationsInput | $Enums.DiscountStatus
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DiscountCodeItemCreateManyItemInput = {
    id?: number
    discountCodeId: number
  }

  export type DiscountCodeItemUpdateWithoutItemInput = {
    discountCode?: DiscountCodeUpdateOneRequiredWithoutApplicableItemsNestedInput
  }

  export type DiscountCodeItemUncheckedUpdateWithoutItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    discountCodeId?: IntFieldUpdateOperationsInput | number
  }

  export type DiscountCodeItemUncheckedUpdateManyWithoutItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    discountCodeId?: IntFieldUpdateOperationsInput | number
  }

  export type DiscountCodeItemCreateManyDiscountCodeInput = {
    id?: number
    itemId: number
  }

  export type RedemptionCreateManyDiscountCodeInput = {
    id?: number
    influencerId: number
    status: $Enums.DiscountStatus
    redeemedAt?: Date | string | null
  }

  export type DiscountCodeItemUpdateWithoutDiscountCodeInput = {
    item?: ItemUpdateOneRequiredWithoutDiscountsNestedInput
  }

  export type DiscountCodeItemUncheckedUpdateWithoutDiscountCodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemId?: IntFieldUpdateOperationsInput | number
  }

  export type DiscountCodeItemUncheckedUpdateManyWithoutDiscountCodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemId?: IntFieldUpdateOperationsInput | number
  }

  export type RedemptionUpdateWithoutDiscountCodeInput = {
    status?: EnumDiscountStatusFieldUpdateOperationsInput | $Enums.DiscountStatus
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    influencer?: UserUpdateOneRequiredWithoutRedemptionsNestedInput
  }

  export type RedemptionUncheckedUpdateWithoutDiscountCodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    influencerId?: IntFieldUpdateOperationsInput | number
    status?: EnumDiscountStatusFieldUpdateOperationsInput | $Enums.DiscountStatus
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RedemptionUncheckedUpdateManyWithoutDiscountCodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    influencerId?: IntFieldUpdateOperationsInput | number
    status?: EnumDiscountStatusFieldUpdateOperationsInput | $Enums.DiscountStatus
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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