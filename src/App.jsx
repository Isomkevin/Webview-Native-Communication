// src/App.jsx
import React from 'react';
import { useNativeBridge } from './hooks/useNativeBridge';
import MessageButton from './components/MessageButton';
import MessageDisplay from './components/MessageDisplay';

const App = () => {
  const { messageFromNative, sendMessageToNative, isNativeAvailable } = useNativeBridge();

  const handleSendMessage = () => {
    sendMessageToNative('notification', {
      message: 'Hello from the Web App!',
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <MessageButton 
          onClick={handleSendMessage}
          disabled={!isNativeAvailable}
        />
        <MessageDisplay message={messageFromNative} />
      </div>
    </div>
  );
};

export default App;