import "reflect-metadata";

/*
 * UserRepository
 *
 */
import { injectable, inject } from "inversify";
import { Types } from "@/settings/inversify/Types";
import { DataSource, EntityManager } from "typeorm";
import { UserEntity } from "@/domain/entities/UserEntity";
import { IUserRepository } from "@/domain/repositories//IUserRepository";

@injectable()
export class UserRepository implements IUserRepository {
  private entityManager: EntityManager;

  constructor(@inject(Types.DataSource) dataSource: DataSource) {
    this.entityManager = dataSource.manager;

    this.find = this.find.bind(this);
    this.findOne = this.findOne.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.sort = this.sort.bind(this);
  }

  // Read
  async find(keys: Record<string, string>): Promise<UserEntity[]> {
    const userEntities: UserEntity[] = await this.entityManager.findBy(UserEntity, {
      /* FindOptions: where */
    });

    return userEntities;
  }

  async findOne(keys: Record<string, string>): Promise<UserEntity | null> {
    const account: string = keys["account"];

    const userEntity: UserEntity | null = await this.entityManager.findOneBy(UserEntity, {
      account: account,
    });

    return userEntity;
  }

  // Create
  async create(userEntity: UserEntity): Promise<UserEntity> {
    await this.entityManager.insert(UserEntity, userEntity);

    return userEntity;
  }

  // Update
  async update(keys: Record<string, string>, userEntity: UserEntity): Promise<UserEntity> {
    const account: string = keys["account"];

    await this.entityManager.update(UserEntity, [account], userEntity);

    return userEntity;
  }

  // Delete
  async delete(keys: Record<string, string>): Promise<Record<string, string>> {
    const account: string = keys["account"];

    // Logical delete
    const userEntity: UserEntity | null = await this.entityManager.findOneBy(UserEntity, {
      account: account,
    });

    if (userEntity) {
      userEntity.isDeleted = true;
      await this.entityManager.update(UserEntity, [account], userEntity);
    }

    // Physical delete sample
    // await this.entityManager.delete(UserEntity, [account])

    return keys;
  }

  // Sort
  // 同じ順序がある時、更新日の新しいものを上にする
  // isDeleted == trueは順序を後にする
  async sort<T extends { keys: Record<string, string>; value: number }>(lists: T[]): Promise<number> {
    const params: { name: string; value: unknown }[] = [];

    // 一時テーブル作成
    let sql: string = `
      DECLARE @temp TABLE (
        account int NOT NULL,
        sortOrder int NOT NULL
      )
    `;

    lists.forEach((element: any, index: number) => {
      sql += `
        INSERT INTO @temp (account, sortOrder) VALUES (@account${index}, @sortOrder${index})
      `;
      params.push({ name: `@account${index}`, value: element.keys[0] });
      params.push({ name: `@sortOrder${index}`, value: element.value });
    });

    // SQL
    sql += `
      UPDATE login_user
      SET sortOrder = B.sortOrder
      FROM login_user AS A
      LEFT OUTER JOIN (
        SELECT C.id, ROW_NUMBER() OVER (
          ORDER BY
            C.isDeleted ASC,
            D.sortOrder ASC,
            C.updatedAt DESC
        ) AS 'sortOrder
        FROM login_user AS C
        LEFT OUTER JOIN @temp AS D
        ON C.id = D.id
      ) AS B
      ON A.id = B.id
      WHERE B.id IS NOT NULL
   `;

    // Note: SQLインジェクション対策、.queryを利用
    await this.entityManager.query(sql, params);

    return 0;
  }
}
