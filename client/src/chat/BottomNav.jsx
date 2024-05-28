import React from 'react'
const BottomNav = () => {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex items-center justify-around h-16 sm:h-20">
        <button className="flex-1 sm:flex-none flex items-center justify-center">
          <img
            src="https://www.svgrepo.com/show/421619/home-menu-web.svg"
            alt="Home"
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
        </button>
        <button className="flex-1 sm:flex-none flex items-center justify-center">
          <img
            src="https://www.svgrepo.com/show/421614/admin-user-web.svg"
            alt="Chat"
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
        </button>
        <button className="flex-1 sm:flex-none flex items-center justify-center">
          <img
            src="https://webstockreview.net/images/contact-icon-png-6.png"
            alt="Contact"
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
        </button>
      </div>
    );
  };
  export default BottomNav;