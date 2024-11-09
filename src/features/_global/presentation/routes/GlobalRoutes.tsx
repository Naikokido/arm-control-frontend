import { routerType } from "../../../../routes/routerTypes";
import Home from "../../../../pages/Home.tsx";
import { LoginPage } from "../../../../pages/LoginPage";
import RegisterPage from "../../../../pages/RegisterPage";
import About from "../../../../pages/About.tsx";
// import Contact from "pages/Contact.tsx";
// import Dashboard from "pages/Dashboard.tsx";
// import RequestAccessPage from "pages/RequestAccessPage.tsx";

export const GlobalRoutes: routerType[] = [
  {
    path: "login",
    element: <LoginPage />,
    title: "Login",
  },
  {
    path: "",
    element: <LoginPage />,
    title: "Root",
  },
  {
    path: "register",
    element: <RegisterPage />,
    title: "Register",
  },
  {
    path: "/home",
    element: <Home />,
    title: "",
  },
  {
    path: "about",
    element: <About />,
    title: "About",
  },
  // {
  //   path: "contact",
  //   element: <Contact />,
  //   title: "Contact",
  // },
  // {
  //   path: "dashboard",
  //   element: <Dashboard />,
  //   title: "Dashboard",
  // },
  // {
  //   path: "request",
  //   element: <RequestAccessPage />,
  //   title: "Registro",
  // },
  // {
  //   path: "user-management", // Nueva ruta
  //   element: <UserManagement />,
  //   title: "User Management",
  // },
  // {
  //   path: "*",
  //   element: <NotFoundPage />,
  //   title: "404 | Not found",
  // },
];
