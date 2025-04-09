// import React from "react";

// const HardwareInfo = () => {
//   const hardwareData = [
//     { label: "Manufacturer", value: "Samsung" },
//     { label: "Model", value: "S21+" },
//     { label: "RAM", value: "8 GB" },
//     { label: "ROM", value: "64 GB" },
//     { label: "CPU Architecture", value: "arm-v7" },
//     { label: "Serial No.", value: "ST03HU200" },
//   ];

// //   const HardwareData =[
// //       { label: "Manufackl
// // '
// // 
// // turer", value: details?.manufacturer || "N/A" },
// //       { label: "Model", value: details?.model || "N/A" },
// //       { label: "RAM", value: details?.total_ram || "N/A" },
// //       { label: "ROM", value: details?.total_storage || "N/A" },
// //       { label: "CPU Architecture", value: details?.cpu || "N/A" },
// //       { label: "Serial No.", value: details?.serial_no || "N/A" },
// //     ];

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg border border-gray-300">
//       <div className="flex items-center gap-2 mb-3 border-b pb-2">
//         <span className="text-gray-700 text-lg font-semibold">ℹ️ Hardware Info</span>
//       </div>
//       <div className="space-y-2">
//         {hardwareData.map((item, index) => (
//           <div key={index} className="flex justify-between text-sm border-b pb-1">
//             <span className="text-gray-500">{item.label}</span>
//             <span className="text-gray-800 font-medium">{item.value}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HardwareInfo;


import React from "react";

const HardwareInfo = ( {details}) => {
  // If details are not available, show a placeholder
  if (!details) {
    return <p className="text-gray-500">No data available</p>;
  }




  const hardwareData = [
    { label: "Serial No.", value: details.serial_no|| "N/A" },
    { label: "Manufacturer", value: details.manufacturer || "N/A" },
    { label: "Model", value: details.model || "N/A" },
    { label: "CPU Architecture", value: details.architecture || "N/A" },
    {label: "GPU", value: details.gpu || "N/A"},
    { label: "RAM", value: details.total_ram || "N/A" },
    { label: "ROM", value: details.total_storage || "N/A" },
    
   
  ];
  console.log("HARDWARE ===========>", details)

  return (
    <div className="max-w-md mx-auto p-4  rounded-2xl  bg-white">
      <h2 className="text-lg font-semibold mb-3">⚙️ Hardware Info</h2>
      <div className="space-y-2">
        {hardwareData.map((item, index) => (
          //<div key={index} className="flex justify-between border-b pb-1">
                     <div key={index} className="grid grid-cols-3 gap-2  border-b pb-1">
 
            <span className="text-gray-600 col-span-1">{item.label}</span>
            <span className="font-medium col-span-2">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HardwareInfo;
