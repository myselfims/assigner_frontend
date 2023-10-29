import React, { useEffect, useState } from "react";
import {
  AiOutlineGithub,
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillApple,
} from "react-icons/ai";
import { BiLogoDiscord } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { getAuthInfo, postData } from "../api";
import { loginSchema, signupSchema } from "../validation/validation_schema";
import Loader from "../components/Loader";
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import OtpVerifier from "../components/OtpVerifier";

const Auth = ({ page }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false)
  const [otpVerify, setVerify] = useState(false)

  const initialValues = {
    login: {
      email: "",
      password: "",
    },
    signup: {
      name: "",
      email: "",
      password: "",
    },
  };

  const {
    values,
    errors,
    touched,
    resetForm,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: initialValues[page],
    validationSchema: page == "login" ? loginSchema : signupSchema,
    onSubmit: (data) => {
      setLoading(true);``
      postData(page == "login" ? "/login/" : "/users/", data)
        .then((res) => {
          setError(null);
          setLoading(false);
          if (res.data.isVerified){
            localStorage.setItem("auth_info", JSON.stringify(res.data));
            navigate("/");
          }else{
            setVerify(true)
          }
        })
        .catch((er) => {
          resetForm();
          setLoading(false);
          setError(er.response.data);
        });
    },
  });

  useEffect(() => {
    setError("");
    resetForm();
    getAuthInfo().token ? navigate("/") : null;
  }, [page]);

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
            LOGO
          </h1>
          <h1 className="text-7xl max-sm:hidden font-bold text-white absolute left-[200px]">
            Assigner.
          </h1>
          <div className="icons w-[300px] absolute justify-between flex left-[144.5px] bottom-[67px]">
            <AiOutlineGithub className="w-[42px] text-white hover:opacity-70 transition-all cursor-pointer h-[42px]" />
            <AiFillTwitterCircle className="w-[42px] text-white hover:opacity-70 transition-all cursor-pointer h-[42px]" />
            <AiFillLinkedin className="w-[42px] text-white hover:opacity-70 transition-all cursor-pointer h-[42px]" />
            <BiLogoDiscord className="w-[42px] text-white hover:opacity-70 transition-all cursor-pointer h-[42px]" />
          </div>
        </div>
      </div>
      <div className="form flex bg-[#F8FAFF] items-center justify-center w-full  h-full ">
        {/* Navbar for mobile */}
        <div className="absolute max-sm:flex hidden items-center w-screen p-3 top-0 left-0 bg-[#4285F4]">
          <h1 className="font-bold text-xl text-white">Assinger</h1>
        </div>
        {/* Navbar for mobile */}
        <div className="absolute max-sm:static right-[204px]">
        {otpVerify?
        <OtpVerifier email={values.email}/>
        :
          <div className="form">
          <div className="head max-sm:flex max-sm:flex-col items-center">
            <h1 className="text-4xl font-bold">
              {page == "login" ? "Sign In" : "Sign Up"}
            </h1>
            <p className="text-base my-1">Sign in to your account</p>
            <div className="flex text-xs my-[29px] justify-between">
              <button className="mx-2 p-2 rounded-full hover:opacity-80 flex items-center px-3 text-slate-500 bg-[#FFFFFF]">
                <FcGoogle className="mr-[10px] w-[15px] h-[15px]" />
                Sign in with Google
              </button>

              <button className="mx-2 p-2 rounded-full hover:opacity-80 flex items-center px-3 text-slate-500 bg-[#FFFFFF]">
                <AiFillApple className="mr-[10px] w-[15px] h-[15px]" />
                Sign in with Google
              </button>
            </div>
          </div>
          <div className="error flex justify-center">
            {error ? <p className="text-red-500">{error}</p> : null}
          </div>
          <div className="rounded  max-sm:text-xs flex flex-col items-center bg-[#FFFFFF] ">
            <form className="w-full" onSubmit={handleSubmit}>
              {page == "signup" ? (
                <div>
                  <p>Name</p>
                  <input
                    value={values.name}
                    name="name"
                    type="text"
                    className={`rounded-xl bg-[#F5F5F5] w-full mt-2 h-[43.91px] p-3 outline-none ${
                      errors.name && touched.name
                        ? "border-red-300 border-2"
                        : null
                    }`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <p className="text-red-400 mb-[21px]">
                    {errors.name && touched.name ? errors.name : null}
                  </p>
                </div>
              ) : null}
              <div>
                <p>Email</p>
                <input
                  value={values.email}
                  name="email"
                  type="email"
                  className={`rounded-xl bg-[#F5F5F5] w-full mt-2 h-[43.91px] p-3 outline-none ${
                    errors.email && touched.email
                      ? "border-red-300 border-2"
                      : null
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="text-red-400 mb-[21px]">
                  {errors.email && touched.email ? errors.email : null}
                </p>
              </div>
              <div>
                <p>Password</p>
                <div className={`rounded-xl bg-[#F5F5F5] w-full mt-2 flex items-center h-[43.91px] p-3 outline-none ${
                    errors.password && touched.password
                      ? "border-red-300 border-2"
                      : null
                  }`}>
                <input
                  value={values.password}
                  name="password"
                  type={showPassword?'text':'password'}
                  className={`bg-[#F5F5F5] cur w-full outline-none`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {showPassword?<AiFillEyeInvisible className="cursor-pointer" onClick={()=>setShowPassword(false)}/>:<AiFillEye className="cursor-pointer" onClick={()=>setShowPassword(true)}/>}
                </div>
                
                <p className="text-red-400 mb-[21px]">
                  {errors.password && touched.password ? errors.password : null}
                </p>
              </div>
              <div className="flex w-full flex-col">
                <a className="text-[#346BD4] mb-[21px]" href="">
                  Forgot password?
                </a>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center font-bold rounded-xl bg-[#4285F4] text-white h-[43.91px]"
                >
                  {page == "login" ? "Sign In" : "Sign Up "}
                  {loading ? <Loader /> : null}
                </button>
              </div>
            </form>
            {page == "login" ? (
              <p className="mt-[54px] text-base">
                Don't have an account?{" "}
                <Link to={"/signup"} className="text-[#346BD4]" href="">
                  {" "}
                  Register here{" "}
                </Link>
              </p>
            ) : (
              <p className="mt-[54px] text-base">
                Already have an account?{" "}
                <Link to={"/login"} className="text-[#346BD4]" href="">
                  {" "}
                  Login here{" "}
                </Link>
              </p>
            )}
          </div>

          </div>}
        </div>
      </div>
    </div>
  );
};

export default Auth;
