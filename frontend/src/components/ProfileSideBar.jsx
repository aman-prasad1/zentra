
const ProfileSideBar = ({user, seti}) => {


  return (
    <aside className="fixed z-40 top-15 md:static h-15 md:w-[26%] md:h-full px-5 md:pt-5 text-slate-300 border-r border-t border-slate-500 bg-[var(--profile-sidebar-bg)] flex md:flex-col items-center gap-8 overflow-auto">
      {(user?.role === "admin")? <div className="min-w-fit"><span onClick={()=>seti(0)} className="md:underline hover:text-slate-400 hover:cursor-pointer">Dashboard</span></div> : <></>}
      <div className="min-w-fit"><span onClick={()=>seti(1)} className="md:underline hover:text-slate-400 hover:cursor-pointer">Profile</span></div>
      <div className="min-w-fit"><span onClick={()=>seti(2)} className="md:underline hover:text-slate-400 hover:cursor-pointer">My Orders</span></div>
      <div className="min-w-fit"><span onClick={()=>seti(3)} className="md:underline hover:text-slate-400 hover:cursor-pointer">Change Password</span></div>
      <div className="min-w-fit"><span onClick={()=>seti(4)} className="md:underline hover:text-slate-400 hover:cursor-pointer">Accounts & Security</span></div>
      <div className="min-w-fit"><span onClick={()=>seti(5)} className="md:underline hover:text-slate-400 hover:cursor-pointer">Logout</span></div>
    </aside>
  )
}

export default ProfileSideBar
