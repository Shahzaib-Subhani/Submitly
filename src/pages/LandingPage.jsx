import React from 'react';
import Hero from '../components/landing/Hero';
import Navbar from '../components/landing/Navbar';
import ProcessCard from '../components/landing/ProcessCard';
import Teams from '../components/landing/Teams';
import Evaluators from '../components/landing/Evaluators';
import Admin from '../components/landing/Admin';

const LandingPage = () => {
    return (
        <div className="bg-gray-950 text-white font-sans antialiased relative">

            <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 opacity-80 z-0 animate-pulse-slow"></div>


            <div className="relative z-10 min-h-screen backdrop-blur-3xl">
                <Navbar />
                {/* 2. Hero Section  */}
                <Hero />

                {/* 3. How It Works */}
                <ProcessCard />

                {/* 4. Detailed Sections for Each Role */}

                {/* Teams Section  */}
                <Teams />

                {/* Evaluators Section  */}
                <Evaluators />

                {/* Admin Section*/}
                <Admin />

                {/* Footer */}
                <footer className="py-8 text-center text-sm bg-white/5 backdrop-blur-sm">
                    <div className="container mx-auto px-6">
                        <p className="text-gray-400">&copy; 2025 Submittly. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default LandingPage;