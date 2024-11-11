import AppRouter from "./routes/AppRouter";
import "./index.css";
import { RobotProvider } from "./context/RobotContext";
import { NotificationProvider } from "./core/contexts/NotificationContext";
import { UserProvider } from './context/UserContext.tsx';
// import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
    <NotificationProvider>
        <RobotProvider>
          <AppRouter />
        </RobotProvider>
    </NotificationProvider>
    </UserProvider>
  );
}

export default App;
