import { EmployeeRoleDatasourceImpl, EmployeeRoleRepositoryImpl } from '../../infrastructure';
import {
  CreateEmployeeRole,
  DeleteEmployeeRoleById,
  GetEmployeeRoleById,
  GetEmployeesRole,
  UpdateEmployeeRole,
} from '../../domain';

const employeeRoleDatasourceImpl = new EmployeeRoleDatasourceImpl();
const employeeRoleRepositoryImpl = new EmployeeRoleRepositoryImpl(employeeRoleDatasourceImpl);

export const getEmployeesRole = new GetEmployeesRole(employeeRoleRepositoryImpl);
export const getEmployeeRoleById = new GetEmployeeRoleById(employeeRoleRepositoryImpl);
export const createEmployeeRole = new CreateEmployeeRole(employeeRoleRepositoryImpl);
export const updateEmployeeRole = new UpdateEmployeeRole(employeeRoleRepositoryImpl);
export const deleteEmployeeRoleById = new DeleteEmployeeRoleById(employeeRoleRepositoryImpl);
