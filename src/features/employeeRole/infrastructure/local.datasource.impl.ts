import type { BaseListFilters } from '@core/types';
import { type IApiResponse } from '@core/types';
import type { EmployeeRoleDatasource, EmployeeRoleEntity } from '../domain';
import type { PaginationEntity } from '../../_global';

export class EmployeeRoleDatasourceImpl implements EmployeeRoleDatasource {
  public async getEmployeesRole({
    search,
    page,
    limit,
  }: BaseListFilters): Promise<IApiResponse<PaginationEntity<EmployeeRoleEntity[]>>> {
    return fetch(
      import.meta.env.VITE_API_BASE_URL + '/employee-roles?page=' + page + '&limit=' + limit + '&search=' + search,
      {
        method: 'GET',
        credentials: 'include',
      },
    ).then(response => response.json());
  }

  public async getEmployeeRoleById(id: EmployeeRoleEntity['id']): Promise<IApiResponse<EmployeeRoleEntity>> {
    return fetch(import.meta.env.VITE_API_BASE_URL + '/employee-roles/' + id, {
      method: 'GET',
      credentials: 'include',
    }).then(response => response.json());
  }

  public async createEmployeeRole(data: Omit<EmployeeRoleEntity, 'id'>): Promise<IApiResponse<EmployeeRoleEntity>> {
    const urlEncodedData = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && typeof value !== 'object') {
        urlEncodedData.append(key, value.toString());
      }
    });

    return fetch(import.meta.env.VITE_API_BASE_URL + '/employee-roles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'include',
      body: urlEncodedData.toString(),
    }).then(response => response.json());
  }

  public async updateEmployeeRole(data: Partial<EmployeeRoleEntity>): Promise<IApiResponse<EmployeeRoleEntity>> {
    const { id, ...restData } = data;
    const urlEncodedData = new URLSearchParams();

    Object.entries(restData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && typeof value !== 'object') {
        urlEncodedData.append(key, value.toString());
      }
    });

    return fetch(import.meta.env.VITE_API_BASE_URL + '/employee-roles/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'include',
      body: urlEncodedData.toString(),
    }).then(response => response.json());
  }

  public async deleteEmployeeRoleById(id: EmployeeRoleEntity['id']): Promise<IApiResponse<EmployeeRoleEntity>> {
    return fetch(import.meta.env.VITE_API_BASE_URL + '/employee-roles/' + id, {
      method: 'DELETE',
      credentials: 'include',
    }).then(response => response.json());
  }
}
