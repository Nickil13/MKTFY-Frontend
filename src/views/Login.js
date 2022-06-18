import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useModalContext } from "../context/ModalContext";
import { Button } from "../components";
import { Logo } from "../components/icons";

export default function Login() {
    const { showModal, setShowModal } = useModalContext();
    let navigate = useNavigate();

    const handleLoginClick = () => {
        setShowModal(true);
        navigate("/login");
    };

    const handleCreateAccountClick = () => {
        setShowModal(true);
        navigate("/register");
    };

    return (
        <div className="bg-login-clouds bg-cover bg-no-repeat h-screen">
            <div className="flex flex-col justify-center items-center w-full h-screen pt-24">
                <Logo width="w-64" />

                <div className="flex flex-col mt-14">
                    <Button
                        margins="mb-4"
                        color="gold"
                        onClick={handleLoginClick}
                    >
                        Login
                    </Button>
                    <Button onClick={handleCreateAccountClick}>
                        Create Account
                    </Button>
                </div>
            </div>
            <div className="absolute left-20 bottom-10 text-sm-17">
                <p className="text-white">
                    Find out more about us!
                    <a href="#" className="text-gold-200 font-bold ml-1">
                        Visit our website
                    </a>
                </p>
            </div>
            {/* Login Modal */}
            {showModal && (
                <div className="absolute flex items-center justify-center inset-0 bg-black bg-opacity-50">
                    <Outlet />
                </div>
            )}
        </div>
    );
}
