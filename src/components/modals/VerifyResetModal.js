import React from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyResetModal() {
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
        <div className="w-full flex flex-col items-center">
            <h1 className="text-purple-200 text-center font-bold mb-3">
                Reset Your Password?
            </h1>
            <p className="modal-text mb-16">
                A code has been sent to your email{" "}
                <span className="text-gray-500">{email}</span>. Please enter the
                verification code below.
            </p>
            <form
                className="w-full flex flex-col content-center"
                onSubmit={handleSubmit}
            >
                <div className="input-control">
                    <label htmlFor="verify">Verification Code</label>

                    <input
                        type="text"
                        id="verify"
                        name="verify"
                        placeholder="00 - 00 - 00"
                    />

                    <span className="input-error-msg">
                        Your verification code is incorrect.
                    </span>
                </div>
                <div className="flex justify-end">
                    <span
                        onClick={handleResendCode}
                        className="text-gold underline text-xs font-semibold"
                    >
                        I didn't receive the code. Please sent it again
                    </span>
                </div>
                <button
                    type="submit"
                    className="btn bg-purple-500 mt-10 mx-auto"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
