import React, { useState } from 'react';

const CustomerOnboarding = () => {
  const [formData, setFormData] = useState({
    profilePicture: null,
    name: '',
    city: '',
    roadNo: '',
    houseNo: '',
    additionalDetails: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, such as sending data to the backend
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Customer Onboarding</h2>
        
        {/* Profile Picture Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Enter your city"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Road No */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Road No</label>
          <input
            type="text"
            name="roadNo"
            value={formData.roadNo}
            onChange={handleInputChange}
            placeholder="Enter your road number"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* House No */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">House No</label>
          <input
            type="text"
            name="houseNo"
            value={formData.houseNo}
            onChange={handleInputChange}
            placeholder="Enter your house number"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Additional Details */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Additional Details</label>
          <textarea
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={handleInputChange}
            placeholder="Enter any additional details"
            className="w-full border border-gray-300 rounded-md p-2"
            rows="3"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Save and Continue
        </button>
      </form>
    </div>
  );
};

export default CustomerOnboarding;
