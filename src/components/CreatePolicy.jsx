// import { Link } from "react-router-dom";
// import enroll from "../assets/enroll.png";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// const CreatePolicy = () => {
//   return (
//     <div className="w-6/7">
//         {/*Header Div*/}
//       <div className="bg-black  flex justify-between items-center  px-4">
//         <div className=" h-20 text-white  text-2xl font-bold  p-6 flex ">
//           <img src={enroll} className="w-7 h-7" />
//           Manage Policy
//         </div>
//         <Link
//           to={"/create-policy"}
//           className="w-30 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-md shadow-sm "
//         >
//           CreatePolicy
//         </Link>
//       </div>

//      {/*Body section div*/}
//       <div className="bg-white  h-72">

//          {/*PolicY Name div*/}
//         <div>
//           <label className="block mb-2 font-semibold text-gray-700">
//             Policy Name
//           </label>
//           <textarea
//             placeholder="Enter policy name..."
//             className="w-fitp-2 border border-gray-300 bg-gray-200 text-black  resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows={1}
//           />
//         </div>

//          {/* nav item section */}

//         <h1>Basic Security Restriction</h1>
//         <Tabs defaultValue="account" className="w-[400px]">
//   <TabsList>
//     <TabsTrigger className=" border border-[#03A9FC] px-12 py-3 hover:shadow-lg hover:bg-[#03A9FC] duration-200" value="security">Security</TabsTrigger>
//     <TabsTrigger className=" border border-[#03A9FC] px-12 py-3 hover:shadow-lg hover:bg-[#03A9FC] duration-200" value="devices">Devices</TabsTrigger>
//     <TabsTrigger className=" border border-[#03A9FC] px-12 py-3 hover:shadow-lg hover:bg-[#03A9FC] duration-200" value="network"> Network</TabsTrigger>
//     <TabsTrigger className=" border border-[#03A9FC] px-12 py-3 hover:shadow-lg hover:bg-[#03A9FC] duration-200" value="app">App</TabsTrigger>

//   </TabsList>
//   <TabsContent value="security">Make changes to your account here.</TabsContent>
//   <TabsContent value="devices">Change your password here.</TabsContent>
//   <TabsContent value="network">Make changes to your account here.</TabsContent>
//   <TabsContent value="app">Change your password here.</TabsContent>

// </Tabs>

//      </div>

//       </div>

//     </div>
//   );
// };

// export default CreatePolicy;

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import enroll from "../assets/enroll.png";
import SecurityTab from "./tabs/SecurityTab";
import { useState } from "react";

// // Individual switch item
// const ToggleItems = ({ title, description }) => (
//   <div className="flex items-center justify-between py-2 border-b border-gray-200">
//     <div>
//       <p className="font-semibold">{title}</p>
//       <p className="text-sm text-gray-500">{description}</p>
//     </div>
//     <Switch defaultChecked />
//   </div>
// );

// // The Security tab layout as per image
// const SecurityTab = () => (
//   <div className="space-y-6">
//     <div>
//       <h3 className="text-base font-semibold text-[#1A73E8] mb-2">Basic Security Restrictions</h3>
//       <ToggleItems title="Disable location sharing" description="This is a test for the policy feature title details description" />
//       <ToggleItems title="Disable factory reset" description="This is a test for the policy feature title details description" />
//       <ToggleItems title="Disable microphone" description="This is a test for the policy feature title details" />
//       <ToggleItems title="Disable bluetooth" description="This is a test for the policy feature title details" />
//     </div>

//     <div>
//       <h3 className="text-base font-semibold text-[#1A73E8] mb-2">Critical Security Restrictions</h3>
//       <ToggleItems title="Disable keyguard" description="This is a test for the policy feature title details" />
//       <ToggleItems title="Disable fingerprint unlock" description="This is a test for the policy feature title details" />
//       <ToggleItems title="Disable screen capture" description="This disables screen recording and taking screenshot." />
//       <ToggleItems title="Disable Camera" description="Disable camera for all apps" />
//     </div>
//   </div>
// );



// Main Page
const CreatePolicy = () => {

  const [policyData, setPolicyData] = useState({
    disabledLocation: false,
    disableFactoryReset: false,
    disableMicrophone: false,
    disableBluetooth: false,
    disableKeyguard: false,
    disableFingerprintUnlock: false,
    disableScreenCapture: false,
    disableCamera: false,
  });


  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div className="bg-black flex justify-between items-center px-4">
        <div className="h-20 text-white text-2xl font-bold p-6 flex gap-2 items-center">
          <img src={enroll} className="w-7 h-7" />
          Manage Policy
        </div>
        <Link
          to={"/create-policy"}
          className="w-30 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-md shadow-sm px-4"
        >
          Create Policy
        </Link>
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
          <Textarea
            id="policyName"
            placeholder="Name your policy"
            className="bg-gray-200 border border-gray-300 resize-none"
            rows={1}
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
                  className={"border border-[#03A9FC] px-6 py-2 rounded-md text-sm font-medium transition duration-200 data-[state=active]:bg-[#03A9FC] data-[state=active]:text-white"}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              )
            )}
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="security">
            <Card className="p-6 max-w-5xl">
              <SecurityTab policyData={policyData} setPolicyData={setPolicyData} />
            </Card>
          </TabsContent>
          <TabsContent value="device">
            <Card className="p-6 max-w-5xl">
              <p>Device settings here.</p>
            </Card>
          </TabsContent>
          <TabsContent value="network">
            <Card className="p-6 max-w-5xl">
              <p>Network settings here.</p>
            </Card>
          </TabsContent>
          <TabsContent value="app">
            <Card className="p-6 max-w-5xl">
              <p>App settings here.</p>
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
