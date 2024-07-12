
import React, { useEffect, useState } from 'react'
import { doctorapi } from '../../api/api'
import AdminNavBar from './AdminNavBar'

function Requests() {
    const [requests, setRequests] = useState([])

    const [refresh, setRefresh] = useState(false)
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

    }, [refresh])

    const handleEdit = async (id, action) => {
        try {
            const res = await doctorapi.delete(`edit_requests/${id}/`, { data: { message: action } })
            console.log(action)
            console.log(res)
            setRefresh(!refresh)

        } catch (error) {
            console.log(error)
        }

    }
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
                            <th scope="col" class=" px-24 py-3 ">
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
                                    <td className="px-12 py-4">
                                        <div >

                                            <button onClick={() => handleEdit(request.id, "accept")} name="message" value="accept" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-3">
                                                Accept
                                            </button>
                                            <button onClick={() => handleEdit(request.id, "reject")} name="message" value="reject" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                                                Reject
                                            </button>
                                        </div>
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