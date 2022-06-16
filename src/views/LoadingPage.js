import React, { useEffect, useRef } from "react";
import logo from "../assets/images/logo.svg";
import lottie from "lottie-web";
import animationData from "../assets/animations/loading_animation.json";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoadingPage() {
    const animation = useRef(null);
    let navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: animation.current,
            renderer: "svg",
            loop: false,
            autoplay: true,
            animationData: animationData,
        });
        anim.onComplete = () => handleAnimationComplete();
        return () => lottie.stop();
    }, []);

    const handleAnimationComplete = () => {
        let from = location.state?.prevPath || "/";
        if (from === "/create-password") {
            navigate("/dashboard");
        } else if (from === "/reset-password") {
            navigate("/login");
        }
    };
    return (
        <div className="bg-login-clouds bg-cover bg-no-repeat h-screen">
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="w-[352px] h-[352px]" ref={animation}></div>
            </div>
        </div>
    );
}
