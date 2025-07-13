import axios from 'axios';


const URL = "http://localhost:8000/api/v1/user";

export const signUpApi = async (data) => {
    try {
        const res = await axios.post(
            `${URL}/register`,
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

export const verifyUserApi = async (data) => {
    try {
        const res = await axios.post(`${URL}/verify-user`, data);
        return res.data;
    } catch (error) {
        const message = error.response?.data?.message || "Verification Failed";
        throw new Error(message);
    }
}

export const loginApi = async (credentials) => {
    try {
        const res = await axios.post(`${URL}/login`, credentials, {withCredentials: true});
        return res.data;

    } catch (error) {
        const message = error.response?.data?.message || "Login Failed"

        throw new Error(message);
    }
}

export const logoutApi = async () => {
    try {
        const res = await axios.post(`${URL}/logout`, { withCredentials: true });
        return res.data;
    } catch (error) {
        const message = error.response?.data?.message || "Logout Failed";

        throw new Error(message);
    }
}

export const getUserApi = async () => {
    try {
        const res = await axios.get(`${URL}/get-user`, { withCredentials: true });
        return res.data;
    } catch (error) {
        try {
            await axios.post(`${URL}/refresh-tokens`, {}, { withCredentials: true });
            const res = await axios.get(`${URL}/get-user`, { withCredentials: true });
            return res.data;
        } catch (error) {
            const message = "Unauthorized Access";
            throw new Error(message);
        }
    }
}