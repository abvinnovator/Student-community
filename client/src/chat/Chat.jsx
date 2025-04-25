import React, { useState, useEffect } from "react";
import axios from "axios";
import BottomNav from "./BottomNav";
import { useNavigate } from "react-router-dom";
import SearchUsers from "./SearchUsers";
import Cookies from 'js-cookie';
const Chat = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const API_URL = "http://localhost:3000";

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/post/getposts");
      console.log("Fetched posts:", res.data);
      
      if (Array.isArray(res.data)) {
        setPosts(res.data);
      } else if (Array.isArray(res.data.posts)) {
        setPosts(res.data.posts);
      } else {
        console.error("Unexpected response format:", res.data);
        setPosts([]); // fallback to empty array
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setPosts([]); // fallback on error
    }
  };
  

  
  const handleUserClick = async (contact) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      if (!token) {
        navigate('/login');
        return;
      }

      console.log('Creating chat with user:', contact._id);
      const response = await axios.post(
        `${API_URL}/api/chats/create`,
        {
          userId: contact._id
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success && response.data.chat) {
        const chatId = response.data.chat._id;
        console.log('Chat created successfully, navigating to:', chatId);
        // Wait for a brief moment to ensure the chat is saved
        await new Promise(resolve => setTimeout(resolve, 100));
        // Use state to trigger navigation
        navigate(`/chat/${chatId}`, { 
          state: { chatId },
          replace: true 
        });
      } else {
        console.error("Invalid chat response:", response.data);
        setError("Failed to create chat");
      }
    } catch (error) {
      console.error("Error creating chat:", error);
      setError(error.response?.data?.message || "Failed to create chat. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchFriends = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      const res = await axios.get("http://localhost:3000/auth/friends", {
        headers: { Authorization: `Bearer ${token}` }
      } );
      setContacts(res.data);
    } catch (err) {
      console.error("Error fetching friends:", err);
    }
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      const res = await axios.get("http://localhost:3000/auth/userprofile",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      // Handle unauthorized access
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
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-md py-4 px-6 text-center">
        <h1 className="text-3xl font-bold text-blue-800">StudentCommunity</h1>
      </div>

      {/* Profile Welcome */}
      <div className="text-center my-4">
        {profile ? (
          <h2 className="text-2xl font-semibold text-gray-800">
            Hello, {profile.username}!
          </h2>
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </div>

      {/* Search Users */}
      <div className="px-4 mb-4">
        <SearchUsers onFriendAdded={fetchFriends} />
      </div>

      {/* Contacts Grid */}
     {/* Contacts Horizontal Scroll */}
<div className="bg-white px-4 py-3 overflow-x-auto flex space-x-5 border-b border-gray-200 scrollbar-hide">
  {contacts.map((contact) => (
    <div
      key={contact._id}
      className="flex flex-col items-center cursor-pointer relative"
      onClick={() => handleUserClick(contact)}
    >
      {/* Profile Circle (Bigger) */}
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-blue-200 flex items-center justify-center text-2xl font-bold text-white overflow-hidden">
          {contact.profilePic ? (
            <img
              src={contact.profilePic}
              alt={contact.username}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span>{contact.profileTheme || contact.username[0]}</span>
          )}
        </div>
        {/* Online Status Dot (Bigger) */}
        <span
          className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
            contact.isOnline ? "bg-green-500" : "bg-gray-400"
          }`}
        ></span>
      </div>

      {/* Username (Slightly Larger & Bolder) */}
      <p className="text-sm font-medium text-center mt-2 text-gray-800 w-20 truncate">
        {contact.username}
      </p>
    </div>
  ))}
</div>
<div className="space-y-6">
  {Array.isArray(posts) && posts.length > 0 ? (
    posts.map((post) => (
      <div
        key={post._id}
        className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md max-w-md mx-auto"
      >
        {/* User Info */}
        <div className="flex items-center px-4 py-3">
          <img
            src={post.user?.profilePic || "/default-user.png"} // fallback image
            alt="User"
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <span className="font-semibold text-sm">{post.user?.username || "Unknown User"}</span>
        </div>

        {/* Post Image */}
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full object-cover"
          />
        )}

        {/* Post Description */}
        <div className="px-4 py-2">
          <p className="text-sm">
            <span className="font-semibold">{post.user?.username || "User"} </span>
            {post.desc}
          </p>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500">No posts available.</p>
  )}
</div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Chat;
