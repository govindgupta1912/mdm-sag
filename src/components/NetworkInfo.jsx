
const NetworkInfo = ({ details }) => {

    const NetworkData = [
        { label: "WiFi MAC", value: details.wifi_info.mac || "N/A" },
        { label: "SSID", value: details.wifi_info.ssid || "N/A" },
        {label: "BSSID", value: details.wifi_info.bssid || "N/A" },
        { label: "WiFi State", value: details.wifi_info.state || "N/A" },
        {label:"WiFi Enabled",value: details.wifi_info.enabled ||"N/A"},

    ]

    return (
        <div className="max-w-md mx-auto p-4 rounded-2xl">
            <h2 className="text-lg font-semibold mb-3">🌐 Network Info</h2>
            <div className="space-y-2">
                {
                    NetworkData.map((item, index) => (
                        <div key={index} className="grid grid-cols-3 gap-4 border-b pb-1">
                            <span className="text-gray-600 col-span-1">{item.label}</span>
                            <span className="font-medium col-span-2">{item.value}</span>
                        </div>
                    )
                    )
                }
            </div>
        </div>
    )
}

export default NetworkInfo;