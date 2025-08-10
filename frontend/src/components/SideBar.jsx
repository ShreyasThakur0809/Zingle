// src/components/SideBar.jsx - A placeholder for a potential sidebar component
import { Heart, User, Sparkles } from 'lucide-react';

const navItems = [
  { name: 'Discover', icon: <Sparkles size={20} />, page: 'discover' },
  { name: 'Matches', icon: <Heart size={20} />, page: 'matches' },
  { name: 'Profile', icon: <User size={20} />, page: 'profile' },
];

const SideBar = () => {
  return (
    <div className="w-64 bg-white p-4 shadow-lg hidden md:block">
      <h2 className="text-2xl font-bold text-[#2D3A7A] mb-8">Zingle</h2>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.page} className="mb-4">
              <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-[#5C67C2] transition-colors">
                {item.icon}
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;