// Here I create axiosInstance

import axios from "axios";
import Cookies from 'js-cookie';

let axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
    async function (config) {
        const token = Cookies.get("token") || sessionStorage.getItem("token");
        if (token !== null || token !== undefined) {
            config.headers["x-access-token"] = token; // Here I pass token 
        }
        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
);


export default axiosInstance;  