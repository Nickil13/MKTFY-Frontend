import React, { useState, useRef } from "react";
import { ReactComponent as IconHide } from "../../assets/images/icon_eye_hide.svg";
import { FaEye } from "react-icons/fa";

export default function PasswordInput({
    value,
    onChange,
    name,
    lastchild,
    errorMessage,
    onBlur,
    invalid,
}) {
    const inputRef = useRef(null);
    const [passwordShowing, setPasswordShowing] = useState(false);
    const toggleShowPassword = () => {
        setPasswordShowing(!passwordShowing);
        if (inputRef) {
            if (inputRef.current.type === "password") {
                inputRef.current.type = "text";
                inputRef.current.style.fontFamily = "Open Sans";
            } else {
                inputRef.current.type = "password";
                inputRef.current.style.fontFamily = "Verdana";
            }
        }
    };

    return (
        <div
            className={`input-control form-input-style ${!lastchild && "mb-4"}`}
        >
            <label className="capitalize font-semibold mb-3" htmlFor="password">
                {name}
            </label>
            <div className="relative">
                <input
                    className="w-full text-gray-600d font-[Verdana] placeholder:font-['Open_Sans']"
                    type="password"
                    id={name}
                    name={name}
                    value={value}
                    placeholder="Your password"
                    ref={inputRef}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                {passwordShowing ? (
                    <FaEye
                        className="absolute top-1/2 -translate-y-1/2 right-5 text-[22px] cursor-pointer text-gray-300"
                        onClick={toggleShowPassword}
                    />
                ) : (
                    <IconHide
                        className="absolute top-1/2 -translate-y-1/2 right-5 w-6 cursor-pointer fill-gray-300"
                        onClick={toggleShowPassword}
                    />
                )}
            </div>

            {errorMessage && (
                <span
                    className={`text-xs ${
                        invalid ? "text-red" : "text-transparent"
                    }`}
                >
                    Passwords do not match
                </span>
            )}
        </div>
    );
}

PasswordInput.defaultProps = {
    name: "password",
};
