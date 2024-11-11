import { type IApiResponse } from '@core/types';
import type { UserEntity } from '../entities';
import type { UserRepository } from '../repositories';

export interface GetUsersUseCase {
  execute: () => Promise<IApiResponse<UserEntity[]>>;
}

export class GetUsers implements GetUsersUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(): Promise<IApiResponse<UserEntity[]>> {
    return await this.repository.getUsers();
  }
}
