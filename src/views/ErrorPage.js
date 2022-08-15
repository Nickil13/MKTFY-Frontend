import React from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
    let navigate = useNavigate();
    return (
        <div className="bg-gray-clouds min-h-screen min-w-full">
            <div className="flex flex-col items-center justify-center w-4/5 mx-auto pt-[20vh] max-w-desktop">
                <h1 className="text-purple-100 font-bold mb-1 text-[4rem]">
                    404
                </h1>
                <p className="text-purple-100 font-bold text-base-lg">
                    Page Not Found
                </p>
                <p className="py-5">
                    The page you're trying to find does not exist!
                </p>
                <button
                    className="btn-purple-new max-w-btn text-sm-16 py-4"
                    onClick={() => navigate("/dashboard")}
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}
