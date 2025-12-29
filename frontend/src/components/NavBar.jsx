import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Zentra from '../assets/zentra.png'
import SideBar from "./SideBar";
import SearchBar from "./SearchBar";
import { CiShoppingCart } from "react-icons/ci";

const NavBar = () => {
  
  const { user } = useSelector((state) => state.authSlice);

  return (
    <div className="w-full h-16 fixed z-30 top-0 left-0 bg-(--nav-bg) px-2 sm:px-4 flex flex-row-reverse md:flex-row justify-between items-center">
      <div className="h-[80%] sm:h-full flex items-center">
        <div className="h-full">
          <Link to="/"><img src={Zentra} alt="Zentra" className="h-full mix-blend-color-burn" /> </Link>
        </div>
        <h1 className="text-2xl hidden md:block font-bold">
            Zentra
        </h1>
        <div className="md:hidden pl-2">
          <Link to="/cart" className="text-3xl"><CiShoppingCart /></Link>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar />

      {/* Right div */}
      <div className="h-full pr-4 hidden md:flex items-center justify-end gap-6 font-medium text-slate-700">
        <Link to="/" className="hover:cursor-pointer hover:scale-105 transition-all">Home</Link>
        <Link to="/products" className="hover:cursor-pointer hover:scale-105 transition-all">Products</Link>
        <Link to="/contact" className="hover:cursor-pointer hover:scale-105 transition-all">Contact Us</Link>
        <Link to="/cart" className="hover:cursor-pointer hover:scale-105 transition-all">Cart</Link>
        {(user)? <Link to="/profile" className="h-8 w-8 rounded-full overflow-hidden"><img src={user?.avatar?.public_url} alt="User" className="h-full" /></Link> : <Link to="/login" className="hover:cursor-pointer hover:scale-105 transition-all">Login</Link>}
      </div>
      <SideBar />
    </div>
  )
}

export default NavBar;
