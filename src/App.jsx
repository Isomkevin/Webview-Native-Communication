const App = () => {
  const sendMessageToReactNative = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('Hello from the Tailwind Button!');
    } else {
      alert('React Native WebView is not available!');
    }
  }
  return (
    <button
    id="sendButton"
    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
    onClick={sendMessageToReactNative}>
      Send to React Native
    </button>
  )
}

export default App
