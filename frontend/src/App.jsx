import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./features/auth/slices/authSlice.js";
import Loader from "./components/ui/Loader";

const Home = lazy(() => import("./pages/Home.jsx"));
const SignUp = lazy(()=> import("./features/auth/pages/SignUp.jsx"));
const Login = lazy(() => import("./features/auth/pages/Login.jsx"));
const NavBar = lazy(() => import("./components/layout/NavBar.jsx"));
const Footer = lazy(() => import("./components/layout/Footer.jsx"));
const Product = lazy(() => import("./features/product/pages/Products.jsx"));
const ContactUs = lazy(() => import("./pages/ContactUs.jsx"));
const Profile = lazy(() => import("./features/profile/pages/Profile.jsx"));
const ProductDetails = lazy(() => import("./features/product/pages/ProductDetails.jsx"));
const Cart = lazy(() => import("./features/cart/pages/Cart.jsx"));
const Order = lazy(() => import('./features/order/pages/Order.jsx'));


const App = () => {

  const dispatch = useDispatch();
  let { user, status } = useSelector((state) => state.authSlice);

  // fetching user on first load
  useEffect(() => {
    dispatch(getUser());
  },[])

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <NavBar /> {/* NavBar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Product />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products/details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/order' element={<Order />} />
        </Routes>
        <Footer />
      </Suspense>
    </BrowserRouter>
  )
};

export default App;
