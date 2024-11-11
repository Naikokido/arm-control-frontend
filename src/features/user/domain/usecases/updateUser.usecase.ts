import { type IApiResponse } from '@core/types';
import type { UserEntity } from '../entities';
import type { UserRepository } from '../repositories';

export interface UpdateUserUseCase {
  execute: (data: Partial<UserEntity>) => Promise<IApiResponse<UserEntity>>;
}

export class UpdateUser implements UpdateUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(data: Partial<UserEntity>): Promise<IApiResponse<UserEntity>> {
    return await this.repository.updateUser(data);
  }
}
