import React from "react";
import GooglePlay from "../assets/images/Google Play.svg";
import AppStore from "../assets/images/App Store.svg";

export default function AppBanner() {
    return (
        <div className="flex bg-mobile-banner h-[545.7px]">
            <div className="ml-auto mt-auto m-[74px] w-[875px]">
                <h2 className="text-white text-lg font-bold mb-2">
                    Bring your market with you
                </h2>
                <p className="text-white text-base font-semibold mb-7">
                    Buy and sell on our MKTFY app while you're on the go!
                </p>
                <div className="flex">
                    <a href="">
                        <img
                            className="mr-7"
                            src={GooglePlay}
                            alt="Google play download button"
                        />
                    </a>
                    <a href="">
                        <img src={AppStore} alt="App Store download button" />
                    </a>
                </div>
            </div>
        </div>
    );
}
