import React, { useState } from "react";
import logo from "../assets/images/logo.svg";
import iconHide from "../assets/images/icon_eye_hide.svg";
import closeIcon from "../assets/images/icon_close.svg";

export default function Login() {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="bg-login-clouds bg-cover bg-no-repeat h-screen">
            <div className="flex flex-col justify-center items-center w-full h-screen pt-24">
                <img className="w-64" src={logo} alt="mktfy logo" />
                <div className="flex flex-col mt-14">
                    <button
                        className="btn bg-gold shadow-btn mb-4"
                        onClick={() => setShowModal(true)}
                    >
                        Login
                    </button>
                    <button className="btn bg-purple-500 shadow-btn">
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
                        <h1 className="text-purple-200 font-bold mb-8">
                            Welcome Back!
                        </h1>
                        <form action="">
                            <div className="input-control flex flex-col mb-2">
                                <label
                                    className="text-gray-400 font-semibold"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    className="placeholder:text-gray-200 border border-gray-100 mb-1 mt-3 p-5 text-base font-semibold rounded"
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Your email"
                                />
                                <span>Your email is incorrect</span>
                            </div>
                            <div className="input-control flex flex-col">
                                <label
                                    className="text-gray-400 font-semibold"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="placeholder:text-gray-200 border border-gray-100 mb-1 mt-3 p-5 text-base font-semibold rounded"
                                    type="text"
                                    id="password"
                                    name="password"
                                    placeholder="Your password"
                                />
                                <img
                                    className="w-6"
                                    src={iconHide}
                                    alt="hide password eye icon"
                                />
                                <span>Your password is incorrect</span>
                            </div>
                            <a href="#">I forgot my password</a>
                            <button className="btn bg-gray-100">Login</button>
                        </form>
                        <span
                            className="absolute top-7 right-7"
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
