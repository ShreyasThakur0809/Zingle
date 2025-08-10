// src/App.js - The main entry point and router for the application
import { useState, useEffect } from 'react';
import { useWeb3 } from './context/Web3Context';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Onboarding from './pages/Onboarding';
import ProfileCreation from './pages/ProfileCreation';
import DiscoverPage from './pages/DiscoverPage';
import MatchesPage from './pages/MatchesPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('discover');
  const { isConnected, isProfileCreated, loading } = useWeb3();

  // --- BEGIN MODIFICATION ---
  // To bypass onboarding, set this to true for development
  const bypassOnboarding = true;
  // --- END MODIFICATION ---

  useEffect(() => {
    // If bypassing, always set to discover page on initial load
    if (bypassOnboarding) {
      setCurrentPage('discover');
    }
  }, [bypassOnboarding]);

  const renderPage = () => {
    // If bypassing, render the requested page without any checks
    if (bypassOnboarding) {
      switch (currentPage) {
        case 'discover':
          return <DiscoverPage />;
        case 'matches':
          return <MatchesPage />;
        case 'profile':
          return <ProfilePage />;
        default:
          return <DiscoverPage />;
      }
    }
    
    // Original Web3 flow for when bypassOnboarding is false
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#5C67C2]"></div>
        </div>
      );
    }
    if (!isConnected) {
      return <Onboarding />;
    }
    if (!isProfileCreated) {
      return <ProfileCreation />;
    }

    switch (currentPage) {
      case 'discover':
        return <DiscoverPage />;
      case 'matches':
        return <MatchesPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <DiscoverPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <div className="container mx-auto p-4 flex-grow">
        {renderPage()}
      </div>
      {(isConnected || bypassOnboarding) && <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      <Footer />
    </div>
  );
};

// Top-level component wrapped in Web3Provider
import { Web3Provider } from './context/Web3Context';

const WrappedApp = () => (
  <Web3Provider>
    <App />
  </Web3Provider>
);

export default WrappedApp;
