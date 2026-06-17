import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDelete } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import { 
  getCart,
  clearCart,
} from "../slices/cartSlice.js"

import {
  addNewOrders,
} from "../../order/slices/orderSlice.js"


const Cart = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let cart = useSelector((state) => state.cartSlice);

  const notify = (toast_message) => toast.success(toast_message);

  useEffect(() => {
    dispatch(getCart());
  }, [])

  const handleClearCart = () => {
    dispatch(clearCart());
    notify("Cart Cleared");
  }

  const handleBuyAllProducts = () => {
    let products = [];

    for(const product of cart?.cartItems) {
      products.push({"id": product?.id, "quantity": product?.quantity});
    }

    // adding cart products to buying list
    dispatch(addNewOrders(products));

    navigate('/order');
  }

  return (
    <div className='flex flex-col gap-8 pt-4 items-center'>
      <ToastContainer className="font-bold" />
      <div className='flex flex-col justify-center rounded-2xl shadow-2xl items-center gap-4 p-3 h-fit'>
        <span className='italic font-semibold'>Total Price: Rs.{cart?.totalPrice}</span>
        <div className="flex justify-center items-center gap-6 mb-10">
          <button onClick={handleClearCart} className="flex items-center gap-1 text-red-800 border rounded p-2 hover:cursor-pointer">Delete All <AiOutlineDelete /></button>
          <button onClick={handleBuyAllProducts} className='px-6 py-3 rounded-2xl bg-(--secondary-btn-bg) hover:cursor-pointer'>Buy All</button>
        </div>
      </div>

      {cart?.cartItems.map((item, index) => (
        <CartItem key={index} item={item} />
      ))}
    </div>
  )
}

export default Cart
