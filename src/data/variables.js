const CATEGORY_TYPES = ["cars", "furniture", "electronics", "real estate"];
const CITY_OPTIONS = ["Calgary", "Camrose", "Brooks"];
const CONDITIONS = ["new", "used"];
const NAV_CATEGORIES = ["deals", ...CATEGORY_TYPES];
const FOOTER_LINKS = [
    { name: "Account Information", path: "/account-info" },
    { name: "Terms & Services", path: "/terms-of-service" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "FAQ", path: "/faq" },
];

export {
    CATEGORY_TYPES,
    CITY_OPTIONS,
    CONDITIONS,
    FOOTER_LINKS,
    NAV_CATEGORIES,
};
