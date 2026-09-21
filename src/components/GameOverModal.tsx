import React, { useState } from 'react';
import { Trophy, RotateCcw, Play, CheckCircle2, AlertCircle, Coins, Award } from 'lucide-react';
import { GameScoreRecord, TournamentCycle } from '../types';

interface GameOverModalProps {
  currentRecord: GameScoreRecord;
  tournament: TournamentCycle;
  onContinueNextRound: (playerName: string) => void;
  onResetAndStartNewCycle: (playerName: string) => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  currentRecord,
  tournament,
  onContinueNextRound,
  onResetAndStartNewCycle
}) => {
  const [playerName, setPlayerName] = useState(currentRecord.playerName || 'Juragan Tahu');
  const isRoundThree = currentRecord.roundNumber >= 3;

  const formatRupiah = (val: number) => {
    return `Rp ${val.toLocaleString('id-ID')}`;
  };

  const accuracy =
    currentRecord.totalCustomersServed > 0
      ? Math.round((currentRecord.perfectHits / currentRecord.totalCustomersServed) * 100)
      : 0;

  // Calculate highest score in all 3 rounds
  const allRounds = [...tournament.rounds];
  const existingIdx = allRounds.findIndex((r) => r.roundNumber === currentRecord.roundNumber);
  if (existingIdx >= 0) {
    allRounds[existingIdx] = currentRecord;
  } else {
    allRounds.push(currentRecord);
  }

  const highestScore = Math.max(...allRounds.map((r) => r.moneyEarned), currentRecord.moneyEarned);

  return (
    <div
      id="game-over-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 select-none"
    >
      <div className="relative w-full max-w-lg bg-amber-100 p-5 sm:p-6 pixel-box-amber text-slate-900">
        {/* Modal Header */}
        <div className="text-center relative z-10 mb-4">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-yellow-400 border-2 border-black shadow-[2px_2px_0_0_#000] mb-2">
            {isRoundThree ? (
              <Trophy className="w-8 h-8 text-black animate-bounce" />
            ) : (
              <span className="text-2xl">⏱️</span>
            )}
          </div>

          <h2 className="font-pixel text-sm sm:text-base text-amber-950 tracking-tight leading-snug">
            {isRoundThree ? 'TURNAMEN 3 RONDE SELESAI!' : 'WAKTU 90 DETIK HABIS!'}
          </h2>
          <p className="font-pixel-body text-xs sm:text-sm font-bold text-amber-900 mt-1">
            {isRoundThree
              ? 'Telah menyelesaikan 3 ronde! Rekap hasil perolehan uang:'
              : `Hasil Pengumpulan Uang Ronde ${currentRecord.roundNumber} dari 3`}
          </p>
        </div>

        {/* Current Round Money Score Card */}
        <div className="bg-yellow-400 text-black p-3 sm:p-4 border-2 border-black shadow-[3px_3px_0_0_#000] text-center mb-3">
          <div className="font-pixel text-[9px] uppercase tracking-wider text-amber-950 flex items-center justify-center gap-1">
            <Coins className="w-3.5 h-3.5 text-amber-950" />
            <span>TOTAL SKOR RONDE INI</span>
          </div>
          <div className="font-pixel text-xl sm:text-2xl font-bold tracking-tight text-black mt-1">
            {formatRupiah(currentRecord.moneyEarned)}
          </div>
        </div>

        {/* Performance Breakdown: Hits, Misses, Accuracy */}
        <div className="grid grid-cols-3 gap-2 text-center mb-3">
          <div className="bg-white p-2 border-2 border-black shadow-[2px_2px_0_0_#000]">
            <div className="flex items-center justify-center gap-1 text-emerald-800 font-bold mb-0.5">
              <CheckCircle2 className="w-3 h-3" />
              <span className="font-pixel text-[8px]">TEPAT</span>
            </div>
            <div className="font-pixel text-sm text-slate-900">{currentRecord.perfectHits}x</div>
            <div className="font-pixel text-[7px] text-slate-500">(@3.000)</div>
          </div>

          <div className="bg-white p-2 border-2 border-black shadow-[2px_2px_0_0_#000]">
            <div className="flex items-center justify-center gap-1 text-amber-800 font-bold mb-0.5">
              <AlertCircle className="w-3 h-3" />
              <span className="font-pixel text-[8px]">MELESET</span>
            </div>
            <div className="font-pixel text-sm text-slate-900">{currentRecord.missHits}x</div>
            <div className="font-pixel text-[7px] text-slate-500">(@1.000)</div>
          </div>

          <div className="bg-white p-2 border-2 border-black shadow-[2px_2px_0_0_#000]">
            <div className="flex items-center justify-center gap-1 text-blue-800 font-bold mb-0.5">
              <Award className="w-3 h-3" />
              <span className="font-pixel text-[8px]">AKURASI</span>
            </div>
            <div className="font-pixel text-sm text-slate-900">{accuracy}%</div>
            <div className="font-pixel text-[7px] text-slate-500">{currentRecord.totalCustomersServed} Org</div>
          </div>
        </div>

        {/* Player Name Input */}
        <div className="bg-white p-2.5 border-2 border-black shadow-[2px_2px_0_0_#000] mb-3">
          <label className="block font-pixel text-[9px] text-amber-950 mb-1">
            NAMA JURAGAN TAHU:
          </label>
          <input
            type="text"
            id="player-name-input"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            maxLength={25}
            className="w-full px-2 py-1 border-2 border-black font-pixel text-xs bg-amber-50 focus:outline-none focus:bg-yellow-100"
            placeholder="Ketik nama Anda..."
          />
        </div>

        {/* Tournament 3-Round Summary & Reset Logic */}
        {isRoundThree ? (
          <div className="bg-amber-200 p-3 border-2 border-black shadow-[2px_2px_0_0_#000] mb-3 text-xs">
            <div className="flex items-center justify-between font-pixel text-[9px] text-amber-950 mb-2 border-b border-black pb-1">
              <span className="flex items-center gap-1">
                <Trophy className="w-3 h-3 text-amber-900" />
                REKAP 3 RONDE
              </span>
              <span className="bg-black text-white px-1 py-0.5">SELESAI</span>
            </div>

            <div className="space-y-1">
              {[1, 2, 3].map((rNum) => {
                const roundData = allRounds.find((r) => r.roundNumber === rNum);
                const score = roundData ? roundData.moneyEarned : 0;
                const isBest = score === highestScore && score > 0;
                return (
                  <div
                    key={rNum}
                    className={`flex items-center justify-between p-1 px-2 border ${
                      isBest ? 'bg-yellow-300 border-black font-bold' : 'bg-white border-black/40'
                    }`}
                  >
                    <span className="font-pixel text-[9px]">
                      RONDE {rNum} {isBest ? '👑 BEST' : ''}
                    </span>
                    <span className="font-pixel text-[9px]">{formatRupiah(score)}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-2 p-1.5 bg-yellow-300 border-2 border-black text-[11px] font-pixel-body font-bold text-amber-950 flex items-start gap-1">
              <RotateCcw className="w-3.5 h-3.5 text-amber-900 shrink-0 mt-0.5" />
              <span>
                <strong>Aturan Turnamen:</strong> Setelah 3 kali bermain, rekor uang terbanyak akan
                <strong> di-reset kembali ke 0</strong> untuk ronde turnamen berikutnya!
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-amber-200 p-2.5 border-2 border-black shadow-[2px_2px_0_0_#000] mb-3 flex items-center justify-between">
            <div>
              <span className="font-pixel text-[8px] text-amber-950 block">STATUS TURNAMEN:</span>
              <span className="font-pixel-body text-xs text-amber-900 font-bold">
                Baru menyelesaikan <strong>Ronde {currentRecord.roundNumber}</strong> dari 3 ronde.
              </span>
            </div>
            <span className="px-2 py-1 bg-yellow-400 text-black font-pixel text-[9px] border border-black">
              R{currentRecord.roundNumber + 1} SIAP
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          {isRoundThree ? (
            <button
              id="btn-reset-and-start-new-cycle"
              type="button"
              onClick={() => onResetAndStartNewCycle(playerName)}
              className="w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-300 text-black font-pixel text-xs tracking-wider pixel-btn flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RESET REKOR & MULAI BARU</span>
            </button>
          ) : (
            <button
              id="btn-continue-next-round"
              type="button"
              onClick={() => onContinueNextRound(playerName)}
              className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-white font-pixel text-xs tracking-wider pixel-btn flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>LANJUT KE RONDE {currentRecord.roundNumber + 1} DARI 3</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
