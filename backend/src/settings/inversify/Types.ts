/*
 * types.ts:  InversifyのDIで用いる識別子を追加
 *
 */

export const Types: Record<string, symbol> = {
  // AppDataSource (TypeORM)
  DataSource: Symbol.for("DataSource"),

  /* master **************************************************/

  // User
  UserService: Symbol.for("UserService"),
  UserRepository: Symbol.for("UserRepository"),

  /* transaction **************************************************/
};
