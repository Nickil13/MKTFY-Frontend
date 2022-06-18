import React from "react";

export default function Button({
    children,
    type,
    color,
    onClick,
    disabled,
    centered,
    margins,
}) {
    return (
        <button
            className={`btn ${
                color === "purple"
                    ? "bg-purple-500 hover:bg-purple-400"
                    : color === "gold" && "bg-gold-200 hover:bg-gold-100"
            } ${centered && "mx-auto"} ${margins && margins}`}
            disabled={disabled}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

Button.defaultProps = {
    type: "button",
    color: "purple",
};
