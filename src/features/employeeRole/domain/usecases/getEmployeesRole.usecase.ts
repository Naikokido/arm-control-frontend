import type { BaseListFilters } from '@core/types';
import { type IApiResponse } from '@core/types';
import type { EmployeeRoleEntity } from '../entities';
import type { PaginationEntity } from '../../../_global';
import type { EmployeeRoleRepository } from '../repositories';

export interface GetEmployeesRoleUseCase {
  execute: (filters: BaseListFilters) => Promise<IApiResponse<PaginationEntity<EmployeeRoleEntity[]>>>;
}

export class GetEmployeesRole implements GetEmployeesRoleUseCase {
  constructor(private readonly repository: EmployeeRoleRepository) {}

  async execute(filters: BaseListFilters): Promise<IApiResponse<PaginationEntity<EmployeeRoleEntity[]>>> {
    return await this.repository.getEmployeesRole(filters);
  }
}
