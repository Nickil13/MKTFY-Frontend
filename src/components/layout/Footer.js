import React from "react";
import { Link } from "react-router-dom";
import MktfyWordmark from "../../assets/images/MKTFY_wordmark.svg";

export default function Footer() {
    return (
        <footer className="relative bg-login-clouds h-[609px] bg-cover bg-top">
            <div className="absolute inset-0 bg-gradient-to-b from-[#000000]  h-full"></div>

            <div className="absolute flex flex-col inset-0 bg-[#000000]/70  h-full ">
                <div className="px-32 pt-28">
                    <div className="grid grid-cols-3 gap-3">
                        {/* Logo & motto*/}
                        <div className="max-w-[270px]">
                            <img
                                className="w-36 mb-11"
                                src={MktfyWordmark}
                                alt="mktfy wordmark"
                            />
                            <p className="text-gray-100 text-base">
                                Here at MKTFY we are human centric. We believe
                                the stuff we buy, share and give are the
                                backbone of our society — and we hope to ensure
                                that we do this in a conscious way.
                            </p>
                        </div>
                        {/*Sitemap */}
                        <div className="max-w-[270px] mt-20">
                            <h2 className="text-base font-semibold text-white mb-11">
                                Jump To
                            </h2>
                            <ul className="text-white text-sm-17">
                                <li className="mb-7">
                                    <Link to="/account-info">
                                        Account Information
                                    </Link>
                                </li>
                                <li className="mb-7">
                                    <Link to="/terms-of-service">
                                        Terms &amp; Services
                                    </Link>
                                </li>
                                <li className="mb-7">
                                    <Link to="/privacy-policy">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li className="mb-7">
                                    <Link to="/faq">FAQ</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact info/location*/}
                        <div className="max-w-[270px] mt-20">
                            <h2 className="text-base font-semibold text-white mb-11">
                                MKTFY
                            </h2>
                            <ul className="text-white text-sm-17">
                                <li className="mb-7 text-gold-200">
                                    <Link to="/contact-us">Contact Us</Link>
                                </li>
                                <li className="mb-7">+1 888 345 6789</li>
                                <li className="mb-7">
                                    Suite 9, 123 1st Street SW, Calgary, Alberta
                                    T2T 7F7
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="bg-transparent p-8 text-center border-t border-gray-footer-border w-full max-w-[1138px] m-auto">
                    {/* Divider and copyright*/}
                    <p className="text-gray-footer text-sm-17">
                        Copyright @Launchpad by Vog 2021
                    </p>
                </div>
            </div>
        </footer>
    );
}
