import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import { loginUser } from "../slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (status === "succeeded" && user) {
      navigate('/');
    } else if (status === "failed") {
      setErrorMsg(`*${error}`);
    }
  }, [status, user, error, navigate]);

  return (
    <div className="bg-(--main-bg) min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white p-6 sm:p-10 rounded-3xl border border-gray-150 shadow-lg">
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
            <p className="text-xs text-gray-500 mt-1.5">Sign in to your Zentra account to continue shopping</p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-gray-700">Email Address</label>
              <input
                required
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                spellCheck={false}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 outline-none rounded-xl py-3 px-4 focus:border-black focus:bg-white transition text-sm"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5 relative">
              <div className="flex justify-between items-center">
                <label htmlFor="pass" className="text-xs font-semibold text-gray-700">Password</label>
              </div>
              <div className="relative flex items-center">
                <input
                  required
                  id="pass"
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  spellCheck={false}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 outline-none rounded-xl py-3 pl-4 pr-12 text-sm focus:border-black focus:bg-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 text-gray-400 hover:text-black transition cursor-pointer"
                >
                  {showPass ? <GoEye className="text-lg" /> : <GoEyeClosed className="text-lg" />}
                </button>
              </div>
            </div>
          </div>

          {errorMsg && <span className="text-xs font-semibold text-red-650 self-start">*{errorMsg}</span>}

          <button 
            type="submit"
            disabled={status === "loading"}
            className="w-full py-4 rounded-2xl bg-black text-white hover:bg-gray-950 font-bold transition flex items-center justify-center hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {status === "loading" ? "Signing In..." : "Sign In"}
          </button>

          <span className="text-center text-sm text-gray-500 font-medium">
            Don't have an account?{" "}
            <Link to="/signup" className="text-black font-bold hover:underline">
              Create one
            </Link>
          </span>
        </form>

      </div>
    </div>
  );
};

export default Login;
