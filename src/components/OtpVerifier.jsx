import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { postData } from "../api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {setAlert} from '../store/features/appGlobalSlice'

const OtpVerifier = ({email}) => {
  const [otp, setOtp] = useState('')
  const [timer,setTimer] = useState(10)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false);

  const verify = ()=>{
    setLoading(true)
    postData(`/otp/verify/${otp}`,{email}).then((res)=>{
      console.log(res)
      dispatch(setAlert({alert:true,type:'success',message:'OTP Verified!'}))
      navigate('/')
    }).catch((er)=>{
      setError(er)
    })
  }

  const sendOtp = ()=>{
    postData('/otp/send/',{email}).then((res)=>{
      dispatch(setAlert({alert:true,type:'success',message:'OTP Sent!'}))
    })
  }

  const resendOtp = ()=>{
    sendOtp()
  }

  useEffect(()=>{
    sendOtp()
  },[])


  const handleInput = (e)=>{
    if (e.target.value.length<=4){
      setOtp(e.target.value)
    }
  }


  return (
    <div className="rounded border p-4 max-sm:text-xs flex flex-col items-center bg-[#FFFFFF]">
      <div className="head">
        <h1 className="text-2xl">Enter OTP</h1>
        <p className="text-red-500">{error}</p>
      </div>
      <div className="input my-5">
        <input onChange={handleInput} value={otp} className="w-40 h-12 tracking-[1rem] mx-4 text-center text-xl font-semibold border-2  rounded" type="text" />
      </div>
      <div className="w-full">
        <button
            onClick={verify}
          type="submit"
          className="w-full flex items-center justify-center font-bold rounded-xl bg-[#4285F4] text-white h-[43.91px]"
        >
          Verify
          {loading ? <Loader /> : null}
        </button>

        <div className="flex">

        <p className="my-3 mx-4"> Didn't received OTP!</p>
        <button disabled={timer!=0} onClick={resendOtp} className="text-blue-500">Resend</button>
        {/* <label htmlFor="">{timer}</label> */}
        </div>
        
      </div>
    </div>
  );
};

export default OtpVerifier;
