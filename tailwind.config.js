/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.js"],
    theme: {
        screens: {
            sm: "375px",
            md: "600px",
            lg: "800px",
            xlg: "1200px",
            "2xl": "1440px",
        },
        colors: {
            green: "#6CC04B",
            red: "#FF2128",
            white: "#FFFFFF",
            gray: {
                100: "#E2E2E2",
                200: "#4D4D4D60",
                300: "#0000007E",
                400: "#6B6B6C",
                500: "#4D4D4D",
                600: "#434344",
            },
            purple: {
                200: "#8840D9",
                400: "#6E20BE",
                500: "#6318AF",
                600: "#560F9F",
            },
            gold: "#FFBA00",
            "dark-gray": "#2A2E43",
            black: "#262627",
        },
        fontSize: {
            "2xs": "0.75rem",
            xs: "0.875rem",
            "sm-16": "1rem",
            "sm-17": "1.0625rem",
            base: "1.25rem",
            lg: "2.5rem",
        },
        boxShadow: {
            btn: "0px 5px 20px #00000024",
            modal: "0px 7px 12px #00000024",
        },
        extend: {
            backgroundImage: {
                "login-clouds": "url(../assets/images/background_begin.svg)",
                "grey-clouds": "url(../assets/images/background_grey.svg)",
                "about-header":
                    "url(../assets/images/Image_about_us_header.png)",
                "about-header-lg":
                    "url(../assets/images/Image_about_us_header@2x.png)",
            },
            width: {
                btn: "345px",
            },
            maxWidth: {
                input: "532px",
                modal: "808px",
            },
            borderRadius: {
                modal: "10px",
            },
        },
    },
    plugins: [],
};
