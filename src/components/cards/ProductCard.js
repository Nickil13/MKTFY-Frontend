import React from "react";

export default function ProductCard({ Images, ProdName, lastchild }) {
    return (
        <div
            className={`min-w-card  max-w-card h-card-img ${
                !lastchild && "mr-[20px]"
            } rounded-xl overflow-hidden shadow-card`}
        >
            <img
                className="object-cover w-full h-full"
                src={Images[0]}
                alt={ProdName}
                draggable="false"
            />
        </div>
    );
}
