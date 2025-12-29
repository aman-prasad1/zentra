import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import { loginUser } from "../features/auth/authSlice";
import Loader from "../components/Loader";

const SignUp = () => {

  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.authSlice);

  const navigate = useNavigate();

  const mainRef = useRef("");
  
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {  
      // loging call
      dispatch(loginUser({email: email, password: password}));

    } catch (err) {
      setErrorMsg("Something went Wrong");
    }
  }

  // actions to perform signup api call
  useEffect(() => {
    if(status === "succeeded" && user) {
      navigate('/');
    } else if(status === "failed") {
      setErrorMsg(`*${error}`)
    }
  }, [status])

  useEffect(() => {
    mainRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [])

  return (
    <div className="relative">
      {status === "loading"? <Loader className="absolute z-20 m-20" /> : <div className="h-12"></div>}
      <div ref={mainRef} className="absolute z-10 pt-10 w-screen flex flex-row justify-center items-center">
        <form onSubmit={handleSubmit} className="w-11/12 p-4 sm:max-w-125 box-border flex flex-col gap-3 rounded-2xl shadow-2xl">
          <h2 className="text-center text-4xl font-semibold">Login</h2>

          <div className="flex flex-col items-center gap-y-8 mt-5">
            <input
              name="email"
              autoComplete="off"
              type="text"
              className="border-b w-10/12 h-10 p-3 outline-none hover:scale-105 transition-all font-light"
              placeholder="Email"
              spellCheck={false}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="border-b w-10/12 h-10 p-3 relative hover:scale-105 transition-all">
              <input
                name="password"
                type={`${showPass ? "text" : "password"}`}
                className=" outline-none w-full font-light"
                placeholder="Password"
                spellCheck={false}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute top-3 end-3 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <GoEye /> : <GoEyeClosed />}
              </div>
              <span className="absolute left-1 top-10 text-red-700">{errorMsg}</span>
            </div>
            <div className="w-full py-2 h-18 flex justify-center items-center box-border">
              <button disabled={status === "loading"} className={`py-2 px-4 rounded bg-(--primary-btn-bg) cursor-pointer transition-all ${status === "loading"? "hover:cursor-wait bg-amber-300" : "hover:cursor-pointer hover:text-lg"}`}>
                Login
              </button>
            </div>
          </div>
          <span className="text-center font-light p-2">
            Don't have an account{" "}
            <Link to="/signup" className="text-blue-700 font-bold underline">
              SignUp
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
