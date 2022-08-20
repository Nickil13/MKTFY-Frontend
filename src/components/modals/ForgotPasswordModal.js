import React, { useState } from "react";
import { LoginInput } from "../inputs";
import ModalWrapper from "./ModalWrapper";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordModal() {
    const { changePassword } = useUserContext();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    let navigate = useNavigate();

    const checkValidEmail = (value) => {
        if (!value || value.match(/^[^\s@]+@[^\s@].[^\s@]+$/) == null) {
            setEmailError("Your email is incorrect");
        } else {
            setEmailError("");
        }
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        changePassword(email);
        navigate("/login");
    };
    return (
        <ModalWrapper goBack portalModal>
            <h1 className="text-purple-200 text-center font-bold mb-3 mt-5 lg:mt-0">
                Forgot Your Password?
            </h1>
            <div className="max-w-input mx-auto w-full">
                <p className="text-sm-17 lg:text-base font-semibold text-gray-300 mb-15 max-w-input">
                    It's okay, these things happen. Please enter your email in
                    the field below. We will send you an email to reset your
                    password.
                </p>
                <form
                    className="w-full flex flex-col"
                    onSubmit={handleForgotPassword}
                >
                    <LoginInput
                        name="email"
                        type="email"
                        value={email}
                        setValue={setEmail}
                        onBlur={(e) => checkValidEmail(e.target.value)}
                        invalid={emailError}
                        errorMessage
                        lastchild
                    />
                    <button
                        type="submit"
                        className="btn-purple-new mt-15 mx-auto max-w-btn"
                        disabled={!email || emailError}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </ModalWrapper>
    );
}
