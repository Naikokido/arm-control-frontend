import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("Failed to send message. Please try again later.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 p-8">
          <div className="bg-white shadow-lg p-6">
            <h1 className="text-3xl font-bold mb-4">Contact us</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full p-3 border rounded"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="w-full p-3 border rounded"
                type="email"
                placeholder="Institutional Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                className="w-full p-3 border rounded"
                placeholder="Message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded mt-2"
                type="submit"
              >
                Send Message
              </button>
            </form>
            {status && <p className="mt-4">{status}</p>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
