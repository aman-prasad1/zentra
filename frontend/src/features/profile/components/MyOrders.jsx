import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { myOrders } from '../../order/slices/orderSlice.js';

const MyOrders = () => {

  const dispatch = useDispatch();
  const { oldOrders } = useSelector((state) => state.orderSlice);

  const [orders, setOrders] = useState([])


  useEffect(() => { // fetching old orders
    dispatch(myOrders());
  },[])


  useEffect(() => { // adding all oldOrders in state
    for(const bunchOrder of oldOrders) {
      for(const singleOrder of bunchOrder?.orderItems) {
        orders.push(singleOrder);
      }
    }
  }, [oldOrders])



  return (
    <div className='flex flex-col items-center'>
      {
        oldOrders.map((order) => (
          order.orderItems.map((item) => (
            <div className="w-[75vw] h-[200px] max-w-[500px] shadow-md rounded-2xl">
              <Link to={`/products/details/${item._id}`} className="h-1/2 w-full flex gap-2 p-2 hover:text-amber-800 transition-all">
                <div className="w-fit overflow-hidden">
                    <img src={item.image.public_url} alt="" className="h-full rounded-2xl"/>
                </div>
                <h4 className=" w-4/5 p-2 font-extralight multiline-ellipsis">{item.name}</h4>
              </Link>
              <span className='mt-3 flex justify-center'>Delivery Status:<span className='ml-2 text-green-800 font-bold'>{order.orderStatus}</span></span>
            </div>
          ))
        ))
      }
    </div>
  )
}

export default MyOrders
