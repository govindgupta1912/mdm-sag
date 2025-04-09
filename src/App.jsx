 //import { useEffect, useState } from "react"

import Navbar from "./components/Navbar.jsx";
import Fetch from "./components/Fetch.jsx";

// function App() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
    //    const response = await fetch("http://192.168.0.121:9001/api/");
     //    console.log("data ", response)
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const result = await response.json();
//         setData(result);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []); // Runs only once when the component mounts

//   return (
//     <>
//       <h1 className="bg-red-400 text-2xl">Vite + React</h1>

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">Error: {error}</p>}
//       {data && (
//         <div>
//           <h2 className="text-xl font-bold">{data.title}</h2>
//           <p>{data.body}</p>
//         </div>
//       )}
//     </>
//   );
// }

// export default App;

import { createBrowserRouter, createRoutesFromElements, Link, Outlet, Route, RouterProvider } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import appStore from "./utilites/appStore.js";
import Enroll from "./components/Enroll.jsx";

function App()
{
  
 
  return(
    <Provider store={appStore}>
    <div className="h-screen flex flex-col">
       <Navbar/>
       <div className=" flex flex-grow">
       <Sidebar/>
       <main className="flex-1 p-4 bg-gray-200">
       <Outlet />
       </main>
      

       </div>
    </div>
    </Provider>
    
  )
};






// const approuter = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//     <Route path="" element={<App/>}>
//      <Route index element={<Fetch/>}/>
//      <Route path="/about" element={<About />} />
//      <Route path="/enroll" element={<Enroll/>}/>
//     </>
//   )
// )

const approuter = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="" element={<App />}>
      <Route index element={<Fetch />} />
      <Route path="/enroll" element={<Enroll />} />
    </Route> // ✅ You were missing this closing tag
    </>
  )
)


function RootApp(){
  return(
    <RouterProvider router={approuter}/>
  )
}

export default RootApp;