import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import drimage from '../Images/drimage.jpg';
import { api } from '../api/api'
import { useDispatch } from 'react-redux'
import { login } from '../auth/authSlice'
import PasswordRecovery from './PasswordRecovery';
function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [info, setInfo] = useState({})
    const [forgotPass, setForgotPass] = useState(false)
    const bodyStyle = {
        backgroundImage: `url(${drimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        backgroundAttachment: 'fixed',
        overflowY: 'auto',
    };

    const handleChange = e => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post('token/', info)

            const accessToken = response.data.access
            const refreshToken = response.data.refresh
            dispatch(login({ accessToken, refreshToken }))

            navigate('/')
        } catch (error) {
            console.log(error.response.data.error)
        }
    }

    return (
        <div style={bodyStyle} className="flex justify-center items-center h-screen ">
            {forgotPass ?
                <PasswordRecovery setForgotPass={setForgotPass} /> :

                (

                    <div className="max-w-xl mx-auto px-6 py-8 bg-white shadow-md rounded-md">
                        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign In</h1>
                        <form className="space-y-4 " onSubmit={handleSubmit} >
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" onChange={handleChange} name="email" className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Email" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input type="password" onChange={handleChange} name="password" className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Password" />
                            </div>
                            <div>
                                <button type="submit" className="my-3  w-full py-3 px-4 border border-grey-300 rounded-md shadow-sm text-white bg-black hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                                    Sign in
                                </button>
                            </div>
                            <div className="text-center">
                                <p className="text-primary ">Don't have an account? <span className="hover:underline" onClick={() => navigate("/signUp")}>Sign up</span></p>
                            </div>
                            <div className="text-center">
                                <p className="text-primary ">Admin? <span className="hover:underline" onClick={() => navigate("/adminlogin")}>Sign in here</span></p>
                            </div>
                            <div className="text-center">
                                <p className="text-primary ">Doctor? <span className="hover:underline" onClick={() => navigate("/doctorlogin")}>Sign in here</span></p>
                            </div>
                            <div className="text-center">
                                <p className="text-primary hover:underline" onClick={() => setForgotPass(true)} >Forgot password?</p>
                            </div>
                        </form>
                    </div>)
            }
        </div>
    )
}

export default Login