import axios from "axios";

const URL = "http://localhost:8000/api/v1";


export const addToCartApi = async (productId) => {
    // fetching product using productId
    const res = await axios.get(`${URL}/product/details/${productId}`);
    const product = res.data.data.productDetail;
    
    // fields to save in store
    const newCartItem = {
        id: product._id,
        name: product.name,
        image: product.images[0].public_url,
        price: product.price,
        quantity: 1
    };


    const cart = JSON.parse(localStorage.getItem('cart')) || {cartItems: [], totalPrice: 0};

    const existingProductIndex = cart.cartItems.findIndex((items) => items.id === product._id);

    if(existingProductIndex !== -1) { // if product already exiisted
        cart.totalPrice -= cart.cartItems[existingProductIndex].price * cart.cartItems[existingProductIndex].quantity ;
        cart.cartItems[existingProductIndex].quantity += 1;
        cart.cartItems[existingProductIndex].price = product.price;
        cart.totalPrice += cart.cartItems[existingProductIndex].price * cart.cartItems[existingProductIndex].quantity ;
    } else { // if product does not exist
        cart.cartItems.push(newCartItem);
        cart.totalPrice += product.price;
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    return cart;
}