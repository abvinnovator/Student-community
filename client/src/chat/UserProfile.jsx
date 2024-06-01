// UserProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/profiles?username=${username}`, {
        withCredentials: true,
      })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-800 text-white p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{profile.username}</h1>
          <p className="text-base md:text-lg">{profile.currentBranch}</p>
        </div>
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700 font-semibold mb-2">Gender</p>
              <p className="text-gray-600">{profile.gender}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold mb-2">Year of Study</p>
              <p className="text-gray-600">{profile.yearOfStudy}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold mb-2">Areas of Interest</p>
              <p className="text-gray-600">{profile.areasOfInterest.join(', ')}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold mb-2">Skills</p>
              <p className="text-gray-600">{profile.skills.join(', ')}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold mb-2">Profile Theme</p>
              <p className="text-gray-600">{profile.profileTheme}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;