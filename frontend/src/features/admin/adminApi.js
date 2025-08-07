import axios from 'axios';


const URL = "http://localhost:8000/api/v1/user/admin";
const PRODUCT_URL = "http://localhost:8000/api/v1/product";
const ORDER_URL = "http://localhost:8000/api/v1/order";


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

export const updateRoleApi = async (data) => {
    try {
        const res = await axios.put(`${URL}/user/${data.id}`, {newRole: data.newRole}, {withCredentials: true});
        return res.data;
    } catch (error) {
        const message = error?.response?.data?.message || "something went wrong while updating user";
        throw new Error(message);
    }
}

export const getAllProductsApi = async () => {
    try {
        const res = await axios.get(`${PRODUCT_URL}/admin-products`, {withCredentials: true});
        return res.data;
    } catch (error) {
        const message = error?.response?.data?.message || "Something went wrong while finding all products";
        throw new Error(message);
    }
}

export const deleteProductApi = async (id) => {
    try {
        const res = await axios.delete(`${PRODUCT_URL}/delete/${id}`, {withCredentials: true});
        return res.data;
    } catch (error) {
        const message = error?.response?.data?.message || "Something went wrong while deleting product";
        throw new Error(message);
    }
}

export const createProductApi = async (data) => {
    try {
        const res = await axios.post(
            `${PRODUCT_URL}/new-prouduct`,
            data,
            {
                headers: {'Content-Type': 'multipart/form-data'},
                withCredentials: true
            }
        );
        return res.data;
    } catch (error) {
        const message = error?.response?.data?.message || "Something went wrong while adding new product";
        throw new Error(message);
    }
}

export const getAllOrdersApi = async () => {
    try {
        const res = await axios.get(`${ORDER_URL}/all-orders`, {withCredentials: true});
        return res.data;
    } catch (error) {
        const message = error?.response?.data?.message || "Something went wrong while finding all orders";
        throw new Error(message);
    }
}
