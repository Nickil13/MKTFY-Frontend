import { dummyListings } from "../data/dummyListings";

const getListings = (category, amount) => {
    let newListings = [];
    if (dummyListings) {
        newListings = dummyListings.filter(
            (listing) => listing.Category === category
        );

        if (amount) {
            newListings = newListings.slice(0, amount);
        }
    }

    return newListings;
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

export { getListings, getDeals, getMoreDeals };
