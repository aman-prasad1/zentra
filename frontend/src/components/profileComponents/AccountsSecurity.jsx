import { GoEye, GoEyeClosed } from "react-icons/go";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";


const AccountsSecurity = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.authSlice);

  const [currPass, setCurrPass] = useState("")
  const [showCurrPass, setShowCurrPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");


  useEffect(() => {
    setErrorMsg(error);
  },[error])

  useEffect(() => {
    if(!user) {
      navigate('/login');
    }
  },[user])

  const handleDelete = () => {
    dispatch(deleteAccount(currPass));
  }

  return (
    <div className="w-full pt-20 flex justify-center">
      <div className="w-[35rem] flex flex-col items-center gap-8 shadow-2xl rounded-2xl p-10">
        <div className="border-b w-full h-10 p-3 relative hover:scale-105 transition-all">
          <input
            name="password"
            type={`${showCurrPass ? "text" : "password"}`}
            className=" outline-none w-full font-light"
            placeholder="Current Password"
            spellCheck={false}
            onChange={(e) => setCurrPass(e.target.value)}
          />
          <div
            className="absolute top-3 end-3 cursor-pointer"
            onClick={() => setShowCurrPass(!showCurrPass)}
          >
            {showCurrPass ? <GoEye /> : <GoEyeClosed />}
          </div>
        </div>
        <span className="text-red-700 h-2">{errorMsg}</span>
        <div className="w-full py-2 h-18 flex justify-center items-center box-border">
          <button disabled={status === "loading"} onClick={handleDelete} className="flex items-center gap-1 text-red-800 border rounded p-2 hover:cursor-pointer">Delete Account <AiOutlineDelete /></button>
        </div>
      </div>
    </div>
  )
}

export default AccountsSecurity
