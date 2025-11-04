import React from 'react';

const Header: React.FC = () => (
    <header className="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-sm z-50 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="#inicio" className="text-2xl font-bold font-orbitron text-white transition-colors hover:text-cyan-300">
                Mundo Lúdico
            </a>
            <nav className="hidden md:flex items-center space-x-8">
                <a href="#inicio" className="text-slate-300 hover:text-cyan-300 transition-colors">Inicio</a>
                <a href="#actividades" className="text-slate-300 hover:text-cyan-300 transition-colors">Servicios</a>
                <a href="#blog" className="text-slate-300 hover:text-cyan-300 transition-colors">Blog</a>
                <a href="#contacto" className="text-slate-300 hover:text-cyan-300 transition-colors">Contacto</a>
            </nav>
            <a 
              href="https://www.youtube.com/@luisvic23" target="_blank" rel="noopener noreferrer"
              className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400/50 transform hover:scale-105 transition-transform"
            >
              Suscríbete
            </a>
        </div>
    </header>
);

export default Header;