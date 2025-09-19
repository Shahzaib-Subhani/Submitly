import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="py-24 md:py-36 text-center">
            <div className="container mx-auto px-6">
                <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight animate-fade-in animation-delay-300">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Next Generation</span> of Video Competitions
                </h1>
                <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in animation-delay-500">
                    A streamlined hub for creators to submit, experts to evaluate, and managers to orchestrate success.
                </p>
                <div className="mt-12 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <Link to="/team-register" className="inline-block px-8 py-4 bg-white/20 text-white font-bold text-lg rounded-full backdrop-blur-sm transition-all transform hover:scale-105 hover:bg-white/30 animate-slide-up animation-delay-700">
                        Register as a Team
                    </Link>
                    <Link to="/evaluator-register" className="inline-block px-8 py-4 text-white font-bold text-lg rounded-full border-2 border-indigo-400 backdrop-blur-sm transition-all transform hover:scale-105 hover:bg-white/10 animate-slide-up animation-delay-800">
                        Become an Evaluator
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Hero;
