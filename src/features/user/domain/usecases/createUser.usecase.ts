import { type IApiResponse } from '@core/types';
import type { UserRepository } from '../repositories';
import type { UserEntity } from '../entities';

export interface CreateUserUseCase {
  execute: (data: Omit<UserEntity, 'id'>) => Promise<IApiResponse<UserEntity>>;
}

export class CreateUser implements CreateUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(data: Omit<UserEntity, 'id'>): Promise<IApiResponse<UserEntity>> {
    return await this.repository.createUser(data);
  }
}
