// import { Button } from "@/components/ui/button";
// import {
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Dialog } from "@radix-ui/react-dialog";

// const AppPermissionModal = ({
//   open,
//   onOpenChange,
//   app,
//   policyData,
//   setPolicyData,
// }) => {
//   const new_list_of_permission = [
//     "android.permission.ACCESS_COARSE_LOCATION",
//     "android.permission.ACCESS_FINE_LOCATION",
//     "android.permission.READ_CALL_LOG",
//     "android.permission.READ_PHONE_NUMBERS",
//     "android.permission.READ_SMS",
//     "android.permission.SEND_SMS",
//     "android.permission.RECEIVE_MMS",
//     "android.permission.RECEIVE_SMS",
//     "android.permission.READ_EXTERNAL_STORAGE",
//     "android.permission.WRITE_EXTERNAL_STORAGE",
//     "android.permission.READ_WRITE_STORAGE",
//     "android.permission.CAPTURE_AUDIO_OUTPUT",
//     "android.permission.RECORD_AUDIO",
//     "android.permission.READ_CALENDAR",
//     "android.permission.WRITE_CALENDAR",
//     "android.permission.CALL_PHONE",
//     "android.permission.READ_CONTACTS",
//     "android.permission.READ_CALL_LOG",
//   ];
//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="w-full max-w-4xl rounded-lg p-6">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-semibold text-[#03A9FC]">
//             {app.app_name} Permission
//           </DialogTitle>
//           <DialogDescription className="text-base text-gray-500 mt-1">
//             Permission settings for <strong>{app.app_name}</strong> (v
//             {app.version_name})
//           </DialogDescription>
//         </DialogHeader>

//         <div className="mt-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
//           <p className="text-sm">
//             <strong>Package:</strong>{" "}
//             <span className="text-gray-700">{app?.package_name}</span>
//           </p>
//           <p className="text-sm">
//             <strong>Version:</strong>{" "}
//             <span className="text-gray-700">{app?.version_name}</span>
//           </p>
//         </div>

//         <div className="mt-6 space-y-6 max-h-[400px] overflow-y-auto pr-2">
//           <h2 className="text-lg font-semibold">Permissions</h2>
//           <p className="text-sm text-gray-500">
//             Select the permissions you want to grant to this app.
//           </p>
//           <div className="mt-4">
//             {app?.permissions?.map((permission) =>
//               new_list_of_permission.includes(permission)&&(
//                 <div key={permission} className="flex items-center mb-2">
//                   <label htmlFor={permission} className="text-sm">
//                     {permission}
//                   </label>
//                   <Select>
//                     <SelectTrigger className="w-[180px]">
//                       <SelectValue placeholder="Select a status" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectGroup>
//                         {/* <SelectLabel>F</SelectLabel> */}
//                         <SelectItem value="apple">Grant</SelectItem>
//                         <SelectItem value="banana">Deny</SelectItem>
                       
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               ) 
//             )}

//              {app?.permissions?.map((permission) =>
//               !new_list_of_permission.includes(permission)&&(
//                 <div>
//                   <label htmlFor={permission} className="text-sm">
//                     {permission}
//                   </label>
//                   <label>Approved</label>
//                 </div>
//               ) 
//             )}
//           </div>
//         </div>

//         <DialogFooter className="mt-6">
//           <Button
//             //onClick={handelSaveConfig}
//             className="bg-[#03A9FC] hover:bg-[#0284c7] text-white transition-all"
//           >
//             Save Configuration
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AppPermissionModal;


import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

