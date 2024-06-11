import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button // Import Button component
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
      // Remove the deleted post from the state
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4">All Posts</h2>
      <span>
        <Link to='/posts'>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
            Add Post
          </button>
        </Link>
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {posts.map((post) => (
          <Card key={post._id} className="max-w-[24rem] overflow-hidden mx-auto mb-6">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 rounded-none"
            >
              <img
                src={post.imgUrl || 'https://via.placeholder.com/150'}
                alt={post.title}
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h4" color="blue-gray">
                {post.title}
              </Typography>
              <Typography variant="lead" color="gray" className="mt-3 font-normal">
                {post.desc}
              </Typography>
            </CardBody>
            <CardFooter className="flex items-center justify-between">
              <div
                className=" w-16  h-16 rounded-full bg-gray-300 flex items-center justify-center text-white text-xl font-bold mx-auto"
                style={{ backgroundColor: '#de6d6d' }}
              >
                <span>{post.username.slice(0, 5)}</span>
              </div>
              <Typography className="font-normal">{new Date(post.createdAt).toLocaleDateString()}</Typography>
              {profile?.username === post.username && (
                <Button
                  color="red"
                  size="sm"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      <BottomNav />
    </div>
  );
};

export default GetPost;
