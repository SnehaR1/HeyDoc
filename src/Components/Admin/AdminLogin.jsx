
import React, { useState } from 'react'
import { adminapi } from '../../api/api'
import { useNavigate } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import { useDispatch } from 'react-redux'
import { login } from '../../auth/authSlice'
function AdminLogin() {
    const [info, setInfo] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await adminapi.post('admin_login/', info)
            const accessToken = response.data.access
            const refreshToken = response.data.refresh
            dispatch(login({ accessToken, refreshToken }))
            navigate("/adminDashboard")


        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className=" min-h-screen flex justify-center items-center  bg-gradient-to-r from-cyan-500 to-blue-500 ">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">Admin Login</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-md font-medium  text-blue-800">Email</label>
                        <input onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.value }) }} type="email" name="email" className="my-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Email" />
                    </div>
                    <div>
                        <label className="block text-dm font-medium  text-blue-800" >Password</label>
                        <input onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.value }) }} type="password" name="password" className="my-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Password" />
                    </div>
                    <div>
                        <button type="submit" className="my-3 w-full py-3 px-4 border border-grey-300 rounded-md shadow-sm text-white bg-gradient-to-r from cyan-500 to-blue-500 hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                            Sign in
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AdminLogin