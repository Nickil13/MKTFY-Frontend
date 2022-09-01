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

// request & response interceptors are found in the WithAxios wrapper component

export default service;
