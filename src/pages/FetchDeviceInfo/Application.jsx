import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Permission from "./Permission";
import { Download } from "lucide-react";
import axios from "axios";
import { saveAs } from "file-saver";

const Application = ({ details }) => {
  const data = details.application;
  console.log("package_name", data);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleMoreClick = (item) => {
    setSelectedApp(item);
    setIsModalOpen(true);
  };

  const downloadApk = async (packageName) => {
    try {
      setProcessing(true);
      const response = await axios.post(
        `${API_BASE_URL}/api/get_apk`,
        { package: packageName },
        {
          responseType: "blob", // Important: ensures binary data
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const bolb = new Blob([response.data], {
        type: "application/vnd.android.package-archive",
      });
      const filename = `${packageName.replace(/\./g, "_")}.apk`;
      saveAs(bolb, filename);
    } catch (error) {
      console.error("Error downloading APK:", error);
    }
    setProcessing(false);
  };

  return (
 
    <div className="p-8 relative">
      <h1 className="text-2xl font-bold mb-4">Applications</h1>
      <p className="text-gray-500 mb-4">
        List of applications installed on the device.
      </p>
       {processing && (
  <div className="fixed inset-0 bg-white bg-opacity-70 backdrop-blur-sm flex flex-col items-center justify-center z-50 transition-opacity duration-300">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
    <p className="mt-4 text-gray-700 text-base font-medium">Downloading APK...</p>
  </div>
)}

 {/* {processing && (
    <div className="absolute inset-0 bg-white bg-opacity-60 backdrop-blur-sm flex flex-col items-center justify-center z-20">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
      <p className="mt-2 text-sm text-gray-700 font-medium">Downloading APK...</p>
    </div>
  )} */}
      <Table className={processing ? "opacity-50 pointer-events-none" : ""}>
        <TableHeader>
          <TableRow className="text-lg ">
            <TableHead className="text-black">Sr. No</TableHead>
            <TableHead className="text-black">App Name</TableHead>
            <TableHead className="text-black">Version</TableHead>
            <TableHead className="text-black">Source</TableHead>
            <TableHead className="text-black">More</TableHead>
            <TableHead className="text-black">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className="">
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {item.package_name
                  .split(".")
                  .at(-1)
                  .replace(/^./, (c) => c.toUpperCase())}
              </TableCell>

              <TableCell>{item.app_version}</TableCell>
              <TableCell>{item.package_name}</TableCell>
              <TableCell>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleMoreClick(item)}
                >
                  More
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => downloadApk(item.package_name)}
                  className="hover:bg-red-800 p-4 "
                  disabled={processing}
                >
                  <Download className=" h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Permission
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedApp}
      />
    </div>
  );
};

export default Application;
