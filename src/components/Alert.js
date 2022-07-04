import React from "react";

const ALERT_TYPES_INFO = [
    {
        alertType: "cancel-listing",
        message: "You are about to cancel your listing. Are you sure?",
        confirmBtnText: "Yes",
        cancelBtnText: "Cancel",
    },
    {
        alertType: "change-password",
        message: "Something happened and your password hasn’t been changed",
        confirmBtnText: "Try again",
        cancelBtnText: "Cancel",
    },
];
export default function Alert({ alertType, onConfirm, onCancel }) {
    const info = ALERT_TYPES_INFO.find(
        (info) => info.alertType === alertType
    ) || {
        message: "Alert",
        confirmBtnText: "Yes",
        cancelBtnText: "Cancel",
    };
    return (
        <div className="bg-white rounded-[10px] py-7 px-12 max-w-[394px]">
            <h2 className="text-base font-bold text-[#313131] mb-1">
                Heads Up!
            </h2>
            <p className="text-base text-[#313131] mb-5">{info.message}</p>
            <div className="flex gap-4">
                <button
                    className="rounded-full bg-gray-100 p-3.5 w-[143px] text-gray-footer font-semibold text-sm-17"
                    onClick={onCancel}
                >
                    {info.cancelBtnText}
                </button>

                <button
                    className="rounded-full bg-purple-500 hover:bg-purple-400 p-3.5 w-[143px] text-white  font-semibold text-sm-17"
                    onClick={onConfirm}
                >
                    {info.confirmBtnText}
                </button>
            </div>
        </div>
    );
}
