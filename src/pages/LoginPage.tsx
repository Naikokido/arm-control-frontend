import { Link, useNavigate } from "react-router-dom";
import { InputPassword } from "../components/ui/dataEntry/InputPassword.tsx";
import { Input } from "../components/ui/dataEntry/Input.tsx";
import { useState } from "react";
import logoArmControl from "../assets/logo.png";

export const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación para verificar si ambos campos están llenos
    if (username && password) {
      navigate("/home"); // Redirigir a la página Home si ambos campos están llenos
    } else {
      alert("Please enter both username and password."); // Mensaje de alerta si falta algún campo
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="flex items-center justify-center w-full h-full bg-sign-in bg-cover brightness-50" />
        <div className="absolute text-white bottom-6 px-2 text-center">
          ©️ {new Date().getFullYear()} Arm Control. All rights reserved |
          Privacy Policy
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
              placeholder="Enter your username..."
              label="Username"
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
              // disabled={loading}
            >
              Sign in
            </button>
          </form>
          <div className="text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-500">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
