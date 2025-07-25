import { GoEye, GoEyeClosed } from "react-icons/go";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [showCurrPass, setShowCurrPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showCnfPass, setShowCnfPass] = useState(false);

  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [cnfPass, setCnfPass] = useState("");
  

  const handleChangePassword = () => {
    dispatch(changePassword({oldPassword: currPass, newPassword: newPass, confirmNewPassword: cnfPass}))
  };

  useEffect(() => {
      setErrorMsg(error);
  }, [error])

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
        <div className="border-b w-full h-10 p-3 relative hover:scale-105 transition-all">
          <input
            name="password"
            type={`${showNewPass ? "text" : "password"}`}
            className=" outline-none w-full font-light"
            placeholder="New Password"
            spellCheck={false}
            onChange={(e) => setNewPass(e.target.value)}
          />
          <div
            className="absolute top-3 end-3 cursor-pointer"
            onClick={() => setShowNewPass(!showNewPass)}
          >
            {showNewPass ? <GoEye /> : <GoEyeClosed />}
          </div>
        </div>
        <div className="border-b w-full h-10 p-3 relative hover:scale-105 transition-all">
          <input
            name="password"
            type={`${showCnfPass ? "text" : "password"}`}
            className=" outline-none w-full font-light"
            placeholder="Confirm Password"
            spellCheck={false}
            onChange={(e) => setCnfPass(e.target.value)}
          />
          <div
            className="absolute top-3 end-3 cursor-pointer"
            onClick={() => setShowCnfPass(!showCnfPass)}
          >
            {showCnfPass ? <GoEye /> : <GoEyeClosed />}
          </div>
        </div>
        <span className="text-red-700 h-2">{errorMsg}</span>
        <div className="w-full py-2 h-18 flex justify-center items-center box-border">
          <button onClick={handleChangePassword} disabled={status === "loading"} className="py-2 px-4 rounded bg-[var(--primary-btn-bg)] hover:cursor-pointer">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
