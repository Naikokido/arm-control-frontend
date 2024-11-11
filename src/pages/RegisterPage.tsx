import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { Input, InputPassword, Select } from '../components/ui';
import { ISelectOptions } from '../features';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const roleOptions: ISelectOptions[] = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
  ];

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@(uoh.cl|pregrado.uoh.cl)$/;
    return regex.test(email);
  };

  // const validatePhone = (phone: string) => {
  //   const regex = /^[0-9]+$/;  // Regex básico para solo números
  //   return regex.test(phone) && phone.length === 20;
  // };

  const validatePassword = (password: string) => {
    return password.length >= 6;
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

    if (!formData.role) {
      toast.error("Por favor, selecciona un rol para el usuario");
      setLoading(false);
      return;
    }
    // if (!validatePhone(formData.phone)) {
    //   toast.error("El número de teléfono debe tener 10 dígitos y solo contener números");
    //   setLoading(false);
    //   return;
    // }

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_BASE_URL+"/auth/register",
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
              id="fullname"
              name="fullname"
              label="Fullname"
              placeholder="Enter your username..."
              required
              value={formData.fullname}
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

            <Input
              id="phone"
              name="phone"
              label="Phone"
              placeholder="Enter your phone number..."
              required
              value={formData.phone}
              onChange={handleInputChange}
            />
            <Select
              id="role"
              label="Role"
              options={roleOptions}
              name="role"
              value={formData.role}
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

            <button
              className="w-full bg-blue-600 text-white py-2 rounded"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Sign up"}
            </button>
          </form>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;