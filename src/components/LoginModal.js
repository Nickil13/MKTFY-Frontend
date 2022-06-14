import React from "react";
import { Link } from "react-router-dom";
import iconHide from "../assets/images/icon_eye_hide.svg";
import ModalWrapper from "./ModalWrapper";
export default function LoginModal() {
    return (
        <ModalWrapper>
            <div className="w-full flex flex-col items-center">
                <h1 className="text-purple-200 text-center font-bold mb-8">
                    Welcome Back!
                </h1>
                <form action="">
                    <div className="input-control mb-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Your email"
                        />
                        <span className="input-error-msg">
                            Your email is incorrect
                        </span>
                    </div>
                    <div className="input-control">
                        <label htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                className="w-full"
                                type="text"
                                id="password"
                                name="password"
                                placeholder="Your password"
                            />
                            <img
                                className="absolute mt-1 top-1/2 -translate-y-1/2 right-5 w-6"
                                src={iconHide}
                                alt="hide password eye icon"
                            />
                        </div>

                        <span className="input-error-msg">
                            Your password is incorrect
                        </span>
                    </div>
                    <div className="flex justify-end">
                        <Link
                            className="text-gold underline text-xs font-semibold"
                            to="/forgot-password"
                        >
                            I forgot my password
                        </Link>
                    </div>

                    <button className="btn bg-gray-100 mt-16">Login</button>
                </form>
            </div>
        </ModalWrapper>
    );
}
