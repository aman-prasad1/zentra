import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./features/auth/authSlice.js";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/Home.jsx"));
const SignUp = lazy(()=> import("./pages/SignUp.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const NavBar = lazy(() => import("./components/NavBar.jsx"));
const Product = lazy(() => import("./pages/Products.jsx"));
const ContactUs = lazy(() => import("./pages/ContactUs.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));

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
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
};

export default App;
