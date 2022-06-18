import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CloseIcon } from "../../assets/images/icon_close.svg";
import { BackArrow } from "../icons";
import { useModalContext } from "../../context/ModalContext";

export default function ModalWrapper({ goBack, children, largeWrapper }) {
    let navigate = useNavigate();
    const { setShowModal } = useModalContext();

    const closeModal = () => {
        setShowModal(false);
        navigate("/");
    };

    return (
        <div
            className={`relative flex flex-col bg-white w-4/5 my-auto  rounded-modal shadow-modal ${
                largeWrapper
                    ? "max-w-modal-lg pt-4 pl-28"
                    : "max-w-modal py-15 px-[138px]"
            }`}
        >
            {children}
            <span
                className="absolute top-7 right-7 cursor-pointer"
                onClick={closeModal}
            >
                <CloseIcon />
            </span>
            {goBack && (
                <span
                    className="absolute top-7 left-7 cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <BackArrow />
                </span>
            )}
        </div>
    );
}
