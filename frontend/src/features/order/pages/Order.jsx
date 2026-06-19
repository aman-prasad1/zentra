import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from "react-router";
import { placeOrder, verifyPayment, clearNewOrders } from '../slices/orderSlice';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';
import { BsCreditCard, BsCashStack } from 'react-icons/bs';

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { newOrders, orderPayment, status, error } = useSelector((state) => state.orderSlice);
  const { user } = useSelector((state) => state.authSlice);
  const { cartItems } = useSelector((state) => state.cartSlice);
  const { productDetail } = useSelector((state) => state.productSlice);

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [country, setCountry] = useState("");
  const [stateName, setStateName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    if (newOrders?.length === 0 && status === "success") {
      navigate('/cart');
    }
    const handlePayment = async () => {
      if (paymentMethod === "Online" && status === "payment") {
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
          alert("Failed to load Razorpay SDK. Please check your internet.");
          return;
        }
        
        const options = {
          key: orderPayment?.RAZORPAY_KEY_ID,
          amount: orderPayment?.order.totalPrize * 100,
          currency: "INR",
          name: "Zentra",
          description: "Order Payment",
          order_id: orderPayment?.order.razorpay_order_id,
          handler: async function (response) {
            dispatch(verifyPayment(response));
          },
          prefill: {
            name: user?.name,
            email: user?.email,
            contact: phone,
          },
          theme: {
            color: "#000000",
          },
          method: {
            upi: true,
            card: true,
            netbanking: true,
            wallet: true,
          }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    };

    handlePayment();
  }, [status]);

  useEffect(() => {
    if (!newOrders || newOrders.length === 0) {
      navigate('/cart');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const shippingInfo = {
      address,
      city,
      state: stateName,
      country,
      pinCode: Number(pincode),
      phoneNo: Number(phone)
    };

    dispatch(placeOrder({ shippingInfo, orderedProducts: newOrders, paymentMethod }));

    if (paymentMethod === "COD" || status === "successfull") {
      dispatch(clearNewOrders());
      navigate('/');
    }
  };

  const resolvedProducts = (newOrders || []).map(order => {
    if (productDetail && order.id === productDetail._id) {
      return {
        id: productDetail._id,
        name: productDetail.name,
        image: productDetail.images?.[0]?.public_url,
        price: productDetail.price,
        quantity: order.quantity
      };
    }
    const cartItem = cartItems?.find(item => item.id === order.id);
    if (cartItem) {
      return {
        id: cartItem.id,
        name: cartItem.name,
        image: cartItem.image,
        price: cartItem.price,
        quantity: order.quantity
      };
    }
    return null;
  }).filter(Boolean);

  const orderTotal = resolvedProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="bg-(--main-bg) min-h-screen px-4 sm:px-8 lg:px-20 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-8 font-medium">
        <Link to="/" className="hover:text-black transition">Home</Link>
        <HiOutlineChevronRight className="text-[10px]" />
        <Link to="/cart" className="hover:text-black transition">Cart</Link>
        <HiOutlineChevronRight className="text-[10px]" />
        <span className="text-gray-900 font-semibold">Checkout</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Shipping Address</h1>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="country" className="text-sm font-semibold text-gray-700">Country</label>
                <input 
                  required
                  spellCheck={false} 
                  autoComplete="off" 
                  onChange={(e) => setCountry(e.target.value)} 
                  value={country}
                  name="country" 
                  id="country" 
                  type="text" 
                  placeholder="e.g. India" 
                  className="w-full bg-gray-50 border border-gray-200 outline-none rounded-xl py-3 px-4 focus:border-black focus:bg-white transition text-sm" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="state" className="text-sm font-semibold text-gray-700">State</label>
                <input 
                  required
                  spellCheck={false} 
                  autoComplete="off" 
                  onChange={(e) => setStateName(e.target.value)} 
                  value={stateName}
                  name="state" 
                  id="state" 
                  type="text" 
                  placeholder="e.g. Maharashtra" 
                  className="w-full bg-gray-50 border border-gray-200 outline-none rounded-xl py-3 px-4 focus:border-black focus:bg-white transition text-sm" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="city" className="text-sm font-semibold text-gray-700">City</label>
                <input 
                  required
                  spellCheck={false} 
                  autoComplete="off" 
                  onChange={(e) => setCity(e.target.value)} 
                  value={city}
                  name="city" 
                  id="city" 
                  type="text" 
                  placeholder="e.g. Mumbai" 
                  className="w-full bg-gray-50 border border-gray-200 outline-none rounded-xl py-3 px-4 focus:border-black focus:bg-white transition text-sm" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="pincode" className="text-sm font-semibold text-gray-700">Pin-Code</label>
                <input 
                  required
                  spellCheck={false} 
                  autoComplete="off" 
                  onChange={(e) => setPincode(e.target.value)} 
                  value={pincode}
                  name="pincode" 
                  id="pincode" 
                  type="text" 
                  placeholder="e.g. 400001" 
                  className="w-full bg-gray-50 border border-gray-200 outline-none rounded-xl py-3 px-4 focus:border-black focus:bg-white transition text-sm" 
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="address" className="text-sm font-semibold text-gray-700">Street Address</label>
              <input 
                required
                spellCheck={false} 
                autoComplete="off" 
                onChange={(e) => setAddress(e.target.value)} 
                value={address}
                name="address" 
                id="address" 
                type="text" 
                placeholder="Apartment, suite, unit, street address" 
                className="w-full bg-gray-50 border border-gray-200 outline-none rounded-xl py-3 px-4 focus:border-black focus:bg-white transition text-sm" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number</label>
              <input 
                required
                spellCheck={false} 
                autoComplete="off" 
                onChange={(e) => setPhone(e.target.value)} 
                value={phone}
                name="phone" 
                id="phone" 
                type="tel" 
                placeholder="10-digit mobile number" 
                className="w-full bg-gray-50 border border-gray-200 outline-none rounded-xl py-3 px-4 focus:border-black focus:bg-white transition text-sm" 
              />
            </div>

            {/* Payment Options Grid */}
            <div className="mt-4">
              <h2 className="text-sm font-bold text-gray-800 mb-3">Payment Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* COD Option */}
                <div 
                  onClick={() => setPaymentMethod("COD")}
                  className={`
                    p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all duration-200 select-none
                    ${paymentMethod === "COD" ? "border-black bg-gray-50" : "border-gray-150 hover:border-gray-300"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <BsCashStack className="text-xl text-gray-700" />
                    <span className="text-sm font-semibold text-gray-800">Cash on Delivery</span>
                  </div>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="COD" 
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-black h-4 w-4"
                  />
                </div>

                {/* Online Payment Option */}
                <div 
                  onClick={() => setPaymentMethod("Online")}
                  className={`
                    p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all duration-200 select-none
                    ${paymentMethod === "Online" ? "border-black bg-gray-50" : "border-gray-150 hover:border-gray-300"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <BsCreditCard className="text-xl text-gray-700" />
                    <span className="text-sm font-semibold text-gray-800">Online Payment</span>
                  </div>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="Online" 
                    checked={paymentMethod === "Online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-black h-4 w-4"
                  />
                </div>

              </div>
            </div>

            {error && <span className="text-xs font-semibold text-red-600 mt-2">*{error}</span>}

            <button 
              type="submit"
              disabled={status === "loading" || status === "pending" || status === "order"} 
              className="w-full mt-4 py-4 px-6 rounded-2xl bg-black text-white hover:bg-gray-950 font-bold transition flex items-center justify-center gap-2 shadow-md hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{status === "order" ? "Placing Order..." : "Place Order"}</span>
            </button>
          </form>
        </div>

        {/* Right: Summary Panel */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-6">
            <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

            {/* Product list */}
            <div className="flex flex-col gap-4 max-h-[280px] overflow-y-auto pr-1">
              {resolvedProducts.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 shrink-0 p-1">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-gray-800 truncate">{item.name}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-950">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Total calculation */}
            <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Subtotal</span>
                <span className="font-semibold text-gray-900">₹{orderTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Shipping</span>
                <span className="font-semibold text-emerald-600">Free</span>
              </div>
              
              <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-xl font-extrabold text-gray-950">₹{orderTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Safe badges */}
            <div className="flex items-center gap-2.5 bg-gray-50 p-3.5 rounded-2xl text-[11px] text-gray-500 border border-gray-100">
              <IoShieldCheckmarkOutline className="text-lg text-gray-400 shrink-0" />
              <span>Safe and secure checkout. Easy returns and refunds.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
