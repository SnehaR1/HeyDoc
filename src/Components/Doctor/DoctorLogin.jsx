import React, { useState } from 'react'
import { doctorapi } from '../../api/api'
function DoctorLogin() {
    const [requesting, setRequesting] = useState(false)
    const [reqInfo, setReqInfo] = useState({})
    const handleReqSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await doctorapi.post('doctor_verification/', reqInfo);

            alert(response.data.message)


        } catch (error) {

            alert(error.response.data.error);


        }
    }
    return (

        <div className=" min-h-screen flex justify-center items-center  bg-gradient-to-r from-cyan-500 to-blue-500 ">
            {requesting ? <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">Email for Verification</h1>
                <form className="space-y-4" onSubmit={handleReqSubmit}>
                    <div>
                        <label className="block text-md font-medium  text-blue-800">Email</label>
                        <input onChange={(e) => setReqInfo({ ...reqInfo, [e.target.name]: e.target.value })} type="email" name="email" className="my-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Email" />
                    </div>
                    <div>
                        <label className="block text-md font-medium  text-blue-800">Message</label>
                        <textarea onChange={(e) => setReqInfo({ ...reqInfo, [e.target.name]: e.target.value })} type="text" name="message" className="my-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Type in your Message" />
                    </div>

                    <div>
                        <button type="submit" className="my-3 w-full py-3 px-4 border border-grey-300 rounded-md shadow-sm text-white bg-gradient-to-r from cyan-500 to-blue-500 hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                            Request
                        </button>
                    </div>
                    <div className="text-center">
                        <p className="text-primary ">Go Back to Login Page? <span className='hover:text-blue-500 hover:underline' onClick={() => setRequesting(false)}>Click here</span> </p>
                    </div>
                </form></div> :
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">Doctor Login</h1>
                    <form className="space-y-4" >
                        <div>
                            <label className="block text-md font-medium  text-blue-800">Email</label>
                            <input type="email" name="email" className="my-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Email" />
                        </div>
                        <div>
                            <label className="block text-dm font-medium  text-blue-800" >Password</label>
                            <input type="password" name="password" className="my-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Password" />
                        </div>
                        <div>
                            <button type="submit" className="my-3 w-full py-3 px-4 border border-grey-300 rounded-md shadow-sm text-white bg-gradient-to-r from cyan-500 to-blue-500 hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                                Sign in
                            </button>
                        </div>
                        <div className="text-center">
                            <p className="text-primary ">Don't have an account yet? <span className='hover:text-blue-500 hover:underline' onClick={() => setRequesting(true)}>Request One</span> </p>
                        </div>
                    </form>
                </div>}
        </div>

    )
}

export default DoctorLogin