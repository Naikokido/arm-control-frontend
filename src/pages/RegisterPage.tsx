import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { Input } from "../components/ui/dataEntry/Input";
import { InputPassword } from "../components/ui/dataEntry/InputPassword";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@(uoh.cl|pregrado.uoh.cl)$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const passwordsMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!validateEmail(formData.email)) {
      toast.error(
        "Solo se aceptan correos con prefijos @uoh.cl o @pregrado.uoh.cl"
      );
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    if (!passwordsMatch(formData.password, formData.password2)) {
      toast.error("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/register/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Respuesta de la API:", response.data);
      toast.success("Registro exitoso!");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        toast.error(
          data.message ||
            "Error en la solicitud de registro. Vuelva a intentarlo."
        );
      } else {
        toast.error("Problema de conexión con el servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div
        className="min-h-screen flex justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://cdn.robotshop.com/media/n/nir/rb-nir-16/img/niryo-ned2-6-axis-robot-arm-desc1.jpg)",
        }}
      >
        <div className="bg-white bg-opacity-90 p-6 rounded shadow-lg max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-4">Create account</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              id="username"
              name="username"
              label="Username"
              placeholder="Enter your username..."
              required
              value={formData.username}
              onChange={handleInputChange}
            />
            <Input
              id="email"
              name="email"
              label="Email"
              placeholder="Enter your email..."
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            <InputPassword
              id="password"
              name="password"
              label="Password"
              placeholder="Enter your password..."
              required
              value={formData.password}
              onChange={handleInputChange}
            />
            <InputPassword
              id="password2"
              name="password2"
              label="Confirm Password"
              placeholder="Enter your password again..."
              required
              value={formData.password2}
              onChange={handleInputChange}
            />
            <button
              className="w-full bg-blue-600 text-white py-2 rounded"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrarse"}
            </button>
          </form>
          <p className="text-center mt-4">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-blue-600">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;