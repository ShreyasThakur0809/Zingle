import { useState } from 'react';
import { Heart, User, Sparkles, X, Handshake } from 'lucide-react';
import './App.css'; // optional, your styles go here

// Mock profiles
const MOCK_PROFILES = [
  { id: 1, name: 'Alex', bio: 'Passionate about Web3 and long hikes. Let’s build the future together!', avatar: 'https://placehold.co/100x100/5C67C2/FFFFFF?text=A' },
  { id: 2, name: 'Sam', bio: 'AI enthusiast and coffee lover. Building on BNB Chain one block at a time.', avatar: 'https://placehold.co/100x100/2D3A7A/FFFFFF?text=S' },
  { id: 3, name: 'Jordan', bio: 'DeFi developer and dog owner. Looking for someone to share ideas and adventures.', avatar: 'https://placehold.co/100x100/B1B8E5/FFFFFF?text=J' },
  { id: 4, name: 'Taylor', bio: 'UI/UX designer who loves decentralized science. Looking for a partner in innovation.', avatar: 'https://placehold.co/100x100/DCE0EF/2D3A7A?text=T' },
];

const NavBar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { name: 'Discover', icon: <Sparkles size={20} />, page: 'discover' },
    { name: 'Matches', icon: <Heart size={20} />, page: 'matches' },
    { name: 'Profile', icon: <User size={20} />, page: 'profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 rounded-t-xl">
      <ul className="flex justify-around p-4">
        {navItems.map((item) => (
          <li key={item.page}>
            <button
              onClick={() => setCurrentPage(item.page)}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-300 ${
                currentPage === item.page ? 'text-[#5C67C2] font-bold' : 'text-gray-400'
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const DiscoverPage = ({ onSwipeRight }) => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const currentProfile = MOCK_PROFILES[currentProfileIndex];

  const handleSwipe = (isRight) => {
    if (isRight) onSwipeRight(currentProfile);
    setCurrentProfileIndex((prevIndex) => (prevIndex + 1) % MOCK_PROFILES.length);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm mb-6 flex flex-col items-center">
        <img src={currentProfile.avatar} alt={currentProfile.name} className="w-32 h-32 rounded-full mb-4 border-4 border-[#DCE0EF]" />
        <h2 className="text-2xl font-bold text-[#2D3A7A]">{currentProfile.name}</h2>
        <p className="text-gray-500 text-center mt-2">{currentProfile.bio}</p>
      </div>
      <div className="flex space-x-8">
        <button
          onClick={() => handleSwipe(false)}
          className="bg-gray-200 text-gray-500 p-4 rounded-full shadow-md hover:bg-gray-300"
        >
          <X size={28} />
        </button>
        <button
          onClick={() => handleSwipe(true)}
          className="bg-gradient-to-r from-[#2D3A7A] to-[#5C67C2] text-white p-4 rounded-full shadow-md hover:opacity-90"
        >
          <Handshake size={28} />
        </button>
      </div>
    </div>
  );
};

const MatchesPage = ({ matches }) => (
  <div className="h-full p-4">
    <h2 className="text-3xl font-bold text-[#2D3A7A] text-center mb-6">Your Matches</h2>
    {matches.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
        {matches.map((match) => (
          <div key={match.id} className="bg-white rounded-xl shadow-lg p-4 flex items-center space-x-4">
            <img src={match.avatar} alt={match.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#DCE0EF]" />
            <div>
              <h3 className="text-lg font-bold text-[#2D3A7A]">{match.name}</h3>
              <p className="text-gray-500 text-sm">You matched!</p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500 mt-12">Swipe right to find your matches!</p>
    )}
  </div>
);

const ProfilePage = ({ userProfile }) => (
  <div className="flex flex-col items-center justify-center h-full p-4">
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm flex flex-col items-center">
      <div className="w-32 h-32 rounded-full bg-[#DCE0EF] flex items-center justify-center mb-4 border-4 border-[#B1B8E5]">
        <User size={64} className="text-[#2D3A7A]" />
      </div>
      <h2 className="text-2xl font-bold text-[#2D3A7A] mb-2">{userProfile.name}</h2>
      <p className="text-gray-500 text-center">{userProfile.bio}</p>
      <div className="mt-6">
        <span className="bg-[#B1B8E5] text-[#2D3A7A] py-1 px-4 rounded-full text-sm">Wallet Connected</span>
      </div>
    </div>
  </div>
);

const App = () => {
  const [currentPage, setCurrentPage] = useState('discover');
  const [matches, setMatches] = useState([]);
  const [userProfile] = useState({
    name: 'BNB Dev',
    bio: 'Building the future of decentralized social apps on BNB Chain.',
  });

  const handleSwipeRight = (profile) => {
    setMatches((prev) => [...prev, profile]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'discover':
        return <DiscoverPage onSwipeRight={handleSwipeRight} />;
      case 'matches':
        return <MatchesPage matches={matches} />;
      case 'profile':
        return <ProfilePage userProfile={userProfile} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      <div className="container mx-auto h-screen p-4">
        {renderPage()}
      </div>
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;
