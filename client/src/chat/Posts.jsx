import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    imgUrl: '',
    title: '',
    desc: ''
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
     const response= await axios.post('http://localhost:3000/api/post/createposts', formData, { withCredentials: true }); 
      console.log(response.data);
      navigate('/getposts');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8">Create Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL:</label>
          <input
            type="text"
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter image URL"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter post title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter post description"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
      <BottomNav />
    </div>
  );
}

export default CreatePost;
