import { useDispatch, useSelector } from "react-redux";
import ToggleItems from "../Reuseable_Components/ToggleItem";
import { setPolicyData } from "@/utilites/store/slices/policySlice";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// const SecurityTab = ({ policyData, setPolicyData }) => {

//   const [open, setOpen] = useState(false);

//   return (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-base font-semibold text-[#1A73E8] mb-2">
//           Basic Security Restrictions
//         </h3>
//         <ToggleItems
//           title="Disable location sharing"
//           description="This is a test for the policy feature title details description"
//           value={policyData.disabledLocation}
//           onChange={(val) =>
//             setPolicyData({ ...policyData, disabledLocation: val })
//           }
//           //onChange={(val) => handelToogle("disabledLocation",val)}
//         />
//         <ToggleItems
//           title="Disable factory reset"
//           description="This is a test for the policy feature title details description"
//           value={policyData.disableFactoryReset}
//           onChange={(val) =>
//             setPolicyData({ ...policyData, disableFactoryReset: val })
//           }
//           //onChange={(val) => handelToogle("disableFactoryReset",val)}
//         />
//         <ToggleItems
//           title="Disable microphone"
//           description="This is a test for the policy feature title details"
//           value={policyData.disableMicrophone}
//           onChange={(val) =>
//             setPolicyData({ ...policyData, disableMicrophone: val })
//           }
//           //onChange={(val) => handelToogle("disableMicrophone",val)}
//         />
//         <ToggleItems
//           title="Disable bluetooth"
//           description="This is a test for the policy feature title details"
//           value={policyData.disableBluetooth}
//           onChange={(val) =>
//             setPolicyData({ ...policyData, disableBluetooth: val })
//           }
//           //onChange={(val) => handelToogle("disableBluetooth",val)}
//         />
//         <ToggleItems
//           title="Disable Camera"
//           description="Disable camera for all apps"
//           value={policyData.disableCamera}
//           onChange={(val) =>
//             setPolicyData({ ...policyData, disableCamera: val })
//           }
//           //onChange={(val) => handelToogle("disableCamera",val)}
//         />
//         <ToggleItems
//           title="Disable Notification"
//           description="Disable Notification on Lock Screen in Application"
//           value={policyData.disableNotification}
//           onChange={(val) =>
//             setPolicyData({ ...policyData, disableNotification: val })
//           }
//           //onChange={(val) => handelToogle("disableCamera",val)}
//         />
//       </div>

//       <div>
//         <h3 className="text-base font-semibold text-[#1A73E8] mb-2">
//           Critical Security Restrictions
//         </h3>
//         <ToggleItems
//           title="Disable keyguard"
//           description="This is a test for the policy feature title details"
//           value={policyData.disableKeyguard}
//           onChange={(val) =>
//             setPolicyData({ ...policyData, disableKeyguard: val })
//           }
//           //onChange={(val) => handelToogle("disableKeyguard",val)}
//         />
//         <ToggleItems
//           title="Disable fingerprint unlock"
//           description="This is a test for the policy feature title details"
//           value={policyData.disableFingerprintUnlock}
//           onChange={(val) =>
//             setPolicyData({ ...policyData, disableFingerprintUnlock: val })
//           }
//           //onChange={(val) => handelToogle("disableFingerprintUnlock",val)}
//         />
//         <ToggleItems
//           title="Disable screen capture"
//           description="This disables screen recording and taking screenshot."
//           value={policyData.disableScreenCapture}
//           onChange={(val) =>
//             setPolicyData({ ...policyData, disableScreenCapture: val })
//           }
//           //onChange={(val) => handelToogle("disableScreenCapture",val)}
//         />

//         <ToggleItems
//           title="Disable Developer Options"
//           description="Disable Developer Mode in Application"
//           value={policyData.disableDeveloperOption}
//           onChange={(val) =>
//             setPolicyData({ ...policyData, disableDeveloperOption: val })
//           }
//           //onChange={(val) => handelToogle("disableCamera",val)}
//         />
//         <ToggleItems
//           title="Disable Installations of Apps from Unknown Sources"
//           description="Disable Developer Mode in Application"
//           value={policyData.disableAppInstallFromUnknownSources}
//           onChange={(val) =>
//             setPolicyData({
//               ...policyData,
//               disableAppInstallFromUnknownSources: val,
//             })
//           }
//           //onChange={(val) => handelToogle("disableCamera",val)}
//         />

//         <ToggleItems
//           title="Disable Camera on Lock Screen"
//           description="Disable Camera on Lock Screen in Application"
//           value={policyData.disableCameraOnLockScreen}
//           onChange={(val) =>
//             setPolicyData({ ...policyData, disableCameraOnLockScreen: val })
//           }
//           //onChange={(val) => handelToogle("disableCamera",val)}
//         />

