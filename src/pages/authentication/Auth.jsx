import React, { useEffect, useState } from "react";
import {
  AiOutlineGithub,
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillApple,
} from "react-icons/ai";
import { BiLogoDiscord } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema, signupSchema } from "../../validation/validation_schema";
import Loader from "../../components/Loader";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import InputBox from "../../components/InputBox";
import OtpVerifier from "../../components/OtpVerifier";
import { useDispatch, useSelector } from "react-redux";
import { setAuthInfo } from "../../store/features/appGlobalSlice";
import { getAuthInfo, postData } from "../../api";
import SignupLogin from "./SignupLogin";
import ForgotPassword from "./ForgotPassword";

const Auth = ({page}) => {

  const {pathname} = useLocation()
  const navigate = useNavigate()
 
  useEffect(() => {
    getAuthInfo().token ? navigate("/dashboard") : null;
  }, [page]);

  const pages = {
    '/login' : <SignupLogin />,
    '/signup' : <SignupLogin />,
    '/verify-otp' : <OtpVerifier email={'imrans@64-squares.com'} />,
    '/forgot-password' : <ForgotPassword />
  }

  return (
    <div
      key={page}
      className="w-screen z-20 absolute top-0 left-0 h-screen flex "
    >
      <div className="max-sm:hidden">
        <div className="absolute max-sm:hidden z-0">
          <svg
            className="h-screen"
            xmlns="http://www.w3.org/2000/svg"
            width="720"
            fill="none"
          >
            <path
              d="M0 0L719.988 0L569.314 1024H0V0Z"
              fill="url(#paint0_linear_0_147)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_0_147"
                x1="359.994"
                y1="0"
                x2="359.994"
                y2="1024"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4285F4" />
                <stop offset="1" stopColor="#286DE0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="flex items-center h-screen">
          <h1 className="absolute left-[72.99px] top-[59.81px] font-bold text-xl text-white">
            a riseims product
          </h1>
          <h1 className="text-7xl max-sm:hidden font-bold text-white absolute left-[100px]">
            EasyAssigns
          </h1>
          <div className="icons w-[300px] absolute justify-between flex left-[144.5px] bottom-[67px]">
            <a target="__blank" href="https://github.com/myselfims"><AiOutlineGithub className="w-[42px] text-white hover:opacity-70 transition-all cursor-pointer h-[42px]" /></a>
          
            <AiFillTwitterCircle className="w-[42px] text-white hover:opacity-70 transition-all cursor-pointer h-[42px]" />

            <a target="__blank" href="https://www.linkedin.com/in/shaikh-imran-855b69221/">
            <AiFillLinkedin className="w-[42px] text-white hover:opacity-70 transition-all cursor-pointer h-[42px]" /></a>
            <BiLogoDiscord className="w-[42px] text-white hover:opacity-70 transition-all cursor-pointer h-[42px]" />
          </div>
        </div>
      </div>

      <div className="form flex bg-[#F8FAFF] items-center justify-center w-full  h-full ">
        {/* Navbar for mobile */}
        <div className="absolute max-sm:flex hidden items-center w-screen p-3 top-0 left-0 bg-[#4285F4]">
          <h1 className="font-bold text-xl text-white">EasyAssigns</h1>
        </div>
        {/* Navbar for mobile */}
        <div className="absolute max-sm:static right-[204px]">
         
            {pages[pathname]}
   
        </div>
      </div>
    </div>
  );
};

export default Auth;
