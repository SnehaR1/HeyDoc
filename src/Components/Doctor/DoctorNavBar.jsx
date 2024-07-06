import React from 'react'

function DoctorNavBar() {
    return (
        <div className='bg-white flex flex-row justify-around shadow-md mt-6 items-center'>
            <div className='bg-white flex flex-row justify-between shadow-md mt-6 items-center'>
                <div className='flex flex-row ml-12 p-4'>


                    <h1 className='text-blue-600 font-bold text-3xl ml-12'>HeyDoc</h1>
                </div>
                <div className='flex flex-row mr-4'>

                    <VscAccount className='mr-3 mt-2 text-3xl  hover:text-blue-500' />
                    <p className="mx-4 text-grey-300 font-semibold text-l hover:text-blue-500 border border-black hover:border-blue-500 rounded p-2" onClick={handleLogout}>Log Out</p>
                </div>
            </div>

        </div>
    )
}

export default DoctorNavBar