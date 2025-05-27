import React from "react";

const SoftwareInfo = ({ details }) => {
  // If details are not available, show a placeholder
  if (!details) {
    return <p className="text-gray-500">No data available</p>;
  }

  const softwareData = [
    { label: "Android", value: details.android_version || "N/A" },
    { label: "API Level", value: details.api_level || "N/A" },
    { label: "Kernal Version", value: details.kernel_version|| "N/A" },
    { label: "Encryption Status", value: details.encryption_status || "N/A" },
    { label: "CPU Architecture", value: details.cpu || "N/A" },
    { label: "Serial No.", value: details.serial_no|| "N/A" },
  ];

  console.log('SOFTWARE ========>', details)

  return (
    <div className="max-w-md mx-auto p-4  rounded-2xl  bg-white ">
      <h2 className="text-lg font-semibold mb-3">💻 Software Info</h2>
      <div className="space-y-2">
        {softwareData.map((item, index) => (
          <div key={index} className="grid grid-cols-3 gap-2  border-b pb-1">
            <span className="text-gray-600 col-span-1">{item.label}</span>
            <span className="font-medium col-span-2">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoftwareInfo;
