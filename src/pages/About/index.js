import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBook, FaUsers, FaLaptopCode } from 'react-icons/fa';

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to Our Learning Platform
      </motion.h1>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg hover:-translate-y-2 transition-transform duration-300">
          <FaGraduationCap className="text-5xl text-blue-500 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Expert Instructors</h3>
          <p className="text-gray-600 text-center">Learn from industry professionals with years of experience.</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg hover:-translate-y-2 transition-transform duration-300">
          <FaBook className="text-5xl text-blue-500 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Comprehensive Courses</h3>
          <p className="text-gray-600 text-center">Wide range of courses covering latest technologies and frameworks.</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg hover:-translate-y-2 transition-transform duration-300">
          <FaUsers className="text-5xl text-blue-500 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Community Support</h3>
          <p className="text-gray-600 text-center">Join our vibrant community of learners and developers.</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg hover:-translate-y-2 transition-transform duration-300">
          <FaLaptopCode className="text-5xl text-blue-500 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Hands-on Projects</h3>
          <p className="text-gray-600 text-center">Build real-world projects to strengthen your portfolio.</p>
        </div>
      </motion.div>

      <motion.div 
        className="bg-white p-8 rounded-lg shadow-lg mt-8"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed text-justify">
          We are dedicated to providing high-quality education in software development,
          helping students master the skills needed for today's tech industry.
          Our courses are designed to be practical, comprehensive, and up-to-date
          with current industry standards.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
