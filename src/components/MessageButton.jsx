// src/components/MessageButton.jsx
import React from 'react';

const MessageButton = ({ onClick, disabled }) => {
  return (
    <button
      className={`
        px-6 py-3 font-bold rounded-lg shadow-lg transition-all duration-300
        ${disabled 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700 text-white'
        }
      `}
      onClick={onClick}
      disabled={disabled}
    >
      Send JSON to React Native
    </button>
  );
};

export default MessageButton;