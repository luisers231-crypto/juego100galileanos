
import React from 'react';

interface StrikeIndicatorProps {
  strikes: number;
}

const Strike: React.FC<{ active: boolean }> = ({ active }) => (
  <svg
    className={`w-12 h-12 sm:w-16 sm:h-16 transition-all duration-300 ${active ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'text-slate-600'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    ></path>
  </svg>
);


const StrikeIndicator: React.FC<StrikeIndicatorProps> = ({ strikes }) => {
  return (
    <div className="flex justify-center items-center gap-4 my-4">
        <Strike active={strikes >= 1} />
        <Strike active={strikes >= 2} />
        <Strike active={strikes >= 3} />
    </div>
  );
};

export default StrikeIndicator;
