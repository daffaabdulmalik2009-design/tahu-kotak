export interface Customer {
  id: string;
  name: string;
  role: string;
  avatarColor: string;
  shirtColor: string;
  speedNumber: number; // 3 - 10
  avatarType: 'bocil1' | 'bocil2' | 'bocil3' | 'ojol' | 'ibu' | 'pelajar' | 'pakrt' | 'pekerja' | 'gaul' | 'kakek';
  greeting: string;
  successQuote: string;
  missQuote: string;
}

export interface GameScoreRecord {
  id: string;
  playerName: string;
  moneyEarned: number;
  perfectHits: number;
  missHits: number;
  totalCustomersServed: number;
  roundNumber: number; // 1, 2, or 3
  timestamp: number;
}

export interface TournamentCycle {
  cycleId: string;
  currentRound: number; // 1, 2, or 3
  rounds: GameScoreRecord[];
  highestScoreInCycle: number;
  championPlayer: string;
  isCompleted: boolean;
}

export type GameStatus = 'idle' | 'playing' | 'paused' | 'round_over' | 'cycle_reset';
