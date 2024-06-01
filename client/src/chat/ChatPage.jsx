import React, { useState } from 'react';
import ChatWindow from './ChatWindow';

const ChatPage = ({ username }) => {
  const [messages, setMessages] = useState([
    { sender: true, text: 'Hey there!' },
    { sender: false, text: 'Hi, how can I help you?' },
    { sender: true, text: 'I have a question about your product.' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { sender: true, text: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen md:flex-row">
      <div className="md:w-1/3 bg-gray-100 p-4">
        <div className="mb-4">
          <h2 className="text-2xl text-center font-bold text-blue-800">
            Chat with {username}
          </h2>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <ChatWindow messages={messages} />
        </div>
        <div className="bg-white p-4 flex items-center">
          <div className="flex-1 flex items-center bg-gray-100 rounded-full py-2 px-4">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 text-blue-500 hover:text-blue-600 transition-colors duration-300"
            >
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>

            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;