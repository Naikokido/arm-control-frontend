import { type IApiResponse } from '@core/types';
import type { EmployeeRoleRepository } from '../repositories';
import type { EmployeeRoleEntity } from '../entities';

export interface GetEmployeeRoleByIdUseCase {
  execute: (id: EmployeeRoleEntity['id']) => Promise<IApiResponse<EmployeeRoleEntity>>;
}

export class GetEmployeeRoleById implements GetEmployeeRoleByIdUseCase {
  constructor(private readonly repository: EmployeeRoleRepository) {}

  async execute(id: EmployeeRoleEntity['id']): Promise<IApiResponse<EmployeeRoleEntity>> {
    return await this.repository.getEmployeeRoleById(id);
  }
}
