import React from "react";
import { useNavigate } from "react-router-dom";
import ModalWrapper from "./ModalWrapper";
import iconHide from "../../assets/images/icon_eye_hide.svg";

export default function ForgotPasswordModal() {
    let navigate = useNavigate();
    return (
        <ModalWrapper goBack>
            <div className="w-full flex flex-col items-center">
                <h1 className="text-purple-200 text-center font-bold mb-3">
                    Forgot Your Password?
                </h1>
                <p className="modal-text mb-16">
                    It's okay, these things happen. Please enter your email in
                    the field below. We will send you an email to reset your
                    password.
                </p>
                <form
                    className="w-full flex flex-col content-center"
                    onSubmit={() => navigate("/reset-password")}
                >
                    <div className="input-control">
                        <label htmlFor="email">Email</label>

                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Your email"
                        />

                        <span className="input-error-msg">
                            Your email is incorrect
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="btn bg-purple-500 mt-16 mx-auto"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </ModalWrapper>
    );
}
