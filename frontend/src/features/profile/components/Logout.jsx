import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../auth/slices/authSlice.js";
import { LuLogOut } from "react-icons/lu";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto py-10 flex flex-col items-center text-center gap-6">
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
        <LuLogOut className="text-3xl text-red-500" />
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900">Logout from Zentra</h2>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          Are you sure you want to log out of your account? You will need to log back in to manage your cart, orders, and details.
        </p>
      </div>

      <div className="flex gap-4 w-full mt-4">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 py-3.5 rounded-2xl border border-gray-250 text-gray-700 hover:bg-gray-50 font-bold transition hover:cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleLogout}
          className="flex-1 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold transition hover:cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Logout;
