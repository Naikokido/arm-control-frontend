import { type IApiResponse } from '@core/types';
import type { EmployeeRoleEntity } from '../entities';
import type { EmployeeRoleRepository } from '../repositories';

export interface UpdateEmployeeRoleUseCase {
  execute: (data: Partial<EmployeeRoleEntity>) => Promise<IApiResponse<EmployeeRoleEntity>>;
}

export class UpdateEmployeeRole implements UpdateEmployeeRoleUseCase {
  constructor(private readonly repository: EmployeeRoleRepository) {}

  async execute(data: Partial<EmployeeRoleEntity>): Promise<IApiResponse<EmployeeRoleEntity>> {
    return await this.repository.updateEmployeeRole(data);
  }
}
