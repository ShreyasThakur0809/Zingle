// src/pages/ProfilePage.js - Displays the logged-in user's profile
import { useWeb3 } from '../context/Web3Context';
import ProfileCard from '../components/ProfileCard';

const ProfilePage = () => {
    const { address, isConnected, userProfile } = useWeb3();

    // Mock profile data until it's fetched from the contract
    const mockProfile = {
        name: 'BNB Dev',
        bio: 'Building the future of decentralized social apps on BNB Chain.',
        avatar: '[https://placehold.co/100x100/DCE0EF/2D3A7A?text=U](https://placehold.co/100x100/DCE0EF/2D3A7A?text=U)'
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h2 className="text-3xl font-bold text-[#2D3A7A] mb-6">My Profile</h2>
            <ProfileCard profile={userProfile || mockProfile} />
            {isConnected && address && (
                <p className="text-gray-400 text-sm mt-4 text-center break-all">
                    Address: {address}
                </p>
            )}
        </div>
    );
};

export default ProfilePage;
