import { useEffect } from 'react';
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from 'react-redux';
import { 
  getCart,
  clearCart,
} from "../features/cart/cartSlice.js"
import { AiOutlineDelete } from "react-icons/ai";

const Cart = () => {

  const dispatch = useDispatch();
  let cart = useSelector((state) => state.cartSlice);

  useEffect(() => {
    dispatch(getCart());
  }, [])

  const handleClearCart = () => {
    dispatch(clearCart());
  }

  return (
    <div className='flex flex-col gap-8 pt-4 items-center'>
      <div className='flex flex-col justify-center rounded-2xl shadow-2xl items-center gap-4 p-3 h-fit'>
        <span className='italic font-semibold'>Total Price: Rs.{cart?.totalPrice}</span>
        <div className="flex justify-center items-center gap-6 mb-10">
          <button onClick={handleClearCart} className="flex items-center gap-1 text-red-800 border rounded p-2 hover:cursor-pointer">Delete All <AiOutlineDelete /></button>
          <button className='px-6 py-3 rounded-2xl bg-[var(--secondary-btn-bg)] hover:cursor-pointer'>Buy All</button>
        </div>
      </div>

      {cart?.cartItems.map((item, index) => (
        <CartItem key={index} item={item} />
      ))}
      {/* Buy or Clear */}
    </div>
  )
}

export default Cart
