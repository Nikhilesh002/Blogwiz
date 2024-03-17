import React from 'react'

function LogoutBtn() {

  const x=5;

  return (
    <button className='inline-bock font-mono font-bold text-xl text-white px-6 py-2 duration-200 hover:bg-blue-50 hover:text-black rounded-full'
      onClick={x}>
      Log Out
    </button>
  )
}

export default LogoutBtn;