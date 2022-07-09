import { dummyPurchases } from "../data/dummyPurchases";

export const getMyPurchases = () => {
    let purchases = [];
    if (dummyPurchases) {
        purchases = [...dummyPurchases];
    }
    return purchases;
};

export const getPurchasesById = (id) => {
    let newPurchase = {};
    if (dummyPurchases) {
        newPurchase = dummyPurchases.find(
            (purchasedListing) => purchasedListing.Id == id
        );
    }
    return newPurchase;
};
