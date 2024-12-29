// src/hooks/useNativeBridge.js
import { useEffect, useCallback, useState } from 'react';

export const useNativeBridge = () => {
  const [messageFromNative, setMessageFromNative] = useState('');

  const sendMessageToNative = useCallback((type, payload) => {
    const jsonMessage = JSON.stringify({ type, payload });
    
    if (window.ReactNativeWebView?.postMessage) {
      try {
        window.ReactNativeWebView.postMessage(jsonMessage);
        return true;
      } catch (error) {
        console.error('Failed to send message to React Native:', error);
        return false;
      }
    } else {
      console.warn('React Native WebView is not available!');
      return false;
    }
  }, []);

  useEffect(() => {
    const handleMessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'greeting') {
          setMessageFromNative(message.payload.message);
        } else {
          console.warn('Unhandled message type:', message.type);
        }
      } catch (error) {
        console.error('Failed to parse message from React Native:', error);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return {
    messageFromNative,
    sendMessageToNative,
    isNativeAvailable: Boolean(window.ReactNativeWebView?.postMessage)
  };
};