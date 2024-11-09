import type { IApiResponse } from '@core/types';
import type { BaseListFilters } from '@core/types';
import type { PaginationEntity } from '../../../_global';
import type { EmployeeRoleEntity } from '../entities';

export abstract class EmployeeRoleDatasource {
  abstract getEmployeesRole(filters: BaseListFilters): Promise<IApiResponse<PaginationEntity<EmployeeRoleEntity[]>>>;
  abstract getEmployeeRoleById(id: EmployeeRoleEntity['id']): Promise<IApiResponse<EmployeeRoleEntity>>;
  abstract createEmployeeRole(data: Omit<EmployeeRoleEntity, 'id'>): Promise<IApiResponse<EmployeeRoleEntity>>;
  abstract updateEmployeeRole(data: Partial<EmployeeRoleEntity>): Promise<IApiResponse<EmployeeRoleEntity>>;
  abstract deleteEmployeeRoleById(id: EmployeeRoleEntity['id']): Promise<IApiResponse<EmployeeRoleEntity>>;
}
