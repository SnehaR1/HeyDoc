import React, { useState } from 'react'
import { api } from '../api/api'
import { useNavigate } from 'react-router-dom'
function PasswordRecovery({ setForgotPass }) {
    const [credential, setCredential] = useState({})
    const [isEmail, setIsemail] = useState(true)
    const [otpPage, setOtpPage] = useState(false)
    const [resetPass, setResetPass] = useState({})
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post('forgot_password/', credential)
            console.log(response)
            setOtpPage(true)


        } catch (error) {
            alert(error.response.data.error)
        }
    }

    const handleOtp = async (e) => {
        e.preventDefault()
        try {
            const message = await api.post('set_password/', resetPass)
            console.log(message)
            setForgotPass(false)

        } catch (error) {
            console.log(error.response.data)
        }
    }
    return (
        <>
            {otpPage ?
                (<div className="flex justify-center items-center h-screen ">

                    <div className="max-w-xl mx-auto px-6 py-8 bg-white shadow-md rounded-md">
                        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Password Reset</h1>
                        <form className="space-y-4 " onSubmit={handleOtp} >
                            <div>
                                <label className="block text-sm font-medium text-gray-700">OTP</label>
                                <input onChange={(e) => { setResetPass({ ...resetPass, [e.target.name]: e.target.value }) }} type="text" name="otp" className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter Provided OTP" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input onChange={(e) => { setResetPass({ ...resetPass, [e.target.name]: e.target.value }) }} type="password" name="password" className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your New Password" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <input onChange={(e) => { setResetPass({ ...resetPass, [e.target.name]: e.target.value }) }} type="password" name="confirm_password" className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Confirm your Password" />
                            </div>
                            <div>
                                <button type="submit" className="my-3  w-full py-3 px-4 border border-grey-300 rounded-md shadow-sm text-white bg-black hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                                    Reset Password
                                </button>
                            </div>
                            <p><span className="underline text-black hover:text-blue-500" onClick={() => setOtpPage(false)}>Change</span> OTP Reciever Method</p>
                            <p>Go back to <span className="underline text-black hover:text-blue-500" onClick={() => setForgotPass(false)}>Login</span></p>
                        </form>
                    </div>
                </div>) : (<div className="flex flex-col justify-center items-center h-screen ">
                    <div className="max-w-xl mx-auto px-6 py-8 bg-white shadow-md rounded-md">
                        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Reset Password</h1>
                        <p className="text-xl font-semibold text-center text-gray-800 mb-8">Choose how to receive OTP</p>
                        <div class="flex justify-center items-center mb-4">
                            <div class="flex items-center me-4">
                                <input onClick={() => setIsemail(true)} id="inline-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" defaultChecked />
                                <label htmlFor="inline-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Email</label>
                            </div>
                            <div class="flex items-center me-4">
                                <input onClick={() => setIsemail(false)} id="inline-2-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-2-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Phone</label>
                            </div>


                        </div>


                        <form className="space-y-4 " onSubmit={handleSubmit}  >
                            {isEmail ?

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" onChange={(e) => { setCredential({ [e.target.name]: e.target.value }) }} name="email" className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Email" />
                                </div> : <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input type="text" onChange={(e) => { setCredential({ [e.target.name]: e.target.value }) }} name="phone" className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Phone Number" />
                                </div>
                            }

                            <div>
                                <button type="submit" className="my-3  w-full py-3 px-4 border border-grey-300 rounded-md shadow-sm text-white bg-black hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                                    Send OTP
                                </button>
                            </div>
                            <p>Go back to <span className="underline text-black hover:text-blue-500" onClick={() => setForgotPass(false)}>Login</span></p>
                        </form>
                    </div>

                </div>)}
        </>






    )
}

export default PasswordRecovery