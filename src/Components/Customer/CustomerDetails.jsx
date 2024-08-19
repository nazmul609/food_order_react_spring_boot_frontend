import React, { useState } from 'react';

const CustomerDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState("https://cdn.pixabay.com/photo/2024/04/25/12/32/ai-generated-8719680_640.jpg");

  const customer = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    city: "Dhaka",
    roadNo: "12",
    houseNo: "34",
    additionalDetails: "Near the big park",
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

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

  return (
    <div className="flex flex-col space-y-6 p-6 bg-gray-100 rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
      {/* Profile header section */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">Customer Profile</h2>
          <p className="text-gray-600">Manage your profile information</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={profilePicture} alt="Profile" className="w-40 h-40 object-cover rounded-lg shadow-md mb-2" />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="profile-picture-upload"
          />
          <label
            htmlFor="profile-picture-upload"
            className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition"
          >
            Upload New Image
          </label>
        </div>
      </div>

      {/* Profile details section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg shadow-md p-4">
          <table className="w-full text-left">
            <tbody>
              <tr>
                <td className="font-semibold text-gray-700 py-2">Name:</td>
                <td className="text-gray-800">{customer.name}</td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-700 py-2">Email:</td>
                <td className="text-gray-800">{customer.email}</td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-700 py-2">Phone:</td>
                <td className="text-gray-800">{customer.phone}</td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-700 py-2">City:</td>
                <td className="text-gray-800">{customer.city}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white border rounded-lg shadow-md p-4">
          <table className="w-full text-left">
            <tbody>
              <tr>
                <td className="font-semibold text-gray-700 py-2">Road No:</td>
                <td className="text-gray-800">{customer.roadNo}</td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-700 py-2">House No:</td>
                <td className="text-gray-800">{customer.houseNo}</td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-700 py-2">Additional Details:</td>
                <td className="text-gray-800">{customer.additionalDetails}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={handleEdit}
        className="self-center py-2 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        {isEditing ? "Save" : "Edit Profile"}
      </button>
    </div>
  );
};

export default CustomerDetails;
