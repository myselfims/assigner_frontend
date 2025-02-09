import React, { useState } from "react";
import Loader from "../../components/Loader";
import InputBox from "../../components/InputBox";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { postData } from "../../api";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: email input, 2: OTP input, 3: password reset
  const navigate = useNavigate();

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    setFieldValue,
    errors,
    touched,
  } = useFormik({
    initialValues: { email: "", otp: "", password: "", confirmPassword: "" },
    onSubmit: async (data) => {
      setLoading(true);

      if (step === 1) {
        // Step 1: Send OTP
        await postData("/otp/send/", { email: data.email })
          .then(() => {
            setStep(2); // Move to OTP verification
          })
          .catch((error) => {
            console.error(error);
            alert("Error sending OTP");
          })
          .finally(() => setLoading(false));
      } else if (step === 2) {
        // Step 2: Verify OTP
        await postData(`/otp/verify/${data.otp}`, { email: data.email })
          .then(() => {
            setStep(3); // Move to password reset
          })
          .catch((error) => {
            console.error(error);
            alert("Error verifying OTP");
          })
          .finally(() => setLoading(false));
      } else if (step === 3) {
        // Step 3: Change password
        if (data.password !== data.confirmPassword) {
          alert("Passwords do not match");
          setLoading(false);
          return;
        }

        await postData("/users/password/reset", {
          email: data.email,
          password: data.password,
        })
          .then(() => {
            alert("Password changed successfully");
            navigate("/login");
          })
          .catch((error) => {
            console.error(error);
            alert("Error changing password");
          })
          .finally(() => setLoading(false));
      }
    },
  });

  console.log(values);

  return (
    <div className="form">
      <div className="head max-sm:flex max-sm:flex-col items-center my-8">
        <h1 className="text-4xl font-bold">Forgot Password</h1>
      </div>
      <div className="error flex justify-center"></div>
      <div className="rounded p-2 max-sm:text-xs flex flex-col items-center bg-[#FFFFFF] ">
        <form className="w-full" onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <InputBox
                name="email"
                label={"Email"}
                value={values.email}
                handler={{ handleBlur, handleChange }}
                handleError={{ touched, errors }}
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center font-bold rounded-xl bg-[#4285F4] text-white h-[43.91px]"
              >
                Send OTP
                {loading && <Loader />}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h1>Please enter OTP</h1>
              <InputOTP
                maxLength={4}
                value={values.otp}
                className="w-full"
                onChange={(otp) => setFieldValue("otp", otp)} // Use Formik's setFieldValue or update state
              >
                <InputOTPGroup className="w-full flex justify-between my-8">
                  {[...Array(4)].map((_, index) => (
                    <InputOTPSlot className="w-full h-12" key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>

              <button
                type="submit"
                className="w-full flex items-center justify-center font-bold rounded-xl bg-[#4285F4] text-white h-[43.91px]"
              >
                Verify OTP
                {loading && <Loader />}
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <InputBox
                name="password" // Specify the name as "password"
                label="New Password"
                type="password"
                value={values.password}
                handler={{ handleBlur, handleChange }}
                handleError={{ touched, errors }}
              />
              <InputBox
                name="confirmPassword" // Specify the name as "confirmPassword"
                label="Confirm Password"
                type="password"
                value={values.confirmPassword}
                handler={{ handleBlur, handleChange }}
                handleError={{ touched, errors }}
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center font-bold rounded-xl bg-[#4285F4] text-white h-[43.91px]"
              >
                Save Password
                {loading && <Loader />}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
