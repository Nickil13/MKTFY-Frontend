const STORAGE_KEYS = {
    USER_KEY: "mktfy-user",
};

const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorage = (key, initialValue) => {
    try {
        const value = localStorage.getItem(key);
        return JSON.parse(value);
    } catch (error) {
        return initialValue;
    }
};

/* Local Storage items to clear on logout 
-- iterate when we end up with a list of keys */
const clearLocalStorage = () => {
    // user info
    localStorage.removeItem(STORAGE_KEYS.USER_KEY);
    // other stored values
};

export { STORAGE_KEYS, setLocalStorage, getLocalStorage, clearLocalStorage };
