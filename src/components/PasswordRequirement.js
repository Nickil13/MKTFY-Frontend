import React from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function PasswordRequirement({
    children,
    requirement,
    lastchild,
}) {
    return (
        <div className={`flex items-center ${!lastchild && "mb-3"}`}>
            <FaCheckCircle
                className={`${
                    requirement ? "text-purple-200" : "text-gray-100"
                } w-5 h-5 mr-3`}
            />
            <span className="text-gray-500">{children}</span>
        </div>
    );
}
