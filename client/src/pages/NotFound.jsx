import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center p-6">
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <p className="text-xl text-slate-700 mb-6">
                Oops! The page you’re looking for doesn’t exist.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
            >
                Go Back Home
            </Link>
        </div>
    );
}

export default NotFound;
