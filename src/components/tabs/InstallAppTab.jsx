import { Plus, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { fetchApplications } from "@/utilites/store/slices/applicationsSlice";

const InstallAppTab = ({ policyData, setPolicyData }) => {
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

  return (
    <div>
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
      <div className="flex justify-end">
        {
           policyData.data.kioskPolicy.enabled &&
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
      </div>

      <div className="mt-6 w-full">
        <Table className="w-full">
          <TableCaption>A list of your Application.</TableCaption>
          <TableHeader>
            <TableRow>
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
              {/* <TableHead className="text-[#03A9FC] font-bold">Action</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {apps.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    {/* <Switch
                      checked={!!toggleApps[app.app_id]}
                      onCheckedChange={(checked) =>
                        handelToggleApp(app, checked)
                      }
                      className="data-[state=checked]:bg-[#03A9FC]"
                    /> */}
                    <Switch
                      checked={!!toggleApps[app.package_name]}
                      onCheckedChange={(checked) =>
                        handelToggleApp(app, checked)
                      }
                      className="data-[state=checked]:bg-[#03A9FC]"
                      disabled={
                        policyData.data.kioskPolicy.enabled &&
                        !policyData.data.kioskPolicy.multiApp
                      }
                    />

                    <div>
                      <h1 className="text-lg">{app.app_name}</h1>
                      <h4 className="text-sm">{app.package_name}</h4>
                    </div>
                  </div>
                </TableCell>
                <TableCell className=" text-sm font-semibold">{app.version_name}</TableCell>
                <TableCell>
                  <button className="border border-[#03A9FC] text-[#03A9FC] font-bold px-4 py-2 hover:text-white hover:bg-[#03A9FC] hover:scale-105 transform transition-all duration-400">
                    Manager
                  </button>
                </TableCell>
                <TableCell>
                  <button className="border border-[#03A9FC] text-[#03A9FC] font-bold px-4 py-2 hover:text-white hover:bg-[#03A9FC]">
                    Manager
                  </button>
                </TableCell>
              </TableRow>
            ))}
            {/* <TableRow>
             
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Switch   className="data-[state=checked]:bg-[#03A9FC]"/>
                  <div>
                    <h1 className="text-lg">Whatshaap Massenger</h1>
                    <h4 className="text-sm">com.whatshap.android</h4>
                  </div>
                </div>
              </TableCell>
              <TableCell>v2.00</TableCell>
              <TableCell>
                <button className="border border-[#03A9FC] text-[#03A9FC] font-bold px-4 py-2 hover:text-white hover:bg-[#03A9FC] hover:scale-105 transform transition-all duration-400">Manager</button>
              </TableCell>
              <TableCell >
                <button className="border border-[#03A9FC] text-[#03A9FC] font-bold px-4 py-2 hover:text-white hover:bg-[#03A9FC]">Manager</button>
              </TableCell>
              {/* <TableCell className="">
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 size={20} />
                </button>
              </TableCell> 
            </TableRow> */}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InstallAppTab;
