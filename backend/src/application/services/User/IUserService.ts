/*
 * IUserService
 *
 */
import { IGenericService } from "@/domain/utilities/generic-interface/IGenericService";
import { UserDto } from "@/application/dtos/UserDto";

export interface IUserService extends IGenericService<UserDto> {
  find(keys: Record<string, string>): Promise<UserDto[]>;
  findOne(keys: Record<string, string>): Promise<UserDto | null>;
  create(userDto: UserDto): Promise<UserDto>;
  update(userDto: UserDto): Promise<UserDto>;
  delete(keys: Record<string, string>): Promise<Record<string, string>>;
  sort(userDtos: UserDto[]): Promise<number>;
}
