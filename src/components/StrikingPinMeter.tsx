import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Target, Zap, Award, AlertCircle } from 'lucide-react';

interface StrikingPinMeterProps {
  speedNumber: number; // 3 to 10
  onStrike: (isHit: boolean) => void;
  disabled: boolean;
  lastResult: {
    isHit: boolean;
    reward: number;
    text: string;
  } | null;
}

export const StrikingPinMeter: React.FC<StrikingPinMeterProps> = ({
  speedNumber,
  onStrike,
  disabled,
  lastResult
}) => {
  // Needle position in percentage: 0 to 100
  const [needlePos, setNeedlePos] = useState<number>(50);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const directionRef = useRef<number>(1); // 1 = right, -1 = left
  const positionRef = useRef<number>(50);

  // Target zone boundaries in percentage (Center 42% to 58%)
  const TARGET_MIN = 42;
  const TARGET_MAX = 58;

  // Calculate speed:
  // Speed number is 3 (fastest) to 10 (slowest).
  const calculateSpeed = useCallback((num: number) => {
    const factor = Math.max(3, Math.min(10, num));
    const baseSpeed = 260;
    const speedRatio = 1 - (factor - 3) * 0.108;
    return baseSpeed * speedRatio;
  }, []);

  // Animation loop
  useEffect(() => {
    if (disabled) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      return;
    }

    lastTimeRef.current = performance.now();

    const animate = (now: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      const speed = calculateSpeed(speedNumber);
      let newPos = positionRef.current + directionRef.current * speed * dt;

      if (newPos >= 100) {
        newPos = 100;
        directionRef.current = -1;
      } else if (newPos <= 0) {
        newPos = 0;
        directionRef.current = 1;
      }

      positionRef.current = newPos;
      setNeedlePos(newPos);

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [disabled, speedNumber, calculateSpeed]);

  const handleTriggerStrike = useCallback(() => {
    if (disabled) return;

    const currentPos = positionRef.current;
    const isHit = currentPos >= TARGET_MIN && currentPos <= TARGET_MAX;

    onStrike(isHit);
  }, [disabled, onStrike]);

  // Handle keyboard shortcut (Spacebar / Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleTriggerStrike();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTriggerStrike]);

  const isCurrentInTarget = needlePos >= TARGET_MIN && needlePos <= TARGET_MAX;

  return (
    <div
      id="striking-pin-container"
      className="relative w-full max-w-xl mx-auto bg-slate-950 p-3 sm:p-4 pixel-box-amber select-none"
    >
      {/* RETRO ARCADE MARQUEE HEADER */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-yellow-400 border border-black animate-ping" />
          <span className="font-pixel text-[10px] sm:text-xs text-yellow-400 uppercase tracking-wider flex items-center gap-1">
            <Target className="w-3.5 h-3.5" />
            STRIKING PIN METER
          </span>
        </div>

        {/* Speed Number Badge (Angka 3-10) */}
        <div
          id="pin-speed-status"
          className={`flex items-center gap-1 px-2 py-0.5 border-2 border-black font-pixel text-[9px] sm:text-[10px] shadow-[2px_2px_0_0_#000] ${
            speedNumber <= 4
              ? 'bg-red-500 text-white animate-pulse'
              : speedNumber <= 7
              ? 'bg-amber-400 text-black'
              : 'bg-emerald-500 text-white'
          }`}
        >
          <Zap className="w-3 h-3" />
          <span>SPEED: {speedNumber}</span>
          <span className="hidden sm:inline">
            {speedNumber <= 4 ? '«FAST»' : speedNumber <= 7 ? '«MED»' : '«SLOW»'}
          </span>
        </div>
      </div>

      {/* RETRO TRACK BAR */}
      <div className="relative my-2.5 bg-black p-2.5 border-2 border-amber-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
        {/* Pixel Tick Label Header */}
        <div className="flex justify-between mb-1.5 font-pixel text-[8px] sm:text-[9px] text-amber-300 select-none">
          <span className="text-red-400">MISS:1K</span>
          <span className="bg-yellow-400 text-black px-1 border border-black font-bold">
            ★ SASARAN 3K ★
          </span>
          <span className="text-red-400">MISS:1K</span>
        </div>

        {/* The Segmented Arcade Track */}
        <div className="relative h-12 w-full bg-slate-900 overflow-hidden border-2 border-black flex items-center">
          {/* Miss Left (0% - 42%) */}
          <div
            className="absolute left-0 top-0 bottom-0 bg-red-950/80 border-r-2 border-red-500 flex items-center justify-center"
            style={{ width: `${TARGET_MIN}%` }}
          >
            <div className="font-pixel text-[8px] text-red-400 hidden sm:block">
              +1.000
            </div>
          </div>

          {/* TARGET ZONE (42% - 58%) - Retro Gold Hit Zone */}
          <div
            id="target-zone"
            className="absolute top-0 bottom-0 bg-yellow-400 border-x-2 border-black flex flex-col items-center justify-center shadow-[0_0_15px_#facc15]"
            style={{ left: `${TARGET_MIN}%`, width: `${TARGET_MAX - TARGET_MIN}%` }}
          >
            <div className="font-pixel text-[10px] text-black font-bold animate-pulse leading-none">
              ★ 3K ★
            </div>
            <div className="font-pixel text-[7px] text-amber-950 font-bold uppercase mt-0.5">
              TARGET
            </div>
          </div>

          {/* Miss Right (58% - 100%) */}
          <div
            className="absolute right-0 top-0 bottom-0 bg-red-950/80 border-l-2 border-red-500 flex items-center justify-center"
            style={{ width: `${100 - TARGET_MAX}%` }}
          >
            <div className="font-pixel text-[8px] text-red-400 hidden sm:block">
              +1.000
            </div>
          </div>

          {/* Stepped Pixel Grid Lines inside Track */}
          <div className="absolute inset-0 flex justify-between pointer-events-none opacity-30">
            {Array.from({ length: 20 }).map((_, idx) => (
              <div key={idx} className="w-0.5 h-full bg-white" />
            ))}
          </div>

          {/* PIXEL STRIKING PIN NEEDLE (Retro Downward Arrow) */}
          <div
            id="striking-needle"
            className="absolute top-0 bottom-0 z-20 flex flex-col items-center pointer-events-none transition-transform will-change-transform"
            style={{
              left: `${needlePos}%`,
              transform: 'translateX(-50%)'
            }}
          >
            {/* Top Pixel Arrow Head */}
            <div
              className={`w-3.5 h-3.5 border-2 border-black rotate-45 ${
                isCurrentInTarget ? 'bg-yellow-300 shadow-[0_0_8px_#fde047]' : 'bg-red-500'
              }`}
            />
            {/* Needle Shaft */}
            <div
              className={`w-1.5 flex-1 border-x border-black ${
                isCurrentInTarget ? 'bg-yellow-300' : 'bg-red-500'
              }`}
            />
            {/* Bottom Pixel Pointer */}
            <div
              className={`w-2.5 h-2.5 border-2 border-black rotate-45 ${
                isCurrentInTarget ? 'bg-yellow-300' : 'bg-red-500'
              }`}
            />
          </div>
        </div>
      </div>

      {/* ACTION AREA: RETRO ARCADE PUSH BUTTON */}
      <div className="flex flex-col sm:flex-row items-center gap-2 mt-2">
        <button
          id="btn-strike-pin"
          type="button"
          onClick={handleTriggerStrike}
          disabled={disabled}
          className={`w-full flex-1 py-3.5 px-4 font-pixel text-xs sm:text-sm tracking-wider uppercase pixel-btn flex items-center justify-center gap-2.5 cursor-pointer ${
            disabled
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed border-slate-900 shadow-none'
              : isCurrentInTarget
              ? 'bg-yellow-400 hover:bg-yellow-300 text-black border-black shadow-[0_5px_0_0_#000]'
              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-black shadow-[0_5px_0_0_#000]'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>{disabled ? 'MENYIAPKAN TAHU...' : '[ PUSH ] TUSUK PIN!'}</span>
          <span className="text-[10px] bg-black text-white px-1.5 py-0.5 border border-white/40 hidden md:inline">
            [SPASI]
          </span>
        </button>
      </div>

      {/* FEEDBACK NOTICE */}
      {lastResult && (
        <div
          id="strike-feedback"
          className={`mt-2.5 py-1.5 px-2 text-center font-pixel text-[10px] sm:text-xs flex items-center justify-center gap-2 border-2 border-black shadow-[2px_2px_0_0_#000] animate-bounce ${
            lastResult.isHit
              ? 'bg-yellow-300 text-black'
              : 'bg-red-950 text-red-200'
          }`}
        >
          {lastResult.isHit ? (
            <>
              <Award className="w-4 h-4 text-amber-800" />
              <span>TEPAT SASARAN! TAHU SEMPURNA (+Rp 3.000)</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span>MELESET! TETAP GURIH (+Rp 1.000)</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};
