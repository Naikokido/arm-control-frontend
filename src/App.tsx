import AppRouter from "./routes/AppRouter";
import './index.css';
import { RobotProvider } from './context/RobotContext'; // Proveedor del contexto de robots
import { AuthProvider } from './context/AuthContext'; // Proveedor del nuevo contexto de autenticación

function App() {
  return (
    <AuthProvider> {/* Envolvemos con el AuthProvider para manejo de usuarios */}
      <RobotProvider> {/* Mantenemos el RobotProvider */}
        <AppRouter />
      </RobotProvider>
    </AuthProvider>
  );
}

export default App;
