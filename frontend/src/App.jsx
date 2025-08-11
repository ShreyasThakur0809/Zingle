import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

// Import all the page components from your 'pages' directory
import LoginSignup from './pages/LoginSignup.jsx';
import ProfileSetup from './pages/ProfileSetup.jsx';
import MatchingInterface from './pages/MatchingInterface.jsx';
import MatchConfirmation from './pages/MatchConfirmation.jsx';
import PremiumSubscription from './pages/PremiumSubscription.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

// A simple utility to generate unique IDs
const generateUuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// --- Main App Component with Router ---
// This component now handles the routing context
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

// A new child component to handle state and navigation
const AppContent = () => {
  const [userId, setUserId] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a user ID already exists in local storage
    const storedUserId = localStorage.getItem('datingAppUserId');
    if (storedUserId) {
      setUserId(storedUserId);
      const userProfile = JSON.parse(localStorage.getItem(`userProfile_${storedUserId}`));
      if (userProfile && userProfile.name && userProfile.gender) {
        navigate('/matching');
      } else {
        navigate('/profile-setup');
      }
    } else {
      navigate('/');
    }
    setIsReady(true);
  }, []);

  const handleLogin = () => {
    const newUserId = generateUuidv4();
    localStorage.setItem('datingAppUserId', newUserId);
    setUserId(newUserId);
    navigate('/profile-setup');
  };

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
        <p className="text-xl animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen text-white font-sans flex flex-col items-center justify-center p-4">
      <Routes>
        <Route path="/" element={<LoginSignup onLogin={handleLogin} />} />
        <Route path="/profile-setup" element={<ProfileSetup userId={userId} />} />
        <Route path="/matching" element={<MatchingInterface userId={userId} />} />
        <Route path="/match-confirmation" element={<MatchConfirmation userId={userId} />} />
        <Route path="/premium" element={<PremiumSubscription userId={userId} />} />
        <Route path="/profile" element={<ProfilePage userId={userId} />} />
      </Routes>
    </div>
  );
};
