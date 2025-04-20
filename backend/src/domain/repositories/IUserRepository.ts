/*
 * IUserRepository
 *
 */
import { IGenericRepository } from "@/domain/utilities/generic-interface/IGenericRepository";
import { UserEntity } from "@/domain/entities/UserEntity";

export interface IUserRepository extends IGenericRepository<UserEntity> {
  find(keys: Record<string, string>): Promise<UserEntity[]>;
  findOne(keys: Record<string, string>): Promise<UserEntity | null>;
  create(userDto: UserEntity): Promise<UserEntity>;
  update(keys: Record<string, string>, userEntity: UserEntity): Promise<UserEntity>;
  delete(keys: Record<string, string>): Promise<Record<string, string>>;
  sort<T extends { keys: Record<string, string>; value: number }>(lists: T[]): Promise<number>;
}
