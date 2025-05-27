import { Plus, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Switch } from "../../ui/switch";
import { Button } from "../../ui/button";
import { useEffect, useState } from "react";
import { fetchApplications } from "@/utilites/store/slices/applicationsSlice";
import AppConfigModal from "./AppConfigModal";
import AppPermissionModal from "./AppPermissionModal";
import { Checkbox } from "@/components/ui/checkbox";
import apk from "../../../assets/apk.png"; // Adjust the path as necessary


const InstallAppTab = ({ policyData, setPolicyData }) => {
  const [selectedApp, setSelectedApp] = useState([]);
  const [ConfigModalOpen, setConfigModalOpen] = useState(false);
  const [appPermissionModalOpen, setAppPermissionModalOpen] = useState(false);
  const [toggleApps, setToggleApps] = useState({});

  const dispatch = useDispatch();
  const {
    data: apps,
    status,
    error,
  } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  useEffect(() => {
    const multiApp = policyData.data.kioskPolicy.multiApp;
    const selectedApps = multiApp
      ? policyData.data.kioskPolicy.allowedApps
      : policyData.data.applications;

    const newToggleState = {};
    selectedApps.forEach((app) => {
      newToggleState[app.packageName] = true;
    });
    setToggleApps(newToggleState);
  }, [policyData]);

  const handelToggleApp = (app, ischecked) => {
    const transformedApp = {
      title: app.app_name,
      packageName: app.package_name,
      permissionGrants: [],
      managedConfiguration: [],
      downloadUrl: app.download_url,
      isBlocked: false
    };
    //const updatePolicyData = { ...policyData };
    const updatePolicyData = structuredClone(policyData);
    const multiApp = updatePolicyData.data.kioskPolicy.multiApp;

    const targetArray = multiApp
      ? updatePolicyData.data.kioskPolicy.allowedApps
      : updatePolicyData.data.applications;

    if (ischecked) {
      const alreadyExists = targetArray.some(
        (a) => a.packageName === transformedApp.packageName
      );
      if (!alreadyExists) {
        targetArray.push(transformedApp);
      }
    } else {
      const filterdArray = targetArray.filter(
        (a) => a.packageName !== transformedApp.packageName
      );
      if (multiApp) {
        updatePolicyData.data.kioskPolicy.allowedApps = filterdArray;
      } else {
        updatePolicyData.data.applications = filterdArray;
      }
    }
    setPolicyData(updatePolicyData);

    setToggleApps((prev) => ({ ...prev, [app.app_id]: ischecked }));
  };

  const handelBlockAppChange = (app, ischecked) => {
    const updatedPolicyData = structuredClone(policyData);
    const isMulitiApp =updatedPolicyData.data.kioskPolicy.multiApp;
    const targetArray = isMulitiApp
      ? updatedPolicyData.data.kioskPolicy.allowedApps
      :updatedPolicyData.data.applications;

      const updatedApps = targetArray.map((item) => {
        if(item.packageName === app.package_name){
          return{
            ...item,
            isBlocked: ischecked
          }
        }
        return item;
      });
      if(isMulitiApp){
        updatedPolicyData.data.kioskPolicy.allowedApps = updatedApps;
      }
      else{
        updatedPolicyData.data.applications = updatedApps;
      }
      setPolicyData(updatedPolicyData);
    

  }

  const openAppConfigModal = (app) => {
   // console.log("AppConfigModal", app);
    
    setSelectedApp(app);
    setConfigModalOpen(true);
  }
 const openAppPermissionModal = (app) => {
  setSelectedApp(app);
  setAppPermissionModalOpen(true);
  console.log("AppPermissionModal", app);
 }

  console.log("AppConfigModalSelectedApp===",selectedApp);
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">
        Manage Applications
      </h2>

      {/* <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex justify-end gap-4">
              <button
               className={`bg-[#03A9FC] hover:scale-105 ${
                policyData.kioskPolicy.enabled && !policyData.kioskPolicy.multiApp ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={policyData.kioskPolicy.enabled && !policyData.kioskPolicy.multiApp}
             >
                <Plus size={30} className="text-white" />
              </button>
              <p className="text-xl">Add Application</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Application List</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-gray-400">Whatshaap</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}

      {/* Implement it later if required */}
      {/* <div className="flex justify-end">
        {policyData.data.kioskPolicy.enabled &&
        !policyData.data.kioskPolicy.multiApp ? (
          // Render non-clickable disabled button with label
          <div className="flex justify-end gap-4 opacity-50 cursor-not-allowed">
            <button className="bg-[#03A9FC]" disabled>
              <Plus size={30} className="text-white cursor-not-allowed" />
            </button>
            <p className="text-xl">Add Application</p>
          </div>
        ) : (
          // Render actual dropdown when multiApp mode is allowed
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex justify-end gap-4">
                <button className="bg-[#03A9FC] hover:scale-105 transition-all duration-300">
                  <Plus size={30} className="text-white" />
                </button>
                <p className="text-xl">Add Application</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Application List</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-gray-400">
                Whatshaap
              </DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div> */}
{/* 
      <div className="mt-6 w-full"> */}
        <div className="overflow-x-auto">

        <Table className="m-w-[800px]">
          <TableCaption>A list of your Application.</TableCaption>
          <TableHeader>
            <TableRow >
              <TableHead className="text-[#03A9FC] font-bold ">Name</TableHead>
              <TableHead className="text-[#03A9FC] font-bold ">
                Version
              </TableHead>
              <TableHead className="text-[#03A9FC] font-bold ">
                Permission
              </TableHead>
              <TableHead className="text-[#03A9FC] font-bold">
                Configuration
              </TableHead>
              <TableHead className="text-[#03A9FC] font-bold">
                 Block App
                </TableHead>
              {/* <TableHead className="text-[#03A9FC] font-bold">Action</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {apps.map((app) => (
              <TableRow key={app.id}>
                
                 <TableCell>
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <Switch
                      checked={!!toggleApps[app.package_name]}
                      onCheckedChange={(checked) => handelToggleApp(app, checked)}
                      className="data-[state=checked]:bg-[#03A9FC]"
                      disabled={
                        policyData.data.kioskPolicy.enabled &&
                        !policyData.data.kioskPolicy.multiApp
                      }
                    />
                     <img
                                        className="h-10 w-15 sm:h-15 sm:w-15 rounded-full"
                                        src={app.icon ? `data:image/png;base64,${app.icon}` :apk}
                                        alt=""
                                      />
                    <div>
                      <p className="font-semibold">{app.app_name}</p>
                      <p className="text-xs text-gray-500">{app.package_name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className=" text-sm font-medium">
                  {app.version_name}
                </TableCell>
                <TableCell>
                  <button className="border border-[#03A9FC] text-[#03A9FC] font-bold px-4 py-2 hover:text-white hover:bg-[#03A9FC] hover:scale-105 transform transition-all duration-400"
                  onClick={() => openAppPermissionModal(app)}
                  >
                    Manager
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    className="border border-[#03A9FC] text-[#03A9FC] font-bold px-4 py-2 hover:text-white hover:bg-[#03A9FC]"
                    onClick={() => openAppConfigModal(app)}
                  >
                    Manager
                  </button>
                </TableCell>
                <TableCell>
                  <Checkbox
                  //  className="data-[state=checked]:bg-[#03A9FC]"
                   checked={policyData.data.kioskPolicy.multiApp
                    ? policyData.data.kioskPolicy.allowedApps.find(
                      (item) => item.packageName === app.package_name
                    )?.isBlocked || false
                    : policyData.data.applications.find(
                      (item)=> item.packageName === app.package_name)?.isBlocked || false
                   }
                   onCheckedChange={(checked) =>handelBlockAppChange(app,checked)}
                  />
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
     
      
       <AppConfigModal
   policyData={policyData}
  setPolicyData={setPolicyData}    
  open={ConfigModalOpen}
  onOpenChange={setConfigModalOpen}
  app={selectedApp}
  
  
/>

      <AppPermissionModal
        policyData={policyData}
        setPolicyData={setPolicyData}
        app={selectedApp}
        open={appPermissionModalOpen}
        onOpenChange={setAppPermissionModalOpen}
      />
      {/* {appPermissionModalOpen && (
        <AppPermissionModal
          app={selectedApp}
          onClose={() => setAppPermissionModalOpen(false)}
        />
      )} */}

    </div>
   
  );
};

export default InstallAppTab;
