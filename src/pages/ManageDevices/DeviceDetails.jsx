import { Lock, LockKeyhole, RefreshCcw, Trash2 } from "lucide-react";
import devices from "../../assets/devices.png";

import changePwd from "../../assets/changePwd.png";
import Device_policy_info from "../../components/Reuseable_Components/Device_policy_info";
import { useLocation } from "react-router-dom";
import HardwareInfo from "@/components/Reuseable_Components/HardwareInfo";
import NetworkInfo from "@/components/Reuseable_Components/NetworkInfo";
import SensorInfo from "@/components/Reuseable_Components/SensorInfo";
import SoftwareInfo from "@/components/Reuseable_Components/SoftwareInfo";
import { toast } from "react-toastify";
import axios from "axios";
const DeviceDetails = () => {

  const location = useLocation();
  const deviceData = location.state?.device;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  console.log("DeviceData", deviceData);


  if (!deviceData) {
    return <div>No device data available.</div>;
  }

  const lock_Deivice = async (device_id) => {
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/lock_device`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ device_id }),
      });

      const data = await response.json();
      console.log("Lock Device Response:", data);

      if (data.status === true) {
        toast.success("Device Locked Successfully");
      } else {
        toast.error("Failed to Lock Device");
      }
    } catch (error) {
      console.error("Error locking device:", error);
      toast.error("Error locking device");
    }
  }
const reboot_Device = async (device_id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/reboot_device`,{
      device_id:device_id}

    );
    console.log("Reboot Device Response:", response.data);
    if (response.data.status) {
      toast.success("Device Rebooted Successfully");
    }
    else {
      toast.error("Failed to Reboot Device");
    }
  }
  catch (error) {
    console.error("Error rebooting device:", error);
    toast.error("Error rebooting device");
    console.log("Error:", error.response.data); // Log the error response for debugging
    console.log("Error message:", error.message); // Log the error message
  }
}
  return (
    <div>
      <div className="flex justify-start p-4 bg-black items-center gap-4">
        <img src={devices} alt="" />
        <h1 className="text-white text-2xl font-bold">Device Details</h1>
      </div>
      <div className=" flex justify-between  ">
        <div className="w-4/5   h-full p-8 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6  ">
            <div className=" bg-white rounded-md shadow-md">
              <Device_policy_info details={deviceData} />
            </div>
            <div className="bg-white p-4 shadow-md rounded-md">
            <HardwareInfo details={deviceData} />
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <SoftwareInfo details={deviceData} />
          </div>
          <div className="shadow-md bg-white rounded-md p-4">
            <SensorInfo details={deviceData} />
          </div>
            
          
            
            {/* <NetworkInfo details={deviceData} /> */}
          </div>
        </div>

        <div className="w-1/5 flex flex-col gap-3 p-8 mt-5 mr-5">
          <button className="flex items-center justify-center gap-2 text-green-500 hover:text-green-800 px-10 py-2.5  w-60 h-14 bg-white"
          onClick={()=>lock_Deivice(deviceData.device_id)}
          >
            <LockKeyhole size={20} />
            Lock
          </button>

          <button className="flex items-center justify-center  gap-2 text-red-600 hover:text-red-800 px-10 py-2.5 w-60  h-14 bg-white"
                 >
            <Trash2 size={20} />
            Delete
          </button>
          <button className="flex items-center justify-center gap-2 text-orange-500 hover:text-orange-800 px-10 py-2.5  w-60 h-14 bg-white"
          onClick={()=>reboot_Device(deviceData.device_id)}
          >
            <RefreshCcw size={20} />
            Reboot
          </button>
          <button className="flex items-center justify-center gap-2 text-[#03A9FC] hover:text-blue-800 px-10 py-2.5  w-60 h-14 bg-white">
            <img src={changePwd} alt="" />
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetails;
