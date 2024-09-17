import { LoginPage } from "../pages/LoginPage";
import type { routerType } from "./routerTypes";
// import Error404 from '../../presentation/pages/404.tsx';

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
];

export default MainPages;
