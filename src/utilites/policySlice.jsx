import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // policyData: {
  //   policyName: '',

  //   // --- SecurityTab ---
  //   disabledLocation: false,
  //   disableFactoryReset: false,
  //   disableMicrophone: false,
  //   disableBluetooth: false,
  //  // disableCamera: false,  dmp
  //  // disableNotification: false, dmp
  //  // disableKeyguard: false, dmp
  //  // disableFingerprintUnlock: false, dmp
  //  // disableScreenCapture: false, dmp
  //  // disableDeveloperOption: false,
  //   disableAppInstallFromUnknownSources: false,
  //  // disableCameraOnLockScreen: false,
  //   disableUsbMediaMount: false,
  //   disableUsbDataTransfer: false,
  //   disableVoiceVideoCalling: false,
  //   disableSMS: false,

  //   // --- DeviceTab ---
  //   disabledAddingUsers: false,
  //   disableModifyAccount: false,
  //   disableRemovingUsers: false,
  //   disableSettingWallpaper: false,
  //   disableVolumeAdjust: false,

  //   // --- NetworkTab ---
  //   disableWifiConfig: false,
  //   disableWifiDirect: false,
  //   disableBluetoothSharing: false,
  //   disableBluetoothConfig: false,
  //   disableMobileNetworkConfig: false,
  //   disableDataRoaming: false,
  //   //disableHotspotConfig: false,
  //   //disableNetworkReset: false,
  //   //enforceVpnLockdown: false,
  //   disableVpnConfig: false,

  //   // --- AppTab ---
  //   disableAppUninstall: false,
  //   disableAppInstall: false,

  //   // --- Password Policy ---
  //   minimumPasswordLength: 6,
  //   passwordComplexity: "numeric",
  //   passwordHistroyLength: 3,
  //   passwordMinimumUppercase: 1,
  //   passwordMinimumSymbol: 1,
  //   passwordFailedAttempts: 5,
  // }

  policyData: {
    policyId: "f0906574-60ad-4a70-9dcb-5b0eb1db21ca",
    policyName: "Initial Policy",
    policyVersion: 1,
    enterpriseLockScreenInfo: "Mobisec Technologies",

    restrictions: {
      locationSharingDisabled: false,
      factoryResetDisabled: false,
      unmuteMicrophoneDisabled: false,
      bluetoothDisabled: false,
      debuggingFeaturesAllowed: true,
      installUnknownSourcesAllowed: true,
      mountPhysicalMediaDisabled: false,
      usbFileTransferDisabled: false,
      smsDisabled: false,
      addUserDisabled: false,
      modifyAccountsDisabled: false,
      removeUserDisabled: false,
      setWallpaperDisabled: false,
      adjustVolumeDisabled: false,
      wifiConfigDisabled: false,
      wifiDirectDisabled: false,
      bluetoothSharingDisabled: false,
      bluetoothConfigDisabled: false,
      mobileNetworksConfigDisabled: false,
      dataRoamingDisabled: false,
      wifiTetheringDisabled: false,
      tetheringConfigDisabled: false,
      vpnConfigDisabled: false,
      installAppsDisabled: false,
      uninstallAppsDisabled: false,
    },
    dpmConfig: {
      keyguardDisabled: false,
      keyguradFingerprintDisabled: false,
      keyguradNotificationDisabled: false,
      screenCaptureDisabled: false,
      cameraDisabled: false,
    },

    passwordPolicy: {
      passwordMinimumLength: 8,
      passwordQuality: "ALPHANUMERIC",
      passwordHistoryLength: 5,
      maximumFailedPasswordsForWipe: 6,
    },

    controlConfig: {
      
      disableCallingApps: false,
      enableSystemUpdateDelay: false,
    },
    vpnConfig: {
      lockdownEnabled: false,
    },
  },
};

const policySlice = createSlice({
  name: "policy",
  initialState: initialState,
  reducers: {
    setPolicyData: (state, action) => {
      state.policyData = { ...state.policyData, ...action.payload };
    },
    resetPolicyData: (state, action) => {
      state.policyData = initialState.policyData;
    },
  },
});

export const { setPolicyData, resetPolicyData } = policySlice.actions;
export default policySlice.reducer;
