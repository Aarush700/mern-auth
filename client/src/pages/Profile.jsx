import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
    updateUserStart,
    updateUserFailure,
    updateUserSuccess,
} from "../redux/user/userSlice";

function Profile() {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username: currentUser.username,
        email: currentUser.email,
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include"
            });

            const data = await res.json();
            if (res.ok) {
                dispatch(updateUserSuccess(data));
                setSuccess("Profile updated successfully!");
            } else {
                dispatch(updateUserFailure(data));
                setError(data.message || "Update failed");
            }
        } catch (error) {
            dispatch(updateUserFailure(error.message));
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <img
                    src={currentUser.profilePicture}
                    alt="Profile"
                    className="mt-2 h-24 w-24 self-center rounded-full object-cover border-2"
                />

                <input
                    type="text"
                    id="username"
                    className="bg-slate-100 rounded-lg p-3"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    id="email"
                    className="bg-slate-100 rounded-lg p-3"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    id="password"
                    placeholder="New Password"
                    className="bg-slate-100 rounded-lg p-3"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button
                    disabled={loading}
                    className="bg-slate-700 text-white p-3 rounded-lg cursor-pointer hover:opacity-95 disabled:opacity-70"
                >
                    {loading ? "Updating..." : "Update"}
                </button>
            </form>

            {error && <p className="text-red-600 mt-3 text-center">{error}</p>}
            {success && <p className="text-green-600 mt-3 text-center">{success}</p>}

            <div className="flex justify-between mt-5">
                <span className="text-red-700 cursor-pointer">Delete Account</span>
                <span className="text-red-700 cursor-pointer">Sign Out</span>
            </div>
        </div>
    );
}

export default Profile;
