import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="bg-gradient-to-r from-slate-200 to-slate-300 shadow-md">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
                <Link to="/" className="text-2xl font-extrabold text-slate-700 hover:text-slate-900 transition">
                    Auth<span className="text-blue-500">App</span>
                </Link>

                {/* Navigation */}
                <nav>
                    <ul className="flex gap-6 text-slate-600 font-medium">
                        <li>
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) =>
                                    `hover:text-blue-500 transition ${isActive ? "text-blue-600 font-semibold" : ""
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    `hover:text-blue-500 transition ${isActive ? "text-blue-600 font-semibold" : ""
                                    }`
                                }
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/sign-in"
                                className={({ isActive }) =>
                                    `hover:text-blue-500 transition ${isActive ? "text-blue-600 font-semibold" : ""
                                    }`
                                }
                            >
                                Sign In
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
