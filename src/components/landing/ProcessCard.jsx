
const ProcessCard = () => {
    return (
        <section id="how-it-works" className="py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-16 animate-fade-in">
                    Our <span className="text-indigo-400">Simplified</span> Process
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Step 1 */}
                    <div className="p-8 bg-white/5 rounded-xl border border-white/10 backdrop-blur-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-slide-up animation-delay-100">
                        <div className="w-16 h-16 mx-auto mb-6 bg-indigo-400/20 text-indigo-400 rounded-full flex items-center justify-center text-4xl font-bold">1</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Register Your Team</h3>
                        <p className="text-gray-300">Create a team profile to get access to the submission portal.</p>
                    </div>
                    {/* Step 2 */}
                    <div className="p-8 bg-white/5 rounded-xl border border-white/10 backdrop-blur-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-slide-up animation-delay-200">
                        <div className="w-16 h-16 mx-auto mb-6 bg-purple-400/20 text-purple-400 rounded-full flex items-center justify-center text-4xl font-bold">2</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Submit Your Video</h3>
                        <p className="text-gray-300">Upload your video link and details before the deadline with ease.</p>
                    </div>
                    {/* Step 3 */}
                    <div className="p-8 bg-white/5 rounded-xl border border-white/10 backdrop-blur-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-slide-up animation-delay-300">
                        <div className="w-16 h-16 mx-auto mb-6 bg-indigo-400/20 text-indigo-400 rounded-full flex items-center justify-center text-4xl font-bold">3</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Get Real-Time Scores</h3>
                        <p className="text-gray-300">View live scores and feedback from expert evaluators on your dashboard.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProcessCard;
