import axios from 'axios';


const URL = "http://localhost:8000";

export const signUpApi = async (data) => {
    try {
        const res = await axios.post(
            `${URL}/api/v1/user/register`,
            data,
            {
                headers: {'Content-Type': 'multipart/form-data'}
            }
        );
        return res.data;

    } catch (error) {
        const message = error.response?.data?.message || "Signup Failed"

        throw new Error(message);
    }
}

export const loginApi = async (credentials) => {
    try {
        const res = await axios.post(`${URL}/api/v1/user/login`, { credentials });
        return res.data;

    } catch (error) {
        const message = error.response?.data?.message || "Login Failed"

        throw new Error(message);
    }
}

export const logoutApi = async () => {
    try {
        const res = await axios.post(`${URL}/api/v1/logout`, { withCredentials: true });
        return res.data;
    } catch (error) {
        const message = error.response?.data?.message || "Logout Failed";

        throw new Error(message);
    }
}