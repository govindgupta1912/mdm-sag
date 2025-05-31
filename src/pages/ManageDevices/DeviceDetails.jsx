// import { Lock, LockKeyhole, MoreVertical, RefreshCcw, Trash2 } from "lucide-react";
// import devices from "../../assets/devices.png";
// import andriod_logo from "../../assets/andriod_logo.png";
// import system_app_logo from "../../assets/system-app.png";
// import changePwd from "../../assets/changePwd.png";
// import Device_policy_info from "../../components/Reuseable_Components/Device_policy_info";
// import { useLocation } from "react-router-dom";
// import HardwareInfo from "@/components/Reuseable_Components/HardwareInfo";
// import NetworkInfo from "@/components/Reuseable_Components/NetworkInfo";
// import SensorInfo from "@/components/Reuseable_Components/SensorInfo";
// import SoftwareInfo from "@/components/Reuseable_Components/SoftwareInfo";
// import { toast } from "react-toastify";
// import axios from "axios";
// const DeviceDetails = () => {

//   const location = useLocation();
//   const deviceData = location.state?.device;
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//   console.log("DeviceData", deviceData);

//   if (!deviceData) {
//     return <div>No device data available.</div>;
//   }

//  const System_app_list = deviceData?.application.filter(
//     (app) => app.is_system_app === true
//   );
// const Non_System_app_list = deviceData?.application.filter(
//     (app) => app.is_system_app === false
//   );
//   const lock_Deivice = async (device_id) => {

//     try {
//       const response = await fetch(`${API_BASE_URL}/api/lock_device`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ device_id }),
//       });

//       const data = await response.json();
//       console.log("Lock Device Response:", data);

//       if (data.status === true) {
//         toast.success("Device Locked Successfully");
//       } else {
//         toast.error("Failed to Lock Device");
//       }
//     } catch (error) {
//       console.error("Error locking device:", error);
//       toast.error("Error locking device");
//     }
//   }
// const reboot_Device = async (device_id) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/api/reboot_device`,{
//       device_id:device_id}

//     );
//     console.log("Reboot Device Response:", response.data);
//     if (response.data.status) {
//       toast.success("Device Rebooted Successfully");
//     }
//     else {
//       toast.error("Failed to Reboot Device");
//     }
//   }
//   catch (error) {
//     console.error("Error rebooting device:", error);
//     toast.error("Error rebooting device");
//     console.log("Error:", error.response.data); // Log the error response for debugging
//     console.log("Error message:", error.message); // Log the error message
//   }
// }
//   return (
//     <div>
//       <div className="flex justify-start p-4 bg-black items-center gap-4">
//         <img src={devices} alt="" />
//         <h1 className="text-white text-2xl font-bold">Device Details</h1>
//       </div>
//       <div className=" flex justify-between  ">
//         <div className="w-4/5   h-full p-8 mt-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6  ">
//             <div className=" bg-white rounded-md shadow-md">
//               <Device_policy_info details={deviceData} />
//             </div>
//             <div className="bg-white p-4 shadow-md rounded-md">
//             <HardwareInfo details={deviceData} />
//           </div>
//           <div className="bg-white p-4 shadow-md rounded-md">
//             <SoftwareInfo details={deviceData} />
//           </div>
//           <div className="shadow-md bg-white rounded-md p-4">
//             <SensorInfo details={deviceData} />
//           </div>

//             {/* <NetworkInfo details={deviceData} /> */}
//           </div>
//         </div>

//         <div className="w-1/5 flex flex-col gap-3 p-8 mt-5 mr-5">
//           <button className="flex items-center justify-center gap-2 text-green-500 hover:text-green-800 px-10 py-2.5  w-60 h-14 bg-white"
//           onClick={()=>lock_Deivice(deviceData.device_id)}
//           >
//             <LockKeyhole size={20} />
//             Lock
//           </button>

