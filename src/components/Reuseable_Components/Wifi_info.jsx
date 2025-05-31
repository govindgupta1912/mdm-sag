import { Wifi } from "lucide-react";

  const wifiInfo = ({details}) => {  

     const wifiData = [
      { label: "SSID", value: details?.wifi_info?.ssid || "N/A" },
      // { label: "Signal Strength", value: details?.wifi_info?.signal_strength || "N/A" },
      // { label: "Security Type", value: details?.wifi_info?.security_type || "N/A" },
      { label: "BSSID", value: details?.wifi_info?.bssid || "N/A" },
      { label: "WiFi State", value: details?.wifi_info?.state || "N/A" },
      { label: "WiFi Enabled", value: details?.wifi_info?.enabled || "N/A" },]

    return (
      <div className="max-w-md mx-auto p-4 bg-white  rounded-lg">
        <div className="flex gap-2 items-center mb-3">
             <Wifi size={20} />
            <h2 className="text-lg font-semibold "> WiFi Info</h2>
        </div>
        <div className="space-y-2">
          {wifiData.map((item, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 border-b pb-1">
              <span className="text-gray-600 col-span-1">{item.label}</span>
              <span className="font-medium col-span-2">{item.value}</span>
            </div>
          ))}
      </div>
        </div>
    );
  }

  
    export default wifiInfo;
  