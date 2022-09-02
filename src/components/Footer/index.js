import React from "react";
import { Link } from "react-router-dom";
import MktfyWordmark from "../../assets/images/MKTFY_wordmark.svg";
import { FOOTER_LINKS } from "../../data/variables";

export default function Footer() {
    return (
        <footer className="absolute bottom-0 w-full bg-login-clouds h-footer-mobile md:h-footer-mid lg:h-footer-desktop bg-cover bg-cloud-position">
            {/* Background overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#000000] h-full"></div>
            <div className="absolute flex flex-col inset-0 bg-[#000000]/70 h-full ">
                <div className="container divide-y-2 divide-gray-footer-border pt-28 ">
                    <div className="text-white">
                        <div>
                            <img
                                className="w-36 mb-11"
                                src={MktfyWordmark}
                                alt="mktfy wordmark"
                            />
                        </div>
                        <div className="flex flex-col lg:flex-row">
                            <div className="w-footer-column mr-20 xlg:mr-40">
                                <p className="text-gray-100 text-base">
                                    Here at MKTFY we are human centric. We
                                    believe the stuff we buy, share and give are
                                    the backbone of our society — and we hope to
                                    ensure that we do this in a conscious way.
                                </p>
                            </div>
                            <div className="flex flex-col flex-grow md:flex-row">
                                <div className="w-full max-w-footer-column mt-20 lg:mt-0">
                                    <h2 className="text-base font-semibold mb-11">
                                        Jump To
                                    </h2>
                                    <ul className="text-sm-17">
                                        {FOOTER_LINKS.map(
                                            ({ name, path }, index) => {
                                                return (
                                                    <li
                                                        className="mb-7"
                                                        key={index}
                                                    >
                                                        <Link to={path}>
                                                            {name}
                                                        </Link>
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                </div>
                                <div className="w-full max-w-footer-column mt-20 lg:mt-0">
                                    <h2 className="text-base font-semibold mb-11">
                                        MKTFY
                                    </h2>
                                    <ul className="flex flex-col gap-7 text-sm-17">
                                        <li className=" text-gold-200">
                                            <Link to="/contact-us">
                                                Contact Us
                                            </Link>
                                        </li>
                                        <li>+1 888 345 6789</li>
                                        <li>
                                            Suite 9, 123 1st Street SW, Calgary,
                                            Alberta T2T 7F7
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 text-center w-full max-w-[1138px] mx-auto mt-14">
                        <p className="text-gray-footer text-sm-17">
                            Copyright @Launchpad by Vog 2021
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
