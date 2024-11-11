import type { IApiResponse } from '@core/types';
import type { UserEntity } from '../entities';

export abstract class UserDatasource {
  abstract getUsers(): Promise<IApiResponse<UserEntity[]>>;
  abstract getUserById(id: UserEntity['id']): Promise<IApiResponse<UserEntity>>;
  abstract createUser(data: Omit<UserEntity, 'id'>): Promise<IApiResponse<UserEntity>>;
  abstract updateUser(data: Partial<UserEntity>): Promise<IApiResponse<UserEntity>>;
  abstract deleteUserById(id: UserEntity['id']): Promise<IApiResponse<UserEntity>>;
}
