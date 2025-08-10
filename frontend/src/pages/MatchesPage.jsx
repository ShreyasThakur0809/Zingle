// src/pages/MatchesPage.js - Displays a list of user's matches
import { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';

const MatchesPage = () => {
    const { address } = useWeb3();
    const [matches, setMatches] = useState([]);

    useEffect(() => {
      // This will be replaced by a real smart contract call to get matches
      const MOCK_MATCHES = [
          { id: 1, name: 'Alex', avatar: 'https://placehold.co/100x100/5C67C2/FFFFFF?text=A' },
          { id: 2, name: 'Sam', avatar: 'https://placehold.co/100x100/2D3A7A/FFFFFF?text=S' },
      ];
      setMatches(MOCK_MATCHES);
    }, [address]);

    return (
        <div className="h-full p-4">
            <h2 className="text-3xl font-bold text-[#2D3A7A] text-center mb-6">Your Matches</h2>
            {matches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
                    {matches.map((match) => (
                        <div key={match.id} className="card bg-white rounded-xl shadow-lg p-4 flex items-center space-x-4">
                            <img src={match.avatar} alt={match.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#DCE0EF]" />
                            <div>
                                <h3 className="text-lg font-bold text-[#2D3A7A]">{match.name}</h3>
                                <p className="text-gray-500 text-sm">You matched!</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-12">Swipe right on some profiles to find your matches!</p>
            )}
        </div>
    );
};

export default MatchesPage;