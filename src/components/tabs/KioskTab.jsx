import { useSelector } from "react-redux";
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

  const {
    data: apps,
    status,
    error,
  } = useSelector((state) => state.applications);
  console.log("apps", apps);

  // const handleSingleAppSelect = (val) => {
  //   const transformedApp = {
  //     title: val.app_name,
  //     packageName: val.package_name,
  //     permissionGrants: [],
  //     managedConfiguration: [],
  //     downloadUrl: val.download_url,
  //   };
  //   setPolicyData((prev) => ({
  //     ...prev,
  //     data: {
  //       ...prev.data,
  //       kioskPolicy: {
  //         ...prev.data.kioskPolicy,
  //         allowedApps: [transformedApp],
  //         multiApp: false,
  //         enabled: true,
  //       },
  //     },
  //   }));
  // };

  const handleSingleAppSelect = (selectedId) => {
    const selectedApp = apps.find(app => app.id.toString() === selectedId);
    if (!selectedApp) return;
  
    const transformedApp = {
      title: selectedApp.app_name,
      packageName: selectedApp.package_name,
      permissionGrants: [],
      managedConfiguration: [],
      downloadUrl: selectedApp.download_url,
    };
  
    setPolicyData((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        kioskPolicy: {
          ...prev.data.kioskPolicy,
          allowedApps: [transformedApp],
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

  console.log("policyData.data.kioskPolicy?.allowedApps?.[0]?.packageName",policyData.data.kioskPolicy?.allowedApps?.[0]?.packageName)
            
  

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
          //value={policyData.data.kioskPolicy?.allowedApps?.[0]?.packageName|| ""}
          value={
            policyData.data.kioskPolicy?.allowedApps?.[0]
              ? apps.find(app => app.package_name === policyData.data.kioskPolicy.allowedApps[0].packageName)?.id.toString() || ""
              : ""
          }
          onValueChange={(value)=>handleSingleAppSelect(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select an App" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Apps</SelectLabel>
              
              {
                apps.map((app)=>(
                  <SelectItem key={app.id} value={app.id.toString()}>
                    {app.app_name || "App Name"}
                  </SelectItem>
                ))
              }
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default KioskTab;
