import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useModalContext } from "../context/ModalContext";
import { Button } from "../components";
import { Logo } from "../components/icons";
import { useUserContext } from "../context/UserContext";

export default function Login() {
    const { showModal, setShowModal } = useModalContext();
    const { isAuthenticated } = useUserContext();
    let navigate = useNavigate();
    let location = useLocation();

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated]);

    React.useEffect(() => {
        // When returning to this route, check if the route includes a modal
        // If so and the modal is not showing, show it.
        if (location.pathname.length > 1 && !showModal) {
            setShowModal(true);
        }
    }, [location]);

    return (
        <div className="bg-login-clouds bg-cover bg-no-repeat h-screen">
            <div className="flex flex-col justify-center items-center w-full h-screen pt-24">
                <Logo width="w-64" />

                <div className="flex flex-col mt-14">
                    <Button
                        margins="mb-4"
                        color="gold"
                        onClick={() => navigate("login")}
                    >
                        Login
                    </Button>
                    <Button onClick={() => navigate("register")}>
                        Create Account
                    </Button>
                </div>
            </div>
            <div className="absolute left-20 bottom-10 text-sm-17">
                <p className="text-white">
                    Find out more about us!
                    <a href="" className="text-gold-200 font-bold ml-1">
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
