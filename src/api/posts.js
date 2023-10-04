import axios from "axios";

const axiosApi = axios.create({
    baseURL: 'http://localhost:3500'
});

export default axiosApi;