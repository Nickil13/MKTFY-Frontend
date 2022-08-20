import React, { useState, useMemo } from "react";

import ModalWrapper from "./ModalWrapper";
import { PasswordInput } from "../inputs";
import PasswordRequirement from "./PasswordRequirement";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { checkUppercase, checkContainsNumber } from "../../utils/helpers";
import Alert from "../Alert";
import { useModalContext } from "../../context/ModalContext";

export default function CreatePasswordModal() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreedToToS, setAgreedToToS] = useState(false);
    const [passwordsMatching, setPasswordsMatching] = useState(true);
    const correctLength = password.length > 7;
    const hasUppercase = useMemo(() => checkUppercase(password), [password]);
    const hasNumber = checkContainsNumber(password);
    const criteriaMet = correctLength && hasUppercase && hasNumber;
    const passwordStrength = criteriaMet ? "strong" : "weak";
    let navigate = useNavigate();
    let location = useLocation();
    const { signup, signupSuccess, error } = useUserContext();
    const { setShowModal } = useModalContext();

    React.useEffect(() => {
        if (signupSuccess) {
            // Close modal

            //Loading Screen -> Dashboard
            navigate("/loading", { state: { redirect: "/dashboard" } });
        }
    }, [signupSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userInfo = { ...location.state.userInfo, password };
        signup(userInfo);
    };

    const checkPasswordsMatching = () => {
        if (password == confirmPassword) {
            setPasswordsMatching(true);
        } else {
            setPasswordsMatching(false);
        }
    };

    return (
        <ModalWrapper goBack portalModal>
            <div className="w-full flex flex-col items-center">
                <h1 className="text-purple-200 text-center font-bold mb-3">
                    Create Password
                </h1>
                <p className="text-sm-17 lg:text-base font-semibold text-gray-300 mb-6 text-center">
                    The password must have at least 6 characters and must
                    contain 1 uppercase and 1 number.
                </p>
                <form
                    className="w-full flex flex-col max-w-input mx-auto"
                    onSubmit={handleSubmit}
                >
                    <div className="relative">
                        <PasswordInput
                            password={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={checkPasswordsMatching}
                        />
                        {password && (
                            <span
                                className={`absolute top-1 left-20 ${
                                    passwordStrength === "weak"
                                        ? "text-gold-200"
                                        : "text-green"
                                } font-semibold text-2xs capitalize`}
                            >
                                {passwordStrength}
                            </span>
                        )}
                    </div>
                    <PasswordInput
                        name="confirm password"
                        password={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={checkPasswordsMatching}
                        invalid={!passwordsMatching}
                        errorMessage
                        lastchild
                    />

                    <div className="mt-2">
                        <PasswordRequirement requirement={correctLength}>
                            At least 8 characters
                        </PasswordRequirement>
                        <PasswordRequirement requirement={hasUppercase}>
                            1 Uppercase
                        </PasswordRequirement>
                        <PasswordRequirement requirement={hasNumber} lastchild>
                            1 Number
                        </PasswordRequirement>
                    </div>

                    <div className="flex mt-6 xlg:mt-15">
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
                    <button
                        type="submit"
                        className="btn-purple-new mt-8 mx-auto"
                        disabled={
                            !criteriaMet || !agreedToToS || !passwordsMatching
                        }
                    >
                        Create Account
                    </button>
                </form>
                {error && (
                    <Alert
                        title="Something went wrong!"
                        message={error}
                        confirmBtnText="Try again"
                        onConfirm={() => navigate("/register")}
                        onCancel={() => {
                            navigate("/");
                            setShowModal(false);
                        }}
                    />
                )}
            </div>
        </ModalWrapper>
    );
}
