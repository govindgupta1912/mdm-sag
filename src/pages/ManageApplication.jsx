import { Link } from "react-router-dom";
import application from "../assets/application.png";
import apk from "../assets/apk.png";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
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
import { fetchApplications } from "@/utilites/applicationsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";

const ManageApplication = () => {
  const [open, setOpen] = useState(false);
  const [appTitle, setAppTitle] = useState("");
  const [packageName, setPackageName] = useState("");
  const [version, setVersion] = useState("");
  const [apkFile, setApkFile] = useState(null);
  const [isVpnApp, setIsVpnApp] = useState(false);

  const dispatch = useDispatch();
  const {
    data: apps,
    status,
    error,
  } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  const handleSave = () => {
    if (!appTitle || !packageName || !version || !apkFile) {
      //alert("Please fill in all the fields and upload the APK file.");
      toast.error("Please fill in all the fields to add the APK");
      return;
    }

    const formData = new FormData();
    formData.append("title", appTitle);
    formData.append("package_name", packageName);
    formData.append("version", version);
    formData.append("is_vpn_app", isVpnApp);
    if (apkFile) {
      formData.append("apk_file", apkFile);
    }

    console.log("Form Data:", {
      title: appTitle,
      packageName,
      version,
      isVpnApp,
      apkFile,
    });
    toast.success("APP IS ADDED SUCCESSFULLY");

    // You can replace this console with an API call
    // axios.post("/api/upload_app", formData)

    // axios
    //   .post("/api/upload_app", formData)
    //   .then(() => {
    //     toast.success("APP IS ADDED SUCCESSFULLY");
    //     dispatch(fetchApplications()); // fetch fresh list
    //     setOpen(false); // close modal
    //   })
    //   .catch((error) => {
    //     toast.error("Failed to add app");
    //   });

    setOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between bg-black p-6 items-center">
        <div className="flex text-white text-2xl font-bold">
          <img src={application} alt="" />
          <h1>Manage Application</h1>
        </div>
        {/* ADD Application Modal*/}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              onClick={() => setOpen(true)}
              className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-md shadow-sm"
            >
              <Plus size={30} className="text-black" />
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px] rounded-2xl shadow-2xl p-6">
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

              <div>
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
              </div>

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
              >
                Save Application
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 p-6">
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
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 p-6">
        {status === "loading" && (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        )}
        {status === "failed" && <p>Error: {error}</p>}
        {status === "succeeded" &&
          apps.map((app, index) => (
            <div key={index}>
              <div className="flex flex-col items-center p-4 bg-white">
                <img src={apk} alt="" />
                <h1 className="text-xl font-bold">{app.title}</h1>
                <h2 className="text-[#767676]">{app.package_name}</h2>
                <h3 className="text-[#767676]">{app.version}</h3>
              </div>
              <div className="flex items-center">
                <button className="bg-green-600 text-white p-4 h-10 w-44 flex items-center justify-center"
                >
                  Update
                </button>
                <button className="bg-red-600 text-white p-4 h-10 w-44 flex items-center justify-center">
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div> */}
    </div>
  );
};

export default ManageApplication;
