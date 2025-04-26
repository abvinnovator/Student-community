import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import { Search, UserPlus, Users, MessageCircle, Eye } from 'lucide-react';

const Friends = () => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:3000";

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/auth/friends`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFriends(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching friends:", err);
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/auth/search?username=${searchQuery}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSearchResults(res.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleAddFriend = async (username) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/auth/addfriend`, 
        { friendUsername: username },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchFriends();
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  const handleStartChat = async (contact) => {
    try {
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
        navigate(`/chat/${response.data.chat._id}`);
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const getAvatarColor = (username) => {
    if (!username) return "#6366f1";
    const colors = ["#4f46e5", "#0ea5e9", "#06b6d4", "#10b981", "#84cc16"];
    const charSum = username.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
    {/* Header */}
    <div className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold text-indigo-600">Friends</h1>
          <button 
            onClick={() => navigate('/chat')}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <MessageCircle className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="flex-grow max-w-2xl w-full mx-auto px-4 py-6">
      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <form onSubmit={handleSearch} className="flex">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for friends..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Search
          </button>
        </form>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <h3 className="font-medium text-gray-700 mb-3">Search Results</h3>
          <div className="space-y-3">
            {searchResults.map(user => (
              <div key={user._id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div 
                    className="h-10 w-10 rounded-full flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: getAvatarColor(user.username) }}
                  >
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.currentBranch || 'Student'}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleAddFriend(user.username)}
                  className="px-3 py-1 bg-indigo-600 text-white rounded-full text-sm hover:bg-indigo-700 flex items-center"
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Friends List */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <h3 className="font-medium text-gray-700 mb-3">Your Friends ({friends.length})</h3>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : friends.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2 text-gray-500">You haven't added any friends yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {friends.map(friend => (
              <div key={friend._id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div 
                    className="h-10 w-10 rounded-full flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: getAvatarColor(friend.username) }}
                  >
                    {friend.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{friend.username}</p>
                    <p className="text-sm text-gray-500">Online</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => navigate(`/profile/${friend.username}`)}
                    className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100"
                    title="View Profile"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleStartChat(friend)}
                    className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100"
                    title="Start Chat"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav activeTab="friends" />
    </div>
    </div>
  );
};

export default Friends;