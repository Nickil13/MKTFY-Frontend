import React from "react";

export default function NewAlert({
    title,
    message,
    cancelBtnText,
    confirmBtnText,
    onConfirm,
    onCancel,
}) {
    return (
        <div className="fixed flex items-center justify-center inset-0 bg-black bg-opacity-50 h-screen z-[70]">
            <div className="bg-white rounded-10 py-7 px-12 max-w-[394px]">
                <h2 className="text-base font-bold text-[#313131] mb-1">
                    {title}
                </h2>
                <p className="text-base text-[#313131] mb-5">{message}</p>
                <div className="flex gap-4">
                    <button
                        className="rounded-full bg-gray-100 p-3.5 w-[143px] text-gray-footer font-semibold text-sm-17"
                        onClick={onCancel}
                    >
                        {cancelBtnText}
                    </button>

                    <button
                        className="rounded-full bg-purple-500 hover:bg-purple-400 p-3.5 w-[143px] text-white  font-semibold text-sm-17"
                        onClick={onConfirm}
                    >
                        {confirmBtnText}
                    </button>
                </div>
            </div>
        </div>
    );
}

NewAlert.propTypes = {
    title: "Heads Up!",
    cancelBtnText: "Cancel",
};
