import axios from 'axios';


const URL = "https://zentra-peach.vercel.app/api/v1/user";

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
        const res = await axios.post(`${URL}/logout`, {}, { withCredentials: true });
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

export const changePasswordApi = async (data) => {
    try {
        const res = await axios.put(`${URL}/change-password`, data, {withCredentials: true});
        return res.data;
    } catch (error) {
        const message = error.response?.data?.message || "Something went wrong";
        throw new Error(message);
    }
}

export const deleteAccountApi = async (password) => {
    try {
        const res = await axios.delete(`${URL}/delete-profile`, {data: {password}, withCredentials: true});
        return res.data;
    } catch (error) {
        const message = error?.response?.data?.message || "Profile not deleted";
        throw new Error(message);
    }
}

export const updateProfileApi = async (data) => {
    try {
        const res = await axios.put(
            `${URL}/update-profile`,
            data,
            {
                headers: {'Content-Type': 'multipart/form-data'},
                withCredentials: true
            }
        );
        return res.data;

    } catch (error) {
        const message = error.response?.data?.message || "Something went wrong while updating profile";

        throw new Error(message);
    }
}