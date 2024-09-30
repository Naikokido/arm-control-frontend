import { Link } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <div className="relative min-h-screen flex flex-col items-center justify-center">
        {/* Fondo GIF difuminado */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `url('https://www.framboise314.fr/wp-content/uploads/2024/01/Ned2.gif')`,
            filter: "blur(6px)", // Difuminado
          }}
        ></div>

        {/* Contenido */}
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold text-black">
            Welcome to the Robotics and Intelligent Systems Laboratory
          </h1>
          <p className="text-lg text-black mt-4">
            Remotely control and monitor your robot
          </p>
          <Link to="/dashboard">
            <button className="bg-blue-600 text-xl text-white py-6 px-12 rounded mt-6">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
