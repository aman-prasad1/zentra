import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getProductDetails, addReview } from '../slices/productSlice.js';
import { toggleWishlist } from '../slices/wishlistSlice.js';
import { addToCart } from '../../cart/slices/cartSlice.js';
import RatingsStar from '../../../components/ui/RatingsStar.jsx';
import { CiShoppingCart, CiHeart } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp, IoIosSend } from "react-icons/io";
import { IoCloseOutline, IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { HiOutlineChevronRight } from "react-icons/hi";
import { AiFillStar, AiFillHeart } from "react-icons/ai";
import Loader from '../../../components/ui/Loader.jsx';
import { ToastContainer, toast } from 'react-toastify';
import { addSingleOrder } from '../../order/slices/orderSlice.js';

const ProductDetails = () => {
  const { id } = useParams();
  const notify = (toast_message) => toast.success(toast_message);
  const notifyError = (toast_message) => toast.error(toast_message);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productDetail, loading } = useSelector((state) => state.productSlice);
  const wishlistItems = useSelector((state) => state.wishlistSlice.items);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const [isDescOpen, setIsDescOpen] = useState(true);
  const [isReviewsOpen, setIsReviewsOpen] = useState(true);

  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const reviews = productDetail?.reviews || [];

  useEffect(() => {
    dispatch(getProductDetails({ id }));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart(productDetail))
      .unwrap()
      .then(() => {
        notify("Added to Cart successfully!");
      })
      .catch((err) => {
        notifyError(err || "Failed to add to cart");
      });
  };

  const handleOrderNow = () => {
    if (!productDetail) return;
    const products = [{ id: productDetail._id, quantity: 1 }];
    dispatch(addSingleOrder(products));
    navigate('/order');
  };

  const handleAddReview = () => {
    if (!newReview.trim()) {
      notifyError("Please write a comment.");
      return;
    }
    if (newRating === 0) {
      notifyError("Please select a rating.");
      return;
    }

    const reviewData = {
      productId: productDetail?._id,
      comment: newReview,
      rating: newRating,
    };

    dispatch(addReview(reviewData))
      .unwrap()
      .then(() => {
        setNewReview("");
        setNewRating(0);
        notify("Review submitted successfully!");
        dispatch(getProductDetails({ id }));
      })
      .catch((err) => {
        notifyError(err || "Failed to submit review");
      });
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (!productDetail?.images?.length) return;
    setActiveImageIndex((prev) => (prev + 1) % productDetail.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (!productDetail?.images?.length) return;
    setActiveImageIndex((prev) => (prev - 1 + productDetail.images.length) % productDetail.images.length);
  };

  if (loading) return (
    <div className="bg-(--main-bg) min-h-[75vh] flex items-center justify-center">
      <Loader />
    </div>
  );
  if (!productDetail) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <p className="text-gray-500">Product not found</p>
      <Link to="/products" className="px-6 py-2 bg-black text-white rounded-xl text-sm font-medium">Back to Shop</Link>
    </div>
  );

  return (
    <div className="bg-(--main-bg) min-h-screen px-4 sm:px-8 lg:px-20 py-8">
      <ToastContainer className="font-bold" position="bottom-right" />

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-8 font-medium">
        <Link to="/" className="hover:text-black transition">Home</Link>
        <HiOutlineChevronRight className="text-[10px]" />
        <Link to="/products" className="hover:text-black transition">Shop</Link>
        <HiOutlineChevronRight className="text-[10px]" />
        <Link to={`/products?category=${productDetail?.category}`} className="hover:text-black transition">{productDetail?.category}</Link>
        <HiOutlineChevronRight className="text-[10px]" />
        <span className="text-gray-900 font-semibold truncate max-w-[200px]">{productDetail?.name}</span>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left: Image Section */}
        <div className="lg:col-span-6 flex flex-col gap-4 lg:sticky lg:top-24">
          
          {/* Main Active Image Display */}
          <div 
            onClick={() => setLightboxOpen(true)}
            className="relative bg-white border border-gray-100 rounded-3xl overflow-hidden aspect-[4/3] flex items-center justify-center cursor-zoom-in group shadow-sm hover:shadow-md transition-all duration-300"
          >
            {productDetail?.images?.[activeImageIndex] ? (
              <img 
                src={productDetail.images[activeImageIndex].public_url} 
                alt={productDetail.name} 
                className="w-full h-full object-contain p-4 group-hover:scale-102 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-400">No Image Available</div>
            )}

            {/* Navigation Arrows inside Main Image display if multiple images */}
            {productDetail?.images?.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-700 hover:bg-white hover:text-black hover:cursor-pointer transition opacity-0 group-hover:opacity-100"
                >
                  <IoChevronBackOutline className="text-lg" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-700 hover:bg-white hover:text-black hover:cursor-pointer transition opacity-0 group-hover:opacity-100"
                >
                  <IoChevronForwardOutline className="text-lg" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails Row */}
          {productDetail?.images?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 shrink-0 scrollbar-none">
              {productDetail.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`
                    w-20 h-20 rounded-2xl overflow-hidden border bg-white shrink-0 p-1 transition-all duration-200 hover:cursor-pointer
                    ${activeImageIndex === i ? "border-black shadow-sm ring-1 ring-black" : "border-gray-200 hover:border-gray-400"}
                  `}
                >
                  <img src={img.public_url} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info Section */}
        <div className="lg:col-span-6 flex flex-col gap-6 lg:gap-8">
          
          {/* Tags, Name, Ratings */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase w-fit">
              {productDetail?.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
              {productDetail?.name}
            </h1>
            
            <div className="flex items-center gap-3 mt-1">
              <RatingsStar ratings={productDetail?.ratings} />
              <span className="text-xs text-gray-500 font-medium">
                ({productDetail?.numberOfReviews || 0} customer reviews)
              </span>
            </div>
          </div>

          {/* Pricing & Stock Status */}
          <div className="py-5 border-y border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-400">Price</span>
              <span className="text-3xl font-extrabold text-gray-900">
                ₹{productDetail?.price?.toLocaleString()}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {productDetail?.stock > 0 ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  In Stock ({productDetail.stock} units available)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-50 text-red-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-4 px-6 rounded-2xl bg-black text-white hover:bg-gray-950 font-bold transition flex items-center justify-center gap-3 shadow-md hover:shadow-lg hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CiShoppingCart className="text-2xl font-bold" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={handleOrderNow}
              disabled={productDetail?.stock <= 0}
              className="flex-1 py-4 px-6 rounded-2xl bg-(--secondary-btn-bg) text-black hover:opacity-95 font-bold transition flex items-center justify-center hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buy Now
            </button>
            <button
              onClick={() => dispatch(toggleWishlist(productDetail))}
              className="py-4 px-5 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center hover:cursor-pointer transition shadow-sm hover:shadow-md"
            >
              {wishlistItems.some((item) => item._id === productDetail?._id) ? (
                <AiFillHeart className="text-2xl text-red-500 animate-scaleIn" />
              ) : (
                <CiHeart className="text-2xl text-gray-700" />
              )}
            </button>
          </div>

          {/* Accordions (Description & Reviews) */}
          <div className="flex flex-col gap-4 pt-4">
            
            {/* Description Tab */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
              <button
                onClick={() => setIsDescOpen(!isDescOpen)}
                className="w-full px-6 py-4 flex items-center justify-between font-bold text-gray-950 hover:bg-gray-50 hover:cursor-pointer transition"
              >
                <span>Product Description</span>
                {isDescOpen ? <IoIosArrowUp className="text-lg" /> : <IoIosArrowDown className="text-lg" />}
              </button>
              {isDescOpen && (
                <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                  {productDetail?.description}
                </div>
              )}
            </div>

            {/* Reviews Tab */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
              <button
                onClick={() => setIsReviewsOpen(!isReviewsOpen)}
                className="w-full px-6 py-4 flex items-center justify-between font-bold text-gray-950 hover:bg-gray-50 hover:cursor-pointer transition"
              >
                <span>Reviews ({reviews.length})</span>
                {isReviewsOpen ? <IoIosArrowUp className="text-lg" /> : <IoIosArrowDown className="text-lg" />}
              </button>
              
              {isReviewsOpen && (
                <div className="px-6 pb-6 border-t border-gray-50 pt-6 flex flex-col gap-6">
                  
                  {/* Reviews List */}
                  {reviews.length > 0 ? (
                    <div className="flex flex-col gap-5 max-h-[300px] overflow-y-auto pr-1">
                      {reviews.map((review, index) => (
                        <div key={index} className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                          {/* User Avatar Circle */}
                          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold shrink-0 text-sm">
                            {review?.name ? review.name[0].toUpperCase() : "U"}
                          </div>
                          <div className="flex flex-col gap-1.5 flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <span className="text-sm font-semibold text-gray-800">{review?.name || "Verified Customer"}</span>
                              <RatingsStar ratings={review?.rating} />
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed">{review?.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 text-center py-4">No reviews yet. Be the first to review this product!</p>
                  )}

                  {/* Add Review Box */}
                  <div className="border-t border-gray-100 pt-6 flex flex-col gap-4">
                    <h5 className="text-sm font-bold text-gray-800">Add a Review</h5>
                    
                    {/* Interactive Star Selection */}
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="text-2xl transition hover:scale-110 hover:cursor-pointer"
                        >
                          <AiFillStar 
                            className={`
                              ${(hoverRating || newRating) >= star 
                                ? "text-amber-500" 
                                : "text-gray-200"}
                            `}
                          />
                        </button>
                      ))}
                    </div>

                    {/* Review text area input */}
                    <div className="relative flex items-center">
                      <input 
                        type="text"
                        spellCheck={false}
                        autoComplete="off"
                        onChange={(e) => setNewReview(e.target.value)}
                        value={newReview}
                        placeholder="Share your thoughts about this product..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 pl-4 pr-12 text-sm outline-none focus:border-black focus:bg-white transition" 
                      />
                      <button 
                        onClick={handleAddReview} 
                        className="absolute right-3 p-2 text-xl text-gray-500 hover:text-black hover:cursor-pointer transition"
                      >
                        <IoIosSend />
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Lightbox / Image Zoom Overlay */}
      {lightboxOpen && productDetail?.images?.[activeImageIndex] && (
        <div 
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fadeIn"
        >
          {/* Close button */}
          <button 
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition hover:cursor-pointer z-50"
          >
            <IoCloseOutline className="text-2xl" />
          </button>

          {/* Main zoomed image */}
          <div className="relative max-w-5xl max-h-[85vh] flex items-center justify-center">
            <img 
              src={productDetail.images[activeImageIndex].public_url} 
              alt={productDetail.name} 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />

            {/* Navigation inside Lightbox */}
            {productDetail?.images?.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute -left-12 sm:left-4 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 shadow-lg flex items-center justify-center hover:cursor-pointer transition"
                >
                  <IoChevronBackOutline className="text-xl" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute -right-12 sm:right-4 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 shadow-lg flex items-center justify-center hover:cursor-pointer transition"
                >
                  <IoChevronForwardOutline className="text-xl" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetails;
