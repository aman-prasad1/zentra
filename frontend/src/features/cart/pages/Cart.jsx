import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDelete } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { CiShoppingCart } from 'react-icons/ci';
import { getCart, clearCart, incQuantity, decQuantity, removeFromCart } from "../slices/cartSlice.js";
import { addNewOrders } from "../../order/slices/orderSlice.js";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartSlice);
  const cartItems = cart?.cartItems || [];

  const notify = (toast_message) => toast.success(toast_message);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleClearCart = () => {
    dispatch(clearCart());
    notify("Cart cleared successfully");
  };

  const handleBuyAllProducts = () => {
    const products = cartItems.map(item => ({ id: item.id, quantity: item.quantity }));
    dispatch(addNewOrders(products));
    navigate('/order');
  };

  return (
    <div className="bg-(--main-bg) min-h-screen px-4 sm:px-8 lg:px-20 py-8">
      <ToastContainer className="font-bold" position="bottom-right" />

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-8 font-medium">
        <Link to="/" className="hover:text-black transition">Home</Link>
        <HiOutlineChevronRight className="text-[10px]" />
        <span className="text-gray-900 font-semibold">Shopping Cart</span>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Cart Items List */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Cart ({cartItems.length})</h1>
            
            {cartItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white p-4 sm:p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex gap-4 sm:gap-6 items-center"
              >
                {/* Product Image */}
                <Link to={`/products/details/${item.id}`} className="w-24 h-24 sm:w-28 sm:h-28 border border-gray-100 bg-gray-50 rounded-2xl p-1.5 shrink-0 flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain rounded-xl" />
                </Link>

                {/* Details info */}
                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col gap-1 flex-1">
                    <Link 
                      to={`/products/details/${item.id}`} 
                      className="text-sm font-semibold text-gray-800 hover:text-black transition truncate max-w-[280px]"
                    >
                      {item.name}
                    </Link>
                    <span className="text-base font-extrabold text-gray-950">
                      ₹{item.price?.toLocaleString()}
                    </span>
                  </div>

                  {/* Quantity & Actions Panel */}
                  <div className="flex items-center gap-6 justify-between sm:justify-start shrink-0">
                    <div className="flex items-center border border-gray-200 rounded-2xl bg-gray-50 p-1">
                      <button 
                        onClick={() => dispatch(decQuantity(item.id))}
                        className="w-8 h-8 rounded-xl hover:bg-gray-200 transition font-bold text-sm flex items-center justify-center hover:cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-3 text-sm font-bold text-gray-800">{item.quantity}</span>
                      <button 
                        onClick={() => dispatch(incQuantity(item.id))}
                        className="w-8 h-8 rounded-xl hover:bg-gray-200 transition font-bold text-sm flex items-center justify-center hover:cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button 
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="w-10 h-10 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition flex items-center justify-center hover:cursor-pointer"
                    >
                      <AiOutlineDelete className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Summary Panel */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-6">
              <h2 className="text-xl font-bold text-gray-900">Summary</h2>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{cart?.totalPrice?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Shipping</span>
                  <span className="font-semibold text-emerald-600">Free</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900">Total Price</span>
                  <span className="text-xl font-extrabold text-gray-950">₹{cart?.totalPrice?.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <button 
                  onClick={handleBuyAllProducts}
                  className="w-full py-4 rounded-2xl bg-black text-white hover:bg-gray-950 font-bold transition flex items-center justify-center gap-2 shadow-md hover:cursor-pointer"
                >
                  Proceed to Checkout
                </button>
                
                <button 
                  onClick={handleClearCart}
                  className="w-full py-3 rounded-2xl border border-gray-200 text-gray-500 hover:text-red-500 hover:bg-red-50 font-bold transition flex items-center justify-center gap-2 hover:cursor-pointer"
                >
                  <AiOutlineDelete className="text-lg" />
                  <span>Clear Cart</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
            <CiShoppingCart className="text-4xl text-gray-300" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Your cart is empty</h3>
            <p className="text-sm text-gray-500 mt-1">Looks like you haven't added anything to your cart yet.</p>
          </div>
          <Link 
            to="/products" 
            className="mt-2 px-6 py-2.5 bg-black text-white hover:bg-gray-900 rounded-xl text-sm font-medium transition"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
