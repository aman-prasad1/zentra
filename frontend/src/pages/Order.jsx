import { useState, useEffect } from 'react';
import { placeOrder } from '../features/order/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router";

const Order = () => {

  const dispatch = useDispatch();
  const { newOrders, status, error } = useSelector((state) => state.orderSlice);
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [pincode, setPincode] = useState();


  useEffect(() => {
    if(newOrders?.length === 0) {
        navigate('/cart');
    }
  },[status])

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const shippingInfo = {
        "address": address,
        "city": city,
        "state": state,
        "country": country,
        "pinCode": pincode,
        "phoneNo": phone
    }

    dispatch(placeOrder({shippingInfo, orderedProducts: newOrders, paymentMethod}))
  } 

  return (
    <div className='flex flex-col items-center'>
      <form onSubmit={handleSubmit} className='w-[90%] sm:w-auto mt-5 border-slate-600 rounded-3xl shadow-2xl p-8 sm:p-18 flex flex-col items-center'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className='flex flex-col justify-center'>
                <label htmlFor="country" className='pl-3 text-lg font-semibold'>Country</label>
                <input spellCheck={false} autoComplete='off' onChange={(e) => setCountry(e.target.value)} name='country' id='country' autoCapitalize='off' type="text" placeholder='Enter Country' className='w-full h-10 p-3 border outline-none  rounded-2xl' />
            </div>

            <div className='flex flex-col justify-center'>
                <label htmlFor="state" className='pl-3 text-lg font-semibold'>State</label>
                <input spellCheck={false} autoComplete='off' onChange={(e) => setState(e.target.value)} name='state' id='state' autoCapitalize='off' type="text" placeholder='Enter State' className='w-full h-10 p-3 border outline-none  rounded-2xl' />
            </div>

            <div className='flex flex-col justify-center'>
                <label htmlFor="city" className='pl-3 text-lg font-semibold'>City</label>
                <input spellCheck={false} autoComplete='off' onChange={(e) => setCity(e.target.value)} name='city' id='city' autoCapitalize='off' type="text" placeholder='Enter City' className='w-full h-10 p-3 border outline-none  rounded-2xl' />
            </div>

            <div className='flex flex-col justify-center'>
                <label htmlFor="address" className='pl-3 text-lg font-semibold'>Address</label>
                <input spellCheck={false} autoComplete='off' onChange={(e) => setAddress(e.target.value)} name='address' id='address' autoCapitalize='off' type="text" placeholder='Enter Address' className='w-full h-10 p-3 border outline-none  rounded-2xl' />
            </div>

            <div className='flex flex-col justify-center'>
                <label htmlFor="phone" className='pl-3 text-lg font-semibold'>Phone No.</label>
                <input spellCheck={false} autoComplete='off' onChange={(e) => setPhone(Number(e.target.value))} name='phone' id='phone' autoCapitalize='off' type="text" placeholder='Enter City' className='w-full h-10 p-3 border outline-none  rounded-2xl' />
            </div>

            <div className='flex flex-col justify-center'>
                <label htmlFor="pincode" className='pl-3 text-lg font-semibold'>Pin-Code</label>
                <input spellCheck={false} autoComplete='off' onChange={(e) => setPincode(Number(e.target.value))} name='pincode' id='pincode' autoCapitalize='off' type="text" placeholder='Enter Pin-Code' className='w-full h-10 p-3 border outline-none  rounded-2xl' />
            </div>

            <div>
                <div>
                    <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="Online"
                        checked={paymentMethod === "Online"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="accent-blue-600 hover:cursor-pointer"
                    />
                    <span>Online Payment</span>
                    </label>
                </div>
                <div>
                    <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="COD"
                        checked={paymentMethod === "COD"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="accent-blue-600 hover:cursor-pointer"
                    />
                    <span>Cash on Delivery</span>
                    </label>
                </div>
            </div>
        </div>
        {(error)? <span className="left-1 mt-10 top-10 text-red-700">*{error}</span> : <></>}
        <button className='w-fit mt-3 px-7 py-3 flex items-center rounded-4xl bg-[var(--secondary-btn-bg)] hover:cursor-pointer'>Place Order</button>
      </form>
    </div>
  )
}

export default Order
