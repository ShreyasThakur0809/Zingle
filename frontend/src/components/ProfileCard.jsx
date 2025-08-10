// src/components/ProfileCard.jsx - Reusable component for displaying a profile
import { Handshake, X, User } from 'lucide-react';

const ProfileCard = ({ profile, onSwipeLeft, onSwipeRight }) => {
  if (!profile) {
    return (
      <div className="card bg-white rounded-xl shadow-lg p-6 w-full max-w-sm flex flex-col items-center text-center">
        <div className="w-32 h-32 rounded-full bg-[#DCE0EF] flex items-center justify-center mb-4 border-4 border-[#B1B8E5]">
          <User size={64} className="text-[#2D3A7A]" />
        </div>
        <p className="text-gray-500">No profile data available.</p>
      </div>
    );
  }

  return (
    <div className="card bg-white rounded-xl shadow-lg p-6 w-full max-w-sm flex flex-col items-center">
      <img src={profile.avatar} alt={profile.name} className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-[#DCE0EF]" />
      <h2 className="text-2xl font-bold text-[#2D3A7A]">{profile.name}</h2>
      <p className="text-gray-500 text-center mt-2">{profile.bio}</p>
      {onSwipeLeft && onSwipeRight && (
        <div className="flex space-x-8 mt-6">
          <button
            onClick={onSwipeLeft}
            className="bg-gray-200 text-gray-500 p-4 rounded-full shadow-md hover:bg-gray-300 transition-colors"
          >
            <X size={28} />
          </button>
          <button
            onClick={onSwipeRight}
            className="bg-gradient-to-r from-[#2D3A7A] to-[#5C67C2] text-white p-4 rounded-full shadow-md hover:opacity-90 transition-opacity"
          >
            <Handshake size={28} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;