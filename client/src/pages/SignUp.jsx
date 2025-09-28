import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

function SignUp() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(false);

            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Signup failed");
            }

            // Automatically sign in after signup
            const signinRes = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
                credentials: "include", // include cookie if using JWT cookies
            });

            const userData = await signinRes.json();

            if (!signinRes.ok) {
                throw new Error(userData.message || "Signin failed");
            }

            // Update Redux
            dispatch(signInSuccess(userData));

            navigate("/"); // now navbar will show profile
        } catch (error) {
            console.error("Signup error:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    className="bg-slate-100 p-3 rounded-lg"
                    onChange={handleChange}
                />
                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    className="bg-slate-100 p-3 rounded-lg"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="bg-slate-100 p-3 rounded-lg"
                    onChange={handleChange}
                />
                <button
                    disabled={loading}
                    type="submit"
                    className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80 cursor-pointer"
                >
                    {loading ? "Loading..." : "Sign Up"}
                </button>
                <OAuth />
            </form>
            <div className="flex gap-2 mt-5">
                <p>Already have an account?</p>
                <Link to="/sign-in">
                    <span className="text-blue-500">Sign In</span>
                </Link>
            </div>
            {error && (
                <p className="text-red-700 mt-5">
                    Something went wrong, try again in a few minutes!
                </p>
            )}
        </div>
    );
}

export default SignUp;
