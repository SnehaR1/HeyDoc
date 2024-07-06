import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import SideBar from './SideBar';
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../auth/authSlice';
function AdminNavBar() {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const refreshToken = useSelector(state => state.auth.refreshToken)
    const handleLogout = async () => {
        try {

            const response = await api.post('logout/', {
                "refreshToken": refreshToken,

            })
            console.log(response.data)

            dispatch(logout())
            navigate('/adminlogin')

        } catch (error) {
            alert(error.response.data.error)
        }

    }
    return (
        < div className='flex flex-col'>

            <div className='bg-white flex flex-row justify-between shadow-md mt-6 items-center'>
                <div className='flex flex-row ml-12 p-4'>

                    <GiHamburgerMenu className='mt-2 text-2xl' onClick={() => setOpen(!open)} />
                    <h1 className='text-blue-600 font-bold text-3xl ml-12'>HeyAdmin</h1>
                </div>
                <div className='flex flex-row mr-4'>

                    <VscAccount className='mr-3 mt-2 text-3xl  hover:text-blue-500' />
                    <p className="mx-4 text-grey-300 font-semibold text-l hover:text-blue-500 border border-black hover:border-blue-500 rounded p-2" onClick={handleLogout}>Log Out</p>
                </div>
            </div>
            <div>


                {open ?

                    <SideBar /> : <></>
                }
            </div>
        </div>

    )
}

export default AdminNavBar