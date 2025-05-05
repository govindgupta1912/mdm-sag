import { Lock, LockKeyhole, RefreshCcw, Trash2 } from "lucide-react";
import devices from "../assets/devices.png";
import changePwd from "../assets/changePwd.png";
import Device_policy_info from "./Reuseable_Components/Device_policy_info";
const DeviceDetails = () => {
  return (
    <div>
      <div className="flex justify-start p-4 bg-black items-center gap-4">
        <img src={devices} alt="" />
        <h1 className="text-white text-2xl font-bold">Device Details</h1>
      </div>
      <div className=" flex justify-around  ">
        <div className="  h-full p-8 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6  ">
            <Device_policy_info />
            <Device_policy_info />
          </div>
        </div>
        <div className="flex flex-col gap-3 p-8 mt-4">
          <button className="flex items-center justify-center gap-2 text-green-500 hover:text-green-800 px-10 py-2.5  w-60 h-14 bg-white">
            <LockKeyhole size={20} />
            Lock
          </button>

          <button className="flex items-center justify-center  gap-2 text-red-600 hover:text-red-800 px-10 py-2.5 w-60  h-14 bg-white">
            <Trash2 size={20} />
            Delete
          </button>
          <button className="flex items-center justify-center gap-2 text-orange-500 hover:text-orange-800 px-10 py-2.5  w-60 h-14 bg-white">
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
