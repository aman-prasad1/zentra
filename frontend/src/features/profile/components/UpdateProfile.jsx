import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../auth/slices/authSlice";
import { IoPencilSharp } from "react-icons/io5";


const UpdateProfile = () => {

  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.authSlice);

  const [name, setName] = useState(user?.name);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState();


  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleSubmit = () => {
    const form = new FormData();
    
    form.append("name", name);
    form.append("newAvatar", avatar);

    dispatch(updateProfile(form));
  }

  return (
    <div className="p-5 flex flex-col items-center">
      <div className="h-[140px] w-[140px] flex justify-center relative z-0 border rounded-full">
        <input type="file" accept="image/*" onChange={(e) => handleAvatarChange(e)} className=" absolute z-30 min-h-[130px] min-w-[130px] rounded-full overflow-hidden opacity-0"/>
        <div className="w-full h-full rounded-full overflow-hidden">
          <img src={avatarPreview || user?.avatar?.public_url} alt="User" className="h-full" />
        </div>
        <div className="absolute z-40 w-[15%] h-[15%] bg-slate-800 flex justify-center items-center text-slate-200 bottom-3 right-4 border rounded-full">
          <IoPencilSharp  />
        </div>
      </div>
      <div className="relative m-15 flex flex-col font-extralight">
        <label htmlFor="name" className="pl-2">Name</label>
        <input id="name" spellCheck={false} autoComplete="off" type="text" value={name} onChange={(e) => setName(e.target.value)} className="h-10 w-80 pl-4 pr-8 text-xl outline-none rounded bg-slate-300" />
        <IoPencilSharp className="absolute top-[54%] right-4" />
      </div>
      <button onClick={handleSubmit} disabled={status === "loading"} className='px-6 py-3 rounded-2xl bg-[var(--secondary-btn-bg)] hover:cursor-pointer'>Save Changes</button>
    </div>
  )
}

export default UpdateProfile
