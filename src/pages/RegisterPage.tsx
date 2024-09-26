import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: 'url(https://cdn.robotshop.com/media/n/nir/rb-nir-16/img/niryo-ned2-6-axis-robot-arm-desc1.jpg)' }}>
      <div className="bg-white bg-opacity-90 p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Crear Cuenta</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            className="w-full p-3 border rounded"
            type="text"
            name="username"
            placeholder="Nombre de Usuario"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <input
            className="w-full p-3 border rounded"
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            className="w-full p-3 border rounded"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button
            className="w-full bg-blue-600 text-white py-2 rounded"
            type="submit"
          >
            Registrarse
          </button>
        </form>
        <p className="text-center mt-4">
          ¿Ya tienes una cuenta?{' '}
          <RouterLink to="/login" className="text-blue-600">Inicia sesión</RouterLink>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
