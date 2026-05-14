import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  onComplete: () => void;
}

const NETFLIX_INTRO_SOUND = 'https://raw.githubusercontent.com/Advay1212/netflix-portfolio-advay/main/src/netflix-sound.mp3';

export default function NetflixTitle({ onComplete }: Props) {
  const [isClicked, setIsClicked] = useState(false);
  const [show, setShow] = useState(true);

  const handleStart = () => {
    if (isClicked) return;
    setIsClicked(true);
    const audio = new Audio(NETFLIX_INTRO_SOUND);
    audio.play().catch(e => console.error("Audio play failed:", e));
  };

  useEffect(() => {
    if (!isClicked) return;

    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 1000); 
    }, 4000);

    return () => clearTimeout(timer);
  }, [isClicked, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden cursor-pointer"
          onClick={handleStart}
        >
          {/* Hint to click if not yet started */}
          {!isClicked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500 uppercase tracking-[0.5em] text-xs md:text-sm animate-pulse z-20"
            >
              Click to Start
            </motion.div>
          )}

          {/* Animation Stage */}
          <div className={`relative transition-all duration-1000 ${isClicked ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
            <motion.h1
              initial={false}
              animate={isClicked ? { scale: 1, opacity: 1, filter: 'blur(0px)' } : { scale: 3, opacity: 0, filter: 'blur(20px)' }}
              transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-netflix-red text-7xl md:text-[10rem] font-black tracking-tighter text-shadow-netflix uppercase"
              style={{ fontFamily: 'var(--font-sans)', fontStyle: 'normal' }}
            >
              SAINADH
            </motion.h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={isClicked ? { width: '100%' } : { width: 0 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="h-1.5 md:h-2 bg-netflix-red mt-4 shadow-[0_0_20px_rgba(229,9,20,0.8)]"
            />
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={isClicked ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-8 text-gray-400 font-medium tracking-widest text-[10px] md:text-xs uppercase"
          >
            Cloud AI & Networking Engineer
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
