import { type IApiResponse } from '@core/types';
import type { UserEntity } from '../entities';
import type { UserRepository } from '../repositories';

export interface DeleteUserByIdUseCase {
  execute: (id: UserEntity['id']) => Promise<IApiResponse<UserEntity>>;
}

export class DeleteUserById implements DeleteUserByIdUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: UserEntity['id']): Promise<IApiResponse<UserEntity>> {
    return await this.repository.deleteUserById(id);
  }
}
