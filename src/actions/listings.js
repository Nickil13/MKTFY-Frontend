import { dummyListings } from "../data/dummyListings";

const getListings = (params, amount) => {
    let newListings = [];
    if (dummyListings) {
        const { city, category, condition } = params;
        newListings = [...dummyListings];
        if (category) {
            newListings = newListings.filter(
                (listing) => listing.Category === category
            );
        }

        if (city) {
            newListings = newListings.filter(
                (listing) => listing.City === city
            );
        }

        if (condition) {
            newListings = newListings.filter(
                (listing) => listing.Condition === condition
            );
        }

        if (amount) {
            newListings = newListings.slice(0, amount);
        }
    }

    return newListings;
};

const getListingById = () => {
    return dummyListings[0];
};
const getDeals = () => {
    let deals = [];
    if (dummyListings) {
        deals = dummyListings.slice(0, 8);
    }
    return deals;
};

const getMoreDeals = () => {
    let deals = [];
    if (dummyListings) {
        deals = dummyListings.reverse().slice(0, 8);
    }
    return deals;
};

export { getListings, getListingById, getDeals, getMoreDeals };
