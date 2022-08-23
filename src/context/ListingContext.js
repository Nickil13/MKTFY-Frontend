import React, { useState, useContext, useEffect } from "react";
import { CATEGORY_TYPES } from "../data/variables";

import axios from "../utils/request";
import {
    getSessionStorage,
    setSessionStorage,
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
        setLoading(true);
        try {
            let apicalls = [];
            CATEGORY_TYPES.forEach((category) => {
                apicalls.push(axios.get(`/Listing/all/category/${category}`));
            });
            Promise.all(apicalls).then((listings) => {
                const map = new Map();
                listings.forEach((list, index) => {
                    map.set(CATEGORY_TYPES[index], list.slice(0, 3));
                });
                setListingSelection(map);
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    /* Get all deals */
    const getDeals = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/Listing/deals");
            setDeals(res);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const getListingById = async (id) => {
        setLoading(true);
        try {
            const res = await axios.get(`/Listing/${id}`);
            setCurrentListing(res);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getFilteredListings = async (filter) => {
        // /?searchString&city&category&condition&minPrice&maxPrice
        console.log(filter);
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
        setLoading(true);
        try {
            const res = await axios.get(`/Listing/filter?${params}`);
            setListings(res);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    /* User listings */
    const getMyActiveListings = async () => {
        try {
            const res = await axios.get("/Listing/mylistings/active");
            setMyActiveListings(res);
            setSessionStorage(STORAGE_KEYS.MY_ACTIVE_LISTINGS_KEY, [...res]);
        } catch (error) {
            console.log(error);
        }
    };
    const getMyPendingListings = async () => {
        try {
            const res = await axios.get("/Listing/mylistings/pendings");
            setMyPendingListings(res);
            setSessionStorage(STORAGE_KEYS.MY_PENDING_LISTINGS_KEY, [...res]);
        } catch (error) {
            console.log(error);
        }
    };
    const getMyPurchases = async () => {
        try {
            const res = await axios.get("/Listing/mypurchases");
            setMyPurchases(res);
            setSessionStorage(STORAGE_KEYS.MY_PURCHASES_KEY, [...res]);
        } catch (error) {
            console.log(error);
        }
    };
    const getMySoldListings = async () => {
        try {
            const res = await axios.get("/Listing/mylistings/sold");
            setMySoldListings(res);
            setSessionStorage(STORAGE_KEYS.MY_SOLD_LISTINGS_KEY, [...res]);
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
            }}
        >
            {children}
        </ListingContext.Provider>
    );
};
