import React, { useEffect } from 'react';
import {useForm} from 'react-hook-form';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { userAuthorLoginThunk } from '../redux/slices/userAuthorSlice';
import { useNavigate } from 'react-router-dom';

function SignIn() {

  let dispatch=useDispatch();
  let {loginUserStatus,currentUser,errorOccured,errMsg}=useSelector(state=>state.userAuthorLoginReducer);
  const {register,handleSubmit}=useForm();
  let navigate=useNavigate();

  async function signin(data){
    dispatch(userAuthorLoginThunk(data));
  }

  useEffect(()=>{
    if(loginUserStatus===true){
      navigate(`/${currentUser.userType}-profile`);
    }
  },[loginUserStatus]);

  return (
    <div className="bg-blue-200 py-16">
      <div className='m-auto  w-80 lg:w-1/3  rounded-lg shadow-2xl px-2 py-4 bg-white '>
        <form onSubmit={handleSubmit(signin)} className='px-5 py-2' >
          <h1 className='mb-3 text-3xl font-bold font-mono text-center'>Sign-In</h1>
          <div className="flex gap-10 ps-3">
            <div className="">
              <input type="radio" name="userType" id="author" value="author"
              {...register("userType",{required:true})}/>
              <label htmlFor="author">Author</label>
            </div>

            <div className="">
              <input type="radio" name="userType" id="user" value="user"
              {...register("userType",{required:true})}/>
              <label htmlFor="user">User</label>
            </div>

            <div className="">
              <input type="radio" name="userType" id="admin" value="admin"
              {...register("userType",{required:true})}/>
              <label htmlFor="admin">Admin</label>
            </div>
          </div>

          <div className="flex flex-col gap-5 my-5">
            <input className='border-black border-2 rounded-md px-2 py-1 text-center text-lg'
              type="text" name="username" id="username" placeholder='Username'
              {...register("username",{required:true,maxLength:20})}/>

            <input className='border-black border-2 rounded-md px-2 py-1 text-center text-lg'
              type="text" name="password" id="password" placeholder='Password'
              {...register("password",{required:true,maxLength:15})}/>
          </div>

          <button type='submit' className='shadow-sm bg-green-400 hover:bg-green-500 rounded-lg px-2 py-1 block m-auto mt-4'>Sign-In</button>

        </form>
        <Link to='/signup'><p className='text-blue-500 hover:underline text-right pe-5'>New User? Create Account here</p></Link>
      </div>
    </div>
  )
}

export default SignIn;