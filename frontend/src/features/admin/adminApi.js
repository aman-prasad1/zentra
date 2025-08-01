import axios from 'axios';


const URL = "http://localhost:8000/api/v1/user/admin";


export const getAllUserApi = async () => {
    try {
        const res = await axios.get(`${URL}/all-user`, {withCredentials: true});
        return res.data;
    } catch (error) {
        const message = error?.response?.data?.message || "Something went wrong while finding all user";
        throw new Error(message);
    }
}

export const getSingleUserApi = async (id) => {
    try {
        const res = await axios.get(`${URL}/user/${id}`);
        return res.data;
    } catch (error) {
        const message = error?.response?.data?.message || "Something went wrong while finding user";
        throw new Error(message);
    }
}

export const deleteUserApi = async (id) => {
    try {
        const res = await axios.delete(`${URL}/user/${id}`, {withCredentials: true});
        return res.data;
    } catch (error) {
        const message = error?.response?.data?.message || "Something went wrong while deleting user";
        throw new Error(message);
    }
}