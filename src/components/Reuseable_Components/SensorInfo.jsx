import React from 'react'

const SensorInfo = ({details}) => {
  console.log("sensor Data111 ",details?.camera);
  console.log("sensor Data222 ", details.camera)
    const sensorData = [
        { label: "Camera", value: details.camera || "N/A" },
        { label: "Microphone", value: details.microphone  || "N/A" },
        { label: "FingerPrint", value: details.fingerprint || "N/A" },
        { label: "GPS", value: details.gps || "N/A" },
        { label: "Accelerometer", value: details.accelerometer || "N/A" },
        { label: "Magnetometer", value: details.magnetometer|| "N/A" },
        { label: "Gyroscope", value: details.gyroscope|| "N/A" },
        { label: "Proximity", value: details.proximity|| "N/A" },


        
      ];
    
      return (
        <div className="max-w-md mx-auto p-4  rounded-2xl  bg-white">
          <h2 className="text-lg font-semibold mb-3">📡 Sensor Availability</h2>
          <div className="space-y-2">
            {sensorData.map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 border-b pb-1">
                <span className="text-gray-600 col-span-1">{item.label}</span>
                <span className="font-medium col-span-2">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      );
}

export default SensorInfo