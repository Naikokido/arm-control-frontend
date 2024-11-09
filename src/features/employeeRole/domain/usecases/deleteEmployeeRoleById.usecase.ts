import { type IApiResponse } from '@core/types';
import type { EmployeeRoleEntity } from '../entities';
import type { EmployeeRoleRepository } from '../repositories';

export interface DeleteEmployeeRoleByIdUseCase {
  execute: (id: EmployeeRoleEntity['id']) => Promise<IApiResponse<EmployeeRoleEntity>>;
}

export class DeleteEmployeeRoleById implements DeleteEmployeeRoleByIdUseCase {
  constructor(private readonly repository: EmployeeRoleRepository) {}

  async execute(id: EmployeeRoleEntity['id']): Promise<IApiResponse<EmployeeRoleEntity>> {
    return await this.repository.deleteEmployeeRoleById(id);
  }
}
