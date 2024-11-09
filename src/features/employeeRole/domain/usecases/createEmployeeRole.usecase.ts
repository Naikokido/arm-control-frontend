import { type IApiResponse } from '@core/types';
import type { EmployeeRoleRepository } from '../repositories';
import type { EmployeeRoleEntity } from '../entities';

export interface CreateEmployeeRoleUseCase {
  execute: (data: Omit<EmployeeRoleEntity, 'id'>) => Promise<IApiResponse<EmployeeRoleEntity>>;
}

export class CreateEmployeeRole implements CreateEmployeeRoleUseCase {
  constructor(private readonly repository: EmployeeRoleRepository) {}

  async execute(data: Omit<EmployeeRoleEntity, 'id'>): Promise<IApiResponse<EmployeeRoleEntity>> {
    return await this.repository.createEmployeeRole(data);
  }
}
