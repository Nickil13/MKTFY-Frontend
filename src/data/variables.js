const CATEGORY_TYPES = ["cars", "furniture", "electronics", "real estate"];
const CITY_OPTIONS = ["Brooks", "Calgary", "Camrose"];
const CONDITIONS = ["new", "used"];
const NAV_CATEGORIES = ["deals", ...CATEGORY_TYPES];
const FOOTER_LINKS = [
    { name: "Account Information", path: "account/info" },
    { name: "Terms & Services", path: "/terms-of-service" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "FAQ", path: "faq" },
];

const USER_MENU_LINKS = [
    { name: "Account Information", path: "account/info" },
    { name: "Change Password", path: "account/change-password" },
    { name: "My Purchases", path: "account/my-purchases" },
    { name: "My Listings", path: "account/my-listings" },
];

export {
    CATEGORY_TYPES,
    CITY_OPTIONS,
    CONDITIONS,
    FOOTER_LINKS,
    NAV_CATEGORIES,
    USER_MENU_LINKS,
};
