// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
// import { data, useOutletContext } from 'react-router-dom';
// import HardwareInfo from './HardwareInfo';
// import SoftwareInfo from './SoftwareInfo'
// import SensorInfo from './SensorInfo';
// import nodata from '../assets/no-data.png';

// const Fetch = () => {

//   const [details, setDetails] = useState();
//   const [error, setError] = useState('');
//   const Serial_number = useSelector((state) => state.serial.serialNumber)

//   console.log("serial_number", Serial_number);


//   const fetch_Detail = async () => {



//     if (!Serial_number) {
//       setError('Serial Number Not Found');
//       return;
//     }
//     try {
//       const response = await axios.post("http://192.168.0.121:9001/api/fetch_device_info", { serial_number: Serial_number }

//       );

//       console.log("response dsatttffffffffffffffff ", response)


//       console.log("device details", response);
//       if (response.data && response.data.length>0) {
//         setDetails(response.data[0]);
//         setError('');
//       }
//       else {
//         setDetails(null);
//         setError('unable To fetch the deatils');
//       }


//     }
//     catch (error) {
//       console.error('Error in Fetching the device_info', error);
//     }


//   }

//   return (
//     <div>
//       <div className='flex space-x-12 pt-3 p-4 bg-white'>
//         <h1 className='mt-1 text-lg'>Fetch Device Details</h1>
//         <div className='space-x-4' >
//           <button className='text-white bg-blue-500 hover:bg-blue-800 px-10 py-1'
//             onClick={fetch_Detail}
//           >Fetch</button>
//           <button className='text-white bg-blue-500 hover:bg-blue-800 px-10 py-1'

//           >Send</button>
//         </div>
//       </div>

//       {error && <p className="text-red-500 mt-2">{error}</p>}
//       {/* //<div className=''> */}
//      { details ?<div>

//         <div className='flex space-x-12'>

//          <div className=' h-[600px] w-[400px] mt-3 items-center'>
//               <HardwareInfo details={details}/>
//           </div>


//           <div className=' h-[600px] w-[400px] mt-3'>
//             <SoftwareInfo details={details}/>
//           </div>

//         </div>

//         <div className='bg-white h-[500px] w-[400px] mt-3'>
//           <SensorInfo details={details}/>

//         </div>

//       </div>:
//       // <div className=' h-full w-full content-center  '>
//       // <img src={nodata} className='py-5'/>


//       //   </div>
//         <div className="h-25 w-full flex items-center justify-center">
//         <img src={nodata} className="py-80" />
//       </div>
      
//       }
//       {/* </div> */}
//     </div>
//   )
// }

// export default Fetch


import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import HardwareInfo from './HardwareInfo';
import SoftwareInfo from './SoftwareInfo';
import SensorInfo from './SensorInfo';
import nodata from '../assets/no-data.png';
import Application from './Application';

const Fetch = () => {
  const [details, setDetails] = useState();
  const [error, setError] = useState('');
  const[send,setSend] = useState();
  const Serial_number = useSelector((state) => state.serial.serialNumber);
   //const Serial_number='ZD222D6687'
  console.log("serial_number", Serial_number);

  const fetch_Detail = async () => {
    if (!Serial_number) {
      setError('Device is Not Connected');
      return;
    }

    try {
      const response = await axios.post("http://192.168.0.121:9001/api/fetch_device_info", { serial_number:Serial_number
       });

      console.log("response data: ", response.data);
      console.log("object",Object.keys(response.data).length);
      
      // if(response.data.status=true)
      // {
      //   setError('Unable to fetch the details');
      // }

      if (response.data.status === false) {
        setError('Unable to fetch the details');
        setDetails(null); // Clear previous details if any
        return;
      }

      
        setDetails(response.data);
        setError('');

    
    } catch (error) {
      console.error('Error fetching device info:', error);
      setError('Unable to fetch the details');
      setDetails(null);
    }
  };

  const send_Deatil = async()=>{
    if(!Serial_number){
      setError('Device is not Connected');
      return;
    }

    try {
    const response_send=await axios.post("http://192.168.0.121:9001/api/send_details_to_navkiran",{serial_number:Serial_number})
       console.log("Rseponse_Send",response_send);
      
      //  if (response.data.status === false) {
      //   setError('Unable to fetch the details');
      //   setDetails(null); // Clear previous details if any
      //   return;
      // }

       setSend(response_send);
      
    } catch (error) {
      console.error('Unable to Send the Data',error)
      setError("Unabel to send the data");
    }

  }

  return (
    <div className="flex flex-col   min-h-screen p-6 bg-gray-100">
      {/* Header Section */}
      <div className="flex items-center justify-between w-full  p-4 bg-white shadow-md rounded-md">
        <h1 className="text-lg font-semibold">Fetch Device Details :-</h1>
        <div className="space-x-4">
          <button 
            className="text-white bg-[#03A9FC] hover:bg-blue-800 px-6 py-2 rounded-md"
            onClick={fetch_Detail}
          >
            Fetch
          </button>
          <button className="text-white bg-[#03A9FC] hover:bg-blue-800 px-6 py-2 rounded-md"
             onClick={send_Deatil}
          >
            Send
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500  text-center text-3xl mt-5 ">{error}</p>}
      {/*Response after Sending the Data*/}
      {  send && <span className='text-center text-3xl mt-5'>Data is Sucessfully Send</span>}

      {/* Device Info Cards or No Data Image */}
      {details ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-4 shadow-md rounded-md">
            <HardwareInfo details={details} />
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <SoftwareInfo details={details} />
          </div>
          <div className="col-span-1 md:col-span-2 bg-white p-4 shadow-md rounded-md">
            <SensorInfo details={details} />
          </div>
          <div className='col-span-1 md:col-span-2 bg-white p-4 shadow-md rounded-md ml-20'>
            <Application details={details}/>
            </div>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-20">
          <img src={nodata} alt="No Data" className="w-64 h-64 opacity-70" />
        </div>
      )}
    </div>
  );
};

export default Fetch;
