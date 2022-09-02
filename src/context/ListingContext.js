import React, { useState, useContext, useEffect } from "react";
import { CATEGORY_TYPES } from "../data/variables";

import axios from "../utils/request";
import {
    getSessionStorage,
    setSessionStorage,
    STORAGE_KEYS,
} from "../utils/storageUtils";

const ListingContext = React.createContext();

export const useListingContext = () => {
    return useContext(ListingContext);
};

export const ListingContextProvider = ({ children }) => {
    const [listings, setListings] = useState([]);
    const [currentListing, setCurrentListing] = useState(
        getSessionStorage(STORAGE_KEYS.CURRENT_LISTING_KEY, null)
    );
    const [listingSelection, setListingSelection] = useState(null);
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(false);

    // User listings
    const [myActiveListings, setMyActiveListings] = useState(
        getSessionStorage(STORAGE_KEYS.MY_ACTIVE_LISTINGS_KEY, null) || []
    );
    const [myPendingListings, setMyPendingListings] = useState(
        getSessionStorage(STORAGE_KEYS.MY_PENDING_LISTINGS_KEY, null) || []
    );
    const [mySoldListings, setMySoldListings] = useState(
        getSessionStorage(STORAGE_KEYS.MY_SOLD_LISTINGS_KEY, null) || []
    );
    const [myPurchases, setMyPurchases] = useState(
        getSessionStorage(STORAGE_KEYS.MY_PURCHASES_KEY, null) || []
    );

    /* Store changes made to listing in local storage */
    useEffect(() => {
        if (currentListing) {
            setSessionStorage(STORAGE_KEYS.CURRENT_LISTING_KEY, {
                ...currentListing,
            });
        }
    }, [currentListing]);

    /* Get a selection of listings (3 from each category)*/
    const getListingSelection = async () => {
        let apicalls = [];
        CATEGORY_TYPES.forEach((category) => {
            apicalls.push(axios.get(`/Listing/all/category/${category}`));
        });
        Promise.all(apicalls)
            .then((listings) => {
                if (listings) {
                    const map = new Map();
                    listings.forEach((list, index) => {
                        map.set(CATEGORY_TYPES[index], list.slice(0, 3));
                    });
                    setListingSelection(map);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    /* Get all deals */
    const getDeals = async () => {
        const res = await axios.get("/Listing/deals");
        if (res) {
            setDeals(res);
        }
    };

    const getListingById = async (id) => {
        const res = await axios.get(`/Listing/${id}`);
        if (res) {
            setCurrentListing(res);
        }
    };

    const getFilteredListings = async (filter) => {
        const params = new URLSearchParams();

        if (filter.searchString) {
            params.append("searchString", filter.searchString);
        }
        if (filter.city) {
            params.append("city", filter.city);
        }
        if (filter.category) {
            params.append("category", filter.category);
        }
        if (filter.condition) {
            params.append("condition", filter.condition);
        }
        if (filter.fromPrice && filter.toPrice) {
            params.append("minPrice", filter.fromPrice);
            params.append("maxPrice", filter.toPrice);
        }

        const res = await axios.get(`/Listing/filter?${params}`);
        if (res) {
            setListings(res);
        }
    };

    /* User listings */
    const getMyActiveListings = async () => {
        const res = await axios.get("/Listing/mylistings/active");
        if (res) {
            setMyActiveListings(res);
            setSessionStorage(STORAGE_KEYS.MY_ACTIVE_LISTINGS_KEY, [...res]);
        }
    };
    const getMyPendingListings = async () => {
        const res = await axios.get("/Listing/mylistings/pendings");
        if (res) {
            setMyPendingListings(res);
            setSessionStorage(STORAGE_KEYS.MY_PENDING_LISTINGS_KEY, [...res]);
        }
    };
    const getMyPurchases = async () => {
        const res = await axios.get("/Listing/mypurchases");
        if (res) {
            setMyPurchases(res);
            setSessionStorage(STORAGE_KEYS.MY_PURCHASES_KEY, [...res]);
        }
    };
    const getMySoldListings = async () => {
        const res = await axios.get("/Listing/mylistings/sold");
        if (res) {
            setMySoldListings(res);
            setSessionStorage(STORAGE_KEYS.MY_SOLD_LISTINGS_KEY, [...res]);
        }
    };

    const requestPurchase = async (id) => {
        const body = { id };
        const res = await axios.put("/Listing/requestpurchase", body);

        if (res) {
            const newPurchase = { ...res, status: "Pending" };
            setMyPurchases([...myPurchases, newPurchase]);
            setSessionStorage(STORAGE_KEYS.MY_PURCHASES_KEY, [
                ...myPurchases,
                newPurchase,
            ]);
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
                deals,
                setCurrentListing,
                getListingById,
                getFilteredListings,
                loading,
                myActiveListings,
                getMyActiveListings,
                myPendingListings,
                getMyPendingListings,
                myPurchases,
                getMyPurchases,
                mySoldListings,
                getMySoldListings,
                requestPurchase,
                setLoading,
            }}
        >
            {children}
        </ListingContext.Provider>
    );
};
