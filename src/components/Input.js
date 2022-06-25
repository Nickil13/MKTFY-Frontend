import React from "react";

export default function Input({
    name,
    type,
    placeholder,
    value,
    setValue,
    lastchild,
    backgroundColor,
    margins,
    styleClass,
    errorMessage,
}) {
    return (
        <div className={`input-control ${styleClass} ${!lastchild && margins}`}>
            <label className={`capitalize font-semibold mb-3`} htmlFor={name}>
                {name}
            </label>
            <input
                className={`${backgroundColor}`}
                type={type}
                id={name}
                name={name}
                value={value}
                placeholder={placeholder || `Your ${name}`}
                onChange={(e) => setValue(e.target.value)}
            />

            {errorMessage && (
                <span className="input-error-msg">
                    Your {name} is incorrect
                </span>
            )}
        </div>
    );
}

Input.defaultProps = {
    name: "input",
    type: "text",
    margins: "mb-2",
    styleClass: "form-input-style",
};
