import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { APIURL } from "../GlobalURL";
import axios from "axios";
import { showSuccessToast, showErrorToast } from "./ToastifyNotification";
import { FiMail } from "react-icons/fi";
import { PulseLoader } from "react-spinners";

const OTP_LENGTH = 4;
const RESEND_TIMEOUT = 30;

export default function OtpVerification() {
  const navigate = useNavigate();
  const { userId, type } = useParams();
  const email = localStorage.getItem("UserMemail");
  const inputRefs = useRef([]);

  const [code, setCode] = useState(Array(OTP_LENGTH).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMEOUT);
  const [canResend, setCanResend] = useState(false);

  const handleChange = useCallback((element, index) => {
    const value = element.value;
    if (!/^\d?$/.test(value)) return;

    setCode(prev => {
      const newCode = [...prev];
      newCode[index] = value;

      if (value && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      return newCode;
    });
  }, []);

  const handleKeyDown = useCallback((e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }, [code]);

  const handleResendOTP = useCallback(async () => {
    try {
      setIsLoading(true);
      const endpoint = type === "UserOtp" ? "resendOtp" :
        type === "NewEmail" ? "resendEmailVerification" :
          "resendAdminOtp";

      await axios.post(`${APIURL}${endpoint}/${userId}`);
      showSuccessToast("OTP resent successfully!");
      setTimeLeft(RESEND_TIMEOUT);
      setCanResend(false);
    } catch (err) {
      showErrorToast(err.response?.data?.msg || "Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  }, [type, userId]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userOtp = code.join("");
      if (!userOtp || userOtp.length !== OTP_LENGTH) {
        showErrorToast("Please enter a valid 4-digit OTP.");
        return;
      }

      let endpoint;
      switch (type) {
        case "UserOtp":
          endpoint = `otpVerification/${userId}`;
          break;
        case "NewEmail":
          endpoint = `verifyUserEmail/${userId}`;
          break;
        case "AdminVerify":
          endpoint = `AdminOTPVerification/${userId}`;
          break;
        default:
          showErrorToast("Invalid verification type.");
          return;
      }

      const response = await axios.post(`${APIURL}${endpoint}`, { otp: userOtp });

      if (response.status === 200) {
        showSuccessToast(response.data?.msg || "Verification successful!");

        const redirectPath = type === "AdminVerify" ? "/adminhome" : "/login";
        navigate(redirectPath);
      }
    } catch (err) {
      showErrorToast(err.response?.data?.msg || "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  }, [code, type, userId, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white p-3 rounded-full">
              <FiMail className="text-blue-600 text-2xl" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Email Verification</h1>
        </div>

        <div className="p-8">
          <p className="text-gray-600 text-center mb-6">
            We've sent a {OTP_LENGTH}-digit code to <span className="font-semibold">{email}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  className="w-14 h-14 text-center text-2xl font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={(e) => e.target.select()}
                  disabled={isLoading}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <PulseLoader color="#ffffff" size={8} className="mr-2" />
                  Verifying...
                </>
              ) : (
                "Verify Account"
              )}
            </button>

            <div className="text-center text-sm text-gray-500">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className="text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Resend Code
                </button>
              ) : (
                <p>
                  Resend code in <span className="font-medium">{timeLeft}s</span>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}