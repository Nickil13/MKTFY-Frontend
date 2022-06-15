import React, { useRef } from "react";
import iconHide from "../assets/images/icon_eye_hide.svg";

export default function PasswordInput({ password, onChange }) {
    const inputRef = useRef(null);
    const toggleShowPassword = () => {
        if (inputRef) {
            if (inputRef.current.type === "password") {
                inputRef.current.type = "text";
            } else {
                inputRef.current.type = "password";
            }
        }
    };
    return (
        <div className="input-control">
            <label htmlFor="password">Password</label>
            <div className="relative">
                <input
                    className="w-full"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Your password"
                    ref={inputRef}
                    onChange={onChange}
                />
                <img
                    className="absolute mt-1 top-1/2 -translate-y-1/2 right-5 w-6 cursor-pointer"
                    src={iconHide}
                    alt="hide password eye icon"
                    onClick={toggleShowPassword}
                />
            </div>

            <span className="input-error-msg">Your password is incorrect</span>
        </div>
    );
}
