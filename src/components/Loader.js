import React from "react";

export default function Loader() {
    return (
        <div className="fixed inset-0 z-[99999] bg-[#000000]/10 flex items-center justify-center">
            <div className="w-[100px] h-[100px] rounded-full bg-purple-600 text-[4rem] text-white text-center">
                ...
            </div>
        </div>
    );
}
