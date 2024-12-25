import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../ui/loader.css";

export default function ForgotPassword() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [emailSend, setEmailSend] = useState(false);
    const [emailSendLoader, setEmailSendLoader] = useState(false);
    const [otpVerifyLoader, setOtpVerifyLoader] = useState(false);
    const [OTP, setOTP] = useState("");
    const [OTPSend, setOTPSend] = useState(false);
    const [password, setPassword] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [emailIsDisabled, setEmailIsDisabled] = useState(false);
    const [otpIsDisabled, setOtpIsDisabled] = useState(false);
    
    const handleEmail = async (e) => {
        e.preventDefault();
        setEmailSendLoader(true);
        try {
            const res = await API.post("/user/forgot-password", { email });
            if (res) {
                setEmailSend(true);
                setEmailSendLoader(false);
                setEmailIsDisabled(true);
                setErrorMsg("");
            }
        } catch (err) {
            setEmailSendLoader(false);
            setErrorMsg(err.response.data.message);
        }
    }

    const handleOTP = async (e) => {
        e.preventDefault();
        setOtpVerifyLoader(true)
        try {
            const res = await API.post("/user/verify-otp", { email, OTP });
            if(res.data.success == true){
                setOtpVerified(true);
                setOtpIsDisabled(true);
            }
            if (res) {
                setOTPSend(true);
                setOtpVerifyLoader(false)
                setErrorMsg("");
            }
        } catch (err) {
            setOtpVerifyLoader(false)
            setErrorMsg(err.response.data.message);
        }
    }

    const handlePassword = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/user/change-password", { email, OTP, password });
            if (res) {
                setErrorMsg("");
                navigate("/login");
            }
        } catch (err) {
            setErrorMsg(err.response.data.message);
        }
    };

    return (
        <div className="w-full relative z-[1] min-h-screen flex items-center justify-center bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121]">
            <div className="w-full max-w-[450px] bg-white rounded border-[1px] shadow border-neutral-200 relative z-[2] flex min-h-full flex-col justify-center mx-2 my-32 px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-0 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-start justify-start gap-6 relative z-[2]">
                    <form className="space-y-6 w-full" method="POST" onSubmit={handleEmail}>
                        <div>
                            <p className={errorMsg ? "text-center text-red-500 font-bold text-lg" : "hidden"} aria-live="assertive">{errorMsg}</p>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input disabled={emailIsDisabled} onChange={(e) => { setEmail(e.target.value); setErrorMsg("") }} value={email} type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 disabled:bg-[#e8f0fe]" />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Send OTP</button>
                        </div>
                    </form>
                    { emailSendLoader && (
                        <div className="flex flex-col items-center justify-center fixed z-[4] top-0 left-0 w-full h-full">
                            <div className="absolute z-[4] top-0 left-0 bg-black opacity-60 w-full h-full"></div>
                            <div id="wifi-loader">
                                <svg className="circle-outer" viewBox="0 0 86 86">
                                    <circle className="back" cx="43" cy="43" r="40"></circle>
                                    <circle className="front" cx="43" cy="43" r="40"></circle>
                                    <circle className="new" cx="43" cy="43" r="40"></circle>
                                </svg>
                                <svg className="circle-middle" viewBox="0 0 60 60">
                                    <circle className="back" cx="30" cy="30" r="27"></circle>
                                    <circle className="front" cx="30" cy="30" r="27"></circle>
                                </svg>
                                <svg className="circle-inner" viewBox="0 0 34 34">
                                    <circle className="back" cx="17" cy="17" r="14"></circle>
                                    <circle className="front" cx="17" cy="17" r="14"></circle>
                                </svg>
                            </div>
                        </div>
                    )}
                    { otpVerifyLoader && (
                        <div className="flex flex-col items-center justify-center fixed z-[4] top-0 left-0 w-full h-full">
                            <div className="absolute z-[4] top-0 left-0 bg-black opacity-60 w-full h-full"></div>
                            <div id="wifi-loader">
                                <svg className="circle-outer" viewBox="0 0 86 86">
                                    <circle className="back" cx="43" cy="43" r="40"></circle>
                                    <circle className="front" cx="43" cy="43" r="40"></circle>
                                    <circle className="new" cx="43" cy="43" r="40"></circle>
                                </svg>
                                <svg className="circle-middle" viewBox="0 0 60 60">
                                    <circle className="back" cx="30" cy="30" r="27"></circle>
                                    <circle className="front" cx="30" cy="30" r="27"></circle>
                                </svg>
                                <svg className="circle-inner" viewBox="0 0 34 34">
                                    <circle className="back" cx="17" cy="17" r="14"></circle>
                                    <circle className="front" cx="17" cy="17" r="14"></circle>
                                </svg>
                            </div>
                        </div>
                    )}
                    { emailSend && (
                        <form className="space-y-6 w-full" method="POST" onSubmit={handleOTP}>
                        <div>
                            <label htmlFor="otp" className="block text-sm/6 font-medium text-gray-900">OTP</label>
                            <div className="mt-2">
                                <input disabled={otpIsDisabled} onChange={(e) => { setOTP(e.target.value); setErrorMsg("") }} value={OTP} type="number" name="otp" id="otp" autoComplete="off" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 disabled:bg-[#e8f0fe]" />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Verify OTP</button>
                        </div>
                    </form>
                    )}
                    { (emailSend && OTPSend && otpVerified) && (
                        <form className="space-y-6 w-full" method="POST" onSubmit={handlePassword}>
                            <div>
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Change Password</label>
                                <div className="mt-2">
                                    <input onChange={(e) => { setPassword(e.target.value); setErrorMsg("") }} value={password} type="password" name="password" id="password" autoComplete="email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Change Password</button>
                            </div>
                        </form>
                    )}
                    <Link className="underline pt-5 text-center block" to="/sign-up">Don&apos;t have an Account?</Link>
                </div>
            </div>

        </div>
    )
}
