import React from "react"
import enroll from '../assets/enroll.png'
const Enroll = () => {
    return (
        <div className="bg-white flex flex-col items-center w-full h-fit">

            <div className="bg-black w-full h-20 text-white  text-2xl font-bold  p-6 flex justify-center">
                <img src={enroll} className="w-7 h-7"/>
                Enrolling The Device
            </div>
            <div className="flex flex-col  items-center space-y-8 p-4 mt-10">
                <h2 className="text-2xl font-medium">Start: Install SAG Agent mobile app on Android device</h2>
                <button className="bg-[#03A9FC] w-32 text-white px-3 py-2 hover:shadow-lg hover:bg-sky-700  hover:scale-105 transform transition-all duration-200 ease-in-out ">Install</button>
                 <h3 className="text-2xl font-normal"> Step 1: Allow SecureMode  permission</h3>
                <button className="bg-[#03A9FC] w-32 text-white px-3 py-2 hover:shadow-lg hover:bg-sky-700  hover:scale-105 transform transition-all duration-200 ease-in-out ">Allow</button>
                <h3 className="text-2xl font-normal">  Step2: Register device on mobiHEAL</h3> 
                 <button className="bg-[#03A9FC] w-32 text-white px-3 py-2 hover:shadow-lg hover:bg-sky-700  hover:scale-105 transform transition-all duration-200 ease-in-out ">Register</button>
                 
            </div>

        </div>
    )
}

export default Enroll;