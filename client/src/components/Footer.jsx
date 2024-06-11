import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-zinc-500 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About</h3>
            <p className="text-gray-400">
              StudentCommunity is a collaborative platform designed to empower students like you by fostering skill development, knowledge sharing, and networking opportunities.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Useful Links</h3>
            <ul className="text-gray-400">
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Resources
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <ul className="text-gray-400">
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Twitter
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Facebook
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Instagram
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} StudentCommunity. All rights reserved.</p>
          <ul className="flex mt-4 md:mt-0">
            <li className="ml-4">
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li className="ml-4">
              <a href="#" className="text-gray-400 hover:text-white">
                Terms of Use
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;