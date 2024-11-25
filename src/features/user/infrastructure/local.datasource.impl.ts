import { type IApiResponse } from '@core/types';
import type { UserDatasource, UserEntity } from '../domain';

export class UserDatasourceImpl implements UserDatasource {
  public async getUsers(): Promise<IApiResponse<UserEntity[]>> {
    return fetch(import.meta.env.VITE_API_BASE_URL + '/users', {
      method: 'GET',
    }).then(response => response.json());
  }

  public async getUserById(id: UserEntity['id']): Promise<IApiResponse<UserEntity>> {
    return fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`, {
      method: 'GET',
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`);
      }
      return response.json().then(data => {
        return data;
      });
    }).catch(error => {
      console.error("Error fetching user:", error);
      throw error;
    });
  }

  public async createUser(data: Omit<UserEntity, 'id'>): Promise<IApiResponse<UserEntity>> {
    return fetch(import.meta.env.VITE_API_BASE_URL + "/users/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include'
    })
      .then(response => response.json());
  }

  public async updateUser(data: Partial<UserEntity>): Promise<IApiResponse<UserEntity>> {
    console.log("Data received for update:", data);

    const { id, ...restData } = data;
    if (!id) {
      throw new Error("ID is required for updating user.");
    }

    return fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(restData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      });
  }

  public async deleteUserById(id: UserEntity['id']): Promise<IApiResponse<UserEntity>> {
    return fetch(import.meta.env.VITE_API_BASE_URL + '/users/' + id, {
      method: 'DELETE',
    }).then(response => response.json());
  }
}
