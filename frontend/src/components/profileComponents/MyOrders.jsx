import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { myOrders } from '../../features/order/orderSlice.js';

const MyOrders = () => {

  const dispatch = useDispatch();
  const { oldOrders } = useSelector((state) => state.orderSlice);

  useEffect(() => {
    dispatch(myOrders());

  },[])



  return (
    <div>
      MyOrders
    </div>
  )
}

export default MyOrders
