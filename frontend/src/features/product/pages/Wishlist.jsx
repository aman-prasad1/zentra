import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toggleWishlist } from '../slices/wishlistSlice';
import RatingsStar from '../../../components/ui/RatingsStar.jsx';
import { CiHeart } from 'react-icons/ci';
import { AiFillHeart } from 'react-icons/ai';
import { HiOutlineChevronRight } from 'react-icons/hi';

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlistSlice.items);

  const handleToggleWishlist = (e, product) => {
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  return (
    <div className="bg-(--main-bg) min-h-screen px-4 sm:px-8 lg:px-20 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-8 font-medium">
        <Link to="/" className="hover:text-black transition">Home</Link>
        <HiOutlineChevronRight className="text-[10px]" />
        <span className="text-gray-900 font-semibold">Wishlist</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Wishlist</h1>
        <p className="text-sm text-gray-500 mt-1">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
        </p>
      </div>

      {/* Content */}
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/products/details/${product._id}`)}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col relative"
            >
              {/* Like Button */}
              <button
                onClick={(e) => handleToggleWishlist(e, product)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/95 shadow-sm flex items-center justify-center text-red-500 hover:scale-105 transition hover:cursor-pointer"
              >
                <AiFillHeart className="text-xl" />
              </button>

              {/* Image Area */}
              <div className="relative overflow-hidden h-[16em] bg-gray-50 shrink-0">
                <img
                  src={product?.images?.[0]?.public_url}
                  alt={product?.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Details Area */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-800 multiline-ellipsis leading-snug mb-2">
                    {product?.name}
                  </h4>
                  <div className="flex items-center gap-2 mb-3">
                    <RatingsStar ratings={product?.ratings} />
                    {product?.numberOfReviews > 0 && (
                      <span className="text-xs text-gray-400">({product.numberOfReviews})</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-base font-semibold text-gray-900">
                    ₹{product?.price?.toLocaleString()}
                  </span>
                  {product?.stock > 0 ? (
                    <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-xs text-red-500 font-semibold bg-red-50 px-2.5 py-1 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
            <CiHeart className="text-4xl text-gray-300" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Your wishlist is empty</h3>
            <p className="text-sm text-gray-500 mt-1">Save your favorite items here to check them out later.</p>
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

export default Wishlist;
