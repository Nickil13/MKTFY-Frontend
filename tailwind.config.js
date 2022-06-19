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
                700: "#2A2E43",
                "cloud-gray": "#F4F4F5",
                footer: "#888889",
                "footer-border": "#707070",
            },
            purple: {
                100: "#9349DE",
                200: "#8840D9",
                400: "#6E20BE",
                500: "#6318AF",
                600: "#560F9F",
            },
            gold: { 100: "#ffc832", 200: "#FFBA00" },
            black: "#262627",
            beige: { 100: "#FFFFFF99", 200: "#F7F7F7" },
            transparent: "transparent",
        },
        fontSize: {
            "2xs": "0.75rem",
            xs: "0.875rem",
            "sm-16": "1rem",
            "sm-17": "1.0625rem",
            base: "1.25rem",
            lg: "2.5rem",
        },

        extend: {
            backgroundImage: {
                "login-clouds": "url(../assets/images/background_begin.svg)",
                "gray-clouds": "url(../assets/images/background_grey.svg)",
                "about-header":
                    "url(../assets/images/Image_about_us_header.png)",
                checkbox: "url(../assets/images/check_box-24px.svg)",
                "mobile-banner": "url(../assets/images/Banner_mask.png)",
            },
            width: {
                btn: "345px",
            },
            height: {
                footer: "609px",
                section: "480px",
                card: "351px",
            },
            margin: {
                15: "60px",
            },
            padding: {
                15: "60px",
                footer: "609px",
            },
            minWidth: {
                card: "236px",
            },
            maxWidth: {
                input: "532px",
                modal: "808px",
                "modal-lg": "1360px",
                card: "236px",
            },
            borderRadius: {
                modal: "10px",
            },
            boxShadow: {
                btn: "0px 5px 20px #00000024",
                modal: "0px 7px 12px #00000024",
                dropdown: "0px 3px 6px #00000029",
                card: "0px 4px 15px #00000024",
            },
        },
    },
    plugins: [],
};
