import axios from "../utils/request";

export const getMyPurchases = async () => {
    try {
        const res = await axios.get("/Listing/mypurchases");
        return res;
    } catch (error) {
        console.log(error);
    }
};
