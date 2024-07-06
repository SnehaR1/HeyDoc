import React, { useEffect, useState } from 'react'
import AdminNavBar from './AdminNavBar'
import { useNavigate } from 'react-router-dom'
import { adminapi } from '../../api/api'

function AdminDepartments() {
    const navigate = useNavigate()
    const [departments, setDepartments] = useState([])

    useEffect(() => {
        const fetchDepartments = async () => {
            try {

                const response = await adminapi.get('departments/')
                console.log(response.data.departments)
                setDepartments(response.data.departments)

            }
            catch (error) {
                console.log(error)
            }
        }
        fetchDepartments()
    }, [])
    return (
        <div>
            <AdminNavBar />
            <button class="mt-6 text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => navigate('/addDepartments')}>Add Department +</button>

            <div className='mx-12 my-6'>


                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                    <thead class="text-xs text-gray-300 uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Description
                            </th>


                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {

                            departments.map((item, key) => (



                                <tr className="bg-white border-b text-black text-l font-semibold dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">
                                        <img class="w-10 h-10 rounded-full" src={`http://127.0.0.1:8000${item.dept_image}`} alt="dept_image" />
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.dept_name}

                                    </td>

                                    <td className="px-6 py-4">
                                        {item.dept_description}

                                    </td>
                                    <td className="px-6 py-4 text-blue-600 hover:underline">
                                        Edit
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminDepartments