import ToggleItems from "../Reuseable_Components/ToggleItem";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const KioskTab = ({ policyData, setPolicyData }) => {
  const handleSingleAppSelect = (val) => {
    setPolicyData((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        kioskPolicy: {
          ...prev.data.kioskPolicy,
          allowedApps: [val],
          multiApp: false,
          enabled: true,
        },
      },
    }));
  };

  const handleToggle = (val) => {
    setPolicyData((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        kioskPolicy: {
          ...prev.data.kioskPolicy,
          multiApp: val,
          enabled: false,
          allowedApps: val ? [] : prev.data.kioskPolicy.allowedApps,
        },
      },
    }));
  };

  return (
    <div className="space-y-6">
      <ToggleItems
        title="Enable Multi App KIOSK"
        description="Enables a KIOSK with multiple Apps"
        value={policyData.data.kioskPolicy?.multiApp || false}
        onChange={handleToggle}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold">Single App Kiosk</h1>
          <h2 className="text-sm text-gray-500">
            Select an app to install in KIOSK Mode.
          </h2>
        </div>
        <Select
          value={policyData.data.kioskPolicy?.allowedApps?.[0] || ""}
          onValueChange={handleSingleAppSelect}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select an App" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Apps</SelectLabel>
              <SelectItem value="WhatsApp">WhatsApp</SelectItem>
              <SelectItem value="Facebook">Facebook</SelectItem>
              <SelectItem value="Blueberry">Blueberry</SelectItem>
              <SelectItem value="Grapes">Grapes</SelectItem>
              <SelectItem value="Pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default KioskTab;
