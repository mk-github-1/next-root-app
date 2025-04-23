/*
 * inversify.config.ts: InversifyのDI登録
 *
 */
import { Container } from "inversify";
import { Types } from "@/settings/inversify/Types";
import { DataSource } from "typeorm";
import { AppDataSource } from "@/data-source";

import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { UserRepository } from "@/infrastructure/repository-implements/UserRepository";

import { IUserService } from "@/application/services/User/IUserService";
import { UserService } from "@/application/services//User/UserService";

// import Ajv from 'ajv'

// 基本的にデフォルトのシングルトンスコープになる
// transientはメモリが多くかかる
const container: Container = new Container();

// container.bind<"取得する時の型(インタフェース or クラス)">("識別子").to("対象クラス")

/* AppDataSourceをDIコンテナに登録 **************************************************/
// AppDataSource.manager = EntityManagerインタフェース
// container.bind<EntityManager>('EntityManager').toConstantValue(AppDataSource)
container.bind<DataSource>(Types.DataSource).toConstantValue(AppDataSource);

// 本番環境と開発環境の切り替えサンプル
/*
  container.bind<DatabaseInterface>(Types.DataSource).toConstantValue(
    process.env.NODE_ENV === 'production' ? AppDataSource.manager : AppDataSource.manager
  );
 */

/* master **************************************************/

// User
container.bind<IUserRepository>(Types.UserRepository).to(UserRepository);
container.bind<IUserService>(Types.UserService).to(UserService);
// container.bind<IUserService>('UserService').to(UserService);

/* transaction **************************************************/

/* transaction(etc) **************************************************/

export { container }; // .createChild()
