import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const About = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 p-8">
          <div className="bg-white shadow-lg p-6">
            <h1 className="text-3xl font-bold mb-4">About us</h1>
            <p className="text-lg mb-4">
              The UOH Robotics and Intelligent Systems Laboratory (RIS LAB) at
              the Institute of Engineering Sciences, Universidad de O'Higgins,
              focuses on research and development in areas such as Artificial
              Intelligence, Machine Learning, Computer Vision, and Robotics.
            </p>
            <p className="text-lg">
              The lab applies these technologies across a variety of sectors,
              including agriculture, transportation, mining, healthcare, and
              more.
            </p>

            {/* Members Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-6">Team</h2>

              {/* Rodrigo Verschae */}
              <div className="flex flex-col md:flex-row items-center bg-gray-100 p-6 rounded-lg shadow-md mb-6">
                {/* Image Section */}
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <img
                    src="https://www.uoh.cl/investigacion/wp-content/uploads/sites/12/2022/04/rodrigo_V.jpeg" 
                    alt="Rodrigo Verschae"
                    className="w-48 h-48 rounded-full object-cover"
                  />
                </div>

                {/* Info Section */}
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2">Rodrigo Verschae</h3>
                  <p className="text-gray-600 italic mb-4">
                    Associate Professor, ICI-UOH
                  </p>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Computer & Robot Vision</li>
                    <li>Machine Learning</li>
                    <li>Robotics</li>
                  </ul>
                  <a
                    href="https://scholar.google.com/citations?user=Fv1lZNkAAAAJ&hl=en"
                    className="text-blue-500 mt-4 inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Scholar
                  </a>
                </div>
              </div>

              {/* Robert Guaman */}
              <div className="flex flex-col md:flex-row items-center bg-gray-100 p-6 rounded-lg shadow-md">
                {/* Image Section */}
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <img
                    src="https://www.uoh.cl/investigacion/wp-content/uploads/sites/12/2022/09/Robert-Guaman.png"
                    alt="Robert Guaman"
                    className="w-48 h-48 rounded-full object-cover"
                  />
                </div>

                {/* Info Section */}
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2">Robert Guaman</h3>
                  <p className="text-gray-600 italic mb-4">
                    Ph.D, FONDECYT (2024-2027) Postdoc
                  </p>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Robotics in construction</li>
                    <li>Digital Signal Processing</li>
                    <li>MATLAB Simulation</li>
                    <li>Computer Vision</li>
                    <li>Mobile Manipulators</li>
                  </ul>
                  <a
                    href="https://scholar.google.com/citations?user=f-QFj6QAAAAJ&hl=en"
                    className="text-blue-500 mt-4 inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Scholar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
