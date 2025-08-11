import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MatchConfirmation = () => {
  const navigate = useNavigate();
  const [isMinting, setIsMinting] = useState(false);

  const handleMintNFT = async () => {
    setIsMinting(true);
    // This is a mock function.
    await new Promise(resolve => setTimeout(resolve, 2000));
    // console.log(`NFT for user ${userId} minted successfully!`); // userId is not needed here
    setIsMinting(false);
    navigate('/matching'); // Use navigate to go back to the matching page
  };

  return (
    <div className="bg-gray-900 p-8 rounded-3xl shadow-3xl max-w-md w-full text-center space-y-6 animate-fade-in">
      <div className="text-8xl animate-bounce">💖</div>
      <h2 className="text-4xl font-extrabold text-green-400">It's a Match!</h2>
      <p className="text-gray-400 text-lg">You and another user have mutually swiped right!</p>
      <button
        onClick={handleMintNFT}
        disabled={isMinting}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 rounded-2xl text-lg font-semibold shadow-lg disabled:from-gray-500 disabled:to-gray-500"
      >
        {isMinting ? 'Minting NFT...' : 'Mint Your Match NFT'}
      </button>
      <button
        onClick={() => navigate('/matching')}
        className="w-full py-4 mt-4 bg-gray-700 hover:bg-gray-600 transition-colors duration-300 rounded-2xl font-semibold shadow-md"
      >
        Keep Swiping
      </button>
    </div>
  );
};

export default MatchConfirmation;
