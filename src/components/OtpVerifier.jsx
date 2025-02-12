import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { postData } from "../api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAlert } from "../store/features/appGlobalSlice";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const OtpVerifier = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const verify = () => {
    if (otp.replace(/\s/g, "").length !== 4) {
      setError("Please enter a 4-digit OTP.");
      return;
    }
    setLoading(true);
    postData(`/otp/verify/${otp}`, { email: localStorage.getItem("userEmail") })
      .then((res) => {
        dispatch(
          setAlert({ alert: true, type: "success", message: "OTP Verified!" })
        );
        navigate("/dashboard");
        // if (res.accountTypeId) {
        //   navigate("/dashboard");
        // } else {
        //   navigate("/role-selection");
        // }
      })
      .catch(() => setError("Invalid OTP. Please try again."))
      .finally(() => setLoading(false));
  };

  const sendOtp = () => {
    setSendingOtp(true);
    postData("/otp/send/", { email: localStorage.getItem("userEmail") })
      .then(() => {
        dispatch(
          setAlert({ alert: true, type: "success", message: "OTP Sent!" })
        );
        setTimer(30);
      })
      .catch(() => setError("Failed to send OTP. Please try again."))
      .finally(() => setSendingOtp(false));
  };

  useEffect(() => {
    sendOtp();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  return (
    <div className="rounded border p-4 max-sm:text-xs flex flex-col items-center bg-[#FFFFFF] w-78">
      <div className="head">
        <h1 className="text-2xl">Enter OTP</h1>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="input w-full">
        <InputOTP
          maxLength={4}
          value={otp}
          className="w-full"
          onChange={(otp) => setOtp(otp)} // Use Formik's setFieldValue or update state
        >
          <InputOTPGroup className="w-full flex justify-between my-8">
            {[...Array(4)].map((_, index) => (
              <InputOTPSlot className="w-full h-12" key={index} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="w-full">
        <button
          onClick={verify}
          type="submit"
          className="w-full flex items-center justify-center font-bold rounded-xl bg-[#4285F4] text-white h-[43.91px]"
          disabled={loading}
        >
          Verify {loading && <Loader />}
        </button>
        <div className="flex">
          <p className="my-3 mx-4">Didn't receive OTP?</p>
          <button
            disabled={timer > 0 || sendingOtp}
            onClick={sendOtp}
            className="text-blue-500"
          >
            Resend {timer > 0 && `(${timer}s)`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerifier;
