import React, { useState } from "react";
import { ReactComponent as SliderArrow } from "../assets/images/icon_right_arrowhead.svg";

export default function ImageSlider({ images, name, className }) {
    const [imageIndex, setImageIndex] = useState(0);
    const scrollToRef = React.useRef(null);

    React.useEffect(() => {
        if (scrollToRef.current) {
            const currentChild = scrollToRef.current.children[imageIndex];
            if (currentChild) {
                currentChild.scrollIntoView({
                    block: "nearest",
                    inline: "start",
                });
            }
        }
    }, [imageIndex]);

    const increaseIndex = () => {
        setImageIndex(imageIndex - 1 >= 0 ? imageIndex - 1 : images.length - 1);
    };

    const decreaseIndex = () => {
        setImageIndex(imageIndex + 1 <= images.length - 1 ? imageIndex + 1 : 0);
    };

    return (
        <div
            className={`flex flex-col-reverse 2xl:mx-8 lg:flex-row ${className} w-full`}
        >
            {/* Image Slider */}
            <div className="flex flex-shrink-0 items-center lg:mr-9 lg:flex-col select-none">
                <SliderArrow
                    className="hidden md:block cursor-pointer mr-2.5 lg:mb-2.5 lg:mr-0 lg:rotate-90"
                    onClick={increaseIndex}
                />
                <div
                    className="hidden md:flex flex-grow  gap-[10px] lg:flex-col overflow-y-auto overscroll-y-contain max-h-[400px] hide-scrollbar"
                    ref={scrollToRef}
                >
                    {images.length > 0 &&
                        images.map((image, index) => {
                            return (
                                <div
                                    className={`min-h-[124px] max-h-[124px] w-full max-w-[118px] overflow-hidden cursor-pointer rounded-10 ${
                                        imageIndex === index &&
                                        "border border-purple-200 shadow-card"
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
                <SliderArrow
                    className="hidden md:block rotate-180 cursor-pointer ml-auto lg:mt-7 lg:ml-0 lg:-rotate-90"
                    onClick={decreaseIndex}
                />
            </div>
            {/* Main Image */}
            <div className="mb-4 lg:mb-0 w-full max-w-[645px]">
                <div className="h-[424px] overflow-hidden rounded-10 shadow-card border border-gray-footer-border mb-4">
                    <img
                        className="w-full h-full object-cover"
                        src={images[imageIndex]}
                        alt={name}
                    />
                </div>
                <div className="flex justify-center">
                    <SliderArrow
                        className="md:hidden cursor-pointer mr-2.5 w-4"
                        onClick={increaseIndex}
                    />
                    <span className="text-center text-gray-500">{`${
                        imageIndex + 1
                    } of ${images.length}`}</span>
                    <SliderArrow
                        className="md:hidden rotate-180 cursor-pointer ml-2.5 w-4"
                        onClick={decreaseIndex}
                    />
                </div>
            </div>
        </div>
    );
}
