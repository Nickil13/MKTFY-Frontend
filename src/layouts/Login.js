import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useModalContext } from "../context/ModalContext";
import { Logo } from "../components/icons";
import { useUserContext } from "../context/UserContext";

export default function Login() {
    const { showModal, setShowModal } = useModalContext();
    const { isAuthenticated, error, setError } = useUserContext();
    let navigate = useNavigate();
    let location = useLocation();

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
            if (showModal) {
                setShowModal(false);
            }
        }
    }, [isAuthenticated]);

    React.useEffect(() => {
        /* When returning to this route or if there is an error,
         check if the route includes a modal.
        If so and the modal is not showing, show it.*/
        if (location.pathname.length > 1 && !showModal) {
            setShowModal(true);
        }
    }, [location, error]);

    React.useEffect(() => {
        // If there are any outstanding errors, clear them when the location changes.
        error && setError("");
    }, [location]);

    return (
        <div className="bg-login-clouds bg-cover bg-no-repeat h-screen">
            <div className="flex flex-col justify-center items-center h-screen pt-24 w-4/5 mx-auto">
                <Logo width="w-64" fill="fill-purple-200" />

                <div className="flex flex-col items-center mt-14 w-full">
                    <button
                        className="btn-gold mb-4 md:w-btn"
                        onClick={() => navigate("login")}
                    >
                        Login
                    </button>
                    <button
                        className="btn-purple md:w-btn"
                        onClick={() => navigate("register")}
                    >
                        Create Account
                    </button>
                </div>
                <div className="text-center mt-10 md:mt-0 md:text-start md:absolute left-20 bottom-10 text-sm-17">
                    <p className="text-white">
                        Find out more about us!
                        <br className="md:hidden" />
                        <a href="#" className="text-gold-200 font-bold ml-1">
                            Visit our website
                        </a>
                    </p>
                </div>
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
