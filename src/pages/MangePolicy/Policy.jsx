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

import CreatePolicy from "../../components/CreatePolicy";

import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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

  const [policies,setPolicies]=useState([])
   const fetchPolicyData = async()=>{
    try {
      const Policy_response= await axios.get(`${API_BASE_URL}/api/get_all_policies`);
      if(Policy_response.status)
      {
        console.log("get_all_policies",Policy_response);
        
        setPolicies(Policy_response.data.policies);
      }
      else{
        toast.error("Failed to Fetch Data");
      }
    } catch (error) {
      console.log("Failed to fetch Data",error);
      
    }
   }
  useEffect(() => {
     fetchPolicyData()
    }, []);
  

  const update = async (policy) => {
    try {
      //const response=await axios.get(`${API_BASE_URL}/api/get_policy/${policy.id}`);
      const get_update_policy = await axios.post(
        `${API_BASE_URL}/api/get_update_policy`,
        {"policyId":policy.id}
      );
      console.log("get_update_policy_data",get_update_policy);
      console.log("===========",get_update_policy.data.policy);
      
      const policyDataFromBackend=get_update_policy.data.policy;
      navigate("/create-policy", {
        state: { policyData: policyDataFromBackend }, // 👈 pass backend data to CreatePolicy page
      });
    } catch (error) {
      console.error("Failed to fetch the policy data", error);
    }
  };

  const delete_policy= async (policy) => {
    try {
      //const response=await axios.get(`${API_BASE_URL}/api/get_policy/${policy.id}`);
      const get_policy_after_delete = await axios.post(
        `${API_BASE_URL}/api/delete_policy`,
        {"policyId":policy.id}
      );
      fetchPolicyData();
      console.log("get_delete_policy_data",get_policy_after_delete);
      //console.log("===========",get_update_policy.data.policy);
      
      
    } catch (error) {
      console.error("Failed to fetch the policy data", error);
    }
  };

  return (
    <div>
      <div className="bg-black w-full flex justify-between items-center  px-4">
        <div className=" h-20 text-white  text-2xl font-bold  p-6 flex ">
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
        <Table className="table-fixed border-separate border-spacing-y-2 w-full text-sm sm:text-base">
          <TableCaption className="mb-4">A list of all policies.</TableCaption>
          <TableHeader>
            <TableRow className="bg-[#03A9FC] text-white  ">
              <TableHead className="text-white min-w-[200px] w-[300px] py-4">
                Policy ID
              </TableHead>
              <TableHead className="text-white min-w-[250px] w-[250px]">
                Policy Name
              </TableHead>
              <TableHead className="text-white w-[80px]">Version</TableHead>
              <TableHead className="text-white min-w-[180px] w-[180px]">
                Updated On
              </TableHead>
              <TableHead className="text-white text-center w-[100px]">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            { policies?.map((policy, index) => (
              <TableRow
                key={index}
                className=" bg-white shadow-sm hover:bg-gray-200"
              >
                <TableCell className="py-4 font-mono w-[300px]">
                  {policy.id}
                </TableCell>
                <TableCell className="py-4 w-[250px]">{policy.name}</TableCell>
                <TableCell className="py-4 text-center w-[80px]">
                  {policy.version}
                </TableCell>
                <TableCell className="py-4 w-[180px]">
                  {policy.updatedOn}
                </TableCell>
                <TableCell className="py-4 flex gap-4 justify-center w-[120px]">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => update(policy)}
                  >
                    <Pencil size={20} />
                  </button>
                  <button className="text-red-600 hover:text-red-800"
                  onClick={()=>delete_policy(policy)}
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
