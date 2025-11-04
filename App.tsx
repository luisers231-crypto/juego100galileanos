import React, { useState } from 'react';
// FIX: Corrected import path to be relative.
import LandingPage from './pages/LandingPage';
import GamePage from './pages/GamePage';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('landing');

    const navigateToGame = () => setCurrentPage('game');
    const navigateToHome = () => setCurrentPage('landing');

    return (
        <>
            {currentPage === 'landing' && <LandingPage onNavigateToGame={navigateToGame} />}
            {currentPage === 'game' && <GamePage onNavigateHome={navigateToHome} />}
        </>
    );
};

export default App;