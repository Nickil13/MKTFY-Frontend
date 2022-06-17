import React, { useState, useMemo } from "react";
import { FaCheckCircle } from "react-icons/fa";
import ModalWrapper from "./ModalWrapper";
import PasswordInput from "../PasswordInput";
import { useNavigate, useLocation } from "react-router-dom";

export default function ResetPasswordModal() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [correctLength, setCorrectLength] = useState(true);
    const correctLength = useMemo(() => password.length > 5, [password]);
    const hasUppercase = useMemo(() => checkUppercase(), [password]);
    const hasNumber = true;
    const criteriaMet = correctLength && hasUppercase && hasNumber;
    const [passwordStrength, setPasswordStrength] = useState("weak");
    let navigate = useNavigate();
    let location = useLocation();

    function checkUppercase() {
        let hasUppercase = false;
        for (let i = 0; i < password.length; i++) {
            if (password[i] == password[i].toUpperCase()) {
                hasUppercase = true;
            }
        }
        return hasUppercase;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Resetting password.");
        //Loading Screen -> Login
        navigate("/loading", { state: { prevPath: location.pathname } });
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
                    <div className="relative">
                        <PasswordInput
                            password={password}
                            onChange={(e) => setPassword(e.target.value)}
                            lastchild
                        />
                        <span className="absolute top-1 left-20 text-gold-200 font-semibold text-2xs capitalize">
                            {passwordStrength}
                        </span>
                    </div>
                    <PasswordInput
                        name="confirm password"
                        password={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        lastchild
                    />

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
                            <FaCheckCircle
                                className={`${
                                    hasUppercase
                                        ? "text-purple-200"
                                        : "text-gray-100"
                                } w-5 h-5 mr-3`}
                            />
                            <span>1 Uppercase</span>
                        </div>
                        <div className="flex items-center">
                            <FaCheckCircle
                                className={`${
                                    hasNumber
                                        ? "text-purple-200"
                                        : "text-gray-100"
                                } w-5 h-5 mr-3`}
                            />
                            <span>1 Number</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn bg-purple-500 hover:bg-purple-400 mx-auto mt-15"
                        disabled={!criteriaMet}
                    >
                        Set Password
                    </button>
                </form>
            </div>
        </ModalWrapper>
    );
}
