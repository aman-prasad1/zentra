import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router'
import ProfileSideBar from '../components/ProfileSideBar';

// profile components import
import DashBoard from '../components/profileComponents/DashBoard';
import UpdateProfile from '../components/profileComponents/UpdateProfile';
import AccountsSecurity from '../components/profileComponents/AccountsSecurity';
import ChangePassword from '../components/profileComponents/ChangePassword';
import MyOrder from '../components/profileComponents/MyOrders';
import Logout from '../components/profileComponents/Logout';

const Profile = () => {

  const [i, seti] = useState(1);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authSlice);
  const navigate = useNavigate();


  // checking user loggedin or not
  useEffect(() => {
    if(!auth.user) {
      navigate('/login');
    }
  },[])

  return (
    <div className='relative box-border h-[91vh] md:flex'>
      <ProfileSideBar user={auth.user} seti={seti} />

      <div className="h-full flex-1 md:block pt-15 md:pt-0 overflow-y-scroll">
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
  )
}

export default Profile
