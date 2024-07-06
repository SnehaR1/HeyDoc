import React from 'react'
import { HiUsers } from "react-icons/hi2";
import { TbCategoryFilled } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
function SideBar() {
    const navigate = useNavigate()
    return (

        <div className="fixed  left-0 h-screen w-64 bg-gray-800 text-white">

            <div className="flex-grow">
                <div className="flex flex-col ">
                    <p className="p-4 flex justify-center   hover:bg-gray-700 border-b" onClick={() => navigate('/users')}><HiUsers className='w-6 h-6 mr-2' />Users</p>
                    <p className=" p-4 flex justify-center   hover:bg-gray-700 border-b" onClick={() => navigate('/adminDepartments')}><TbCategoryFilled className='w-6 h-6 mr-2' />Departments</p>
                    <p className=" p-4 flex justify-center   hover:bg-gray-700 border-b" onClick={() => navigate('/adminDoctors')}><FaUserDoctor className='w-6 h-6 mr-2' />Doctors</p>
                    <p className=" p-4 flex justify-center   hover:bg-gray-700 border-b" onClick={() => navigate('/requests')}><FaUserDoctor className='w-6 h-6 mr-2' />Requests</p>

                </div>
            </div>
        </div>
    )
}

export default SideBar