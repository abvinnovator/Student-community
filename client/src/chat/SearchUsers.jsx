import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/auth/search?username=${searchTerm}`, { withCredentials: true });
      setResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleViewProfile = (username) => {
    navigate(`/profile/${username}`);
  };

  const handleAddFriend = async (username) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/addfriend',
        { friendUsername: username },
        { withCredentials: true }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow py-2 px-4 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-lg focus:outline-none"
        >
          Search
        </button>
      </form>
      <div className="mt-4">
        {results.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between py-2 hover:bg-gray-100 rounded-lg"
          >
            <div className="flex items-center cursor-pointer" onClick={() => handleViewProfile(user.username)}>
              <div
                className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white text-xl font-bold mx-4"
                style={{ backgroundColor: '#de6d6d' }}
              >
                <span>{user.profileTheme}</span>
              </div>
              <div className="user-info">
                <h2 className="text-lg font-semibold">{user.username}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleAddFriend(user.username)}
                className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded focus:outline-none"
              >
                Add Friend
              </button>
              <button
                onClick={() => handleViewProfile(user.username)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded focus:outline-none"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchUsers;
