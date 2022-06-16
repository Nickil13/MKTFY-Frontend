import React from "react";
import { useNavigate } from "react-router-dom";
import closeIcon from "../../assets/images/icon_close.svg";
import backIcon from "../../assets/images/icon_right_arrowhead.svg";
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
                    : "max-w-modal py-15 px-32"
            }`}
        >
            {children}
            <span
                className="absolute top-7 right-7 cursor-pointer"
                onClick={closeModal}
            >
                <img src={closeIcon} alt="close x icon" />
            </span>
            {goBack && (
                <span
                    className="absolute top-7 left-7 cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <img src={backIcon} alt="back arrow icon" />
                </span>
            )}
        </div>
    );
}
