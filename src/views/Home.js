import React from "react";
import {
    AppBanner,
    DealsCard,
    ProductCard,
    ScrollBox,
    SectionWrapper,
} from "../components";
import { dummyListings } from "../data/dummyListings";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="pt-8 pb-32 px-[142px]">
            {/* Deals for you */}
            <SectionWrapper title="Deals for you">
                <ScrollBox>
                    {dummyListings?.slice(0, 8).map((listing) => {
                        return <DealsCard key={listing.Id} {...listing} />;
                    })}
                </ScrollBox>
            </SectionWrapper>
            <div className="flex flex-wrap my-7 flex-grow">
                <SectionWrapper title="Shop Cars &amp; Vehicles" margins="mr-5">
                    <div className="flex flex-wrap bg-white pb-5 pt-12 px-[10px]">
                        {dummyListings
                            ?.filter((listing) => listing.Category === "cars")
                            .slice(0, 3)
                            .map((listing, index) => {
                                return (
                                    <ProductCard
                                        key={listing.Id}
                                        {...listing}
                                        lastchild={index === 2}
                                    />
                                );
                            })}
                    </div>
                    <Link
                        to="listings/cars"
                        className="absolute right-7 bottom-7 text-purple-100 text-xs"
                    >
                        Explore Now
                    </Link>
                </SectionWrapper>
                <SectionWrapper title="Shop Furniture">
                    <div className="flex flex-wrap bg-white pb-5 pt-12 px-[10px]">
                        {dummyListings
                            ?.filter(
                                (listing) => listing.Category === "furniture"
                            )
                            .slice(0, 3)
                            .map((listing, index) => {
                                return (
                                    <ProductCard
                                        key={listing.Id}
                                        {...listing}
                                        lastchild={index === 2}
                                    />
                                );
                            })}
                    </div>
                    <Link
                        to="listings/furniture"
                        className="absolute right-7 bottom-7 text-purple-100 text-xs"
                    >
                        Explore Now
                    </Link>
                </SectionWrapper>
            </div>

            <SectionWrapper title="More deals for you">
                <ScrollBox>
                    {dummyListings
                        ?.reverse()
                        .slice(0, 8)
                        .map((listing) => {
                            return <DealsCard key={listing.Id} {...listing} />;
                        })}
                </ScrollBox>
            </SectionWrapper>
            <div className="flex flex-wrap mt-7">
                <SectionWrapper title="Shop Electronics" margins="mr-5">
                    <div className="flex flex-wrap bg-white pb-5 pt-12 px-[10px]">
                        {dummyListings
                            ?.filter(
                                (listing) => listing.Category === "electronics"
                            )
                            .slice(0, 3)
                            .map((listing, index) => {
                                return (
                                    <ProductCard
                                        key={listing.Id}
                                        {...listing}
                                        lastchild={index === 2}
                                    />
                                );
                            })}
                    </div>
                    <Link
                        to="listings/electronics"
                        className="absolute right-7 bottom-7 text-purple-100 text-xs"
                    >
                        Explore Now
                    </Link>
                </SectionWrapper>
                <SectionWrapper title="Shop Real Estate">
                    <div className="flex flex-wrap bg-white pb-5 pt-12 px-[10px]">
                        {dummyListings
                            ?.filter(
                                (listing) => listing.Category === "real estate"
                            )
                            .slice(0, 3)
                            .map((listing, index) => {
                                return (
                                    <ProductCard
                                        key={listing.Id}
                                        {...listing}
                                        lastchild={index === 2}
                                    />
                                );
                            })}
                    </div>
                    <Link
                        to="listings/real-estate"
                        className="absolute right-7 bottom-7 text-purple-100 text-xs"
                    >
                        Explore Now
                    </Link>
                </SectionWrapper>
            </div>
            {/* App Banner */}
            <AppBanner />
        </div>
    );
}
