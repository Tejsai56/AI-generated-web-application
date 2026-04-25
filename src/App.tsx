import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import GlitchOverlay from './components/GlitchOverlay';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="w-full h-screen bg-[#050505] text-[#e0e0e0] font-sans flex flex-col overflow-hidden relative border-[12px] border-[#0a0a0a] selection:bg-neon-magenta selection:text-black">
      <GlitchOverlay />
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-neon-magenta rounded-full blur-[150px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-neon-cyan rounded-full blur-[150px] opacity-10 pointer-events-none" />

      {/* Modern Header */}
      <header className="h-20 flex items-center justify-between px-10 border-b border-border-dim z-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-4"
        >
          <div className="w-4 h-4 bg-neon-magenta shadow-[0_0_15px_#ff00ff]" />
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">
            Sonic Serpent <span className="text-neon-cyan">v1.0</span>
          </h1>
        </motion.div>
        
        <div className="hidden md:flex space-x-12 text-[10px] font-bold tracking-[0.2em] uppercase text-[#666]">
          <span className="text-status-green flex items-center gap-2">
             <span className="w-1.5 h-1.5 bg-status-green rounded-full animate-pulse" />
             System Active
          </span>
          <span>Sync Mode: AI-Gen</span>
          <span className="text-neon-magenta opacity-60">60 FPS</span>
        </div>
      </header>

      {/* Dynamic Grid Layout */}
      <main className="flex-1 grid grid-cols-12 gap-8 p-10 z-10 overflow-hidden">
        
        {/* Left Section: Track Info */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-3 flex flex-col justify-between"
        >
          <MusicPlayer />
          
          <div className="mt-8 flex flex-col gap-2">
            <div className="text-[10px] uppercase tracking-widest text-neon-cyan font-bold mb-2">Up Next</div>
            {['CYBER PULSE', 'CHROME HEART', 'DATA STREAM'].map((track, i) => (
              <div key={i} className="flex items-center p-3 bg-surface/50 border-l-2 border-transparent hover:border-status-green hover:bg-surface transition-all cursor-pointer justify-between group">
                 <div className="flex items-center space-x-3">
                    <span className="text-[9px] text-[#444] font-mono">0{i+1}</span>
                    <span className="text-xs font-bold text-[#888] group-hover:text-white uppercase transition-colors">{track}</span>
                 </div>
                 <span className="text-[9px] text-[#444] font-mono">02:45</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Center Section: Game */}
        <section className="col-span-6 flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="relative p-2 border border-neon-cyan/40 bg-surface shadow-[0_0_50px_rgba(0,255,255,0.05)]">
              <SnakeGame />
              {/* Corner Decorations */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-neon-cyan/40" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-neon-cyan/40" />
            </div>
          </motion.div>
        </section>

        {/* Right Section: Terminal & Stats */}
        <motion.section 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-3 flex flex-col space-y-8 h-full"
        >
           <div className="flex-1 flex flex-col justify-end">
             <div className="p-8 border border-border-dim bg-surface relative overflow-hidden group">
               <div className="text-[10px] uppercase font-bold text-[#444] mb-4 tracking-[0.2em] flex items-center justify-between">
                 Terminal Logs
                 <span className="w-2 h-2 bg-status-green/20 rounded-full" />
               </div>
               <div className="font-mono text-[10px] space-y-1 text-status-green opacity-60">
                  <p>&gt; SNAKE_LOADED_SUCCESS</p>
                  <p>&gt; AUDIO_SYNC_VERIFIED</p>
                  <p>&gt; TICK_RATE_STABLE_60</p>
                  <p className="animate-pulse">&gt; PLAYER_LEVEL_INIT...</p>
                  <p className="mt-4 text-[#444] italic lowercase opacity-40">protocol: dark_wave_encrypt</p>
               </div>
               {/* Background Decorative SVG */}
               <div className="absolute bottom-[-10px] right-[-10px] opacity-5 -rotate-12 group-hover:rotate-0 transition-transform">
                  <div className="w-24 h-24 border-4 border-neon-magenta rounded-full" />
               </div>
             </div>
           </div>

           <footer className="pt-4 border-t border-border-dim grid grid-cols-2 gap-4 text-[9px] text-[#444] font-bold tracking-widest uppercase">
              <div className="flex flex-col gap-1">
                <span className="text-[#666]">Sector</span>
                <span>HUD_07_CORE</span>
              </div>
              <div className="flex flex-col gap-1 text-right">
                <span className="text-[#666]">Node</span>
                <span>AIS_DX_980</span>
              </div>
           </footer>
        </motion.section>
      </main>

      {/* App Footer */}
      <div className="h-12 border-t border-border-dim flex items-center justify-between px-10 text-[9px] text-[#444] font-bold tracking-widest uppercase z-20 bg-terminal-bg">
        <div>© 2026 NEON SYNTH INDUSTRIES</div>
        <div className="hidden md:block">PROTOCOL: DARK_WAVE_ENCRYPT</div>
        <div>LOC: SECTOR_07_HUD</div>
      </div>
    </div>
  );
}

