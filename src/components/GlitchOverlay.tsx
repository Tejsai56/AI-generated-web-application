import { motion } from 'motion/react';

export default function GlitchOverlay() {
  return (
    <>
      <div className="crt-noise pointer-events-none fixed inset-0 z-[100] opacity-[0.03]" />
      <div className="scanline pointer-events-none fixed inset-0 z-[101]" />
      
      {/* Random Screen Tearing Simulation */}
      <motion.div
        animate={{
          opacity: [0, 0.1, 0, 0.05, 0],
          translateX: [0, -10, 10, -5, 0],
          skew: [0, 2, -2, 1, 0]
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 5 + Math.random() * 10,
          ease: 'easeInOut'
        }}
        className="fixed inset-0 bg-neon-cyan/5 pointer-events-none z-[102]"
      />

      {/* Decorative Corners */}
      <div className="fixed top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-neon-cyan z-50 pointer-events-none opacity-40" />
      <div className="fixed top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-neon-magenta z-50 pointer-events-none opacity-40" />
      <div className="fixed bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-neon-magenta z-50 pointer-events-none opacity-40" />
      <div className="fixed bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-neon-cyan z-50 pointer-events-none opacity-40" />

      {/* Status Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-black/80 border-t border-neon-cyan/20 px-4 py-1 flex justify-between text-[10px] font-mono z-50">
        <div className="flex gap-4">
          <span className="text-neon-cyan/60">NODE_AIS_RUN://{Math.random().toString(36).substring(7).toUpperCase()}</span>
          <span className="animate-pulse text-green-500">SYSTEM_STABLE</span>
        </div>
        <div className="flex gap-4">
          <span className="opacity-40 uppercase">{new Date().toLocaleTimeString()}</span>
          <span className="text-neon-magenta/60">ENCRYPTION: AES-2048</span>
        </div>
      </div>
    </>
  );
}
