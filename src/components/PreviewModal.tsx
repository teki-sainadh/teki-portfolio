import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Plus, ThumbsUp } from 'lucide-react';

interface Props {
  item: {
    id: string;
    title: string;
    image?: string;
    description?: string;
    live_url?: string;
  } | null;
  onClose: () => void;
}

export default function PreviewModal({ item, onClose }: Props) {
  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="relative w-full max-w-3xl bg-netflix-dark rounded-xl overflow-hidden shadow-2xl z-10"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="h-96 relative">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 md:left-12 flex flex-col gap-2">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">{item.title}</h2>
                <div className="flex gap-3 mt-4">
                  {item.live_url ? (
                    <a 
                      href={item.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white text-black px-8 py-2 rounded-md font-bold hover:bg-white/80 transition-colors"
                    >
                      <Play className="w-5 h-5 fill-black" />
                      Play
                    </a>
                  ) : (
                    <button className="flex items-center gap-2 bg-white text-black px-8 py-2 rounded-md font-bold hover:bg-white/80 transition-colors">
                      <Play className="w-5 h-5 fill-black" />
                      Play
                    </button>
                  )}
                  <button className="p-2 border border-white/50 rounded-full text-white hover:border-white transition-colors">
                    <Plus className="w-6 h-6" />
                  </button>
                  <button className="p-2 border border-white/50 rounded-full text-white hover:border-white transition-colors">
                    <ThumbsUp className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-2 text-green-500 font-bold text-sm">
                  <span>98% Match</span>
                  <span className="text-gray-400 border border-gray-400 px-1 text-[10px]">HD</span>
                </div>
                <p className="text-gray-200 text-lg">
                  {item.description || "Detailed project experience, technical challenges overcome, and the impact of the final solution."}
                </p>
              </div>
              
              <div className="space-y-2 text-sm text-gray-400">
                <p><span className="text-gray-500">Cast:</span> Teki Sainadh</p>
                <p><span className="text-gray-500">Genres:</span> AI, cloud, linux</p>
                <p><span className="text-gray-500">This show is:</span> Innovative, Binge-worthy, Scalable</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
