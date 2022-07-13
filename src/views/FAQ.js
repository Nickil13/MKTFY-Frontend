import React, { useState } from "react";
import { ReactComponent as RightArrow } from "../assets/images/arrow_right-24px.svg";
import { dummyFAQs } from "../data/dummyFAQs";

export default function FAQ() {
    const [activeQIndex, setActiveQIndex] = useState(0);
    return (
        <div>
            <h1 className="text-gray-500 font-bold mb-8">
                Frequently Asked Questions
            </h1>
            <div className="flex max-w-[1448px] h-[856px] shadow modal bg-white rounded-[10px] overflow:hidden">
                {/* List of Questions */}
                <ul className="flex-shrink-0 max-w-[544px] w-full">
                    {dummyFAQs.map((faq, index) => {
                        return (
                            <li
                                className={`flex justify-between px-5 py-6  font-semibold shadow-[0px_1px_1px_#0000001A] ${
                                    activeQIndex === index && "bg-beige-200"
                                }`}
                                key={index}
                                onClick={() => setActiveQIndex(index)}
                            >
                                {faq.question}
                                <RightArrow />
                            </li>
                        );
                    })}
                </ul>
                {/* Question description */}
                <div className="bg-beige-200 p-10 rounded-tr-[10px] rounded-br-[10px] w-full">
                    <h2 className="text-purple-500 text-lg-36 font-bold mb-5">
                        {dummyFAQs[activeQIndex].question}
                    </h2>
                    <div className="text-gray-700 leading-7 text-[15px]">
                        {dummyFAQs[activeQIndex].answer.map((p, index) => {
                            return (
                                <p className="mb-5" key={index}>
                                    {p}
                                </p>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
