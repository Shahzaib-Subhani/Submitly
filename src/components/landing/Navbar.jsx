import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="py-4 bg-white/5 backdrop-blur-sm sticky top-0 z-50 animate-fade-in animation-delay-0">
            <nav className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-indigo-400 animate-slide-up animation-delay-100">Project</span>
                    <span className="text-2xl font-bold text-white animate-slide-up animation-delay-200">Name</span>
                </div>
                <div className="hidden md:flex space-x-8">
                    <Link to="#how-it-works" className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 font-medium animate-slide-up animation-delay-300">How It Works</Link>
                    <Link to="/team-signin" className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 font-medium animate-slide-up animation-delay-400">For Teams</Link>
                    <Link to="/evaluator-signin" className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 font-medium animate-slide-up animation-delay-500">For Evaluators</Link>
                    <Link to="/admin-signin" className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 font-medium animate-slide-up animation-delay-600">Admin</Link>
                </div>
                <Link to="/team-signin" className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-300 animate-fade-in animation-delay-700">
                    Get Started
                </Link>
            </nav>
        </header>
    );
}

export default Navbar;
