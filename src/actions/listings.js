import { dummyListings } from "../data/dummyListings";
import { dummyMyListings } from "../data/dummyMyListings";

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

const getListingById = (id) => {
    let newListing = {};
    if (dummyListings) {
        newListing = dummyListings.find((listing) => listing.Id == id);
    }
    return newListing;
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

const getMyActiveListings = () => {
    let myListings = [];
    if (dummyMyListings) {
        myListings = dummyMyListings.filter(
            (listing) =>
                listing.Status.toUpperCase() === "AVAILABLE" ||
                listing.Status.toUpperCase() === "PENDING"
        );
    }
    return myListings;
};

const getMySoldListings = () => {
    let myListings = [];
    if (dummyMyListings) {
        myListings = dummyMyListings.filter(
            (listing) => listing.Status.toUpperCase() === "SOLD"
        );
    }
    return myListings;
};

export {
    getListings,
    getListingById,
    getDeals,
    getMoreDeals,
    getMyActiveListings,
    getMySoldListings,
};
