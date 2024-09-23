import { LoginPage } from "../pages/LoginPage";
import type { routerType } from "./routerTypes";
import About from "../pages/About"
import Contact from "../pages/Contact";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
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
  {
    path: "home",
    element: <Home/>,
    title: "Home",
  },
  {
    path: "about",
    element: <About/>,
    title: "About",
  },
  {
    path: "contact",
    element: <Contact/>,
    title: "Contact",
  },
  {
    path: "dashboard",
    element: <Dashboard/>,
    title: "Dashboard",
  },
  
];

export default MainPages;
