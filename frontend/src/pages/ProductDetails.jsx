import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../features/product/productSlice.js';

const ProductDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { productDetail } = useSelector((state) => state.productSlice);

  useEffect(() => {
    dispatch(getProductDetails({id}));
  }, []);
  return (
    <div>
      {productDetail?.name}
    </div>
  )
}

export default ProductDetails
