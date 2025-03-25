import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { APIURL } from '../../GlobalURL';
import { showSuccessToast, showErrorToast } from '../ToastifyNotification';
import UserLogInSchema from './LogInValidation'

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const { values, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema:UserLogInSchema,

        onSubmit: async (values) => {
            try {
                const response = await axios.post(`${APIURL}UserLogIn`, values);
                if (response.status === 200) {
                    showSuccessToast('Successfully Logged In');
                    navigate('/dashboard');
                }
            } catch (e) {
                showErrorToast(e.response?.data?.msg || 'Invalid Credentials');
            }
        }
    });

    return (
        <form onSubmit={handleSubmit} className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white rounded-xl p-8 w-96 shadow-lg">
                <h1 className="text-center text-2xl font-semibold pb-5">Login</h1>
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
                <div className="text-right mt-2">
                    <Link to="/forgot-password" className="text-blue-600 hover:underline text-sm">Forgot Password?</Link>
                </div>
                <button
                    type="submit"
                    className="w-full mt-5 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Login
                </button>
                <p className="text-center text-sm mt-3">
                    Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
                </p>
            </div>
        </form>
    );
}
