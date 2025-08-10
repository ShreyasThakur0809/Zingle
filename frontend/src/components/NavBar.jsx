// src/components/NavBar.jsx - Navigation bar component
import { Heart, User, Sparkles } from 'lucide-react';

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
                currentPage === item.page
                  ? 'text-[#5C67C2] font-bold'
                  : 'text-gray-400'
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

export default NavBar;