import React, { useState } from "react";
import { ReactComponent as SliderArrow } from "../assets/images/icon_right_arrowhead.svg";

export default function ImageSlider({ images, name }) {
    const [imageIndex, setImageIndex] = useState(0);
    return (
        <div className="flex mx-8 mr-36">
            {/* Image Slider */}
            <div className="flex flex-col items-center  mr-9">
                <SliderArrow className="rotate-90 mb-[10px]" />
                <div className="flex flex-col flex-grow gap-[10px]">
                    {images.length > 0 &&
                        images.map((image, index) => {
                            return (
                                <div
                                    className={`h-[124px] w-[118px]  overflow-hidden shadow-card rounded-[10px] ${
                                        imageIndex === index &&
                                        "border-4 border-purple-400"
                                    }`}
                                    key={index}
                                    onClick={() => setImageIndex(index)}
                                >
                                    <img
                                        className="w-full h-full object-cover"
                                        src={image}
                                        alt={name}
                                    />
                                </div>
                            );
                        })}
                </div>
                <SliderArrow className="-rotate-90 mt-7" />
            </div>
            {/* Main Image */}
            <div className="w-[645px] h-[424px] overflow-hidden rounded-[10px] shadow-card">
                <img
                    className="w-full h-full object-cover"
                    src={images[imageIndex]}
                    alt={name}
                />
            </div>
        </div>
    );
}
