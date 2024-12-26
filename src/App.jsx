import React, { useEffect, useState } from 'react';

const App = () => {
  const [messageFromNative, setMessageFromNative] = useState('');

  // Send JSON message to React Native
  const sendMessageToReactNative = () => {
    const jsonMessage = {
      type: 'notification',
      payload: {
        message: 'Hello from the Web App!',
        timestamp: new Date().toISOString(),
      },
    };

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(jsonMessage));
    } else {
      alert('React Native WebView is not available!');
    }
  };

  useEffect(() => {
    // Handle messages from React Native
    const handleMessage = (event) => {
      try {
        const message = JSON.parse(event.data); // Parse JSON data
        if (message.type === 'greeting') {
          setMessageFromNative(message.payload.message);
        } else {
          console.warn('Unhandled message type:', message.type);
        }
      } catch (error) {
        console.error('Failed to parse message from React Native:', error);
      }
    };

    // Add event listener for messages
    window.addEventListener('message', handleMessage);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <button
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
          onClick={sendMessageToReactNative}
        >
          Send JSON to React Native
        </button>
        {messageFromNative && (
          <p className="mt-4 text-lg text-gray-700">
            Message from React Native: {messageFromNative}
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
