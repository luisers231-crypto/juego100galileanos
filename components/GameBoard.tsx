
import React from 'react';
import { Answer } from '../types';

interface GameBoardProps {
  question: string;
  answers: Answer[];
}

const GameBoard: React.FC<GameBoardProps> = ({ question, answers }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-800/50 border-4 border-cyan-500 rounded-2xl p-6 shadow-2xl shadow-cyan-500/20 backdrop-blur-sm">
      <h2 className="text-xl md:text-3xl text-center font-bold text-white mb-6 p-4 bg-slate-900/70 rounded-lg border-2 border-slate-600">
        {question}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {answers.map((answer, index) => (
          <div
            key={index}
            className={`flex justify-between items-center text-lg sm:text-xl font-bold text-yellow-300 bg-slate-900/80 border-2 border-slate-700 rounded-lg overflow-hidden transition-all duration-500 ease-out transform ${
              answer.revealed ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <div className={`w-full h-full flex justify-between items-center p-3 sm:p-4 transition-transform duration-500 ${answer.revealed ? '' : 'translate-x-full'}`}>
              <span className="flex-grow">{answer.text}</span>
              <span className="ml-4 px-3 py-1 bg-yellow-400 text-slate-900 rounded-md">{answer.points}</span>
            </div>
            {!answer.revealed && (
               <div className="absolute w-full h-full flex items-center justify-center bg-blue-900/80">
                 <span className="text-2xl text-blue-300 font-orbitron">{index + 1}</span>
               </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
