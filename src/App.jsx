import Navbar from "./components/layout/Navbar.jsx";
import Fetch from "./pages/FetchDeviceInfo/Fetch.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Sidebar from "./components/layout/Sidebar.jsx";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Enroll from "./pages/EnrollDevice/Enroll.jsx";
import appStore from "./utilites/store/appStore.js";
//import Policy from "./pages/MangePolicy/Policy.jsx";
import CreatePolicy from "./pages/MangePolicy/CreatePolicy.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageApplication from "./pages/ManageApplication.jsx";
import ManageDevices from "./pages/ManageDevices/ManageDevices.jsx";
import DeviceDetails from "./pages/ManageDevices/DeviceDetails.jsx";
import Policy from "./pages/MangePolicy/Policy.jsx";
import ManageContent from "./pages/ContentManagement/MangeContent.jsx";

function App() {
  return (
    <Provider store={appStore}>
      <div className="h-full flex flex-col ">
        <Navbar />

        <div className="pt-16 flex ">
          <Sidebar />
          <main className="ml-[20%] p-4 bg-gray-200 w-full h-full">
            <Outlet />
          </main>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Provider>
  );
}

const approuter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="" element={<App />}>
        <Route index element={<Fetch />} />
        <Route path="/enroll" element={<Enroll />} />
        <Route path="/policy" element={<Policy/>} />
        <Route path="/create-policy" element={<CreatePolicy />} />
        <Route path="/manage-application" element={<ManageApplication />} />
        <Route path="/manage-devices" element={<ManageDevices/>}/>
        <Route path="/devices-details" element={<DeviceDetails/>}/>
        <Route path="/manage-content" element={<ManageContent/>} />
      </Route>
    </>
  )
);

function RootApp() {
  return <RouterProvider router={approuter} />;
}

export default RootApp;
