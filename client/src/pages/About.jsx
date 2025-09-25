import React from "react";

function About() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center p-6">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">About This App</h1>
            <p className="text-lg text-slate-600 max-w-2xl">
                This project is a demo full-stack application using{" "}
                <span className="font-semibold">React</span>,{" "}
                <span className="font-semibold">Redux Toolkit</span>,{" "}
                <span className="font-semibold">Express</span>, and{" "}
                <span className="font-semibold">MongoDB</span>.
                It showcases authentication (Sign Up / Sign In), global state management,
                and simple page routing with <span className="font-semibold">React Router</span>.
            </p>
        </div>
    );
}

export default About;
