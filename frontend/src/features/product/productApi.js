import axios from "axios";

const URL = "https://zentra-peach.vercel.app/api/v1/product";

export const getProductsApi = async (data) => {
    try {
        const res = await axios.get(`${URL}/all-products`,
            {
                params: {
                    keyword: data?.keyword,
                    'price[gte]': data?.maxPrice,
                    'price[lt]': data?.minPrice,
                    page: data?.page
                },
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