const AppPermissionModal = ({
  open,
  onOpenChange,
  app,
  policyData,
  setPolicyData,
}) => {
  const new_list_of_permission = [
    "android.permission.ACCESS_COARSE_LOCATION",
    "android.permission.ACCESS_FINE_LOCATION",
    "android.permission.READ_CALL_LOG",
    "android.permission.READ_PHONE_NUMBERS",
    "android.permission.READ_SMS",
    "android.permission.SEND_SMS",
    "android.permission.RECEIVE_MMS",
    "android.permission.RECEIVE_SMS",
    "android.permission.READ_EXTERNAL_STORAGE",
    "android.permission.WRITE_EXTERNAL_STORAGE",
    "android.permission.READ_WRITE_STORAGE",
    "android.permission.CAPTURE_AUDIO_OUTPUT",
    "android.permission.RECORD_AUDIO",
    "android.permission.READ_CALENDAR",
    "android.permission.WRITE_CALENDAR",
    "android.permission.CALL_PHONE",
    "android.permission.READ_CONTACTS",
    "android.permission.READ_CALL_LOG",
    "android.permission.CAMERA",
    "android.permission.READ_MEDIA_VIDEO",
    "android.permission.READ_MEDIA_AUDIO",
    "android.permission.POST_NOTIFICATIONS",
    "android.permission.READ_MEDIA_IMAGES",
    "android.permission.BLUETOOTH",

  ];
  
  const editablePermissions = app?.permissions?.filter((p) =>
    new_list_of_permission.includes(p)
  );
  const approvedPermissions = app?.permissions?.filter(
    (p) => !new_list_of_permission.includes(p)
  );
    const [selectedPermissions, setSelectedPermissions] = useState({});
     console.log("selectedPermissions====", selectedPermissions);
     
     useEffect(() => {
  if (open && app) {
    const targetApps = policyData.data.kioskPolicy.multiApp
      ? policyData.data.kioskPolicy.allowedApps
      : policyData.data.applications;

    const existingApp = targetApps.find(a => a.packageName === app.package_name);
    if (existingApp?.permissionGrants) {
      const initialPermissions = {};
      existingApp.permissionGrants.forEach(({ permission, grantType }) => {
        initialPermissions[permission] = grantType;
      });
      setSelectedPermissions(initialPermissions);
    }
  }
}, [open, app, policyData]);

    const handleSave = () => {
  const updatedPermissionGrants = Object.entries(selectedPermissions).map(
    ([permission, grantType]) => ({
      permission,
      grantType,
    })
  );

   console.log("updatedPermissionGrants====", updatedPermissionGrants);


  // Deep copy to avoid mutation
  const updatedPolicyData = structuredClone(policyData);
  const multiApp = updatedPolicyData.data.kioskPolicy.multiApp;

  const targetApps = multiApp
    ? updatedPolicyData.data.kioskPolicy.allowedApps
    : updatedPolicyData.data.applications;

    // Find and update the app's config
  const appIndex = targetApps.findIndex(
    (item) => item.packageName === app.package_name
  );

  if (appIndex !== -1) {
    targetApps[appIndex].permissionGrants = updatedPermissionGrants;
    setPolicyData(updatedPolicyData);
  }


  //setPolicyData(updatedPolicy);
  onOpenChange(false); // close modal
    // Reset selected permissions
  setSelectedPermissions({});
  // Close the modal        

};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-4xl rounded-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#03A9FC]">
            {app.app_name} Permission
          </DialogTitle>
          <DialogDescription className="text-base text-gray-500 mt-1">
            Permission settings for <strong>{app.app_name}</strong> (v
            {app.version_name})
          </DialogDescription>
        </DialogHeader>

        {/* App Info */}
        <div className="mt-6 border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-1">
          <p className="text-sm">
            <strong>Package:</strong>{" "}
            <span className="text-gray-700">{app?.package_name}</span>
          </p>
          <p className="text-sm">
            <strong>Version:</strong>{" "}
            <span className="text-gray-700">{app?.version_name}</span>
          </p>
        </div>

        {/* Permission Settings */}
        <div className="mt-6 space-y-6 max-h-[400px] overflow-y-auto pr-2">
          <div>
            <h2 className="text-lg font-semibold mb-1">Editable Permissions</h2>
            <p className="text-sm text-gray-500 mb-3">
              Select whether to grant or deny the following permissions.
            </p>
            <div className="space-y-3">
              {editablePermissions?.map((permission) => (
                <div
                  key={permission}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded px-4 py-2"
                >
                  <span className="text-sm text-gray-700">{permission}</span>
                  <Select 
                 value={selectedPermissions[permission]}
                    onValueChange={(value) =>
                      setSelectedPermissions((prev) => ({
                        ...prev,
                        [permission]: value,
                      }))
                    }
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                         <SelectItem value="DEFAULT">Default</SelectItem>
                        <SelectItem value="GRANT">Grant</SelectItem>
                        <SelectItem value="DENY">Deny</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mt-6 mb-1">Pre-approved Permissions</h2>
            <p className="text-sm text-gray-500 mb-3">
              These permissions are already approved and cannot be modified.
            </p>
            <div className="space-y-2">
              {approvedPermissions?.map((permission) => (
                <div
                  key={permission}
                  className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded px-4 py-2"
                >
                  <span className="text-sm text-gray-700">{permission}</span>
                  <span className="text-xs text-green-600 font-medium">Approved</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <DialogFooter className="mt-6">
          <Button
             onClick={handleSave}
            className="bg-[#03A9FC] hover:bg-[#0284c7] text-white transition-all"
          >
            Save Permission
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppPermissionModal;
