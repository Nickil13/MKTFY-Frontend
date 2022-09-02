import React from "react";
import { ReactComponent as DealsIcon } from "../../assets/images/icon_deals.svg";
import { ReactComponent as CarIcon } from "../../assets/images/icon_car.svg";
import { ReactComponent as FurnitureIcon } from "../../assets/images/icon_furniture.svg";
import { ReactComponent as ElectronicsIcon } from "../../assets/images/icon_computer.svg";
import { ReactComponent as RealEstateIcon } from "../../assets/images/icon_realestate.svg";

export default function CategoryIconButton({ category }) {
    return (
        <div className="flex flex-col items-center">
            {category === "deals" && <DealsIcon />}
            {category === "cars" && <CarIcon />}
            {category === "furniture" && <FurnitureIcon />}
            {category === "electronics" && <ElectronicsIcon />}
            {category === "real estate" && <RealEstateIcon />}
            <span className="text-black text-xs font-normal">
                {category === "cars" ? "cars & vehicles" : category}
            </span>
        </div>
    );
}
