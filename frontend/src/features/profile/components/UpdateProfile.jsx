import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../auth/slices/authSlice";
import { IoCameraOutline } from "react-icons/io5";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.authSlice);

  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", name);
    if (avatar) {
      form.append("newAvatar", avatar);
    }
    dispatch(updateProfile(form));
  };

  return (
    <div className="max-w-md mx-auto flex flex-col items-center">
      <h2 className="text-xl font-bold text-gray-900 mb-6 w-full text-left">Update Profile</h2>
      
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-6">
        {/* Avatar Upload Container */}
        <div className="relative group w-32 h-32 rounded-full overflow-hidden border border-gray-200 shadow-sm bg-gray-50 flex items-center justify-center cursor-pointer">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleAvatarChange} 
            className="absolute inset-0 z-10 opacity-0 cursor-pointer"
          />
          <img 
            src={avatarPreview || user?.avatar?.public_url} 
            alt={name} 
            className="w-full h-full object-cover transition duration-300 group-hover:scale-102" 
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <IoCameraOutline className="text-2xl" />
          </div>
        </div>

        {/* Input Details */}
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name</label>
          <input 
            id="name" 
            required
            spellCheck={false} 
            autoComplete="off" 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your name"
            className="w-full bg-gray-50 border border-gray-200 outline-none rounded-xl py-3 px-4 focus:border-black focus:bg-white transition text-sm" 
          />
        </div>

        {error && <span className="text-xs font-semibold text-red-600 self-start">*{error}</span>}

        <button 
          type="submit"
          disabled={status === "loading"} 
          className="w-full py-3.5 rounded-2xl bg-black text-white hover:bg-gray-950 font-bold transition flex items-center justify-center hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
