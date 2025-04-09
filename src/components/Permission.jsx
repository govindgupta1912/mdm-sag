// Modal.js
// import React from 'react';

// const Permission = ({ isOpen, onClose, data }) => {
//   if (!isOpen) return null;
//      console.log("permisioonn datat====",data);
     
//   return (
//     <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
//       <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-xl max-h-[90vh] relative overflow-hidden'>
//         <button onClick={onClose} className='absolute top-2 right-2 text-gray-600 hover:text-gray-900'>✖</button>
//         <h2 className='text-xl font-bold mb-4'>App Details</h2>
//         <p><strong>Name:</strong> {data.app_name}</p>
//         <p><strong>Version:</strong> {data.app_version}</p>
//         <p><strong>Package:</strong> {data.package_name}</p>
//         {/* Add more fields here if needed */}

//         <div>
//           <table>
//             <thead>
//               <tr>
//                 <th className=''>Sno.</th>
//                 <th className=''>Name</th>
//               </tr>
//             </thead>
//             <tbody>
//               {console.log("PERMISSSION =====",data.permissions) }
//               { data.permissions && data.permissions.length>0 ?
//               (
//                 data.permissions.map((item,index)=>(
//                   <tr>
//                     <td className='border px-2 py-2'>{index+1}</td>
//                     <td className='border px-6 py-2'>{item}</td>
//                   </tr>

//                 ))
//               ):(
//                 <tr>
//                   <td>No Permission Found</td>
//                 </tr>
//               )
//               }
              
//             </tbody>
//           </table>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Permission;


// import React from 'react';

// const Permission = ({ isOpen, onClose, data }) => {
//   if (!isOpen) return null;

//   return (
//     <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
//       <div className='bg-white rounded-lg shadow-md w-full max-w-3xl max-h-[90vh] relative overflow-hidden'>
//         {/* Modal Header */}
//         <div className='flex justify-between items-center px-6 py-4 border-b'>
//           <h2 className='text-xl font-bold'>App Details</h2>
//           <button onClick={onClose} className='text-gray-600 hover:text-gray-900 text-lg'>✖</button>
//         </div>

//         {/* Modal Content with Scroll */}
//        <div className='p-6'>
//           <p><strong>Name :</strong> {data.app_name}</p>
//           <p><strong>Version :</strong> {data.app_version}</p>
//           <p><strong>Package :</strong> {data.package_name}</p>
//           <p><strong>Is System App :</strong>{ data.is_system_app?"True":"False"}</p>
//           </div>

//           {/* Permissions Table */}
          
//             <h3 className='font-semibold mb-2 px-6'>Permissions</h3>
//             <div className='px-6'>
//             <div className=' overflow-auto'>

//             <table className='w-full text-sm border min-w-[600px]'>
//               <thead className='bg-gray-100 sticky top-0'>
//                 <tr>
//                   <th className='border px-2 py-1 text-left w-16'>S.No.</th>
//                   <th className='border px-2 py-1 text-left'>Name</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.permissions && data.permissions.length > 0 ? (
//                   data.permissions.map((item, index) => (
//                     <tr key={index}>
//                       <td className='border px-2 py-1 align-top'>{index + 1}</td>
//                       <td className='border px-2 py-1'>{item}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={2} className='text-center py-2'>No permissions found.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//           </div>
        
//       </div>
//     </div>
//   );
// };

// export default Permission;


import React from 'react';

const Permission = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white rounded-lg shadow-md w-full max-w-3xl max-h-[90vh] relative flex flex-col'>
        
        {/* Modal Header */}
        <div className='flex justify-between items-center px-6 py-4 border-b'>
          <h2 className='text-xl font-bold'>App Details</h2>
          <button onClick={onClose} className='text-gray-600 hover:text-gray-900 text-lg'>✖</button>
        </div>

        {/* Scrollable Content */}
        <div className='overflow-y-auto px-6 py-4 space-y-4 flex-1'>
          <div>
            <p><strong>Name :</strong> {data.app_name}</p>
            <p><strong>Version :</strong> {data.app_version}</p>
            <p><strong>Package :</strong> {data.package_name}</p>
            <p><strong>Is System App :</strong> {data.is_system_app ? "True" : "False"}</p>
          </div>

          <div>
  <h3 className='font-semibold pb-1 mb-2'>Permissions</h3>

  {/* Make this wrapper scrollable */}
  <div className='max-h-[300px] overflow-auto border rounded'>

    <table className='text-sm border min-w-[600px] w-full'>
      <thead className='bg-gray-100 sticky top-0 z-10'>
        <tr>
          <th className='border px-2 py-1 text-left w-16'>S.No.</th>
          <th className='border px-2 py-1 text-left'>Name</th>
        </tr>
      </thead>
      <tbody>
        {data.permissions && data.permissions.length > 0 ? (
          data.permissions.map((item, index) => (
            <tr key={index}>
              <td className='border px-2 py-1 align-top'>{index + 1}</td>
              <td className='border px-2 py-1 whitespace-nowrap'>{item}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={2} className='text-center py-2'>No permissions found.</td>
          </tr>
        )}
      </tbody>
    </table>

  </div>
</div>

        </div>

      </div>
    </div>
  );
};

export default Permission;


