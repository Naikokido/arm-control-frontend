import AppRouter from "./routes/AppRouter";
import './index.css';
import { RobotProvider } from './context/RobotContext'; // Importamos el proveedor del contexto

function App() {
  return (
    <RobotProvider> {/* Envuelve la aplicación con el proveedor del contexto */}
      <AppRouter />
    </RobotProvider>
  );
}

export default App;
