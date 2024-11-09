import { Route, Routes } from "react-router-dom";
import type { routerType } from "./routerTypes";
import MainPages from "./MainPages";
// Rutas con código más limpio, escalable y más legible
// Aquí mandar el index con las rutas ordenadas
const Router = () => {
  const renderRoutes = (
    routes: routerType[],
    basePath = ""
  ): React.ReactNode => {
    // Agregar basePath para manejar rutas relativas
    return routes.map(({ path, element, children, title }) => {
      const fullPath = `${basePath}/${path}`; // Construye la ruta completa basándose en la ruta base
      if (children) {
        return (
          <Route key={title} path={fullPath} element={element}>
            {/* Pasar fullPath como basePath para rutas anidadas */}
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
