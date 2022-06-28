import { NAV_CATEGORIES } from "../data/variables";

const BLACKLIST = ["listings", ""];

export const generateCrumbs = (location, searchParams) => {
    let newCrumbs = [];
    let crumbs = location.pathname.split("/").slice(1);
    let name = "";

    for (let i = 0; i < crumbs.length; i++) {
        let crumb = crumbs[i];

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

            /* If the crumb is a category, set its name based on current city*/
        } else if (NAV_CATEGORIES.includes(crumb)) {
            name = `Popular ${crumb} in ${
                location.state?.city || searchParams.get("city") || "Calgary"
            }`;

            /* If the crumb is a number and a product name is stored in state */
        } else if (!isNaN(crumb) && location.state?.name) {
            name = location.state.name;
        } else {
            name = crumb;
        }

        if (!BLACKLIST.includes(crumb)) {
            newCrumbs.push({
                name,
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

    console.log("Max value is: ", maxValue, inputType);
    return maxValue;
};
