import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AiOutlineUserAdd, AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { FaRegImages } from "react-icons/fa6";
import UserSignUPSchema from './SignupValidation';
import axios from 'axios';
import { APIURL } from '../../GlobalURL';
import { showSuccessToast, showErrorToast } from '../ToastifyNotification';

export default function SignUp() {

    const {userId} = useParams()
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { values, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
        initialValues: {profileImg:'', name: '', email: '', password: '', confirmPassword: '' },
        validationSchema: UserSignUPSchema,
        
        onSubmit: async (values) => {
            try {
                const response = await axios.post(`${APIURL}CreateUser`, values);

                localStorage.setItem('UserMemail',response.data.email)
                if (response.status === 200 || response.status === 201) {
                    showSuccessToast('Successfully Signed Up');
                    navigate(`/OtpVerification/UserOtp/${response.data.id}`);
                }
            } catch (e) {
                showErrorToast(e.response?.data?.msg || 'Server Error');
            }
        }
    });

    const INPUTDATA = [
        { name: 'name', placeholder: 'Enter Your Name', type: 'text', icon: <FaUser className="text-gray-500" /> },
        { name: 'email', placeholder: 'Enter Your Email', type: 'email', icon: <AiOutlineMail className="text-gray-500" /> },
        { name: 'password', placeholder: 'Enter Your Password', type: showPassword ? 'text' : 'password', icon: <AiOutlineLock className="text-gray-500" />, toggle: () => setShowPassword(!showPassword), show: showPassword },
        { name: 'confirmPassword', placeholder: 'Confirm Your Password', type: showConfirmPassword ? 'text' : 'password', icon: <AiOutlineLock className="text-gray-500" />, toggle: () => setShowConfirmPassword(!showConfirmPassword), show: showConfirmPassword },
        { name: 'profileImg', type: 'file', icon: <FaRegImages className="text-gray-500" /> },
    ];

    return (
        <form onSubmit={handleSubmit} className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white rounded-xl p-8 w-96 shadow-lg">
                
                <h1 className="text-center text-2xl font-semibold pb-5 flex items-center justify-center gap-2">
                    <AiOutlineUserAdd className="text-blue-600" size={28} /> Sign Up
                </h1>

                <div className="flex flex-col gap-4">
                    {INPUTDATA.map(({ name, placeholder, type, icon, toggle, show }, index) => (
                        <div key={index} className="flex flex-col">
                            <div className="flex items-center bg-gray-200 rounded-md py-2 px-3 relative">
                                {icon}
                                <input
                                    name={name}
                                    type={type}
                                    placeholder={placeholder}
                                    value={values[name]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className='placeholder-gray-500 bg-transparent flex-1 ml-2 focus:outline-none'
                                />

                                {toggle && (
                                    <button type="button" onClick={toggle} className="absolute right-3 text-gray-600">
                                        {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                    </button>
                                )}
                            </div>
                            {touched[name] && errors[name] && (
                                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                            )}
                        </div>
                    ))}
                </div>
                <button
                    type="submit"
                    className="w-full mt-5 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Sign Up
                </button>
                <p className="text-center text-sm mt-3">
                    Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
                </p>
            </div>
        </form>
    );
}
