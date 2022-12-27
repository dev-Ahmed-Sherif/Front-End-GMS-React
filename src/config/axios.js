import axios from "axios";
import { json } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
export const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1"
});
// navigateTo = useNavigate()

axiosInstance.interceptors.request.use(

    function (config)
    {
        const token = localStorage.getItem("token")
        config.headers["authorization"] = token;
        return config
    }
)

axiosInstance.interceptors.response.use(

    function (response)
    {
        return response;
    }
)