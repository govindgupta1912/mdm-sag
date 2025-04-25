import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import HardwareInfo from "./HardwareInfo";
import SoftwareInfo from "./SoftwareInfo";
import SensorInfo from "./SensorInfo";
import nodata from "../assets/no-data.png";
import Application from "./Application";
import NetworkInfo from "./NetworkInfo";
import { toast } from "react-toastify";
import { use } from "react";

const Fetch = () => {
  const [details, setDetails] = useState();
  const [error, setError] = useState("");
  const [send, setSend] = useState();
  const Serial_number = useSelector((state) => state.serial.serialNumber);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [processing, setProcessing] = useState(false);

  // const response = await axios.get(`${API_BASE_URL}/api/connect_device_list/`);

  //const Serial_number='ZD222D6687'
  console.log("serial_number", Serial_number);

  // const fetch_Detail = async () => {
  //   if (!Serial_number) {
  //     setError('Device is Not Connected');
  //     return;
  //   }

  //   try {
  //     // const response = await axios.post("http://192.168.0.121:9002/api/fetch_device_info", { serial_number:Serial_number
  //     //  });

  //     const response = await axios.post(`${API_BASE_URL}/api/fetch_device_info`, { serial_number:Serial_number
  //     });

  //     console.log("response data: ", response.data);
  //     console.log("object",Object.keys(response.data).length);

  //     // if(response.data.status=true)
  //     // {
  //     //   setError('Unable to fetch the details');
  //     // }

  //     if (response.data.status === false) {
  //       setError('Unable to fetch the details');
  //       setDetails(null); // Clear previous details if any
  //       return;
  //     }

  //       setDetails(response.data);
  //       setError('');

  //   } catch (error) {
  //     console.error('Error fetching device info:', error);
  //     setError('Unable to fetch the details');
  //     setDetails(null);
  //   }
  // };

  const fetch_Detail = async () => {
    setProcessing(true);
    if (!Serial_number) {
      toast.error("Device is not connected");
      setProcessing(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/fetch_device_info`,
        {
          serial_number: Serial_number,
        }
      );

      if (response.data.status === false) {
        setDetails(null);
        toast.error("Unable to fetch the details");
        return;
      }
      console.log("response======",response);
      
      setDetails(response.data);
      toast.success("Device details fetched successfully");
    } catch (error) {
      console.error("Error fetching device info:", error);
      setDetails(null);
      toast.error("Something went wrong while fetching");
    }
    setProcessing(false);
  };

  // const send_Deatil = async()=>{
  //   if(!Serial_number){
  //     setError('Device is not Connected');
  //     return;
  //   }

  //   try {
  //   //const response_send=await axios.post("http://192.168.0.121:9001/api/send_details_to_navkiran",{serial_number:Serial_number})
  //   const response_send=await axios.post(`${API_BASE_URL}/api/send_details_to_navkiran`,{serial_number:Serial_number})

  //      console.log("Rseponse_Send",response_send);

  //     //  if (response.data.status === false) {
  //     //   setError('Unable to fetch the details');
  //     //   setDetails(null); // Clear previous details if any
  //     //   return;
  //     // }

  //      setSend(response_send);

  //   } catch (error) {
  //     console.error('Failed to Send the Data',error)
  //     setError("Unabel to send the data");
  //   }

  // }

  const send_Deatil = async () => {
    setProcessing(true);
    if (!Serial_number) {
      toast.error("Device is not connected");
      setProcessing(false);
      return;
    }

    try {
      const response_send = await axios.post(
        `${API_BASE_URL}/api/send_details_to_navkiran`,
        { serial_number: Serial_number }
      );

      toast.success("Device details sent successfully");
      setSend(response_send);
    } catch (error) {
      console.error("Failed to send the data", error);
      toast.error("Unable to send thea data");
    }
    setProcessing(false);
  };

  return (
      <div className="pt-20 flex flex-col min-h-screen   p-4 md:p-6">

      {/* Header Section */}
      <div className="sticky top-[74px] z-40 flex items-center justify-between w-full  p-4 bg-white shadow-md rounded-md">
        <h1 className="text-xl md:text-2xl ">Fetch Device Details </h1>
        <div className="space-x-4">
          <button
            //className="text-white bg-[#03A9FC] hover:bg-blue-800 px-6 py-2 rounded-md"
            // className="bg-[#03A9FC] text-white px-8 py-2 hover:shadow-lg hover:bg-sky-700  hover:scale-105 transform transition-all duration-200 ease-in-out "
            className={`bg-[#03A9FC] text-white px-8 py-2 rounded-md transition-all duration-200 ease-in-out ${
              processing
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-lg hover:bg-sky-700 hover:scale-105 transform"
            }`}
            onClick={fetch_Detail}
            disabled={processing}
          >
            Fetch
          </button>
          <button
            // className="text-white bg-[#03A9FC] hover:bg-blue-800 px-6 py-2 rounded-md"
            // className="bg-[#03A9FC] text-white px-8 py-2 hover:shadow-lg hover:bg-sky-700  hover:scale-105 transform transition-all duration-200 ease-in-out "
            className={`bg-[#03A9FC] text-white px-8 py-2 rounded-md transition-all duration-200 ease-in-out ${
              processing
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-lg hover:bg-sky-700 hover:scale-105 transform"
            }`}
            onClick={send_Deatil}
            disabled={processing}
          >
            Send
          </button>
        </div>
      </div>

      <div className={`mt-2 flex-1 ${details ? 'overflow-y-auto' : 'overflow-hidden'} relative`}>


        {/* Error Message
      {error && <p className="text-red-500  text-center text-3xl mt-5 ">{error}</p>}
      {/*Response after Sending the Data*/}
      {/* {  send && <span className='text-center text-3xl mt-5'>Data is Sucessfully Send</span>}  */}

      {/* Device Info Cards or No Data Image */}
      {details ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-4 shadow-md rounded-md">
            <HardwareInfo details={details} />
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <SoftwareInfo details={details} />
          </div>
          <div className=" bg-white p-4 shadow-md rounded-md">
            <SensorInfo details={details} />
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <NetworkInfo details={details} />
          </div>
          {details.application.length>0&&<div className="col-span-1 md:col-span-2 bg-white p-4 shadow-md rounded-md">
            <Application details={details} />
          </div>}
        </div>
      ) : (
        <div className="flex items-center justify-center mt-20 h-full">
          <img src={nodata} alt="No Data" className="w-64 h-64 opacity-70" />
        </div>
      )}
      </div>
    </div>
  );
};

export default Fetch;
