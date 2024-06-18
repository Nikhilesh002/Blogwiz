import React from "react";
import { RxHome } from "react-icons/rx";
import { Link } from "react-router-dom";
import errorImg from "../assets/pageNotFound-1.png";

function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="flex flex-col items-center justify-center">
        <img
          src={errorImg}
          className="w-1/4 md:w-1/5 lg:w-1/6"
          alt="Error 404"
        />
        <div className="w-3/4 md:w-1/2 lg:w-1/3 text-center font-mono py-3 px-3">
          <p className="text-lg md:text-2xl lg:text-3xl font-mono text-center">
            Sorry, the page you were looking for isn&rsquo;t found here.
          </p>
          <div className="pt-3">
            <Link
              to="/"
              className="inline-flex items-center bg-green-500 border-2 border-black rounded font-bold px-2.5 py-1.5 md:px-3.5 md:py-1.5 lg:px-4.5 lg:py-2.5 text-white"
            >
              <RxHome className="mr-1.5 mb-0.5" />
              Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