//           <button className="flex items-center justify-center  gap-2 text-red-600 hover:text-red-800 px-10 py-2.5 w-60  h-14 bg-white"
//                  >
//             <Trash2 size={20} />
//             Delete
//           </button>
//           <button className="flex items-center justify-center gap-2 text-orange-500 hover:text-orange-800 px-10 py-2.5  w-60 h-14 bg-white"
//           onClick={()=>reboot_Device(deviceData.device_id)}
//           >
//             <RefreshCcw size={20} />
//             Reboot
//           </button>
//           <button className="flex items-center justify-center gap-2 text-[#03A9FC] hover:text-blue-800 px-10 py-2.5  w-60 h-14 bg-white">
//             <img src={changePwd} alt="" />
//             Change Password
//           </button>
//         </div>
//       </div>

//     {
//         Non_System_app_list.map((app, index) => (
//           <div key={index} className="bg-white p-4 shadow-md rounded-md m-4 flex items-center justify-between">
//              <img src={andriod_logo} alt={app.app_name} className="w-10 h-10" />

//           <div>
//             <h1 className="text-lg font-semibold">{app.app_name}</h1>
//                <h3 className="text-sm text-gray-500">{app.app_version}</h3>
//             </div>

//           <h2 className="text-sm text-gray-500">{app.package_name}</h2>

//           <MoreVertical className="w-6 h-6 cursor-pointer hover:text-gray-800" />

//         </div>
//         ))
//      }
//      {
//       System_app_list.map((app, index) => (

//         <div key={index} className="bg-white p-4 shadow-md rounded-md m-4 flex items-center justify-between">
//           <img src={system_app_logo} alt={app.app_name} className="w-10 h-10" />
//           <div>
//             <h1 className="text-lg font-semibold">{app.app_name}</h1>
//                <h3 className="text-sm text-gray-500">{app.app_version}</h3>
//             </div>

//           <h2 className="text-sm text-gray-500">{app.package_name}</h2>

//           <MoreVertical className="w-6 h-6 cursor-pointer hover:text-gray-800" />

//         </div>
//         )
//       )
//       }

//     </div>
//   );
// };

// export default DeviceDetails;

import {
  Bluetooth,
  LockKeyhole,
  MoreVertical,
  RefreshCcw,
  RotateCcw,
  Trash2,
} from "lucide-react";

import devices from "../../assets/devices.png";
import androidLogo from "../../assets/andriod_logo.png";
import systemAppLogo from "../../assets/system-app.png";
import changePwd from "../../assets/changePwd.png";
import Device_policy_info from "../../components/Reuseable_Components/Device_policy_info";
import HardwareInfo from "@/components/Reuseable_Components/HardwareInfo";
import NetworkInfo from "@/components/Reuseable_Components/NetworkInfo";
import SensorInfo from "@/components/Reuseable_Components/SensorInfo";
import Wifi_info from "@/components/Reuseable_Components/Wifi_info";
import SoftwareInfo from "@/components/Reuseable_Components/SoftwareInfo";
import Bluetooth_info from "@/components/Reuseable_Components/Bluetooth_info";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ContentMangementOnDevice from "./ContentMangementOnDevice";

