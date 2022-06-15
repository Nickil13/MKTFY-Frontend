import React from "react";

export default function Input({
    name,
    type,
    placeholder,
    value,
    setValue,
    lastchild,
}) {
    return (
        <div className={`input-control ${!lastchild && "mb-2"}`}>
            <label className="capitalize" htmlFor={name}>
                {name}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                placeholder={placeholder || `Your ${name}`}
                onChange={(e) => setValue(e.target.value)}
            />
            <span className="input-error-msg">Your {name} is incorrect</span>
        </div>
    );
}

Input.defaultProps = {
    name: "input",
    type: "text",
};
