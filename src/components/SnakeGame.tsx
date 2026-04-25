import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Point, Direction } from '../types';
import { GRID_SIZE, INITIAL_SPEED } from '../constants';

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const gameLoopRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);
  const speedRef = useRef(INITIAL_SPEED);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      const collision = currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!collision) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection('RIGHT');
    setIsGameOver(false);
    setScore(0);
    speedRef.current = INITIAL_SPEED;
  };

  const moveSnake = useCallback(() => {
    if (isGameOver) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = { ...head };

      switch (direction) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      // Wall collision
      if (
        newHead.x < 0 || newHead.x >= GRID_SIZE ||
        newHead.y < 0 || newHead.y >= GRID_SIZE
      ) {
        setIsGameOver(true);
        return prevSnake;
      }

      // Self collision
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood(newSnake));
        speedRef.current = Math.max(80, speedRef.current - 2); // Slow increase in speed
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
        case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
        case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
        case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  const update = useCallback((time: number) => {
    if (time - lastUpdateRef.current > speedRef.current) {
      moveSnake();
      lastUpdateRef.current = time;
    }
    gameLoopRef.current = requestAnimationFrame(update);
  }, [moveSnake]);

  useEffect(() => {
    gameLoopRef.current = requestAnimationFrame(update);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [update]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  return (
    <div className="relative flex flex-col items-center gap-4 p-8 border border-neon-cyan/20 bg-surface/80 backdrop-blur-sm">
      <div className="absolute -top-3 left-4 bg-terminal-bg px-2 text-[10px] uppercase font-bold tracking-widest text-[#666]">
        GRID_SYNC_v1.0
      </div>

      <div className="flex justify-between w-full font-mono text-xs px-4 mb-2">
        <div className="flex flex-col">
          <span className="text-[#666] tracking-widest uppercase text-[10px] mb-1">Current Score</span>
          <span className="text-3xl font-black text-white italic tracking-tighter">
            {score.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[#666] tracking-widest uppercase text-[10px] mb-1">Global High</span>
          <span className="text-3xl font-black text-neon-cyan italic tracking-tighter opacity-80">
            {highScore.toLocaleString()}
          </span>
        </div>
      </div>

      <div 
        className="relative border border-border-dim shadow-[0_0_40px_rgba(0,255,255,0.05)] bg-surface"
        style={{ 
          width: '400px', 
          height: '400px',
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {/* Snake Rendering */}
        {snake.map((segment, i) => (
          <motion.div
            key={`${segment.x}-${segment.y}-${i}`}
            layout
            className={`w-[19px] h-[19px] rounded-sm ${i === 0 ? 'bg-status-green shadow-[0_0_15px_#39ff14]' : 'bg-status-green opacity-70'}`}
            style={{
              gridColumnStart: segment.x + 1,
              gridRowStart: segment.y + 1
            }}
          />
        ))}

        {/* Food Rendering */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-[19px] h-[19px] bg-accent-red rounded-full shadow-[0_0_20px_#ff0055]"
          style={{
            gridColumnStart: food.x + 1,
            gridRowStart: food.y + 1
          }}
        />

        {/* Game Over Overlay */}
        <AnimatePresence>
          {isGameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20 backdrop-blur-md"
            >
              <h2 className="text-4xl font-mono glitch-text mb-4" data-text="SYSTEM_FAILURE">SYSTEM_FAILURE</h2>
              <p className="text-neon-magenta text-sm mb-8 font-mono animate-pulse">CONNECTION LOST _ REBOOT REQUIRED</p>
              <button
                onClick={resetGame}
                className="px-8 py-2 border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black transition-colors font-mono tracking-widest"
              >
                RESTORE_SESSION
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full h-1 bg-neon-cyan/20 relative overflow-hidden">
        <motion.div 
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 w-1/3 bg-neon-cyan h-full shadow-[0_0_10px_rgba(0,255,255,1)]"
        />
      </div>
      
      <div className="flex gap-4 text-[10px] opacity-40 font-mono italic">
        <span>GRID_SYNC: ACTIVE</span>
        <span>|</span>
        <span>BUFFER_SPOOL: 98%</span>
        <span>|</span>
        <span>LATENCY: 12ms</span>
      </div>
    </div>
  );
}
