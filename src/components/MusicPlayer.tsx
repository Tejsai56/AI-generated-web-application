import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from 'lucide-react';
import { DUMMY_TRACKS } from '../constants';
import { MusicTrack } from '../types';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const handleBack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-sm p-0 bg-transparent flex flex-col gap-8 relative">
      <div className="flex flex-col space-y-4">
        <div className="text-[10px] uppercase tracking-widest text-neon-magenta font-bold">Current Transmission</div>
        <div className="w-full aspect-square bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#222] p-6 flex items-center justify-center relative group">
          {/* Pulsing Dash Ring */}
          <div className="absolute w-44 h-44 rounded-full border border-dashed border-neon-magenta/40 animate-spin-slow" />
          
          <motion.div 
            key={currentTrack.coverUrl}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10 w-32 h-32 rounded-full overflow-hidden border border-neon-magenta/20"
          >
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
            />
            {/* Center Core */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-8 h-8 bg-neon-magenta blur-xl opacity-40 animate-pulse" />
              <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
            </div>
          </motion.div>
        </div>

        <div className="mt-4 text-left">
          <motion.h2 
            key={currentTrack.title}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none"
          >
            {currentTrack.title}
          </motion.h2>
          <motion.p 
            key={currentTrack.artist}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#666] text-xs mt-1 font-mono uppercase tracking-widest"
          >
            AI // {currentTrack.artist}
          </motion.p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-8 justify-center">
          <button 
            onClick={handleBack}
            className="text-[#444] hover:text-white transition-colors"
          >
            <SkipBack size={28} fill="currentColor" />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-16 h-16 rounded-full border border-neon-magenta flex items-center justify-center text-neon-magenta shadow-[0_0_20px_rgba(255,0,255,0.2)] hover:bg-neon-magenta hover:text-black transition-all active:scale-95"
          >
            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
          </button>

          <button 
            onClick={handleNext}
            className="text-[#444] hover:text-white transition-colors"
          >
            <SkipForward size={28} fill="currentColor" />
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-[10px] uppercase font-bold text-[#444] tracking-widest font-mono">
            <span>{audioRef.current ? formatTime(audioRef.current.currentTime) : '0:00'}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="h-[2px] bg-[#222] w-full relative group cursor-pointer overflow-hidden">
            <motion.div 
              className="absolute h-full bg-neon-magenta shadow-[0_0_10px_#ff00ff]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
            />
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
      
      <div className="flex flex-col gap-1 mt-2">
        <div className="text-[10px] font-mono opacity-20 mb-1">DATA_CLUSTERS</div>
        <div className="flex gap-1">
          {DUMMY_TRACKS.map((track, i) => (
            <div 
              key={track.id}
              className={`h-6 flex-1 border ${i === currentTrackIndex ? 'border-neon-magenta bg-neon-magenta/10' : 'border-zinc-800 bg-zinc-900/50'} transition-all flex items-center justify-center`}
            >
               {i === currentTrackIndex && isPlaying && (
                 <div className="flex gap-0.5">
                   {[1,2,3].map(j => (
                     <motion.div 
                       key={j}
                       animate={{ scaleY: [0.5, 1, 0.4] }}
                       transition={{ repeat: Infinity, duration: 0.5 + Math.random(), ease: 'easeInOut' }}
                       className="w-0.5 h-3 bg-neon-magenta"
                     />
                   ))}
                 </div>
               )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
