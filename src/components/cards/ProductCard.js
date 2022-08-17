import React from "react";

export default function ProductCard({ prodName, uploadUrls }) {
    return (
        <div
            className={`min-w-card w-full md:max-w-card h-card-img  rounded-xl overflow-hidden shadow-card`}
        >
            <img
                className="object-cover w-full h-full"
                src={uploadUrls.length > 0 ? uploadUrls[0] : ""}
                alt={prodName}
                draggable="false"
            />
        </div>
    );
}
