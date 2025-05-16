import { Link, useNavigate } from "react-router-dom";
import enroll from "../../assets/enroll.png";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import CreatePolicy from "./CreatePolicy";

import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Policy = () => {
  const navigate = useNavigate();

  // const policies = [
  //   {
  //     id: "f0906574-60ad-4a70-9dcb-5b0eb1db21cagovind",
  //     name: "Office IT department devices",
  //     version: 2,
  //     updatedOn: "2024-09-24 15:01:44",

  //     restrictions: {
  //       locationSharingDisabled: true,
  //       factoryResetDisabled: true,
  //       unmuteMicrophoneDisabled: false,
  //       bluetoothDisabled: false,
  //       debuggingFeaturesAllowed: false,
  //       installUnknownSourcesAllowed: false,
  //       mountPhysicalMediaDisabled: false,
  //       usbFileTransferDisabled: false,
  //       smsDisabled: false,
  //       addUserDisabled: true,
  //       modifyAccountsDisabled: false,
  //       removeUserDisabled: false,
  //       setWallpaperDisabled: false,
  //       adjustVolumeDisabled: false,
  //       wifiConfigDisabled: false,
  //       wifiDirectDisabled: false,
  //       bluetoothSharingDisabled: false,
  //       bluetoothConfigDisabled: true,
  //       mobileNetworksConfigDisabled: false,
  //       dataRoamingDisabled: false,
  //       wifiTetheringDisabled: false,
  //       tetheringConfigDisabled: false,
  //       vpnConfigDisabled: false,
  //       installAppsDisabled: false,
  //       uninstallAppsDisabled: false,
  //     },
  //     dpmConfig: {
  //       keyguardDisabled: false,
  //       keyguradFingerprintDisabled: false,
  //       keyguradNotificationDisabled: false,
  //       screenCaptureDisabled: false,
  //       cameraDisabled: false,
  //     },

  //     passwordPolicy: {
  //       passwordMinimumLength: 12,
  //       passwordQuality: "ALPHANUMERIC",
  //       passwordHistoryLength: 6,
  //       maximumFailedPasswordsForWipe: 3,
  //     },

  //     controlConfig: {
  //       disableCallingApps: false,
  //       enableSystemUpdateDelay: false,
  //     },
  //     vpnConfig: {
  //       lockdownEnabled: false,
  //     },
  //   },
  //   {
  //     id: "f0906574-60ad-4a70-9dcb-5b0eb1db21ca",
  //     name: "Office IT department devices",
  //     version: 2,
  //     updatedOn: "2024-09-24 15:01:44",
  //   },
  //   {
  //     id: "f0906574-60ad-4a70-9dcb-5b0eb1db21ca",
  //     name: "Office IT department devices",
  //     version: 2,
  //     updatedOn: "2024-09-24 15:01:44",
  //   },
  //   {
  //     id: "f0906574-60ad-4a70-9dcb-5b0eb1db21ca",
  //     name: "Office IT department devices",
  //     version: 2,
  //     updatedOn: "2024-09-24 15:01:44",
  //   },
  //   {
  //     id: "f0906574-60ad-4a70-9dcb-5b0eb1db21ca",
  //     name: "Office IT department devices",
  //     version: 2,
  //     updatedOn: "2024-09-24 15:01:44",
  //   },
  //   {
  //     id: "f0906574-60ad-4a70-9dcb-5b0eb1db21ca",
  //     name: "Office IT department devices",
  //     version: 2,
  //     updatedOn: "2024-09-24 15:01:44",
  //   },
  //   // Add more policy objects as needed...
  // ];

  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const fetchPolicyData = async () => {
    setLoading(true); // Set loading to true before the API call
    try {
      const Policy_response = await axios.get(
        `${API_BASE_URL}/api/get_all_policies`
      );
      if (Policy_response.status) {
        console.log("get_all_policies", Policy_response);

        setPolicies(Policy_response.data.policies);
      } else {
        toast.error("Failed to Fetch Data");
      }
    } catch (error) {
      console.log("Failed to fetch Data", error);
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };
  useEffect(() => {
    fetchPolicyData();
  }, []);

  const update = async (policy) => {
    try {
      //const response=await axios.get(`${API_BASE_URL}/api/get_policy/${policy.id}`);
      const get_update_policy = await axios.post(
        `${API_BASE_URL}/api/get_update_policy`,
        { policyId: policy.id }
      );
      console.log("get_update_policy_data", get_update_policy);
      console.log("===========", get_update_policy.data.policy);

      const policyDataFromBackend = get_update_policy.data.policy;
      navigate("/create-policy", {
        state: { policyData: policyDataFromBackend }, // 👈 pass backend data to CreatePolicy page
      });
    } catch (error) {
      console.error("Failed to fetch the policy data", error);
    }
  };

  const delete_policy = async (policy) => {
    setProcessing(true);
    setLoading(true);
    try {
      //const response=await axios.get(`${API_BASE_URL}/api/get_policy/${policy.id}`);
      const delete_policy_response = await axios.post(
        `${API_BASE_URL}/api/delete_policy`,
        { policyId: policy.id }
      );
      if (delete_policy_response.status){
        toast.success("Policy Deleted Successfully");
         fetchPolicyData();
      }
      else{
        toast.error(delete_policy_response.data.message);
      }
     
      console.log("delete_policy_response==", delete_policy_response);
      //console.log("===========",get_update_policy.data.policy);
    } catch (error) {
      console.error("Failed to fetch the policy data", error);
      console.log("knjvdhskjhgsdhbkhlajnhzk");
      
      toast.error("Failed to delete the policy due to some error");
     
    }
    setProcessing(false);
    setLoading(false);
  };

  return (
    <div>
      {/* <div className="bg-black w-full flex justify-between items-center  px-4"> */}
      <div className="bg-black w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-2 space-y-2 sm:space-y-0">
        {/* <div className=" h-20 text-white  text-2xl font-bold  p-6 flex "> */}
         <div className="text-white text-xl sm:text-2xl h-20 font-bold flex items-center gap-2">
          
          <img src={enroll} className="w-7 h-7" />
          Manage Policy
        </div>
        <Link
          to={"/create-policy"}
          className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-md shadow-sm"
        >
          <Plus size={20} className="text-black" />
        </Link>
      </div>
      {/* <div>
              <Table className="">
                     <TableCaption>A list of your recent invoices.</TableCaption>
                     <TableHeader>
                       <TableRow>
                         <TableHead className="w-[100px]">Invoice</TableHead>
                         <TableHead>Status</TableHead>
                         <TableHead>Method</TableHead>
                         <TableHead className="text-right">Amount</TableHead>
                       </TableRow>
                     </TableHeader>
                     <TableBody className="bg-white ">
                       {invoices.map((invoice) => (
                         <TableRow key={invoice.invoice}>
                           <TableCell className="font-medium">{invoice.invoice}</TableCell>
                           <TableCell>{invoice.paymentStatus}</TableCell>
                           <TableCell>{invoice.paymentMethod}</TableCell>
                           <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                         </TableRow>
                       ))}
                     </TableBody>
                     <TableFooter>
                       <TableRow>
                         <TableCell colSpan={3}>Total</TableCell>
                         <TableCell className="text-right">$2,500.00</TableCell>
                       </TableRow>
                     </TableFooter>
                   </Table>
            </div> */}
      <div className="overflow-x-auto w-full p-4">
        
      {/* <Table className="table-fixed border-separate border-spacing-y-2 w-full text-sm sm:text-base"> */}
       <Table className="min-w-full text-sm sm:text-base">
          <TableCaption className="mb-4">A list of all policies.</TableCaption>
          <TableHeader>
            <TableRow className="bg-[#03A9FC] text-white  ">
              <TableHead className="text-white min-w-[150px] sm:min-w-[200px] lg:w-[300px]">
                Policy ID
              </TableHead>
              <TableHead className="text-white min-w-[150px] sm:min-w-[200px] lg:w-[300px]">
                Policy Name
              </TableHead>
              <TableHead className="text-white min-w-[150px] sm:min-w-[200px] lg:w-[300px]">Version</TableHead>
              <TableHead className="text-white min-w-[150px] sm:min-w-[200px] lg:w-[300px]">
                Updated On
              </TableHead>
              <TableHead className="text-white min-w-[150px] sm:min-w-[200px] lg:w-[300px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <TableRow
                    key={index}
                    className=" bg-white shadow-sm hover:bg-gray-200 animate-pulse"
                  >
                    <TableCell className="py-4 font-mono w-[300px]">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </TableCell>
                    <TableCell className="py-4 w-[250px]">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </TableCell>
                    <TableCell className="py-4 text-center w-[80px]">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </TableCell>
                    <TableCell className="py-4 w-[180px]">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </TableCell>
                    <TableCell className="py-4 flex gap-4 justify-center w-[120px]">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </TableCell>
                   
                   
                    <TableCell className="py-4 flex gap-4 justify-end w-[120px] items-center">
                          <div className="h-4 bg-gray-200 rounded w-24"></div>
                          <div className="h-4 bg-gray-200 rounded w-24"></div>
                        </TableCell>
                  </TableRow>
                ))
              : policies?.map((policy, index) => (
                  <TableRow
                    key={index}
                    className=" bg-white shadow-sm hover:bg-gray-200"
                  >
                    <TableCell className="py-4 flex gap-2 flex-wrap sm:flex-nowrap w-full justify-start sm:justify-center">
                      {policy.id}
                    </TableCell>
                    <TableCell className="py-4 w-[250px]">
                      {policy.name}
                    </TableCell>
                    <TableCell className="py-4  w-[80px] ">
                      {policy.version}
                    </TableCell>
                    <TableCell className="py-4 w-[180px]">
                      {new Date(policy.updated_on).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </TableCell>
                    <TableCell className="py-4 flex gap-4  w-[120px] items-center justify-center">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => update(policy)}
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => delete_policy(policy)}
                        disabled={processing}
                      >
                        <Trash2 size={20} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-sm text-muted-foreground"
              >
                Showing {policies?.length} policies
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default Policy;
