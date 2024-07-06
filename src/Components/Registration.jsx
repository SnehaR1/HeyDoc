import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import signup from '../Images/signup.jpg';
import { api } from '../api/api';

function Registration() {
    const [info, setInfo] = useState({})
    const navigate = useNavigate()
    const bodyStyle = {
        backgroundImage: `url(${signup})`,
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
            const response = await api.post('register/', info)
            console.log(response.data)
            navigate('/login')



        }
        catch (error) {
            alert(error.response.data.error)
        }

    }
    return (
        <div style={bodyStyle}
            className="flex justify-center items-center h-screen ">
            <div className="max-w-xl mx-auto px-6 py-8 bg-white shadow-md rounded-md ">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h1>
                <form className="space-y-4 " onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" >Name</label>
                        <input type="text" onChange={handleChange} name="username" className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" onChange={handleChange} name="email" className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Email" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input type="text" onChange={handleChange} name="phone" className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Phone Number" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" onChange={handleChange} name="password" className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Password" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input type="password" onChange={handleChange} name="confirm_password" className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Confirm Password" />
                    </div>
                    <div>
                        <button type="submit" className="my-3  w-full py-3 px-4 border border-grey-300 rounded-md shadow-sm text-white bg-black hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                            Sign Up
                        </button>
                        <p className="text-primary ">Already have an account? <span className="hover:underline" onClick={() => navigate('/login')}>Login</span> </p>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Registration