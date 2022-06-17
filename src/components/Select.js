import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as DropdownArrow } from "../assets/images/dropdown.svg";

export default function Select({
    name,
    options,
    bg,
    phtext,
    width,
    value,
    setValue,
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
            className={`relative ${width === "1/2" ? "w-1/2" : "w-full"}`}
            ref={select}
        >
            <label htmlFor={name} className="capitalize">
                {name}
            </label>
            <div
                className={`relative custom-select cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap p-0 ${bg} ${
                    !value && phtext
                }`}
            >
                <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={toggleOptions}
                    className={`w-full text-left p-[17px] border-[3px] border-transparent rounded  ${
                        showOptions && "border-purple-200"
                    }`}
                    onClick={toggleOptions}
                >
                    {value || options[0]}
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
                                className={`p-5 text-base cursor-pointer hover:bg-beige-200
                                            ${
                                                value === option
                                                    ? "text-purple-100"
                                                    : ""
                                            }
                                        `}
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
    phtext: "text-gray-700",
    options: [],
};
