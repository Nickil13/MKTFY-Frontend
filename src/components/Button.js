import React from "react";

export default function Button({
    children,
    type,
    color,
    width,
    onClick,
    disabled,
    centered,
    margins,
    padding,
    fontSize,
}) {
    return (
        <button
            className={`btn ${width} ${padding} ${fontSize} ${
                color === "purple"
                    ? "bg-purple-500 hover:bg-purple-400"
                    : color === "gold"
                    ? "bg-gold-200 hover:bg-gold-100"
                    : "bg-transparent text-[#969696] border border-[#969696] shadow-none"
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
    width: "w-btn",
    padding: "py-5",
    fontSize: "text-base",
};
