import React, { useEffect, useState } from 'react';
import BottomNav from './BottomNav';
import axios from 'axios';
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
    gender:''
  }); 
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/userprofile', { withCredentials: true })
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
      });
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const handlePhotoUpload = (e) => {
    // Handle photo upload logic
    console.log(e.target.files[0]);
  };
  //update logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:3000/auth/userprofile', formData, {
        withCredentials: true,
      });
      if (response.data) {
        setProfile(response.data);
        setEditMode(false);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleLogout = () => {
   
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/'); 
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full mb-20">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleEditMode}
          >
            {editMode ? 'Cancel' : 'Edit'}
          </button>
          <div className="flex justify-end mb-4">
        {isLoggedIn && (
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
        </header>
        {error && <p className="text-red-500 mb-4">Error: {error}</p>}
        {profile ? (
          <div>
            <div className="relative mb-8">
              <div
                className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-white text-4xl font-bold mx-auto"
                style={{ backgroundColor: '#de6d6d' }}
              >
                <span>{profile.profileTheme}</span>
              </div>
              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
              >
                <i className="fas fa-camera"></i>
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>
            {/*SUBMMITING FORM TO UPADTE WHEN IT WAS IN EDITMODE */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="text-gray-700 font-bold block mb-2"
                >
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-2 rounded-md border ${
                    editMode
                      ? 'border-blue-500 focus:ring-blue-500 focus:border-blue-500'
                      : 'border-gray-300 bg-gray-100'
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="text-gray-700 font-bold block mb-2"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-2 rounded-md border ${
                    editMode
                      ? 'border-blue-500 focus:ring-blue-500 focus:border-blue-500'
                      : 'border-gray-300 bg-gray-100'
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="currentBranch"
                  className="text-gray-700 font-bold block mb-2"
                >
                  Current Branch:
                </label>
                <input
                  type="text"
                  id="currentBranch"
                  name="currentBranch"
                  value={formData.currentBranch}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-2 rounded-md border ${
                    editMode
                      ? 'border-blue-500 focus:ring-blue-500 focus:border-blue-500'
                      : 'border-gray-300 bg-gray-100'
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="YOS"
                  className="text-gray-700 font-bold block mb-2"
                >
                  Year of Study:
                </label>
                <input
                  type="number"
                  id="yos"
                  name="yearofstudy"
                  value={formData.yearOfStudy}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-2 rounded-md border ${
                    editMode
                      ? 'border-blue-500 focus:ring-blue-500 focus:border-blue-500'
                      : 'border-gray-300 bg-gray-100'
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="AOS"
                  className="text-gray-700 font-bold block mb-2"
                >
                  Areas of Interest:
                </label>
                <input
                  type="text"
                  id="aos"
                  name="areasofinterest"
                  value={formData.areasOfInterest}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-2 rounded-md border ${
                    editMode
                      ? 'border-blue-500 focus:ring-blue-500 focus:border-blue-500'
                      : 'border-gray-300 bg-gray-100'
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="AOS"
                  className="text-gray-700 font-bold block mb-2"
                >
                  Gender:
                </label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-2 rounded-md border ${
                    editMode
                      ? 'border-blue-500 focus:ring-blue-500 focus:border-blue-500'
                      : 'border-gray-300 bg-gray-100'
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="AOS"
                  className="text-gray-700 font-bold block mb-2"
                >
                  Skills:
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-2 rounded-md border ${
                    editMode
                      ? 'border-blue-500 focus:ring-blue-500 focus:border-blue-500'
                      : 'border-gray-300 bg-gray-100'
                  }`}
                />
              </div>
              {editMode && (
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                Save Changes
              </button>
            )}
            </form>
            
          </div>
        ) : (
          <p className="text-gray-700">Loading...</p>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default MyProfile;