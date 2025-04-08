import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const contactInfo = [
    {
      icon: <FaPhone className="text-2xl text-blue-500" />,
      title: "Phone",
      content: "+1 234 567 8900",
    },
    {
      icon: <FaEnvelope className="text-2xl text-blue-500" />,
      title: "Email",
      content: "contact@example.com",
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl text-blue-500" />,
      title: "Address",
      content: "123 Street Name, City, Country",
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-center text-gray-800 mb-12"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            className="space-y-6"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-4">
                  {info.icon}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{info.title}</h3>
                    <p className="text-gray-600">{info.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.form
            className="bg-white p-8 rounded-lg shadow-lg"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
          >
            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 h-32 resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-blue-600 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Send Message</span>
                <FaPaperPlane />
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
