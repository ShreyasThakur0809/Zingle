
// src/pages/ProfileCreation.js - Page for creating a new user profile
import { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { Image as ImageIcon } from 'lucide-react';

const ProfileCreation = () => {
  const { contract } = useWeb3();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const createProfile = async () => {
    if (!name || !bio || !file) {
      alert("Please fill out all fields and upload an image.");
      return;
    }
    
    // Placeholder for IPFS upload logic
    const ipfsHash = 'ipfs://placeholder-hash';
    console.log("Uploading to IPFS... will get a hash:", ipfsHash);

    try {
      const tx = await contract.createProfile(name, bio, ipfsHash);
      await tx.wait();
      console.log("Profile created successfully!");
      // After success, you'd want to refresh the profile state in context.
    } catch (error) {
      console.error("Failed to create profile:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-[#2D3A7A] mb-6">Create Your Profile</h1>
      <p className="text-gray-600 mb-8 text-center">Your profile is your decentralized identity. Fill it out to start connecting with others.</p>

      <div className="card bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <label htmlFor="file-upload" className="relative cursor-pointer">
            <div className="w-32 h-32 rounded-full bg-[#DCE0EF] flex items-center justify-center border-4 border-[#B1B8E5] overflow-hidden">
              {imageUrl ? (
                <img src={imageUrl} alt="Profile Preview" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon size={64} className="text-[#2D3A7A]" />
              )}
            </div>
            <input id="file-upload" type="file" onChange={handleFileChange} className="sr-only" />
            <span className="absolute bottom-0 right-0 bg-[#2D3A7A] text-white rounded-full p-2">
              <ImageIcon size={16} />
            </span>
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C67C2]"
            placeholder="Your Name"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C67C2]"
            placeholder="Tell us about yourself..."
            rows="4"
          ></textarea>
        </div>

        <button
          onClick={createProfile}
          className="w-full bg-[#2D3A7A] text-white py-3 rounded-lg font-bold hover:bg-[#5C67C2] transition-colors"
        >
          Create Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCreation;