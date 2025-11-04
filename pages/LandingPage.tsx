import React from 'react';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import Activities from '../components/landing/Activities';
import Blog from '../components/landing/Blog';
import Footer from '../components/landing/Footer';

interface LandingPageProps {
    onNavigateToGame: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToGame }) => {
    return (
        <div className="bg-slate-900">
            <Header />
            <main>
                <Hero onNavigateToGame={onNavigateToGame} />
                <Activities />
                <Blog />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
