import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/Home.jsx"));
const SignUp = lazy(()=> import("./pages/SignUp.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
};

export default App;
