import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CloseIcon } from "../../assets/images/icon_close.svg";
import { BackArrow } from "../icons";
import { useModalContext } from "../../context/ModalContext";

export default function ModalWrapper({
    goBack,
    children,
    maxWidth,
    padding,
    portalModal,
}) {
    let navigate = useNavigate();
    const { setShowModal } = useModalContext();

    React.useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = "unset");
    }, []);

    const closeModal = () => {
        setShowModal(false);

        /* If the modal is for the login portal, navigate to the main page. */
        if (portalModal) {
            navigate("/");
        }
    };

    return (
        <div
            className={`relative flex flex-col bg-white w-4/5 my-auto  rounded-modal shadow-modal ${maxWidth} ${padding}`}
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

ModalWrapper.defaultProps = {
    maxWidth: "max-w-modal",
    padding: "py-15 px-[138px]",
};
