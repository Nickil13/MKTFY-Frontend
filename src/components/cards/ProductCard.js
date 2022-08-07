import React from "react";

export default function ProductCard({ images, prodName, lastchild }) {
    return (
        <div
            className={`min-w-card  max-w-card h-card-img ${
                !lastchild && "mr-[20px]"
            } rounded-xl overflow-hidden shadow-card`}
        >
            <img
                className="object-cover w-full h-full"
                src={images[0]}
                alt={prodName}
                draggable="false"
            />
        </div>
    );
}
