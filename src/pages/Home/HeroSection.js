import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-white bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/herosection.avif)' }}>
      <div className="bg-black bg-opacity-50 w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-center px-4">Unlock Your Potential with Expert-Led Courses</h1>
        <p className="text-2xl md:text-3xl mb-8 text-center px-4">Learn new skills anytime, anywhere.</p>
        <div>
          <Link to="/courses" className="bg-blue-500 px-6 py-3 rounded mr-4 hover:bg-blue-600 transition duration-300">Get Started</Link>
          {/* <Link to="/courses" className="bg-transparent border border-white px-6 py-3 rounded hover:bg-gray-100 hover:text-blue-600 transition duration-300">Browse Courses</Link> */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;