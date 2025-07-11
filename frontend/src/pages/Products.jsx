import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/product/productSlice';


const Product = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.productSlice);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  
  return (
    <div>
      Products
    </div>
  )
}

export default Product
