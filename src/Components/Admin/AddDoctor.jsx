import React, { useEffect, useState } from 'react'
import AdminNavBar from './AdminNavBar'
import { adminapi } from '../../api/api'
import { useNavigate } from 'react-router-dom'
function AddDoctor() {
    const [departments, setDepartments] = useState([])
    const [info, setInfo] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDeptNames = async () => {
            try {

                const response = await adminapi.get('departments/')
                console.log(response.data.departments)
                setDepartments(response.data.departments)


            }
            catch (error) {
                alert(error)
            }
        }
        fetchDeptNames();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(info)
            const response = await adminapi.post('doctors/', info, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(response)
            navigate('/adminDoctors')


        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div><AdminNavBar />
            <div className="container mx-auto mt-3 p-4 max-w-4xl">
                <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8" encType="multipart/form-data">
                    <h1 className='text-2xl font-bold'>Add Doctor</h1>
                    <div className="my-6">
                        <label htmlFor="doc_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.value }) }} name="doc_name" type="text" id="dept_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Name" required />
                    </div>
                    <div className="my-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.value }) }} name="email" type="text" id="dept_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Email" required />
                    </div>
                    <div className="my-6">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone</label>
                        <input onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.value }) }} name="phone" type="text" id="dept_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Phone Number" required />
                    </div>
                    <div className="max-w-sm mx-auto">
                        <label htmlFor="department" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                        <select onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.value }) }} name='department' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected >Choose a Department</option>
                            {departments.map((department, key) => (

                                <option value={department.dept_id} key={department.dept_id} name={department.dept_id}>{department.dept_name}</option>
                            ))

                            }
                        </select>
                    </div>

                    <div class="max-w-lg mx-auto p-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload Image</label>
                        <input onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.files[0] }) }} name='doc_image' className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />

                    </div>
                    <div className='flex flex-row justify-around'>

                        <div class="flex justify-center items-center my-6">
                            <input onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.checked }) }} name="isDeptHead" id="inline-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="isDeptHead" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Department Head</label>
                        </div>
                        <div class="flex justify-center items-center my-6">
                            <input onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.checked }) }} name='isActive' id="inline-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="isActive" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Active</label>
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-3 px-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddDoctor