import React,{useState} from 'react';
import {useForm} from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {

  let [err,setErr]=useState('');
  let navigate=useNavigate();
  const {register,handleSubmit}=useForm();

  async function signup(data){
    // http post req
    let res=await axios.post(`${window.location.origin}/${data.userType}-api/register`,data);
    //console.log(res);
    if(res.data.message==="Registration Successful"){
      navigate('/signin');
    }
    else{
      setErr(res.data.message);
    }
  }

  return (
    <div className="bg-blue-200 py-16">
      <div className='m-auto  w-80 lg:w-1/3  rounded-lg shadow-2xl px-2 py-4 bg-white '>
        <form onSubmit={handleSubmit(signup)} className='px-5 py-2' >
          <h1 className='mb-3 text-3xl font-bold font-mono text-center'>Sign-Up</h1>
          {/* error */}
          {(err.length!==0) && (<p className='text-center text-red-500 font-mono leading-6'>{err}</p>)}
          <div className="flex gap-10 ps-5">
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
          </div>

          <div className="flex flex-col gap-5 my-5">
            <input className='border-black border-2 rounded-md px-2 py-1 text-center text-lg'
              type="email" name="email" id="email" placeholder='Email'
              {...register("email",{required:true})}/>
            <input className='border-black border-2 rounded-md px-2 py-1 text-center text-lg'
              type="text" name="username" id="username" placeholder='Username'
              {...register("username",{required:true,maxLength:20})}/>
            <input className='border-black border-2 rounded-md px-2 py-1 text-center text-lg'
              type="text" name="password" id="password" placeholder='Password'
              {...register("password",{required:true,maxLength:15})}/>
          </div>

          <button type='submit' className='shadow-sm bg-green-400 hover:bg-green-500 rounded-lg px-2 py-1 block m-auto mt-4'>Sign-Up</button>

        </form>
        <Link to='/signin'><p className='text-blue-500 hover:underline text-right pe-5'>Existing User? Sign-In here</p></Link>
      </div>
    </div>
  )
}

export default SignUp;