//         <ToggleItems
//           title=" Disable USB media mounting"
//           description="Allow/Block Mounting External Media Through USB"
//           value={policyData.disableUsbMediaMount}
//           onChange={(val) =>
//             setPolicyData({ ...policyData, disableUsbMediaMount: val })
//           }
//         />

//         <ToggleItems
//           title="Disable USB data transfer"
//           description="Allow/Block Data Transfer Over USB Connection"
//           value={policyData.disableUsbDataTransfer}
//           onChange={(val) =>
//             setPolicyData({ ...policyData, disableUsbDataTransfer: val })
//           }
//         />

//         <ToggleItems
//           title=" Disable voice and video calling"
//           description="Allow/Block Voice/Video Calling (from all apps)"
//           value={policyData.disableVoiceVideoCalling}
//           onChange={(val) =>
//             setPolicyData({ ...policyData, disableVoiceVideoCalling: val })
//           }
//         />

//         <ToggleItems
//           title="Disable SMS"
//           description="Allow/Block SMS functionality"
//           value={policyData.disableSMS}
//           onChange={(val) => setPolicyData({ ...policyData, disableSMS: val })}
//         />
//       </div>

//       {/* Password Policy Settings */}
//       <Card className="w-full p-4 shadow-md rounded-2xl">
//         <Collapsible open={open} onOpenChange={setOpen}>
//           <CollapsibleTrigger asChild>
//             <Button variant="outline" className="w-full justify-between font-bold text-lg">
//               Password Policy Settings
//               {open ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
//             </Button>
//           </CollapsibleTrigger>

//           <CollapsibleContent className="mt-4">
//             <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block mb-1 text-sm font-medium">Minimum Password Length</label>
//                 <Input
//                   type="number"
//                   min={0}
//                   value={policyData.minimumPasswordLength}
//                   onChange={(e) => setPolicyData({ ...policyData, minimumPasswordLength: Math.max(0, Number(e.target.value)) })}
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 text-sm font-medium">Password Complexity</label>
//                 <Select
//                 value={policyData.passwordComplexity}
//                  onValueChange={(val) =>  setPolicyData({ ...policyData, passwordComplexity: val })}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select complexity" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="numeric">Numeric</SelectItem>
//                     <SelectItem value="alphanumeric">Alphanumeric</SelectItem>
//                     <SelectItem value="alphabetic">Alphabetic</SelectItem>
//                     <SelectItem value="complex">Complex (symbols + cases)</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div>
//                 <label className="block mb-1 text-sm font-medium">Password History Length</label>
//                 <Input
//                   type="number"
//                   min={0}
//                   value={policyData.passwordHistroyLength}
//                   onChange={(e) => setPolicyData({ ...policyData, passwordHistroyLength: Number(e.target.value) })}
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 text-sm font-medium">Password Failed Attempts to wipe</label>
//                 <Input
//                   type="number"
//                   min={0}
//                   value={policyData.passwordFailedAttempts}
//                   onChange={(e) => setPolicyData({ ...policyData, passwordFailedAttempts: Math.max(0, Number(e.target.value)) })}
//                 />
//               </div>
//             </CardContent>
//           </CollapsibleContent>
//         </Collapsible>
//       </Card>
//     </div>
//   );
// };

