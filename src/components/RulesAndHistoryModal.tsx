import React, { useState } from 'react';
import { X, HelpCircle, Trophy, Target, Zap, Clock, RotateCcw } from 'lucide-react';
import { TournamentCycle, GameScoreRecord } from '../types';

interface RulesAndHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  tournament: TournamentCycle;
  hallOfFame: Array<{
    id: string;
    championName: string;
    highestScore: number;
    completedAt: string;
  }>;
}

export const RulesAndHistoryModal: React.FC<RulesAndHistoryModalProps> = ({
  isOpen,
  onClose,
  tournament,
  hallOfFame
}) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'tournament'>('rules');

  if (!isOpen) return null;

  const formatRupiah = (val: number) => {
    return `Rp ${val.toLocaleString('id-ID')}`;
  };

  return (
    <div
      id="rules-history-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 select-none"
    >
      <div className="relative w-full max-w-lg bg-amber-100 p-4 sm:p-5 pixel-box-amber max-h-[90vh] overflow-y-auto text-slate-900">
        {/* Pixel Close Button */}
        <button
          id="btn-close-modal"
          onClick={onClose}
          className="absolute top-3 right-3 p-1 bg-red-500 hover:bg-red-400 text-white pixel-btn cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b-2 border-black pb-3 mb-3 pr-8">
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-2.5 py-1.5 font-pixel text-[10px] sm:text-xs flex items-center gap-1.5 cursor-pointer pixel-btn ${
              activeTab === 'rules'
                ? 'bg-yellow-400 text-black'
                : 'bg-amber-200 text-amber-950'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>ATURAN MAIN</span>
          </button>

          <button
            onClick={() => setActiveTab('tournament')}
            className={`px-2.5 py-1.5 font-pixel text-[10px] sm:text-xs flex items-center gap-1.5 cursor-pointer pixel-btn ${
              activeTab === 'tournament'
                ? 'bg-yellow-400 text-black'
                : 'bg-amber-200 text-amber-950'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>TURNAMEN 3R</span>
          </button>
        </div>

        {/* Content based on Tab */}
        {activeTab === 'rules' ? (
          <div className="space-y-3 text-xs leading-relaxed font-pixel-body">
            {/* Rule 1: Tahu Kotak Visual & Theme */}
            <div className="bg-amber-50 p-2.5 border-2 border-black shadow-[2px_2px_0_0_#000]">
              <div className="font-pixel text-[10px] text-amber-950 flex items-center gap-1.5 mb-1">
                <span>🟨</span>
                <span>TAHU KOTAK PIXEL (BUKAN TAHU BULAT!)</span>
              </div>
              <p>
                Tahunya berbentuk <strong>KOTAK</strong> renyah dan gurih dengan cabai rawit hijau,
                digoreng dadakan di mobil bak retro dengan speaker toa yang khas.
              </p>
            </div>

            {/* Rule 2: Striking Pin & Dynamic Speed (3-10) */}
            <div className="bg-amber-50 p-2.5 border-2 border-black shadow-[2px_2px_0_0_#000]">
              <div className="font-pixel text-[10px] text-amber-950 flex items-center gap-1.5 mb-1">
                <Zap className="w-3.5 h-3.5 text-amber-700" />
                <span>MEKANISME JARUM PIN & SPEED (3 - 10)</span>
              </div>
              <p>
                Pelanggan datang <strong>satu per satu</strong>. Di atas kepala pelanggan terdapat{' '}
                <strong>angka 3 sampai 10</strong>:
              </p>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                <li>
                  <strong>Angka 3 - 4:</strong> Jarum striking pin bergerak{' '}
                  <span className="text-red-700 font-bold">sangat cepat</span>! Butuh refleks kilat!
                </li>
                <li>
                  <strong>Angka 8 - 10:</strong> Jarum pin bergerak{' '}
                  <span className="text-emerald-800 font-bold">santai / lambat</span> dan mudah dibidik.
                </li>
              </ul>
            </div>

            {/* Rule 3: Hit Rewards (3000 vs 1000) */}
            <div className="bg-amber-50 p-2.5 border-2 border-black shadow-[2px_2px_0_0_#000]">
              <div className="font-pixel text-[10px] text-amber-950 flex items-center gap-1.5 mb-1">
                <Target className="w-3.5 h-3.5 text-emerald-700" />
                <span>SKOR & HADIAH UANG</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div className="bg-yellow-300 p-2 border border-black text-center">
                  <div className="font-pixel text-[8px] text-amber-950">TEPAT SASARAN</div>
                  <div className="font-pixel text-xs text-black font-bold mt-0.5">+Rp 3.000</div>
                  <div className="text-[10px] text-slate-800">Tahu kotak sempurna</div>
                </div>
                <div className="bg-amber-200 p-2 border border-black text-center">
                  <div className="font-pixel text-[8px] text-amber-950">MELESET (MISS)</div>
                  <div className="font-pixel text-xs text-red-900 font-bold mt-0.5">+Rp 1.000</div>
                  <div className="text-[10px] text-slate-800">Tetap gurih laku</div>
                </div>
              </div>
            </div>

            {/* Rule 4: 90 Seconds Limit & 3 Rounds Cycle */}
            <div className="bg-amber-50 p-2.5 border-2 border-black shadow-[2px_2px_0_0_#000]">
              <div className="font-pixel text-[10px] text-amber-950 flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-blue-700" />
                <span>WAKTU 90 DETIK & RESET 3 RONDE</span>
              </div>
              <p>
                Setiap ronde permainan berdurasi <strong>90 detik</strong>.
              </p>
              <div className="mt-1.5 p-1.5 bg-yellow-200 border border-black text-[11px] font-bold text-amber-950 flex items-start gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-amber-900 shrink-0 mt-0.5" />
                <span>
                  <strong>Aturan Reset Khusus:</strong> Setelah <strong>3 kali bermain</strong> selesai,
                  rekor pengumpulan uang terbanyak akan <strong>direset kembali ke 0</strong> untuk memulai
                  turnamen baru!
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-xs font-pixel-body">
            {/* Current 3-Round Tournament Status */}
            <div className="bg-amber-50 p-2.5 border-2 border-black shadow-[2px_2px_0_0_#000]">
              <div className="flex items-center justify-between font-pixel text-[9px] text-amber-950 mb-2">
                <span>STATUS TURNAMEN SAAT INI</span>
                <span className="bg-black text-yellow-300 px-1.5 py-0.5">
                  RONDE {tournament.currentRound}/3
                </span>
              </div>

              <div className="space-y-1.5 mt-1">
                {[1, 2, 3].map((rNum) => {
                  const record = tournament.rounds.find((r: GameScoreRecord) => r.roundNumber === rNum);
                  return (
                    <div
                      key={rNum}
                      className={`flex items-center justify-between p-1.5 border ${
                        record
                          ? 'bg-yellow-300 border-black font-bold text-black'
                          : 'bg-white/60 border-black/30 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-pixel text-[9px]">
                        <span className="w-4 h-4 bg-black text-white flex items-center justify-center">
                          {rNum}
                        </span>
                        <span>
                          RONDE {rNum} {rNum === tournament.currentRound && !record ? '(AKTIF)' : ''}
                        </span>
                      </div>
                      <span className="font-pixel text-[9px]">
                        {record ? formatRupiah(record.moneyEarned) : '---'}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-2 pt-1.5 border-t border-black flex items-center justify-between font-pixel text-[9px] text-amber-950">
                <span>REKOR TERBANYAK SIKLUS:</span>
                <span className="text-emerald-800 font-bold">
                  {formatRupiah(tournament.highestScoreInCycle)}
                </span>
              </div>
            </div>

            {/* Hall of Fame */}
            <div className="bg-white p-2.5 border-2 border-black shadow-[2px_2px_0_0_#000]">
              <div className="font-pixel text-[9px] text-black mb-2 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-yellow-600" />
                <span>PAPAN JUARA TURNAMEN SEBELUMNYA</span>
              </div>
              {hallOfFame.length === 0 ? (
                <div className="text-center py-3 text-slate-500 italic">
                  Belum ada turnamen selesai. Selesaikan 3 ronde!
                </div>
              ) : (
                <div className="space-y-1 max-h-36 overflow-y-auto">
                  {hallOfFame.map((champ, index) => (
                    <div
                      key={champ.id}
                      className="flex items-center justify-between p-1 px-2 bg-amber-50 border border-black/40"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="font-pixel text-[8px] text-amber-900">#{index + 1}</span>
                        <span className="font-bold text-slate-900">{champ.championName}</span>
                      </div>
                      <div className="font-pixel text-[9px] text-amber-950">
                        {formatRupiah(champ.highestScore)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal Close Footer */}
        <div className="mt-3 pt-2 border-t-2 border-black flex justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-black font-pixel text-[10px] pixel-btn cursor-pointer"
          >
            TUTUP & MAIN
          </button>
        </div>
      </div>
    </div>
  );
};
