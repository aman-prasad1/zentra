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
import heroImage from "../assets/images/hero.png";
import mensCategory from "../assets/images/mensCategory.png";
import womensCategory from "../assets/images/womensCategory.png";
import accessoriesCategory from "../assets/images/accessoriesCategory.png";
import electronicsCategory from "../assets/images/electronicsCategory.png";
import homeCategory from "../assets/images/homeCategory.png";

const messages = [
  "Your favorite tech delivered.",
  "Shop smarter. Live better.",
  "Next-gen products, today."
];

const Home = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.productSlice);

  useEffect(() => {
    dispatch(getProducts({ page: 1 }));
  }, [dispatch]);

  // Take at most 8 products for trending display
  const trendingProducts = products?.slice(0, 8) || [];

  return (
    <div className="bg-(--main-bg) px-20 ">
      
      {/* Top bar */}
      <div className="h-[4em] flex items-center justify-center border-b border-gray-200">
        <ul className="flex gap-10">
          <li><Link to="/" className="flex gap-2"><span><IoHomeOutline className="text-lg" /></span><span>Home</span></Link></li>
          <li><Link to="/products" className="flex gap-2"><span><FiShoppingBag className="text-lg" /></span><span>Shop</span></Link></li>
          <li><button onClick={() => document.getElementById('category-section')?.scrollIntoView({ behavior: 'smooth' })} className="flex gap-2 hover:cursor-pointer"><span><BiCategoryAlt className="text-lg" /></span><span>Categories</span></button></li>
          <li><Link to="/cart" className="flex gap-2"><span><CiShoppingCart className="text-lg" /></span><span>Cart</span></Link></li>
          <li><Link to="/profile" className="flex gap-2"><span><CiUser className="text-lg" /></span><span>Account</span></Link></li>
        </ul>
      </div>


      {/* Hero section */}
      <section className="mt-10 flex justify-center items-center">

        {/* Hero container — layered with z-index */}
        <div className="relative w-full rounded-xl overflow-hidden min-h-[36em]">

          {/* Layer 1: Background color (z-0) */}
          <div className="absolute inset-0 z-0 bg-(--hero-bg) rounded-xl"></div>

          {/* Layer 2: Hero image (z-10) */}
          <img src={heroImage} alt="Hero" className="absolute inset-0 z-10 w-full h-full object-cover rounded-xl" />

          {/* Layer 2.5: Dark gradient overlay for text readability */}
          <div className="absolute inset-0 z-15 bg-gradient-to-t from-black/70 via-black/30 to-black/10 rounded-xl"></div>

          {/* Layer 3: Text content (z-20) */}
          <div className="relative z-20 px-10 py-15 flex flex-col gap-5">

            {/* notch */}
            <span className="px-4 py-3 w-fit bg-white/20 backdrop-blur-sm text-white rounded-full flex gap-2 items-center"><span><LuStar className="text-[#fcac2b]" /></span>New season essentials</span>

            {/* hero heading */}
            <h1 className="text-6xl font-bold text-white drop-shadow-lg">Discover Your Style</h1>
            <p className="text-white/85">Elevated everyday fashion and lifestyle finds, thoughtfully curated <br /> for a clean, modern shopping experience.</p>

            {/* buttons */}
            <div>
              <button onClick={() => navigate("/products")} className="px-6 py-3 bg-(--primary-btn-bg) text-white rounded-lg mr-4 hover:cursor-pointer transition hover:brightness-110">Shop Now</button>
              <button onClick={() => navigate("/products")} className="px-6 py-3 bg-white/15 backdrop-blur-sm border border-white/40 text-white rounded-lg hover:bg-white/25 hover:cursor-pointer transition">Explore</button>
            </div>

            {/* Tags */}
            <ul className="flex gap-10 text-sm text-white/75 mt-5">
              <li className="flex gap-2 items-center"><span><BsTruck className="text-lg" /></span>Fast Delivery</li>
              <li className="flex gap-2 items-center"><span><IoShieldOutline className="text-lg" /></span>Secure Checkout</li>
              <li className="flex gap-2 items-center"><span><GrPowerCycle className="text-lg" /></span>Easy Returns</li>
            </ul>

          </div>

        </div>

      </section>


      {/* Category */}
      <div id="category-section" className="mt-14 flex flex-col gap-3">
        <h3 className="text-xl font-semibold">Shop by Category</h3>
        <p>Browse the latest curated collections</p>

        {/* category cards */}
        <div className="grid grid-cols-5 gap-5 mt-5">
          {/* mens category card */}
          <Link to="/products?keyword=Mens" className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group">
            <img src={mensCategory} alt="Men's Category" className="w-full h-[16em] object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-lg pointer-events-none"></div>
            <span className="absolute bottom-3 left-4 text-white font-semibold text-lg">Mens</span>
          </Link>
          <Link to="/products?keyword=Womens" className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group">
            <img src={womensCategory} alt="Women's Category" className="w-full h-[16em] object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-lg pointer-events-none"></div>
            <span className="absolute bottom-3 left-4 text-slate-200 font-semibold text-lg">Womens</span>
          </Link>
          <Link to="/products?keyword=Accessories" className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group">
            <img src={accessoriesCategory} alt="Accessories Category" className="w-full h-[16em] object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-lg pointer-events-none"></div>
            <span className="absolute bottom-3 left-4 text-slate-200 font-semibold text-lg">Accessories</span>
          </Link>
          <Link to="/products?keyword=Electronics" className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group">
            <img src={electronicsCategory} alt="Electronics Category" className="w-full h-[16em] object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-lg pointer-events-none"></div>
            <span className="absolute bottom-3 left-4 text-slate-200 font-semibold text-lg">Electronics</span>
          </Link>
          <Link to="/products?keyword=Home" className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group">
            <img src={homeCategory} alt="Home Category" className="w-full h-[16em] object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-lg pointer-events-none"></div>
            <span className="absolute bottom-3 left-4 text-slate-200 font-semibold text-lg">Home</span>
          </Link>
        </div>
      </div>


      {/* Trending Products */}
      <div className="mt-14 flex flex-col gap-3 pb-16">

        {/* Section header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-medium flex items-center gap-1.5">
                <HiOutlineFire className="text-sm" />Trending Now
              </span>
            </div>
            <h3 className="text-xl font-semibold">Trending Products</h3>
            <p className="text-gray-500 text-sm mt-1">Handpicked favorites our customers love</p>
          </div>
          <Link to="/products" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition group">
            View All
            <HiOutlineArrowRight className="text-base group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product cards grid */}
        {loading ? (
          <div className="grid grid-cols-4 gap-6 mt-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-xl h-[16em]"></div>
                <div className="mt-3 space-y-2">
                  <div className="bg-gray-200 rounded h-4 w-3/4"></div>
                  <div className="bg-gray-200 rounded h-4 w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6 mt-5">
            {trendingProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/products/details/${product._id}`)}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                {/* Product image */}
                <div className="relative overflow-hidden h-[16em] bg-gray-50">
                  <img
                    src={product?.images?.[0]?.public_url}
                    alt={product?.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                  {/* Wishlist icon */}
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    className="absolute top-3 right-3 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 hover:cursor-pointer"
                  >
                    <CiHeart className="text-xl text-gray-700" />
                  </button>

                  {/* Category badge */}
                  {product?.category && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {product.category}
                    </span>
                  )}
                </div>

                {/* Product info */}
                <div className="p-4">
                  <h4 className="text-sm font-medium text-gray-800 multiline-ellipsis leading-snug mb-2">
                    {product?.name}
                  </h4>

                  <div className="flex items-center gap-2 mb-2">
                    <RatingsStar ratings={product?.ratings} />
                    {product?.numberOfReviews > 0 && (
                      <span className="text-xs text-gray-400">({product.numberOfReviews})</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-gray-900">₹{product?.price?.toLocaleString()}</span>
                    {product?.stock > 0 ? (
                      <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">In Stock</span>
                    ) : (
                      <span className="text-xs text-red-500 font-medium bg-red-50 px-2 py-0.5 rounded-full">Out of Stock</span>
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

