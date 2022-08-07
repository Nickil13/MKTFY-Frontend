import React from "react";
import GooglePlay from "../assets/images/Google Play.svg";
import AppStore from "../assets/images/App Store.svg";

export default function AppBanner() {
    return (
        <div className="flex bg-mobile-banner bg-no-repeat 2xl:h-[545.7px] h-[800px] bg-banner-position bg-cover 2xl:bg-auto">
            <div className="ml-auto mt-auto 2xl:mb-[74px] 2xl:mr-[74px] 2xl:w-[875px] flex flex-col xlg:flex-row justify-end 2xl:block w-full bg-gradient-to-t from-[#000000] to-[#000000]/50 p-5 2xl:p-0 2xl:bg-none 2xl:h-auto">
                <div className="xlg:mr-10 2xl:mr-0">
                    <h2 className="text-white text-lg-36 lg:text-lg font-bold mb-2">
                        Bring your market with you
                    </h2>
                    <p className="text-white text-base font-semibold mb-7">
                        Buy and sell on our MKTFY app while you're on the go!
                    </p>
                </div>
                <div className="flex flex-col flex-wrap md:flex-row gap-5 lg:gap-0">
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
