import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";

const SignUp = lazy(()=> import("./pages/SignUp.jsx"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/signup" element={<SignUp />}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
};

export default App;
