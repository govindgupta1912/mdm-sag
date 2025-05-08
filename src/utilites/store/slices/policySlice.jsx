import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  policyData: {
    policyName: "",
    policyVersion: 1,

    data: {
      enterpriseLockScreenInfo: "Mobisec Technologies",
      kioskPolicy: {
        enabled: false,
        multiApp: false,
        enableSystemUI: false,
        enableSettings: false,
        allowedApps: [],
      },
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
        packageName: "",
      },
      wifiConfig: [
        {
          ssid: "mobisec_5G",
          password: "Cyber@2025",
          autoConnect: false,
        },
      ],
      applications: [],
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
