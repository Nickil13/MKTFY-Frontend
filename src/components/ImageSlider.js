import React, { useState } from "react";
import { ReactComponent as SliderArrow } from "../assets/images/icon_right_arrowhead.svg";

export default function ImageSlider({ images, name }) {
    const [imageIndex, setImageIndex] = useState(0);

    const increaseIndex = () => {
        setImageIndex(imageIndex - 1 >= 0 ? imageIndex - 1 : images.length - 1);
    };

    const decreaseIndex = () => {
        setImageIndex(imageIndex + 1 <= images.length - 1 ? imageIndex + 1 : 0);
    };

    return (
        <div className="flex mx-8 mr-36">
            {/* Image Slider */}
            <div className="flex flex-col items-center  mr-9">
                <SliderArrow
                    className="rotate-90 mb-2.5"
                    onClick={increaseIndex}
                />
                <div className="flex flex-col flex-grow gap-[10px]">
                    {images.length > 0 &&
                        images.map((image, index) => {
                            return (
                                <div
                                    className={`h-[124px] w-[118px]  overflow-hidden  rounded-[10px] ${
                                        imageIndex === index &&
                                        "border border-purple-200 shadow-card"
                                    }`}
                                    key={index}
                                    onClick={() => setImageIndex(index)}
                                >
                                    <img
                                        className="w-full h-full object-cover "
                                        src={image}
                                        alt={name}
                                    />
                                </div>
                            );
                        })}
                </div>
                <SliderArrow
                    className="-rotate-90 mt-7"
                    onClick={decreaseIndex}
                />
            </div>
            {/* Main Image */}
            <div>
                <div className="w-[645px] h-[424px] overflow-hidden rounded-[10px] shadow-card border border-gray-footer-border mb-4">
                    <img
                        className="w-full h-full object-cover"
                        src={images[imageIndex]}
                        alt={name}
                    />
                </div>
                <span className="block text-center text-gray-500">{`${
                    imageIndex + 1
                } of ${images.length}`}</span>
            </div>
        </div>
    );
}
