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


const SecurityTab = ({ policyData, setPolicyData }) => {
  const [open, setOpen] = useState(false);

  // Utility to update nested keys
  const updateNestedPolicy = (section, key, value) => {
    setPolicyData({
      ...policyData,
      data:{
        ...policyData.data,
        [section]:{
          ...policyData.data[section],
          [key]:value
        }
      }
      // [section]: {
      //   ...policyData[section],
      //   [key]: value,
      // },
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
        <div>
        <h3 className="text-base font-semibold text-[#1A73E8] mb-2">
          Basic Security Restrictions
        </h3>
        <ToggleItems
          title="Disable location sharing"
          description="Prevents location sharing."
          value={policyData.data.restrictions.locationSharingDisabled}
          onChange={(val) =>
            updateNestedPolicy("restrictions", "locationSharingDisabled", val)

          }
        />
        <ToggleItems
          title="Disable factory reset"
          description="Prevents factory reset."
          value={policyData.data.restrictions.factoryResetDisabled}
          onChange={(val) =>
            updateNestedPolicy("restrictions", "factoryResetDisabled", val)
          }
        />
        <ToggleItems
          title="Disable microphone"
          description="Prevents the use of the microphone."
          value={policyData.data.restrictions.unmuteMicrophoneDisabled}
          onChange={(val) =>
            updateNestedPolicy("restrictions", "unmuteMicrophoneDisabled", val)
          }
        />
        <ToggleItems
          title="Disable bluetooth"
          description="Disables the device's Bluetooth capability."
          value={policyData.data.restrictions.bluetoothDisabled}
          onChange={(val) =>
            updateNestedPolicy("restrictions", "bluetoothDisabled", val)
          }
        />
        <ToggleItems
          title="Disable Camera"
          description="Disables access to the device camera."
          value={policyData.data.dpmConfig.cameraDisabled}
          onChange={(val) =>
            updateNestedPolicy("dpmConfig", "cameraDisabled", val)
          }
        />
        <ToggleItems
          title="Disable Notification"
          description="Disables keyguard notifications on the lock screen."
          value={policyData.data.dpmConfig.keyguradNotificationDisabled}
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
          value={policyData.data.dpmConfig.keyguardDisabled}
          onChange={(val) =>
            updateNestedPolicy("dpmConfig", "keyguardDisabled", val)
          }
        />
        <ToggleItems
          title="Disable fingerprint unlock"
          description="Prevents unlocking the device using fingerprint."
          value={policyData.data.dpmConfig.keyguradFingerprintDisabled}
          onChange={(val) =>
            updateNestedPolicy("dpmConfig", "keyguradFingerprintDisabled", val)
          }
        />
        <ToggleItems
          title="Disable screen capture"
          description="Prevents screen capturing."
          value={policyData.data.dpmConfig.screenCaptureDisabled}
          onChange={(val) =>
            updateNestedPolicy("dpmConfig", "screenCaptureDisabled", val)
          }
        />
        <ToggleItems
          title="Disable Developer Options"
          description="Prevents access to developer options and debugging features."
          value={!policyData.data.restrictions.debuggingFeaturesAllowed}
          onChange={(val) =>
            updateNestedPolicy("restrictions", "debuggingFeaturesAllowed", !val)
          }
        />
        <ToggleItems
          title="Disable Installations of Apps from Unknown Sources"
          description="Blocks installation of apps from outside the Play Store."
          value={!policyData.data.restrictions.installUnknownSourcesAllowed}
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
          value={policyData.data.restrictions.mountPhysicalMediaDisabled}
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
          value={policyData.data.restrictions.usbFileTransferDisabled}
          onChange={(val) =>
            updateNestedPolicy("restrictions", "usbFileTransferDisabled", val)
          }
        />
        <ToggleItems
          title="Disable voice and video calling"
          description="Blocks apps from making voice or video calls."
          value={policyData.data.controlConfig.disableCallingApps}
          onChange={(val) =>
            updateNestedPolicy("controlConfig", "disableCallingApps", val)
          }
        />
        <ToggleItems
          title="Disable SMS"
          description="Prevents sending and receiving of SMS messages."
          value={policyData.data.restrictions.smsDisabled}
          onChange={(val) =>
            updateNestedPolicy("restrictions", "smsDisabled", val)
          }
        />
      </div>
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
                  value={policyData.data.passwordPolicy.passwordMinimumLength}
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
                  value={policyData.data.passwordPolicy.passwordQuality}
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
                    <SelectItem value="PASSWORD_QUALITY_UNSPECIFIED">None</SelectItem>
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
                  value={policyData.data.passwordPolicy.passwordHistoryLength}
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
                    policyData.data.passwordPolicy.maximumFailedPasswordsForWipe
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
