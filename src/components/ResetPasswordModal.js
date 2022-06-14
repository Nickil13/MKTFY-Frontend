import React, { useState, useMemo } from "react";
import iconHide from "../assets/images/icon_eye_hide.svg";
import { FaCheckCircle } from "react-icons/fa";
import ModalWrapper from "./ModalWrapper";

export default function ResetPasswordModal() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [correctLength, setCorrectLength] = useState(true);
    const correctLength = useMemo(() => password.length > 5, [password]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Resetting password.");
    };
    console.log("rendering reset password modal");
    return (
        <ModalWrapper goBack>
            <div className="w-full flex flex-col items-center">
                <h1 className="text-purple-200 text-center font-bold mb-3">
                    Reset Password
                </h1>
                <p className="modal-text mb-6">
                    The password must have at least 6 characters and must
                    contain 1 uppercase and 1 number.
                </p>
                <form
                    className="w-full flex flex-col content-center"
                    onSubmit={handleSubmit}
                >
                    <div className="input-control mb-2">
                        <label htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                className="w-full"
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                    <div className="input-control">
                        <label htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                className="w-full"
                                type="password"
                                id="confirm-password"
                                name="confirm-password"
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
                    <div>
                        <div className="flex items-center">
                            <FaCheckCircle
                                className={`${
                                    correctLength
                                        ? "text-purple-200"
                                        : "text-gray-100"
                                } w-5 h-5 mr-3`}
                            />
                            <span>At least 6 characters</span>
                        </div>
                        <div className="flex items-center">
                            <FaCheckCircle className="text-gray-100 w-5 h-5 mr-3" />
                            <span>1 Uppercase</span>
                        </div>
                        <div className="flex items-center">
                            <FaCheckCircle className="text-gray-100 w-5 h-5 mr-3" />
                            <span>1 Number</span>
                        </div>
                    </div>

                    <button className="btn bg-gray-100 mt-16">
                        Set Password
                    </button>
                </form>
            </div>
        </ModalWrapper>
    );
}
