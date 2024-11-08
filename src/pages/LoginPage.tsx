import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { InputPassword } from "../components/ui/dataEntry/InputPassword";
import { Input } from "../components/ui/dataEntry/Input";
import logoArmControl from "../assets/logo.png";
// import { useUser } from "../context/UserContext"; // Importar useUser en lugar de useAuth

export const LoginPage = () => {
  const [fullname, setFullname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const { setUser } = useUser(); // Utilizar setUser del UserContext para almacenar solo los tokens
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullname || !password) {
      toast.error("Please enter both fullname and password.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/login/",
        { fullname, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Login successful:", response.data);
      // setUser({ id: "undefined", email: "undefined", fullname: fullname }); // Ejemplo si necesitas establecer algo
      toast.success("Login successful!");
      navigate("/home");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          toast.error("Invalid credentials.");
        } else {
          toast.error(
            error.response.data.message ||
              "An error occurred. Please try again."
          );
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
    }
  };

  return (
    <>
      <Toaster />
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
                id="fullname"
                name="fullname"
                label="Full Name"
                placeholder="Enter your full name..."
                required
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <InputPassword
                id="password"
                name="password"
                label="Password"
                placeholder="Enter your password..."
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded"
                disabled={!fullname || !password}
              >
                Sign in
              </button>
            </form>
            <div className="text-center mt-4">
              Don’t have an account?{" "}
              <Link to="/request" className="text-blue-600 hover:text-blue-500">
                Request access
              </Link>{" "}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
