import React from "react";
import { getMaxInputLength } from "../../utils/helpers";

export default function LoginInput({
    name,
    type,
    placeholder,
    value,
    setValue,
    lastchild,
    backgroundColor,
    errorMessage,
    errorMessageText,
    invalid,
    onBlur,
}) {
    const maxLength = React.useMemo(() => getMaxInputLength(name), [name]);
    return (
        <div className={`input-control  ${!lastchild && "mb-4"}`}>
            <label
                className={`capitalize font-semibold mb-3 ${
                    invalid && "text-red"
                }`}
                htmlFor={name}
            >
                {name}
            </label>
            <input
                className={`base-input mb-2 py-5 px-6 text-base placeholder:text-gray-200 font-semibold text-gray-500 ${backgroundColor} ${
                    invalid && "border-red"
                }`}
                type={type}
                id={name}
                name={name}
                maxLength={maxLength}
                value={value}
                placeholder={placeholder || `Your ${name}`}
                onChange={(e) => setValue(e.target.value)}
                onBlur={onBlur}
            />

            {errorMessage && (
                <span
                    className={`text-xs ${
                        invalid ? "text-red" : "text-transparent"
                    }`}
                >
                    {errorMessageText
                        ? errorMessageText
                        : `Your ${name} is incorrect`}
                </span>
            )}
        </div>
    );
}

LoginInput.defaultProps = {
    name: "input",
    type: "text",
};
