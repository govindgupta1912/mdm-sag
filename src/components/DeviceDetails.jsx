 import devices from '../assets/devices.png'
const DeviceDetails=()=>{

    return(
        <div>
            <div className='flex justify-start p-4 bg-black items-center gap-4'>
                <img src={devices} alt="" />
                <h1 className='text-white text-2xl font-bold'>Device Details</h1>
            </div>
        </div>
    )
}

export default DeviceDetails;