import axios from "../utils/request";

const requestPurchase = async (id) => {
    const body = { id };
    try {
        const res = await axios.put("/Listing/requestpurchase", body);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export { requestPurchase };
