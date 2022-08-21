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

// response interceptor is found in the WithAxios wrapper component

export default service;
