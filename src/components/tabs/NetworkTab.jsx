import { ChevronDown, ChevronUp } from "lucide-react";
import ToggleItems from "../Reuseable_Components/ToggleItem";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { useState } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";

const NetworkTab = ({ policyData, setPolicyData }) => {
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

  const [open, setOpen] = useState(false);
  // const [wifiConfig, setWififConfig] = useState([
  //   {
  //     ssid: "",
  //     password: "",
  //     autoConnect: false,
  //     hiddenNetwork: false,
  //     securityType: "none",
  //   },
  // ]);
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
  ];

  const updateNestedPolicy = (section, key, value) => {
    setPolicyData({
      ...policyData,
      data: {
        ...policyData.data,
        [section]: {
          ...policyData.data[section],
          [key]: value,
        },
      },
    });
  };

  const handleAddWifiConfig = () => {
    const newConfig = {
      ssid: "",
      password: "",
      autoConnect: false,
      hiddenNetwork: false,
      securityType: "none",
    };
   
    setPolicyData({
      ...policyData,
      data: {
        ...policyData.data,
        wifiConfig: [...policyData.data.wifiConfig, newConfig],
      },
    });
  }

  const handelRemoveWifiConfig = (index) => {
    const updatedWifiConfig = policyData.data.wifiConfig.filter(
      (item, i) => i !== index
    );
    setPolicyData({
      ...policyData,
      data: {
        ...policyData.data,
        wifiConfig: updatedWifiConfig,
      },
    });
  }

  // const handleWifiConfigChange = (index, field, value) => {
  //   const updatedWifiConfig = [...policyData.data.wifiConfig];
  //   updatedWifiConfig[index][field] = value;
  //   setPolicyData({
  //     ...policyData,
  //     data: {
  //       ...policyData.data,
  //       wifiConfig: updatedWifiConfig,
  //     },
  //   });
  // }

  const handleWifiConfigChange = (index, field, value) => {
  const updatedWifiConfig = [...policyData.data.wifiConfig];

  // Shallow copy the specific wifi config object before editing
  const updatedEntry = {
    ...updatedWifiConfig[index],
    [field]: value,
  };

  updatedWifiConfig[index] = updatedEntry;

  setPolicyData({
    ...policyData,
    data: {
      ...policyData.data,
      wifiConfig: updatedWifiConfig,
    },
  });
};


  return (
    <div>
      {NetworkOptions.map(({ title, description, key, section }) => (
        <ToggleItems
          key={key}
          title={title}
          description={description}
          value={policyData.data?.[section]?.[key] || false}
          onChange={(val) => updateNestedPolicy(section, key, val)}
        />
      ))}

      {/* <Card>
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between font-bold text-lg"
            >
              Password Policy Settings
              {open ? (
                <ChevronUp className="ml-2" />
              ) : (
                <ChevronDown className="ml-2" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <div className="flex flex-col gap-4">
                {policyData.data.wifiConfig.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <Label>SSID</Label>
                    <Input
                      placeholder="Enter SSID"
                      type="text"
                      value={ item.ssid}
                     
                      onChange={(e) => handleWifiConfigChange(index, 'ssid', e.target.value)}
                    
                    />
                    <Label>Password</Label>
                    <Input
                      placeholder="Enter Password"
                      type="password"
                      value={item.password}
                      
                      onChange={(e) => handleWifiConfigChange(index, 'password', e.target.value)}
                    />
                    <div>
                      <Label className="text-sm mb-1 block text-gray-700">
                        Security
                      </Label>
                      <Select
                        defaultValue={item.securityType}
                        
                        onValueChange={(value) => handleWifiConfigChange(index, 'securityType', value)}
                        value={item.securityType}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Security Protocol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select Security Protocol</SelectLabel>
                            <SelectItem value="WEP-PSK">WEP-PSK</SelectItem>
                            <SelectItem value="WPA/WPA2-PSK">
                              WPA/WPA2-PSK
                            </SelectItem>
                            <SelectItem value="None">None</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Switch 
                        checked={item.autoConnect}
                      
                      onCheckedChange={(checked) => handleWifiConfigChange(index, 'autoConnect', checked)}
                      />
                      <Label className="text-sm mb-1 block text-gray-700">
                        Auto Connect
                      </Label>
                    </div>
                    <div>
                      <Switch
                        checked={item.hiddenNetwork}
                        
                        onCheckedChange={(checked) => handleWifiConfigChange(index, 'hiddenNetwork', checked)}
                      />
                      <Label className="text-sm mb-1 block text-gray-700">
                        hidden Network
                      </Label>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handelRemoveWifiConfig(index)}
                        className="w-full"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="mt-4 flex justify-start">
                  <Button
                    onClick={handleAddWifiConfig}
                    variant="outline"
                    className="text-[#03A9FC] border-[#03A9FC] hover:bg-[#03A9FC] hover:text-white transition"
                  >
                    + Add Wifi Configuration
                  </Button>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card> */}

      {/* Wi-Fi Configuration Section */}
    <Card className="mt-10 max-h-[400px] overflow-y-auto">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between font-semibold text-base"
          >
            Wi-Fi Configuration Settings
            {open ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-6">
            {policyData.data.wifiConfig.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 shadow-sm space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label
                    
                    >SSID</Label>
                    <Input
                      placeholder="Enter SSID"
                      type="text"
                      value={item.ssid}
                      onChange={(e) =>
                        handleWifiConfigChange(index, "ssid", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label>Password</Label>
                    <Input
                      placeholder="Enter Password"
                      type="password"
                      value={item.password}
                      onChange={(e) =>
                        handleWifiConfigChange(index, "password", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label>Security</Label>
                    <Select
                      value={item.securityType}
                      onValueChange={(value) =>
                        handleWifiConfigChange(index, "securityType", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Security Protocol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="WEP-PSK">WEP-PSK</SelectItem>
                          <SelectItem value="WPA/WPA2-PSK">WPA/WPA2-PSK</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={item.autoConnect}
                      onCheckedChange={(checked) =>
                        handleWifiConfigChange(index, "autoConnect", checked)
                      }
                    />
                    <Label>Auto Connect</Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Switch
                      checked={item.hiddenNetwork}
                      onCheckedChange={(checked) =>
                        handleWifiConfigChange(index, "hiddenNetwork", checked)
                      }
                    />
                    <Label>Hidden Network</Label>
                  </div>
                </div>
                </div>

               

                <div className="flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handelRemoveWifiConfig(index)}
                    className="w-full md:w-auto"
                  >
                    Remove Configuration
                  </Button>
                </div>
              </div>
            ))}

            <div className="flex justify-start">
              <Button
                onClick={handleAddWifiConfig}
                variant="outline"
                className="text-[#03A9FC] border-[#03A9FC] hover:bg-[#03A9FC] hover:text-white transition"
              >
                + Add Wi-Fi Configuration
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
    </div>
  );
};

export default NetworkTab;
