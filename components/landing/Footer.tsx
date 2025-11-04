import React from 'react';

const Footer: React.FC = () => (
    <footer id="contacto" className="bg-slate-900 border-t border-slate-700">
        <div className="container mx-auto px-6 py-12 text-center text-slate-400">
            <div className="mb-8">
                <h3 className="text-2xl font-bold font-orbitron text-white mb-2">Mundo Lúdico</h3>
                <p className="text-slate-300">"Haciendo la IA accesible para todos"</p>
            </div>

            <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Síguenos en Redes</h4>
                <div className="flex justify-center space-x-6">
                    <a href="https://www.youtube.com/@luisvic23" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
                    <a href="#" className="hover:text-white transition-colors">TikTok</a>
                    <a href="#" className="hover:text-white transition-colors">Facebook</a>
                </div>
            </div>

            <div className="mb-8">
                <a 
                    href="https://www.youtube.com/@luisvic23" target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-red-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-400/50 transform hover:scale-105 transition-transform"
                >
                    Subscribirse al Canal
                </a>
            </div>
            
            <div className="mb-4 text-sm">
                <p>Contacto: Luis Muñoz</p>
                <p>Teléfono: 0992110907</p>
                <a href="mailto:luisers23@gmail.com" className="hover:text-cyan-300">luisers23@gmail.com</a>
            </div>

            <p className="text-sm">&copy; 2025 Mundo Lúdico. Todos los derechos reservados.</p>
        </div>
    </footer>
);

export default Footer;