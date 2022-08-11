import React from "react";
import { ReactComponent as CameraIcon } from "../assets/images/add_a_photo-24px.svg";
import ImageSquare from "./ImageSquare";
import { ReactComponent as CloseIcon } from "../assets/images/orange_close-24.svg";
import { useModalContext } from "../context/ModalContext";

export default function ListingImages({ images, handleRemoveImage }) {
    const { setShowModal } = useModalContext();
    return (
        <div className="flex flex-col items-center bg-white p-8">
            {/* Main Image */}
            {images.length === 0 ? (
                <div className="flex items-center justify-center w-[480px] h-[320px] border-purple-500 border border-dashed rounded bg-beige-200">
                    <button onClick={() => setShowModal(true)}>
                        <CameraIcon className="mx-auto mb-2 w-[42px] h-[38px]" />
                        <p className="text-xs text-purple-500">
                            Choose or drag up to 5 photos
                        </p>
                    </button>
                </div>
            ) : (
                <div className="relative flex items-center justify-center w-[480px] h-[320px] border-[#7070704D] border rounded overflow-hidden">
                    <img
                        className="h-full w-full object-cover"
                        src={images[0]}
                        alt={"image"}
                    />
                    <button
                        className="absolute top-7 right-7 cursor-pointer"
                        onClick={() => handleRemoveImage(0)}
                    >
                        <CloseIcon />
                    </button>
                </div>
            )}
            {/* Other Images */}
            <div className="flex gap-5 mt-4">
                {[...Array(4)].map((item, index) => {
                    return (
                        <ImageSquare
                            image={images[index + 1]}
                            onClick={() => handleRemoveImage(index + 1)}
                            handleAddImage={() => setShowModal(true)}
                            key={index}
                        />
                    );
                })}
            </div>
        </div>
    );
}
