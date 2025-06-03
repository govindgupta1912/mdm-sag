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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ITEMS_PER_PAGE = 8; // Number of items to display per page

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
  const [currentPage, setCurrentPage] = useState(1);
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

  const totalPages = Math.ceil((policies?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPolicies = policies.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  console.log(`Total policies: ${policies.length}, Total pages: ${totalPages}`);

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
      if (delete_policy_response.status) {
        toast.success("Policy Deleted Successfully");
        fetchPolicyData();
      } else {
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
      <div className=" sticky top-[74px] z-40 bg-dark w-full flex flex-col sm:flex-row justify-between items-start sm:items-center h-[68px] px-4 py-1 space-y-2 sm:space-y-0">
        {/* <div className=" h-20 text-white  text-2xl font-bold  p-6 flex "> */}
        <div className="text-white text-lg sm:text-xl  font-semibold flex items-center gap-2">
          <img src={enroll} className="w-7 h-7" />
          Manage Policy
        </div>
        <Link
          to={"/create-policy"}
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors hover:scale-105 duration-200   bg-gradient rounded-md shadow-sm"
        >
          <Plus size={20} className="text-white" />
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

      <div className="w-full ">
        {/* TABLE VIEW (Tablet and above) */}
        <div className="hidden sm:block max-h-[600px]">
          <Table className="table-auto border-separate border-spacing-y-2 w-full text-sm sm:text-base">
            {/* <TableCaption className="mb-4 text-gray-600">
              A list of all policies.
            </TableCaption> */}
            <TableHeader className="sticky top-0 z-10 bg-[#03A9FC] text-white">
              <TableRow className="bg-[#03A9FC] text-white ">
                <TableHead className="text-white">Policy ID</TableHead>
                <TableHead className="text-white">Policy Name</TableHead>
                <TableHead className="text-center text-white">
                  Version
                </TableHead>
                <TableHead className="text-center text-white">
                  Updated On
                </TableHead>
                <TableHead className="text-center text-white">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <TableRow
                      key={index}
                      className="bg-white shadow-sm hover:bg-gray-200 animate-pulse"
                    >
                      {[...Array(5)].map((_, i) => (
                        <TableCell key={i} className="py-4 text-center">
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : paginatedPolicies?.map((policy, index) => (
                    <TableRow
                      key={index}
                      className="bg-white shadow-sm transition-colors duration-200 hover:bg-blue-50"
                    >
                      <TableCell className="py-4">{policy.id}</TableCell>
                      <TableCell className="py-4">{policy.name}</TableCell>
                      <TableCell className="py-4 text-center">
                        {policy.version}
                      </TableCell>
                      <TableCell className="py-4 text-center">
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
                      <TableCell className="py-4">
                        <div className="flex justify-center gap-4">
                          <button
                            className="text-blue-600 hover:text-blue-800 transition"
                            onClick={() => update(policy)}
                          >
                            <Pencil size={20} />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800 transition"
                            onClick={() => delete_policy(policy)}
                            disabled={processing}
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
            <TableFooter>
        <TableRow>
          <TableCell
            colSpan={5}
            className="text-center text-sm text-muted-foreground "
          >
            Showing {policies?.length} polic{policies?.length === 1 ? "y" : "ies"}
          </TableCell>
        </TableRow>
      </TableFooter>
          </Table>
        </div>

        {/* Pagination Controls */}
        {!loading && totalPages >= 2 && (
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((prev) => Math.max(prev - 1, 1));
                    }}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={i + 1 === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(i + 1);
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* MOBILE VIEW (Card layout) */}
        <div className="sm:hidden space-y-4">
          {paginatedPolicies?.map((policy, index) => (
            <div
              key={index}
              className="rounded-xl border shadow-sm p-4 bg-white"
            >
              <div className="text-sm mb-2 space-y-1">
                <div>
                  <span className="font-semibold">Policy ID:</span> {policy.id}
                </div>
                <div>
                  <span className="font-semibold">Name:</span> {policy.name}
                </div>
                <div>
                  <span className="font-semibold">Version:</span>{" "}
                  {policy.version}
                </div>
                <div>
                  <span className="font-semibold">Updated:</span>{" "}
                  {new Date(policy.updated_on).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-2">
                <button
                  className="text-blue-600 hover:text-blue-800 transition"
                  onClick={() => update(policy)}
                >
                  <Pencil size={20} />
                </button>
                <button
                  className="text-red-600 hover:text-red-800 transition"
                  onClick={() => delete_policy(policy)}
                  disabled={processing}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Policy;
