import React from 'react';

const NewsletterSection = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center">
      <h2 className="text-4xl font-bold mb-6">Stay Ahead of the Curve!</h2>
      <p className="text-lg mb-8">Subscribe to our newsletter for the latest updates and offers.</p>
      <div className="flex justify-center items-center">
        <input
          type="email"
          placeholder="Email Address"
          className="px-4 py-2 rounded-l border-none text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button className="bg-white text-blue-600 px-4 py-2 rounded-r hover:bg-gray-200 transition duration-300">Subscribe</button>
      </div>
    </div>
  );
};

export default NewsletterSection;