import React, { useState } from 'react';

const VendorOnboarding = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [vendorDetails, setVendorDetails] = useState({
    name: "",
    description: "",
    cuisineType: "",
    openingHours: "",
    closingHours: "",
    country: "",
    city: "",
    state: "",
    email: "vendor@example.com",
    contactNo: "",
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorDetails({
      ...vendorDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const vendorData = {
      profilePicture,
      ...vendorDetails,
    };

    console.log('Vendor Details submitted for approval:', vendorData);

    alert('Your profile has been submitted for approval.');
  };

  return (
    <div className="bg-white mt-4 p-8 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Vendor Onboarding</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6 flex flex-col ">
          <div className="w-28 h-28 mb-2 border border-gray-300 rounded-lg overflow-hidden">
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-400 flex items-center justify-center h-full">Upload</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Profile Name</label>
          <input
            type="text"
            name="name"
            value={vendorDetails.name}
            onChange={handleChange}
            className="mt-2 p-3 block w-full border rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={vendorDetails.description}
            onChange={handleChange}
            className="mt-2 p-3 block w-full border rounded"
            rows="4"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">Cuisine Type</label>
            <input
              type="text"
              name="cuisineType"
              value={vendorDetails.cuisineType}
              onChange={handleChange}
              className="mt-2 p-3 block w-full border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Contact No</label>
            <input
              type="tel"
              name="contactNo"
              value={vendorDetails.contactNo}
              onChange={handleChange}
              className="mt-2 p-3 block w-full border rounded"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">Opening Hours</label>
            <input
              type="time"
              name="openingHours"
              value={vendorDetails.openingHours}
              onChange={handleChange}
              className="mt-2 p-3 block w-full border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Closing Hours</label>
            <input
              type="time"
              name="closingHours"
              value={vendorDetails.closingHours}
              onChange={handleChange}
              className="mt-2 p-3 block w-full border rounded"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={vendorDetails.country}
              onChange={handleChange}
              className="mt-2 p-3 block w-full border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={vendorDetails.city}
              onChange={handleChange}
              className="mt-2 p-3 block w-full border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={vendorDetails.state}
              onChange={handleChange}
              className="mt-2 p-3 block w-full border rounded"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={vendorDetails.email}
            className="mt-2 p-3 block w-full border rounded bg-gray-100"
            readOnly
          />
        </div>

        <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default VendorOnboarding;
