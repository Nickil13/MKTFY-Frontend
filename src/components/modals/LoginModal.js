import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useModalContext } from "../../context/ModalContext";
import Button from "../Button";
import Input from "../Input";
import { PasswordInput } from "../inputs";
import ModalWrapper from "./ModalWrapper";
import { useUserContext } from "../../context/UserContext";
import { LoginInput } from "../inputs";

export default function LoginModal() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const { setShowModal } = useModalContext();
    const { login } = useUserContext();

    const handleLogin = (e) => {
        e.preventDefault();
        setShowModal(false);
        login();
    };

    const checkValidEmail = (value) => {
        if (!value || value.match(/^[^\s@]+@[^\s@].[^\s@]+$/) == null) {
            setEmailError("Your email is incorrect");
        } else {
            setEmailError("");
        }
    };
    return (
        <ModalWrapper portalModal>
            <h1 className="text-purple-200 text-center font-bold mb-8">
                Welcome Back!
            </h1>
            <form
                className="w-full flex flex-col content-center"
                onSubmit={handleLogin}
            >
                <LoginInput
                    name="email"
                    type="email"
                    value={email}
                    setValue={setEmail}
                    onBlur={(e) => checkValidEmail(e.target.value)}
                    invalid={emailError}
                    errorMessage
                />
                <PasswordInput
                    password={password}
                    onChange={(e) => setPassword(e.target.value)}
                    lastchild
                />
                <div className="flex justify-end">
                    <Link
                        className="text-gold-200 underline text-xs font-semibold mt-7"
                        to="/forgot-password"
                    >
                        I forgot my password
                    </Link>
                </div>
                <Button
                    type="submit"
                    color="gold"
                    margins="mt-15"
                    centered
                    disabled={!email || emailError || !password}
                >
                    Login
                </Button>
            </form>
        </ModalWrapper>
    );
}
