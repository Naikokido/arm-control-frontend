import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const About = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 p-8">
          <div className="bg-white shadow-lg p-6">
            <h1 className="text-3xl font-bold mb-4">About us</h1>
            <p className="text-lg mb-4">
            The UOH Robotics and Intelligent Systems Laboratory (RIS LAB) at the Institute of Engineering Sciences, Universidad de O'Higgins, focuses on research and development in areas such as Artificial Intelligence, Machine Learning, Computer Vision, and Robotics.
            </p>
            <p className="text-lg">
            The lab applies these technologies across a variety of sectors, including agriculture, transportation, mining, healthcare, and more.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