const SecurityTab = ({ policyData, setPolicyData }) => {
  const [open, setOpen] = useState(false);

  // Utility to update nested keys
  const updateNestedPolicy = (section, key, value) => {
    setPolicyData({
      ...policyData,
      [section]: {
        ...policyData[section],
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-[#1A73E8] mb-2">
          Basic Security Restrictions
        </h3>
        <ToggleItems
          title="Disable location sharing"
          description="Prevents location sharing."
          value={policyData.restrictions.locationSharingDisabled}
          onChange={(val) =>
            updateNestedPolicy("restrictions", "locationSharingDisabled", val)
          }
        />
        <ToggleItems
          title="Disable factory reset"
          description="Prevents factory reset."
          value={policyData.restrictions.factoryResetDisabled}
          onChange={(val) =>
            updateNestedPolicy("restrictions", "factoryResetDisabled", val)
          }
        />
        <ToggleItems
          title="Disable microphone"
          description="Prevents the use of the microphone."
          value={policyData.restrictions.unmuteMicrophoneDisabled}
          onChange={(val) =>
            updateNestedPolicy("restrictions", "unmuteMicrophoneDisabled", val)
          }
        />
        <ToggleItems
          title="Disable bluetooth"
          description="Disables the device's Bluetooth capability."
          value={policyData.restrictions.bluetoothDisabled}
          onChange={(val) =>
            updateNestedPolicy("restrictions", "bluetoothDisabled", val)
          }
        />
        <ToggleItems
          title="Disable Camera"
          description="Disables access to the device camera."
          value={policyData.dpmConfig.cameraDisabled}
          onChange={(val) =>
            updateNestedPolicy("dpmConfig", "cameraDisabled", val)
          }
        />
        <ToggleItems
          title="Disable Notification"
          description="Disables keyguard notifications on the lock screen."
          value={policyData.dpmConfig.keyguradNotificationDisabled}
          onChange={(val) =>
            updateNestedPolicy("dpmConfig", "keyguradNotificationDisabled", val)
          }
        />
      </div>

      <div>
        <h3 className="text-base font-semibold text-[#1A73E8] mb-2">
          Critical Security Restrictions
        </h3>
        <ToggleItems
          title="Disable keyguard"
          description="Disables the lock screen for primary and/or secondary displays."
          value={policyData.dpmConfig.keyguardDisabled}
          onChange={(val) =>
            updateNestedPolicy("dpmConfig", "keyguardDisabled", val)
          }
        />
        <ToggleItems
          title="Disable fingerprint unlock"
          description="Prevents unlocking the device using fingerprint."
          value={policyData.dpmConfig.keyguradFingerprintDisabled}
          onChange={(val) =>
            updateNestedPolicy("dpmConfig", "keyguradFingerprintDisabled", val)
          }
        />
        <ToggleItems
          title="Disable screen capture"
          description="Prevents screen capturing."
          value={policyData.dpmConfig.screenCaptureDisabled}
          onChange={(val) =>
            updateNestedPolicy("dpmConfig", "screenCaptureDisabled", val)
          }
        />
        <ToggleItems
          title="Disable Developer Options"
          description="Prevents access to developer options and debugging features."
          value={!policyData.restrictions.debuggingFeaturesAllowed}
          onChange={(val) =>
            updateNestedPolicy("restrictions", "debuggingFeaturesAllowed", !val)
          }
        />
        <ToggleItems
          title="Disable Installations of Apps from Unknown Sources"
          description="Blocks installation of apps from outside the Play Store."
          value={!policyData.restrictions.installUnknownSourcesAllowed}
          onChange={(val) =>
            updateNestedPolicy(
              "restrictions",
              "installUnknownSourcesAllowed",
              !val
            )
          }
        />
        <ToggleItems
          title="Disable USB media mounting"
          description="Prevents mounting of physical USB media."
          value={policyData.restrictions.mountPhysicalMediaDisabled}
          onChange={(val) =>
            updateNestedPolicy(
              "restrictions",
              "mountPhysicalMediaDisabled",
              val
            )
          }
        />
        <ToggleItems
          title="Disable USB data transfer"
          description="Disables file transfer over USB."
          value={policyData.restrictions.usbFileTransferDisabled}
          onChange={(val) =>
            updateNestedPolicy("restrictions", "usbFileTransferDisabled", val)
          }
        />
        <ToggleItems
          title="Disable voice and video calling"
          description="Blocks apps from making voice or video calls."
          value={policyData.restrictions.disableCallingApps}
          onChange={(val) =>
            updateNestedPolicy("controlConfig", "disableCallingApps", val)
          }
        />
        <ToggleItems
          title="Disable SMS"
          description="Prevents sending and receiving of SMS messages."
          value={policyData.restrictions.smsDisabled}
          onChange={(val) =>
            updateNestedPolicy("restrictions", "smsDisabled", val)
          }
        />
      </div>

      {/* Password Policy Settings */}
      <Card className="w-full p-4 shadow-md rounded-2xl">
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

          <CollapsibleContent className="mt-4">
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Minimum Password Length
                </label>
                <Input
                  type="number"
                  min={0}
                  value={policyData.passwordPolicy.passwordMinimumLength}
                  onChange={(e) =>
                    updateNestedPolicy(
                      "passwordPolicy",
                      "passwordMinimumLength",
                      Math.max(0, Number(e.target.value))
                    )
                  }
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  Password Complexity
                </label>
                <Select
                  value={policyData.passwordPolicy.passwordQuality}
                  onValueChange={(val) =>
                    updateNestedPolicy("passwordPolicy", "passwordQuality", val)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select complexity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NUMERIC">Numeric</SelectItem>
                    <SelectItem value="ALPHANUMERIC">Alphanumeric</SelectItem>
                    <SelectItem value="ALPHABETIC">Alphabetic</SelectItem>
                    <SelectItem value="COMPLEX">
                      Complex (symbols + cases)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  Password History Length
                </label>
                <Input
                  type="number"
                  min={0}
                  value={policyData.passwordPolicy.passwordHistoryLength}
                  onChange={(e) =>
                    updateNestedPolicy(
                      "passwordPolicy",
                      "passwordHistoryLength",
                      Number(e.target.value)
                    )
                  }
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  Failed Attempts to Wipe
                </label>
                <Input
                  type="number"
                  min={0}
                  value={
                    policyData.passwordPolicy.maximumFailedPasswordsForWipe
                  }
                  onChange={(e) =>
                    updateNestedPolicy(
                      "passwordPolicy",
                      "maximumFailedPasswordsForWipe",
                      Math.max(0, Number(e.target.value))
                    )
                  }
                />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
};

export default SecurityTab;

//export default SecurityTab;
