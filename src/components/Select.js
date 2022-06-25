import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as DropdownArrow } from "../assets/images/dropdown.svg";

export default function Select({
    name,
    options,
    bg,
    phcolor,
    width,
    value,
    setValue,
    preselected,
    styleClass,
    margins,
}) {
    const [showOptions, setShowOptions] = useState(false);
    const select = useRef(null);

    useEffect(() => {
        document.addEventListener("mousedown", handleOffClick);
        return () => document.removeEventListener("mousedown", handleOffClick);
    }, []);

    const handleOffClick = (e) => {
        if (select.current && !select.current.contains(e.target)) {
            setShowOptions(false);
        }
    };
    const handleOptionClick = (option) => {
        setValue(option);
        setShowOptions(false);
    };

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };
    return (
        <div
            className={`relative ${styleClass} ${
                width === "1/2" ? "w-1/2" : "w-full"
            } ${margins}`}
            ref={select}
        >
            <label htmlFor={name} className="capitalize semibold">
                {name}
            </label>
            <div
                className={`base-input mb-1 mt-2.5 relative cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap p-0 ${bg}`}
            >
                <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={toggleOptions}
                    className={`w-full ${
                        styleClass === "listing-input-style"
                            ? "listing-select-btn"
                            : "select-btn"
                    }  ${
                        value && "capitalize"
                    } text-left p-[16px] border-[3px] rounded ${
                        showOptions ? "border-purple-200" : "border-transparent"
                    } ${!value && phcolor} `}
                    onClick={toggleOptions}
                >
                    {value
                        ? value
                        : !preselected
                        ? `Select a ${name}`
                        : options[0]}
                </button>

                <DropdownArrow
                    className={`absolute top-1/2 -translate-y-1/2 right-4 pointer-events-none fill-purple-400 ${
                        showOptions && "rotate-180"
                    }`}
                />
            </div>
            <ul
                className={`absolute bg-white w-full top-full l-0 r-0 z-10 shadow-dropdown rounded-md mt-1 ${
                    !showOptions && "hidden"
                }`}
            >
                {options.length > 0 &&
                    options.map((option, index) => {
                        return (
                            <li
                                className={`p-5 cursor-pointer hover:bg-beige-200 capitalize text-base ${
                                    value === option && "text-purple-100"
                                }`}
                                key={index}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}

Select.defaultProps = {
    bg: "bg-white",
    phcolor: "text-gray-700",
    options: [],
};
