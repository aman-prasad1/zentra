import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../slices/authSlice.js';
import person from '../../../assets/images/person.png';
import VerifyOTP from "../components/VerifyOTP.jsx";

const SignUp = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  const [showCnfPass, setShowCnfPass] = useState(false);
  const [showPass, setShowPass] = useState(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [cnfPassword, setCnfPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== cnfPassword) {
      setErrorMsg("*Passwords do not match");
      return;
    }
    setErrorMsg("");

    const form = new FormData();
    form.append('name', name);
    form.append('email', email);
    form.append('password', password);
    form.append('confirmPassword', cnfPassword);
    if (avatar) {
      form.append('avatar', avatar);
    }

    dispatch(signupUser(form));
  };

  useEffect(() => {
    if (status === "failed") {
      setErrorMsg(`*${error}`);
    } else if (status === "succeeded") {
      navigate("/login");
    }
  }, [status, error, navigate]);

  useEffect(() => {
    const getImg = async () => {
      try {
        const res = await fetch(person);
        const blob = await res.blob();
        const img = new File([blob], "avatar.png", { type: blob.type });
        setAvatar(img);
      } catch (err) {
        // Fallback if local image fails to load
      }
    };
    getImg();
  }, []);

  return (
    <div className="bg-(--main-bg) min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white p-6 sm:p-10 rounded-3xl border border-gray-150 shadow-lg">
        {status === "verifying" ? (
          <VerifyOTP email={email} />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
              <p className="text-xs text-gray-500 mt-1.5">Sign up to unlock rewards, track orders, and more</p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-semibold text-gray-700">Full Name</label>
                <input
                  required
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  spellCheck={false}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 outline-none rounded-xl py-3 px-4 focus:border-black focus:bg-white transition text-sm"
                />
              </div>

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
                <label htmlFor="pass" className="text-xs font-semibold text-gray-700">Password</label>
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

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5 relative">
                <label htmlFor="cnfPass" className="text-xs font-semibold text-gray-700">Confirm Password</label>
                <div className="relative flex items-center">
                  <input
                    required
                    id="cnfPass"
                    name="cnfPassword"
                    type={showCnfPass ? "text" : "password"}
                    placeholder="••••••••"
                    spellCheck={false}
                    onChange={(e) => setCnfPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 outline-none rounded-xl py-3 pl-4 pr-12 text-sm focus:border-black focus:bg-white transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCnfPass(!showCnfPass)}
                    className="absolute right-4 text-gray-400 hover:text-black transition cursor-pointer"
                  >
                    {showCnfPass ? <GoEye className="text-lg" /> : <GoEyeClosed className="text-lg" />}
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
              {status === "loading" ? "Creating Account..." : "Create Account"}
            </button>

            <span className="text-center text-sm text-gray-500 font-medium">
              Already have an account?{" "}
              <Link to="/login" className="text-black font-bold hover:underline">
                Sign In
              </Link>
            </span>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
