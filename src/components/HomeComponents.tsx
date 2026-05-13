import React, { useRef, useState } from 'react';
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProfileBanner } from '../types';

interface BannerProps {
  banner: ProfileBanner;
}

export function Banner({ banner }: BannerProps) {
  return (
    <header
      className="relative h-[80vh] md:h-[95vh] text-white overflow-hidden"
      style={{
        backgroundImage: `url(${banner.background_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 gradient-to-t-netflix" />

      <div className="relative z-10 pt-32 md:pt-48 px-4 md:px-12 max-w-2xl h-full flex flex-col justify-end pb-24 md:pb-40">
        <h1 className="text-4xl md:text-7xl font-black mb-4 tracking-tighter drop-shadow-lg">
          {banner.headline}
        </h1>
        
        <p className="text-sm md:text-lg mb-6 line-clamp-3 text-shadow-netflix text-gray-200">
          {banner.profile_summary}
        </p>

        <div className="flex gap-4">
          <a
            href={banner.resume_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-2 rounded-md font-bold hover:bg-white/80 transition-colors"
          >
            <Play className="w-5 h-5 fill-black" />
            Resume
          </a>
          <a
            href={banner.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-500/50 text-white px-6 md:px-8 py-2 rounded-md font-bold hover:bg-gray-500/70 transition-colors backdrop-blur-sm"
          >
            <Info className="w-5 h-5" />
            LinkedIn
          </a>
        </div>
      </div>
    </header>
  );
}

interface RowItem {
  id: string;
  title: string;
  image?: string;
  description?: string;
  live_url?: string;
}

interface RowProps {
  title: string;
  items: RowItem[];
  isLarge?: boolean;
  onItemClick: (item: RowItem) => void;
  openDirectly?: boolean;
}

export function Row({ title, items, isLarge, onItemClick, openDirectly }: RowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
      setShowLeft(scrollTo > 0);
    }
  };

  const handleClick = (item: RowItem) => {
    if (openDirectly && item.live_url) {
      window.open(item.live_url, '_blank', 'noreferrer');
    } else {
      onItemClick(item);
    }
  };

  return (
    <div className="px-4 md:px-12 py-6 relative group">
      <h2 className="text-white text-xl md:text-2xl font-bold mb-4">{title}</h2>
      
      <div className="relative">
        <div
          ref={rowRef}
          className="flex gap-2 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          onScroll={(e) => setShowLeft((e.target as HTMLDivElement).scrollLeft > 0)}
        >
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item)}
              className={`flex-none cursor-pointer transition-transform duration-300 hover:scale-105 relative rounded-md overflow-hidden bg-white/5 ${
                isLarge ? 'w-48 md:w-64 h-72 md:h-96' : 'w-40 md:w-60 h-24 md:h-36'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-opacity duration-300"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('dicebear')) {
                    target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(item.title)}&backgroundColor=e50914&fontFamily=Inter&bold=true`;
                    target.className = "w-full h-full object-contain p-6 bg-netflix-dark opacity-80";
                  }
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <p className="text-white font-bold text-sm">{item.title}</p>
                {item.description && <p className="text-gray-300 text-xs line-clamp-2">{item.description}</p>}
              </div>
            </div>
          ))}
        </div>

        {showLeft && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-0 bottom-4 w-12 bg-black/40 hover:bg-black/60 text-white flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}
        
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-0 bottom-4 w-12 bg-black/40 hover:bg-black/60 text-white flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
