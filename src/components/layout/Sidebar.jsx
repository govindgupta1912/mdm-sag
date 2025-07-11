import React, { useState } from "react";
import axios from "axios";
import Fetch from "../../pages/FetchDeviceInfo/Fetch";
import { connect, useDispatch } from "react-redux";
import { setSerialNumber } from "../../utilites/store/slices/serialSlice";
import { VscDebugDisconnect } from "react-icons/vsc";

const Sidebar = () => {
  const [info, setInfo] = useState(null); // Initialize as null
  const [errors, setErrors] = useState("");
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();
  const [fetchStatus, setFetchStatus] = useState("idle");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const connectADB = async () => {
    setProcessing(true);
    setFetchStatus("loading");
    try {
      //mayank.nainwal@mobisec.in
      //const response = await axios.get("http://192.168.0.121:9002/api/connect_device_list/" );
      const response = await axios.get(
        `${API_BASE_URL}/api/connect_device_list/`
      );

      console.log("response dta  heee  ", response?.data);
      //dispatch(setSerialNumber(ZD222D6687));
      if (response.data.devices && response.data.devices.length > 0) {
        console.log("hellow serial ", response.data.devices[0]);
        setInfo(response.data.devices[0]); // Store the first device
        //setSerial(response.data.devices[0].serialNumber);
        dispatch(setSerialNumber(response.data.devices[0].serial_number));
        setFetchStatus("success");
        setErrors(""); // Clear error message
      } else {
        setErrors("No Device Found");
        setInfo(null);
        setFetchStatus("error");
      }
    } catch (error) {
      console.error("Error connecting to device", error);
      setErrors("Failed to connect to the device.");
      setInfo(null);
      setFetchStatus("error");
    }
    setProcessing(false);
  };

  return (
    // <div className="w-1/5 h-screen  p-4 flex flex-col space-y-2">
    // <div className="w-1/5 fixed top-16 left-0 bottom-0 overflow-y-auto p-4 bg-white shadow-md">
    //   <h1 className="text-[#03A9FC] font-semibold text-center text-2xl">
    //     Available Device
    //   </h1>
        <div className="w-1/5 fixed top-16 left-0 bottom-0 overflow-y-auto p-4 bg-[#F8FAFC] shadow-md border-r border-gray-200">
  <h1 className="text-[#0D1B2A] font-semibold text-center text-xl mt-1">
    Available Device
  </h1>

      {/* <div className="bg-gray-200 p-3 text-center mb-4 min-h-[80px] flex flex-col justify-center">
         {errors ? (
          <p className="text-red-500">{errors}</p>
        ) : info ? (
          <>
            <p>Serial Number : {info.serial_number}</p>
            <p>Model Number : {info.model_number}</p>

          </>
        ) : (
          <p>No device connected yet.</p>
        )} 

        {fetchStatus === 'loading' && (
          <p className="text-blue-600 font-semibold animate-pulse">Fetching device info...</p>
        )}

        {fetchStatus === 'success' && info && (
          <>
            <p>Serial Number: {info.serial_number}</p>
            <p>Model Number: {info.model_number}</p>
          </>
        )}

        {fetchStatus === 'error' && (
          <p className="text-red-500">{errors}</p>
        )}

        {
          console.log("fetchStatus==", fetchStatus)
        }
        {
          console.log("infoStaus===", info)

        }
        {fetchStatus === 'idle' && !info && (
          <p className='text-blue-200'>No device connected yet.</p>
        )}
      </div> */}

      <div className="bg-gray-200 p-3 text-center mb-2 min-h-[80px] flex flex-col justify-center mt-2 rounded-md">
        {fetchStatus === "loading" && (
          <p className="text-blue-600  animate-pulse">
            Fetching device info...
          </p>
        )}

        {fetchStatus === "error" && (
          <p className="text-red-500">{errors || "Something went wrong"}</p>
        )}

        {fetchStatus === "success" && info ? (
          <>
            <p>Serial Number: {info.serial_number}</p>
            <p>Model Number: {info.model_number}</p>
          </>
        ) : null}

        {fetchStatus === "idle" && !info && <p>No device connected yet.</p>}

        {/* fallback in case success is set but no device was found */}
        {fetchStatus === "success" && !info && <p>No device connected yet.</p>}
      </div>

      <div className="flex space-x-4 justify-center ">
        <button
          type="button"
          className="flex justify-center items-center gap-1 bg-gradient text-white px-5 py-1.5 w-full bg-pr rounded-md shadow hover:scale-95 transition"
          //className="bg-[#03A9FC] text-white px-5 py-1.5 hover:shadow-lg hover:bg-sky-700  hover:scale-105 transform transition-all duration-200 ease-in-out "
          //className="text-white bg-[#03A9FC] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={connectADB}
          disabled={processing}
        >
          <VscDebugDisconnect className="h-4 w-5" />
          {info ? "Reconnect" : "Connect"}
          
          {/* {processing?'Connecting':'Connect'} */}
        </button>
{/* 
        <button
          type="button"
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-10 py-1.5 rounded-md shadow hover:scale-105 transition"
          //className="bg-[#03A9FC] text-white px-10 py-1.5 hover:shadow-lg hover:bg-sky-700  hover:scale-105 transform transition-all duration-200 ease-in-out "

          //className="text-white bg-[#03A9FC] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-10 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          ADD
        </button> */}
      </div>
    </div>
  );
};

export default Sidebar;
