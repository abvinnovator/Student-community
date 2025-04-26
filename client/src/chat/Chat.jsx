import React, { useState, useEffect } from "react";
import axios from "axios";
import BottomNav from "./BottomNav";
import { useNavigate } from "react-router-dom";
import SearchUsers from "./SearchUsers";
import { Search, MessageCircle, User, Bell, Loader } from "lucide-react";

const Chat = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchActive, setSearchActive] = useState(false);
  const API_URL = "http://localhost:3000";

  const handleUserClick = async (contact) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/chats/create`,
        { userId: contact._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success && response.data.chat) {
        const chatId = response.data.chat._id;
        await new Promise(resolve => setTimeout(resolve, 100));
        navigate(`/chat/${chatId}`, { 
          state: { chatId },
          replace: true 
        });
      } else {
        setError("Failed to create chat");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create chat. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchFriends = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/auth/friends`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(res.data);
    } catch (err) {
      console.error("Error fetching friends:", err);
    }
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/auth/userprofile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchFriends();
  }, []);

  // Generate avatar initial from username
  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  // Generate consistent color based on username
  const getAvatarColor = (username) => {
    if (!username) return "#6366f1";
    
    const colors = [
      "#4f46e5", "#0ea5e9", "#06b6d4", "#10b981", 
      "#84cc16", "#eab308", "#f59e0b", "#ef4444",
      "#8b5cf6", "#d946ef", "#ec4899", "#f43f5e"
    ];
    
    const charSum = username.split('')
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    
    return colors[charSum % colors.length];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <Loader className="h-12 w-12 animate-spin text-indigo-600" />
          <p className="mt-4 text-indigo-600 font-medium">Loading your chats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">Student<span className="text-gray-800">Community</span></h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
              </button>
              {profile && (
                <div 
                  className="h-8 w-8 rounded-full flex items-center justify-center text-white font-medium text-sm"
                  style={{ backgroundColor: getAvatarColor(profile.username) }}
                >
                  {getInitials(profile.username)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow max-w-5xl w-full mx-auto px-4 py-6">
        {/* Welcome & Search Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              {profile && (
                <h2 className="text-2xl font-semibold text-gray-800">
                  Hello, <span className="text-indigo-600">{profile.username}</span>
                </h2>
              )}
              <p className="text-gray-500 mt-1">Start a conversation with your friends</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => setSearchActive(!searchActive)}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
              >
                <Search className="h-5 w-5 mr-2" />
                Find Friends
              </button>
            </div>
          </div>

          {/* Search Users Section - Only visible when search is active */}
          {searchActive && (
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
              <div className="mb-2 flex justify-between items-center">
                <h3 className="font-medium text-gray-700">Search for Friends</h3>
                <button 
                  onClick={() => setSearchActive(false)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>
              <SearchUsers onFriendAdded={fetchFriends} />
            </div>
          )}
        </div>

        {/* Chat Categories */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-full whitespace-nowrap">
              All Contacts
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 rounded-full whitespace-nowrap border border-gray-200 hover:bg-gray-50">
              Recent Chats
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 rounded-full whitespace-nowrap border border-gray-200 hover:bg-gray-50">
              Study Groups
            </button>
          </div>
        </div>

        {/* Contacts Grid/List */}
        {contacts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <User className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-4 text-gray-800 font-medium">No contacts yet</h3>
            <p className="mt-2 text-gray-500">Search and add friends to start chatting</p>
            <button 
              onClick={() => setSearchActive(true)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
            >
              Find Friends
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                onClick={() => handleUserClick(contact)}
                className="bg-white rounded-xl shadow-sm p-4 hover:shadow transition-shadow duration-300 cursor-pointer border border-gray-100 flex items-center"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-medium flex-shrink-0"
                  style={{ backgroundColor: getAvatarColor(contact.username) }}
                >
                  {getInitials(contact.username)}
                </div>
                <div className="ml-4 flex-grow">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900">{contact.username}</h3>
                    <span className="bg-green-100 h-2 w-2 rounded-full"></span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Tap to start chatting</p>
                </div>
                <MessageCircle className="h-5 w-5 text-indigo-500 ml-2" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Chat;