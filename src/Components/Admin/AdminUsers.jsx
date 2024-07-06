import React, { useEffect, useState } from 'react'
import AdminNavBar from './AdminNavBar'
import { adminapi } from '../../api/api'
function AdminUsers() {
    const [info, setInfo] = useState([])
    const [block, setBlock] = useState({ "block": "false" })
    const [userId, setUserId] = useState(null)
    const [edit, setEdit] = useState(false)
    const [reload, setReload] = useState(false)
    const [searchData, setSearchData] = useState(null)
    const [filteredData, setFilteredData] = useState({})

    useEffect(
        () => {
            const users = async () => {
                try {
                    const response = await adminapi.get("users/")

                    setInfo(response.data.users)

                } catch (error) {
                    console.log(error)
                }
            }
            users()
        }, [reload])

    const handleConfirm = async () => {
        try {
            console.log(userId)
            console.log(block)
            const response = await adminapi.patch(`user/${userId}/`, block)
            console.log(response)
            setEdit(false)
            if (filteredData) {

                setFilteredData({ ...filteredData, "is_active": ![filteredData["is_active"]] })
            }

            setReload(!reload)



        } catch (error) {
            console.log(error)
        }

    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        const filteredUser = info.find((user) =>
            user.username.toLowerCase() === searchData.toLowerCase() ||
            user.phone === searchData ||
            user.email.toLowerCase() === searchData.toLowerCase()
        );

        console.log("filteredUser :", filteredUser)
        if (filteredUser) {

            setFilteredData(filteredUser)
        }
        else {
            alert("No such user")
        }

    }

    return (
        <div><AdminNavBar />
            <div className='m-12'>
                {filteredData ? <button class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setFilteredData(null)}>Show All</button> : <></>}
                <form class="max-w-md mx-auto my-12 " onSubmit={handleSearchSubmit}>

                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>      <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input onChange={(e) => { setSearchData(e.target.value) }} name="search" type="searchData" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search User" required />
                        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>


                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                    <thead class="text-xs text-gray-300 uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Active
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredData ? <tr class="bg-white border-b text-black text-l font-semibold dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="px-6 py-4">
                                {filteredData["username"]}
                            </td>
                            <td class="px-6 py-4">
                                {filteredData["email"]}
                            </td>
                            <td class="px-6 py-4">
                                {filteredData["phone"]}
                            </td>
                            <td class="px-6 py-4">
                                {filteredData["is_active"] ?

                                    <div class="flex items-center">
                                        <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Active
                                    </div> : <div class="flex items-center">
                                        <div class="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Inactive
                                    </div>}
                            </td>
                            <td class="px-6 py-4 flex flex-row">
                                {filteredData["is_active"] ?


                                    <p key={filteredData["id"]} type="button" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => { setBlock({ "block": "false" }); setUserId(filteredData["id"]); setEdit(true) }}>Block</p> : <p key={filteredData["id"]} type="button" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => { setBlock({ "block": "true" }); setUserId(filteredData["id"]); setEdit(true) }}>Unblock</p>

                                }


                                {
                                    edit ?

                                        <div id="popup-modal" tabindex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                            <div className="relative p-4 w-full max-w-md max-h-full">
                                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                    <button type="button" onClick={() => { setEdit(false); setUserId(null) }} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                        </svg>

                                                    </button>
                                                    <div class="p-4 md:p-5 text-center">
                                                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                        </svg>
                                                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to edit this User?</h3>
                                                        <button onClick={handleConfirm} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                                            Yes, I'm sure
                                                        </button>
                                                        <button onClick={() => { setEdit(false); setUserId(null) }} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> : <></>
                                }


                            </td>
                        </tr> : <> {
                            info.map((item, key) =>






                                <tr className="bg-white border-b text-black text-l font-semibold dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">
                                        {item.username}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.is_active ?

                                            <div className="flex items-center">
                                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Active
                                            </div> : <div class="flex items-center">
                                                <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Inactive
                                            </div>}
                                    </td>
                                    <td className="px-6 py-4 flex flex-row">
                                        {item.is_active ?


                                            <p key={item.id} type="button" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => { setBlock({ "block": "false" }); setUserId(item.id); setEdit(true) }}>Block</p> : <p key={item.id} type="button" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => { setBlock({ "block": "true" }); setUserId(item.id); setEdit(true) }}>Unblock</p>

                                        }


                                        {
                                            edit ?

                                                <div id="popup-modal" tabindex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                                    <div className="relative p-4 w-full max-w-md max-h-full">
                                                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                            <button type="button" onClick={() => { setEdit(false); setUserId(null) }} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                                </svg>

                                                            </button>
                                                            <div class="p-4 md:p-5 text-center">
                                                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                </svg>
                                                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to edit this User?</h3>
                                                                <button onClick={handleConfirm} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                                                    Yes, I'm sure
                                                                </button>
                                                                <button onClick={() => { setEdit(false); setUserId(null) }} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> : <></>
                                        }


                                    </td>
                                </tr>
                            )

                        }</>}



                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminUsers
