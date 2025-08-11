import axios from "axios";

const URL = "https://zentra-peach.vercel.app/api/v1/order";


export const placeOrderApi =  async ({shippingInfo, orderedProducts, paymentMethod}) => {
    try {
        const res = await axios.post(`${URL}/create-order`, {shippingInfo, orderedProducts, paymentMethod}, {withCredentials: true});
        return res.data;
    } catch (error) {
        const message = error?.response?.data?.message || "Something went wrong when placing order";
        throw new Error(message);
    }
}

export const verifyPaymentApi = async (paymentDetails) => {
    try {
        const res = await axios.post(`${URL}/verify-payment`, paymentDetails, {withCredentials: true});
        return res.data;
    } catch (error) {
        const message = error?.response?.data?.message || "Payment Verification failed";
        throw new Error(message);
    }
}

export const myOrdersApi = async () => {
    try {
        const res = await axios.get(`${URL}/my-orders`, {withCredentials: true});
        return res.data;
    } catch (error) {
        const message = error?.response?.data?.message || "Something went wrong while fetching orders";
        throw new Error(message);
    }
}