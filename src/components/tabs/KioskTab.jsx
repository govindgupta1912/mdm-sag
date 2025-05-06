import ToggleItems from "../Reuseable_Components/ToggleItem";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

const KioskTab=({ policyData, setPolicyData })=>{


    const handleSingleAppSelect = (val) => {
        setPolicyData({
          ...policyData,
          kioskPolicy: {
            ...policyData.kioskPolicy,
            allowedApps: [val], // Wrap the selected value in an array
            multiApp: false,  // Turn off multiApp to ensure mutual exclusivity
            enabled : true,
          },
        });
      };

    return(
        <div>
         <ToggleItems
          title="Enable Multi App KIOSK"
          description="Enables a KIOSK with multiple Apps"
          value={policyData.kioskPolicy.multiApp}

            onChange={(val)=>(
                setPolicyData({ 
                ...policyData,
                kioskPolicy:{
                ...policyData.kioskPolicy,
                multiApp:val,
                enabled :false,
                allowedApps: val ? [] : policyData.kioskPolicy.allowedApps,
                }

            }))}
          
        />

        <div className="flex items-center justify-between ">
            <div>
                <h1 className="font-semibold">Single App Kiosk</h1>
                <h2 className="text-sm text-gray-500">Select an app to install in KIOSK Mode.</h2>
            </div>
        <Select
         value={policyData.kioskPolicy. allowedApps[0] || ""}
         onValueChange={handleSingleAppSelect}
        >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a App" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Apps</SelectLabel>
          <SelectItem value="Whatshap">Whatshap</SelectItem>
          <SelectItem value="Facebook">Facebook</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

        </div>

        </div>
    )
}

export default KioskTab;