import React from 'react';
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import BottomNav from './BottomNav';

const ChatWindow = ({ messages }) => {
  return (
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
      <BottomNav />
    </div>
  );
};

export default ChatWindow;