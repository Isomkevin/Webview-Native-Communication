import React, { useEffect, useState } from 'react';

const App = () => {
  const [messageFromNative, setMessageFromNative] = useState('');

  const sendMessageToReactNative = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('Hello from the Web App!');
    } else {
      alert('React Native WebView is not available!');
    }
  };

  useEffect(() => {
    // Listen for messages from the React Native app
    const handleMessage = (event) => {
      setMessageFromNative(event.data); // Update the state with the message received
    };

    window.addEventListener('message', handleMessage);

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
          Send to React Native
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
