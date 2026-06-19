import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUser } from '../slices/authSlice';

const VerifyOTP = ({ email }) => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.authSlice);
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
    inputRefs.forEach((ref) => {
      optStr += ref.current.value;
    });
    const verifyCode = Number(optStr);
    dispatch(verifyUser({ email, verifyCode }));
  };

  return (
    <form onSubmit={handleVerify} className="w-full flex flex-col items-center gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Verify OTP</h2>
        <p className="text-xs text-gray-500 mt-1">A 6-digit verification code has been sent to {email}</p>
      </div>

      <div className="flex gap-2 justify-center my-2">
        {inputRefs.map((ref, i) => (
          <input
            name="otp"
            key={i}
            type="text"
            maxLength={1}
            ref={ref}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleBackspace(e, i)}
            className="w-12 h-12 border border-gray-200 bg-gray-50 rounded-xl text-center text-xl font-bold outline-none focus:border-black focus:bg-white transition"
          />
        ))}
      </div>

      {error && <span className="text-xs font-semibold text-red-650 self-center">*{error}</span>}

      <button 
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3.5 bg-black hover:bg-gray-950 text-white rounded-2xl font-bold transition hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Verifying..." : "Verify & Register"}
      </button>
    </form>
  );
};

export default VerifyOTP;
