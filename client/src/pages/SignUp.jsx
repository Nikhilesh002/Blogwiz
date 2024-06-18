import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function SignUp() {
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const signup = async (data) => {
    try {
      // Example URL, replace with your actual API endpoint
      const url = `${window.location.origin}/${data.userType}-api/register`;
      const response = await axios.post(url, data);
      if (response.data.message === "Registration Successful") {
        navigate("/signin");
        toast.success("Registration Successful");
      } else {
        setErr(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErr("Registration failed. Please try again later.");
      toast.error("Registration failed. Please try again later.");
    }
  };

  function validate(){
    if (errors.userType) {
      toast.error("User type is required");
    }
    if (errors.username) {
      toast.error("Username must be between 7 to 20 characters");
    }
    if (errors.password) {
      toast.error("Password must be between 7 to 15 characters");
    }
    if (errors.email) {
      toast.error("Email is required");
    }
    return;
  }

  return (
    <div className="bg-gray-300 py-16">
      <div><Toaster /></div>
      <div className="m-auto w-80 lg:w-1/3 rounded-lg shadow-2xl px-2 py-4 bg-white">
        <form onSubmit={handleSubmit(signup)} className="px-5 py-2">
          <h1 className="mb-3 text-3xl font-bold font-mono text-center">
            Sign-Up
          </h1>
          {/* Display general error message */}
          {err && (
            toast.error(err)
          )}

          <div className="flex gap-10 px-5">
            <div>
              <input
                type="radio"
                id="author"
                value="author"
                {...register("userType", { required: true })}
              />
              <label htmlFor="author">Author</label>
            </div>

            <div>
              <input
                type="radio"
                id="user"
                value="user"
                {...register("userType", { required: true })}
              />
              <label htmlFor="user">User</label>
            </div>
          </div>


          <div className="flex flex-col gap-5 my-5">
            <input
              className="border-black border-2 rounded-md px-2 py-1 text-center text-lg"
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            <input
              className="border-black border-2 rounded-md px-2 py-1 text-center text-lg"
              type="text"
              placeholder="Username"
              {...register("username", { required: true, minLength: 7, maxLength: 20 })}
            />
            <input
              className="border-black border-2 rounded-md px-2 py-1 text-center text-lg"
              type="password"
              placeholder="Password"
              {...register("password", { required: true, minLength: 7, maxLength: 15 })}
            />
          </div>
          <button
            type="submit" onClick={validate}
            className="block mx-auto mt-4 w-32 h-10 border-2 border-gray-800 rounded-full transition-all duration-300 cursor-pointer bg-slate-400 text-lg font-semibold font-montserrat hover:bg-gray-800 hover:text-white hover:text-xl"
          >
            Sign-Up
          </button>
        </form>

        <p className="text-right pe-5">
          Existing User?
          <Link className="text-blue-500 hover:underline" to="/signin">
            Sign-In here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
