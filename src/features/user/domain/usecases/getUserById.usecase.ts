import { type IApiResponse } from '@core/types';
import type { UserRepository } from '../repositories';
import type { UserEntity } from '../entities';

export interface GetUserByIdUseCase {
  execute: (id: UserEntity['id']) => Promise<IApiResponse<UserEntity>>;
}

export class GetUserById implements GetUserByIdUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: UserEntity['id']): Promise<IApiResponse<UserEntity>> {
    return await this.repository.getUserById(id);
  }
}
