import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const MatchingInterface = ({ userId }) => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    // Mock profiles for the local storage version
    const mockProfiles = [
      { id: '1a2b3c4d', name: 'Alex', gender: 'Male', interests: ['hiking', 'movies', 'photography'] },
      { id: '5e6f7g8h', name: 'Jordan', gender: 'Female', interests: ['coding', 'music', 'art'] },
      { id: '9i0j1k2l', name: 'Taylor', gender: 'Other', interests: ['reading', 'gaming', 'travel'] },
      { id: '3m4n5o6p', name: 'Casey', gender: 'Male', interests: ['sports', 'cooking', 'science'] },
      { id: '7q8r9s0t', name: 'Sam', gender: 'Female', interests: ['yoga', 'writing', 'baking'] },
    ];
    setProfiles(mockProfiles);
  }, []);

  useEffect(() => {
    if (profiles.length > 0) {
      setCurrentProfile(profiles[profiles.length - 1]);
    } else {
      setCurrentProfile(null);
    }
  }, [profiles]);

  const removeProfile = (direction) => {
    const profileToRemove = currentProfile;
    const remainingProfiles = profiles.slice(0, profiles.length - 1);
    setProfiles(remainingProfiles);

    if (direction === 'right') {
      const randomMatch = Math.random() < 0.5; // 50% chance of a match for the demo
      if (randomMatch) {
        console.log("Simulated a mutual match!");
        const existingMatches = JSON.parse(localStorage.getItem(`userMatches_${userId}`)) || [];
        existingMatches.push(profileToRemove);
        localStorage.setItem(`userMatches_${userId}`, JSON.stringify(existingMatches));
        navigate('/match-confirmation');
      } else {
        console.log("Simulated a right swipe, but no mutual match yet.");
      }
    }
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches[0].clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentClientX = e.clientX || e.touches[0].clientX;
    setCurrentX(currentClientX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const deltaX = currentX - startX;
    const swipeThreshold = 100; // Pixels to trigger a swipe
    const direction = deltaX > 0 ? 'right' : 'left';

    if (Math.abs(deltaX) > swipeThreshold) {
      const card = cardRef.current;
      card.style.transition = 'transform 0.5s ease-out';
      card.style.transform = `translateX(${direction === 'right' ? '150%' : '-150%'}) rotate(${direction === 'right' ? '30deg' : '-30deg'})`;
      setTimeout(() => {
        removeProfile(direction);
        if (cardRef.current) {
          card.style.transition = 'none';
          card.style.transform = 'none';
        }
      }, 500);
    } else {
      const card = cardRef.current;
      card.style.transition = 'transform 0.3s ease-in-out';
      card.style.transform = 'none';
    }
    setStartX(0);
    setCurrentX(0);
  };

  const handleButtonClick = (direction) => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.5s ease-out';
    card.style.transform = `translateX(${direction === 'right' ? '150%' : '-150%'}) rotate(${direction === 'right' ? '30deg' : '-30deg'})`;
    setTimeout(() => {
      removeProfile(direction);
      if (cardRef.current) {
        card.style.transition = 'none';
        card.style.transform = 'none';
      }
    }, 500);
  };

  const getCardStyle = () => {
    if (isDragging) {
      const deltaX = currentX - startX;
      const rotation = deltaX / 15; // Controls the tilt of the card
      return {
        transform: `translateX(${deltaX}px) rotate(${rotation}deg)`,
        transition: 'none',
        cursor: 'grabbing',
      };
    }
    return {
      cursor: 'grab',
    };
  };

  if (profiles.length === 0) {
    return (
      <div className="bg-gray-900 p-8 rounded-3xl shadow-3xl max-w-md w-full text-center animate-fade-in">
        <h2 className="text-3xl font-bold">No more profiles!</h2>
        <p className="text-gray-400 mt-2">Check back later or consider a premium subscription.</p>
        <button
          onClick={() => navigate('/premium')}
          className="mt-4 w-full py-3 bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 rounded-xl font-semibold shadow-md"
        >
          Go Premium
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-sm h-[600px] flex flex-col items-center justify-center animate-fade-in-up">
      <div className="absolute top-4 left-4 z-30">
        <button
          onClick={() => navigate('/profile')}
          className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors duration-200 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>
      <div className="card-container relative w-full h-[500px]">
        {profiles.map((profile, index) => (
          <div
            key={profile.id}
            ref={index === profiles.length - 1 ? cardRef : null}
            className={`absolute w-full h-full bg-gray-800 rounded-3xl shadow-3xl border-4 border-gray-700 p-6 flex flex-col justify-end transition-transform duration-500 ease-in-out ${index < profiles.length - 1 ? 'scale-[0.95]' : ''}`}
            style={{
              zIndex: profiles.length - index,
              ...getCardStyle()
            }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <div
              className="absolute top-0 left-0 w-full h-full bg-cover bg-center rounded-3xl"
              style={{ backgroundImage: `url(https://placehold.co/400x500/1f2937/d1d5db?text=${encodeURIComponent(profile.name)})` }}>
            </div>
            <div className="relative z-20 text-white p-4 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent rounded-b-3xl">
              <h3 className="text-4xl font-extrabold text-white">{profile.name}</h3>
              <p className="text-gray-300 mt-1 text-lg">{profile.gender}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {profile.interests.map((interest, i) => (
                  <span key={i} className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 flex space-x-8 z-20">
        <button
          onClick={() => handleButtonClick('left')}
          className="p-5 bg-red-600 hover:bg-red-700 rounded-full shadow-lg transition-all duration-200 transform hover:scale-125 hover:shadow-xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button
          onClick={() => handleButtonClick('right')}
          className="p-5 bg-green-600 hover:bg-green-700 rounded-full shadow-lg transition-all duration-200 transform hover:scale-125 hover:shadow-xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MatchingInterface;
