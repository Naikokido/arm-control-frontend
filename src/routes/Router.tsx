import { Route, Routes } from "react-router-dom";
import type { routerType } from "./routerTypes";
import MainPages from "./MainPages";
const Router = () => {
  const renderRoutes = (
    routes: routerType[],
    basePath = ""
  ): React.ReactNode => {
    return routes.map(({ path, element, children, title }) => {
      const fullPath = `${basePath}/${path}`;
      if (children) {
        return (
          <Route key={title} path={fullPath} element={element}>
            {renderRoutes(children, fullPath)}
          </Route>
        );
      }

      return <Route key={title} path={fullPath} element={element} />;
    });
  };

  return <Routes>{renderRoutes(MainPages)}</Routes>;
};

export default Router;
