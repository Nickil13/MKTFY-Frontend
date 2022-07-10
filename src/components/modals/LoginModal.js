import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import { PasswordInput, LoginInput } from "../inputs";
import ModalWrapper from "./ModalWrapper";
import { useUserContext } from "../../context/UserContext";

export default function LoginModal() {
    const [email, setEmail] = useState("nickitest62@gmail.com");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("Apples31");
    const { login, error } = useUserContext();

    const handleLogin = (e) => {
        e.preventDefault();
        login(email, password);
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
                <div className="flex justify-between">
                    <div className="text-red">{error && error}</div>
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
