import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
    return (
        <section id="admin" className="py-20 text-center">
            <div className="container mx-auto px-6 max-w-3xl p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                    Manage with Precision
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                    The Admin dashboard provides full control over the platform, from managing users and submissions to setting deadlines.
                </p>
                <Link to="/admin-signin" className="inline-block px-10 py-5 bg-indigo-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105">
                    Admin Login
                </Link>
            </div>
        </section>
    );
}

export default Admin;