const DeviceDetails = () => {
  const location = useLocation();
  const deviceData = location.state?.device;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  if (!deviceData) {
    return <div className="p-8 text-center">No device data available.</div>;
  }

  const System_app_list = deviceData?.application.filter(
    (app) => app.is_system_app
  );
  const Non_System_app_list = deviceData?.application.filter(
    (app) => !app.is_system_app
  );

  const lockDevice = async (device_id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/lock_device`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device_id }),
      });

      const data = await res.json();
      if (data.status) toast.success("Device Locked Successfully");
      else toast.error("Failed to Lock Device");
    } catch (error) {
      console.error("Error locking device:", error);
      toast.error(error?.response?.data?.message||"Error locking device");
    }
  };

  const rebootDevice = async (device_id) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/reboot_device`, {
        device_id,
      });
      if (response.data.status) toast.success("Device Rebooted Successfully");
      else toast.error("Failed to Reboot Device");
    } catch (error) {
      console.error("Error rebooting device:", error);
      toast.error(error?.response?.data?.message||"Error rebooting device");
    }
  };

  const handelUninstallApp = async (package_name) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/uninstall_app`, {
        device_id: deviceData.device_id,
        package_name: package_name,
      });
      if (response.data.status) {
        toast.success("App Uninstalled Successfully");
      } else {
        toast.error("Failed to Uninstall App");
      }
    } catch (error) {
      console.error("Error uninstalling app:", error);
      toast.error(error?.response?.data?.message||"Error uninstalling app");
    }
  };

  const handelClearAppData = async (package_name) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/clear_app_data`, {
        device_id: deviceData.device_id,
        package_name: package_name,
      });
      if (response.data.status) {
        toast.success("App Data Cleared Successfully");
      } else {
        toast.error("Failed to Clear App Data");
      }
    } catch (error) {
      console.error("Error clearing app data:", error);
      toast.error(error?.response?.data?.message||"Error clearing app data");
    }
  };

  const ActionButton = ({ text, icon, onClick, color }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 justify-center w-full px-4 py-3 rounded-lg bg-white shadow hover:shadow-md transition-all duration-200 ${color}`}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </button>
  );

  const AppList = ({ title, apps, icon }) => (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-700">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[450px] overflow-y-auto pr-2">
        {apps.map((app, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-lg shadow flex items-start gap-4 relative"
          >
            <img src={icon} alt={app.app_name} className="w-10 h-10 mt-1" />
            <div className="flex-1 overflow-hidden">
              <h3 className="text-base font-semibold truncate">
                {app.app_name}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                {app.app_version}
              </p>
              <p className="text-sm text-gray-400 truncate">
                {app.package_name}
              </p>
            </div>
            {!app.is_system_app && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="absolute top-2 right-2">
                    <MoreVertical className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow rounded-md p-1 z-50">
                  <DropdownMenuItem
                    onClick={() => handelUninstallApp(app.package_name)}
                    className="flex items-center text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Uninstall
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handelClearAppData(app.package_name)}
                    className="flex items-center text-blue-600 hover:bg-blue-50"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Clear App Data
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 bg-black p-4">
        <img src={devices} alt="Device" className="w-8 h-8" />
        <h1 className="text-white text-2xl font-bold">Device Details</h1>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6 p-6">
        {/* Info Section */}
        <div className="w-full lg:w-4/5 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-4 shadow">
              <Device_policy_info details={deviceData} />
            </div>
            <div className="bg-white rounded-xl p-4 shadow">
              <HardwareInfo details={deviceData} />
            </div>
            <div className="bg-white rounded-xl p-4 shadow">
              <SoftwareInfo details={deviceData} />
            </div>
            <div className="bg-white rounded-xl p-4 shadow">
              <SensorInfo details={deviceData} />
            </div>
            <div className="bg-white rounded-xl p-4 shadow">
              <Wifi_info details={deviceData} />
            </div>
            <div className="bg-white rounded-xl p-4 shadow">
              <Bluetooth_info details={deviceData} />
            </div>
          </div>
        </div>

        {/* Side Actions */}
        <div className="w-full lg:w-1/5 space-y-4">
          <ActionButton
            text="Lock"
            icon={<LockKeyhole size={20} />}
            onClick={() => lockDevice(deviceData.device_id)}
            color="text-green-600"
          />
          {/* <ActionButton
            text="Delete"
            icon={<Trash2 size={20} />}
            onClick={() => toast.warn("Delete function not implemented")}
            color="text-red-600"
          /> */}
          <ActionButton
            text="Reboot"
            icon={<RefreshCcw size={20} />}
            onClick={() => rebootDevice(deviceData.device_id)}
            color="text-orange-500"
          />
          {/* <ActionButton
            text="Change Password"
            icon={<img src={changePwd} alt="Change" className="w-5 h-5" />}
            onClick={() => toast.info("Change Password feature coming soon")}
            color="text-blue-500"
          /> */}
        </div>
      </div>

      {/* Apps List */}
      <div className="p-6 space-y-8">
        <AppList
          title="Installed Applications"
          apps={Non_System_app_list}
          icon={androidLogo}
        />
        <AppList
          title="System Applications"
          apps={System_app_list}
          icon={systemAppLogo}
        />
        <ContentMangementOnDevice
         device_id={deviceData.device_id}
        />
      </div>
    </div>
  );
};

export default DeviceDetails;
