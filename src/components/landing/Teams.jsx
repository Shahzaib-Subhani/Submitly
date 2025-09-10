import { Link } from "react-router-dom";

const Teams = () => {
    return (
        <section id="teams" className="py-20">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="order-2 md:order-1 flex flex-col items-start animate-fade-in animation-delay-100">
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
                        Showcase Your Skills
                    </h2>
                    <p className="text-lg text-gray-300 mb-6 max-w-lg">
                        Our platform provides a seamless experience for you to submit your creative video projects and get the recognition you deserve.
                    </p>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-center space-x-3 transition-all duration-300 hover:text-indigo-400 transform hover:translate-x-2">
                            <span className="text-green-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></span>
                            <span>Easy Submission of video links.</span>
                        </li>
                        <li className="flex items-center space-x-3 transition-all duration-300 hover:text-indigo-400 transform hover:translate-x-2">
                            <span className="text-green-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></span>
                            <span>Real-time score tracking and leaderboard.</span>
                        </li>
                        <li className="flex items-center space-x-3 transition-all duration-300 hover:text-indigo-400 transform hover:translate-x-2">
                            <span className="text-green-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></span>
                            <span>Access to constructive feedback from professionals.</span>
                        </li>
                    </ul>
                    <Link to="/team-register" className="mt-8 inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                        Register Your Team
                    </Link>
                </div>
                <div className="order-1 md:order-2 flex justify-center p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in animation-delay-200">
                    <img src="/team.png" alt="Dashboard Preview for Teams" className="rounded-lg w-full" />
                </div>
            </div>
        </section>
    );
}

export default Teams;
