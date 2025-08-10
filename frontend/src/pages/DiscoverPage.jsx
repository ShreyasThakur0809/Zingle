// src/pages/DiscoverPage.js - The main swiping page
import { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import ProfileCard from '../components/ProfileCard';

const DiscoverPage = () => {
  useWeb3();
  const [profiles, setProfiles] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  const currentProfile = profiles[currentProfileIndex];

  const handleSwipeRight = () => {
    // This logic will be updated to interact with the smart contract
    console.log(`Swiped right on profile ID ${currentProfile.id}`);
    setCurrentProfileIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  const handleSwipeLeft = () => {
    // This logic will be updated to interact with the smart contract
    console.log(`Swiped left on profile ID ${currentProfile.id}`);
    setCurrentProfileIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  useEffect(() => {
    // This useEffect would fetch profiles from the smart contract
    const MOCK_PROFILES = [
        { id: 1, name: 'Alex', bio: 'Passionate about Web3 and long hikes. Let’s build the future together!', avatar: '[https://placehold.co/100x100/5C67C2/FFFFFF?text=A](https://placehold.co/100x100/5C67C2/FFFFFF?text=A)' },
        { id: 2, name: 'Sam', bio: 'AI enthusiast and coffee lover. Building on BNB Chain one block at a time.', avatar: '[https://placehold.co/100x100/2D3A7A/FFFFFF?text=S](https://placehold.co/100x100/2D3A7A/FFFFFF?text=S)' },
        { id: 3, name: 'Jordan', bio: 'DeFi developer and dog owner. Looking for someone to share ideas and adventures.', avatar: '[https://placehold.co/100x100/B1B8E5/FFFFFF?text=J](https://placehold.co/100x100/B1B8E5/FFFFFF?text=J)' },
    ];
    setProfiles(MOCK_PROFILES);
  }, []);

  if (!currentProfile) {
    return <div className="p-4 text-center text-gray-500">No profiles to show. Check back later!</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <ProfileCard profile={currentProfile} onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight} />
    </div>
  );
};

export default DiscoverPage;