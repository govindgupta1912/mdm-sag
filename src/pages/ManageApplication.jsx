import { Link } from "react-router-dom";
import application from "../assets/application.png";
import apk from "../assets/apk.png";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "react-toastify";
import { Card } from "@/components/ui/card";
import { fetchApplications } from "@/utilites/store/slices/applicationsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

const ManageApplication = () => {
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [appTitle, setAppTitle] = useState("");
  // const [packageName, setPackageName] = useState("");
  // const [version, setVersion] = useState("");
  const [apkFile, setApkFile] = useState(null);
  const [isVpnApp, setIsVpnApp] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [edittingApp, setEdittingApp] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const {
    data: apps,
    status,
    error,
  } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  //   if (!appTitle || !packageName || !version || !apkFile) {
  //     //alert("Please fill in all the fields and upload the APK file.");
  //     toast.error("Please fill in all the fields to add the APK");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("title", appTitle);
  //   formData.append("package_name", packageName);
  //   formData.append("version", version);
  //   formData.append("is_vpn_app", isVpnApp);
  //   if (apkFile) {
  //     formData.append("apk_file", apkFile);
  //   }

  //   console.log("Form Data:", {
  //     title: appTitle,
  //     packageName,
  //     version,
  //     isVpnApp,
  //     apkFile,
  //   });
  //   console.log("Form Data==========:", formData);

  //   toast.success("APP IS ADDED SUCCESSFULLY");

  //   // You can replace this console with an API call
  //   //axios.post("/api/upload_app", formData)

  //     axios.post(`${API_BASE_URL}/api/upload_app``, formData)
  //     .then(() => {
  //       toast.success("APP IS ADDED SUCCESSFULLY");
  //       dispatch(fetchApplications()); // fetch fresh list
  //       setOpen(false); // close modal
  //     })
  //     .catch((error) => {
  //       toast.error("Failed to add app");
  //     });

  //   setOpen(false);
  // };

  console.log("apps=============", apps);
  const openeditDialog = (app) => {
    setIsEditMode(true);
    setEdittingApp(app);
    setAppTitle(app.app_name);
    // setPackageName(app.package_name);
    // setVersion(app.version_name);
    setIsVpnApp(app.is_vpn_app);
    setApkFile(null); // Reset the file input
    setOpen(true);
  };

  const handleSave = () => {
    if (!appTitle || (!apkFile && !isEditMode)) {
      toast.error("Please fill in all the fields to add the APK");
      return;
    }
    setProcessing(true); // Set processing to true when starting the upload
    const formData = new FormData();
    formData.append("app_name", appTitle);
    // formData.append("package_name", packageName);
    // formData.append("version", version);
    formData.append("is_vpn_app", isVpnApp);

    if (apkFile) {
      formData.append("apk_file", apkFile);
    }
    if (isEditMode && edittingApp) {
      formData.append("app_id", edittingApp.app_id);
    }
    console.log("Form Data Contents:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const url = isEditMode
      ? `${API_BASE_URL}/api/update_application`
      : `${API_BASE_URL}/api/add_application`;
    axios
      .post(url, formData)
      .then((response) => {
        // toast.success("APP IS ADDED SUCCESSFULLY");
        // dispatch(fetchApplications()); // refresh the list
        // setOpen(false); // close the modal
        console.log("response==========", response);

        if (response.data.status === true) {
          toast.success(
            isEditMode
              ? "APP IS UPDATED SUCCESSFULLY"
              : "APP IS ADDED SUCCESSFULLY"
          );
          dispatch(fetchApplications());
          setOpen(false);
          resetForm(); // Reset form fields
        } else {
          toast.error(response.data.message || "Failed to add app");
        }
      })
      .catch((error) => {
        console.error("Upload failed:", error);
        toast.error("Failed to Process the request");
      })
      .finally(() => {
        setProcessing(false); // Set processing to false when done
        // // Reset form fields
        // setAppTitle("");
        // setPackageName("");
        // setVersion("");
        // setApkFile(null);
        // setIsVpnApp(false);
        //setOpen(false); // close the modal
      });
  };

  const resetForm = () => {
    setAppTitle("");
    //setPackageName("");
    //setVersion("");
    setApkFile(null);
    setIsVpnApp(false);
    setIsEditMode(false);
    setEdittingApp(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const deleteApp = async (app_id) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/delete_application`,
        { app_id: app_id }
      );
      console.log("Delete response:", response);
      if (response.data.status) {
        toast.success("App deleted successfully");
        dispatch(fetchApplications());
      } else {
        toast.error("Failed to delete app");
      } // refresh the list
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete app");
    }
  };

  return (
    <div>
      <div className="flex justify-between bg-black p-6 items-center">
        <div className="flex text-white text-2xl font-bold">
          <img src={application} alt="" />
          <h1>Manage Application</h1>
        </div>
        {/* ADD Application Modal*/}

        <Dialog
          open={open}
          onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) {
              resetForm();
            }
          }}
        >
          <DialogTrigger asChild>
            <Button
              variant="outline"
              onClick={() => setOpen(true)}
              className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-md shadow-sm"
            >
              <Plus size={30} className="text-black" />
            </Button>
          </DialogTrigger>

          <DialogContent className="w-full sm:max-w-[500px] rounded-2xl shadow-2xl p-6 ">
            {processing && (
              // <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
              //   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              //     <radialGradient
              //       id="a1"
              //       cx=".66"
              //       fx=".66"
              //       cy=".3125"
              //       fy=".3125"
              //       gradientTransform="scale(1.5)"
              //     >
              //       <stop offset="0" stop-color="#091C35"></stop>
              //       <stop
              //         offset=".3"
              //         stopcolor="#091C35"
              //         stop-opacity=".9"
              //       ></stop>
              //       <stop
              //         offset=".6"
              //         stop-color="#091C35"
              //         stop-opacity=".6"
              //       ></stop>
              //       <stop
              //         offset=".8"
              //         stop-color="#091C35"
              //         stop-opacity=".3"
              //       ></stop>
              //       <stop
              //         offset="1"
              //         stop-color="#091C35"
              //         stop-opacity="0"
              //       ></stop>
              //     </radialGradient>
              //     <circle
              //       transform-origin="center"
              //       fill="none"
              //       stroke="url(#a1)"
              //       stroke-width="7"
              //       stroke-linecap="round"
              //       stroke-dasharray="200 1000"
              //       stroke-dashoffset="0"
              //       cx="100"
              //       cy="100"
              //       r="20"
              //     >
              //       <animateTransform
              //         type="rotate"
              //         attributeName="transform"
              //         calcMode="spline"
              //         dur="1.8"
              //         values="0;360"

              //         keyTimes="0;1"
              //         keySplines="0 0 1 1"
              //         repeatCount="indefinite"
              //       ></animateTransform>
              //     </circle>
              //     <circle
              //       transform-origin="center"
              //       fill="none"
              //       opacity=".2"
              //       stroke="#091C35"
              //       stroke-width="7"
              //       stroke-linecap="round"
              //       cx="100"
              //       cy="100"
              //       r="20"
              //     ></circle>
              //   </svg>
              // </div>
              <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col gap-4 items-center justify-center z-50">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500"></div>
                <p className="text-sm text-gray-700 font-medium">
                  Uploading APK...
                </p>
              </div>
            )}

            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">
                Add New Application
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                Fill in the details to create a new app.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              <div>
                <Label
                  htmlFor="title"
                  className="text-sm mb-1 block text-gray-700"
                >
                  App Title
                </Label>
                <Input
                  id="title"
                  value={appTitle}
                  onChange={(e) => setAppTitle(e.target.value)}
                  placeholder="e.g. WhatsApp"
                  className="rounded-xl"
                  required
                />
              </div>

              {/* <div>
                <Label
                  htmlFor="packageName"
                  className="text-sm mb-1 block text-gray-700"
                >
                  Package Name
                </Label>
                <Input
                  id="packageName"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  placeholder="e.g. com.whatsapp"
                  className="rounded-xl"
                />
              </div>

              <div>
                <Label
                  htmlFor="version"
                  className="text-sm mb-1 block text-gray-700"
                >
                  Version
                </Label>
                <Input
                  id="version"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  placeholder="e.g. 2.1.0"
                  className="rounded-xl"
                />
              </div> */}

              <div>
                <Label
                  htmlFor="apkFile"
                  className="text-sm mb-1 block text-gray-700"
                >
                  Upload APK File
                </Label>
                <label className="flex items-center justify-center px-4 py-2 border border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-blue-500 transition">
                  <span className="text-sm text-gray-500">
                    {apkFile ? apkFile.name : "Click to upload .apk file"}
                  </span>
                  <input
                    type="file"
                    id="apkFile"
                    accept=".apk"
                    ref={fileInputRef}
                    onChange={(e) => setApkFile(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="vpn" className="text-sm text-gray-700">
                  VPN App
                </Label>
                <Switch
                  id="vpn"
                  checked={isVpnApp}
                  onCheckedChange={setIsVpnApp}
                />
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button
                onClick={handleSave}
                className="w-full text-base py-2 rounded-xl"
                disabled={processing}
              >
                Save Application
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 p-6">
        <div>
          <div className="flex flex-col items-center p-4 bg-white">
            <img src={apk} alt="" />
            <h1 className="text-xl font-bold">Whatshapp</h1>
            <h2 className="text-[#767676]">com.Whatshapp</h2>
            <h3 className="text-[#767676]">2.00</h3>
          </div>
          <div className="flex items-center">
            <button className="bg-green-600 text-white p-4 h-10 w-44 flex items-center justify-center ">
              Update
            </button>
            <button className="bg-red-600 text-white p-4 h-10 w-44 flex items-center justify-center">
              Delete
            </button>
          </div>
        </div>
      </div> */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {/* App Cards */}

          {status === "loading" &&
            Array(12)
              .fill()
              .map((_, index) => (
                <div key={index} className="flex flex-col space-y-3">
                  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
          {status === "failed" && <p>Error: {error}</p>}
          {status === "succeeded" &&
            apps.map((app, index) => (
              <div key={index}>
                <div className="flex flex-col items-center p-4 bg-white  shadow-md max-w-sm w-full">
                  <img
                    className="h-20 w-20 sm:h-20 sm:w-20 rounded-full"
                    src={app.icon ? `data:image/png;base64,${app.icon}` : apk}
                    alt=""
                  />
                  <h1 className="text-lg sm:text-xl font-bold">
                    {app.app_name}
                  </h1>
                  <h2 className="text-sm sm:text-lg text-[#767676]   truncate max-w-full overflow-hidden text-center">
                    {app.package_name}
                  </h2>
                  <h3 className="text-sm sm:text-lg text-[#767676]  truncate max-w-full overflow-hidden text-center">
                    {app.version_name}
                  </h3>
                </div>
                <div className="flex flex-col sm:flex-row items-center  ">
                  <button
                    className="bg-green-600 text-white px-4 py-2 w-full sm:w-1/2 rounded hover:bg-green-800"
                    onClick={() => openeditDialog(app)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 w-full sm:w-1/2 rounded hover:bg-red-800"
                    onClick={() => deleteApp(app.app_id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManageApplication;
