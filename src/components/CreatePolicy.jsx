import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import enroll from "../assets/enroll.png";
import SecurityTab from "./tabs/SecurityTab";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeviceTab from "./tabs/DeviceTab";
import { resetPolicyData, setPolicyData } from "@/utilites/policySlice";
import NetworkTab from "./tabs/NetworkTab";
import AppTab from "./tabs/AppTab";
import { TableDemo } from "./PolicyTable";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Main Page
const CreatePolicy = () => {
  // const [policyData, setPolicyData] = useState({
  //   disabledLocation: false,
  //   disableFactoryReset: false,
  //   disableMicrophone: false,
  //   disableBluetooth: false,
  //   disableKeyguard: false,
  //   disableFingerprintUnlock: false,
  //   disableScreenCapture: false,
  //   disableCamera: false,
  // });

  const policyData = useSelector((state) => state.policy.policyData);

  const golbalPolicy = useSelector((state) => state.policy.policyData);

  const dispatch = useDispatch();
  const location=useLocation();
  const incomingPolicy = location.state?.policyData;
    console.log("incomingPolicy=====",incomingPolicy);
    

  const [localPolicy, setLocalPolicy] = useState(incomingPolicy||golbalPolicy);
  console.log("localPolicy=====",localPolicy);

  // Reset the Redux state to initialState when the page loads
  useEffect(() => {
    if(!incomingPolicy)
    {
    dispatch(resetPolicyData());
    }
  }, [dispatch,incomingPolicy]);

  // Then update local state from fresh Redux
 
  // console.log("PolicyData",policyData);

  // const Create=async()=>{
  //    dispatch(setPolicyData(localPolicy));
  //   console.log("PolicyData",policyData);
  //  const response_send=await axios.post(`${API_BASE_URL}/api/send_details_to_navkiran`,localPolicy)
  //  console.log("Rseponse_Send",response_send);

  // }
  // useEffect(() => {
  //   console.log("Global policyData updated:", policyData);
  // }, [policyData]);

  const Create = async () => {
    dispatch(setPolicyData(localPolicy));
    // const response_send = await axios.post(
    //   `${API_BASE_URL}/api/send_details_to_navkiran`,
    //   localPolicy
    // );
    console.log("local Response_send", localPolicy);
  };

  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div className="bg-black flex justify-between items-center px-4">
        <div className="h-20 text-white text-2xl font-bold p-6 flex gap-2 items-center">
          <img src={enroll} className="w-7 h-7" />
          Manage Policy
        </div>
        <button
          onClick={Create}
          className="w-30 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-md shadow-sm px-4"
        >
          <Link to={"/policy"}>Create Policy</Link>
        </button>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Policy Name Input */}
        <div className="mb-6 max-w-md">
          <Label
            htmlFor="policyName"
            className="block mb-2 font-semibold text-gray-700"
          >
            Policy Name
          </Label>

          <input
            id="policyName"
            type="text"
            placeholder="Name your policy"
            className="bg-gray-200 border border-gray-300 text-sm px-1 py-2  w-full"
            value={localPolicy.policyName}
            onChange={(e) =>
              setLocalPolicy({ ...localPolicy, policyName: e.target.value })
            }
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="security" className="w-full">
          <TabsList className="grid grid-cols-6 gap-2 mb-4 w-[1000px] ">
            {["security", "device", "network", "app", "device2", "kiosk"].map(
              (tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  // className={cn(
                  //   "border border-[#03A9FC] px-6 py-2 rounded-md text-sm font-medium transition duration-200",
                  //   "data-[state=active]:bg-[#03A9FC] data-[state=active]:text-white"
                  // )}
                  className={
                    "border border-[#03A9FC] px-6 py-2 rounded-md text-sm font-medium transition duration-200 data-[state=active]:bg-[#03A9FC] data-[state=active]:text-white"
                  }
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              )
            )}
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="security">
            <Card className="p-6 max-w-5xl">
              <SecurityTab
                policyData={localPolicy}
                setPolicyData={setLocalPolicy}
              />
            </Card>
          </TabsContent>
          <TabsContent value="device">
            <Card className="p-6 max-w-5xl">
              <DeviceTab
                policyData={localPolicy}
                setPolicyData={setLocalPolicy}
              />
            </Card>
          </TabsContent>
          <TabsContent value="network">
            <Card className="p-6 max-w-5xl">
              <NetworkTab
                policyData={localPolicy}
                setPolicyData={setLocalPolicy}
              />
            </Card>
          </TabsContent>
          <TabsContent value="app">
            <Card className="p-6 max-w-5xl">
              <AppTab policyData={localPolicy} setPolicyData={setLocalPolicy} />
            </Card>
          </TabsContent>
          <TabsContent value="device2">
            <Card className="p-6 max-w-5xl">
              <p>Device 2 settings here.</p>
            </Card>
          </TabsContent>
          <TabsContent value="kiosk">
            <Card className="p-6 max-w-5xl">
              <p>Kiosk settings here.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatePolicy;
