// MyProfile.jsx
import React, { useEffect, useState } from 'react';
import BottomNav from './BottomNav';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentBranch: '',
    areasOfInterest: [],
    yearOfStudy: '',
    skills: [],
    gender: '',
    profileTheme: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3000/auth/userprofile')
      .then((res) => {
        setProfile(res.data);
        setFormData({
          username: res.data.username,
          email: res.data.email,
          currentBranch: res.data.currentBranch,
          areasOfInterest: res.data.areasOfInterest || [],
          yearOfStudy: res.data.yearOfStudy,
          skills: res.data.skills || [],
          gender: res.data.gender,
          profileTheme: res.data.profileTheme || ''
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        if (err.response?.status === 401) {
          navigate('/login');
        }
      });
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle arrays for skills and areas of interest
    if (name === 'skills' || name === 'areasOfInterest') {
      setFormData({ ...formData, [name]: value.split(',').map(item => item.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEditMode = () => {
    setEditMode(!editMode);
    // Reset form data if cancelling edit
    if (editMode && profile) {
      setFormData({
        username: profile.username,
        email: profile.email,
        currentBranch: profile.currentBranch,
        areasOfInterest: profile.areasOfInterest || [],
        yearOfStudy: profile.yearOfStudy,
        skills: profile.skills || [],
        gender: profile.gender,
        profileTheme: profile.profileTheme || ''
      });
    }
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
      setError(err.response?.data?.message || 'Failed to update profile');
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

  // Format arrays for display
  const formatArrayForInput = (arr) => {
    return Array.isArray(arr) ? arr.join(', ') : '';
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 py-6">
        <div className="mx-auto max-w-3xl">
          {/* Profile Card */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-800">My Profile</h1>
              <div className="flex gap-3">
                {isLoggedIn && (
                  <button
                    className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 font-medium hover:bg-gray-100 transition flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Logout
                  </button>
                )}
                <button
                  className={`px-4 py-2 rounded-md font-medium transition flex items-center gap-2 ${
                    editMode 
                      ? 'border border-gray-300 text-gray-600 hover:bg-gray-100' 
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                  onClick={handleEditMode}
                >
                  {editMode ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                      Cancel
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      Edit
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Profile Content */}
            {loading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-600 font-medium">Loading profile...</p>
                </div>
              </div>
            ) : error ? (
              <div className="p-6">
                <div className="bg-red-50 rounded-md p-4 text-center">
                  <h2 className="text-red-700 font-bold text-lg">Error</h2>
                  <p className="mt-2 text-gray-700">{error}</p>
                </div>
              </div>
            ) : profile ? (
              <div className="p-6">
                {/* Avatar and Basic Info */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative mb-4">
                    {/* Profile Avatar */}
                    <div className="w-24 h-24 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-700 text-2xl font-bold shadow overflow-hidden">
                      {/* Display profile theme as text */}
                      {profile.profileTheme ? (
                        profile.profileTheme
                      ) : (
                        profile.username.slice(0, 2).toUpperCase()
                      )}
                    </div>
                    {editMode && (
                      <div className="absolute -bottom-2 -right-2 rounded-full bg-gray-800 p-2 text-white shadow">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">{profile.username}</h2>
                  <p className="text-gray-600">{profile.email}</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Username */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className={`w-full px-3 py-2 border rounded-md ${
                          editMode
                            ? 'border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-gray-400'
                            : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className={`w-full px-3 py-2 border rounded-md ${
                          editMode
                            ? 'border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-gray-400'
                            : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>

                    {/* Current Branch */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Branch</label>
                      <input
                        type="text"
                        name="currentBranch"
                        value={formData.currentBranch}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className={`w-full px-3 py-2 border rounded-md ${
                          editMode
                            ? 'border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-gray-400'
                            : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>

                    {/* Year of Study */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year of Study</label>
                      <input
                        type="text"
                        name="yearOfStudy"
                        value={formData.yearOfStudy}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className={`w-full px-3 py-2 border rounded-md ${
                          editMode
                            ? 'border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-gray-400'
                            : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      {editMode ? (
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={formData.gender}
                          disabled
                          className="w-full px-3 py-2 border border-gray-200 bg-gray-100 rounded-md"
                        />
                      )}
                    </div>

                    {/* Profile Theme */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Profile Theme</label>
                      <input
                        type="text"
                        name="profileTheme"
                        value={formData.profileTheme}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        placeholder={editMode ? "Enter theme identifier" : ""}
                        className={`w-full px-3 py-2 border rounded-md ${
                          editMode
                            ? 'border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-gray-400'
                            : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Areas of Interest */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Areas of Interest</label>
                    {editMode ? (
                      <textarea
                        name="areasOfInterest"
                        value={formatArrayForInput(formData.areasOfInterest)}
                        onChange={handleInputChange}
                        placeholder="Enter interests separated by commas"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                        rows="2"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(formData.areasOfInterest) && formData.areasOfInterest.length > 0 ? (
                          formData.areasOfInterest.map((interest, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-sm text-gray-700">
                              {interest}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">No areas of interest specified</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                    {editMode ? (
                      <textarea
                        name="skills"
                        value={formatArrayForInput(formData.skills)}
                        onChange={handleInputChange}
                        placeholder="Enter skills separated by commas"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                        rows="2"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(formData.skills) && formData.skills.length > 0 ? (
                          formData.skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-sm text-gray-700">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">No skills specified</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  {editMode && (
                    <button
                      type="submit"
                      className="mt-6 w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-md shadow transition flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Save Changes
                    </button>
                  )}
                </form>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default MyProfile;