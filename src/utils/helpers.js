import { CATEGORY_TYPES } from "../data/variables";

const BLACKLIST = ["listings"];

export const generateCrumbs = (location, searchParams) => {
    let newCrumbs = [];
    let crumbs = location.pathname.split("/").slice(1);
    let category = "";

    for (let i = 0; i < crumbs.length; i++) {
        let crumb = crumbs[i];
        if (crumb.includes("%20")) {
            crumb = crumb.replace("%20", " ");
        }
        if (crumb === "dashboard") {
            newCrumbs.push({ name: "home", path: "/dashboard" });
        } else if (CATEGORY_TYPES.includes(crumb)) {
            category = crumb;
            newCrumbs.push({
                name: `Popular ${crumb} in ${
                    location.state?.city || "Calgary"
                }`,
                path: `/dashboard/listings/?category=${crumb}`,
            });
        } else if (
            crumb === "listings" &&
            location.search.includes("category")
        ) {
            category = searchParams.get("category");

            newCrumbs.push({
                name: `Popular ${category} in ${
                    searchParams.get("city") || "Calgary"
                }`,
                path: `/dashboard/listings/${location.search}`,
            });
        } else if (!isNaN(crumb) && location.state?.name) {
            newCrumbs.push({
                name: location.state.name,
                path: `/dashboard/listings/${category}/${location.state.name}`,
            });
        } else {
            if (!BLACKLIST.includes(crumb)) {
                newCrumbs.push({ name: crumb, path: `/dashboard/${crumb}` });
            }
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
