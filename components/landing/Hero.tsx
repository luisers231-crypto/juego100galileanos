import React from 'react';

interface HeroProps {
    onNavigateToGame: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateToGame }) => (
    <section id="inicio" className="h-screen flex items-center justify-center text-center bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-700/20 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
        <div className="container mx-auto px-6 relative">
            <h1 className="text-5xl md:text-7xl font-bold font-orbitron tracking-tight text-white mb-4 drop-shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                Mundo Lúdico
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Contacte, aprende y se parte del mundo digital
            </p>
            <button 
                onClick={onNavigateToGame} 
                className="bg-cyan-600 text-white font-bold py-4 px-8 rounded-lg text-xl hover:bg-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-400/50 transform hover:scale-105 transition-transform"
            >
                Jugar a "100 Galileanos Dicen"
            </button>
        </div>
    </section>
);

export default Hero;
