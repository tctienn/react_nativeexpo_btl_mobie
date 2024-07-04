
const url = "https://6404dcf7eed195a99f779a5e.mockapi.io"
const apiUser = axios.create({
    baseURL: url,
    timeout: 10000, // set timeout to 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

export const get_ds_rap = () => {
    return apiUser.get(`dsrap`)
}