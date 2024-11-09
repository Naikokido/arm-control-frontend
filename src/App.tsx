import AppRouter from "./routes/AppRouter";
import "./index.css";
import { RobotProvider } from "./context/RobotContext";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./core/contexts/NotificationContext";
// import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <RobotProvider>
          <AppRouter />
        </RobotProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
