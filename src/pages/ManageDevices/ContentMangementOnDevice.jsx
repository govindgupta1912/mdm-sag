import { Card } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiDelete } from "react-icons/fi";
import { BiSolidBookContent } from "react-icons/bi";
import { Button } from "@/components/ui/button";

const API_BASE_URL = window._env_ .VITE_API_BASE_URL;

const ContentMangementOnDevice = ({ device_id }) => {
  const [content, setContent] = useState([]);
  const fetch_content_on_device = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/content_on_device`,
        {
          device_id: device_id,
        }
      );
      console.log("Content_on_device", response.data);

      if (response.data.status) {
        setContent(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // toast.error(
      //   error?.response?.data?.message || "Error while fteching the content"
      // );
      console.log("Error while fetching content on device:", error);
      
    }
  };

  useEffect(() => {
    fetch_content_on_device();
  }, []);
  console.log("Content_on_devices======", content);

  const delete_content_on_device = async (content_id) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/delete_content_from_device`,
        {
          device_id: device_id,
          content_id: content_id,
        }
      );

      if (response.data.status) {
        toast.success(response.data.message || "Content deleted successfully");
        // Refresh the content list after deletion
        setContent((prevContent) =>
          prevContent.filter((item) => item.content_id !== content_id)
        );
       // fetch_content_on_device();
      } else {
        toast.error(
          response.data.message || "Failed to Delete the Content On device"
        );
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error editing content");
    }
  };
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
        <BiSolidBookContent className="text-blue-500" size={24} />
        <span>Total Files: {content.length}</span>
      </div>

      {/* File Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[500px] overflow-y-auto pr-2">
        {content.map((contentItem) => (
          <Card
            key={contentItem.content_id}
            className="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-base font-semibold truncate w-full">
                <BiSolidBookContent className="text-blue-500" />
                <span className="truncate">{contentItem.filename}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700"
                onClick={() => delete_content_on_device(contentItem.content_id)}
              >
                <FiDelete size={18} />
              </Button>
            </div>

            <p className="text-sm text-gray-600 mb-1 truncate">
              <span className="font-medium text-gray-700">Path:</span>{" "}
              {contentItem.path}
            </p>

            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium text-gray-700">Size:</span>{" "}
              {contentItem.size} MB
            </p>

            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-700">Added on:</span>{" "}
              {contentItem.created_on}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContentMangementOnDevice;
