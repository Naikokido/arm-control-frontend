import { type IApiResponse } from '@core/types';
import type { UserDatasource, UserEntity } from '../domain';

export class UserDatasourceImpl implements UserDatasource {
  public async getUsers(): Promise<IApiResponse<UserEntity[]>> {
    return fetch(import.meta.env.VITE_API_BASE_URL + '/users', {
      method: 'GET',
      credentials: 'include',
    }).then(response => response.json());
  }

  public async getUserById(id: UserEntity['id']): Promise<IApiResponse<UserEntity>> {
    return fetch(import.meta.env.VITE_API_BASE_URL + '/users/' + id, {
      method: 'GET',
      credentials: 'include',
    }).then(response => response.json());
  }

  public async createUser(data: Omit<UserEntity, 'id'>): Promise<IApiResponse<UserEntity>> {
    const urlEncodedData = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && typeof value !== 'object') {
        urlEncodedData.append(key, value.toString());
      }
    });

    return fetch(import.meta.env.VITE_API_BASE_URL + '/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'include',
      body: urlEncodedData.toString(),
    }).then(response => response.json());
  }

  public async updateUser(data: Partial<UserEntity>): Promise<IApiResponse<UserEntity>> {
    const { id, ...restData } = data;
    const urlEncodedData = new URLSearchParams();

    Object.entries(restData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && typeof value !== 'object') {
        urlEncodedData.append(key, value.toString());
      }
    });

    return fetch(import.meta.env.VITE_API_BASE_URL + '/users/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'include',
      body: urlEncodedData.toString(),
    }).then(response => response.json());
  }

  public async deleteUserById(id: UserEntity['id']): Promise<IApiResponse<UserEntity>> {
    return fetch(import.meta.env.VITE_API_BASE_URL + '/users/' + id, {
      method: 'DELETE',
      credentials: 'include',
    }).then(response => response.json());
  }
}
