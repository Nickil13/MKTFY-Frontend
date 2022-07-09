import React, { useEffect, useRef } from "react";
import { Logo } from "../components/icons";
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
        let redirectedPath = location.state?.redirect || "/";
        navigate(redirectedPath);
    };
    return (
        <div className="relative bg-login-clouds bg-cover bg-no-repeat h-screen">
            <div className="absolute t-0 l-0 pt-20 pl-36">
                <Logo width="w-56" fill="fill-purple-200" />
            </div>

            <div className="flex flex-col items-center justify-center h-screen ">
                <div className="w-[352px] h-[352px]" ref={animation}></div>
            </div>
        </div>
    );
}
