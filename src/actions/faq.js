import axios from "../utils/request";

export const getFAQs = async () => {
    try {
        const res = await axios.get("/FAQ");
        console.log("successfully fetched FAQs");
        return res;
    } catch (error) {
        console.log(error);
    }
};
