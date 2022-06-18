import React from "react";
import PP from "../data/PP";
import { BackArrow, Logo } from "../components/icons";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
    let navigate = useNavigate();
    return (
        <div>
            <div className="bg-about-header bg-no-repeat bg-cover px-36 pt-20 pb-60">
                <Logo width="w-56" />
            </div>
            <div className="relative flex items-center content-center w-full px-36 ">
                <button
                    className="absolute top-[76px]"
                    onClick={() => navigate(-1)}
                >
                    <BackArrow />
                </button>

                <div className="my-15 max-w-[1084px] mx-auto ">
                    <h1 className="mb-15 font-bold text-center text-gray-600">
                        MKTFY Privacy Policy
                    </h1>
                    {PP?.map((para, index) => {
                        return (
                            <p
                                className="text-base font-semibold text-gray-300 mb-8"
                                key={index}
                            >
                                {para}
                            </p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
