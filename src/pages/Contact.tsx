import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const Contact = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 p-8">
          <div className="bg-white shadow-lg p-6">
            <h1 className="text-3xl font-bold mb-4">Contact us</h1>
            <form className="space-y-4">
              <input
                className="w-full p-3 border rounded"
                type="text"
                placeholder="Name"
                required
              />
              <input
                className="w-full p-3 border rounded"
                type="email"
                placeholder="Institutional Email"
                required
              />
              <textarea
                className="w-full p-3 border rounded"
                placeholder="Message"
                rows={4}
                required
              />
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded mt-2"
                type="submit"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
