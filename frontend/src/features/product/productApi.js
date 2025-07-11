import axios from "axios";

const URL = "http://localhost:8000/api/v1/product";

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