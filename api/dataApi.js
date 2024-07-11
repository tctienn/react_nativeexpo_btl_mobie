import axios from "axios";

// const url = "https://66870f8683c983911b0472c4.mockapi.io"
const url = "http://localhost:8080"

const apiUser = axios.create({
    baseURL: url,
    timeout: 10000, // set timeout to 10 seconds
    headers: {
        // 'Content-Type': 'application/json',
    },
});

export const get_ds_rap = () => {
    return apiUser.get(`Threatrts`)
}