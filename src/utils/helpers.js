import { NAV_CATEGORIES } from "../data/variables";
import { toast } from "../components/custom-toast/CustomToastContainer";

const BLACKLIST = ["listings", "sold", ""];

export const generateCrumbs = (location, searchParams, currentListing) => {
    let newCrumbs = [];
    let crumbs = location.pathname.split("/").slice(1);
    const city = location.state?.city || searchParams.get("city");
    let name = "";

    for (let i = 0; i < crumbs.length; i++) {
        let crumb = crumbs[i];
        const hasNextCrumb = i + 1 <= crumbs.length - 1 && crumbs[i + 1] !== "";

        let crumbPath = `/${crumbs
            .slice(0, crumbs.indexOf(crumb) + 1)
            .join("/")}`;

        if (crumb.includes("%20") || crumb.includes("-")) {
            crumb = crumb.replace("%20", " ");
            crumb = crumb.replace("-", " ");
        }

        // Rename all dashboard crumbs to Home
        if (crumb === "dashboard") {
            name = "home";
        } else if (crumb === "info") {
            name = "account information";
            /* If the crumb is a category, set its name based on current city*/
        } else if (NAV_CATEGORIES.includes(crumb)) {
            name = `${crumb === "cars" ? "cars & vehicles" : crumb} ${
                city ? `in ${city}` : ""
            }`;

            /* If the crumb is a number and a product name is stored in state */
        } else if (/\d/.test(crumb) && currentListing?.prodName) {
            name = currentListing.prodName;

            /* If a category is passed along in state, the product should have its path redirected to that category */
            if (currentListing?.category) {
                crumbPath = `/dashboard/listings/${currentListing.category}/${crumb}`;
            }
        } else {
            name = crumb;
        }

        if (!BLACKLIST.includes(crumb)) {
            newCrumbs.push({
                name,
                path: crumbPath,
            });
        } else if (crumb === "listings" && !hasNextCrumb) {
            newCrumbs.push({
                name: `All Listings in ${city}`,
                path: crumbPath,
            });
        }
    }
    return newCrumbs;
};

export function formatPrice(price) {
    let newPrice = price.toFixed(2);
    let decIndex = newPrice.indexOf(".");
    let numCommas = (decIndex - 1) / 3;
    if (numCommas >= 1) {
        let i = decIndex;
        do {
            i -= 3;
            newPrice = newPrice.slice(0, i) + "," + newPrice.slice(i);
        } while (i > 3);
    }
    return `$ ${newPrice}`;
}

export function checkUppercase(password) {
    let hasUppercase = false;
    for (let i = 0; i < password.length; i++) {
        if (isNaN(password[i]) && password[i] == password[i].toUpperCase()) {
            hasUppercase = true;
        }
    }
    return hasUppercase;
}

export function checkContainsNumber(password) {
    return /\d/.test(password);
}

export const getMaxInputLength = (inputType) => {
    const inputMaxValues = [
        { inputType: "first name", max: 256 },
        { inputType: "last name", max: 256 },
        { inputType: "email", max: 320 },
        { inputType: "phone", max: 11 },
        { inputType: "address", max: 60 },
        { inputType: "verification", max: 6 },
        { inputType: "product name", max: 40 },
        { inputType: "description", max: 100 },
    ];
    let maxValue = 50;
    for (let i = 0; i < inputMaxValues.length; i++) {
        if (inputType.includes(inputMaxValues[i].inputType)) {
            maxValue = inputMaxValues[i].max;
        }
    }
    return maxValue;
};

/* Check if the phone number matches a formatted number and return the number without formatting. */
export const unformatPhoneNumber = (number) => {
    const fs = number.replace(/\D/g, "").match(/(\d{1})(\d{3})(\d{3})(\d{4})/);

    return fs[0];
};

export function formatPhoneNumber(value) {
    // formatted string
    const fs = value.replace(/\D/g, "").match(/(\d{1})(\d{3})(\d{3})(\d{4})/);

    /* If the string formats properly, return it */
    if (fs) {
        return `+${fs[1]} (${fs[2]}) ${fs[3]} - ${fs[4]}`;
    }
    return "";
}

export const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let formattedMonth = month;
    if (formattedMonth[0] === "0") {
        formattedMonth = months[formattedMonth[1] - 1];
    }
    let formattedDay = day.slice(0, 2);

    return `${formattedMonth} ${formattedDay} ${year}`;
};

// Error handling
export const parseError = (error) => {
    const originalConfig = error.config;

    const { method, url } = originalConfig;
    if (method === "put") {
        switch (url) {
            case "/Listing/requestpurchase":
                toast.error("There was a problem requesting purchase");
                break;
            case "/User":
                toast.error("Error: did not save user info.");
                break;

            default:
                console.log("Bad PUT request");
        }
    }
    console.log(`Bad ${method} request`);
};
