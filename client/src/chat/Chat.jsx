import React, { useState } from 'react';
import BottomNav from './BottomNav';
import { useNavigate } from 'react-router-dom';

const Chat = ({ contacts }) => {
  const navigate = useNavigate();

  const handleUserClick = (contact) => {
    navigate(`/chat/${contact.name}`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-12">
        Chat
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-2xl p-6 hover:shadow-lg transition duration-200 flex flex-col cursor-pointer"
            onClick={() => handleUserClick(contact)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={contact.image}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full mr-4 border-4 border-white"
                />
                <h2 className="text-xl font-semibold text-blue-800">
                  {contact.name}
                </h2>
              </div>
              <button>
                <img
                  src="https://www.citypng.com/public/uploads/preview/-121610644050asr3vnjffo.png"
                  alt="Call"
                  className="w-6 h-6"
                />
              </button>
            </div>
            <p className="text-gray-600 text-center">{contact.status}</p>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
};

export default Chat;