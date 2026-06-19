import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import ProfileSideBar from '../components/ProfileSideBar';
import { HiOutlineChevronRight } from 'react-icons/hi';

// profile components import
import DashBoard from '../components/DashBoard';
import UpdateProfile from '../components/UpdateProfile';
import AccountsSecurity from '../components/AccountsSecurity';
import ChangePassword from '../components/ChangePassword';
import MyOrder from '../components/MyOrders';
import Logout from '../components/Logout';

const Profile = () => {
  const [i, seti] = useState(1);
  const auth = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user) {
      navigate('/login');
    }
  }, [auth.user, navigate]);

  return (
    <div className="bg-(--main-bg) min-h-screen px-4 sm:px-8 lg:px-20 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-8 font-medium">
        <Link to="/" className="hover:text-black transition">Home</Link>
        <HiOutlineChevronRight className="text-[10px]" />
        <span className="text-gray-900 font-semibold">My Account</span>
      </div>

      {/* Main Profile Layout */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <ProfileSideBar user={auth.user} seti={seti} activeTab={i} />

        <div className="flex-1 w-full bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm min-h-[50vh]">
          {
            i === 0 ? <DashBoard /> :
            i === 1 ? <UpdateProfile /> :
            i === 2 ? <MyOrder /> :
            i === 3 ? <ChangePassword /> :
            i === 4 ? <AccountsSecurity /> :
            i === 5 ? <Logout /> : <></>
          }
        </div>
      </div>
    </div>
  );
};

export default Profile;
