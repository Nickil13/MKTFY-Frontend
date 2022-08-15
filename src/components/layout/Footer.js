import React from "react";
import { Link } from "react-router-dom";
import MktfyWordmark from "../../assets/images/MKTFY_wordmark.svg";
import { FOOTER_LINKS } from "../../data/variables";

export default function Footer() {
    return (
        <footer className="absolute bottom-0 w-full bg-login-clouds h-footer bg-cover bg-cloud-position">
            {/* Background overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b  from-[#000000] h-full"></div>
            <div className="absolute flex flex-col inset-0 bg-[#000000]/70 h-full ">
                <div className="px-10 xlg:px-32 pt-28 flex-grow">
                    <div className="flex flex-col lg:flex-row gap-1">
                        {/* Logo & motto*/}
                        <div className="xlg:w-footer-column xlg:mr-40">
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
                        <div className="flex">
                            <div className="w-footer-column mt-16">
                                <h2 className="text-base font-semibold text-white mb-11">
                                    Jump To
                                </h2>
                                <ul className="text-white text-sm-17">
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

                            {/* Contact info/location*/}
                            <div className="w-footer-column mt-16">
                                <h2 className="text-base font-semibold text-white mb-11">
                                    MKTFY
                                </h2>
                                <ul className="text-white text-sm-17">
                                    <li className="mb-7 text-gold-200">
                                        <Link to="/contact-us">Contact Us</Link>
                                    </li>
                                    <li className="mb-7">+1 888 345 6789</li>
                                    <li className="mb-7">
                                        Suite 9, 123 1st Street SW, Calgary,
                                        Alberta T2T 7F7
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider and copyright*/}
                <div className="bg-transparent p-8 text-center border-t border-gray-footer-border w-full max-w-[1138px] mx-auto mt-14">
                    <p className="text-gray-footer text-sm-17">
                        Copyright @Launchpad by Vog 2021
                    </p>
                </div>
            </div>
        </footer>
    );
}
