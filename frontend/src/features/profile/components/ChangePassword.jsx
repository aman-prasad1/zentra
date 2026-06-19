import { GoEye, GoEyeClosed } from "react-icons/go";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../auth/slices/authSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.authSlice);

  const [showCurrPass, setShowCurrPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showCnfPass, setShowCnfPass] = useState(false);

  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [cnfPass, setCnfPass] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();
    dispatch(changePassword({ oldPassword: currPass, newPassword: newPass, confirmNewPassword: cnfPass }));
  };

  return (
    <div className="max-w-md mx-auto flex flex-col">
      <div className="border-b border-gray-100 pb-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
        <p className="text-xs text-gray-500 mt-1">Ensure your account is using a secure, long password</p>
      </div>

      <form onSubmit={handleChangePassword} className="flex flex-col gap-6">
        {/* Current Password */}
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="currPass" className="text-sm font-semibold text-gray-700">Current Password</label>
          <div className="relative flex items-center">
            <input
              required
              id="currPass"
              name="currPass"
              type={showCurrPass ? "text" : "password"}
              value={currPass}
              onChange={(e) => setCurrPass(e.target.value)}
              placeholder="••••••••"
              spellCheck={false}
              className="w-full bg-gray-50 border border-gray-200 outline-none rounded-xl py-3 pl-4 pr-12 text-sm focus:border-black focus:bg-white transition"
            />
            <button
              type="button"
              className="absolute right-4 text-gray-400 hover:text-black transition cursor-pointer"
              onClick={() => setShowCurrPass(!showCurrPass)}
            >
              {showCurrPass ? <GoEye className="text-lg" /> : <GoEyeClosed className="text-lg" />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="newPass" className="text-sm font-semibold text-gray-700">New Password</label>
          <div className="relative flex items-center">
            <input
              required
              id="newPass"
              name="newPass"
              type={showNewPass ? "text" : "password"}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="••••••••"
              spellCheck={false}
              className="w-full bg-gray-50 border border-gray-200 outline-none rounded-xl py-3 pl-4 pr-12 text-sm focus:border-black focus:bg-white transition"
            />
            <button
              type="button"
              className="absolute right-4 text-gray-400 hover:text-black transition cursor-pointer"
              onClick={() => setShowNewPass(!showNewPass)}
            >
              {showNewPass ? <GoEye className="text-lg" /> : <GoEyeClosed className="text-lg" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="cnfPass" className="text-sm font-semibold text-gray-700">Confirm New Password</label>
          <div className="relative flex items-center">
            <input
              required
              id="cnfPass"
              name="cnfPass"
              type={showCnfPass ? "text" : "password"}
              value={cnfPass}
              onChange={(e) => setCnfPass(e.target.value)}
              placeholder="••••••••"
              spellCheck={false}
              className="w-full bg-gray-50 border border-gray-200 outline-none rounded-xl py-3 pl-4 pr-12 text-sm focus:border-black focus:bg-white transition"
            />
            <button
              type="button"
              className="absolute right-4 text-gray-400 hover:text-black transition cursor-pointer"
              onClick={() => setShowCnfPass(!showCnfPass)}
            >
              {showCnfPass ? <GoEye className="text-lg" /> : <GoEyeClosed className="text-lg" />}
            </button>
          </div>
        </div>

        {error && <span className="text-xs font-semibold text-red-600 mt-1">*{error}</span>}

        <button 
          type="submit"
          disabled={status === "loading"} 
          className="w-full py-3.5 rounded-2xl bg-black text-white hover:bg-gray-950 font-bold transition flex items-center justify-center hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
