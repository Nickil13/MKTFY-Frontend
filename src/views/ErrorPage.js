import React from "react";
import axios from "../utils/request";

const callAPI = async () => {
    try {
        const res = await axios.get("/Listing/all");
        console.log(res);
    } catch (error) {
        console.log(error);
    }
};

export default function ErrorPage() {
    return (
        <div>
            <h1>Error - Page Not Found</h1>
            <button className="bg-green p-2 shadow-md" onClick={callAPI}>
                Get listings
            </button>
        </div>
    );
}
