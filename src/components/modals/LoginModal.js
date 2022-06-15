import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../PasswordInput";
import ModalWrapper from "./ModalWrapper";

export default function LoginModal() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    return (
        <ModalWrapper>
            <div className="w-full flex flex-col items-center">
                <h1 className="text-purple-200 text-center font-bold mb-8">
                    Welcome Back!
                </h1>
                <form className="w-full flex flex-col content-center">
                    <div className="input-control mb-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className="input-error-msg">
                            Your email is incorrect
                        </span>
                    </div>
                    <PasswordInput
                        password={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        className="btn bg-gold  mt-16 mx-auto"
                        disabled={!email && !password}
                        onClick={() => navigate("/dashboard")}
                    >
                        Login
                    </button>
                </form>
            </div>
        </ModalWrapper>
    );
}
