import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ userId }) => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (userId) {
      const storedProfile = JSON.parse(localStorage.getItem(`userProfile_${userId}`));
      setUserProfile(storedProfile);
      const storedMatches = JSON.parse(localStorage.getItem(`userMatches_${userId}`));
      setMatches(storedMatches || []);
    }
  }, [userId]);

  if (!userProfile) {
    return (
      <div className="bg-gray-900 p-8 rounded-3xl shadow-3xl max-w-md w-full text-center space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold">Profile not found.</h2>
        <button
          onClick={() => navigate('/')}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-xl font-semibold shadow-md"
        >
          Return to Login
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-8 rounded-3xl shadow-3xl max-w-lg w-full space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-extrabold text-white">My Profile</h2>
        <button
          onClick={() => navigate('/matching')}
          className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors duration-200 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-5xl font-bold">
            {userProfile.name ? userProfile.name[0] : 'U'}
          </div>
          <div>
            <h3 className="text-3xl font-extrabold">{userProfile.name}</h3>
            <p className="text-gray-400 text-lg">{userProfile.gender}</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-gray-300 font-semibold">Interests:</p>
          <div className="flex flex-wrap gap-2">
            {userProfile.interests.map((interest, i) => (
              <span key={i} className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-4 pt-4 border-t border-gray-700 mt-6">
        <h3 className="text-2xl font-bold text-white">Your Matches ({matches.length})</h3>
        {matches.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {matches.map((match) => (
              <div key={match.id} className="bg-gray-800 p-4 rounded-xl shadow-md flex flex-col items-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-bold">
                  {match.name[0]}
                </div>
                <p className="font-semibold text-lg">{match.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You don't have any matches yet. Start swiping!</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
