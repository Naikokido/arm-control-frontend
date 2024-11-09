import { routerType } from "../../../../routes/routerTypes";
import {
  EmployeeRoleListPage,
  EmployeeRoleCreatePage,
  EmployeeRoleUpdatePage,
} from "../pages";

export const EmployeeRoleRoutes: routerType[] = [
  {
    path: "roles-de-funcionarios",
    element: <EmployeeRoleListPage />,
    title: "Roles de funcionarios",
  },
  {
    path: "roles-de-funcionarios/crear",
    element: <EmployeeRoleCreatePage />,
    title: "Crear Roles",
  },
  {
    path: "roles-de-funcionarios/:employeeRoleId/editar",
    element: <EmployeeRoleUpdatePage />,
    title: "Editar Roles",
  },
];
