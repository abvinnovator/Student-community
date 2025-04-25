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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/post/getposts');
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/userprofile', { withCredentials: true })
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-4xl font-extrabold text-gray-800">All Posts</h2>
          <Link to='/posts'>
            <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-full shadow-md hover:bg-indigo-700 transition duration-300">
              + Add Post
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post._id} className="max-w-[26rem] shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300">
              <CardHeader floated={false} shadow={false} color="transparent" className="m-0 rounded-t-lg">
                <img
                  src={post.imgUrl || 'https://via.placeholder.com/150'}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardBody className="p-5">
                <Typography variant="h4" color="blue-gray" className="font-semibold text-xl">
                  {post.title}
                </Typography>
                <Typography variant="lead" color="gray" className="mt-3 font-normal text-gray-600">
                  {post.desc}
                </Typography>
              </CardBody>
              <CardFooter className="flex items-center justify-between px-5 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-red-400 flex items-center justify-center text-white text-lg font-semibold">
                    {post.username.slice(0, 2).toUpperCase()}
                  </div>
                  <Typography className="text-gray-700">{post.username}</Typography>
                </div>
                <Typography className="text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</Typography>
                {profile?.username === post.username && (
                  <Button color="red" size="sm" className="px-3 py-1.5 rounded-md" onClick={() => handleDelete(post._id)}>
                    Delete
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default GetPost;
