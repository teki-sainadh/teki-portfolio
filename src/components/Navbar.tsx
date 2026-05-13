import React, { useState, useEffect } from 'react';
import { Search, Bell, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  persona: { name: string; avatar: string };
  onSwitchProfile: () => void;
}

export default function Navbar({ persona, onSwitchProfile }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-500 flex items-center px-4 md:px-12 py-4 justify-between ${
        isScrolled ? 'bg-netflix-black shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center gap-4 md:gap-10">
        {/* Logo */}
        <h1 className="text-netflix-red font-black text-xl md:text-3xl tracking-tighter cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          SAINADH
        </h1>

        {/* Links */}
        <div className="hidden lg:flex gap-4 text-white text-sm">
          <span className="font-semibold cursor-pointer">Home</span>
          <span 
            className="hover:text-gray-300 cursor-pointer transition-colors"
            onClick={() => document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Music
          </span>
          <span className="hover:text-gray-300 cursor-pointer transition-colors">TV Shows</span>
          <span className="hover:text-gray-300 cursor-pointer transition-colors">Movies</span>
          <span className="hover:text-gray-300 cursor-pointer transition-colors">New & Popular</span>
          <span className="hover:text-gray-300 cursor-pointer transition-colors">My List</span>
          <span className="hover:text-gray-300 cursor-pointer transition-colors">Browse by Languages</span>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6 text-white">
        <Search className="w-5 h-5 cursor-pointer" />
        <Bell className="w-5 h-5 cursor-pointer" />
        
        <div className="flex items-center gap-2 cursor-pointer transition-all duration-200 hover:opacity-80 active:scale-95" onClick={onSwitchProfile}>
          <img 
            src={persona.avatar} 
            alt={persona.name} 
            className="w-8 h-8 rounded-sm object-cover ring-1 ring-white/10 hover:ring-white transition-all" 
          />
          <span className="hidden md:block text-[10px] text-white/70">▼</span>
        </div>
      </div>
    </nav>
  );
}
