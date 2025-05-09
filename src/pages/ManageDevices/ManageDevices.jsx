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
import devices from "../../assets/devices.png";
import { Bell, Eye, FileText, ShieldCheck, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { act } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ManageDevices = () => {
  // const devicesList = [
  //   {
  //     id: "RZ25OPULZ",
  //     deviceName: "Microsoft",
  //     model: "Royal",
  //     devicesName: "Office IT devices",
  //     lastSynced: "2024-09-24 15:01:44",
  //   },
  //   {
  //     id: "RZ25OPULx",
  //     deviceName: "Microsoft",
  //     model: "Royal",
  //     devicesName: "Office IT devices",
  //     lastSynced: "2024-09-24 15:01:44",
  //   },
  //   {
  //     id: "RZ25OPULf",
  //     deviceName: "Microsoft",
  //     model: "Royal",
  //     devicesName: "Office IT devices",
  //     lastSynced: "2024-09-24 15:01:44",
  //   },
  //   {
  //     id: "RZ25OPULs",
  //     deviceName: "Microsoft",
  //     model: "Royal",
  //     devicesName: "Office IT devices",
  //     lastSynced: "2024-09-24 15:01:44",
  //   },
  //   {
  //     id: "RZ25OPULr",
  //     deviceName: "Microsoft",
  //     model: "Royal",
  //     devicesName: "Office IT devices",
  //     lastSynced: "2024-09-24 15:01:44",
  //   },
  //   {
  //     id: "RZ25OPULa",
  //     deviceName: "Microsoft",
  //     model: "Royal",
  //     devicesName: "Office IT devices",
  //     lastSynced: "2024-09-24 15:01:44",
  //   },
  //   {
  //     id: "RZ25OPULq",
  //     deviceName: "Microsoft",
  //     model: "Royal",
  //     devicesName: "Office IT devices",
  //     lastSynced: "2024-09-24 15:01:44",
  //   },
  //   {
  //     id: "RZ25OPULp",
  //     deviceName: "Microsoft",
  //     model: "Royal",
  //     devicesName: "Office IT devices",
  //     lastSynced: "2024-09-24 15:01:44",
  //   },
  // ];

  const [selectedIds, setSelectedIds] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [devicesList, setDevicesList] = useState([]);
  const [selectedPolicyId, setSelectedPolicyId] = useState(null);
  const [reloadDevices, setReloadDevices] = useState(false);
  const [loading, setLoading] = useState(false);
  const isAllSelected = selectedIds.length === devicesList?.length;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetch_Device_List = async () => {
    setLoading(true);
    try {
      const devices_list_response = await axios.get(
        `${API_BASE_URL}/api/enrolled_device_list`
      );
      if (devices_list_response.status) {
        console.log("get_all_devices_list", devices_list_response);
        console.log(
          "======================",
          devices_list_response.data.device_list
        );

        setDevicesList(devices_list_response.data.device_list);
      } else {
        toast.error("Failed to Fetch Data");
      }
    } catch (error) {
      console.log("Failed to fetch Data", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch_Device_List();
  }, [reloadDevices]);

  const delete_enroll_devices = async (devices) => {
    try {
      const delete_enroll_devices_response = await axios.post(
        `${API_BASE_URL}/api/delete_device`,
        { device_id: devices.device_id }
      );
      console.log(
        "delete_device_response=======",
        delete_enroll_devices_response
      );
      setReloadDevices((prev) => !prev);
      // fetch_Device_List();
    } catch (error) {
      console.log("faild to delete the devices", error);
    }
  };

  const [policies, setPolicies] = useState([]);
  const fetchPolicyData = async () => {
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
    }
  };
  useEffect(() => {
    fetchPolicyData();
  }, []);

  // Function to apply the selected policy to the selected devices
  const applyPolicyToDevices = async () => {
    if (!selectedPolicyId) {
      toast.error("Please select a policy to apply.");
      return;
    }
    try {
      const applyPolicyResponse = await axios.post(
        `${API_BASE_URL}/api/change_policy`,
        {
          policy_id: selectedPolicyId,
          device_ids: selectedIds,
        }
      );
      console.log("applyPolicyResponse", applyPolicyResponse);
      if (applyPolicyResponse.data.status) {
        toast.success("policy applied successfully");
      } else {
        toast.error("Failed to apply policy");
      }
    } catch (error) {
      console.log("Failed to apply policy", error);
      toast.error("Failed to apply policy");
    }
    console.log("Selected Policy ID:", selectedPolicyId);
    console.log("Selected Device IDs:", selectedIds);
    setActiveModal(null);
    setReloadDevices((prev) => !prev);
  };

  // Toggle all checkboxes
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(devicesList?.map((device) => device.id));
    }
  };

  // Toggle individual row checkbox
  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handelActionClick = (type) => {
    if (selectedIds.length === 0) {
      toast.error("Please Select the Device Before Applying the action");
      return;
    }
    setActiveModal(type);
  };

  return (
    <>
      {/* Change devices Modal */}
      {/* <Dialog open={activeModal === 'devices'} onOpenChange={()=>setActiveModal(null)}>
  <DialogContent>
  <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="bg-white p-6 rounded-xl shadow-xl"
    >
    <DialogHeader>
      <DialogTitle>Change devices</DialogTitle>
      <DialogDescription>Select a new devices for selected devices.</DialogDescription>
    </DialogHeader>
 
  <Select>
     <SelectTrigger className="w-full">
      <SelectValue placeholder="Select a devices" className="text-white" />
     </SelectTrigger>
     <SelectContent>
     <SelectItem value="Office IT devices">Office IT devices</SelectItem>
     <SelectItem value="Remote Work devices">Remote Work devices</SelectItem>
     </SelectContent>
  </Select>
  <DialogFooter>
    <Button onClick={()=>setActiveModal(null)}>Cancel</Button>
    <Button>Apply devices</Button>
  </DialogFooter>
  </motion.div>
  </DialogContent>
</Dialog>

     */}

      <Dialog
        open={activeModal === "devices"}
        onOpenChange={() => setActiveModal(null)}
      >
        <DialogContent>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-6"
          >
            <DialogHeader>
              <DialogTitle>Change Policy</DialogTitle>
              <DialogDescription>
                Select a new Policy for selected devices.
              </DialogDescription>
            </DialogHeader>

            <Select onValueChange={(value) => setSelectedPolicyId(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Policy" />
              </SelectTrigger>
              <SelectContent>
                {policies.map((policy) => (
                  <SelectItem value={policy.id} key={policy.id}>
                    {policy.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setActiveModal(null)}>
                Cancel
              </Button>
              <Button onClick={applyPolicyToDevices}>Apply Policy</Button>
            </DialogFooter>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* send notification modal */}
      <Dialog
        open={activeModal === "Notification"}
        onOpenChange={() => setActiveModal(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Notification</DialogTitle>
            <DialogDescription>
              Type and Send Notification to Selected Devices
            </DialogDescription>
          </DialogHeader>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Your message</Label>
            <Textarea placeholder="Type your message here." id="message" />
          </div>

          <DialogFooter>
            <Button onClick={() => setActiveModal(null)}>Cancel</Button>
            <Button>Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div>
        <div className="flex justify-between items-center bg-black p-6 ">
          <div className="flex justify-start gap-2 bg-black text-center">
            <img src={devices} alt="" />
            <p className="text-white text-2xl font-bold">Manage Devices</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="border border-white text-white px-4 py-2 rounded-md cursor-pointer hover:bg-white hover:text-black transition duration-200">
                Actions
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white text-black shadow-lg rounded-md p-2 w-52 mr-7 mt-5">
              <DropdownMenuLabel className="text-gray-500 text-sm px-2">
                Device Control
              </DropdownMenuLabel>

              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100 cursor-pointer"
                  onClick={() => handelActionClick("devices")}
                >
                  <ShieldCheck className="h-4 w-4" />
                  Change Policy
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100 cursor-pointer"
                  onClick={() => handelActionClick("Notification")}
                >
                  <Bell className="h-4 w-4" />
                  Send Notification
                </DropdownMenuItem>

                <DropdownMenuItem
                  className=" gap-2 px-2 py-2 cursor-pointer"
                  onClick={() => handelActionClick("Content")}
                >
                  <FileText className="h-4 w-4" />
                  Send Content
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="overflow-x-auto w-full p-4">
          <Table className="table-fixed border-separate border-spacing-y-2 w-full text-sm sm:text-base">
            <TableCaption className="mb-4">A list of all Devices.</TableCaption>
            <TableHeader>
              <TableRow className="bg-[#03A9FC] text-white  ">
                <TableHead className="w-12 text-center">
                  {/* Select All Checkbox */}
                  <Checkbox
                    checked={isAllSelected}
                    // indeterminate={selectedIds.length > 0 && !isAllSelected}
                    onCheckedChange={toggleSelectAll}
                    className="border-white bg-white data-[state=checked]:bg-[#03A9FC]"
                  />
                </TableHead>
                <TableHead className="text-white min-w-[100px] w-[100px] py-4">
                  Serial No.
                </TableHead>
                <TableHead className="text-white min-w-[100px] w-[100px]">
                  Device Name
                </TableHead>
                <TableHead className="text-white min-w-[180px] w-[100px]">
                  Model
                </TableHead>
                <TableHead className="text-white  w-[100px]">
                  Policy Name
                </TableHead>
                <TableHead className="text-white text-center w-[100px]">
                  Last Synced
                </TableHead>
                <TableHead className="text-white text-center w-[100px]">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? Array(5)
                    .fill()
                    .map((_, index) => (
                      <TableRow
                        key={index}
                        className="bg-white shadow-sm animate-pulse"
                      >
                        <TableCell className="text-center">
                          <Checkbox className="border-gray-400 data-[state=checked]:bg-[#03A9FC]" />
                        </TableCell>
                        <TableCell className="py-4 font-mono ">
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </TableCell>
                        <TableCell className="py-4 ">
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </TableCell>
                        <TableCell className="py-4  ">
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </TableCell>
                        <TableCell className="py-4 ">
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </TableCell>
                        <TableCell className="py-4 flex gap-4 justify-end w-[120px] items-center">
                          <div className="h-4 bg-gray-200 rounded w-24"></div>
                          <div className="h-4 bg-gray-200 rounded w-24"></div>
                        </TableCell>
                      </TableRow>
                    ))
                : devicesList?.map((devices, index) => (
                    <TableRow
                      key={index}
                      // className=" bg-white shadow-sm hover:bg-gray-200"
                      className={`bg-white shadow-sm hover:bg-gray-200 ${
                        selectedIds.includes(devices.id) ? "bg-blue-50" : ""
                      }`}
                    >
                      <TableCell className="text-center">
                        {/* Individual Checkbox */}
                        <Checkbox
                          checked={selectedIds.includes(devices.device_id)}
                          onCheckedChange={() =>
                            toggleSelectOne(devices.device_id)
                          }
                          className="border-gray-400 data-[state=checked]:bg-[#03A9FC]"
                        />
                      </TableCell>
                      <TableCell className="py-4 font-mono ">
                        {devices.serial_no}
                      </TableCell>
                      <TableCell className="py-4 ">
                        {devices.device_id}
                      </TableCell>
                      <TableCell className="py-4  ">{devices.model}</TableCell>
                      <TableCell className="py-4 ">
                        {devices.policy_id}
                      </TableCell>
                      <TableCell className="py-4">
                        {devices.lastSynced}
                      </TableCell>
                      <TableCell className="py-4 flex gap-4 justify-end w-[120px] items-center">
                        <Link
                          className="text-blue-600 hover:text-blue-800"
                          to={"/devices-details"}
                          state={{
                            device: devices,
                          }}
                        >
                          <Eye size={20} />
                        </Link>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => delete_enroll_devices(devices)}
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
                  colSpan={7}
                  className="text-center text-sm text-muted-foreground"
                >
                  Showing {devicesList.length} policies
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ManageDevices;
