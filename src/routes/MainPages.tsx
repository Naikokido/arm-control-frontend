import { LoginPage } from "../pages/LoginPage";
import type { routerType } from "./routerTypes";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import RequestAccessPage from "../pages/RequestAccessPage";
import RegisterPage from "../pages/RegisterPage";
import UserManagement from "../pages/UserManagement"; // Importa la página de gestión de usuarios

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
];

export default MainPages;