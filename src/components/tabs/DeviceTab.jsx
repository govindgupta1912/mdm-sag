import { useDispatch, useSelector } from "react-redux";
import ToggleItems from "../ToggleItem";
import { setPolicyData } from "@/utilites/policySlice";


const DeviceTab = ({ policyData, setPolicyData }) => {

    
     const handelToogle=(key,val)=>{

        setPolicyData(prev => ({
          ...prev,
          [key]: val
        }));
     }

     

     return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-[#1A73E8] mb-2">Basic Security Restrictions</h3>
        <ToggleItems 
        title="Disable Adding Users"
        description="Prevent adding new users and profiles"
        value={policyData.disabledAddingUsers}
        //onChange={(val) => setPolicyData({ ...policyData, disabledLocation: val })}
        onChange={(val) => handelToogle("disabledAddingUsers",val)}
         />
        <ToggleItems 
        title="Disable Modify Account" 
        description="Prevents adding or removing accounts" 
        value={policyData.disableModifyAccount}
        //onChange={(val) => setPolicyData({ ...policyData, disableFactoryReset: val })}
        onChange={(val) => handelToogle("disableModifyAccount",val)}
        />
        <ToggleItems 
        title="Disable Removing Users" 
        description="Prevents removing other users" 
        value={policyData.disableRemovingUsers}
        //onChange={(val) => setPolicyData({ ...policyData, disableMicrophone: val })}
        onChange={(val) => handelToogle("disableRemovingUsers",val)}
        />
        <ToggleItems 
        title="Disable Setting Wallpaper" 
        description="Prevents wallpaper change."
        value={policyData.disableSettingWallpaper}
        //onChange={(val) => setPolicyData({ ...policyData, disableBluetooth: val })}
        onChange={(val) => handelToogle("disableSettingWallpaper",val)}
        />
        <ToggleItems
         title="Disable Volume Adjustment"
          description="Prevents master volume adjustment."
          value={policyData.disableVolumeAdjust}
        //onChange={(val) => setPolicyData({ ...policyData, disableKeyguard: val })}
        onChange={(val) => handelToogle("disableVolumeAdjust",val)}
         />
       
      </div>
  
      
    </div>
     )
    };

  export default DeviceTab;