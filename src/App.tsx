import { useState, useEffect, useRef, useCallback } from 'react';
import { Customer, GameScoreRecord, TournamentCycle, GameStatus } from './types';
import { generateRandomCustomer } from './utils/customerData';
import { soundManager } from './utils/audio';
import { HeaderBar } from './components/HeaderBar';
import { TruckScene } from './components/TruckScene';
import { StrikingPinMeter } from './components/StrikingPinMeter';
import { GameOverModal } from './components/GameOverModal';
import { RulesAndHistoryModal } from './components/RulesAndHistoryModal';
import { Play, RotateCcw, Sparkles } from 'lucide-react';

const ROUND_TIME_SECONDS = 90; // 90 seconds per game as requested by user

export default function App() {
  // Game states
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
  const [money, setMoney] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(ROUND_TIME_SECONDS);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [customerReaction, setCustomerReaction] = useState<'neutral' | 'perfect' | 'miss'>('neutral');
  const [customerWalkState, setCustomerWalkState] = useState<'walking_in' | 'waiting' | 'leaving'>('waiting');
  const [flyingTofu, setFlyingTofu] = useState<boolean>(false);
  const [isStrikingDisabled, setIsStrikingDisabled] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<{
    isHit: boolean;
    reward: number;
    text: string;
  } | null>(null);

  // Statistics for current round
  const [perfectHits, setPerfectHits] = useState<number>(0);
  const [missHits, setMissHits] = useState<number>(0);
  const [totalCustomersServed, setTotalCustomersServed] = useState<number>(0);

  // Sound state
  const [isMuted, setIsMuted] = useState<boolean>(() => soundManager.getMuted());

  // Modals
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);

  // Tournament cycle tracking (3-Round Cycle)
  const [tournament, setTournament] = useState<TournamentCycle>(() => {
    const saved = localStorage.getItem('tahu_kotak_tournament');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore fallback
      }
    }
    return {
      cycleId: 'cycle_' + Date.now(),
      currentRound: 1,
      rounds: [],
      highestScoreInCycle: 0,
      championPlayer: 'Juragan Tahu',
      isCompleted: false
    };
  });

  // Hall of Fame for completed cycles
  const [hallOfFame, setHallOfFame] = useState<Array<{
    id: string;
    championName: string;
    highestScore: number;
    completedAt: string;
  }>>(() => {
    const saved = localStorage.getItem('tahu_kotak_hall_of_fame');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [];
  });

  // Current record when round finishes
  const [currentRecord, setCurrentRecord] = useState<GameScoreRecord | null>(null);

  // Timer interval ref
  const timerRef = useRef<number | null>(null);

  // Save tournament to localStorage
  useEffect(() => {
    localStorage.setItem('tahu_kotak_tournament', JSON.stringify(tournament));
  }, [tournament]);

  // Save hall of fame
  useEffect(() => {
    localStorage.setItem('tahu_kotak_hall_of_fame', JSON.stringify(hallOfFame));
  }, [hallOfFame]);

  // Start round
  const startRound = useCallback(() => {
    setMoney(0);
    setTimeRemaining(ROUND_TIME_SECONDS);
    setPerfectHits(0);
    setMissHits(0);
    setTotalCustomersServed(0);
    setCustomerReaction('neutral');
    setLastResult(null);
    setIsStrikingDisabled(false);
    setCurrentRecord(null);

    // Spawn first customer with animated walking approach
    const firstCust = generateRandomCustomer();
    setCurrentCustomer(firstCust);
    setCustomerWalkState('walking_in');
    setIsStrikingDisabled(true);
    setGameStatus('playing');
    soundManager.playSizzle();

    // After walking to counter, customer stops and orders
    setTimeout(() => {
      setCustomerWalkState('waiting');
      setIsStrikingDisabled(false);
    }, 1000);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (gameStatus === 'playing') {
      timerRef.current = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Round over
            return 0;
          }
          if (prev <= 10) {
            soundManager.playCountdownTick();
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameStatus]);

  // Handle round completion when time hits 0
  useEffect(() => {
    if (gameStatus === 'playing' && timeRemaining === 0) {
      setGameStatus('round_over');
      soundManager.playFanfare();

      const record: GameScoreRecord = {
        id: 'rec_' + Date.now(),
        playerName: tournament.championPlayer || 'Juragan Tahu',
        moneyEarned: money,
        perfectHits,
        missHits,
        totalCustomersServed,
        roundNumber: tournament.currentRound,
        timestamp: Date.now()
      };

      setCurrentRecord(record);

      // Update tournament records
      setTournament((prev) => {
        const updatedRounds = [...prev.rounds.filter((r) => r.roundNumber !== prev.currentRound), record];
        const newHighest = Math.max(prev.highestScoreInCycle, money);
        return {
          ...prev,
          rounds: updatedRounds,
          highestScoreInCycle: newHighest
        };
      });
    }
  }, [timeRemaining, gameStatus, money, perfectHits, missHits, totalCustomersServed, tournament]);

  // Handle striking pin hit
  const handleStrike = useCallback(
    (isHit: boolean) => {
      if (isStrikingDisabled || gameStatus !== 'playing' || !currentCustomer) return;

      setIsStrikingDisabled(true);
      const reward = isHit ? 3000 : 1000;

      // Update score & hit counts
      setMoney((prev) => prev + reward);
      setTotalCustomersServed((prev) => prev + 1);

      if (isHit) {
        setPerfectHits((prev) => prev + 1);
        setCustomerReaction('perfect');
        soundManager.playHitPerfect();
        setLastResult({
          isHit: true,
          reward: 3000,
          text: 'TEPAT SASARAN! Tahu Kotak Sempurna! +Rp 3.000'
        });
      } else {
        setMissHits((prev) => prev + 1);
        setCustomerReaction('miss');
        soundManager.playHitMiss();
        setLastResult({
          isHit: false,
          reward: 1000,
          text: 'MELESET! Tetap laku +Rp 1.000'
        });
      }

      setFlyingTofu(true);

      // Customer receives tofu, pays, leaves, and next customer arrives
      setTimeout(() => {
        setFlyingTofu(false);
      }, 500);

      // Customer walks away happily with their tofu box
      setTimeout(() => {
        setCustomerWalkState('leaving');
      }, 700);

      // New customer arrives and walks in towards the seller
      setTimeout(() => {
        setCustomerReaction('neutral');
        const nextCust = generateRandomCustomer();
        setCurrentCustomer(nextCust);
        setCustomerWalkState('walking_in');
        soundManager.playSizzle();

        // When arrived at counter, ready for striking!
        setTimeout(() => {
          setCustomerWalkState('waiting');
          setIsStrikingDisabled(false);
        }, 1000);
      }, 1250);
    },
    [isStrikingDisabled, gameStatus, currentCustomer]
  );

  // Continue to next round (e.g. Round 1 -> 2 or Round 2 -> 3)
  const handleContinueNextRound = (playerName: string) => {
    setTournament((prev) => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      championPlayer: playerName
    }));
    startRound();
  };

  // User requirement:
  // "lalu jika setelah 3 kali bermain pengumpulan uang yang terbanyak akan di reset kembali"
  const handleResetAndStartNewCycle = (playerName: string) => {
    // Record current completed tournament cycle to Hall of Fame if score > 0
    const highestScore = tournament.highestScoreInCycle;
    if (highestScore > 0) {
      setHallOfFame((prev) => [
        {
          id: 'hall_' + Date.now(),
          championName: playerName || 'Juragan Tahu',
          highestScore,
          completedAt: new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
          })
        },
        ...prev.slice(0, 9)
      ]);
    }

    // Reset tournament cycle back to Round 1 and reset highestScore to 0!
    setTournament({
      cycleId: 'cycle_' + Date.now(),
      currentRound: 1,
      rounds: [],
      highestScoreInCycle: 0, // RESET AS REQUESTED
      championPlayer: playerName,
      isCompleted: false
    });

    startRound();
  };

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="min-h-screen bg-amber-100 bg-pixel-grid text-slate-900 flex flex-col justify-between py-2 sm:py-3 px-2 sm:px-4 font-pixel-body select-none">
      {/* HUD Header */}
      <HeaderBar
        money={money}
        timeRemaining={timeRemaining}
        currentRound={tournament.currentRound}
        highestInCycle={tournament.highestScoreInCycle}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenRules={() => setShowRulesModal(true)}
        onOpenHistory={() => setShowRulesModal(true)}
      />

      {/* Main Game Arena */}
      <main className="w-full max-w-4xl mx-auto flex-1 flex flex-col justify-center gap-3">
        {gameStatus === 'idle' ? (
          /* Welcome / Start Screen */
          <div
            id="start-screen-card"
            className="w-full max-w-xl mx-auto bg-amber-50 p-5 sm:p-7 pixel-box-amber text-center relative"
          >
            {/* Pixel Tofu Logo */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 border-3 border-black shadow-[3px_3px_0_0_#000] mb-2 pixelated">
              <svg width="36" height="36" viewBox="0 0 10 10" shapeRendering="crispEdges">
                <rect x="1" y="2" width="8" height="7" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
                <rect x="2" y="3" width="3" height="2" fill="#fef08a" />
              </svg>
            </div>

            <h2 className="font-pixel text-lg sm:text-2xl text-amber-950 tracking-tight">
              TAHU KOTAK PIXEL
            </h2>
            <p className="font-pixel-body text-xs sm:text-sm font-bold text-amber-900 mt-1 max-w-md mx-auto">
              Sensasi jualan tahu kotak digoreng dadakan di mobil bak! Bidik jarum{' '}
              <strong className="text-amber-950">Striking Pin</strong> tepat di sasaran emas!
            </p>

            {/* Truck & Customer Preview */}
            <div className="my-3 pixel-box-sm bg-slate-950">
              <TruckScene
                customer={{
                  id: 'demo',
                  name: 'Pelanggan Pertama',
                  role: 'Pencinta Tahu',
                  speedNumber: 6,
                  avatarColor: '#f59e0b',
                  shirtColor: '#2563eb',
                  avatarType: 'pelajar',
                  greeting: 'Bang, beli tahu kotaknya! Digoreng dadakan ya!',
                  successQuote: 'Gurih-gurih kotakkk!',
                  missQuote: 'Tetep mantap!'
                }}
                lastReaction="neutral"
                flyingTofu={false}
                isFrying={false}
                lastResult={null}
                customerWalkState="waiting"
              />
            </div>

            {/* Feature Highlights in Pixel Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left my-4 text-xs font-pixel-body">
              <div className="bg-white p-2.5 pixel-box-sm flex items-start gap-2">
                <span className="text-base">🎯</span>
                <div>
                  <strong className="block font-pixel text-[9px] text-slate-950">STRIKING PIN PRESISI</strong>
                  <span className="text-slate-700">
                    Tepat sasaran <strong>+Rp 3.000</strong>, meleset <strong>+Rp 1.000</strong>.
                  </span>
                </div>
              </div>

              <div className="bg-white p-2.5 pixel-box-sm flex items-start gap-2">
                <span className="text-base">⚡</span>
                <div>
                  <strong className="block font-pixel text-[9px] text-slate-950">SPEED PELANGGAN (3-10)</strong>
                  <span className="text-slate-700">
                    Angka 3 super kilat, angka 10 santai dan mudah dibidik!
                  </span>
                </div>
              </div>

              <div className="bg-white p-2.5 pixel-box-sm flex items-start gap-2">
                <span className="text-base">⏱️</span>
                <div>
                  <strong className="block font-pixel text-[9px] text-slate-950">WAKTU 90 DETIK</strong>
                  <span className="text-slate-700">
                    Kumpulkan uang sebanyak-banyaknya selama 90 detik.
                  </span>
                </div>
              </div>

              <div className="bg-white p-2.5 pixel-box-sm flex items-start gap-2">
                <span className="text-base">🏆</span>
                <div>
                  <strong className="block font-pixel text-[9px] text-slate-950">TURNAMEN 3 RONDE</strong>
                  <span className="text-slate-700">
                    Setelah 3 kali bermain, rekor terbanyak akan direset kembali!
                  </span>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <button
              id="btn-start-game"
              type="button"
              onClick={startRound}
              className="w-full py-3.5 px-4 bg-yellow-400 hover:bg-yellow-300 text-black font-pixel text-xs sm:text-sm tracking-wider pixel-btn flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_5px_0_0_#000]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>MULAI RONDE {tournament.currentRound} DARI 3 (90 DETIK)</span>
            </button>
          </div>
        ) : (
          /* Active Playing Scene */
          <>
            {/* Truck & Customer Scene with Striking Pin positioned directly below the dolak */}
            <TruckScene
              customer={currentCustomer}
              lastReaction={customerReaction}
              flyingTofu={flyingTofu}
              isFrying={gameStatus === 'playing'}
              lastResult={lastResult}
              customerWalkState={customerWalkState}
              strikingPinSlot={
                currentCustomer ? (
                  <StrikingPinMeter
                    speedNumber={currentCustomer.speedNumber}
                    onStrike={handleStrike}
                    disabled={isStrikingDisabled || gameStatus !== 'playing' || customerWalkState !== 'waiting'}
                    lastResult={lastResult}
                  />
                ) : undefined
              }
            />
          </>
        )}
      </main>

      {/* Footer info & Controls */}
      <footer className="w-full max-w-4xl mx-auto mt-2 text-center font-pixel text-[8px] sm:text-[9px] text-amber-950/80 flex flex-col sm:flex-row items-center justify-between gap-1 px-1">
        <div className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-700" />
          <span>TAHU KOTAK PIXEL EDITION • TEKAN [SPASI] ATAU KLIK TOMBOL</span>
        </div>
        <div className="flex items-center gap-2">
          {gameStatus === 'playing' && (
            <button
              onClick={() => {
                if (window.confirm('Yakin ingin merestart ronde ini?')) {
                  startRound();
                }
              }}
              className="text-amber-900 hover:text-black font-bold underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>ULANGI RONDE</span>
            </button>
          )}
          <span>© {new Date().getFullYear()} TAHU KOTAK RETRO</span>
        </div>
      </footer>

      {/* Game Over Modal (when 2 minutes expire) */}
      {gameStatus === 'round_over' && currentRecord && (
        <GameOverModal
          currentRecord={currentRecord}
          tournament={tournament}
          onContinueNextRound={handleContinueNextRound}
          onResetAndStartNewCycle={handleResetAndStartNewCycle}
        />
      )}

      {/* Rules & Tournament History Modal */}
      <RulesAndHistoryModal
        isOpen={showRulesModal}
        onClose={() => setShowRulesModal(false)}
        tournament={tournament}
        hallOfFame={hallOfFame}
      />
    </div>
  );
}
