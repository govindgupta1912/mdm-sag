
// import React from 'react'
// import { Link } from 'react-router-dom';

// const Application = ({details}) => {
//     const data=details.application;
//     //console.log("First app name:", details.application.applications[0].app_name);
//     //console. */log("First app name:",  details.application.applications[0].app_name);
//     let i=1;
    
//   return (
//     <div className='ml-16'>
//         <table>
//             <thead className='bg-gray-200'>
//                 <tr>
//                     <th className='border px-4 py-2'>Sr.No</th>
//                     <th className='border px-4 py-2'>App Name</th>
//                     <th className='border px-4 py-2'>Version</th>
//                     <th className='border px-4 py-2'>Source</th>
//                     <th className='border px-4 py-2'>More</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {
//                     data.map((item ,index)=>(
//                         <tr key={index} className='hover:bg-gray-50'>
//                             <td className='border px-4 py-2'>{i++}</td>
//                             <td className='border px-4 py-2'>{item.app_name}</td>
//                             <td className='border px-4 py-2'>{item.app_version}</td>
//                             <td className='border px-4 py-2'>{item.package_name}</td>
//                             <td className='border px-4 py-2'>
//                                 <Link className=' hover:bg-gray-900 text-white bg-gray-700 duration-300 transition-colors px-4 py-1 text-sm font-bold rounded-sm'> More</Link>
                                
//                                 </td>
//                         </tr>
//                     ))
//                 }

                
//             </tbody>
//         </table>

//     </div>
//   )
// }

// export default Application

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Permission from './Permission';

const Application = ({ details }) => {
  const data = details.application;
  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMoreClick = (item) => {
    setSelectedApp(item);
    setIsModalOpen(true);
  };

  return (
    <div className='ml-8'>
      <table className='ml-20'>
        <thead className='bg-gray-200'>
          <tr>
            <th className='border px-4 py-2'>Sr.No</th>
            <th className='border px-4 py-2'>App Name</th>
            <th className='border px-4 py-2'>Version</th>
            <th className='border px-4 py-2'>Source</th>
            <th className='border px-4 py-2'>More</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => (
              <tr key={index} className='hover:bg-gray-50'>
                <td className='border px-4 py-2'>{index + 1}</td>
                <td className='border px-4 py-2'>{item.app_name}</td>
                <td className='border px-4 py-2'>{item.app_version}</td>
                <td className='border px-4 py-2'>{item.package_name}</td>
                <td className='border px-4 py-2'>
                  <button
                    onClick={() => handleMoreClick(item)}
                    className='hover:bg-gray-900 text-white bg-gray-700 duration-300 transition-colors px-4 py-1 text-sm font-bold rounded-sm'
                  >
                    More
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
  
     <Permission
     isOpen={isModalOpen}
     onClose={() => setIsModalOpen(false)}
     data={selectedApp}
     />
      
    </div>
  );
};

export default Application;
