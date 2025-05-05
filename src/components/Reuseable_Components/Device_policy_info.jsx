import { Smartphone } from "lucide-react";

const Device_policy_info = () => {
  const hardwareData = [
    { label: "Manufacturer", value: "Samsung" },
    { label: "Model", value: "S21+" },
    { label: "RAM", value: "8 GB" },
    { label: "ROM", value: "64 GB" },
    { label: "CPU Architecture", value: "arm-v7" },
    { label: "Serial No.", value: "ST03HU200" },
  ];

  return (
    <div className="bg-white p-4 rounded-2xl max-w-md">
        <div className="flex gap-2 items-center justify-centers mb-3 ">
         <Smartphone size={20}/>   
        <h2 className="text-lg font-semibold">Device/Policy Info</h2>
        </div>
     
      <div className="space-y-2">
        {hardwareData.map((item, index) => (
          <div key={index} className="grid grid-cols-3 pb-1 gap-3 ">
            <span className="text-gray-600 col-span-1">{item.label}</span>
            <span className="font-medium col-span-2">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Device_policy_info;
