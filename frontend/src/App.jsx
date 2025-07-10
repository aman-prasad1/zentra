import { lazy, Profiler, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/Home.jsx"));
const SignUp = lazy(()=> import("./pages/SignUp.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const NavBar = lazy(() => import("./components/NavBar.jsx"));
const Product = lazy(() => import("./pages/Products.jsx"));
const ContactUs = lazy(() => import("./pages/ContactUs.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));

const App = () => {
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
