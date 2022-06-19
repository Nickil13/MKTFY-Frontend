import React from "react";

export default function SectionWrapper({ title, children, margins }) {
    return (
        <section
            className={`relative px-5 p-7 bg-white rounded h-section ${margins}`}
        >
            <h2 className="text-base font-semibold">{title}</h2>
            {children}
        </section>
    );
}
