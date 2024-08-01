import axios from "axios";

// const url = "https://66870f8683c983911b0472c4.mockapi.io"
// const ip = "192.168.0.101"
const ip = "172.20.10.2"  // iphone
export const url = "http://" + ip + ":8080"

const apiUser = axios.create({
    baseURL: url,
    timeout: 100000, // set timeout to 10 seconds
    headers: {
        // 'Content-Type': 'application/json',
    },
});

export const get_ds_rap = () => {
    return apiUser.get(`Threatrts`)
}
export const get_threater = (idThreater) => {
    return apiUser.get(`threater?id=${idThreater}`)
}

export const get_movie = (idMovie, idThreater) => {
    return apiUser.get(`movie?idMovie=${idMovie}&idThreater=${idThreater}`)
}

export const get_seatMaps = (idThreater) => {
    return apiUser.get(`seatMaps?idThreater=${idThreater}`)
}

export const get_seatMapBooked = (idMovie, idThreater) => {
    return apiUser.get(`Sheat-map-booked?idMovie=${idMovie}&idThreater=${idThreater}`)

}

export const find_threater_byName = (name) => {
    return apiUser.get(`find-threates?name=${name}`)

}

export const find_movie_byTitle = (title) => {
    return apiUser.get(`find-movies?title=${title}`)

}

export const post_booking = (idUser, idThreaster, idSeat, idMovie) => {
    return apiUser.post(`booking?idUser=${idUser}&idThreater=${idThreaster}&idSeat=${idSeat}&idMovie=${idMovie}`)

}

export const get_getBookedByUser = (idUser) => {
    return apiUser.get(`user/getBooker?idUser=${idUser}`)
}


apiUser.interceptors.response.use(function (response) {
    // Trả về dữ liệu phản hồi
    // console.log('ay :', response)
    // localStorage.setItem('token', response.data.access_token)
    // taocock('login_token' , response.data.access_token,'36000');
    // console.log(localStorage.getItem('token'))

    return response;
}, function (error) {
    // Xử lý lỗi
    // console.log('lỗi trong api request')
    alert("có lỗi trong sử lý yêu cầu request ")
    console.log('lỗi trong api request : ', error)
    return Promise.reject(error);
});