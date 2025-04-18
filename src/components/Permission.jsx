

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


