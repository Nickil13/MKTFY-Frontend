import React, { useState, useEffect } from "react";
import { ReactComponent as RightArrow } from "../assets/images/arrow_right-24px.svg";
import { getFAQs } from "../actions/faq";

export default function FAQ() {
    const [activeQIndex, setActiveQIndex] = useState(0);
    const [FAQs, setFAQs] = useState([]);

    useEffect(() => {
        if (FAQs.length < 1) {
            getFAQs().then((faqs) => {
                setFAQs(faqs);
            });
        }
    }, []);

    return (
        <div>
            <h1 className="text-gray-500 font-bold mb-8">
                Frequently Asked Questions
            </h1>
            <div className="flex max-w-[1448px] h-[856px] shadow modal bg-white rounded-10 overflow:hidden">
                {/* List of Questions */}
                <ul className="flex-shrink-0 max-w-[544px] w-full">
                    {FAQs.length > 0 &&
                        FAQs.map((faq, index) => {
                            return (
                                <li
                                    className={`flex justify-between px-5 py-6 font-semibold shadow-[0px_1px_1px_#0000001A] cursor-pointer ${
                                        activeQIndex === index && "bg-beige-200"
                                    }`}
                                    key={index}
                                    onClick={() => setActiveQIndex(index)}
                                >
                                    {faq.title}
                                    <RightArrow />
                                </li>
                            );
                        })}
                </ul>
                {/* Question description */}
                <div className="bg-beige-200 p-10 rounded-tr-[10px] rounded-br-[10px] w-full">
                    <h2 className="text-purple-500 text-lg-36 font-bold mb-5">
                        {FAQs.length > 0 && FAQs[activeQIndex].title}
                    </h2>
                    <div className="text-gray-700 leading-7 text-[15px]">
                        {FAQs.length > 0 && FAQs[activeQIndex].description}
                    </div>
                </div>
            </div>
        </div>
    );
}
