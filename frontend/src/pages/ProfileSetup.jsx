import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSetup = ({ userId }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [interests, setInterests] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (userId) {
      const storedProfile = JSON.parse(localStorage.getItem(`userProfile_${userId}`));
      if (storedProfile) {
        setName(storedProfile.name || '');
        setGender(storedProfile.gender || '');
        setInterests(storedProfile.interests ? storedProfile.interests.join(', ') : '');
      }
    }
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !gender || !interests || !userId) {
      console.log("Please fill out all fields.");
      return;
    }
    setIsSaving(true);
    try {
      const userProfile = {
        name,
        gender,
        interests: interests.split(',').map(i => i.trim()),
        isPremium: false,
      };
      localStorage.setItem(`userProfile_${userId}`, JSON.stringify(userProfile));
      console.log("Profile saved to local storage for user:", userId);
      setIsSaving(false);
      navigate('/matching');
    } catch (error) {
      setIsSaving(false);
      console.error("Error saving profile to local storage:", error);
    }
  };

  return (
    <div className="bg-gray-900 p-8 rounded-3xl shadow-3xl max-w-lg w-full space-y-6 animate-fade-in">
      <h2 className="text-4xl font-extrabold text-center text-white">Complete Your Profile</h2>
      <p className="text-center text-gray-400 text-lg">Share a little about yourself to get started.</p>
      <p className="text-sm text-gray-500 text-center">Your User ID: <span className="font-mono">{userId}</span></p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200"
            required
          >
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">Interests (comma-separated)</label>
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200"
            placeholder="e.g., hiking, coding, music"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 transition-all duration-300 rounded-xl font-semibold shadow-lg disabled:from-gray-500 disabled:to-gray-500"
        >
          {isSaving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;
