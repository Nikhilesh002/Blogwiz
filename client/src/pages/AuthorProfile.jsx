import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet,NavLink } from 'react-router-dom';

function AuthorProfile() {
  let {currentUser}=useSelector(state=>state.userAuthorLoginReducer);

  return (
    <div className='w-full min-h-96'>
      <div className="w-full flex justify-evenly p-4 shadow-2xl bg-blue-400">
        <NavLink className={'font-mono text-xl rounded-lg px-3 py-1 bg-green-400 font-medium'}
          to={`my-articles/${currentUser.username}`} >Articles</NavLink>
        <NavLink className={'font-mono text-xl rounded-lg px-3 py-1 bg-green-400 font-medium'}
          to="write-article" >Add New</NavLink>
      </div>
      <Outlet/>
    </div>
  )
}

export default AuthorProfile;