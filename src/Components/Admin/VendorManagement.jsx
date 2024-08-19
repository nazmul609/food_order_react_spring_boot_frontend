import React, { useState } from 'react';

const AdminVendorManagement = () => {
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: 'Vendor A',
      status: 'Active',
      platformFee: '10%',
      linkedRestaurants: 3,
    },
    {
      id: 2,
      name: 'Vendor B',
      status: 'Pending',
      platformFee: '8%',
      linkedRestaurants: 2,
    },
    {
      id: 3,
      name: 'Vendor C',
      status: 'De-active',
      platformFee: '15%',
      linkedRestaurants: 5,
    },
    // Add more vendors as needed
  ]);

  // Function to handle vendor approval/rejection
  const handleApproval = (vendorId, action) => {
    setVendors(vendors.map(vendor => 
      vendor.id === vendorId 
        ? { ...vendor, status: action === 'approve' ? 'Active' : 'Rejected' } 
        : vendor
    ));
  };

  // Function to handle editing platform fee
  const handleFeeChange = (vendorId, newFee) => {
    setVendors(vendors.map(vendor => 
      vendor.id === vendorId 
        ? { ...vendor, platformFee: newFee } 
        : vendor
    ));
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Vendor Management</h2>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">Vendor Name</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Platform Fee</th>
            <th className="py-2 px-4 text-left">Linked Restaurants</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map(vendor => (
            <tr key={vendor.id}>
              <td className="py-2 px-4">{vendor.name}</td>
              <td className="py-2 px-4">
                <span className={`px-2 py-1 rounded ${
                  vendor.status === 'Active' ? 'bg-green-200 text-green-800' : 
                  vendor.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 
                  'bg-red-200 text-red-800'
                }`}>
                  {vendor.status}
                </span>
              </td>
              <td className="py-2 px-4">
                <input 
                  type="text" 
                  value={vendor.platformFee} 
                  onChange={(e) => handleFeeChange(vendor.id, e.target.value)}
                  className="border rounded p-1 w-20"
                />
              </td>
              <td className="py-2 px-4">{vendor.linkedRestaurants}</td>
              <td className="py-2 px-4">
                <button 
                  onClick={() => handleApproval(vendor.id, 'approve')} 
                  className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                >
                  Approve
                </button>
                <button 
                  onClick={() => handleApproval(vendor.id, 'reject')} 
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Reject
                </button>
                <button 
                  onClick={() => alert(`View analytics for ${vendor.name}`)} 
                  className="bg-gray-500 text-white px-4 py-1 rounded ml-2"
                >
                  View Analytics
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminVendorManagement;
