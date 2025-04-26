import React from "react";
import { Link } from "react-router-dom";
import { Home, Users, MessageCircle, User, PlusSquare } from "lucide-react";

const BottomNav = ({ activeTab = "feed" }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around py-3 border-t border-gray-200 z-20">
      <Link 
        to="/chat" 
        className={`flex flex-col items-center ${activeTab === 'feed' ? 'text-indigo-600' : 'text-gray-500'}`}
      >
        <Home className="h-6 w-6" />
        <span className="text-xs mt-1">Feed</span>
      </Link>

      <Link 
        to="/friends" 
        className={`flex flex-col items-center ${activeTab === 'friends' ? 'text-indigo-600' : 'text-gray-500'}`}
      >
        <Users className="h-6 w-6" />
        <span className="text-xs mt-1">Friends</span>
      </Link>

      <Link 
        to="/posts" 
        className="flex flex-col items-center text-gray-500"
      >
        <div className="flex items-center justify-center h-10 w-10 bg-indigo-600 rounded-full text-white -mt-6 shadow-lg">
          <PlusSquare className="h-5 w-5" />
        </div>
      </Link>

      <Link 
        to="/chat" 
        className={`flex flex-col items-center ${activeTab === 'chat' ? 'text-indigo-600' : 'text-gray-500'}`}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="text-xs mt-1">Chat</span>
      </Link>

      <Link 
        to="/myprofile" 
        className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-indigo-600' : 'text-gray-500'}`}
      >
        <User className="h-6 w-6" />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </div>
  );
};

export default BottomNav;