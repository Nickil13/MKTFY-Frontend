import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import ModalWrapper from "./ModalWrapper";
import { LoginInput } from "../inputs";

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
        <ModalWrapper goBack portalModal>
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
                <LoginInput
                    name="verification code"
                    placeholder="00 - 00 - 00"
                    value={verificationCode}
                    setValue={setVerificationCode}
                    lastchild
                />

                <div className="flex justify-end mt-2">
                    <span
                        onClick={handleResendCode}
                        className="text-gold-200 underline text-xs font-semibold cursor-pointer"
                    >
                        I didn't receive the code. Please sent it again
                    </span>
                </div>
                <Button
                    type="submit"
                    margins="mt-10"
                    centered
                    disabled={verificationCode.length < 6}
                >
                    Submit
                </Button>
            </form>
        </ModalWrapper>
    );
}
