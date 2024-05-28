import React from 'react';

const ReceiverMessage = ({ text }) => {
  return (
    <div className="flex mb-2">
      <div className="bg-gray-200 py-2 px-4 rounded-lg max-w-xs">
        {text}
      </div>
    </div>
  );
};

export default ReceiverMessage;