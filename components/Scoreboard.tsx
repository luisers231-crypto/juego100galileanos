
import React from 'react';

interface ScoreboardProps {
  player1Score: number;
  player2Score: number;
  currentPlayer: number;
  roundPoints: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ player1Score, player2Score, currentPlayer, roundPoints }) => {
  return (
    <div className="flex justify-center items-center gap-4 sm:gap-8 w-full max-w-4xl mx-auto my-4 text-white">
      <div className={`flex-1 text-center p-4 rounded-lg transition-all duration-300 ${currentPlayer === 1 ? 'bg-cyan-600/80 shadow-cyan-400/50 shadow-lg' : 'bg-slate-700/50'}`}>
        <h2 className="text-lg sm:text-2xl font-bold font-orbitron text-cyan-300">JUGADOR 1</h2>
        <p className="text-3xl sm:text-5xl font-bold font-orbitron tracking-widest">{player1Score}</p>
      </div>

      <div className="text-center p-2 sm:p-4 bg-slate-900/60 rounded-full border-2 border-slate-500 min-w-[100px] sm:min-w-[150px]">
        <h3 className="text-sm sm:text-lg font-bold text-slate-300">RONDA</h3>
        <p className="text-2xl sm:text-4xl font-bold font-orbitron text-emerald-400">{roundPoints}</p>
      </div>

      <div className={`flex-1 text-center p-4 rounded-lg transition-all duration-300 ${currentPlayer === 2 ? 'bg-fuchsia-600/80 shadow-fuchsia-400/50 shadow-lg' : 'bg-slate-700/50'}`}>
        <h2 className="text-lg sm:text-2xl font-bold font-orbitron text-fuchsia-300">JUGADOR 2</h2>
        <p className="text-3xl sm:text-5xl font-bold font-orbitron tracking-widest">{player2Score}</p>
      </div>
    </div>
  );
};

export default Scoreboard;
