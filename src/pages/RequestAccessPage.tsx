import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const RequestAccessPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    rut: '',
    email: '',
    message: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate RUT format (e.g., 12.345.678-9)
    const rutPattern = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/;
    if (!rutPattern.test(formData.rut)) {
      alert('Please enter a valid RUT (e.g., 12.345.678-9).');
      return;
    }

    // Validate UOH email domain
    if (!formData.email.endsWith('@uoh.cl')) {
      alert('Please enter a valid UOH institutional email.');
      return;
    }

    // Add logic to handle form submission (e.g., send request to admin)
    console.log('Request submitted:', formData);
    alert('Your request has been submitted and is pending approval by an admin.');
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: 'url(https://cdn.robotshop.com/media/n/nir/rb-nir-16/img/niryo-ned2-6-axis-robot-arm-desc1.jpg)' }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Request Access</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <input
            className="w-full p-3 border rounded"
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />

          {/* RUT */}
          <input
            className="w-full p-3 border rounded"
            type="text"
            name="rut"
            placeholder="RUT (e.g., 12.345.678-9)"
            value={formData.rut}
            onChange={handleInputChange}
            required
          />

          {/* Email */}
          <input
            className="w-full p-3 border rounded"
            type="email"
            name="email"
            placeholder="Institutional Email (e.g., yourname@uoh.cl)"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          {/* Request Message */}
          <textarea
            className="w-full p-3 border rounded"
            name="message"
            placeholder="Reason for requesting access"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            required
          />

          {/* Submit Button */}
          <button className="w-full bg-blue-600 text-white py-2 rounded" type="submit">
            Request Access
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{' '}
          <RouterLink to="/login" className="text-blue-600">
            Log in
          </RouterLink>
        </p>
      </div>
    </div>
  );
};

export default RequestAccessPage;
