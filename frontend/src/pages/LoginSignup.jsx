import React from 'react';

const LoginSignup = ({ onLogin }) => {
  const handleLogin = (type) => {
    // Call the onLogin prop to handle the user ID creation and navigation
    onLogin(type);
  };

  return (
    <div className="bg-gray-900 p-8 rounded-3xl shadow-3xl max-w-md w-full text-center space-y-6 transform transition-transform duration-500 hover:scale-105">
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        <h1 className="text-5xl font-extrabold animate-fade-in-down">Connect & Vibe</h1>
      </div>
      <p className="text-gray-300 text-lg animate-fade-in">Find your next friend or partner.</p>
      <button
        onClick={() => handleLogin('google')}
        className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-2xl text-lg font-semibold shadow-lg flex items-center justify-center space-x-3 transform hover:scale-105 hover:shadow-xl"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.52 0 10-4.48 10-10S17.52 2 12 2zm-1.5 15h3v-2.5h-3V17zm0-4h3v-2.5h-3V13zm0-4h3V6.5h-3V9z"/>
        </svg>
        <span>Sign In with Google</span>
      </button>
      <button
        onClick={() => handleLogin('web3')}
        className="w-full py-4 px-6 bg-purple-600 hover:bg-purple-700 transition-all duration-300 rounded-2xl text-lg font-semibold shadow-lg flex items-center justify-center space-x-3 transform hover:scale-105 hover:shadow-xl"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18.75l-6-6M12 18.75l6-6M12 18.75V3" />
        </svg>
        <span>Sign In with Web3 Wallet</span>
      </button>
      <p className="text-xs text-gray-500 mt-4">For demo purposes, both buttons will sign you in.</p>
    </div>
  );
};

export default LoginSignup;
