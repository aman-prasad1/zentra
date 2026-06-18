import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { CiInstagram, CiMail } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] text-gray-400">

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-xl p-2 bg-white">
                <FiShoppingBag className="w-5 h-5 text-black" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Zentra</h2>
                <p className="text-[11px] text-gray-500 font-normal">Modern ecommerce</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              A modern e-commerce platform built for seamless shopping.
              Discover curated collections, trending products, and
              an experience designed around you.
            </p>
          </div>

          {/* Shop column */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/products" className="hover:text-white transition">All Products</Link>
              </li>
              <li>
                <Link to="/products?keyword=Mens" className="hover:text-white transition">Men's Fashion</Link>
              </li>
              <li>
                <Link to="/products?keyword=Womens" className="hover:text-white transition">Women's Fashion</Link>
              </li>
              <li>
                <Link to="/products?keyword=Electronics" className="hover:text-white transition">Electronics</Link>
              </li>
              <li>
                <Link to="/products?keyword=Accessories" className="hover:text-white transition">Accessories</Link>
              </li>
            </ul>
          </div>

          {/* Support column */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/contact" className="hover:text-white transition">Contact Us</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-white transition">My Account</Link>
              </li>
              <li>
                <Link to="/order" className="hover:text-white transition">Track Order</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition">Shopping Cart</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">Help Center</Link>
              </li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition">Refund Policy</Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Zentra. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a href="https://github.com/aman-prasad1" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 hover:border-white/20 transition">
              <FiGithub className="text-sm" />
            </a>
            <a href="https://linkedin.com/in/amanprasad1" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 hover:border-white/20 transition">
              <CiLinkedin className="text-base" />
            </a>
            <a href="https://instagram.com/aman_prasad88" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 hover:border-white/20 transition">
              <CiInstagram className="text-base" />
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
