import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Input";
import PasswordInput from "../PasswordInput";
import ModalWrapper from "./ModalWrapper";

export default function LoginModal() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("logging in");
        navigate("/dashboard");
    };

    return (
        <ModalWrapper>
            <h1 className="text-purple-200 text-center font-bold mb-8">
                Welcome Back!
            </h1>
            <form
                className="w-full flex flex-col content-center"
                onSubmit={handleLogin}
            >
                <Input
                    name="email"
                    type={email}
                    value={email}
                    setValue={setEmail}
                />
                <PasswordInput
                    password={password}
                    onChange={(e) => setPassword(e.target.value)}
                    lastchild
                />
                <div className="flex justify-end">
                    <Link
                        className="text-gold underline text-xs font-semibold"
                        to="/forgot-password"
                    >
                        I forgot my password
                    </Link>
                </div>

                <button
                    type="submit"
                    className="btn bg-gold  mt-15 mx-auto"
                    disabled={!email && !password}
                >
                    Login
                </button>
            </form>
        </ModalWrapper>
    );
}
