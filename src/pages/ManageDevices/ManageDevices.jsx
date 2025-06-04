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
import devices_icon from "../../assets/devices.png";
import { Bell, Eye, FileText, ShieldCheck, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchDeviceList } from "@/utilites/store/slices/devicesListSlice";
import { list } from "postcss";
import { fetchContentList } from "@/utilites/store/slices/contentListSlice";

const ManageDevices = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedContentIds, setSelectedContentIds] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [devicesList, setDevicesList] = useState([]);
  const [selectedPolicyId, setSelectedPolicyId] = useState(null);
  const [reloadDevices, setReloadDevices] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const isAllSelected = selectedIds.length === devicesList?.length;
  const API_BASE_URL = window._env_ .VITE_API_BASE_URL;

  console.log("selectedIds========", selectedIds);

  // const fetch_Device_List = async () => {
  //   setLoading(true);
  //   try {
  //     const devices_list_response = await axios.get(
  //       `${API_BASE_URL}/api/enrolled_device_list`
  //     );
  //     if (devices_list_response.status) {
  //       console.log("get_all_devices_list", devices_list_response);
  //       console.log(
  //         "======================",
  //         devices_list_response.data.device_list
  //       );

  //       setDevicesList(devices_list_response.data.device_list);
  //     } else {
  //       toast.error("Failed to Fetch Data");
  //     }
  //   } catch (error) {
  //     console.log("Failed to fetch Data", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetch_Device_List();
  // }, [reloadDevices]);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    list: devices,
    status,
    error,
  } = useSelector((state) => state.devicesList);

  useEffect(() => {
    dispatch(fetchDeviceList());
  }, [dispatch, reloadDevices]);

  const {
    list: contentList,
    status: contentStatus,
    error: contentError,
  } = useSelector((state) => state.contentList);

  useEffect(() => {
    dispatch(fetchContentList());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      setDevicesList(devices);
    }
    if (status === "failed") {
      toast.error("Failed to fetch devices");
    }
    console.log("devicesList========================");
  }, [status, devices]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  console.log("devicesListasync====", devices);

  console.log("devicesList", devicesList);

  const delete_enroll_devices = async (devices) => {
    setLoading(true);
    try {
      const delete_enroll_devices_response = await axios.post(
        `${API_BASE_URL}/api/delete_device`,
        { device_id: devices.device_id }
      );
      if (delete_enroll_devices_response.status) {
        toast.success("Device deleted successfully");
        setReloadDevices((prev) => !prev);
      } else {
        toast.error("Failed to delete device");
      }

      console.log(
        "delete_device_response=======",
        delete_enroll_devices_response
      );

      // fetch_Device_List();
    } catch (error) {
      console.log("faild to delete the devices", error);
      toast.error(error?.response?.data?.message || "Failed to delete device");
    }
    setLoading(false);
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
      toast.error(
        error?.response?.data?.message || "Failed to Fetch the policy Data"
      );
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
      toast.error(error?.response?.data?.message || "Failed to apply policy");
    }
    console.log("Selected Policy ID:", selectedPolicyId);
    console.log("Selected Device IDs:", selectedIds);
    setActiveModal(null);
    setSelectedIds([]);
    setSelectedPolicyId(null);
    setReloadDevices((prev) => !prev);
  };

  const send_content_to_devices = async () => {
    if (!selectedContentIds) {
      toast.error("Please Select the Content to send");
      return;
    }
    try {
      const content_send_response = await axios.post(
        `${API_BASE_URL}/api/send_content_to_devices`,
        {
          content_ids: selectedContentIds,
          device_ids: selectedIds,
        }
      );
      console.log("content_send _response", content_send_response);

      if (content_send_response.data.status) {
        toast.success(content_send_response.data.message);
        setActiveModal(null);
        setSelectedContentIds([]);
        setSelectedIds([]);
      } else {
        toast.error(content_send_response.data.message);
      }
    } catch (error) {
      console.log("Falied to Send The Content", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
    console.log("selected devicesIds", selectedIds);
    console.log("selected contentIds", selectedContentIds);
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
      toast.error(
        error?.response?.data?.message || "Failed to send notification"
      );
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
      setSelectedIds(devicesList?.map((device) => device.device_id));
    }
  };

  // Toggle individual row checkbox
  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectOneContent = (id) => {
    setSelectedContentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isAllSelectedContent =
    selectedContentIds.length === contentList?.length;

  const toggleSelectAllContent = () => {
    if (isAllSelectedContent) {
      setSelectedContentIds([]);
    } else {
      setSelectedContentIds(contentList?.map((content) => content.content_id));
    }
  };

  console.log("contents=====", selectedContentIds);

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
  // const flattenDeviceData = (device) => ({
  //   MODEL: device?.model || "",
  //   MANUFACTURER: device?.manufacturer || "",
  //   "ANDROID VERSION": device?.android_version || "",
  //   "API LEVEL": device?.api_level || "",
  //   // cpu: device?.cpu || "",
  //   //gpu: device?.gpu || "",
  //   ARCHITECTURE: device?.architecture || "",
  //   "TOTAL RAM": device?.total_ram || "",
  //   "TOTAL STORAGE": device?.total_storage || "",
  //   // kernel_version: device?.kernel_version || "",
  //   // security_patch: device?.security_patch || "N/A",
  //   "SERIAL NO": device?.serial_no || "",
  //   // accelerometer: device?.accelerometer || "",
  //   // gyroscope: device?.gyroscope || "",
  //   // magnetometer: device?.magnetometer || "",
  //   // proximity: device?.proximity || "",
  //   // fingerprint: device?.fingerprint || "",
  //   // camera: device?.camera || "",
  //   // microphone:  toast.success(response.message);

  const toTitleCase = (str) =>
    str
      .toLowerCase()
      .replace(
        /\w\S*/g,
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      );

  const flattenDeviceData = (device) => {
    const data = {
      Model: device?.model || "",
      Manufacturer: device?.manufacturer || "",
      "Android Version": device?.android_version || "",
      "Api Level": device?.api_level || "",
      Architecture: device?.architecture || "",
      "Total Ram": device?.total_ram || "",
      "Total Storage": device?.total_storage || "",
      "Serial No": device?.serial_no || "",
      "Policy Name": device?.policy_name || "",
      "Policy Version": device?.policy_version || "",
    };

    // Optionally, apply formatting programmatically to all keys
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [toTitleCase(key), value])
    );
  };

  console.log("flattenedData", flattenDeviceData(devicesList[0]));

  console.log("deviceList=======", devicesList[0]);

  const getExportData = () => {
    const dataToExport =
      selectedIds.length > 0
        ? devicesList.filter((device) => selectedIds.includes(device.device_id))
        : devicesList;

    return dataToExport.map(flattenDeviceData);
  };
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
        doc.text(
          `Page ${pageCount}`,
          doc.internal.pageSize.getWidth() - 20,
          doc.internal.pageSize.getHeight() - 10
        );
      },
      horizontalPageBreak: false,
      // horizontalPageBreakRepeat: 0, // repeat headers
    });

    doc.save(fileName);
  };

  // const handelExportPdf = () => {
  //   const flatData = devicesList.map(flattenDeviceData);
  //   exportToPDF(flatData, "devices.pdf");
  // };

  const handleExportPdf = async () => {
    const exportData = getExportData();
    if (exportData.length === 0) {
      toast.error("No data available to export.");
      return;
    }
    await exportToPDF(exportData, "devices.pdf");
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

  const handleExportToExcel = () => {
    // const flatData = devicesList.map(flattenDeviceData);
    // const worksheet = XLSX.utils.json_to_sheet(flatData);
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Devices");
    // XLSX.writeFile(workbook, "devices.xlsx");
    const exportData = getExportData();
    if (exportData.length === 0) {
      toast.error("No data available to export.");
      return;
    }

    exportToExcel(exportData, "devices.xlsx");
  };

  return (
    <>
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

      {/*content Model*/}
      {/* 
      <Dialog
        open={activeModal === "Content"}
        onOpenChange={() => setActiveModal(null)}
      >
        <DialogContent>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-6  max-h-[80vh] overflow-y-auto"
          >
            <DialogHeader>
              <DialogTitle>Select Content</DialogTitle>
              <DialogDescription>
                Select a Contents for selected devices.
              </DialogDescription>
            </DialogHeader>

            <div>
              <div>
                <Checkbox
                  checked={isAllSelectedContent}
                  onCheckedChange={toggleSelectAllContent}
                  // className="border-gray-400 data-[state=checked]:bg-[#03A9FC]"
                />

                <Label>Select All{contentList?.length}</Label>
              </div>
              {contentList?.map((content, index) => (
                <div key={content.content_id}>
                  <Checkbox
                    // checked={selectedIds.includes(device.device_id)}
                    checked={selectedContentIds.includes(content.content_id)}
                    onCheckedChange={() =>
                      toggleSelectOneContent(content.content_id)
                    }
                    // className="border-gray-400 data-[state=checked]:bg-[#03A9FC]"
                  />

                  <Label> {content.filename}.{content.filetype}  ({content.size}mB)</Label>
                </div>
              ))}
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setActiveModal(null)}>
                Cancel
              </Button>
              <Button onClick={send_content_to_devices}>Send Content</Button>
            </DialogFooter>
          </motion.div>
        </DialogContent>
      </Dialog> */}

      <Dialog
        open={activeModal === "Content"}
        onOpenChange={() => setActiveModal(null)}
      >
        <DialogContent>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-6 max-h-[80vh] overflow-y-auto space-y-4"
          >
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Select Content
              </DialogTitle>
              <DialogDescription>
                Choose the contents you want to send to the selected devices.
              </DialogDescription>
            </DialogHeader>

            <div className="bg-gray-50 rounded-xl shadow p-4 space-y-4 border">
              {/* Select All */}
              <div className="flex items-center space-x-3 border-b pb-3">
                <Checkbox
                  checked={isAllSelectedContent}
                  onCheckedChange={toggleSelectAllContent}
                />
                <Label className="font-medium">
                  Select All ({contentList?.length})
                </Label>
              </div>

              {/* Content List */}
              <div className="space-y-3">
                {contentList?.map((content) => (
                  <div
                    key={content.content_id}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedContentIds.includes(content.content_id)
                        ? "bg-blue-50 border border-blue-300"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={selectedContentIds.includes(
                          content.content_id
                        )}
                        onCheckedChange={() =>
                          toggleSelectOneContent(content.content_id)
                        }
                      />
                      <Label className="text-sm font-medium">
                        {content.filename}.{content.filetype}
                      </Label>
                    </div>
                    <span className="text-xs text-gray-500">
                      {content.size} MB
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="mt-6 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setActiveModal(null)}>
                Cancel
              </Button>
              <Button onClick={send_content_to_devices}>Send Content</Button>
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
        <div className="sticky top-[80px] z-40 flex flex-col sm:flex-row justify-between items-center  bg-dark p-4 sm:p-4 sm:gap-0 gap-4   h-[68px] ">
          <div className="flex items-center gap-2 text-center">
            <img src={devices_icon} alt="" className="w-6 h-6 sm:w-7 sm:h-7" />
            <p className="text-white text-lg sm:text-xl font-semibold">
              Manage Devices
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <Button
              className="border border-[#787878] text-white px-4 py-2 sm:py-3 w-30 rounded-md cursor-pointer hover:bg-red-600 hover:scale-105 hover:border-transparent transition duration-200"
              onClick={handleExportPdf}
            >
              <svg
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.0833 1.72656L24.72 6.5599V24.9399H7.39917V24.9999H24.7792V6.62073L20.0833 1.72656Z"
                  fill="#909090"
                />
                <path
                  d="M20.0262 1.66699H7.34033V24.9403H24.7203V6.56116L20.0262 1.66699Z"
                  fill="#F4F4F4"
                />
                <path
                  d="M18.6668 5.33366C18.6668 6.80642 17.4729 8.00033 16.0002 8.00033H4.00016C2.5274 8.00033 1.3335 6.80642 1.3335 5.33366C1.3335 3.8609 2.5274 2.66699 4.00016 2.66699H16.0002C17.4729 2.66699 18.6668 3.8609 18.6668 5.33366Z"
                  fill="#241514"
                />
                <path
                  d="M18.1509 16.8796C18.1509 16.8796 20.8076 16.3979 20.8076 17.3054C20.8076 18.2129 19.1617 17.8437 18.1509 16.8796ZM16.1867 16.9487C15.7646 17.042 15.3533 17.1786 14.9592 17.3562L15.2926 16.6062C15.6259 15.8562 15.9717 14.8337 15.9717 14.8337C16.3695 15.5032 16.8323 16.1318 17.3534 16.7104C16.9604 16.769 16.5709 16.8491 16.1867 16.9504V16.9487ZM15.1351 11.5321C15.1351 10.7412 15.3909 10.5254 15.5901 10.5254C15.7892 10.5254 16.0134 10.6212 16.0209 11.3079C15.956 11.9984 15.8114 12.679 15.5901 13.3362C15.2868 12.7844 15.1299 12.1642 15.1342 11.5346L15.1351 11.5321ZM11.2609 20.2954C10.4459 19.8079 12.9701 18.3071 13.4276 18.2587C13.4251 18.2596 12.1142 20.8054 11.2609 20.2954ZM21.5834 17.4129C21.5751 17.3296 21.5001 16.4071 19.8584 16.4462C19.1741 16.4352 18.4902 16.4835 17.8142 16.5904C17.1595 15.9307 16.5956 15.1867 16.1376 14.3779C16.4261 13.5441 16.6008 12.6751 16.6567 11.7946C16.6326 10.7946 16.3934 10.2212 15.6267 10.2296C14.8601 10.2379 14.7484 10.9087 14.8492 11.9071C14.948 12.578 15.1343 13.233 15.4034 13.8554C15.4034 13.8554 15.0492 14.9579 14.5809 16.0546C14.1126 17.1512 13.7926 17.7262 13.7926 17.7262C12.9782 17.9914 12.2115 18.3852 11.5217 18.8929C10.8351 19.5321 10.5559 20.0229 10.9176 20.5137C11.2292 20.9371 12.3201 21.0329 13.2951 19.7554C13.8131 19.0956 14.2864 18.4018 14.7117 17.6787C14.7117 17.6787 16.1984 17.2712 16.6609 17.1596C17.1234 17.0479 17.6826 16.9596 17.6826 16.9596C17.6826 16.9596 19.0401 18.3254 20.3492 18.2771C21.6584 18.2287 21.5951 17.4946 21.5867 17.4146"
                  fill="#DD2025"
                />
                <path
                  d="M19.9617 1.73047V6.62464H24.6558L19.9617 1.73047Z"
                  fill="#909090"
                />
                <path
                  d="M20.0259 1.66699V6.56116H24.72L20.0259 1.66699Z"
                  fill="#F4F4F4"
                />
                <path
                  d="M7.74636 4.00838H6.66675V6.6639H7.5192V5.76877L7.70753 5.77596C7.88973 5.77386 8.07021 5.752 8.24197 5.71123C8.39254 5.67653 8.53107 5.62176 8.64919 5.55024C8.76848 5.48191 8.86237 5.39592 8.92343 5.29907C9.00628 5.1378 9.03587 4.96641 9.01017 4.79673C9.00501 4.67553 8.97328 4.55548 8.916 4.44045C8.86386 4.35742 8.78647 4.28256 8.68877 4.22065C8.59107 4.15874 8.4752 4.11113 8.34852 4.08085C8.2385 4.05404 8.12478 4.03458 8.00903 4.02276C7.92182 4.01375 7.83376 4.00894 7.74553 4.00838M7.58941 5.27749H7.5159V4.45871H7.67614C7.7465 4.45531 7.81711 4.46255 7.88273 4.47988C7.94836 4.49721 8.00733 4.5242 8.05529 4.55884C8.15467 4.64792 8.20776 4.75635 8.20645 4.86755C8.20645 5.00364 8.20645 5.12702 8.02307 5.21387C7.89096 5.26254 7.74059 5.28445 7.59024 5.27694M10.6217 4.00118C10.53 4.00118 10.4408 4.00561 10.3781 4.00727L10.1839 4.01059H9.53964V6.66611H10.2979C10.5877 6.67143 10.8762 6.63854 11.1471 6.56929C11.3651 6.51138 11.5581 6.41803 11.7088 6.29766C11.8553 6.1762 11.9604 6.03478 12.0169 5.88329C12.0818 5.71171 12.1134 5.53525 12.111 5.35827C12.1271 5.14923 12.1029 4.93968 12.0392 4.73477C11.9787 4.58394 11.8654 4.44493 11.7088 4.32925C11.5859 4.23585 11.4354 4.1605 11.2669 4.10796C11.1221 4.0631 10.9699 4.03004 10.8134 4.00948C10.7511 4.0026 10.6881 3.99945 10.625 4.00008M10.4747 6.17816H10.3921V4.48305H10.4028C10.5731 4.46993 10.7454 4.49051 10.8984 4.54225C11.0105 4.60218 11.1018 4.67768 11.1661 4.76354C11.2354 4.8539 11.2754 4.95308 11.2834 5.05454C11.2908 5.17625 11.2834 5.27583 11.2834 5.35827C11.2867 5.45322 11.2776 5.54819 11.2561 5.64208C11.2307 5.73846 11.1836 5.83172 11.1165 5.91869C11.0406 5.99955 10.938 6.06768 10.8167 6.11786C10.7148 6.162 10.5941 6.1826 10.473 6.1765M14.6667 4.01059H12.6595V6.66611H13.5087V5.61275H14.5825V5.11927H13.5087V4.50407H14.6651V4.01059"
                  fill="white"
                />
              </svg>
              PDF
            </Button>
            <Button
              className="border border-[#787878] text-white px-4 py-2 sm:py-3 w-30 rounded-md cursor-pointer hover:bg-green-600 hover:scale-105 hover:border-transparent transition duration-200"
              onClick={handleExportToExcel}
            >
              <svg
                width="29"
                height="28"
                viewBox="0 0 29 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M25.5164 3.85425H16.6526V1.76562L2.08301 4.01437V23.7255L16.6526 26.235V23.1392H25.5164C25.7848 23.1528 26.0477 23.0596 26.2476 22.8799C26.4475 22.7002 26.5681 22.4486 26.583 22.1803V4.81237C26.5679 4.54415 26.4472 4.29283 26.2473 4.1133C26.0475 3.93378 25.7847 3.84064 25.5164 3.85425ZM25.6564 22.3395H16.6229L16.608 20.6866H18.7841V18.7616H16.5914L16.5809 17.6241H18.7841V15.6991H16.5643L16.5538 14.5616H18.7841V12.6366H16.5468V11.4991H18.7841V9.57413H16.5468V8.43663H18.7841V6.51162H16.5468V4.76162H25.6564V22.3395Z"
                  fill="white"
                />
                <path
                  d="M20.0088 6.50977H23.7914V8.43477H20.0088V6.50977ZM20.0088 9.57314H23.7914V11.4981H20.0088V9.57314ZM20.0088 12.6365H23.7914V14.5615H20.0088V12.6365ZM20.0088 15.6999H23.7914V17.6249H20.0088V15.6999ZM20.0088 18.7633H23.7914V20.6883H20.0088V18.7633Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.88683 9.34034L7.76458 9.23271L8.94495 12.4781L10.3397 9.09884L12.2175 8.99121L9.9372 13.599L12.2175 18.2181L10.2321 18.0842L8.89158 14.5632L7.55021 17.9503L5.72583 17.7893L7.84508 13.7092L5.88683 9.34034Z"
                  fill="#198754"
                />
              </svg>
              EXCEL
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                // className={`group border border-[#787878] text-white px-4 py-2 sm:py-3 w-30 rounded-md cursor-pointer
                //  hover:bg-white hover:text-black hover:scale-105 hover:border-transparent transition duration-200`}
                 className={`group border px-4 py-2 sm:py-3 w-30 rounded-md cursor-pointer transition duration-200
    ${
      selectedIds.length > 0
        ? "bg-[#ffd56a] text-black border-transparent hover:scale-105 hover:text-black hover:bg-white"
        : "border-[#787878] text-white hover:bg-white hover:text-black hover:scale-105 hover:border-transparent"
    }
  `}
                 >
                  <svg
                    width="20"
                    height="10"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                   className={`transition duration-200 group-hover:fill-black ${
    selectedIds.length > 0 ? "fill-black" : "fill-white"
  }`}
                  >
                    <path d="M11 3C13.21 3 15 4.79 15 7C15 8.5 14.2 9.77 13 10.46V9.24C13.61 8.69 14 7.89 14 7C14 5.34 12.66 4 11 4C9.34 4 8 5.34 8 7C8 7.89 8.39 8.69 9 9.24V10.46C7.8 9.77 7 8.5 7 7C7 4.79 8.79 3 11 3ZM18 18.5C17.97 19.32 17.32 19.97 16.5 20H11C10.62 20 10.26 19.85 10 19.57L6 15.37L6.74 14.6C6.93 14.39 7.2 14.28 7.5 14.28H7.7L10 16V7C10 6.45 10.45 6 11 6C11.55 6 12 6.45 12 7V11.47L13.21 11.6L17.15 13.79C17.68 14.03 18 14.56 18 15.14V18.5ZM18 0H2C0.9 0 0 0.9 0 2V10C0 10.5304 0.210714 11.0391 0.585786 11.4142C0.960859 11.7893 1.46957 12 2 12H6V10H2V2H18V10H16V12H18V11.96L18.04 12C19.13 12 20 11.09 20 10V2C20 1.46957 19.7893 0.960859 19.4142 0.585786C19.0391 0.210714 18.5304 0 18 0Z" />
                  </svg>
                  Actions
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-white text-black shadow-lg rounded-md p-2 w-52 mr-0 sm:mr-7 mt-2 sm:mt-5">
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
                    className="flex items-center rounded hover:bg-gray-100 gap-2 px-2 py-2 cursor-pointer"
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

        <div className="w-full py-1">
          <div className="hidden sm:block overflow-x-auto">
            {/* Standard table for tablets and up */}
            <Table className="table-auto border-separate border-spacing-y-2 w-full text-sm sm:text-base">
              {/* <TableCaption className="mb-4 text-gray-600">
                A list of all Devices.
              </TableCaption> */}
              <TableHeader>
                <TableRow className="bg-[#03A9FC] text-white rounded-md">
                  <TableHead className="w-12 text-center">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={toggleSelectAll}
                      className="border-white rounded-full w-5 h-5 bg-white data-[state=checked]:bg-[#03A9FC]"
                    />
                  </TableHead>
                  <TableHead className="py-4 text-white text-center">
                    Serial No.
                  </TableHead>
                  <TableHead className="py-4 text-white text-center">
                    Device ID
                  </TableHead>
                  <TableHead className="py-4 text-white text-center">
                    Model
                  </TableHead>
                  <TableHead className="py-4 text-white text-center">
                    Policy Name
                  </TableHead>
                  <TableHead className="py-4 text-white text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {status === "loading" || loading
                  ? Array(5)
                      .fill()
                      .map((_, index) => (
                        <TableRow
                          key={index}
                          className="bg-white shadow-sm hover:bg-gray-200 animate-pulse rounded-lg"
                        >
                          {[...Array(6)].map((_, i) => (
                            <TableCell key={i} className="py-4 text-center">
                              <div className="h-4 bg-gray-200 rounded w-full"></div>
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                  : devicesList?.map((device, index) => (
                    
                      <TableRow
                        key={index}
                        className={` cursor-pointer bg-white shadow-sm transition-colors duration-200 rounded-lg hover:bg-blue-50 ${
                          selectedIds.includes(device.device_id)
                            ? "bg-blue-100"
                            : ""
                        }`}
                        onClick={()=>navigate("/devices-details",{state:{device}})}
                      >
                        <TableCell className="text-center">
                          <Checkbox
                            checked={selectedIds.includes(device.device_id)}
                            onCheckedChange={() =>
                              toggleSelectOne(device.device_id)
                            }
                            className="border-gray-400 rounded-full w-5 h-5 data-[state=checked]:bg-[#03A9FC]"
                            onClick={(e)=> e.stopPropagation()}
                          />
                        </TableCell>
                        <TableCell className="py-4 text-center font-mono">
                          {device.serial_no}
                        </TableCell>
                        <TableCell className="py-4 text-center">
                          {device.device_id}
                        </TableCell>
                        <TableCell className="py-4 text-center">
                          {device.model}
                        </TableCell>
                        <TableCell className="py-4 text-center">
                          {device.policy_name || "-"}
                        </TableCell>
                        <TableCell className="py-4 text-center">
                          <div className="flex justify-center gap-4">
                            <Link
                              to="/devices-details"
                              state={{ device }}
                              className="text-[#03A9FC] hover:text-blue-800 hover:scale-105 transition"
                              title="View Device Details"
                              onClick={(e)=> e.stopPropagation()}
                            >
                              <Eye size={20} />
                            </Link>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                delete_enroll_devices(device)}}
                              className="text-red-600 hover:text-red-800 hover:scale-105 transition"
                              title="Delete Device"
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
                    colSpan={6}
                    className="text-center text-sm text-muted-foreground "
                  >
                    Showing {devicesList.length} device
                    {devicesList.length !== 1 ? "s" : ""}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>

          {/* Mobile Version - Cards */}
          <div className="sm:hidden space-y-4">
            {devicesList?.map((device, index) => (
              <div
                key={index}
                className={`rounded-xl border shadow-sm p-4 ${
                  selectedIds.includes(device.device_id)
                    ? "bg-blue-50"
                    : "bg-white"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <Checkbox
                    checked={selectedIds.includes(device.device_id)}
                    onCheckedChange={() => toggleSelectOne(device.device_id)}
                    className="border-gray-400 data-[state=checked]:bg-[#03A9FC]"
                  />
                  <div className="flex gap-4">
                    <Link
                      to="/devices-details"
                      state={{ device }}
                      className="text-blue-600 hover:text-blue-800"
                      title="View"
                    >
                      <Eye size={20} />
                    </Link>
                    <button
                      onClick={() => delete_enroll_devices(device)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="text-sm">
                  <div>
                    <span className="font-semibold">Serial No:</span>{" "}
                    {device.serial_no}
                  </div>
                  <div>
                    <span className="font-semibold">Device ID:</span>{" "}
                    {device.device_id}
                  </div>
                  <div>
                    <span className="font-semibold">Model:</span> {device.model}
                  </div>
                  <div>
                    <span className="font-semibold">Policy:</span>{" "}
                    {device.policy_name || "-"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageDevices;
