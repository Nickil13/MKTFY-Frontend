import React, { useState, useEffect } from "react";

export default function ScrollBox({ children, className }) {
    const scrollBox = React.useRef();
    const [mouseDown, setMouseDown] = useState(false);
    const [pos, setPos] = useState({ top: 0, left: 0, x: 0, y: 0 });

    const mouseDownHandler = (e) => {
        let ele = scrollBox.current;
        if (ele && ele.contains(e.target)) {
            const newPos = {
                left: ele.scrollLeft,
                top: ele.scrollTop,
                x: e.clientX,
                y: e.clientY,
            };
            setPos({ ...newPos });
            ele.style.cursor = "grabbing";
            ele.style.userselect = "none";

            setMouseDown(true);
        }
    };
    const mouseMoveHandler = (e) => {
        let ele = scrollBox.current;
        if (ele) {
            const dx = e.clientX - pos.x;
            const dy = e.clientY - pos.y;

            // Scroll
            ele.scrollTop = pos.top - dy;
            ele.scrollLeft = pos.left - dx;
        }
    };

    const mouseUpHandler = () => {
        let ele = scrollBox.current;
        if (ele) {
            ele.style.cursor = "grab";
            ele.style.removeProperty("user-select");
            setMouseDown(false);
        }
    };

    useEffect(() => {
        if (mouseDown) {
            document.addEventListener("mousemove", mouseMoveHandler);
        }
        return () =>
            document.removeEventListener("mousemove", mouseMoveHandler);
    }, [mouseDown]);

    useEffect(() => {
        if (mouseDown) {
            document.addEventListener("mouseup", mouseUpHandler);
        }
        return () => document.removeEventListener("mouseup", mouseUpHandler);
    }, [mouseDown]);

    useEffect(() => {
        document.addEventListener("mousedown", mouseDownHandler);
        return () =>
            document.removeEventListener("mousedown", mouseDownHandler);
    }, []);

    return (
        <div
            className={`flex bg-white overflow-x-auto py-5 hide-scrollbar cursor-grab select-none ${className}`}
            ref={scrollBox}
        >
            {children}
        </div>
    );
}
