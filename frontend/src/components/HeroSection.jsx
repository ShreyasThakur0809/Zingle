// src/components/HeroSection.jsx - Hero section for the landing/onboarding page
import { useWeb3 } from '../context/Web3Context';
import { Wallet } from 'lucide-react';

const HeroSection = () => {
  const { connectWallet } = useWeb3();
  
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl md:text-5xl font-black text-[#2D3A7A] mb-4">Welcome to Zingle</h1>
      <p className="text-gray-600 mb-8 max-w-sm">
        Connect your wallet to start your decentralized dating journey. Your wallet is your identity.
      </p>
      <button
        onClick={connectWallet}
        className="bg-[#2D3A7A] text-white font-medium py-3 px-6 rounded-full text-lg hover:bg-[#5C67C2] transition-colors flex items-center space-x-2"
      >
        <Wallet size={24} />
        <span>Connect Wallet</span>
      </button>
    </div>
  );
};

export default HeroSection;