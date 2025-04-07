import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const FooterSection = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Navigation</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="hover:underline block">
                Home
              </Link>
              <Link to="/courses" className="hover:underline block">
                Courses
              </Link>
              <Link to="/about" className="hover:underline block">
                About
              </Link>
              <Link to="/contact" className="hover:underline block">
                Contact
              </Link>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/terms" className="hover:underline block">
                Terms
              </Link>
              <Link to="/privacy" className="hover:underline block">
                Privacy
              </Link>
              <Link to="/refund" className="hover:underline block">
                Refund
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <p className="flex items-center space-x-3 group">
                  <FaEnvelope className="text-xl text-gray-400 group-hover:text-blue-400 transition-colors" />
                  <a
                    href="mailto:support@example.com"
                    className="hover:text-blue-400 transition-colors"
                  >
                    support@example.com
                  </a>
                </p>
                <p className="flex items-center space-x-3 group">
                  <FaPhone className="text-xl text-gray-400 group-hover:text-blue-400 transition-colors" />
                  <a
                    href="tel:+919876543210"
                    className="hover:text-blue-400 transition-colors"
                  >
                    +91-9876543210
                  </a>
                </p>
                <p className="flex items-center space-x-3 group">
                  <FaMapMarkerAlt className="text-xl text-gray-400 group-hover:text-blue-400 transition-colors" />
                  <span className="hover:text-blue-400 transition-colors">
                    123 Learning Street, Education City
                  </span>
                </p>
              </div>
              
              {/* Social Media Links with enhanced responsive design */}
              <div className="mt-6 md:mt-0">
                <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
                <div className="flex flex-wrap gap-4">
                  <SocialLink
                    href="https://facebook.com"
                    icon={<FaFacebookF className="text-lg" />}
                    color="hover:text-blue-500 hover:bg-white/10"
                  />
                  <SocialLink
                    href="https://twitter.com"
                    icon={<FaTwitter className="text-lg" />}
                    color="hover:text-blue-400 hover:bg-white/10"
                  />
                  <SocialLink
                    href="https://linkedin.com"
                    icon={<FaLinkedinIn className="text-lg" />}
                    color="hover:text-blue-600 hover:bg-white/10"
                  />
                  <SocialLink
                    href="https://instagram.com"
                    icon={<FaInstagram className="text-lg" />}
                    color="hover:text-pink-500 hover:bg-white/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              &copy; 2025 LearnCraft. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link
                to="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center transition-all duration-300 ${color} hover:scale-110`}
  >
    {icon}
  </a>
);

export default FooterSection;
