import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center p-6">
            <h1 className="text-5xl font-bold text-slate-800 mb-6">
                Welcome to My App 🚀
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl">
                This is a simple demo project built with <span className="font-semibold">React</span>,{" "}
                <span className="font-semibold">Redux Toolkit</span>, and{" "}
                <span className="font-semibold">Express + MongoDB</span>.
                Navigate through the pages to explore!
            </p>
            <div className="flex gap-4">
                <Link
                    to="/about"
                    className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
                >
                    About Page
                </Link>
                <Link
                    to="/sign-in"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                >
                    Sign In
                </Link>
                <Link
                    to="/sign-up"
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

export default Home;
