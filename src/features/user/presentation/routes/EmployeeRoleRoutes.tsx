import { routerType } from "../../../../routes/routerTypes";
import {
  UserListPage,
  // UserCreatePage,
  // UserUpdatePage,
} from "../pages";

export const EmployeeRoleRoutes: routerType[] = [
  {
    path: "list-users",
    element: <UserListPage />,
    title: "Roles de funcionarios",
  },
  // {
  //   path: "list-users/crear",
  //   element: <UserCreatePage />,
  //   title: "Crear Roles",
  // },
  // {
  //   path: "list-users/:employeeRoleId/editar",
  //   element: <UserUpdatePage />,
  //   title: "Editar Roles",
  // },
];
