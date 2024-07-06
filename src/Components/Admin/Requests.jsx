
import React, { useEffect, useState } from 'react'
import { doctorapi } from '../../api/api'
import AdminNavBar from './AdminNavBar'

function Requests() {
    const [requests, setRequests] = useState([])
    useEffect(() => {
        const fetchRequests = async () => {
            try {

                const response = await doctorapi.get("doctor_verification/")

                console.log(response.data.doc_requests)
                setRequests(response.data.doc_requests)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchRequests()

    }, [])
    return (
        <div>
            <AdminNavBar />

            <div className='mx-12 my-6'>





                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                    <thead class="text-xs text-gray-300 uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-24 py-3">
                                Message
                            </th>
                            <th scope="col" class=" px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requests.map((request, key) => (
                                <tr className="bg-white border-b text-black text-l font-semibold dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={request.id} >
                                    <td className="px-6 py-4">

                                        {request.email}

                                    </td>
                                    <td className="px-24 py-4">

                                        {request.message}

                                    </td>
                                    <td className="px-6 py-4">
                                        <div>

                                        </div>
                                        <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" >Green</button>
                                        <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-4 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Red</button>
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

export default Requests