import axios from "axios";

const axiosWithAuth = () => {
    const token = window.localStorage.getItem("token");
    return axios.create({
        headers: {
            authorization: token
        },
        baseURL: "http://localhost:5000/api/"
    })
}

export default axiosWithAuth;