import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/authSlice.js";

const Logout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  }

  return (
    <div className='w-full pt-20 flex justify-center'>
      <div className='flex flex-col items-center gap-8 shadow-2xl rounded-2xl p-16'>
        <span className="italic font-bold text-3">Logout from this device</span>
        <button onClick={handleLogout} className="flex w-20 justify-center text-red-800 border rounded p-2 hover:cursor-pointer">Logout</button>
      </div>
    </div>
  )
}

export default Logout
