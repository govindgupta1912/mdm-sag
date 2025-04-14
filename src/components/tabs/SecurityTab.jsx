import { useDispatch, useSelector } from "react-redux";
import ToggleItems from "../ToggleItem";
import { setPolicyData } from "@/utilites/policySlice";


const SecurityTab = ({policyData,setPolicyData}) => {

    //  const dispatch=useDispatch()

    //  const policyData=useSelector((state)=>state.policy.policyData)
    
    //  const handelToogle=(key,val)=>{

    //     dispatch(setPolicyData({[key]:val}))
    //  }

     

     return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-[#1A73E8] mb-2">Basic Security Restrictions</h3>
        <ToggleItems 
        title="Disable location sharing"
        description="This is a test for the policy feature title details description"
        value={policyData.disabledLocation}
        onChange={(val) => setPolicyData({ ...policyData, disabledLocation: val })}
        //onChange={(val) => handelToogle("disabledLocation",val)}
         />
        <ToggleItems 
        title="Disable factory reset" 
        description="This is a test for the policy feature title details description" 
        value={policyData.disableFactoryReset}
        onChange={(val) => setPolicyData({ ...policyData, disableFactoryReset: val })}
        //onChange={(val) => handelToogle("disableFactoryReset",val)}
        />
        <ToggleItems 
        title="Disable microphone" 
        description="This is a test for the policy feature title details" 
        value={policyData.disableMicrophone}
        onChange={(val) => setPolicyData({ ...policyData, disableMicrophone: val })}
        //onChange={(val) => handelToogle("disableMicrophone",val)}
        />
        <ToggleItems 
        title="Disable bluetooth" 
        description="This is a test for the policy feature title details"
        value={policyData.disableBluetooth}
        onChange={(val) => setPolicyData({ ...policyData, disableBluetooth: val })}
        //onChange={(val) => handelToogle("disableBluetooth",val)}
        />
         <ToggleItems 
        title="Disable Camera"
         description="Disable camera for all apps"
         value={policyData.disableCamera}
        onChange={(val) => setPolicyData({ ...policyData, disableCamera: val })}
        //onChange={(val) => handelToogle("disableCamera",val)}
         />
         <ToggleItems 
        title="Disable Notification"
         description="Disable Notification on Lock Screen in Application"
         value={policyData.disableNotification}
        onChange={(val) => setPolicyData({ ...policyData,  disableNotification: val })}
        //onChange={(val) => handelToogle("disableCamera",val)}
         />
      </div>
  
      <div>
        <h3 className="text-base font-semibold text-[#1A73E8] mb-2">Critical Security Restrictions</h3>
        <ToggleItems
         title="Disable keyguard"
          description="This is a test for the policy feature title details"
          value={policyData.disableKeyguard}
          onChange={(val) => setPolicyData({ ...policyData, disableKeyguard: val })}
        //onChange={(val) => handelToogle("disableKeyguard",val)}
         />
        <ToggleItems 
        title="Disable fingerprint unlock" 
        description="This is a test for the policy feature title details"
        value={policyData.disableFingerprintUnlock}
         onChange={(val) => setPolicyData({ ...policyData, disableFingerprintUnlock: val })} 
         //onChange={(val) => handelToogle("disableFingerprintUnlock",val)}
         />
        <ToggleItems 
        title="Disable screen capture" 
        description="This disables screen recording and taking screenshot." 
        value={policyData.disableScreenCapture}
        onChange={(val) => setPolicyData({ ...policyData, disableScreenCapture: val })}
        //onChange={(val) => handelToogle("disableScreenCapture",val)}
        />
       
         <ToggleItems 
        title="Disable Developer Options"
         description="Disable Developer Mode in Application"
         value={policyData.disableDeveloperOption}
        onChange={(val) => setPolicyData({ ...policyData,  disableDeveloperOption: val })}
        //onChange={(val) => handelToogle("disableCamera",val)}
         />
         <ToggleItems 
        title="Disable Installations of Apps from Unknown Sources"
         description="Disable Developer Mode in Application"
         value={policyData.disableAppInstallFromUnknownSources}
        onChange={(val) => setPolicyData({ ...policyData,  disableAppInstallFromUnknownSources: val })}
        //onChange={(val) => handelToogle("disableCamera",val)}
         />
        
          <ToggleItems 
        title="Disable Camera on Lock Screen"
         description="Disable Camera on Lock Screen in Application"
         value={policyData.disableCameraOnLockScreen}
        onChange={(val) => setPolicyData({ ...policyData,  disableCameraOnLockScreen: val })}
        //onChange={(val) => handelToogle("disableCamera",val)}
         />



        

        <ToggleItems 
          title=" Disable USB media mounting"
          description="Allow/Block Mounting External Media Through USB"
          value={policyData.disableUsbMediaMount}
          onChange={(val) => setPolicyData({ ...policyData, disableUsbMediaMount: val })}
        />

        <ToggleItems 
          title="Disable USB data transfer"
          description="Allow/Block Data Transfer Over USB Connection"
          value={policyData.disableUsbDataTransfer}
          onChange={(val) => setPolicyData({ ...policyData, disableUsbDataTransfer: val })}
        />

        <ToggleItems 
          title=" Disable voice and video calling"
          description="Allow/Block Voice/Video Calling (from all apps)"
          value={policyData.disableVoiceVideoCalling}
          onChange={(val) => setPolicyData({ ...policyData, disableVoiceVideoCalling: val })}
        />

        <ToggleItems 
          title="Disable SMS"
          description="Allow/Block SMS functionality"
          value={policyData.disableSMS}
          onChange={(val) => setPolicyData({ ...policyData, disableSMS: val })}
        />
         
         

      </div>
    </div>
     )
    };

  export default SecurityTab;