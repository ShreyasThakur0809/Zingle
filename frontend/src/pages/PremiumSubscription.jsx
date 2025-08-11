import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PremiumSubscription = ({ userId }) => {
  const navigate = useNavigate();
  const [isPaying, setIsPaying] = useState(false);

  const handleCryptoPayment = async () => {
    setIsPaying(true);
    // This is a mock payment.
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
      const userProfile = JSON.parse(localStorage.getItem(`userProfile_${userId}`));
      if (userProfile) {
        userProfile.isPremium = true;
        localStorage.setItem(`userProfile_${userId}`, JSON.stringify(userProfile));
        console.log(`Premium subscription activated for user ${userId}.`);
      }
    } catch (error) {
      console.error("Error updating premium status:", error);
    }
    
    setIsPaying(false);
    navigate('/matching'); // Use navigate to return to matching
  };

  return (
    <div className="bg-gray-900 p-8 rounded-3xl shadow-3xl max-w-md w-full text-center space-y-6 animate-fade-in">
      <h2 className="text-4xl font-extrabold text-yellow-400">Go Premium!</h2>
      <p className="text-gray-400 text-lg">Unlock unlimited swipes and other exclusive features.</p>
      <div className="text-6xl animate-pulse">💎</div>
      <button
        onClick={handleCryptoPayment}
        disabled={isPaying}
        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 rounded-2xl text-lg font-semibold shadow-lg disabled:from-gray-500 disabled:to-gray-500"
      >
        {isPaying ? 'Processing Payment...' : 'Pay with Crypto (0.01 ETH)'}
      </button>
      <button
        onClick={() => navigate('/matching')}
        className="w-full py-4 mt-4 bg-gray-700 hover:bg-gray-600 transition-colors duration-300 rounded-2xl font-semibold shadow-md"
      >
        Back to Swiping
      </button>
    </div>
  );
};

export default PremiumSubscription;
