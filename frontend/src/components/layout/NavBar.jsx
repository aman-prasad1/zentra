import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiShoppingBag } from "react-icons/fi";
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import SearchBar from "./SearchBar";

const NavBar = () => {
  const { user } = useSelector((state) => state.authSlice);
  const cartCount = useSelector((state) => state.cartSlice?.cartItems?.length ?? 0);
  const wishlistCount = useSelector((state) => state.wishlistSlice?.items?.length ?? 0);

  return (
    <div className="w-full h-20 fixed z-30 top-0 left-0 bg-(--main-bg) px-4 sm:px-8 flex justify-between items-center border-b border-gray-100">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl p-2 bg-black">
          <Link to="/"><FiShoppingBag className="w-5 h-5 text-white" /></Link>
        </div>
        <div className="hidden md:flex flex-col leading-tight">
          <h1 className="text-[1.4em] font-bold leading-none tracking-tight">Zentra</h1>
          <p className="text-[11px] text-gray-500 font-normal mt-0.5">Modern ecommerce</p>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar />

      {/* Right Icons */}
      <div className="flex items-center gap-5">
        {/* Wishlist with badge */}
        <Link to="/wishlist" className="relative text-[26px] text-gray-600 hover:text-black transition-colors">
          <CiHeart />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1.5 bg-black text-white text-[9px] min-w-[16px] h-4 rounded-full flex items-center justify-center font-semibold px-0.5">
              {wishlistCount}
            </span>
          )}
        </Link>

        {/* Cart with badge */}
        <Link to="/cart" className="relative text-[26px] text-gray-600 hover:text-black transition-colors">
          <CiShoppingCart />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1.5 bg-black text-white text-[9px] min-w-[16px] h-4 rounded-full flex items-center justify-center font-semibold px-0.5">
              {cartCount}
            </span>
          )}
        </Link>

        {/* User / Profile */}
        {user ? (
          <Link to="/profile" className="text-[26px] text-gray-600 hover:text-black transition-colors">
            <CiUser />
          </Link>
        ) : (
          <Link to="/login" className="text-[26px] text-gray-600 hover:text-black transition-colors">
            <CiUser />
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;