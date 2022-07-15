import React from "react";

export default function Button({
    children,
    type,
    color,
    width,
    maxWidth,
    onClick,
    disabled,
    centered,
    margins,
    padding,
    fontSize,
}) {
    return (
        <button
            className={`btn w-full ${maxWidth} ${width} ${padding} ${fontSize} ${
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
    width: "2xl:w-btn",
    maxWidth: "max-w-btn",
    padding: "py-[19px]",
    fontSize: "text-base",
};
