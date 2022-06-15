import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Input";
import ModalWrapper from "./ModalWrapper";

export default function VerifyResetModal() {
    const [verificationCode, setVerificationCode] = useState("");
    let navigate = useNavigate();
    let email = "george.carlson@g*****";

    const handleResendCode = () => {
        console.log("Resending code.");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/reset-password");
    };
    return (
        <ModalWrapper goBack>
            <h1 className="text-purple-200 text-center font-bold mb-3">
                Reset Your Password?
            </h1>
            <p className="modal-text mb-15">
                A code has been sent to your email
                <span className="text-gray-500"> {email}</span>. Please enter
                the verification code below.
            </p>
            <form
                className="w-full flex flex-col content-center"
                onSubmit={handleSubmit}
            >
                <Input
                    name="verification code"
                    placeholder="00 - 00 - 00"
                    value={verificationCode}
                    setValue={setVerificationCode}
                    lastchild
                />

                <div className="flex justify-end">
                    <span
                        onClick={handleResendCode}
                        className="text-gold underline text-xs font-semibold cursor-pointer"
                    >
                        I didn't receive the code. Please sent it again
                    </span>
                </div>
                <button
                    type="submit"
                    className="btn bg-purple-500 hover:bg-purple-400 mt-10 mx-auto"
                    disabled={verificationCode.length < 6}
                >
                    Submit
                </button>
            </form>
        </ModalWrapper>
    );
}
