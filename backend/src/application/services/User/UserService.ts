import "reflect-metadata";

/*
 * UserService
 *
 */
import { injectable, inject } from "inversify";
import { Types } from "@/settings/inversify/Types";
import { DataSource, EntityManager } from "typeorm";
import { plainToClass, plainToInstance } from "class-transformer";

import { ResponseMessages } from "@/domain/utils/constants/ResponseMessages";
import { CustomException } from "@/domain/utils/types/CustomException";

import { UserEntity } from "@/domain/entities/UserEntity";
import type { IUserRepository } from "@/domain/repositories/IUserRepository";
import { IUserService } from "@/application/services/User/IUserService";
import { UserDto } from "@/application/dtos/User/UserDto";

@injectable()
export class UserService implements IUserService {
  private entityManager: EntityManager;
  private userRepository: IUserRepository;

  constructor(@inject(Types.DataSource) dataSource: DataSource, @inject(Types.UserRepository) userRepository: IUserRepository) {
    this.entityManager = dataSource.manager;
    this.userRepository = userRepository;

    this.find = this.find.bind(this);
    this.findOne = this.findOne.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.sort = this.sort.bind(this);
  }

  // Read
  async find(keys: Record<string, string>): Promise<UserDto[]> {
    // Repository operation
    const userEntities: UserEntity[] = await this.userRepository.find(keys);

    if (!userEntities.length) throw new CustomException(ResponseMessages.BAD_REQUEST.message, 400);

    // Entity -> dto mapping
    const userDtos: UserDto[] = userEntities.map((element: UserEntity) => {
      const userDto: UserDto = plainToClass(UserDto, element, { excludeExtraneousValues: true });
      return userDto;
    }, []);

    return userDtos;
  }

  // Read (one)
  async findOne(keys: Record<string, string>): Promise<UserDto | null> {
    // Repository operation
    const userEntity: UserEntity | null = await this.userRepository.findOne(keys);

    if (!userEntity) throw new CustomException(ResponseMessages.BAD_REQUEST.message, 400);

    // Entity -> dto mapping
    const userDto: UserDto = plainToClass(UserDto, userEntity, {
      excludeExtraneousValues: true,
    });

    return userDto;
  }

  // Create
  async create(userDto: UserDto): Promise<UserDto> {
    // Dto -> entity mapping
    let userEntity: UserEntity = plainToClass(UserEntity, userDto, {
      excludeExtraneousValues: true,
    });

    // Transaction & repository operation (commit or rollback)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return await this.entityManager.transaction(async (transactionalEntityManager: EntityManager) => {
      userEntity = await this.userRepository.create(userEntity);

      // Entity -> dto mapping
      const userDto: UserDto = plainToClass(UserDto, userEntity, {
        excludeExtraneousValues: true,
      });

      return userDto;
    });
  }

  // Update
  async update(userDto: UserDto): Promise<UserDto> {
    const account: string = userDto["account"] ? userDto["account"] : "";
    const keys: Record<string, string> = { account: account };

    // Dto -> entity mapping
    let userEntity: UserEntity = plainToClass(UserEntity, userDto, {
      excludeExtraneousValues: true,
    });

    // Transaction & repository operation (commit or rollback)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return await this.entityManager.transaction(async (transactionalEntityManager: EntityManager) => {
      userEntity = await this.userRepository.update(keys, userEntity);

      // Entity -> dto mapping
      // let？
      const userDto: UserDto = plainToClass(UserDto, userEntity, {
        excludeExtraneousValues: true,
      });

      return userDto;
    });
  }

  // Delete
  async delete(keys: Record<string, string>): Promise<Record<string, string>> {
    // Transaction & repository operation (commit or rollback)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return await this.entityManager.transaction(async (transactionalEntityManager: EntityManager) => {
      keys = await this.userRepository.delete(keys);

      return keys;
    });
  }

  // Sort
  async sort(userDtos: UserDto[]): Promise<number> {
    // Create sortLists
    const lists: { keys: Record<string, string>; value: number }[] = userDtos.map((element: UserDto) => {
      const account: string = element["account"] ? element["account"] : "";
      const value: number = element["sortOrder"] ? element["sortOrder"] : 0;

      const item: { keys: Record<string, string>; value: number } = {
        keys: { account: account },
        value: value,
      };

      return item;
    }, []);

    // transaction & repository operation (commit or rollback)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return await this.entityManager.transaction(async (transactionalEntityManager: EntityManager) => {
      const result: number = await this.userRepository.sort(lists);

      return result;
    });
  }
}
