import React from 'react'
import { Link } from 'react-router-dom';
import post from '../assets/image.png' 
const BottomNav = () => {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex items-center justify-around h-16 sm:h-20">
        <Link to='/chat'>
        <button className="flex-1 sm:flex-none flex items-center justify-center">
          <img
            src="https://www.svgrepo.com/show/421619/home-menu-web.svg"
            alt="Home"
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
        </button>
        </Link>
        <Link to='/groups'>
        <button className="flex-1 sm:flex-none flex items-center justify-center">
          <img
            src="https://www.svgrepo.com/show/421614/admin-user-web.svg"
            alt="Chat"
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
        </button>
        </Link>
        <Link to='/myprofile'>
        <button className="flex-1 sm:flex-none flex items-center justify-center">
          <img
            src="https://webstockreview.net/images/contact-icon-png-6.png"
            alt="Contact"
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
        </button>
        </Link>
        <Link to='/getposts'>
        <button className="flex-1 sm:flex-none flex items-center justify-center">
          <img
            src={post}
            alt="Contact"
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
        </button>
        </Link>
      </div>
    );
  };
  export default BottomNav;