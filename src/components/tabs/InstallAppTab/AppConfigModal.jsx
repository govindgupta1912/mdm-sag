import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppConfigModal = ({
  open,
  onOpenChange,
  app,
  policyData,
  setPolicyData,
}) => {
  console.log("AppConfigModal", app);

  const [activeConfigKeys, setActiveConfigKeys] = useState([]);

  const [configuration, setConfiguration] = useState([]);

  // const handleAddConfig = () => {
  //   setConfiguration((prevConfig) => [
  //     ...prevConfig,
  //     {
  //       valueType: "",
  //       key: "",
  //       value: "",
  //     },
  //   ]);
  // };

  // const handelRemoveConfig = (index) => {
  //   setConfiguration(configuration.filter((_, i) => i !== index));
  // };

  const handleChange = (index, field, value) => {
    const updatedConfig = [...configuration];
    updatedConfig[index][field] = value;
    setConfiguration(updatedConfig);
  };

  // const toggleConfig = (index, config) => {
  //   setActiveConfigKeys((prev) => {
  //     const isActive = prev.includes(index);
  //     if (isActive) {
  //       // Remove from active and configuration
  //       setConfiguration((prevConfigs) =>
  //         prevConfigs.filter((_, i) => i !== index)
  //       );
  //       return prev.filter((i) => i !== index);
  //     } else {
  //       // Add to active and configuration
  //       setConfiguration((prevConfigs) => [
  //         ...prevConfigs,
  //         {
  //           valueType: config.Type || "STRING", // or map from config if available
  //           key: config.key,
  //           value: "",
  //         },
  //       ]);
  //       return [...prev, index];
  //     }
  //   });
  // };
  const toggleConfig = (key, config) => {
    setActiveConfigKeys((prev) => {
      const isActive = prev.includes(key);
      if (isActive) {
        // Remove from config and active list
        setConfiguration((prevConfigs) =>
          prevConfigs.filter((c) => c.key !== key)
        );
        return prev.filter((k) => k !== key);
      } else {
        // Add if not already present
        setConfiguration((prevConfigs) => {
          if (prevConfigs.some((c) => c.key === key)) return prevConfigs;
          return [
            ...prevConfigs,
            {
              valueType: config.Type || "STRING",
              key: key,
              value: "",
            },
          ];
        });
        return [...prev, key];
      }
    });
  };

  //   const handelSaveConfig = () => {
  //   if (!app?.package_name) return;

  //   // Deep copy to avoid mutation
  //   const updatedPolicyData = structuredClone(policyData);
  //   const multiApp = updatedPolicyData.data.kioskPolicy.multiApp;

  //   const targetApps = multiApp
  //     ? updatedPolicyData.data.kioskPolicy.allowedApps
  //     : updatedPolicyData.data.applications;

  //   // Find the app in the array
  //   const appIndex = targetApps.findIndex(
  //     (item) => item.packageName === app.package_name
  //   );

  //   if (appIndex !== -1) {
  //     targetApps[appIndex].managedConfiguration = configuration;
  //     setPolicyData(updatedPolicyData);
  //   }

  //   // Close the modal
  //   onOpenChange(false);
  // };

  const handelSaveConfig = () => {
    if (!app?.package_name) return;

    // Deep copy to avoid mutation
    const updatedPolicyData = structuredClone(policyData);
    const multiApp = updatedPolicyData.data.kioskPolicy.multiApp;

    const targetApps = multiApp
      ? updatedPolicyData.data.kioskPolicy.allowedApps
      : updatedPolicyData.data.applications;

    // Convert the value based on its valueType
    // const transformedConfig = configuration.map((config) => {
    //   let transformedValue;

    //   switch (config.valueType) {
    //     case "STRING_ARRAY":
    //       // Split by comma and trim whitespace
    //       transformedValue = config.value.split(',').map((item) => item.trim());
    //       break;
    //     case "INTEGER":
    //       transformedValue = parseInt(config.value, 10);
    //       break;
    //     case "BOOLEAN":
    //       transformedValue = config.value.toLowerCase() === "true";
    //       break;
    //     case "STRING":
    //     default:
    //       transformedValue = config.value;
    //   }

    //   return {
    //     ...config,
    //     value: transformedValue,
    //   };
    // });

    const transformedConfig = configuration.map((config) => {
      let transformedValue;

      switch (config.valueType) {
        case "STRING_ARRAY":
          transformedValue =
            typeof config.value === "string"
              ? config.value.split(",").map((item) => item.trim())
              : Array.isArray(config.value)
              ? config.value
              : [];
          break;

        case "INTEGER":
          transformedValue = parseInt(config.value, 10);
          break;

        case "BOOLEAN":
          transformedValue = String(config.value).toLowerCase() === "true";
          break;

        case "STRING":
        default:
          transformedValue = String(config.value);
      }

      return {
        ...config,
        value: transformedValue,
      };
    });

    // Find and update the app's config
    const appIndex = targetApps.findIndex(
      (item) => item.packageName === app.package_name
    );

    if (appIndex !== -1) {
      targetApps[appIndex].managedConfiguration = transformedConfig;
      setPolicyData(updatedPolicyData);
      toast.success("Configuration saved successfully!");
      // Close the modal
      onOpenChange(false);
    }
    else {  
      toast.error("App not added in the policy data!");

    }


    
    
  };

  useEffect(() => {
    if (!app?.package_name || !open) return;

    const multiApp = policyData.data.kioskPolicy.multiApp;
    const targetApps = multiApp
      ? policyData.data.kioskPolicy.allowedApps
      : policyData.data.applications;

    const foundApp = targetApps.find(
      (item) => item.packageName === app.package_name
    );

    if (foundApp?.managedConfiguration?.length > 0) {
      setConfiguration(foundApp.managedConfiguration);
    } else {
      // Reset to default empty config if nothing found
      setConfiguration([]);
    }
  }, [app, open, policyData]);

  console.log("configuration", configuration);

  // return (
  //   // <Dialog open={open} onOpenChange={onOpenChange}>
  //   //   <DialogContent className="w-[1200px] rounded-lg p-4">
  //   //     <DialogHeader>
  //   //       <DialogTitle className="text-lg font-bold">
  //   //         {app.app_name} Configuration
  //   //       </DialogTitle>
  //   //       <DialogDescription className="text-sm text-gray-500">
  //   //         Configure the settings for {app.app_name} here.
  //   //       </DialogDescription>
  //   //     </DialogHeader>
  //   //     <div className="mt-4 space-y-4">
  //   //       {/* Configuration form or content goes here */}
  //   //       <p>
  //   //         <strong>Package:</strong> {app?.package_name}
  //   //       </p>
  //   //       <p>
  //   //         <strong>Version:</strong> {app?.version_name}
  //   //       </p>
  //   //       {/* Replace the above with real config UI */}
  //   //       {configuration.map((config, index) => (
  //   //         <div className="flex gap-1 items-center" key={index}>

  //   //          <div>
  //   //     <Label className="text-sm mb-1 block text-gray-700">DataType</Label>
  //   //     <Select
  //   //       value={config.valueType}
  //   //       onValueChange={(value) => handleChange(index, "valueType", value)}
  //   //     >
  //   //       <SelectTrigger className="w-[180px]">
  //   //         <SelectValue placeholder="Select a Data Type" />
  //   //       </SelectTrigger>
  //   //       <SelectContent>
  //   //         <SelectGroup>
  //   //           <SelectLabel>Select a Data Type</SelectLabel>
  //   //           <SelectItem value="String">String</SelectItem>
  //   //           <SelectItem value="Integer">Integer</SelectItem>
  //   //           <SelectItem value="String Array">String Array</SelectItem>
  //   //         </SelectGroup>
  //   //       </SelectContent>
  //   //     </Select>
  //   //   </div>
  //   //   <div>
  //   //     <Label className="text-sm mb-1 block text-gray-700">Key</Label>
  //   //     <Input
  //   //       value={config.key}
  //   //       onChange={(e) => handleChange(index, "key", e.target.value)}
  //   //       placeholder="Enter key"
  //   //     />
  //   //   </div>
  //   //   <div>
  //   //     <Label className="text-sm mb-1 block text-gray-700">Value</Label>
  //   //     <Input
  //   //       value={config.value}
  //   //       onChange={(e) => handleChange(index, "value", e.target.value)}
  //   //       placeholder="Enter value"
  //   //     />
  //   //   </div>
  //   //           <Button
  //   //             variant="destructive"
  //   //             className=""
  //   //             onClick={() => handelRemoveConfig(index)}
  //   //           >
  //   //             Remove
  //   //           </Button>
  //   //         </div>

  //   //       ))}
  //   //       <Button onClick={handleAddConfig} className="mt-4">
  //   //         Add Configuration
  //   //       </Button>
  //   //     </div>
  //   //     <DialogFooter className="mt-6">
  //   //       <Button type="submit"
  //   //       onClick={handelSaveConfig}
  //   //       >Save </Button>
  //   //     </DialogFooter>
  //   //   </DialogContent>
  //   // </Dialog>
  //   <Dialog open={open} onOpenChange={onOpenChange}>
  //     <DialogContent className="w-full max-w-4xl rounded-lg p-6">
  //       <DialogHeader>
  //         <DialogTitle className="text-2xl font-semibold text-[#03A9FC]">
  //           {app.app_name} Configuration
  //         </DialogTitle>
  //         <DialogDescription className="text-base text-gray-500 mt-1">
  //           Configure settings for <strong>{app.app_name}</strong> (v
  //           {app.version_name})
  //         </DialogDescription>
  //       </DialogHeader>

  //       <div className="mt-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
  //         <p className="text-sm">
  //           <strong>Package:</strong>{" "}
  //           <span className="text-gray-700">{app?.package_name}</span>
  //         </p>
  //         <p className="text-sm">
  //           <strong>Version:</strong>{" "}
  //           <span className="text-gray-700">{app?.version_name}</span>
  //         </p>
  //       </div>
  //       {console.log("apps====", app.restrictions)}

  //       <div className="mt-6 space-y-6 max-h-[400px] overflow-y-auto pr-2">
  //         {Array.isArray(app?.restrictions) &&
  //           app?.restrictions.length > 0 &&
  //           app?.restrictions.map((config, index) => {
  //             const key = config.key;
  //             return (
  //             <div
  //               key={key}
  //               className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end border border-gray-200 rounded-md p-4 bg-white shadow-sm"
  //             >
  //               <div>
  //                 <Label className="text-sm mb-1 block text-gray-700">
  //                   {config.title}List of origins allowing all HTTP
  //                   authentication
  //                 </Label>
  //                 <p>
  //                   {config.description}Setting the policy specifies for which
  //                   origins to allow all the HTTP authentication schemes Google
  //                   Chrome supports regardless of the AuthSchemes policy. Format
  //                   the origin pattern according to this format
  //                   (https://support.google.com/chrome/a?p=url_blocklist_filter_format).
  //                   Up to 1,000 exceptions can be defined in
  //                   AllHttpAuthSchemesAllowedForOrigins. Wildcards are allowed
  //                   for the whole origin or parts of the origin, either the
  //                   scheme, host, port.
  //                 </p>
  //               </div>

  //               <Button
  //                 variant={
  //                   activeConfigKeys.includes(key) ? "destructive" : "outline"
  //                 }
  //                 onClick={() => toggleConfig(key, config)}
  //               >
  //                 {activeConfigKeys.includes(key) ? "Remove" : "Configure"}
  //               </Button>

  //               {activeConfigKeys.includes(key) && (
  //                 <div>
  //                   <Label className="text-sm mb-1 block text-gray-700">
  //                     Value
  //                   </Label>
  //                   <Input
  //                     value={
  //                       configuration.find(
  //                         (c) =>
  //                           c.key === config.key ||
  //                           c.key === config.restrictionKey
  //                       )?.value || ""
  //                     }
  //                     onChange={(e) =>
  //                       handleChange(
  //                         configuration.findIndex(
  //                           (c) =>
  //                             c.key === config.key ||
  //                             c.key === config.restrictionKey
  //                         ),
  //                         "value",
  //                         e.target.value
  //                       )
  //                     }
  //                     placeholder={`Enter ${config.valueType} value`}
  //                     type={
  //                       config.valueType === "INTEGER" ? "number" : "text"
  //                     }
  //                   />
  //                 </div>
  //               )}
  //             </div>
  //             )
  //           })}
  //       </div>

  //       <DialogFooter className="mt-6">
  //         <Button
  //           onClick={handelSaveConfig}
  //           className="bg-[#03A9FC] hover:bg-[#0284c7] text-white transition-all"
  //         >
  //           Save Configuration
  //         </Button>
  //       </DialogFooter>
  //     </DialogContent>
  //   </Dialog>
  // );

   return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-4xl rounded-2xl p-6 bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-blue-600">
            {app.app_name} Configuration
          </DialogTitle>
          <DialogDescription className="text-base text-gray-500 mt-1">
            Configure <span className="font-medium">{app.app_name}</span> (v{app.version_name})
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 p-4 border border-gray-200 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-700">
            <p><strong>Package:</strong> {app.package_name}</p>
            <p><strong>Version:</strong> {app.version_name}</p>
          </div>
        </div>

        <div className="mt-6 space-y-6 max-h-[400px] overflow-y-auto pr-2">
          {Array.isArray(app?.restrictions) &&
            app?.restrictions.map((config, index) => {
              const key = config.key;
              const isActive = activeConfigKeys.includes(key);
              const currentConfig = configuration.find((c) => c.key === key);

              return (
                <div
                  key={key}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-sm"
                >
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-800">
                      {config.title}
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">{config.description}</p>
                    <p>{config.key}</p>
                  </div>

                  <div className="flex flex-col items-start justify-end space-y-2">
                    <Button
                      variant={isActive ? "destructive" : "outline"}
                      onClick={() => toggleConfig(key, config)}
                      className="w-full"
                    >
                      {isActive ? "Remove" : "Configure"}
                    </Button>

                    {isActive && (
                      <Input
                        type={config.valueType === "INTEGER" ? "number" : "text"}
                        placeholder={`Enter ${config.type} value`}
                        value={currentConfig?.value || ""}
                        onChange={(e) =>
                          handleChange(
                            configuration.findIndex((c) => c.key === key),
                            "value",
                            e.target.value
                          )
                        }
                      />
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        <DialogFooter className="mt-6">
          <Button
            onClick={handelSaveConfig}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-all"
          >
            Save Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppConfigModal;
