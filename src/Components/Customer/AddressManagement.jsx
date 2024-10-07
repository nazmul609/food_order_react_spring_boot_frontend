import React from 'react';

function AddressManagement() {
  // Dummy address data
  const addresses = [
    { id: 1, street: "123 Main St", city: "Springfield", postalCode: "12345", country: "USA" },
    { id: 2, street: "456 Elm St", city: "Shelbyville", postalCode: "67890", country: "USA" },
    { id: 3, street: "789 Oak St", city: "Capital City", postalCode: "11223", country: "USA" }
  ];

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Address Management</h2>

      {/* List of addresses */}
      <div className="space-y-4">
        {addresses.map((address) => (
          <div key={address.id} className="p-6 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-700">Address {address.id}</h3>
            <p className="text-gray-600">{address.street}</p>
            <p className="text-gray-600">{address.city}, {address.postalCode}</p>
            <p className="text-gray-600">{address.country}</p>
          </div>
        ))}
      </div>

      {/* Add Address Button */}
      <div className="mt-8 flex justify-end">
        <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
          Add Address
        </button>
      </div>
    </div>
  );
}

export default AddressManagement;
