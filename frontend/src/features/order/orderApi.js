import axios from "axios";

const URL = "http://localhost:8000/api/v1/order";


export const placeOrderApi =  async ({shippingInfo, orderedProducts, paymentMethod}) => {

    try {
        const res = await axios.post(`${URL}/create-order`, {shippingInfo, orderedProducts, paymentMethod}, {withCredentials: true});

        if(!res.ok) {
            throw new Error("Something went wrong when placing order");
        }
        
        return res.data;

    } catch (error) {
        const message = error.response?.data?.message || "Something went wrong when placing order";
        throw new Error(message);
    }
    

}