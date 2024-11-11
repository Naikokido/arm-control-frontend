import { type IApiResponse } from '@core/types';
import type { UserDatasource, UserEntity, UserRepository } from '../domain';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly datasource: UserDatasource) {}

  public async getUsers(): Promise<IApiResponse<UserEntity[]>> {
    return await this.datasource.getUsers();
  }

  public async getUserById(id: UserEntity['id']): Promise<IApiResponse<UserEntity>> {
    return await this.datasource.getUserById(id);
  }

  public async createUser(data: Omit<UserEntity, 'id'>): Promise<IApiResponse<UserEntity>> {
    return await this.datasource.createUser(data);
  }

  public async updateUser(data: Partial<UserEntity>): Promise<IApiResponse<UserEntity>> {
    return await this.datasource.updateUser(data);
  }

  public async deleteUserById(id: UserEntity['id']): Promise<IApiResponse<UserEntity>> {
    return await this.datasource.deleteUserById(id);
  }
}
