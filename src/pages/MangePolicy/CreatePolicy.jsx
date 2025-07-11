import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import enroll from "../../assets/enroll.png";
import SecurityTab from "../../components/tabs/SecurityTab";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeviceTab from "../../components/tabs/DeviceTab";
import {
  resetPolicyData,
  setPolicyData,
} from "@/utilites/store/slices/policySlice";
import NetworkTab from "../../components/tabs/NetworkTab";
import AppTab from "../../components/tabs/AppTab";

import axios from "axios";
import InstallAppTab from "../../components/tabs/InstallAppTab/InstallAppTab";
import KioskTab from "../../components/tabs/KioskTab";
import { toast } from "react-toastify";
import isEqual from "fast-deep-equal";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Main Page
const CreatePolicy = () => {
  const policyData = useSelector((state) => state.policy.policyData);

  const golbalPolicy = useSelector((state) => state.policy.policyData);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const incomingPolicy = location.state?.policyData;
  console.log("incomingPolicy=====", incomingPolicy);
  const [originalPolicy, setOriginalPolicy] = useState(
    incomingPolicy || golbalPolicy
  );

  useEffect(() => {
    setOriginalPolicy(incomingPolicy || golbalPolicy);
  }, [incomingPolicy, golbalPolicy]);

  const [localPolicy, setLocalPolicy] = useState(
    incomingPolicy || golbalPolicy
  );
  console.log("localPolicy=====", localPolicy);

  // Reset the Redux state to initialState when the page loads
  useEffect(() => {
    if (!incomingPolicy) {
      dispatch(resetPolicyData());
    }
  }, [dispatch, incomingPolicy]);

  const isPolicyChanged = useMemo(() => {
    return !isEqual(localPolicy, originalPolicy);
  }, [localPolicy, originalPolicy]);

  const Create_Policy = async () => {
    dispatch(setPolicyData(localPolicy));

    try {
      const response_send = await axios.post(
        `${API_BASE_URL}/api/create_policy`,
        localPolicy
      );
      console.log("Policy_response=======", response_send);
      if (response_send.data.status) {
        toast.success("Policy Created Successfully");
        dispatch(resetPolicyData());
        navigate("/policy");
      } else {
        toast.error(response_send.data.message);
      }
    } catch (error) {
      console.log("error_Message", error);
      toast.error("Something went wrong");
    }
    console.log("Create_Policy Response_send", localPolicy);
  };

  const Update_Policy = async () => {
    dispatch(setPolicyData(localPolicy));

    try {
      const update_policy_response = await axios.post(
        `${API_BASE_URL}/api/update_policy`,
        localPolicy
      );
      console.log("Update_Policy Response", update_policy_response);
      // Check if the response contains a status property
      // and if it's true
      if (update_policy_response.data.status) {
        toast.success("Policy Updated Successfully");
        dispatch(resetPolicyData());
        navigate("/policy");
      } else {
        toast.error(update_policy_response.data.message);
      }
    } catch (error) {
      console.log("error_Message", error);
      toast.error("Something went wrong");
    }

    console.log("Update_Policy_send", localPolicy);
  };

  return (
    <div className="w-full bg-white h-full min-h-screen flex flex-col">
      {/* Header */}
      {/* <div className="bg-black flex justify-between items-center px-4 w-full  "> */}
      <div className="sticky top-[74px] z-40 bg-dark flex flex-col sm:flex-row justify-between items-start sm:items-center h-[68px] px-4 w-full space-y-2 sm:space-y-0">
        <div className=" text-white text-xl font-semibold p-6 flex gap-2 items-center">
          <img src={enroll} className="w-7 h-7" />
          Manage Policy
        </div>
        {/* <button
            onClick={incomingPolicy ? Update_Policy : Create_Policy}
           //  disabled={true}
            // className="w-30 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-md shadow-sm px-4"
            className="px-4 py-2  bg-white border opacity-80  border-gray-300 rounded-md shadow-sm text-sm w-full sm:w-auto hover:bg-gray-100 transition-colors hover:scale-105 duration-200 flex items-center justify-center"
          >
            
              {incomingPolicy ? "Update Policy" : "Create Policy "}
            
          </button> */}

        <button
          onClick={incomingPolicy ? Update_Policy : Create_Policy}
          disabled={!isPolicyChanged}
          className={cn(
            "px-4 py-2 border rounded-md shadow-sm text-sm w-full sm:w-auto flex items-center justify-center transition-all duration-200",
            isPolicyChanged
              ? "bg-[#ffd56a] text-black hover:bg-[#e9b940] hover:scale-105"
              : "bg-white opacity-70 text-gray-400 border-gray-300 cursor-not-allowed"
          )}
        >
          {incomingPolicy ? "Update Policy" : "Create Policy"}
        </button>
      </div>

      {/* Body */}
      <div className="p-6 mt-4">
        {/* <div className="p-4 sm:p-6 max-w-screen-xl mx-auto"> */}

        {/* Policy Name Input */}
        {!incomingPolicy ? (
          <div className=" mb-6 max-w-md bg-white">
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
        ) : (
          // <div className="flex justify-around border border-gray-300 p-6 rounded-md mb-4">
          <div className="sticky top-[142px] z-30 flex flex-col md:flex-row justify-around gap-4 bg-white border border-gray-300 p-4 rounded-md mb-4">
            <div className="flex flex-col">
              <span className="font-bold">Policy ID:</span>
              {localPolicy.id}
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Policy Name:</span>
              {localPolicy.name}
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Version:</span>
              {localPolicy.version}
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Updated ON:</span>
              {/* {localPolicy.updatedOn} */}
              {new Date(localPolicy.updated_on).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </div>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="security" className="w-full flex flex-col">
          {/* <TabsList className="grid grid-cols-6 gap-2 mb-4 w-[1400px] "> */}
          <TabsList className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-4 w-full  h-14 overflow-x-auto bg-white                     ">
            {/* <TabsList className="flex overflow-x-auto gap-2 mb-4 w-full"> */}

            {[
              "security",
              "device",
              "network",
              "app",
              "Install App",
              "kiosk",
            ].map((tab) => (
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
            ))}
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="security">
            <Card className="p-6 max-w-7xl border-none">
              {/* <Card className="p-4 w-full max-w-5xl mx-auto border-none shadow-none"> */}

              <SecurityTab
                policyData={localPolicy}
                setPolicyData={setLocalPolicy}
              />
            </Card>
          </TabsContent>
          <TabsContent value="device">
            <Card className="p-6 max-w-5xl border-none shadow-none">
              <DeviceTab
                policyData={localPolicy}
                setPolicyData={setLocalPolicy}
              />
            </Card>
          </TabsContent>
          <TabsContent value="network">
            <Card className="p-6 max-w-5xl border-none shadow-none">
              <NetworkTab
                policyData={localPolicy}
                setPolicyData={setLocalPolicy}
              />
            </Card>
          </TabsContent>
          <TabsContent value="app">
            <Card className="p-6 max-w-5xl border-none shadow-none">
              <AppTab policyData={localPolicy} setPolicyData={setLocalPolicy} />
            </Card>
          </TabsContent>
          <TabsContent value="Install App">
            <Card className="p-6 max-w-5xl border-none shadow-none">
              <InstallAppTab
                policyData={localPolicy}
                setPolicyData={setLocalPolicy}
              />
            </Card>
          </TabsContent>
          <TabsContent value="kiosk">
            <Card className="p-6 max-w-5xl border-none shadow-none">
              <KioskTab
                policyData={localPolicy}
                setPolicyData={setLocalPolicy}
              />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatePolicy;
