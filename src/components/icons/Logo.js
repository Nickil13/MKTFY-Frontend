import React from "react";
import { ReactComponent as LogoSvg } from "../../assets/images/logo.svg";

export default function Logo({ width }) {
    return (
        <div className={`${width}`}>
            <LogoSvg className="fill-purple-200" />
        </div>
    );
}
