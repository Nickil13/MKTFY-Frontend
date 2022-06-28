import React, { useState, useMemo } from "react";
import ModalWrapper from "./ModalWrapper";
import { PasswordInput } from "../inputs";
import Button from "../Button";
import PasswordRequirement from "./PasswordRequirement";
import { useNavigate, useLocation } from "react-router-dom";
import { checkUppercase, checkContainsNumber } from "../../utils/helpers";

export default function ResetPasswordModal() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatching, setPasswordsMatching] = useState(true);
    const correctLength = password.length > 5;
    const hasUppercase = useMemo(() => checkUppercase(password), [password]);
    const hasNumber = checkContainsNumber(password);
    const criteriaMet = correctLength && hasUppercase && hasNumber;
    const passwordStrength = criteriaMet ? "strong" : "weak";
    let navigate = useNavigate();
    let location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Resetting password.");
        //Loading Screen -> Login
        navigate("/loading", { state: { prevPath: location.pathname } });
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
                            onBlur={checkPasswordsMatching}
                        />
                        <span
                            className={`absolute top-1 left-20 ${
                                passwordStrength === "weak"
                                    ? "text-gold-200"
                                    : "text-green"
                            } font-semibold text-2xs capitalize`}
                        >
                            {passwordStrength}
                        </span>
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
                            At least 6 characters
                        </PasswordRequirement>
                        <PasswordRequirement requirement={hasUppercase}>
                            1 Uppercase
                        </PasswordRequirement>
                        <PasswordRequirement requirement={hasNumber} lastchild>
                            1 Number
                        </PasswordRequirement>
                    </div>
                    <Button
                        type="submit"
                        margins="mt-28"
                        centered
                        disabled={
                            !criteriaMet ||
                            !passwordsMatching ||
                            !password ||
                            !confirmPassword
                        }
                    >
                        Set Password
                    </Button>
                </form>
            </div>
        </ModalWrapper>
    );
}
