import { Link, useNavigate } from "react-router-dom";
import { InputPassword } from "../components/ui/dataEntry/InputPassword.tsx";
import { Input } from "../components/ui/dataEntry/Input.tsx";
import { useState } from "react";
import logoArmControl from "../assets/logo.png";
import { useAuth } from "../context/AuthContext"; // Importamos el contexto

export const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth(); // Obtenemos la función de login del contexto
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username && password) {
      login(username, password); // Llamamos al contexto de login para manejar la autenticación
      navigate("/home"); // Redirigir a la página Home después de iniciar sesión
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="flex items-center justify-center w-full h-full bg-sign-in bg-cover brightness-50" />
        <div className="absolute text-white bottom-6 px-2 text-center">
          ©️ {new Date().getFullYear()} Arm Control. All rights reserved | Privacy Policy
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-100">
        <div className="max-w-sm w-full mx-auto lg:w-96 bg-white shadow-lg p-6">
          <div className="text-center mb-6">
            <img
              className="w-5 h-5 mx-auto mb-2"
              src={logoArmControl}
              alt="logo"
            />
            <h2 className="text-lg font-bold">Virtual Laboratory</h2>
          </div>
          <form className="space-y-4" onSubmit={handleLogin}>
            <Input
              id="username"
              placeholder="Enter your email..."
              label="Email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputPassword
              id="password"
              placeholder="Enter your password..."
              label="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
            >
              Sign in
            </button>
          </form>
          <div className="text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/request" className="text-blue-600 hover:text-blue-500">
              Request access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
