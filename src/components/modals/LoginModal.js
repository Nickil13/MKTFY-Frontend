import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useModalContext } from "../../context/ModalContext";
import Button from "../Button";
import Input from "../Input";
import PasswordInput from "../PasswordInput";
import ModalWrapper from "./ModalWrapper";
import { useUserContext } from "../../context/UserContext";

export default function LoginModal() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setShowModal } = useModalContext();
    let navigate = useNavigate();
    const { login } = useUserContext();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("logging in");
        // login();

        setShowModal(false);
        navigate("/dashboard");
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
                <Input
                    name="email"
                    type="email"
                    value={email}
                    setValue={setEmail}
                    errorMessage
                />
                <PasswordInput
                    password={password}
                    onChange={(e) => setPassword(e.target.value)}
                    lastchild
                />
                <div className="flex justify-end">
                    <Link
                        className="text-gold-200 underline text-xs font-semibold"
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
                    disabled={!email && !password}
                >
                    Login
                </Button>
            </form>
        </ModalWrapper>
    );
}
