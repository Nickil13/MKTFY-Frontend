import React from "react";
import { ReactComponent as CloseIcon } from "../assets/images/orange_close-24.svg";
import { ReactComponent as CameraIcon } from "../assets/images/add_a_photo-24px.svg";

export default function ImageSquare({
    image,
    imageName,
    active,
    handleRemoveImage,
    handleAddImage,
    index,
}) {
    if (active)
        return (
            <div className="relative flex items-center justify-center w-[104px] h-[104px] border border-[#7070704D] rounded overflow-hidden">
                <img
                    className="h-full w-full object-cover"
                    src={image}
                    alt={imageName}
                />
                <button
                    className="absolute top-2.5 right-2.5 cursor-pointer"
                    onClick={() => handleRemoveImage(index)}
                >
                    <CloseIcon />
                </button>
            </div>
        );
    return (
        <button
            className="border border-purple-500 border-dashed rounded p-9 w-[104px] h-[104px] "
            onClick={handleAddImage}
        >
            <CameraIcon />
        </button>
    );
}
