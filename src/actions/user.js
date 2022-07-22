import axios from "../utils/request";

const getMyPurchases = async () => {
    try {
        const res = await axios.get("/Listing/mypurchases");
        return res;
    } catch (error) {
        console.log(error);
    }
};

const getMyPendingListings = async () => {
    try {
        const res = await axios.get("/Listing/mylistings/pendings");
        return res;
    } catch (error) {
        console.log(error);
    }
};

const getMyActiveListings = async () => {
    try {
        const res = await axios.get("/Listing/mylistings/active");
        return res;
    } catch (error) {
        console.log(error);
    }
};

const getMySoldListings = async () => {
    try {
        const res = await axios.get("/Listing/mylistings/sold");
        return res;
    } catch (error) {
        console.log(error);
    }
};

export {
    getMyPurchases,
    getMyPendingListings,
    getMyActiveListings,
    getMySoldListings,
};
