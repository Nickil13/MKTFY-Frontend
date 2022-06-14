import React from "react";
import iconHide from "../assets/images/icon_eye_hide.svg";

export default function RegisterModal() {
    return (
        <>
            <h1 className="text-purple-200 font-bold mb-8">
                Welcome to MKTFY!
            </h1>
            <p className="modal-text">
                It's nice to meet you. At MKTFY you are able to buy, sell and
                donate awesome stuff to a community of awesome people. Please
                fill out the form below to get started.
            </p>
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
        </>
    );
}
