import React, { useState } from "react";
import logo from "../assets/images/logo.svg";


import {
    ForgotPasswordModal,
    LoginModal,
    RegisterModal,
    ResetPasswordModal,
    VerifyResetModal,
} from "../components";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useModalContext } from "../context/ModalContext";

export default function Login() {
    const {showModal, setShowModal} = useModalContext();
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
                        <Routes>
                            <Route path="/login" element={<LoginModal />} />
                            <Route
                                path="/register"
                                element={<RegisterModal />}
                            />
                            <Route
                                path="/forgot-password"
                                element={<ForgotPasswordModal />}
                            />
                            <Route
                                path="/verify-reset"
                                element={<VerifyResetModal />}
                            />
                            <Route
                                path="/reset-password"
                                element={<ResetPasswordModal />}
                            />
                        </Routes>
                        
                    
                </div>
            )}
        </div>
    );
}
