import React from 'react';
import { Clock, Trophy, Volume2, VolumeX, HelpCircle, Coins, Flame } from 'lucide-react';

interface HeaderBarProps {
  money: number;
  timeRemaining: number; // in seconds
  currentRound: number; // 1, 2, or 3
  highestInCycle: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenRules: () => void;
  onOpenHistory: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  money,
  timeRemaining,
  currentRound,
  highestInCycle,
  isMuted,
  onToggleMute,
  onOpenRules,
  onOpenHistory
}) => {
  // Format seconds to mm:ss
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const isTimeCritical = timeRemaining <= 20 && timeRemaining > 0;

  const formatRupiah = (val: number) => {
    return `Rp ${val.toLocaleString('id-ID')}`;
  };

  return (
    <header className="w-full max-w-4xl mx-auto mb-3 px-1 select-none">
      {/* RETRO ARCADE TOP BANNER */}
      <div className="flex items-center justify-between gap-2 py-2 px-3 bg-amber-200 pixel-box-amber">
        {/* Title & Brand */}
        <div className="flex items-center gap-2">
          {/* Pixel Tofu Cube Icon */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-yellow-400 border-2 border-black shadow-[2px_2px_0_0_#000] flex items-center justify-center pixelated">
            <svg width="20" height="20" viewBox="0 0 10 10" shapeRendering="crispEdges">
              <rect x="1" y="2" width="8" height="7" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
              <rect x="2" y="3" width="3" height="2" fill="#fef08a" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-pixel text-xs sm:text-base text-amber-950 tracking-tight">
                TAHU KOTAK
              </h1>
              <span className="font-pixel text-[8px] bg-black text-yellow-300 px-1 py-0.5 border border-yellow-400">
                PIXEL
              </span>
            </div>
            <p className="font-pixel-body text-[11px] text-amber-900 font-bold hidden sm:block">
              Digoreng dadakan di mobil bak!
            </p>
          </div>
        </div>

        {/* Tournament Round Indicator & Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Round Indicator */}
          <button
            id="tournament-round-badge"
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 bg-yellow-300 hover:bg-yellow-200 px-2 sm:px-2.5 py-1 pixel-btn cursor-pointer"
            title="Klik untuk melihat riwayat turnamen 3 ronde"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-950" />
            <span className="font-pixel text-[9px] sm:text-[10px] text-amber-950">
              RONDE {currentRound}/3
            </span>
          </button>

          {/* Rules Button */}
          <button
            id="btn-rules"
            onClick={onOpenRules}
            className="p-1.5 bg-amber-100 hover:bg-white pixel-btn cursor-pointer text-slate-950"
            title="Panduan Cara Bermain"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Sound Toggle Button */}
          <button
            id="btn-sound-toggle"
            onClick={onToggleMute}
            className={`p-1.5 pixel-btn cursor-pointer ${
              isMuted
                ? 'bg-rose-200 text-rose-900'
                : 'bg-emerald-200 text-emerald-950'
            }`}
            title={isMuted ? 'Aktifkan Suara 8-Bit' : 'Matikan Suara'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 8-BIT ARCADE STATUS HUD: SCORE / TIME / HI-SCORE */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-2">
        {/* 1UP: Money Earned */}
        <div
          id="hud-money"
          className="bg-slate-900 text-white p-2 sm:p-2.5 pixel-box-sm border-2 border-black"
        >
          <div className="font-pixel text-[8px] sm:text-[9px] text-emerald-400 flex items-center gap-1 uppercase">
            <Coins className="w-2.5 h-2.5 text-emerald-300" />
            <span>1UP SKOR</span>
          </div>
          <div className="font-pixel text-xs sm:text-sm text-yellow-300 mt-1 truncate">
            {formatRupiah(money)}
          </div>
        </div>

        {/* TIME: 90s Game Timer */}
        <div
          id="hud-timer"
          className={`p-2 sm:p-2.5 pixel-box-sm border-2 border-black transition-colors ${
            isTimeCritical
              ? 'bg-red-600 text-white animate-pulse'
              : 'bg-slate-900 text-white'
          }`}
        >
          <div className="font-pixel text-[8px] sm:text-[9px] text-sky-300 flex items-center gap-1 uppercase">
            <Clock className="w-2.5 h-2.5 text-sky-200" />
            <span>WAKTU</span>
          </div>
          <div className="font-pixel text-xs sm:text-sm text-white mt-1">
            {formattedTime}
          </div>
        </div>

        {/* HI-SCORE: Highest in 3 Rounds Cycle */}
        <div
          id="hud-highest-cycle"
          className="bg-slate-900 text-white p-2 sm:p-2.5 pixel-box-sm border-2 border-black"
        >
          <div className="font-pixel text-[8px] sm:text-[9px] text-amber-400 flex items-center gap-1 uppercase">
            <Trophy className="w-2.5 h-2.5 text-yellow-300" />
            <span>HI-SCORE</span>
          </div>
          <div className="font-pixel text-xs sm:text-sm text-yellow-200 mt-1 truncate">
            {formatRupiah(highestInCycle)}
          </div>
        </div>
      </div>
    </header>
  );
};
