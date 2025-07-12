import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

const SideBar = () => {
  
  const { user } = useSelector((state) => state.authSlice);

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="md:hidden text-center">
      {(isOpen)? 
        (<div className="relative">
        <IoCloseSharp onClick={handleChange} className="text-2xl" />
        <div onClick={handleChange} className="absolute flex flex-col items-start left-[-1rem] sm:left-[-2rem] top-11 z-30 h-screen w-[45vw] rounded-2xl bg-[var(--sidebar-bg)] shadow-2xl">
            {(user)? <Link className="w-full h-16 text-start border-b border-slate-500 p-4" to="/profile" >Profile</Link> : <Link className="w-full h-16 text-start border-b border-slate-500 p-4" to="/login" >Login</Link>}
            <Link className="w-full h-16 text-start border-b border-slate-500 p-4" to="/" >Home</Link>
            <Link className="w-full h-16 text-start border-b border-slate-500 p-4" to="/products" >Products</Link>
            <Link className="w-full h-16 text-start border-b border-slate-500 p-4" to="/contact" >Contact Us</Link>
        </div>
      </div>) : <RxHamburgerMenu onClick={handleChange} className="text-2xl" />}
      
      
    </div>
  )
}

export default SideBar
