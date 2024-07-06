import React, { useState } from 'react'
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { api } from '../api/api';
import { logout } from '../auth/authSlice';

function NavBar() {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const refreshToken = useSelector(state => state.auth.refreshToken)

    const handleLogout = async () => {
        try {

            const response = await api.post('logout/', {
                "refreshToken": refreshToken,

            })
            console.log(response.data)

            dispatch(logout())

        } catch (error) {
            alert(error.response.data.error)
        }

    }

    return (
        <div className='bg-white flex flex-row justify-around shadow-md mt-6 items-center'>
            <h1 className='text-blue-600 font-bold text-3xl mb-3 '>HeyDoc</h1>
            <div className='flex flex-row p-3 items-center mb-3'>
                <p className="mx-4 text-grey-300 font-semibold text-l hover:text-blue-500">Home</p>
                <p className="mx-4 text-grey-300 font-semibold text-l hover:text-blue-500 flex flex-row">Services </p>
                <p className="mx-4 text-grey-300 font-semibold text-l hover:text-blue-500">Doctors</p>
                <p className="mx-4 text-grey-300 font-semibold text-l hover:text-blue-500">Blogs</p>
                <p className="mx-4 text-grey-300 font-semibold text-l hover:text-blue-500">About Us</p>
                <p className="mx-4 text-grey-300 font-semibold text-l hover:text-blue-500">Contact Us</p>

                <button className='text-white p-3 bg-blue-900 rounded-xl ml-3 font-bold  hover:bg-blue-500'>Appointment +</button>
                <div className='relative'>


                    <VscAccount className='text-2xl mx-3 hover:text-blue-500 ml-12' onClick={() => { setOpen(!open) }} />
                    {open && <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute">
                        <ul className="py-2 text-sm text-gray-700">
                            {isAuthenticated ?
                                <li>
                                    <p className="block px-4 py-2 hover:bg-gray-100 font-semibold" onClick={handleLogout} >Logout</p>
                                </li>

                                :
                                <li>
                                    <p className="block px-4 py-2 hover:bg-gray-100 font-semibold" onClick={() => navigate("/login")}>Login</p>
                                </li>
                            }


                        </ul>
                    </div>}
                </div>
            </div>

        </div>
    )
}

export default NavBar