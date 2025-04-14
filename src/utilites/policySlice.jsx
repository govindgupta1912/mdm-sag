import { createSlice } from "@reduxjs/toolkit";
   
// const initialState = {
//     policyData: {
//       policyName: '',
//       disabledLocation: false,
//       disableFactoryReset: false,
//       disableMicrophone: false,
//       disableBluetooth: false,
//       disableKeyguard: false,
//       disableFingerprintUnlock: false,
//       disableScreenCapture: false,
//       disableCamera: false,
//       disableNotification: false,
//       disableDeveloperOption:false,
//       DisablewifiConfig: false,
//       DisableBluetoothConfig:false,
//       DisableCellBroadcastConfig:false,
//       DisableMobileNetworkConfig:false,
//       DisableDeveloperOption:false,



//       // Add more fields as needed
//     },
//   };

  const initialState = {
    policyData: {
      policyName: '',
  
      // --- SecurityTab ---
      disabledLocation: false,
      disableFactoryReset: false,
      disableMicrophone: false,
      disableBluetooth: false,
      disableCamera: false,
      disableNotification: false,
      disableKeyguard: false,
      disableFingerprintUnlock: false,
      disableScreenCapture: false,
      disableDeveloperOption: false,
      disableAppInstallFromUnknownSources: false,
      disableCameraOnLockScreen: false,
      disableUsbMediaMount: false,
      disableUsbDataTransfer: false,
      disableVoiceVideoCalling: false,
      disableSMS: false,
  
      // --- DeviceTab (new additions) ---
      disabledAddingUsers: false,
      disableModifyAccount: false,
      disableRemovingUsers: false,
      disableSettingWallpaper: false,
      disableVolumeAdjust: false,
  
      // --- NetworkTab ---
      disableWifiConfig: false,
      disableWifiDirect: false,
      disableBluetoothSharing: false,
      disableBluetoothConfig: false,
      disableMobileNetworkConfig: false,
      disableDataRoaming: false,
      disableHotspotConfig: false,
      disableNetworkReset: false,
      enforceVpnLockdown: false,
      disableVpnConfig: false,
  
      // --- AppTab ---
      disableAppUninstall: false,
      disableAppInstall: false,
  
      
    },
  };
  

const policySlice=createSlice({
    name:"policy",
    initialState: initialState,
    reducers:{
        setPolicyData:(state,action)=>{
         state.policyData = { ...state.policyData, ...action.payload };
        },
        resetPolicyData:(state,action)=>{
            state.policyData=initialState.policyData;
        }

    }
}
)

export const{setPolicyData,resetPolicyData}=policySlice.actions;
export default policySlice.reducer;
