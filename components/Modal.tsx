
import React from 'react';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  buttonText: string;
  onButtonClick: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, buttonText, onButtonClick }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-slate-800 border-2 border-emerald-500 rounded-2xl p-8 max-w-lg w-full text-center shadow-2xl shadow-emerald-500/30 mx-4">
        <h2 className="text-4xl font-bold font-orbitron text-emerald-400 mb-4">{title}</h2>
        <div className="text-slate-200 text-lg mb-8">
          {children}
        </div>
        <button
          onClick={onButtonClick}
          className="w-full bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg text-xl hover:bg-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-400/50 transform hover:scale-105 transition-transform"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Modal;
