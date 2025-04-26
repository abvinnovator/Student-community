// GetPost.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button
} from '@material-tailwind/react';
import BottomNav from '../chat/BottomNav';

const GetPost = () => {
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/post/getposts');
        setPosts(response.data.posts);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/userprofile',   {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      withCredentials: true
    })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/api/post/deletepost/${postId}`, { withCredentials: true });
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <div className="container mx-auto min-h-screen bg-gray-50 px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Community Posts</h1>
        <Link to="/posts">
          <Button className="flex items-center gap-2 bg-blue-600 px-4 py-2 text-white shadow-lg transition hover:bg-blue-700">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Create Post
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-lg font-medium text-gray-700">Loading posts...</p>
          </div>
        </div>
      ) : posts.length === 0 ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <h3 className="mt-2 text-xl font-medium text-gray-600">No posts yet</h3>
            <p className="mt-1 text-gray-500">Be the first to share something with the community!</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post._id} className="overflow-hidden">
             <CardHeader 
  color="blue" 
  className="relative h-56"
>
  {post.imgUrl && (
    <img
      src={`http://localhost:3000${post.imgUrl}`}
      alt={post.title}
      className="h-full w-full object-cover"
    />
  )}
</CardHeader>
              <CardBody className="p-4">
                <div className="mb-4 flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                    {post.username.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <Typography variant="h6" color="blue-gray" className="font-medium">
                      {post.username}
                    </Typography>
                    <Typography variant="small" color="gray" className="text-xs">
                      {new Date(post.createdAt).toLocaleDateString()} • {new Date(post.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </Typography>
                  </div>
                </div>
                
                <Typography variant="h5" className="mb-2 text-xl font-bold text-gray-800">
                  {post.title}
                </Typography>
                
                <Typography variant="paragraph" className="text-gray-600">
                  {post.desc.length > 150 
                    ? `${post.desc.substring(0, 150)}...` 
                    : post.desc}
                </Typography>
              </CardBody>
              
              <CardFooter className="flex items-center justify-between border-t border-gray-200 p-4">
                <Link to={`/post/${post._id}`}>
                  <Button variant="text" className="text-blue-600 hover:bg-blue-50">
                    Read More
                  </Button>
                </Link>
                {profile?.username === post.username && (
                  <Button 
                    variant="text" 
                    color="red"
                    className="flex items-center gap-1 text-red-500 hover:bg-red-50"
                    onClick={() => handleDelete(post._id)}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Delete
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default GetPost;