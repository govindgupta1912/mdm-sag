import ToggleItems from "../Reuseable_Components/ToggleItem";



const NetworkTab=({policyData,setPolicyData})=>{
  
    // const Networkoption=[
    //     {
    //         title:"Disable WIFI Config",
    //         description:"Prevent configuring Wi-Fi access points.",
    //         key:"DisablewifiConfig"
    //     },
    //     {
    //         title:"Disable Bluetooth",
    //         description:"Prevents bluetooth use..",
    //         key:"DisableBluetooth"
    //     },
    //     {
    //         title:"Disable Bluetooth Config",
    //         description:"Prevents configuring bluetooth.",
    //         key:"DisableBluetoothConfig"
    //     },
    //     {
    //         title:"Disable Cell Broadcast Config",
    //         description:"Prevents configuring cell broadcast",
    //         key:"DisableCellBroadcastConfig"
    //     },
    //     {
    //         title:"Disable Mobile Network Config",
    //         description:"Prevents configuring mobile networks.",
    //         key:"DisableMobileNetworkConfig"
    //     },
        
        
    // ]

    // const NetworkOptions = [
    //     {
    //       title: "Disable Wi-Fi Configuration",
    //       description: "Prevent users from configuring Wi-Fi access points.",
    //       key: "disableWifiConfig",
    //     },
    //     {
    //       title: "Disable Wi-Fi Direct",
    //       description: "Prevent peer-to-peer connections using Wi-Fi Direct.",
    //       key: "disableWifiDirect",
    //     },
    //     {
    //       title: "Disable Bluetooth Sharing",
    //       description: "Prevent sharing files over Bluetooth.",
    //       key: "disableBluetoothSharing",
    //     },
    //     {
    //       title: "Disable Bluetooth Configuration",
    //       description: "Prevent configuring Bluetooth settings.",
    //       key: "disableBluetoothConfig",
    //     },
    //     {
    //       title: "Disable Mobile Network Configuration",
    //       description: "Prevent users from configuring mobile network settings.",
    //       key: "disableMobileNetworkConfig",
    //     },
    //     {
    //       title: "Disable Data Roaming",
    //       description: "Prevent enabling data roaming on the device.",
    //       key: "disableDataRoaming",
    //     },
    //     {
    //       title: "Disable Hotspot Configuration",
    //       description: "Prevent users from configuring mobile hotspot settings.",
    //       key: "disableHotspotConfig",
    //     },
    //     {
    //       title: "Disable Network Reset",
    //       description: "Prevent users from resetting network settings.",
    //       key: "disableNetworkReset",
    //     },
    //     {
    //       title: "Enforce VPN Lockdown",
    //       description: "Ensure all network traffic is routed through VPN.",
    //       key: "enforceVpnLockdown",
    //     },
    //     {
    //       title: "Disable VPN Configuration",
    //       description: "Prevent users from adding or modifying VPN profiles.",
    //       key: "disableVpnConfig",
    //     },
    //   ];

      const NetworkOptions = [
        {
          title: "Disable Wi-Fi Configuration",
          description: "Prevent users from configuring Wi-Fi access points.",
          key: "wifiConfigDisabled",
          section: "restrictions",
        },
        {
          title: "Disable Wi-Fi Direct",
          description: "Prevent peer-to-peer connections using Wi-Fi Direct.",
          key: "wifiDirectDisabled",
          section: "restrictions",
        },
        {
          title: "Disable Bluetooth Sharing",
          description: "Prevent sharing files over Bluetooth.",
          key: "bluetoothSharingDisabled",
          section: "restrictions",
        },
        {
          title: "Disable Bluetooth Configuration",
          description: "Prevent configuring Bluetooth settings.",
          key: "bluetoothConfigDisabled",
          section: "restrictions",
        },
        {
          title: "Disable Mobile Network Configuration",
          description: "Prevent users from configuring mobile network settings.",
          key: "mobileNetworksConfigDisabled",
          section: "restrictions",
        },
        {
          title: "Disable Data Roaming",
          description: "Prevent enabling data roaming on the device.",
          key: "dataRoamingDisabled",
          section: "restrictions",
        },
        {
          title: "Disable Hotspot Configuration",
          description: "Prevent users from configuring mobile hotspot settings.",
          key: "tetheringConfigDisabled",
          section: "restrictions",
        },
        {
          title: "Disable VPN Configuration",
          description: "Prevent users from adding or modifying VPN profiles.",
          key: "vpnConfigDisabled",
          section: "restrictions",
        },
        {
          title: "Enforce VPN Lockdown",
          description: "Ensure all network traffic is routed through VPN.",
          key: "lockdownEnabled",
          section: "vpnConfig",
        },
      ]

      return (
        <div>
          {NetworkOptions.map(({ title, description, key, section }) => (
            <ToggleItems
              key={key}
              title={title}
              description={description}
              value={policyData[section]?.[key] || false}
              onChange={(val) =>
                setPolicyData({
                  ...policyData,
                  [section]: {
                    ...policyData[section],
                    [key]: val,
                  },
                })
              }
            />
          ))}
        </div>
      );
}

export default NetworkTab;