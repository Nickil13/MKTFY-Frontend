import axios from "axios";

const BASE_URL =
    "http://marketforyouyh-env.eba-fqgiudi2.ca-central-1.elasticbeanstalk.com/api";

// Create the axios instance
const service = axios.create({
    baseURL: BASE_URL,
    timeout: 50000,
    headers: {
        "Content-Type": "application/json",
    },
});

// request interceptor
service.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("access_token");
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
    },
    (error) => {
        console.log(error);
        Promise.reject(error);
    }
);

// response interceptor
service.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        const originalConfig = error.config;
        if (
            originalConfig.url !== "/login" &&
            originalConfig.url !== "/" &&
            !originalConfig.url.includes("marketforyou.us.auth0.com") &&
            error.response
        ) {
            // Access token expired
            if (error.response.status === 401) {
                // Grab refresh token and use it to get a new accessToken & a new refresh token OR redirect to login
                window.location.href = "/login";
            }
        }
        console.log(error);
    }
);

export default service;
