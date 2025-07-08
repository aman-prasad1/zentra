import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUser } from '../features/auth/authSlice';

const VerifyOTP = ({email}) => {
    console.log(email)
  const dispatch = useDispatch();
  const { status, error} = useSelector((state) => state.authSlice);

  const navigate = useNavigate();

  const inputRefs = Array.from({ length: 6 }, () => useRef());

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    let optStr = "";
    inputRefs.map((ref) => {
        optStr += ref.current.value
    })

    const verifyCode = Number(optStr);

    dispatch(verifyUser({email: email, verifyCode: verifyCode}))
  }

  return (
    <form onSubmit={handleVerify} className="w-[360px] h-[200px] flex flex-col items-center z-1 p-3 absolute shadow-2xl rounded-2xl">
      <div className="w-full text-center text-4xl text-slate-800 font-semibold">
        Enter OTP
      </div>
      <span>OTP sent to your email</span>
      <div className="grid grid-cols-6 place-items-center gap-2 mt-5">
        {inputRefs.map((ref, i) => (
            <input
            name="otp"
            key={i}
            type="text"
            maxLength={1}
            ref={ref}
            className="border w-[45px] h-[35px] rounded text-center text-2xl"
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleBackspace(e, i)}
            />
        ))}
      </div>
      <button disabled={status === "loading"} className="py-2 px-4 mt-4 rounded bg-amber-500 cursor-pointer hover:text-xl transition-all">Verify</button>
    </form>
  );
};

export default VerifyOTP;
