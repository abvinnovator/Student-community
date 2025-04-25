import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About</h3>
            <p className="text-gray-300 leading-relaxed">
              StudentCommunity is a collaborative platform designed to empower students by fostering skill development, knowledge sharing, and networking opportunities.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Useful Links</h3>
            <ul className="text-gray-400 space-y-2">
              {['Home', 'About', 'Resources', 'Contact'].map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-gray-200 transition duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="p-2 rounded-full bg-gray-700 hover:bg-blue-500 transition duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-700 hover:bg-blue-600 transition duration-300">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-700 hover:bg-pink-500 transition duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-700 hover:bg-blue-700 transition duration-300">
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} StudentCommunity. All rights reserved.</p>
          <ul className="flex space-x-6 mt-4 md:mt-0">
            <li>
              <a href="#" className="hover:text-white transition duration-300">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition duration-300">Terms of Use</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
