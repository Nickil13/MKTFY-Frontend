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
        <div className="flex flex-col-reverse 2xl:mx-8 2xl:mr-36 2xl:flex-row">
            {/* Image Slider */}
            <div className="flex items-center mr-9 2xl:flex-col">
                <SliderArrow
                    className="cursor-pointer mr-2.5 2xl:mb-2.5 2xl:mr-0 2xl:rotate-90"
                    onClick={increaseIndex}
                />
                <div className="flex gap-[10px] 2xl:flex-col">
                    {images.length > 0 &&
                        images.map((image, index) => {
                            return (
                                <div
                                    className={`h-[124px] w-[118px] overflow-hidden cursor-pointer rounded-10 ${
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
                    className="rotate-180 cursor-pointer ml-2.5 2xl:mt-7 2xl:ml-0 2xl:-rotate-90"
                    onClick={decreaseIndex}
                />
            </div>
            {/* Main Image */}
            <div>
                <div className="h-[424px] overflow-hidden rounded-10 shadow-card border border-gray-footer-border mb-4 2xl:w-[645px]">
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
