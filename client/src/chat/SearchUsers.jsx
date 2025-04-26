import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Search, UserPlus, User, Loader } from 'lucide-react';

const SearchUsers = ({ onFriendAdded }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/auth/search?username=${searchTerm}`, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
      setError('Failed to search users. Please try again.');
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = (username) => {
    navigate(`/profile/${username}`);
  };

  const handleAddFriend = async (username) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Show loading state for this specific user
      const userIndex = results.findIndex(user => user.username === username);
      if (userIndex !== -1) {
        const updatedResults = [...results];
        updatedResults[userIndex] = { ...updatedResults[userIndex], isLoading: true };
        setResults(updatedResults);
      }

      const response = await axios.post(
        'http://localhost:3000/auth/addfriend', 
        { friendUsername: username },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Mark user as added
      const updatedResults = results.map(user => 
        user.username === username ? { ...user, isAdded: true, isLoading: false } : user
      );
      setResults(updatedResults);
      
      // Call the callback to refresh the friends list
      onFriendAdded();
    } catch (error) {
      console.error('Error adding friend:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to add friend');
      
      // Reset loading state
      const updatedResults = results.map(user => 
        user.username === username ? { ...user, isLoading: false } : user
      );
      setResults(updatedResults);
    }
  };

  // Generate avatar initials from username
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center border-b border-gray-100">
          <div className="pl-4 pr-2 text-gray-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Search for classmates by username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow py-3 px-2 focus:outline-none text-gray-700 placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 m-1 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Search
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 text-sm text-red-600 bg-red-50 rounded-md m-3">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-8">
          <Loader className="h-8 w-8 animate-spin text-indigo-500" />
        </div>
      )}

      {!loading && results.length === 0 && searchTerm && (
        <div className="py-8 px-4 text-center text-gray-500">
          <User className="h-12 w-12 mx-auto text-gray-300 mb-2" />
          <p>No users found matching "{searchTerm}"</p>
        </div>
      )}

      <div className="divide-y divide-gray-100">
        {results.map((user) => (
          <div
            key={user._id}
            className="hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center cursor-pointer" onClick={() => handleViewProfile(user.username)}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3"
                  style={{ backgroundColor: getAvatarColor(user.username) }}
                >
                  {getInitials(user.username)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{user.username}</h3>
                  <p className="text-sm text-gray-500">Student</p>
                </div>
              </div>
              <div className="flex space-x-2">
                {user.isAdded ? (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-md">
                    Added
                  </span>
                ) : (
                  <button
                    onClick={() => handleAddFriend(user.username)}
                    disabled={user.isLoading}
                    className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      user.isLoading 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                    }`}
                  >
                    {user.isLoading ? (
                      <Loader className="h-3 w-3 animate-spin mr-1" />
                    ) : (
                      <UserPlus className="h-3 w-3 mr-1" />
                    )}
                    Add Friend
                  </button>
                )}
                <button
                  onClick={() => handleViewProfile(user.username)}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchUsers;