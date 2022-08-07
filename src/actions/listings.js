import { dummyListings } from "../data/dummyListings";
import { dummyMyListings } from "../data/dummyMyListings";
import axios from "../utils/request";

const getListings = (params, amount) => {
    let newListings = [];
    if (dummyListings) {
        const { city, category, condition } = params;
        newListings = [...dummyListings];
        if (category) {
            newListings = newListings.filter(
                (listing) => listing.category === category
            );
        }

        if (city) {
            newListings = newListings.filter(
                (listing) => listing.city === city
            );
        }

        if (condition) {
            newListings = newListings.filter(
                (listing) => listing.condition === condition
            );
        }

        if (amount) {
            newListings = newListings.slice(0, amount);
        }
    }

    return newListings;
};

const getDummyListingById = (id) => {
    let newListing = {};
    if (dummyListings) {
        newListing = dummyListings.find((listing) => listing.id == id);
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
                listing.status.toUpperCase() === "AVAILABLE" ||
                listing.status.toUpperCase() === "PENDING"
        );
    }
    return myListings;
};

const getMySoldListings = () => {
    let myListings = [];
    if (dummyMyListings) {
        myListings = dummyMyListings.filter(
            (listing) => listing.status.toUpperCase() === "SOLD"
        );
    }
    return myListings;
};

const getMyListingById = (id) => {
    let newListing = {};
    if (dummyMyListings) {
        newListing = dummyMyListings.find((listing) => listing.id == id);
    }
    return newListing;
};

const requestPurchase = async (id) => {
    const body = { id };
    try {
        const res = await axios.put("/Listing/requestpurchase", body);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const getListingById = async (id) => {
    try {
        const res = await axios.get(`/Listing/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export {
    getListings,
    getDummyListingById,
    getMyListingById,
    getDeals,
    getMoreDeals,
    getMyActiveListings,
    getMySoldListings,
    getListingById,
    requestPurchase,
};
