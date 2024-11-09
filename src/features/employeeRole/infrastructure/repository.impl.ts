import type { BaseListFilters } from '@core/types';
import { type IApiResponse } from '@core/types';
import type { EmployeeRoleDatasource, EmployeeRoleEntity, EmployeeRoleRepository } from '../domain';
import type { PaginationEntity } from '../../_global';

export class EmployeeRoleRepositoryImpl implements EmployeeRoleRepository {
  constructor(private readonly datasource: EmployeeRoleDatasource) {}

  public async getEmployeesRole(
    filters: BaseListFilters,
  ): Promise<IApiResponse<PaginationEntity<EmployeeRoleEntity[]>>> {
    return await this.datasource.getEmployeesRole(filters);
  }

  public async getEmployeeRoleById(id: EmployeeRoleEntity['id']): Promise<IApiResponse<EmployeeRoleEntity>> {
    return await this.datasource.getEmployeeRoleById(id);
  }

  public async createEmployeeRole(data: Omit<EmployeeRoleEntity, 'id'>): Promise<IApiResponse<EmployeeRoleEntity>> {
    return await this.datasource.createEmployeeRole(data);
  }

  public async updateEmployeeRole(data: Partial<EmployeeRoleEntity>): Promise<IApiResponse<EmployeeRoleEntity>> {
    return await this.datasource.updateEmployeeRole(data);
  }

  public async deleteEmployeeRoleById(id: EmployeeRoleEntity['id']): Promise<IApiResponse<EmployeeRoleEntity>> {
    return await this.datasource.deleteEmployeeRoleById(id);
  }
}
