import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Zentra from '../assets/zentra.png'
import SideBar from "./SideBar";

const NavBar = () => {
  
  const { user } = useSelector((state) => state.authSlice);

  return (
    <div className="w-full h-16 fixed z-30 top-0 left-0 bg-[var(--nav-bg)] shadow px-8 flex flex-row-reverse sm:flex-row justify-between items-center">
      <div className="h-full flex items-center">
        <div className="h-full">
          <img src={Zentra} alt="Zentra" className="h-full mix-blend-color-burn" />
        </div>
        <h1 className="text-2xl font-bold">
            Zentra
        </h1>
      </div>

      {/* Right div */}
      <div className="h-full pr-4 hidden sm:flex items-center justify-end gap-6 text-lg font-medium text-slate-700">
        <Link to="/" className="hover:cursor-pointer hover:scale-105 transition-all">Home</Link>
        <Link to="/products" className="hover:cursor-pointer hover:scale-105 transition-all">Products</Link>
        <Link to="/contact" className="hover:cursor-pointer hover:scale-105 transition-all">Contact Us</Link>
        {(user)? <Link to="/profile" className="h-8 w-8 rounded-full overflow-hidden"><img src={user?.avatar?.public_url} alt="User" className="h-full" /></Link> : <Link to="/login" className="hover:cursor-pointer hover:scale-105 transition-all">Login</Link>}
      </div>
      <SideBar />
    </div>
  )
}

export default NavBar;
