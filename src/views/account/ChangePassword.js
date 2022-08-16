import React, { useState } from "react";
import { LoginInput } from "../../components/inputs";
import { useUserContext } from "../../context/UserContext";

export default function ChangePassword() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const { user, changePassword } = useUserContext();

    const checkValidEmail = (value) => {
        if (!value || value.match(/^[^\s@]+@[^\s@].[^\s@]+$/) == null) {
            setEmailError("Your email is incorrect");
        } else if (email !== user.email) {
            setEmailError("Email doesn't match account");
        } else {
            setEmailError("");
        }
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        changePassword(email);
        setEmail("");
    };

    return (
        <div className="bg-white p-8 pr-24 rounded-10 shadow-modal max-w-[657px]">
            <h1 className="text-purple-100 font-bold mb-7">Change Password</h1>
            <p className="modal-text mb-15 max-w-input">
                Please enter your email in the field below. We will send you an
                email to reset your password.
            </p>
            <form
                className="w-full flex flex-col"
                onSubmit={handleResetPassword}
            >
                <LoginInput
                    name="email"
                    type="email"
                    value={email}
                    setValue={setEmail}
                    onBlur={(e) => checkValidEmail(e.target.value)}
                    invalid={emailError}
                    errorMessage
                    errorMessageText={emailError}
                />
                <button
                    type="submit"
                    className="btn-purple-new mt-10"
                    disabled={!email || emailError}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
