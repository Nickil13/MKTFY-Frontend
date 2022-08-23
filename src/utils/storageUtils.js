const STORAGE_KEYS = {
    USER_KEY: "mktfy-user",
    CURRENT_LISTING_KEY: "mktfy-current-listing",
    MY_SOLD_LISTINGS_KEY: "mktfy-my-sold-listings",
    MY_ACTIVE_LISTINGS_KEY: "mktfy-my-active-listings",
    MY_PENDING_LISTINGS_KEY: "mktfy-my-pending-listings",
    MY_PURCHASES_KEY: "mktfy-my-purchases",
    AUTH_TOKEN: "mktfy-token",
};

const setSessionStorage = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

const getSessionStorage = (key, initialValue) => {
    try {
        const value = sessionStorage.getItem(key);
        return JSON.parse(value);
    } catch (error) {
        return initialValue;
    }
};

/* Sessional Storage items to clear on logout 
-- iterate when we end up with a list of keys */
const clearSessionStorage = () => {
    // user info
    sessionStorage.removeItem(STORAGE_KEYS.USER_KEY);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);

    // other stored values
    sessionStorage.removeItem(STORAGE_KEYS.CURRENT_LISTING_KEY);
    sessionStorage.removeItem(STORAGE_KEYS.MY_ACTIVE_LISTINGS_KEY);
    sessionStorage.removeItem(STORAGE_KEYS.MY_PENDING_LISTINGS_KEY);
    sessionStorage.removeItem(STORAGE_KEYS.MY_PURCHASES_KEY);
    sessionStorage.removeItem(STORAGE_KEYS.MY_SOLD_LISTINGS_KEY);
};

export {
    STORAGE_KEYS,
    setSessionStorage,
    getSessionStorage,
    clearSessionStorage,
};
