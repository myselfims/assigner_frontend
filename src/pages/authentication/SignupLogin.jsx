import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import InputBox from "../../components/InputBox";
import {
  AiFillApple,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { loginSchema, signupSchema } from "../../validation/validation_schema";
import { postData } from "../../api";
import { setAuthInfo } from "../../store/features/appGlobalSlice";

const SignupLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [otpVerify, setVerify] = useState(false);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const initialValues = {
    "/login": {
      email: "",
      password: "",
    },
    "/signup": {
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
  } = useFormik({
    initialValues: initialValues['/login'],
    validationSchema: pathname == "/login" ? loginSchema : signupSchema,
    onSubmit: (data) => {
      setLoading(true);
      postData(pathname == "/login" ? "/login/" : "/users/", data)
        .then((res) => {
          setError(null);
          setLoading(false);
          console.log(res);
          let user = res.user;
          if (user.isVerified) {
            dispatch(setAuthInfo(res));
            localStorage.setItem("auth_info", JSON.stringify(res));
            if (user.accountTypeId){
              navigate("/dashboard");
            } else {
              navigate('/role-selection')
            }
          } else {
            // setVerify(true);
            localStorage.setItem('userEmail', data.email)
            console.log('navigated to otp')
            navigate("/verify-otp");
          }
        })
        .catch((er) => {
          setLoading(false);
          console.log(er);
          setError(String(er.response.data));
        });
    },
  });

  return (
    <div className="form">
      <div className="head max-sm:flex max-sm:flex-col items-center">
        <h1 className="text-4xl font-bold">
          {pathname == "/login" ? "Sign In" : "Sign Up"}
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
      <div className="rounded p-2 max-sm:text-xs flex flex-col items-center bg-[#FFFFFF] ">
        <form className="w-full" onSubmit={handleSubmit}>
          {pathname == "/signup" ? (
            <div>
              <InputBox
                name="name"
                label={'Name'}
                handler={{ handleBlur, handleChange }}
                handleError={{ touched, errors }}
              />
            </div>
          ) : null}
          <div>
            <InputBox
              name="email"
              label={'Email'}
              handler={{ handleBlur, handleChange }}
              handleError={{ touched, errors }}
            />
          </div>
          <div>
            <p>Password</p>
            <div
              className={`rounded-xl bg-[#F5F5F5] w-full mt-2 flex items-center h-[43.91px] p-3 outline-none ${
                errors.password && touched.password
                  ? "border-red-300 border-2"
                  : null
              }`}
            >
              <input
                value={values.password}
                name="password"
                type={showPassword ? "text" : "password"}
                className={`bg-[#F5F5F5] cur w-full outline-none`}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <AiFillEye
                  className="cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>

            <p className="text-red-400 mb-[21px]">
              {errors.password && touched.password ? errors.password : null}
            </p>
          </div>
          <div className="flex w-full flex-col">
            <Link to={"/forgot-password"} className="text-[#346BD4] mb-[21px]">
              Forgot password?
            </Link>
            <button
              type="submit"
              className="w-full flex items-center justify-center font-bold rounded-xl bg-[#4285F4] text-white h-[43.91px]"
            >
              {pathname == "/login" ? "Sign In" : "Sign Up "}
              {loading ? <Loader className={'ml-2'} /> : null}
            </button>
          </div>
        </form>
        {pathname == "/login" ? (
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
    </div>
  );
};

export default SignupLogin;
