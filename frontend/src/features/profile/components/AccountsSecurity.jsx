import { GoEye, GoEyeClosed } from "react-icons/go";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount } from "../../auth/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

const AccountsSecurity = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.authSlice);

  const [currPass, setCurrPass] = useState("");
  const [showCurrPass, setShowCurrPass] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm("Are you absolutely sure you want to delete your account? This action is irreversible.")) {
      dispatch(deleteAccount(currPass));
    }
  };

  return (
    <div className="max-w-md mx-auto flex flex-col">
      <div className="border-b border-gray-100 pb-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900">Delete Account</h2>
        <p className="text-xs text-gray-500 mt-1">Permanently remove your personal details and account history</p>
      </div>

      <div className="bg-red-50 text-red-700 text-xs p-4 rounded-2xl border border-red-100 mb-6 leading-relaxed font-medium">
        <strong>Warning:</strong> Deleting your account will immediately erase all of your active sessions, profile details, and shopping records. This cannot be undone.
      </div>

      <form onSubmit={handleDelete} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="confirmPass" className="text-sm font-semibold text-gray-700">Enter Password to Confirm</label>
          <div className="relative flex items-center">
            <input
              required
              id="confirmPass"
              name="confirmPass"
              type={showCurrPass ? "text" : "password"}
              value={currPass}
              onChange={(e) => setCurrPass(e.target.value)}
              placeholder="••••••••"
              spellCheck={false}
              className="w-full bg-gray-50 border border-gray-200 outline-none rounded-xl py-3 pl-4 pr-12 text-sm focus:border-red-500 focus:bg-white transition"
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

        {error && <span className="text-xs font-semibold text-red-600 mt-1">*{error}</span>}

        <button 
          type="submit"
          disabled={status === "loading" || !currPass} 
          className="w-full py-3.5 rounded-2xl bg-red-600 text-white hover:bg-red-700 font-bold transition flex items-center justify-center gap-2 shadow-sm hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <AiOutlineDelete className="text-lg" />
          <span>{status === "loading" ? "Deleting Account..." : "Permanently Delete Account"}</span>
        </button>
      </form>
    </div>
  );
};

export default AccountsSecurity;
