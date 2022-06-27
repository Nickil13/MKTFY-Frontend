import React, { useRef } from "react";
import { ReactComponent as IconHide } from "../../assets/images/icon_eye_hide.svg";

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

    const toggleShowPassword = () => {
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
                    className="w-full text-gray-600 font-[Verdana] placeholder:font-['Open_Sans']"
                    type="password"
                    id={name}
                    name={name}
                    value={value}
                    placeholder="Your password"
                    ref={inputRef}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                <IconHide
                    className="absolute mt-1 top-1/2 -translate-y-1/2 right-5 w-6 cursor-pointer fill-gray-300"
                    onClick={toggleShowPassword}
                />
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
