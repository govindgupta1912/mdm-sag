import { Bluetooth } from "lucide-react";

const   BluetoothInfo = ({details}) => {

    const bluetoothData =[
      {label: "Bluetooth MAC", value: details?.bluetooth_info?.address || "N/A"},
      {label: "Bluetooth Name", value: details?.bluetooth_info?.name || "N/A"},
      {label: "Bluetooth State", value: details?.bluetooth_info?.state || "N/A"},
      {label: "Bluetooth Enabled", value: details?.bluetooth_info?.enabled || "N/A"},
    ]

    return(
        <div className="max-w-md mx-auto p-4 bg-white rounded-2xl">
            <div className="flex gap-2 items-center  mb-3">
                <Bluetooth size={20} />
                <h2 className="text-lg font-semibold "> Bluetooth Info</h2>
            </div>
            <div className="space-y-2">
              {
                bluetoothData.map((item,index)=>(
                   <div key={index} className="grid grid-cols-3 gap-4 border-b pb-1"> 
                    <span className="text-gray-600 col-span-1">{item.label}</span>
                    <span className="font-medium col-span-2">{item.value}</span>
                    </div>
                ))
              }
            </div>
        </div>
    )
}

export default BluetoothInfo;