import React, { useState } from "react";
import logo from "../assets/images/logo.svg";

import closeIcon from "../assets/images/icon_close.svg";
import { LoginModal, RegisterModal } from "../components";
import { Routes, Route, useNavigate } from "react-router-dom";

export default function Login() {
    const [showModal, setShowModal] = useState(false);
    let navigate = useNavigate();

    const handleLoginClick = () => {
        setShowModal(true);
        navigate("/login");
    };

    const handleCreateAccountClick = () => {
        setShowModal(true);
        navigate("/register");
    };

    return (
        <div className="bg-login-clouds bg-cover bg-no-repeat h-screen">
            <div className="flex flex-col justify-center items-center w-full h-screen pt-24">
                <img className="w-64" src={logo} alt="mktfy logo" />
                <div className="flex flex-col mt-14">
                    <button
                        className="btn bg-gold shadow-btn mb-4"
                        onClick={handleLoginClick}
                    >
                        Login
                    </button>
                    <button
                        className="btn bg-purple-500 shadow-btn"
                        onClick={handleCreateAccountClick}
                    >
                        Create Account
                    </button>
                </div>
            </div>
            <div className="absolute left-20 bottom-10 text-sm-17">
                <p className="text-white">
                    Find out more about us!
                    <a href="#" className="text-gold font-bold ml-1">
                        Visit our website
                    </a>
                </p>
            </div>
            {/* Login Modal */}
            {showModal && (
                <div className="absolute flex items-center justify-center inset-0 bg-black bg-opacity-50">
                    <div className="relative flex flex-col items-center bg-white w-4/5 max-w-3xl  my-auto py-16 px-32 rounded-modal shadow-modal">
                        <Routes>
                            <Route path="/login" element={<LoginModal />} />
                            <Route
                                path="/register"
                                element={<RegisterModal />}
                            />
                        </Routes>
                        <span
                            className="absolute top-7 right-7 cursor-pointer"
                            onClick={() => setShowModal(false)}
                        >
                            <img src={closeIcon} alt="close x icon" />
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
