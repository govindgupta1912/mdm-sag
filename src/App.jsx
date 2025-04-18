import Navbar from "./components/Navbar.jsx";
import Fetch from "./components/Fetch.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Enroll from "./components/Enroll.jsx";
import appStore from "./utilites/appStore.js";
import Policy from "./pages/Policy.jsx";
import CreatePolicy from "./components/CreatePolicy.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={appStore}>
      <div className="h-full flex flex-col">
        <Navbar />

        <div className="pt-16 flex">
          <Sidebar />
          <main className="ml-[20%] p-4 bg-gray-200 w-full h-full min-h-screen">
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
        <Route path="/policy" element={<Policy />} />
        <Route path="/create-policy" element={<CreatePolicy />} />
      </Route>
    </>
  )
);

function RootApp() {
  return <RouterProvider router={approuter} />;
}

export default RootApp;
