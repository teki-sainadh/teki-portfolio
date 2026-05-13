import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Banner, Row } from '../components/HomeComponents';
import MusicSection from '../components/MusicSection';
import PreviewModal from '../components/PreviewModal';
import { PROFILE_BANNER, PROJECTS, SKILLS, TIMELINE, CONTACT } from '../constants';
import { Persona } from '../types';
import { Github, Mail, Phone, ExternalLink } from 'lucide-react';

interface Props {
  persona: Persona;
  onSwitchProfile: () => void;
}

export default function Home({ persona, onSwitchProfile }: Props) {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  // Group projects by category for rows
  const categories = Array.from(new Set(PROJECTS.map(p => p.category)));
  
  return (
    <div className="bg-netflix-black min-h-screen relative">
      {/* Persona specific background GIF */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url(${persona.backgroundGif})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="relative z-10 w-full h-full">
        <Navbar persona={persona} onSwitchProfile={onSwitchProfile} />
        
        <Banner banner={PROFILE_BANNER} />

      <main className="-mt-20 relative z-10">
        {/* Dynamic Rows based on Persona or curated list */}
        <Row 
          title="Continue Watching (Timeline)" 
          onItemClick={setSelectedItem}
          items={TIMELINE.map(t => ({
            id: t.id,
            title: t.name,
            image: t.image || `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=225&fit=crop`,
            description: t.title,
            live_url: t.live_url
          }))} 
        />

        {categories.map(cat => (
          <Row 
            key={cat}
            title={cat}
            onItemClick={setSelectedItem}
            items={PROJECTS.filter(p => p.category === cat).map(p => ({
              id: p.id,
              title: p.title,
              image: p.image,
              description: p.description,
              live_url: p.live_url
            }))}
            isLarge={cat === 'Binge-Worthy AI'}
          />
        ))}

        <Row 
          title="Trending Skills" 
          onItemClick={setSelectedItem}
          items={SKILLS.map(s => ({
            id: s.id,
            title: s.name,
            image: `https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop`,
            description: s.description
          }))} 
        />

        <MusicSection />

        <section className="px-4 md:px-12 mt-20 mb-10">
          <h2 className="text-white text-xl md:text-2xl font-bold mb-6">Contact Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a 
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all group"
            >
              <div className="p-3 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                <Github className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-gray-400 text-sm">GitHub</p>
                <p className="text-white font-medium">teki-sainadh</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500" />
            </a>

            <a 
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-4 bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all group"
            >
              <div className="p-3 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white font-medium">{CONTACT.email}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500" />
            </a>

            <a 
              href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-4 bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all group"
            >
              <div className="p-3 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-gray-400 text-sm">Phone</p>
                <p className="text-white font-medium">{CONTACT.phone}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500" />
            </a>
          </div>
        </section>

        <div className="pb-20" />
      </main>

      <PreviewModal item={selectedItem} onClose={() => setSelectedItem(null)} />

      {/* Footer */}
      <footer className="bg-netflix-black border-t border-gray-800 py-12 px-4 overflow-hidden">
        <div className="relative flex whitespace-nowrap">
          <div className="animate-marquee inline-block text-4xl md:text-6xl font-black text-white tracking-tighter uppercase pr-10">
            DESIGNED BY SAINADH AND MADE WITH AI STUDIO • DESIGNED BY SAINADH AND MADE WITH AI STUDIO • DESIGNED BY SAINADH AND MADE WITH AI STUDIO •
          </div>
          <div className="animate-marquee2 absolute top-0 inline-block text-4xl md:text-6xl font-black text-white tracking-tighter uppercase pr-10">
            DESIGNED BY SAINADH AND MADE WITH AI STUDIO • DESIGNED BY SAINADH AND MADE WITH AI STUDIO • DESIGNED BY SAINADH AND MADE WITH AI STUDIO •
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
