import axios from "axios";
import { BASE_URL } from '../../../config/api.js';

const URL = BASE_URL;


export const addToCartApi = async (productDetail) => {
    
    const newCartItem = {
        id: productDetail._id,
        name: productDetail.name,
        image: productDetail.images[0].public_url,
        price: productDetail.price,
        quantity: 1
    };


    const cart = JSON.parse(localStorage.getItem('cart')) || {cartItems: [], totalPrice: 0};

    const existingProductIndex = cart.cartItems.findIndex((items) => items.id === productDetail._id);

    if(existingProductIndex !== -1) {
        throw new Error("Already added to cart")
    }

    // if it is new product
    cart.cartItems.push(newCartItem);
    cart.totalPrice += productDetail.price;

    localStorage.setItem('cart', JSON.stringify(cart));

    return cart;
}