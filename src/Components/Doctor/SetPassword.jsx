import React from 'react'

function SetPassword() {
    return (
        <div className=" min-h-screen flex justify-center items-center  bg-gradient-to-r from-cyan-500 to-blue-500 "><div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">Set Password</h1>
            <form className="space-y-4" >

                <div>
                    <label className="block text-dm font-medium  text-blue-800" >Password</label>
                    <input type="password" name="password" className="my-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Password" />
                </div>
                <div>
                    <label className="block text-dm font-medium  text-blue-800" >Confirm Password</label>
                    <input type="confirm_password" name="password" className="my-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Password" />
                </div>
                <div>
                    <button type="submit" className="my-3 w-full py-3 px-4 border border-grey-300 rounded-md shadow-sm text-white bg-gradient-to-r from cyan-500 to-blue-500 hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                        Sign in
                    </button>
                </div>

            </form>
        </div></div>
    )
}

export default SetPassword