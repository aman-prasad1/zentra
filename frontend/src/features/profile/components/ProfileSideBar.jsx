import { LuLayoutDashboard, LuUser, LuShoppingBag, LuLock, LuShieldAlert, LuLogOut } from "react-icons/lu";

const ProfileSideBar = ({ user, seti, activeTab }) => {
  const menuItems = [
    { id: 0, label: "Dashboard", icon: LuLayoutDashboard, show: user?.role === "admin" },
    { id: 1, label: "Profile", icon: LuUser, show: true },
    { id: 2, label: "My Orders", icon: LuShoppingBag, show: true },
    { id: 3, label: "Change Password", icon: LuLock, show: true },
    { id: 4, label: "Accounts & Security", icon: LuShieldAlert, show: true },
    { id: 5, label: "Logout", icon: LuLogOut, show: true },
  ];

  return (
    <aside className="w-full md:w-64 shrink-0 flex md:flex-col gap-2 p-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-x-auto md:overflow-x-visible scrollbar-none">
      {menuItems.map((item) => {
        if (!item.show) return null;
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => seti(item.id)}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 shrink-0 hover:cursor-pointer
              ${isActive 
                ? "bg-black text-white shadow-md" 
                : "text-gray-500 hover:text-black hover:bg-gray-50"}
            `}
          >
            <Icon className="text-lg" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </aside>
  );
};

export default ProfileSideBar;
