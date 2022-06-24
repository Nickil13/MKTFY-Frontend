import React, { useRef } from "react";

export default function Dropdown({ children, width, showing, setShowing }) {
    const dropdown = useRef(null);

    const handleOffClick = (e) => {
        if (dropdown.current && !dropdown.current.contains(e.target)) {
            setShowing(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", handleOffClick);
        return () => document.removeEventListener("mousedown", handleOffClick);
    }, []);

    return (
        <div
            className={`absolute top-16 right-[42px] bg-white shadow-dropdown rounded ${width} transition-all duration-500 ${
                showing ? "opacity-1" : "opacity-0"
            }`}
            ref={dropdown}
        >
            <div className="absolute -top-[19px] right-[30px] w-0 h-0 border-[10px] border-x-transparent border-b-white border-t-transparent"></div>
            {children}
        </div>
    );
}
