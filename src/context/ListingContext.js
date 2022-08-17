import React, { useState, useContext, useEffect } from "react";
import { CATEGORY_TYPES } from "../data/variables";

import axios from "../utils/request";
// import jwt_decode from "jwt-decode";
// import {
//     clearLocalStorage,
//     getLocalStorage,
//     setLocalStorage,
//     STORAGE_KEYS,
// } from "../utils/storageUtils";
// import { toast } from "../components/custom-toast/CustomToastContainer";

const ListingContext = React.createContext();

export const useListingContext = () => {
    return useContext(ListingContext);
};

export const ListingContextProvider = ({ children }) => {
    // const [user, setUser] = useState(
    //     getLocalStorage(STORAGE_KEYS.USER_KEY, null)
    // );
    const [listings, setListings] = useState([]);
    const [currentListing, setCurrentListing] = useState(null);
    const [listingSelection, setListingSelection] = useState(null);
    const [deals, setDeals] = useState([]);

    /* Get a selection of listings (3 from each category)*/
    const getListingSelection = async () => {
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
        }
    };

    /* Get all deals */
    const getDeals = async () => {
        try {
            const res = await axios.get("/Listing/deals");
            setDeals(res);
        } catch (error) {
            console.error(error);
        }
    };

    /* Store changes made to user in local storage */
    // useEffect(() => {
    //     if (user) {
    //         setLocalStorage(STORAGE_KEYS.USER_KEY, { ...user });
    //     }
    // }, [user]);

    // const getCurrentUserDetails = async () => {
    //     const userId = getIdFromToken();

    //     try {
    //         const res = await axios.get(`/User/${userId}`);
    //         setUser(res);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const getUserDetails = async (id) => {
    //     try {
    //         const res = await axios.get(`/User/${id}`);
    //         return res;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const createUser = async (id, userDetails) => {
    //     const body = { ...userDetails, id };
    //     try {
    //         const res = await axios.post("/User", body);
    //         setUser(res);
    //         sessionStorage.removeItem("user_details");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const editUser = async (userDetails) => {
    //     const userId = getIdFromToken();
    //     const body = { ...userDetails, id: userId };

    //     try {
    //         const res = await axios.put("/User", body);
    //         setUser(res);

    //         toast.success("User info saved!");
    //     } catch (error) {
    //         toast.error("Error: did not save user info.");
    //     }
    // };

    return (
        <ListingContext.Provider
            value={{
                listings,
                currentListing,
                getListingSelection,
                listingSelection,
                deals,
                getDeals,
                setCurrentListing,
            }}
        >
            {children}
        </ListingContext.Provider>
    );
};
