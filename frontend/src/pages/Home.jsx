import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { LuStar } from "react-icons/lu";
import { BsTruck } from "react-icons/bs";
import { IoShieldOutline } from "react-icons/io5";
import { GrPowerCycle } from "react-icons/gr";
import { HiOutlineArrowRight } from "react-icons/hi";
import { HiOutlineFire } from "react-icons/hi2";
import RatingsStar from "../components/ui/RatingsStar";
import { getProducts } from "../features/product/slices/productSlice";
import { toggleWishlist } from "../features/product/slices/wishlistSlice";
import { AiFillHeart } from "react-icons/ai";
import heroImage from "../assets/images/hero.png";
import mensCategory from "../assets/images/mensCategory.png";
import womensCategory from "../assets/images/womensCategory.png";
import accessoriesCategory from "../assets/images/accessoriesCategory.png";
import electronicsCategory from "../assets/images/electronicsCategory.png";
import homeCategory from "../assets/images/homeCategory.png";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.productSlice);
  const wishlistItems = useSelector((state) => state.wishlistSlice.items);

  useEffect(() => {
    dispatch(getProducts({ page: 1 }));
  }, [dispatch]);

  const trendingProducts = products?.slice(0, 8) || [];

  return (
    <div className="bg-(--main-bg) px-4 sm:px-8 lg:px-20 py-2">
      
      {/* Top bar navigation */}
      <div className="h-[4em] flex items-center justify-start md:justify-center border-b border-gray-150 overflow-x-auto scrollbar-none">
        <ul className="flex gap-6 sm:gap-10 shrink-0 py-2">
          <li><Link to="/" className="flex gap-2 text-sm text-gray-600 hover:text-black font-semibold transition"><span><IoHomeOutline className="text-lg" /></span><span>Home</span></Link></li>
          <li><Link to="/products" className="flex gap-2 text-sm text-gray-600 hover:text-black font-semibold transition"><span><FiShoppingBag className="text-lg" /></span><span>Shop</span></Link></li>
          <li><button onClick={() => document.getElementById('category-section')?.scrollIntoView({ behavior: 'smooth' })} className="flex gap-2 text-sm text-gray-600 hover:text-black font-semibold transition hover:cursor-pointer"><span><BiCategoryAlt className="text-lg" /></span><span>Categories</span></button></li>
          <li><Link to="/cart" className="flex gap-2 text-sm text-gray-600 hover:text-black font-semibold transition"><span><CiShoppingCart className="text-lg" /></span><span>Cart</span></Link></li>
          <li><Link to="/profile" className="flex gap-2 text-sm text-gray-600 hover:text-black font-semibold transition"><span><CiUser className="text-lg" /></span><span>Account</span></Link></li>
        </ul>
      </div>

      {/* Hero section */}
      <section className="mt-8 flex justify-center items-center">
        <div className="relative w-full rounded-3xl overflow-hidden min-h-[30em] sm:min-h-[36em] flex items-center">
          
          {/* Layer 1: Background color */}
          <div className="absolute inset-0 z-0 bg-(--hero-bg) rounded-3xl"></div>

          {/* Layer 2: Hero image */}
          <img src={heroImage} alt="Hero" className="absolute inset-0 z-10 w-full h-full object-cover rounded-3xl" />

          {/* Layer 2.5: Dark gradient overlay */}
          <div className="absolute inset-0 z-15 bg-gradient-to-r from-black/75 via-black/45 to-transparent rounded-3xl"></div>

          {/* Layer 3: Text content */}
          <div className="relative z-20 px-6 sm:px-12 py-12 flex flex-col gap-4 sm:gap-6 max-w-xl">
            <span className="px-3.5 py-1.5 w-fit bg-white/15 backdrop-blur-md text-white text-xs sm:text-sm rounded-full flex gap-2 items-center border border-white/10">
              <LuStar className="text-[#fcac2b]" />
              New season essentials
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-md">
              Discover Your Style
            </h1>
            
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Elevated everyday fashion and lifestyle finds, thoughtfully curated for a clean, modern shopping experience.
            </p>

            <div className="flex gap-4 mt-2">
              <button onClick={() => navigate("/products")} className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:cursor-pointer transition hover:bg-gray-100 shadow-sm">
                Shop Now
              </button>
              <button onClick={() => navigate("/products")} className="px-6 py-3 bg-white/15 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/25 hover:cursor-pointer transition">
                Explore
              </button>
            </div>

            {/* Service Tags */}
            <ul className="flex flex-wrap gap-4 sm:gap-8 text-xs sm:text-sm text-white/70 mt-6 border-t border-white/10 pt-6">
              <li className="flex gap-2 items-center"><BsTruck className="text-base" />Fast Delivery</li>
              <li className="flex gap-2 items-center"><IoShieldOutline className="text-base" />Secure Checkout</li>
              <li className="flex gap-2 items-center"><GrPowerCycle className="text-base" />Easy Returns</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Category Section */}
      <div id="category-section" className="mt-14 flex flex-col gap-2">
        <h3 className="text-xl font-bold text-gray-900">Shop by Category</h3>
        <p className="text-xs text-gray-500">Browse the latest curated collections</p>

        {/* category cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 mt-4">
          <Link to="/products?category=Mens" className="relative overflow-hidden rounded-2xl shadow-sm cursor-pointer group border border-gray-100">
            <img src={mensCategory} alt="Men's Category" className="w-full h-[14em] sm:h-[16em] object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none"></div>
            <span className="absolute bottom-4 left-4 text-white font-bold text-base sm:text-lg">Mens</span>
          </Link>
          
          <Link to="/products?category=Womens" className="relative overflow-hidden rounded-2xl shadow-sm cursor-pointer group border border-gray-100">
            <img src={womensCategory} alt="Women's Category" className="w-full h-[14em] sm:h-[16em] object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none"></div>
            <span className="absolute bottom-4 left-4 text-white font-bold text-base sm:text-lg">Womens</span>
          </Link>
          
          <Link to="/products?category=Accessories" className="relative overflow-hidden rounded-2xl shadow-sm cursor-pointer group border border-gray-100">
            <img src={accessoriesCategory} alt="Accessories Category" className="w-full h-[14em] sm:h-[16em] object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none"></div>
            <span className="absolute bottom-4 left-4 text-white font-bold text-base sm:text-lg">Accessories</span>
          </Link>
          
          <Link to="/products?category=Electronics" className="relative overflow-hidden rounded-2xl shadow-sm cursor-pointer group border border-gray-100">
            <img src={electronicsCategory} alt="Electronics Category" className="w-full h-[14em] sm:h-[16em] object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none"></div>
            <span className="absolute bottom-4 left-4 text-white font-bold text-base sm:text-lg">Electronics</span>
          </Link>
          
          <Link to="/products?category=Home" className="relative overflow-hidden rounded-2xl shadow-sm cursor-pointer group border border-gray-100 col-span-2 sm:col-span-1">
            <img src={homeCategory} alt="Home Category" className="w-full h-[14em] sm:h-[16em] object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none"></div>
            <span className="absolute bottom-4 left-4 text-white font-bold text-base sm:text-lg">Home</span>
          </Link>
        </div>
      </div>

      {/* Trending Products */}
      <div className="mt-14 flex flex-col gap-4 pb-16">
        
        {/* Section header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-semibold flex items-center gap-1">
                <HiOutlineFire className="text-sm animate-pulse" />Trending Now
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Trending Products</h3>
            <p className="text-gray-500 text-xs mt-1">Handpicked favorites our customers love</p>
          </div>
          <Link to="/products" className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-black transition group">
            <span>View All</span>
            <HiOutlineArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product cards grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="animate-pulse bg-white p-4 border border-gray-100 rounded-2xl">
                <div className="bg-gray-100 rounded-xl h-[16em]"></div>
                <div className="mt-4 space-y-3">
                  <div className="bg-gray-100 rounded h-4 w-3/4"></div>
                  <div className="bg-gray-100 rounded h-3 w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {trendingProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/products/details/${product._id}`)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-150 flex flex-col"
              >
                {/* Product image */}
                <div className="relative overflow-hidden h-[16em] bg-gray-50 shrink-0">
                  <img
                    src={product?.images?.[0]?.public_url}
                    alt={product?.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                  {/* Wishlist icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(toggleWishlist(product));
                    }}
                    className="absolute top-3 right-3 w-9 h-9 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-105 hover:cursor-pointer shadow-sm"
                  >
                    {wishlistItems.some((item) => item._id === product._id) ? (
                      <AiFillHeart className="text-xl text-red-500" />
                    ) : (
                      <CiHeart className="text-xl text-gray-700" />
                    )}
                  </button>

                  {/* Category badge */}
                  {product?.category && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700">
                      {product.category}
                    </span>
                  )}
                </div>

                {/* Product info */}
                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 leading-snug multiline-ellipsis group-hover:text-black transition">
                      {product?.name}
                    </h4>

                    <div className="flex items-center gap-1.5 mt-2">
                      <RatingsStar ratings={product?.ratings} />
                      {product?.numberOfReviews > 0 && (
                        <span className="text-[11px] text-gray-400 font-semibold">({product.numberOfReviews})</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-base font-bold text-gray-950">₹{product?.price?.toLocaleString()}</span>
                    {product?.stock > 0 ? (
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">In Stock</span>
                    ) : (
                      <span className="text-[10px] text-red-650 font-bold bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Out of Stock</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Home;
