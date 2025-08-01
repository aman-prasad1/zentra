import axios from 'axios';


const URL = "http://localhost:8000/api/v1/user/admin";


const getAllUserApi = async () => {
    try {
        const res = await axios.get(`${URL}/all-user`, {withCredentials: true});
        return res.data;
    } catch (error) {
        const message = error?.response?.data?.message || "Something went wrong while finding all user";
        throw new Error(message);
    }
}