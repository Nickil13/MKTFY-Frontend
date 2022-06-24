import React, { useState, useMemo } from "react";
import { FaCheckCircle } from "react-icons/fa";
import ModalWrapper from "./ModalWrapper";
import PasswordInput from "../PasswordInput";
import Button from "../Button";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function CreatePasswordModal() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreedToToS, setAgreedToToS] = useState(false);
    const correctLength = useMemo(() => password.length > 5, [password]);
    const hasUppercase = useMemo(() => checkUppercase(), [password]);
    const hasNumber = true;
    const criteriaMet =
        correctLength && hasUppercase && hasNumber && agreedToToS;
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

    return (
        <ModalWrapper goBack>
            <div className="w-full flex flex-col items-center">
                <h1 className="text-purple-200 text-center font-bold mb-3">
                    Create Password
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
                            <span className="text-gray-500">
                                At least 6 characters
                            </span>
                        </div>
                        <div className="flex items-center">
                            <FaCheckCircle
                                className={`${
                                    hasUppercase
                                        ? "text-purple-200"
                                        : "text-gray-100"
                                } w-5 h-5 mr-3`}
                            />
                            <span className="text-gray-500">1 Uppercase</span>
                        </div>
                        <div className="flex items-center">
                            <FaCheckCircle
                                className={`${
                                    hasNumber
                                        ? "text-purple-200"
                                        : "text-gray-100"
                                } w-5 h-5 mr-3`}
                            />
                            <span className="text-gray-500">1 Number</span>
                        </div>
                    </div>
                    <div className="flex mt-15">
                        <div className="mr-2">
                            <label
                                className={`block w-6 h-6  border-2 rounded-sm font-semibold border-purple-100 ${
                                    agreedToToS &&
                                    "bg-checkbox border-none bg-center bg-no-repeat"
                                }`}
                                htmlFor="checkbox"
                            ></label>
                            <input
                                className="invisible"
                                type="checkbox"
                                id="checkbox"
                                name="checkbox"
                                onChange={(e) =>
                                    setAgreedToToS(e.target.checked)
                                }
                            />
                        </div>

                        <p className="text-xs text-gray-500">
                            By checking this box, you agree to our
                            <Link
                                to="/terms-of-service"
                                className="text-purple-100 font-bold underline mx-1"
                            >
                                Terms of service
                            </Link>
                            and our
                            <Link
                                to="/privacy-policy"
                                className="text-purple-100 font-bold underline ml-1"
                            >
                                Privacy Policy
                            </Link>
                        </p>
                    </div>

                    <Button
                        type="submit"
                        margins="mt-10"
                        centered
                        disabled={!criteriaMet}
                    >
                        Create Account
                    </Button>
                </form>
            </div>
        </ModalWrapper>
    );
}
