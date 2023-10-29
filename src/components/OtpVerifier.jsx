import React, { useState } from "react";
import Loader from "./Loader";

const OtpVerifier = () => {
  const [otp, setOtp] = useState('')

  const [loading, setLoading] = useState(false);

  const verify = ()=>{
    setLoading(true)
  }


  return (
    <div className="rounded border p-4 max-sm:text-xs flex flex-col items-center bg-[#FFFFFF]">
      <div className="head">
        <h1 className="text-2xl">Enter OTP</h1>
      </div>
      <div className="input my-5">
        <input onChange={(e)=>setOtp(e.target.value)} value={otp} className="w-12 h-12 mx-4 text-center text-xl font-semibold border-2  rounded" type="text" />
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
        <button className="text-blue-500">Resend</button>
        </div>
        
      </div>
    </div>
  );
};

export default OtpVerifier;
