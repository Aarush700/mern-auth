import React from 'react'
import { Link } from "react-router-dom";
import { useState } from 'react';

function SignIn() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
            <form className="flex flex-col gap-4" >
                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    className="bg-slate-100 p-3 rounded-lg"

                />
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="bg-slate-100 p-3 rounded-lg"

                />
                <button
                    disabled={loading}
                    type="submit"
                    className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? 'Loading...' : 'Sign In'}
                </button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>New user?</p>
                <Link to="/sign-up">
                    <span className="text-blue-500">Sign Up</span>
                </Link>
            </div>
            {error && (
                <p className="text-red-700 mt-5">
                    Something went wrong, try again in a few minutes!
                </p>
            )}
        </div>
    )
}

export default SignIn
