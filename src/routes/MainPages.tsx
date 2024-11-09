import { LoginPage } from "../pages/LoginPage";
import type { routerType } from "./routerTypes";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import RequestAccessPage from "../pages/RequestAccessPage";
import RegisterPage from "../pages/RegisterPage";
import UserManagement from "../pages/UserManagement";
import {
  EmployeeRoleCreatePage,
  EmployeeRoleListPage,
  EmployeeRoleUpdatePage,
} from "../features/employeeRole/presentation/pages";
import UserManagementLayout from "../components/Layout/UserManagementLayout";

const MainPages: routerType[] = [
  {
    path: "",
    element: <LoginPage />,
    title: "Login",
  },
  {
    path: "login",
    element: <LoginPage />,
    title: "Login",
  },
  {
    path: "register",
    element: <RegisterPage />,
    title: "Register",
  },
  {
    path: "home",
    element: <Home />,
    title: "Home",
  },
  {
    path: "about",
    element: <About />,
    title: "About",
  },
  {
    path: "contact",
    element: <Contact />,
    title: "Contact",
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    title: "Dashboard",
  },
  {
    path: "request",
    element: <RequestAccessPage />,
    title: "Registro",
  },
  {
    path: "user-management", // Nueva ruta
    element: <UserManagement />,
    title: "User Management",
  },

  {
    path: "users",
    element: <UserManagementLayout />,
    title: "Users",
    children: [
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
    ],
  },
];

export default MainPages;
