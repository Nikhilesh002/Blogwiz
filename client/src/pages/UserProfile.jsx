import React from 'react';
import { Outlet } from 'react-router-dom';

function UserProfile() {
  return (
    <div className='w-full min-h-96'>
      <Outlet/>
    </div>
  )
}

export default UserProfile;