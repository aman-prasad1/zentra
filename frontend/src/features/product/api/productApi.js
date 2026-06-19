import axios from "axios";
import { BASE_URL } from '../../../config/api.js';

const URL = `${BASE_URL}/product`;

export const getProductsApi = async (data) => {
    try {
        const params = {
            keyword: data?.keyword || undefined,
            category: data?.category || undefined,
            page: data?.page || undefined
        };

        if (data?.minPrice !== "" && data?.minPrice !== undefined && data?.minPrice !== null) {
            params['price[gte]'] = data.minPrice;
        }
        if (data?.maxPrice !== "" && data?.maxPrice !== undefined && data?.maxPrice !== null) {
            params['price[lte]'] = data.maxPrice;
        }

        const res = await axios.get(`${URL}/all-products`,
            {
                params,
                withCredentials: true
            }
        );
        return res.data;
    } catch (error) {
        const message = error.response?.data?.message || "Verification Failed";
        throw new Error(message);
    }
}

export const getProductDetailsApi = async (data) => {
    try {
        const res = await axios.get(`${URL}/details/${data?.id}`);

        return res.data;
    } catch (error) {
        const message = error.response?.data?.message || "Error while finding product";
        throw new Error(message);
    }
}

export const addReviewApi = async (data) => {
    try {
        const res = await axios.post(`${URL}/review/`, data, {
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        const message = error.response?.data?.message || "Error while adding review";
        throw new Error(message);
    }
}