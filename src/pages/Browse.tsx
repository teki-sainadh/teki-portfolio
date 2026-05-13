import React from 'react';
import { motion } from 'motion/react';
import { PERSONAS } from '../constants';
import { Persona } from '../types';

interface Props {
  onSelect: (persona: Persona) => void;
}

const CLICK_SOUND_URL = 'https://www.soundjay.com/buttons/button-16.mp3';

export default function Browse({ onSelect }: Props) {
  const handleSelect = (persona: Persona) => {
    const audio = new Audio(CLICK_SOUND_URL);
    audio.play().catch(() => {});
    onSelect(persona);
  };

  return (
    <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center p-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-white text-3xl md:text-6xl font-medium mb-12"
      >
        Who's watching?
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-5xl">
        {PERSONAS.map((persona, index) => (
          <motion.div
            key={persona.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onClick={() => handleSelect(persona)}
            className="group cursor-pointer flex flex-col items-center w-32 md:w-44"
          >
            <div className="w-full aspect-square rounded overflow-hidden border-[3px] border-transparent group-hover:border-white transition-all duration-200 relative mb-4">
              <img
                src={persona.avatar}
                alt={persona.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            </div>
            <span className="text-gray-500 group-hover:text-white text-base md:text-xl font-normal transition-colors text-center">
              {persona.name}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-20 px-6 py-2 border border-gray-600 text-gray-600 hover:border-gray-400 hover:text-gray-400 uppercase tracking-[0.2em] text-sm md:text-lg transition-all"
      >
        Manage Profiles
      </motion.button>
    </div>
  );
}
