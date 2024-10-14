import AppRouter from "./routes/AppRouter";
import "./index.css";
import { RobotProvider } from "./context/RobotContext";
import { AuthProvider } from "./context/AuthContext";
// import { UserProvider } from "./context/UserContext";

function App() {
  return (
    // <UserProvider>
    <AuthProvider>
      <RobotProvider>
        <AppRouter />
      </RobotProvider>
    </AuthProvider>
    // </UserProvider>
  );
}

export default App;
