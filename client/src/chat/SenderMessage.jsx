import React from 'react';

const SenderMessage = ({ text }) => {
  return (
    <div className="flex justify-end mb-2">
      <div className="bg-blue-500 text-white py-2 px-4 rounded-lg max-w-xs">
        {text}
      </div>
    </div>
  );
};

export default SenderMessage;