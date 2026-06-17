import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { LuStar } from "react-icons/lu";
import { BsTruck } from "react-icons/bs";
import { IoShieldOutline } from "react-icons/io5";
import { GrPowerCycle } from "react-icons/gr";
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

  return (
    <div className="bg-(--main-bg) px-20 ">
      
      {/* Top bar */}
      <div className="h-[4em] flex items-center justify-center border-b border-gray-200">
        <ul className="flex gap-10">
          <li><Link to="/" className="flex gap-2"><span><IoHomeOutline className="text-lg" /></span><span>Home</span></Link></li>
          <li><Link to="/products" className="flex gap-2"><span><FiShoppingBag className="text-lg" /></span><span>Shop</span></Link></li>
          <li><Link to="/" className="flex gap-2"><span><IoHomeOutline className="text-lg" /></span><span>Categories</span></Link></li>
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
      <div className="mt-14 flex flex-col gap-3">
        <h3 className="text-xl font-semibold">Shop by Category</h3>
        <p>Browse the latest curated collections</p>

        {/* category cards */}
        <div className="grid grid-cols-5 gap-5 mt-5">
          {/* mens category card */}
          <div className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group">
            <img src={mensCategory} alt="Men's Category" className="w-full h-[16em] object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-lg pointer-events-none"></div>
            <span className="absolute bottom-3 left-4 text-white font-semibold text-lg">Mens</span>
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group">
            <img src={womensCategory} alt="Women's Category" className="w-full h-[16em] object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-lg pointer-events-none"></div>
            <span className="absolute bottom-3 left-4 text-slate-200 font-semibold text-lg">Womens</span>
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group">
            <img src={accessoriesCategory} alt="Accessories Category" className="w-full h-[16em] object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-lg pointer-events-none"></div>
            <span className="absolute bottom-3 left-4 text-slate-200 font-semibold text-lg">Accessories</span>
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group">
            <img src={electronicsCategory} alt="Electronics Category" className="w-full h-[16em] object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-lg pointer-events-none"></div>
            <span className="absolute bottom-3 left-4 text-slate-200 font-semibold text-lg">Electronics</span>
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group">
            <img src={homeCategory} alt="Home Category" className="w-full h-[16em] object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-lg pointer-events-none"></div>
            <span className="absolute bottom-3 left-4 text-slate-200 font-semibold text-lg">Home</span>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Home;
