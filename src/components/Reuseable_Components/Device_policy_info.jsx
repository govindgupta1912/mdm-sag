import { Smartphone } from "lucide-react";

const Device_policy_info = ({details}) => {
  const hardwareData = [
    { label: "Device ID", value: details?.device_id || "N/A" },
    { label: "Device Name", value: details?.device_name || "N/A" },
    { label: "Policy Name", value: details?.policy_name || "N/A" },
    { label: "Policy Version", value: details?.policy_version || "N/A" },
    {label: "Policy ID",value: details?.policy_id || "N/A"},
    { label: "Last Synced", value: details?.last_synced || "N/A" },

  ];

  return (
    <div className="bg-white p-4 rounded-2xl max-w-md">
        <div className="flex gap-2 items-center justify-centers mb-3 ">
         <Smartphone size={20}/>   
        <h2 className="text-lg font-semibold">Device/Policy Info</h2>
        </div>
     
      <div className="space-y-2">
        {hardwareData.map((item, index) => (
          <div key={index} className="grid grid-cols-3 pb-1 border-b gap-3 ">
            <span className="text-gray-600 col-span-1">{item.label}</span>
            <span className="font-medium col-span-2">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Device_policy_info;
