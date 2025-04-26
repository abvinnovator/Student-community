import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

const PostCard = ({ post, profile }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
            {post.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{post.username}</p>
            <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
          </div>
        </div>
        {profile?.username === post.username && (
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Post Content */}
      <div className="px-4 pb-2">
        <p className="text-gray-800 mb-3">{post.desc}</p>
      </div>

      {/* Post Image */}
      {post.imgUrl && (
        <div className="w-full">
          <img 
            src={`http://localhost:3000${post.imgUrl}`} 
            alt={post.title} 
            className="w-full h-auto max-h-96 object-cover"
          />
        </div>
      )}

      {/* Post Stats */}
      <div className="px-4 py-2 border-t border-gray-100 text-sm text-gray-500">
        <span>{post.likes?.length || 0} likes</span>
        <span className="ml-3">{post.comments?.length || 0} comments</span>
      </div>

      {/* Post Actions */}
      <div className="flex border-t border-gray-100">
        <button className="flex-1 flex items-center justify-center py-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-50">
          <Heart className="h-5 w-5 mr-1" />
          Like
        </button>
        <button className="flex-1 flex items-center justify-center py-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-50">
          <MessageCircle className="h-5 w-5 mr-1" />
          Comment
        </button>
        <button className="flex-1 flex items-center justify-center py-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-50">
          <Share2 className="h-5 w-5 mr-1" />
          Share
        </button>
      </div>
    </div>
  );
};

export default PostCard;