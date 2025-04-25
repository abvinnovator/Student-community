import React from "react";
import { Link } from "react-router-dom";
import post from "../assets/image.png";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-3 border-t border-gray-300">
      <Link to="/chat" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
        <img
          src="https://www.svgrepo.com/show/421619/home-menu-web.svg"
          alt="Home"
          className="w-6 h-6"
        />
        <span className="text-xs mt-1">Home</span>
      </Link>

      <Link to="/groups" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
        <img
          src="https://www.svgrepo.com/show/421614/admin-user-web.svg"
          alt="Groups"
          className="w-6 h-6"
        />
        <span className="text-xs mt-1">Groups</span>
      </Link>

      <Link to="/myprofile" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
        <img
          src="https://webstockreview.net/images/contact-icon-png-6.png"
          alt="Profile"
          className="w-6 h-6"
        />
        <span className="text-xs mt-1">Profile</span>
      </Link>

      <Link to="/getposts" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
        <img
          src={post}
          alt="Posts"
          className="w-6 h-6"
        />
        <span className="text-xs mt-1">Posts</span>
      </Link>
    </div>
  );
};

export default BottomNav;
