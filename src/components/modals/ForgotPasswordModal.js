import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginInput } from "../inputs";
import Button from "../Button";
import ModalWrapper from "./ModalWrapper";

export default function ForgotPasswordModal() {
    const [email, setEmail] = useState("");
    let navigate = useNavigate();

    const handleForgotPassword = (e) => {
        e.preventDefault();
        navigate("/verify-reset");
    };
    return (
        <ModalWrapper goBack portalModal>
            <h1 className="text-purple-200 text-center font-bold mb-3">
                Forgot Your Password?
            </h1>
            <p className="modal-text mb-15">
                It's okay, these things happen. Please enter your email in the
                field below. We will send you an email to reset your password.
            </p>
            <form
                className="w-full flex flex-col content-center"
                onSubmit={handleForgotPassword}
            >
                <LoginInput
                    name="email"
                    type="email"
                    value={email}
                    setValue={setEmail}
                    lastchild
                />
                <Button
                    type="submit"
                    disabled={!email}
                    margins="mt-15"
                    centered
                >
                    Submit
                </Button>
            </form>
        </ModalWrapper>
    );
}
