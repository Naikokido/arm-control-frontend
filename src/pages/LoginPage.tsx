import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { InputPassword } from "../components/ui/dataEntry/InputPassword";
import { Input } from "../components/ui/dataEntry/Input";
import logoArmControl from "../assets/logo.png";
import {useUser} from '../context/UserContext.tsx';

export const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_BASE_URL+ "/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" },
          withCredentials: true}
      );

      console.log("Login successful:", response.data);
      login(response.data);
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
                id="email"
                name="email"
                label="Full Name"
                placeholder="Enter your full name..."
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                disabled={!email || !password}
              >
                Sign in
              </button>
            </form>
            <div className="text-center mt-4">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:text-blue-500">
                Request access
              </Link>{" "}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
