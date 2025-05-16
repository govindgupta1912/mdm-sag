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
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


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
  const [message, setMessage] = useState("");
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


  console.log("devicesList", devicesList);
  
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
  // Function to send notification to selected devices
  const sendNotificationToDevice = async () => {
    if (!message) {
      toast.error("Please type a message to send.");
      return;
    }
    try {
      const sendNotificationResponse = await axios.post(
        `${API_BASE_URL}/api/notification_device`,
        {
          device_ids: selectedIds,
          message: message,
        }
      );
      console.log("sendNotificationResponse", sendNotificationResponse);
      if (sendNotificationResponse.data.status) {
        toast.success("Notification sent successfully");
      } else {
        toast.error("Failed to send notification");
      }
    } catch (error) {
      console.log("Failed to send notification", error);
      toast.error("Failed to send notification");
    }
    console.log("Selected Device IDs:", selectedIds);
    setMessage("");
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


//   const flattenDeviceData = (device) => ({
//   device_id: device?.device_id || "",
//   model: device.model || "",
//   manufacturer: device.manufacturer  || "",
//   android_version: device.android_version || "",
//   api_level: device.api_level   || "",
//   cpu: device.cpu   || "",
//   gpu: device.gpu || "",
//   architecture: device.architecture || "",
//   total_ram: device.total_ram || "",
//   total_storage: device.total_storage || "",
//   kernel_version: device.kernel_version || "",
//   security_patch: device.security_patch   || "N/A",
//   serial_no: device.serial_no || "",
//   accelerometer: device.accelerometer || "",
//   gyroscope: device.gyroscope || "",
//   magnetometer: device.magnetometer || "",
//   proximity: device.proximity  || "",
//   fingerprint: device.fingerprint || "",
//   camera: device.camera || "",
//   microphone: device.microphone || "",
//   gps: device.gps || "",
//   encryption_status: device.encryption_status || "",
//   is_registered: device.is_registered ? "Yes" : "No",
//   policy_id: device.policy_id || "",
//   policy_name: device.policy_name || "",
//   policy_version: device.policy_version || "",
//   wifi_ssid: device.wifi_info?.ssid || "",
//   wifi_mac: device.wifi_info?.mac || "",
//   wifi_bssid: device.wifi_info?.bssid || "",
//   wifi_enabled: device.wifi_info?.enabled || "",
//   wifi_state: device.wifi_info?.state || "",
//   network_operator: device.network_info?.operator || "",
//   network_in_service: device.network_info?.in_service || "",
//   network_type: device.network_info?.network_type || "",
//   signal_strength: device.network_info?.signal_strength || "",
//   applications_count: device.application?.length || 0,
// });
const flattenDeviceData = (device) => ({
 
  MODEL: device?.model || "",
  MANUFACTURER: device?.manufacturer || "",
  "ANDROID VERSION": device?.android_version || "",
  "API LEVEL": device?.api_level || "",
  // cpu: device?.cpu || "",
  //gpu: device?.gpu || "",
  ARCHITECTURE: device?.architecture || "",
  "TOTAL RAM": device?.total_ram || "",
  "TOTAL STORAGE": device?.total_storage || "",
  // kernel_version: device?.kernel_version || "",
  // security_patch: device?.security_patch || "N/A",
    "SERIAL NO": device?.serial_no || "",
  // accelerometer: device?.accelerometer || "",
  // gyroscope: device?.gyroscope || "",
  // magnetometer: device?.magnetometer || "",
  // proximity: device?.proximity || "",
  // fingerprint: device?.fingerprint || "",
  // camera: device?.camera || "",
  // microphone: device?.microphone || "",
  // gps: device?.gps || "",
  // encryption_status: device?.encryption_status || "",
  // is_registered: device?.is_registered ? "Yes" : "No",
    
     "POLICY NAME": device?.policy_name || "",
     "POLICY VERSION": device?.policy_version || "",
 
});


 console.log("flattenedData", flattenDeviceData(devicesList[0]));
  
console.log("deviceList=======",devicesList[0]);


  // const exportToPDF = (data, fileName = "data.pdf") => {
  //   const doc = new jsPDF();
  //   const headers = [Object.keys(data[0])];
  //   const rows = data.map((obj) => Object.values(obj));
  //   doc.autoTable({
  //     head: headers,
  //     body: rows,
  //     startY: 10,
  //     styles: { fontSize: 7 },
  //   });
  //   doc.save(fileName);
  // };

//   const exportToPDF = async (data, fileName = "data.pdf") => {
//   const jsPDFModule = await import("jspdf");
//   const jsPDF = jsPDFModule.default;
//   await import("jspdf-autotable");

//   const doc = new jsPDF();
//   const headers = [Object.keys(data[0])];
//   const rows = data.map((obj) => Object.values(obj));

//   doc.autoTable({
//     head: headers,
//     body: rows,
//     startY: 10,
//     // styles: { fontSize: 7 },
//      styles: {
//           cellPadding: 3, // Padding for cells
//           lineColor: [44, 62, 80], // Border color (RGB)
//           lineWidth: 0.1, // Border width
//         },
//         headStyles: {
//           fillColor: [52, 73, 94], // Header background color
//           textColor: 255, // Header text color
//           halign: "center", // Center align header text
//           lineWidth: 0.5, // Border width for header
//         },
//         bodyStyles: {
//           lineColor: [44, 62, 80], // Row border color
//           lineWidth: 0.1, // Border width for rows
//         },
//         alternateRowStyles: {
//           fillColor: [240, 240, 240], // Background color for alternate rows
//         },
      
//   });

//   doc.save(fileName);
// };

const exportToPDF = async (data, fileName = "devices.pdf") => {
  const jsPDFModule = await import("jspdf");
  const jsPDF = jsPDFModule.default;
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF("landscape"); // 👈 use landscape for wide tables

  // Add a title
  doc.setFontSize(16);
  doc.text("Device List", 14, 14);

  // Extract headers and rows
  const headers = Object.keys(data[0] || {});
  const rows = data.map((row) => headers.map((key) => row[key]));

  // Configure the table
  // autoTable(doc, {
  //   startY: 20,
  //   head: [headers],
  //   body: rows,
  //   styles: {
  //     fontSize: 8,
  //     cellPadding: 3,
  //     halign: "left",
  //     valign: "middle",
  //   },
  //   headStyles: {
  //     fillColor: [52, 73, 94],
  //     textColor: 255,
  //     halign: "center",
  //   },
  //   alternateRowStyles: {
  //     fillColor: [245, 245, 245],
  //   },
  //   columnStyles: {
  //     // Use fixed widths for key columns to avoid vertical wrapping
  //     0: { cellWidth: 40 }, // device_id
  //     1: { cellWidth: 20 }, // model
  //     2: { cellWidth: 30 }, // manufacturer
  //     3: { cellWidth: 20 }, // android_version
  //     4: { cellWidth: 20 }, // api_level
  //     5: { cellWidth: 30 }, // cpu
  //     6: { cellWidth: 30 }, // architecture
  //     7: { cellWidth: 20 }, // total_ram
  //     8: { cellWidth: 20 }, // total_storage
  //     9: { cellWidth: 30 }, // kernel_version
  //     10: { cellWidth: 30 }, // serial_no
  //     11: { cellWidth: 30 }, // policy_id
  //     12: { cellWidth: 30 }, // policy_name
  //     13: { cellWidth: 30 }, // policy_version
  //     // Add more columns as needed
  //     // All others can auto-fit or set custom widths similarly...
  //   },
  //   didDrawPage: (data) => {
  //     // Footer or page number if needed
  //     const pageCount = doc.internal.getNumberOfPages();
  //     doc.setFontSize(10);
  //     doc.text(`Page ${pageCount}`, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 10);
  //   },
  // });

  autoTable(doc, {
  head: [headers],
  body: rows,
  startY: 20,
  styles: {
    fontSize: 10,
    cellPadding: 1,
  },
  headStyles: {
     lineColor: [55, 75, 96],
    lineWidth: 0.1,
    fillColor: [52, 73, 94],
    textColor: 255,
    halign: "center",
  },
  bodyStyles: {
    lineColor: [44, 62, 80],
    lineWidth: 0.1,
    cellPadding: 3,
    halign: "center",
  },
  alternateRowStyles: {
    fillColor: [240, 240, 240],
    cellPadding: 3,
  },
  didDrawPage: (data) => {
      // Footer or page number if needed
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFontSize(10);
      doc.text(`Page ${pageCount}`, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 10);
    },
  horizontalPageBreak: false,
 // horizontalPageBreakRepeat: 0, // repeat headers
});


  doc.save(fileName);
};


  const handelExportPdf = () => {
    const flatData = devicesList.map(flattenDeviceData);
    exportToPDF(flatData, "devices.pdf");
  };


  

const exportToExcel = (data, fileName = "devices.xlsx") => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Devices");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const dataBlob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(dataBlob, fileName);
};


  const handelExportToExcel = () => {
    // const flatData = devicesList.map(flattenDeviceData);
    // const worksheet = XLSX.utils.json_to_sheet(flatData); 
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Devices");
    // XLSX.writeFile(workbook, "devices.xlsx");
    const flatData = devicesList.map(flattenDeviceData);
  exportToExcel(flatData, "devices.xlsx");
  }
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
            <Textarea
              placeholder="Type your message here."
              id="message"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button onClick={() => setActiveModal(null)}>Cancel</Button>
            <Button onClick={sendNotificationToDevice}>Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div>
        <div className="flex justify-between items-center bg-black p-6 ">
          <div className="flex justify-start gap-2 bg-black text-center">
            <img src={devices} alt="" />
            <p className="text-white text-2xl font-bold">Manage Devices</p>
          </div>
          <div className="flex gap-4">
              <Button
            className="border border-white text-white px-4 py-4 rounded-md cursor-pointer hover:bg-green-600 hover:text-white transition duration-200"
            onClick={handelExportPdf}
          >
            PDF
          </Button>
          <Button className="border border-white text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-600 hover:text-white transition duration-200"
          
            onClick={handelExportToExcel}
          >
            EXCEL
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="border border-white text-white px-4 py-1 rounded-md cursor-pointer hover:bg-white hover:text-black transition duration-200">
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
