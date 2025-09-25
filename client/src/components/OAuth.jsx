import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function OAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL // Changed from 'photo' to 'photoURL'
                })
            });

            const data = await res.json();

            // Check if the request was successful
            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate("/");
            } else {
                console.log("Google Login Failed:", data.message || "Unknown error");
            }

        } catch (error) {
            console.log("Google Login Failed:", error);
        }
    };

    return (
        <button
            type="button"
            onClick={handleGoogleClick}
            className="bg-red-700 text-white rounded-lg p-3 hover:opacity-95 cursor-pointer"
        >
            Continue with google
        </button>
    );
}

export default OAuth;