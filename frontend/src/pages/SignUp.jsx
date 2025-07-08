import React, { useEffect, useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../features/auth/authSlice.js';
import person from '../assets/person.png';

const SignUp = () => {

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.authSlice);

  const [showCnfPass, setShowCnfPass] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setavatar] = useState();
  const [cnfPassword, setCnfPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append('name', name);
      form.append('email', email);
      form.append('password', password);
      form.append('confirmPassword', cnfPassword);
      form.append('avatar', avatar);
  
      // signup call
      dispatch(signupUser(form));

    } catch (err) {
      setErrorMsg("Something went Wrong");
    }
  }

  // actions to perform signup api call
  useEffect(() => {
    if(status === "failed") {
      setErrorMsg(`*${error}`)
    } else {
      setErrorMsg("");
    }
  }, [status])

  // converting a default image as a avatar
  useEffect(() => {
    const getImg = async () => {
      const res = await fetch(person);
      const blob = await res.blob();
      const img = new File([blob], "avatar.png", { type: blob.type });
      setavatar(img);
    };
    getImg();
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-11/12 h-9/12 p-4 sm:max-w-[500px] box-border flex flex-col gap-3 rounded-2xl shadow-2xl">
        <h2 className="text-center text-4xl font-semibold">SignUp</h2>

        <div className="flex flex-col items-center gap-y-8 mt-5">
          <input
            type="text"
            className="border-b w-10/12 h-10 p-3 outline-none hover:scale-105 transition-all font-light"
            placeholder="Name"
            spellCheck={false}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="border-b w-10/12 h-10 p-3 outline-none hover:scale-105 transition-all font-light"
            placeholder="Email"
            spellCheck={false}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="border-b w-10/12 h-10 p-3 relative hover:scale-105 transition-all">
            <input
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
          </div>
          <div className="border-b w-10/12 h-10 p-3 relative hover:scale-105 transition-all">
            <input
              type={`${showCnfPass ? "text" : "password"}`}
              className={`outline-none w-full font-light`}
              placeholder="Confirm Password"
              spellCheck={false}
              onChange={(e) => setCnfPassword(e.target.value)}
            />
            <div
              className="absolute top-3 end-3 cursor-pointer"
              onClick={() => setShowCnfPass(!showCnfPass)}
            >
              {showCnfPass ? <GoEye /> : <GoEyeClosed />}
            </div>
            <span className="absolute left-1 top-10 text-red-700">{errorMsg}</span>
          </div>

          <div className="w-full py-2 h-18 flex justify-center items-center box-border">
            <button className="py-2 px-4 rounded bg-amber-500 cursor-pointer hover:text-lg transition-all">
              Register
            </button>
          </div>
        </div>
        <span className="text-center font-light p-2">
          Already have an account{" "}
          <a href="/login" className="text-blue-700 font-bold underline">
            Login
          </a>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
