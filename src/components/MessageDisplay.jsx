// src/components/MessageDisplay.jsx
import React from 'react';

const MessageDisplay = ({ message }) => {
  if (!message) return null;
  
  return (
    <p className="mt-4 text-lg text-gray-700">
      Message from React Native: {message}
    </p>
  );
};

export default MessageDisplay;