// UserProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/auth/profiles?username=${username}`, {
        withCredentials: true,
      })
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg bg-red-50 p-6 text-center shadow-md">
          <h2 className="text-xl font-bold text-red-600">Profile Not Found</h2>
          <p className="mt-2 text-gray-600">We couldn't find the profile you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="overflow-hidden rounded-xl bg-white shadow-lg">
        <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-16 text-white">
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent"></div>
          <div className="flex items-center space-x-5">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl font-bold text-blue-600 shadow-lg">
              {profile.username.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{profile.username}</h1>
              <p className="mt-1 text-xl font-medium">{profile.currentBranch.toUpperCase()}</p>
              <p className="mt-1 inline-block rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-sm">
                {profile.profileTheme || "No theme set"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div className="rounded-lg bg-gray-50 p-5 shadow-sm">
            <h3 className="mb-3 border-b border-gray-200 pb-2 text-lg font-semibold text-gray-800">Personal Info</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">Gender</span>
                <p className="text-gray-800">{profile.gender}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Year of Study</span>
                <p className="text-gray-800">{profile.yearOfStudy}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-5 shadow-sm">
            <h3 className="mb-3 border-b border-gray-200 pb-2 text-lg font-semibold text-gray-800">Professional Info</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">Areas of Interest</span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {profile.areasOfInterest.map((area, index) => (
                    <span key={index} className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Skills</span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 p-5 shadow-sm md:col-span-2">
            <h3 className="mb-3 border-b border-blue-200 pb-2 text-lg font-semibold text-blue-800">
              Network
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-blue-600">Friends</span>
                <p className="text-blue-800">{profile.friends?.length || 0} connections</p>
              </div>
              <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;