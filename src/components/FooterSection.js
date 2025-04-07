import React from 'react';
import { Link } from 'react-router-dom';

const FooterSection = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-2">Navigation</h3>
          <Link to="/" className="hover:underline block">Home</Link>
          <Link to="/courses" className="hover:underline block">Courses</Link>
          <Link to="/about" className="hover:underline block">About</Link>
          <Link to="/contact" className="hover:underline block">Contact</Link>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-2">Legal</h3>
          <Link to="/terms" className="hover:underline block">Terms</Link>
          <Link to="/privacy" className="hover:underline block">Privacy</Link>
          <Link to="/refund" className="hover:underline block">Refund</Link>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p>Email: <a href="mailto:support@example.com" className="hover:underline">support@example.com</a></p>
          <p>📞 <a href="tel:+919876543210" className="hover:underline">+91-9876543210</a></p>
          <div className="flex space-x-4 mx-auto justify-center">
            <a href="https://facebook.com" className="hover:text-blue-500 transition duration-300"><i className="fab fa-facebook-f"></i> FB</a>
            <a href="https://twitter.com" className="hover:text-blue-400 transition duration-300"><i className="fab fa-twitter"></i> Twitter</a>
            <a href="https://linkedin.com" className="hover:text-blue-700 transition duration-300"><i className="fab fa-linkedin-in"></i> LinkedIn</a>
            <a href="https://instagram.com" className="hover:text-pink-500 transition duration-300"><i className="fab fa-instagram"></i> Instagram</a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterSection;