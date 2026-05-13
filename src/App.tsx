/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import NetflixTitle from './components/NetflixTitle';
import Browse from './pages/Browse';
import Home from './pages/Home';
import AMABot from './components/AMABot';
import { Persona } from './types';
import { MessageSquare } from 'lucide-react';

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [isAMABotOpen, setIsAMABotOpen] = useState(false);

  // No persistence to ensure intro plays on refresh
  useEffect(() => {
    // We intentionally do not load from localStorage here
  }, []);

  const handlePersonaSelect = (persona: Persona) => {
    setSelectedPersona(persona);
    // Optional: remove localStorage if you don't want it stored at all
    // localStorage.setItem('selectedPersona', JSON.stringify(persona));
  };

  const handleSwitchProfile = () => {
    setSelectedPersona(null);
    // localStorage.removeItem('selectedPersona');
  };

  if (!introFinished) {
    return <NetflixTitle onComplete={() => setIntroFinished(true)} />;
  }

  if (!selectedPersona) {
    return <Browse onSelect={handlePersonaSelect} />;
  }

  return (
    <>
      <Home persona={selectedPersona} onSwitchProfile={handleSwitchProfile} />
      
      {/* Floating Chat Trigger */}
      <button
        onClick={() => setIsAMABotOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-netflix-red p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center text-white group"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-bold uppercase text-xs tracking-widest whitespace-nowrap">
          Ask AI
        </span>
      </button>

      <AMABot 
        isOpen={isAMABotOpen} 
        onClose={() => setIsAMABotOpen(false)} 
      />
    </>
  );
}

