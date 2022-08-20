import React, { useRef } from "react";

export default function Dropdown({
    children,
    width,
    pos,
    showing,
    setShowing,
    arrowRight,
}) {
    const dropdown = useRef(null);
    const handleOffClick = (e) => {
        // Off-click to close dropdown
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
            className={`absolute ${pos} bg-white rounded shadow-dropdown-arrow ${width}  ${
                showing ? "block" : "hidden"
            }`}
            ref={dropdown}
        >
            {/* Top arrow */}
            <div
                className={`absolute -top-[19px] ${
                    arrowRight ? "right-[30px]" : "left-[30px]"
                } w-0 h-0 border-[10px] border-x-transparent border-b-white border-t-transparent z-10`}
            ></div>
            {/* Arrow underneath to create a box shadow */}
            <div
                className={`absolute -top-[22px] ${
                    arrowRight ? "right-[28px]" : "left-[28px]"
                } w-0 h-0 border-[11px] border-x-transparent border-b-[#00000010] border-t-transparent`}
            ></div>
            {children}
        </div>
    );
}
