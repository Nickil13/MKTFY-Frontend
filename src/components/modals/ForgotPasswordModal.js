import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Input";
import ModalWrapper from "./ModalWrapper";

export default function ForgotPasswordModal() {
    const [email, setEmail] = useState("");
    let navigate = useNavigate();

    const handleForgotPassword = (e) => {
        e.preventDefault();
        navigate("/verify-reset");
    };
    return (
        <ModalWrapper goBack>
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
                <Input
                    name="email"
                    type={email}
                    value={email}
                    setValue={setEmail}
                    lastchild
                />

                <button
                    type="submit"
                    disabled={!email}
                    className="btn bg-purple-500 hover:bg-purple-400 mt-15 mx-auto"
                >
                    Submit
                </button>
            </form>
        </ModalWrapper>
    );
}
