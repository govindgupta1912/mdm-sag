import { useDispatch, useSelector } from "react-redux";
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
import { use, useEffect } from "react";
import apk from "../../assets/apk.png"; // Assuming you have a default APK icon
import { fetchApplications } from "@/utilites/store/slices/applicationsSlice";

const KioskTab = ({ policyData, setPolicyData }) => {
    const dispatch = useDispatch();
  const {
    data: apps,
    status,
    error,
  } = useSelector((state) => state.applications);
  console.log("apps", apps);

  useEffect(() => {
      dispatch(fetchApplications());
    }, [dispatch]);
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
    const selectedApp = apps.find((app) => app.id.toString() === selectedId);
    if (!selectedApp) return;

    const transformedApp = {
      title: selectedApp.app_name,
      packageName: selectedApp.package_name,
      permissionGrants: [],
      managedConfiguration: [],
      downloadUrl: selectedApp.download_url,
      isBlocked: false,
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
        applications: [], // Update this line to set the applications array
      },
    }));
  };

  // const handleToggle = (val) => {
  //   setPolicyData((prev) => ({
  //     ...prev,
  //     data: {
  //       ...prev.data,
  //       kioskPolicy: {
  //         ...prev.data.kioskPolicy,
  //         multiApp: val,
  //         enabled: false,
  //         allowedApps: val ? [] : prev.data.kioskPolicy.allowedApps,
  //       },
  //        applications:[],
  //     },
  //   }));
  // };

  const handleToggle = (val) => {
    setPolicyData((prev) => {
      const prevKiosk = prev.data.kioskPolicy;
      const prevAllowed = prevKiosk.allowedApps || [];
      const prevApps = prev.data.applications || [];

      return {
        ...prev,
        data: {
          ...prev.data,
          kioskPolicy: {
            ...prevKiosk,
            multiApp: val,
            enabled: val,
            allowedApps: val ? [...prevApps] : [],
          },
          applications: val ? [] : [...prevAllowed],
        },
      };
    });
  };
  // const handleToggle = (val) => {
  //   setPolicyData((prev) => {
  //     return {
  //       ...prev,
  //       data: {
  //         ...prev.data,
  //         kioskPolicy: {
  //           ...prev.data.kioskPolicy,
  //           multiApp: val,
  //           enabled: val, // Optional: enable if needed
  //           allowedApps: val ? [] : prev.data.applications || [],
  //         },
  //         applications: val ? prev.data.kioskPolicy.allowedApps || [] : [],
  //       },
  //     };
  //   });
  // };

  console.log(
    "policyData.data.kioskPolicy?.allowedApps?.[0]?.packageName",
    policyData.data.kioskPolicy?.allowedApps?.[0]?.packageName
  );

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
          value={
            !policyData.data.kioskPolicy?.multiApp &&
            policyData.data.kioskPolicy?.allowedApps?.[0]
              ? apps
                  .find(
                    (app) =>
                      app.package_name ===
                      policyData.data.kioskPolicy.allowedApps[0].packageName
                  )
                  ?.id.toString() || ""
              : ""
          }
          // onValueChange={(value)=>handleSingleAppSelect(value)}
          onValueChange={(value) => {
            if (value === "none") {
              // Clear selection
              setPolicyData((prev) => ({
                ...prev,
                data: {
                  ...prev.data,
                  kioskPolicy: {
                    ...prev.data.kioskPolicy,
                    allowedApps: [],
                    enabled: false,
                  },
                },
              }));
            } else {
              handleSingleAppSelect(value);
            }
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select an App" />
          </SelectTrigger>
          {/* <SelectContent>
            <SelectGroup>
              <SelectLabel>Apps</SelectLabel>
              <SelectItem value="none">-- None --</SelectItem>
              {apps.map((app) => (
                <SelectItem key={app.id} value={app.id.toString()}>
                  {
                    <div className="flex items-center gap-2">
                       
                  
                    <img
                      className="h-10 w-15 sm:h-15 sm:w-15 rounded-full"
                      src={app.icon ? `data:image/png;base64,${app.icon}` : apk}
                      alt=""
                    />

                    {app.app_name || "App Name"}
                    <span className="text-xs text-gray-500">
                      {app.package_name || "Package Name"}
                    </span>
                    {app.version_name && (
                      <span className="text-xs text-gray-500">
                        {app.version_name || "Version Name"}
                      </span>
                    )}
                    </div>
                  }
                  
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent> */}
          <SelectContent>
  <SelectGroup>
    <SelectLabel className="text-base font-semibold text-gray-700 mb-2">Apps</SelectLabel>
    <SelectItem value="none">-- None --</SelectItem>

    {apps.map((app) => (
      <SelectItem key={app.id} value={app.id.toString()}>
        <div className="flex items-center gap-3 p-2  rounded-md hover:bg-gray-50 transition-all">
          <img
            className="h-10 w-10 rounded-md object-cover border"
            src={app.icon ? `data:image/png;base64,${app.icon}` : apk}
            alt="App Icon"
          />
          <div className="flex flex-col">
            <span className="font-medium text-sm text-gray-900">
              {app.app_name || "App Name"}
            </span>
            <span className="text-xs text-gray-500">
              {app.package_name || "Package Name"}
            </span>
            {app.version_name && (
              <span className="text-xs text-gray-400">
                {app.version_name}
              </span>
            )}
          </div>
        </div>
      </SelectItem>
    ))}
  </SelectGroup>
</SelectContent>

        </Select>
      </div>
    </div>
  );
};

export default KioskTab;
