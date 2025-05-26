import React, { useState } from "react";
import enroll from "../../assets/enroll.png";
import axios from "axios";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

const Enroll = () => {
  const Serial_number = useSelector((state) => state.serial.serialNumber);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusType, setStatusType] = useState("info"); // "info", "success", "error"

  const Install = async () => {
    setLoading(true);
    setStatusType("info");
    setStatus("Installing SAG Agent...");

    try {
      const response1 = await axios.post(
        `${API_BASE_URL}/api/enrolled_device`,
        {
          serial_number: Serial_number,
        }
      );

      console.log("Install Response", response1);
      if(response1.data.status)
      {
        setStatus(response1.data.message)
        setStatusType("success");
        setStep(1);
      }
      else
      {
        setStatus(response1.data.message)
        setStatusType("error");
      }
      // setStatus("Aget is Successfully Installed");
      // setStatusType("success");
      // setStep(1);
    } catch (error) {
      console.error("Install Error", error);
      setStatus("Failed to Install the SAG Agent");
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  const permission = async () => {
    setLoading(true);
    setStatusType("info");
    setStatus("Allowing SecureMode permission...");
    try {
      const response2 = await axios.post(
        `${API_BASE_URL}/api/alllowed_securemode`,
        {
          serial_number: Serial_number,
        }
      );
      console.log("permission Response", response2);
     
      if(response2.data.status)
        {
          setStatus(response2.data.message)
          setStatusType("success");
          setStep(2);
        }
        else
        {
          setStatus(response2.data.message)
          setStatusType("error");
        }

      // setStatus("Permission granted successfully.");
      // setStatusType("success");
      // setStep(2);
    } catch (error) {
      console.error("Permission Error", error);
      setStatus("Permission step failed.");
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    setLoading(true);
    setStatusType("info");
    setStatus("Registering device...");
    try {
      const response3 = await axios.post(
        `${API_BASE_URL}/api/register_device_on_mobiheal`,
        {
          serial_number: Serial_number,
        }
      );

      if(response3.data.status)
        {
          setStatus(response3.data.message)
          setStatusType("success");
          setStep(3);
        }
        else
        {
          setStatus(response3.data.message)
          setStatusType("error");
        }

      // setStatus("Device registered successfully.");
      // setStatusType("success");
      // setStep(3);
      console.log("register permission", response3);
    } catch (error) {
      console.error("Register Error", error);
      setStatus("Registration failed.");
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white flex flex-col items-center w-full h-full min-h-screen">
      <div className="sticky top-[74px] z-40 bg-black w-full h-20 text-white  text-2xl font-bold  p-6 flex justify-center">
        <img src={enroll} className="w-7 h-7" />
        Enrolling The Device
      </div>
      <div className="flex flex-col  items-center space-y-8 p-4 mt-10">
        <h2 className="text-2xl font-medium">
          Start: Install SAG Agent mobile app on Android device
        </h2>
        <button
          //className="bg-[#03A9FC] w-32 text-white px-3 py-2 hover:shadow-lg hover:bg-sky-700  hover:scale-105 transform transition-all duration-200 ease-in-out "

          className={`bg-[#03A9FC] text-white px-6 py-2 transition-all duration-200 ease-in-out h-12 w-36 ${
            step !== 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-lg hover:bg-sky-700 hover:scale-105 transform"
          }`}
          onClick={Install}
          disabled={step !== 0}
        >
          Install
        </button>
        <h3 className="text-2xl font-normal">
          {" "}
          Step 1: Allow SecureMode permission
        </h3>
        <button
          //className="bg-[#03A9FC] w-32 text-white px-3 py-2 hover:shadow-lg hover:bg-sky-700  hover:scale-105 transform transition-all duration-200 ease-in-out "
          className={`bg-[#03A9FC] text-white px-6 py-2 transition-all duration-200 ease-in-out h-12 w-36 ${
            step !== 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-lg hover:bg-sky-700 hover:scale-105 transform"
          }`}
          onClick={permission}
          disabled={step !== 1}
        >
          Allow
        </button>
        <h3 className="text-2xl font-normal">
          {" "}
          Step2: Register device on mobiHEAL
        </h3>
        <button
          //className="bg-[#03A9FC] w-32 text-white px-3 py-2 hover:shadow-lg hover:bg-sky-700  hover:scale-105 transform transition-all duration-200 ease-in-out "
          className={`bg-[#03A9FC] text-white px-6 py-2 transition-all duration-200 ease-in-out h-12 w-36 ${
            step !== 2
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-lg hover:bg-sky-700 hover:scale-105 transform"
          }`}
          // onClick={register}
          onClick={() => register()}
          disabled={step != 2}
        >
          Register
        </button>
      </div>
      {/* <div>
            {status &&<p className="text-lg text-gray-700 mt-4">{status}</p>}
          </div> */}
      <div className="mt-6">
        {status && (
          <div
            className={`w-[500px] h-[100px] flex items-center justify-center px-4 py-3 rounded-lg shadow transition-all duration-1000 ${
              statusType === "success"
                ? "bg-green-100 text-green-800 text-xl border border-green-300"
                : statusType === "error"
                ? "bg-red-100 text-red-800 text-xl border border-red-300"
                : "bg-blue-100 text-blue-800 text-xl border border-blue-300"
            }`}
          >
            {loading && (
              <svg
                className="animate-spin h-10 w-10 mr-2 text-current"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}

            {/* {loading && <ClipLoader color="#03A9FC" size={24} />} */}
            <p>{status}</p>
          </div>
        )} 
      </div>
    </div>
  );
};
export default Enroll;
