import { Link as RouterLink } from 'react-router-dom';

const RequestAccessPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    rut: '',
    emailUsername: '',
    emailDomain: '@pregrado.uoh.cl',
    phone: '',
    message: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate RUT format
    const rutPattern = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/;
    if (!rutPattern.test(formData.rut)) {
      alert('Please enter a valid RUT (e.g., 12.345.678-9).');
      return;
    }

    // Check if phone number has 8 digits after prefix
    const phonePattern = /^\d{8}$/;
    if (!phonePattern.test(formData.phone)) {
      alert('Please enter a valid phone number (8 digits after +56 9).');
      return;
    }

    const fullEmail = `${formData.emailUsername}${formData.emailDomain}`;
    console.log('Request submitted:', { ...formData, email: fullEmail });
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

          {/* Email */}
          <div className="flex space-x-2">
            <input
              className="w:40 p-3 border rounded"
              type="text"              
              name="emailUsername"
              placeholder="Institutional Email"
              value={formData.emailUsername}
              onChange={handleInputChange}
              required
            />
            <select
              className="w-full p-3 border rounded"
              name="emailDomain"
              value={formData.emailDomain}
              onChange={handleInputChange}
            >
              <option value="@pregrado.uoh.cl">@pregrado.uoh.cl</option>
              <option value="@uoh.cl">@uoh.cl</option>
            </select>
          </div>

          {/* Phone */}
          <div className="flex items-center">
            <span className="p-3 border rounded-l bg-gray-200">+56 9</span>
            <input
              className="flex-grow p-3 border rounded-r"
              type="text"
              name="phone"
              placeholder="12345678"
              maxLength={8}
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Message */}
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
