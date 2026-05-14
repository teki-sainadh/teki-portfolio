import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { PLAYLIST } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

export default function MusicSection() {
  const [currentTrack, setCurrentTrack] = useState<typeof PLAYLIST[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync mute state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Handle Play/Pause logic
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    const audio = audioRef.current;
    if (isPlaying) {
      const playAudio = () => audio.play().catch(() => {});
      if (audio.readyState >= 2) {
        playAudio();
      } else {
        audio.addEventListener('canplay', playAudio, { once: true });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  const handleTrackSelect = (track: typeof PLAYLIST[0]) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handleError = () => {
    setIsPlaying(false);
  };

  return (
    <div className="px-4 md:px-12 py-12 bg-gradient-to-t from-black to-transparent scroll-mt-20" id="music">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-8 bg-netflix-red rounded-full" />
        <h2 className="text-white text-2xl md:text-3xl font-black tracking-tighter uppercase italic">My Mix</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PLAYLIST.map((track) => (
          <motion.div
            key={track.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleTrackSelect(track)}
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer border border-white/5 transition-all duration-300 ${
              currentTrack?.id === track.id
                ? 'bg-neutral-800 ring-1 ring-netflix-red/40 shadow-lg shadow-netflix-red/10'
                : 'bg-neutral-900/50 hover:bg-neutral-800'
            }`}
          >
            <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0 shadow-xl group">
              <img
                src={track.image}
                alt={track.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${currentTrack?.id === track.id && isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                {currentTrack?.id === track.id && isPlaying ? (
                  <Pause className="w-6 h-6 text-white fill-white" />
                ) : (
                  <Play className="w-6 h-6 text-white fill-white ml-1" />
                )}
              </div>

              {currentTrack?.id === track.id && isPlaying && (
                <div className="absolute bottom-1 right-1 flex gap-0.5 items-end h-2.5">
                  <motion.div animate={{ height: [2, 10, 5, 10, 2] }} transition={{ repeat: Infinity, duration: 1 }} className="w-0.5 bg-netflix-red" />
                  <motion.div animate={{ height: [10, 2, 10, 5, 10] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-0.5 bg-netflix-red" />
                  <motion.div animate={{ height: [5, 10, 2, 10, 5] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-0.5 bg-netflix-red" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold truncate tracking-tight">{track.title}</h3>
              <p className="text-neutral-500 text-sm truncate">{track.artist}</p>
            </div>

            <div className="text-neutral-600 hover:text-white transition-colors pr-2">
              <Play className={`w-4 h-4 ${currentTrack?.id === track.id && isPlaying ? 'text-netflix-red fill-netflix-red' : ''}`} />
            </div>
          </motion.div>
        ))}
      </div>

      <audio
        ref={audioRef}
        src={currentTrack?.url}
        loop
        onCanPlay={() => {
          if (isPlaying) audioRef.current?.play().catch(() => {});
        }}
        onError={handleError}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <AnimatePresence>
        {currentTrack && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-24 right-4 md:right-12 z-50 bg-neutral-900/90 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-2xl flex items-center gap-4 w-[300px]"
          >
            <div className="w-12 h-12 flex-none rounded-lg overflow-hidden shadow-lg shadow-black/50">
              <img src={currentTrack.image} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-black uppercase tracking-wider truncate">{currentTrack.title}</p>
              <p className="text-neutral-500 text-[10px] truncate">{currentTrack.artist}</p>
            </div>
            <div className="flex items-center gap-3 pr-1">
              <button
                onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow-lg hover:scale-105 active:scale-95 transition-transform"
              >
                {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" className="ml-0.5" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
