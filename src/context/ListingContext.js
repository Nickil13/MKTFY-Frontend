import React, { useState, useContext, useEffect } from "react";
import { CATEGORY_TYPES } from "../data/variables";

import axios from "../utils/request";
import {
    clearLocalStorage,
    getLocalStorage,
    setLocalStorage,
    STORAGE_KEYS,
} from "../utils/storageUtils";
// import { toast } from "../components/custom-toast/CustomToastContainer";

const ListingContext = React.createContext();

export const useListingContext = () => {
    return useContext(ListingContext);
};

export const ListingContextProvider = ({ children }) => {
    const [listings, setListings] = useState([]);
    const [currentListing, setCurrentListing] = useState(
        getLocalStorage(STORAGE_KEYS.CURRENT_LISTING_KEY, null)
    );
    const [listingSelection, setListingSelection] = useState(null);
    // const [deals, setDeals] = useState([]);

    /* Store changes made to listing in local storage */
    useEffect(() => {
        if (currentListing) {
            setLocalStorage(STORAGE_KEYS.CURRENT_LISTING_KEY, {
                ...currentListing,
            });
        }
    }, [currentListing]);

    /* Get a selection of listings (3 from each category)*/
    const getListingSelection = async () => {
        try {
            let apicalls = [];
            CATEGORY_TYPES.forEach((category) => {
                apicalls.push(axios.get(`/Listing/all/category/${category}`));
            });
            Promise.all(apicalls).then((listings) => {
                const map = new Map();
                listings?.length > 0 &&
                    listings.forEach((list, index) => {
                        map.set(CATEGORY_TYPES[index], list.slice(0, 3));
                    });
                setListingSelection(map);
            });
        } catch (error) {
            console.error(error);
        }
    };

    /* Get all deals */
    const getDeals = async () => {
        try {
            const res = await axios.get("/Listing/deals");
            setListings(res);
        } catch (error) {
            console.error(error);
        }
    };
    const getListingById = async (id) => {
        try {
            const res = await axios.get(`/Listing/${id}`);
            setCurrentListing(res);
        } catch (error) {
            console.log(error);
        }
    };
    const getAllListingsByCategory = async (category) => {
        try {
            const res = await axios.get(`/Listing/all/category/${category}`);
            setListings(res);
        } catch (error) {
            console.log(error);
        }
    };
    const getAllListingsByCity = async (city) => {
        try {
            const res = await axios.get(`/Listing/all/${city}`);
            setListings(res);
        } catch (error) {
            console.log(error);
        }
    };
    const getFilteredListings = async (filter) => {
        // /?searchString&city&category&condition&minPrice&maxPrice
        console.log(filter);
        const params = new URLSearchParams();

        if (filter.city) {
            params.append("city", filter.city);
        }
        if (filter.category) {
            params.append("category", filter.category);
        }
        if (filter.condition) {
            params.append("condition", filter.condition);
        }

        try {
            const res = await axios.get(`/Listing/filter?${params}`);
            setListings(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ListingContext.Provider
            value={{
                listings,
                currentListing,
                getListingSelection,
                listingSelection,
                getDeals,
                setCurrentListing,
                getListingById,
                getAllListingsByCategory,
                getAllListingsByCity,
                getFilteredListings,
            }}
        >
            {children}
        </ListingContext.Provider>
    );
};
