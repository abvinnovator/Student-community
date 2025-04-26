import React, { useState, useEffect } from "react";
import axios from "axios";
import BottomNav from "./BottomNav";
import { useNavigate } from "react-router-dom";
import { Search, MessageCircle, User, Bell, Loader, Home, Users, Plus } from "lucide-react";
import PostCard from "./PostCard";

const Chat = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("feed");

  const API_URL = "http://localhost:3000";

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchProfile();
    fetchPosts();
  }, []);

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

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/post/getposts`);
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  const getAvatarColor = (username) => {
    if (!username) return "#6366f1";
    const colors = ["#4f46e5", "#0ea5e9", "#06b6d4", "#10b981", "#84cc16"];
    const charSum = username.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader className="h-12 w-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-indigo-600">Student<span className="text-gray-800">Cmty</span></h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-6 w-6 text-gray-600" />
              </button>
              <div 
                className="h-8 w-8 rounded-full flex items-center justify-center text-white font-medium text-sm cursor-pointer"
                style={{ backgroundColor: getAvatarColor(profile?.username) }}
                onClick={() => navigate('/myprofile')}
              >
                {getInitials(profile?.username)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow max-w-2xl w-full mx-auto px-4 py-6">
        {/* Create Post Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div 
              className="h-10 w-10 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: getAvatarColor(profile?.username) }}
            >
              {getInitials(profile?.username)}
            </div>
            <button 
              onClick={() => navigate('/posts')}
              className="flex-grow text-left px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600"
            >
              What's on your mind?
            </button>
          </div>
          <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
            <button className="flex items-center justify-center w-full text-gray-500 hover:text-indigo-600">
              <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Photo
            </button>
            <button className="flex items-center justify-center w-full text-gray-500 hover:text-indigo-600">
              <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
              </svg>
              Feeling
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <svg className="h-12 w-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <h3 className="mt-4 text-gray-800 font-medium">No posts yet</h3>
            <p className="mt-2 text-gray-500">Be the first to share something with the community!</p>
            <button 
              onClick={() => navigate('/posts')}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
            >
              Create Post
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} profile={profile} />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="feed" />
    </div>
  );
};

export default Chat;