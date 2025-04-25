import React, { useEffect, useState } from 'react';
import BottomNav from './BottomNav';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentBranch: '',
    areasOfInterest: '',
    yearOfStudy: '',
    skills: '',
    gender: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/auth/userprofile')
      .then((res) => {
        setProfile(res.data);
        setFormData({
          username: res.data.username,
          email: res.data.email,
          currentBranch: res.data.currentBranch,
          areasOfInterest: res.data.areasOfInterest,
          yearOfStudy: res.data.yearOfStudy,
          skills: res.data.skills,
          gender: res.data.gender
        });
      })
      .catch((err) => {
        setError(err.message);
        if (err.response?.status === 401) {
          navigate('/login');
        }
      });
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/auth/userprofile', formData);
      if (response.data) {
        setProfile(response.data);
        setEditMode(false);
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('/auth/logout');
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      // Still remove token and redirect even if server request fails
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center py-10">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-gray-900">My Profile</h1>
          <div className="flex gap-3">
            {isLoggedIn && (
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors"
              onClick={handleEditMode}
            >
              {editMode ? 'Cancel' : 'Edit'}
            </button>
          </div>
        </header>

        {error && <p className="text-red-600 mb-4">Error: {error}</p>}

        {profile ? (
          <div>
            <div className="flex flex-col items-center mb-6">
              <div className="w-40 h-40 rounded-full bg-gray-400 flex items-center justify-center text-white text-5xl font-bold overflow-hidden">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {Object.keys(formData).map((key) => (
                <div key={key} className="flex flex-col">
                  <label className="text-gray-800 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className={`px-4 py-3 rounded-md border focus:ring-2 transition-all duration-200 ${editMode ? 'border-blue-600 focus:ring-blue-300' : 'border-gray-400 bg-gray-200'}`}
                  />
                </div>
              ))}
              {editMode && (
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md shadow-md w-full mt-4 transition-colors">
                  Save Changes
                </button>
              )}
            </form>
          </div>
        ) : (
          <p className="text-gray-700 text-center">Loading...</p>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default MyProfile;
