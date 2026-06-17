import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../slices/productSlice.js';
import { addToCart } from '../../cart/slices/cartSlice.js';
import ImageCarousel from '../components/ImageCarousel.jsx';
import RatingsStar from '../../../components/ui/RatingsStar.jsx';
import { CiShoppingCart } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import Star from "../../../assets/images/star.svg";
import Loader from '../../../components/ui/Loader.jsx';
import { ToastContainer, toast } from 'react-toastify';
import { addReview } from '../slices/productSlice.js';
import {
    addSingleOrder,
} from '../../order/slices/orderSlice.js';

const ProductDetails = () => {
  const { id } = useParams();

  const notify = (toast_message) => toast.success(toast_message);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productDetail, loading } = useSelector((state) => state.productSlice);

  const [isReviewOpen, setIsReviewOpen] = useState(true);
  const [isDescOpen, setIsDescOpen] = useState(true);

  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);

  const reviews = productDetail?.reviews;

  useEffect(() => {
    dispatch(getProductDetails({id}));
  }, []);


  const handleAddToCart = () => {
    dispatch(addToCart(productDetail));
    notify("Added to Cart");
  }

  const handleOrderNow = () => {
    let products = [];

    products.push({"id": productDetail?._id, "quantity": 1});

    // adding cart products to buying list
    dispatch(addSingleOrder(products));

    navigate('/order');
  }

  const handleAddReview = () => {
    if (newReview && newRating) {
      const reviewData = {
        productId: productDetail?._id,
        comment: newReview,
        rating: newRating,
      };
      dispatch(addReview(reviewData))
      .then(() => {
        setNewReview("");
        setNewRating(0);
        dispatch(getProductDetails({id}));
      });
    }
  };

  if(loading) return <Loader />
  return (
    <div className='w-full flex flex-col md:flex-row items-center md:items-start'>
      <ToastContainer className="font-bold" />
      <ImageCarousel images={productDetail?.images} />

      {/* About section */}
      <div className='w-full md:w-6/10 h-fit p-4 md:p-20 flex flex-col gap-3'>

        {/* Product Name */}
        <h2 className='text-xl font-bold'>{productDetail?.name}</h2>

        {/* Ratings */}
        <RatingsStar ratings={productDetail?.ratings} />

        {/* Price */}
        <div className='flex gap-3 items-center'>
            <span className='text-xl text-slate-600'>Rs.{productDetail?.price}</span>
            <span className={`italic font-semibold pt-1 ${(productDetail?.stock > 0)? "text-green-600" : "text-red-700"}`}>In Stock {productDetail?.stock}</span>
        </div> 

        {/* Add to cart or Buy */}
        <div className='mt-6 flex gap-3 text-white md:font-semibold'>
            <button onClick={handleAddToCart} className='px-4 py-3 flex items-center rounded-4xl bg-(--secondary-btn-bg) hover:cursor-pointer'>Add to<CiShoppingCart className='text-3xl' /></button>
            <button onClick={handleOrderNow} disabled={productDetail?.stock <= 0} className='px-4 py-3 rounded-4xl bg-(--secondary-btn-bg) hover:cursor-pointer'>Buy Now</button>
        </div>

        {/* Description */}
        <div>
            <div className='mb-3 font-semibold flex items-center gap-4'>
                <h4 className='text-lg'>Description</h4>
                <button onClick={() => setIsDescOpen(!isDescOpen)} className='hover:cursor-pointer'>{(isDescOpen)? <IoIosArrowUp /> : <IoIosArrowDown />}</button>
            </div>
            {isDescOpen && <span className=''>{productDetail?.description}</span>}
        </div>


        {/* Add Review */}
        <div className='mt-8'>
            <div className="pl-3 flex gap-2 text-4xl">
                <img src={Star} onClick={() => setNewRating(1)} className={`h-4 hover:cursor-pointer ${(newRating >= 1)? "filter-amber-700" : "filter-slate-500"}`} />
                <img src={Star} onClick={() => setNewRating(2)} className={`h-4 hover:cursor-pointer ${(newRating >= 2)? "filter-amber-700" : "filter-slate-500"}`} />
                <img src={Star} onClick={() => setNewRating(3)} className={`h-4 hover:cursor-pointer ${(newRating >= 3)? "filter-amber-700" : "filter-slate-500"}`} />
                <img src={Star} onClick={() => setNewRating(4)} className={`h-4 hover:cursor-pointer ${(newRating >= 4)? "filter-amber-700" : "filter-slate-500"}`} />
                <img src={Star} onClick={() => setNewRating(5)} className={`h-4 hover:cursor-pointer ${(newRating >= 5)? "filter-amber-700" : "filter-slate-500"}`} />
            </div>
            <div className='mt-3 relative w-[70%]'>
                <input 
                    type="text"
                    spellCheck={false}
                    autoComplete='off'
                    onChange={(e) => setNewReview(e.target.value)}
                    value={newReview}
                    placeholder='Write you comment'
                    className='border border-slate-600 w-full h-10 p-4 pr-8 outline-none rounded-2xl' 
                />
                <button onClick={handleAddReview} className='absolute top-0 right-4 flex items-center h-full hover:cursor-pointer'>
                    <IoIosSend  />
                </button>
            </div>
        </div>

        {/* Reviews */}
        <div>
            <div className='mb-3 font-semibold flex items-center gap-4'>
                <h4 className='text-lg'>Reviews</h4>
                <button onClick={() => setIsReviewOpen(!isReviewOpen)} className='hover:cursor-pointer'>{(isReviewOpen)? <IoIosArrowUp /> : <IoIosArrowDown />}</button>
            </div>

            
            {productDetail && isReviewOpen && <div>
                {reviews.map((review, index) => (
                    <div key={index} className='flex flex-col gap-2 mt-6'>
                        <RatingsStar ratings={review?.rating} />
                        <span>{review?.comment}</span>
                    </div>
                ))}
            </div>}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
