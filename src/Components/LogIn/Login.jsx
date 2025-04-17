import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { APIURL } from '../../GlobalURL';
import { showSuccessToast, showErrorToast } from '../ToastifyNotification';
import UserLogInSchema from './LogInValidation';
import { useAuth } from '../context/AuthConetxt';

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isAdminLogin, setIsAdminLogin] = useState(false); // Toggle between user and admin login

    const { setIsLoggedIn, setUserImage, setUserData } = useAuth();

    const { values, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: UserLogInSchema,

        onSubmit: async (values) => {
            try {
                if (isAdminLogin) {
                    await handleAdminLogin(values);
                } else {
                    await handleUserLogin(values);
                }
            } catch (e) {
                showErrorToast(e.response?.data?.msg || 'Invalid Credentials');
            }
        }
    });

    const handleUserLogin = async (credentials) => {
        const response = await axios.post(`${APIURL}UserLogIn`, credentials);
        const userid = response.data?.userid;
        const usertoken = response.data?.token;

        localStorage.setItem("UserId", userid);
        localStorage.setItem("usertoken", usertoken);
        
        if (response.status === 200) {
            showSuccessToast('Successfully Logged In');
            setIsLoggedIn(true);
            setUserImage(response.data.data.img[0].url);
            setUserData(response.data.data);
            navigate('/');
        }
    };

    const handleAdminLogin = async (credentials) => {
        const response = await axios.post(`${APIURL}AdminLogIn`, credentials);
        console.log(response)
        const adminid = response.data?.adminid;
        const admintoken = response.data?.token;
        
        console.log(adminid)
        console.log(admintoken)
        localStorage.setItem("AdminId", adminid);
        localStorage.setItem("admintoken", admintoken);
        
        if (response.status === 200) {
            showSuccessToast('Admin Successfully Logged In');
            setIsLoggedIn(true);
           
            navigate(`/OtpVerification/AdminVerify/${adminid}`);
        }
    };

    const toggleLoginMode = () => {
        setIsAdminLogin(!isAdminLogin);
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white rounded-xl p-8 w-96 shadow-lg">
                <h1 className="text-center text-2xl font-semibold pb-5 select-none">
                    {isAdminLogin ? 'Admin Login' : 'User Login'}
                </h1>
                
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <div className="flex items-center bg-gray-200 rounded-md py-2 px-3">
                            <AiOutlineMail className="text-gray-500" />
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter Your Email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='placeholder-gray-500 bg-transparent flex-1 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-600'
                            />
                        </div>
                        {touched.email && errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center bg-gray-200 rounded-md py-2 px-3 relative">
                            <AiOutlineLock className="text-gray-500" />
                            <input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter Your Password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='placeholder-gray-500 bg-transparent flex-1 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-600'
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-gray-600">
                                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </button>
                        </div>
                        {touched.password && errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>
                </div>
                
                {!isAdminLogin && (
                    <div className="text-right mt-2">
                        <Link to="/forgot-password" className="text-blue-600 hover:underline text-sm">Forgot Password?</Link>
                    </div>
                )}
                
                <button
                    type="submit"
                    className="w-full mt-5 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                    {isAdminLogin ? 'Admin Login' : 'User Login'}
                </button>

                <button
                    type="button"
                    onClick={toggleLoginMode}
                    className="w-full mt-3 py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300"
                >
                    Switch to {isAdminLogin ? 'User Login' : 'Admin Login'}
                </button>
                
                {!isAdminLogin && (
                    <p className="text-center text-sm mt-3">
                        Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
                    </p>
                )}
            </div>
        </form>
    );
}