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
import devices from "../assets/devices.png";
import { Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const ManageDevices = () => {
  const devicesList = [
    {
      id: "RZ25OPULZ",
      deviceName: "Microsoft",
      model: "Royal",
      policyName: "Office IT Policy",
      lastSynced: "2024-09-24 15:01:44",
    },
    {
      id: "RZ25OPULx",
      deviceName: "Microsoft",
      model: "Royal",
      policyName: "Office IT Policy",
      lastSynced: "2024-09-24 15:01:44",
    },
    {
      id: "RZ25OPULf",
      deviceName: "Microsoft",
      model: "Royal",
      policyName: "Office IT Policy",
      lastSynced: "2024-09-24 15:01:44",
    },
    {
      id: "RZ25OPULs",
      deviceName: "Microsoft",
      model: "Royal",
      policyName: "Office IT Policy",
      lastSynced: "2024-09-24 15:01:44",
    },
    {
      id: "RZ25OPULr",
      deviceName: "Microsoft",
      model: "Royal",
      policyName: "Office IT Policy",
      lastSynced: "2024-09-24 15:01:44",
    },
    {
      id: "RZ25OPULa",
      deviceName: "Microsoft",
      model: "Royal",
      policyName: "Office IT Policy",
      lastSynced: "2024-09-24 15:01:44",
    },
    {
      id: "RZ25OPULq",
      deviceName: "Microsoft",
      model: "Royal",
      policyName: "Office IT Policy",
      lastSynced: "2024-09-24 15:01:44",
    },
    {
      id: "RZ25OPULp",
      deviceName: "Microsoft",
      model: "Royal",
      policyName: "Office IT Policy",
      lastSynced: "2024-09-24 15:01:44",
    },
  ];


  const [selectedIds, setSelectedIds] = useState([]);

  const isAllSelected = selectedIds.length === devicesList.length;

  // Toggle all checkboxes
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(devicesList.map((device) => device.id));
    }
  };

  // Toggle individual row checkbox
  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };


  return (
    <div>
      <div className="flex justify-between items-center bg-black p-6 ">
        <div className="flex justify-start gap-2 bg-black text-center">
          <img src={devices} alt="" />
          <p className="text-white text-2xl font-bold">Manage Devices</p>
        </div>
        {/* <button className="border border-white text-white px-4 py-2 hover:bg-white hover:text-black">
          Actions
        </button> */}
        <Select>
      <SelectTrigger className="w-[180px]  text-white px-4 py-2 hover:bg-white hover:text-black">
        <SelectValue placeholder="Actions" className="text-white" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
       
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
            {devicesList.map((policy, index) => (
              <TableRow
                key={index}
                // className=" bg-white shadow-sm hover:bg-gray-200"
                className={`bg-white shadow-sm hover:bg-gray-200 ${
                  selectedIds.includes(policy.id) ? 'bg-blue-50' : ''
                }`}
              >
                <TableCell className="text-center">
                  {/* Individual Checkbox */}
                  <Checkbox
                    checked={selectedIds.includes(policy.id)}
                    onCheckedChange={() => toggleSelectOne(policy.id)}
                    className="border-gray-400 data-[state=checked]:bg-[#03A9FC]"
                  />
                </TableCell>
                <TableCell className="py-4 font-mono ">{policy.id}</TableCell>
                <TableCell className="py-4 ">{policy.deviceName}</TableCell>
                <TableCell className="py-4  ">{policy.model}</TableCell>
                <TableCell className="py-4 ">{policy.policyName}</TableCell>
                <TableCell className="py-4">{policy.lastSynced}</TableCell>
                <TableCell className="py-4 flex gap-4 justify-end w-[120px] items-center">
                  <Link
                    className="text-blue-600 hover:text-blue-800"
                    to={"/devices-details"}
                  >
                    <Eye size={20} />
                  </Link>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={20} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-sm text-muted-foreground"
              >
                Showing {devicesList.length} policies
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default ManageDevices;
