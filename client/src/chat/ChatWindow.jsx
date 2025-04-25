import React from 'react';
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import BottomNav from './BottomNav';

const ChatWindow = ({ messages, selectedUser, onBack }) => {
  if (!selectedUser) {
    return (
      <div className="flex-1 hidden sm:flex items-center justify-center text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      {/* Header for mobile */}
      <div className="sm:hidden flex items-center p-4 bg-blue-600 text-white">
        <button onClick={onBack} className="mr-4 text-white font-bold">&larr;</button>
        <span>{selectedUser.name}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index}>
            {message.sender ? (
              <SenderMessage text={message.text} />
            ) : (
              <ReceiverMessage text={message.text} />
            )}
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default ChatWindow;
