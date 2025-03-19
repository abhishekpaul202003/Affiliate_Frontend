import React from 'react';
import { useFormik } from 'formik';
import UserSignUPSchema from './SignupValidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


export default function SignUp() {

    const Navigater = useNavigate()

    const { values, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
        initialValues: { name: '', email: '', password: '' },
        validationSchema: UserSignUPSchema,
        onSubmit: async (values) => {

            try {
                const APIURL = 'http://localhost:8080/CreateUser'

                const response = await axios.post(APIURL, values)

                if (response.status == 200 || response.status == 201) {
                    Navigater('/')
                }
            }
            catch (e) {
                alert(e.response?.data?.msg || 'Server Site Error')
            }

        }
    });

    const INPUTDATA = [
        { name: 'name', placeholder: 'Enter Your Name', type: 'text' },
        { name: 'email', placeholder: 'Enter Your Email', type: 'email' },
        { name: 'password', placeholder: 'Enter Your Password', type: 'password' },
    ];

    return (
        <form onSubmit={handleSubmit} className="flex justify-center items-center h-screen">
            <div className="bg-gray-200 rounded-xl p-6 w-96">
                <h1 className="text-center text-2xl font-semibold pb-5">Sign Up</h1>

                <div className="flex flex-col gap-4">
                    {INPUTDATA.map(({ name, placeholder, type }, k) => (
                        <div key={k} className="flex flex-col">
                            <input
                                name={name}
                                type={type}
                                placeholder={placeholder}
                                value={values[name]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='placeholder:text-white py-2 px-3 bg-amber-600 rounded-md 
                                           focus:outline-none focus:ring-2 focus:ring-amber-600 text-white
                                           '/>
                            {touched[name] && errors[name] && (
                                <p className="text-red-500 text-sm">{errors[name]}</p>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full mt-5 py-2 px-4 bg-blue-600 text-white rounded-md 
                               hover:bg-amber-700 transition duration-300"
                >
                    Sign Up
                </button>
            </div>
        </form>
    );
}
