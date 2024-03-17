import React from 'react';
import Logo from '../assets/Logo';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { resetState } from '../redux/slices/userAuthorSlice';


function Header() {

  const {loginUserStatus,currentUser}=useSelector(state=>state.userAuthorLoginReducer);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const navItems=[
    {
      name: 'Home',
      slug: "/",
      active: !loginUserStatus,
    },
    {
      name: "SignIn",
      slug: "/signin",
      active: !loginUserStatus,
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !loginUserStatus,
    }
  ];

  function logOut(){
    // remove token from localStorage
    localStorage.removeItem("token");
    dispatch(resetState());
    navigate("/");
  }

  return (
    <header className='w-full py-3 ps-5 pe-12 bg-black'>
      <div className="flex ">
        <div className="">
          <Logo width='100px'/>
        </div>
        <ul className='flex ml-auto'>
          {
            navItems.map(x=>
              x.active?(
                <li key={x.name}>
                  <button className='inline-bock font-mono font-bold text-xl text-white px-6 py-2 duration-200 hover:bg-blue-50 hover:text-black rounded-full'
                    onClick={()=>navigate(x.slug)}>
                    {x.name}
                  </button>
                </li>
              ):null
            )
          }
          {
            loginUserStatus && (<li key={currentUser._id}><p className='inline-bock font-mono font-bold text-xl text-white px-6 py-2 hover:text-gray-300'>
                Welcome {currentUser.username}{`(${currentUser.userType})`}
              </p></li>)
          }
          {
            loginUserStatus && (<li key="logout">
              <button className='inline-bock font-mono font-bold text-xl text-white px-6 py-2 duration-200 hover:bg-blue-50 hover:text-black rounded-full'
                onClick={logOut}>
                Logout
              </button>
            </li>)
          }
        </ul>
      </div>
    </header>
  )
}

export default Header;