import React from "react";
import { AppBanner, DealsSection, ProductSection } from "../components";
import axios from "../utils/request";

export default function Home() {
    const testApi = async () => {
        // if (isAuthenticated) {
        let access_token = sessionStorage.getItem("access_token");
        let config = {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
        };
        // const body = {
        //     prodName: "Sandwich",
        //     description: "A delicious egg salad sandwich.",
        //     category: "furniture",
        //     condition: "new",
        //     price: 27.32,
        //     address: "123 street se",
        //     city: "Calgary",
        // };
        //"49836616-bed6-4184-a00b-fbc0d1f36967" - sandwich 1
        //"7ed41bd3-6e92-43d2-be69-662cfbc25aff" - sandwich 2
        // const body = {
        //     id: "auth0|62b783a1e428f08bb44e9231",
        //     firstName: "Nicki",
        //     lastName: "L",
        //     email: "nickitest@gmail.com",
        //     address: "123 street",
        //     phone: "14031234567",
        //     city: "Calgary",
        // };
        // try {
        //     const res = await axios.post(
        //         `        http://marketforyouyh-env.eba-fqgiudi2.ca-central-1.elasticbeanstalk.com/api/Listing
        //             `,
        //         body,
        //         config
        //     );
        //     console.log(res);
        // } catch (error) {
        //     console.log(error);
        // }
        // try {
        //     const res = await axios.post(
        //         `        http://marketforyouyh-env.eba-fqgiudi2.ca-central-1.elasticbeanstalk.com/api/User
        //             `,
        //         body,
        //         config
        //     );
        //     console.log(res);
        // } catch (error) {
        //     console.log(error);
        // }
        // try {
        //     const res = await axios.get(
        //         `        http://marketforyouyh-env.eba-fqgiudi2.ca-central-1.elasticbeanstalk.com/api/User/${"auth0|62b783a1e428f08bb44e9231"}
        //             `,
        //         config
        //     );
        //     console.log(res);
        // } catch (error) {
        //     console.log(error);
        // }
        //}
        try {
            const res = await axios.get(`/Listing/myListings/active`);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        //}
    };
    return (
        <div>
            <button
                onClick={testApi}
                className="bg-green text-white p-3 mb-4 cursor-pointer hover:bg-red transition-colors duration-500"
            >
                Test API Button
            </button>
            <DealsSection title="Deals for you" category="deals" />
            <div className="flex flex-wrap my-7 flex-grow">
                <ProductSection
                    title="Shop Cars &amp; Vehicles"
                    category="cars"
                    cardLimit="3"
                    margins="mr-5"
                />
                <ProductSection
                    title="Shop Furniture"
                    category="furniture"
                    cardLimit="3"
                />
            </div>
            <DealsSection title="More deals for you" category="more deals" />

            <div className="flex flex-wrap mt-7">
                <ProductSection
                    title="Shop Electronics"
                    category="electronics"
                    cardLimit="3"
                    margins="mr-5"
                />
                <ProductSection
                    title="Shop Real Estate"
                    category="real estate"
                    cardLimit="3"
                />
            </div>
            <AppBanner />
        </div>
    );
}
