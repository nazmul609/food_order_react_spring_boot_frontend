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
    <div className="bg-white p-6 rounded-lg shadow-md flex justify-between">
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
        <table className="min-w-full text-left">
          <tbody>
            <tr>
              <td className="font-semibold">Name:</td>
              <td>{customer.name}</td>
            </tr>
            <tr>
              <td className="font-semibold">Email:</td>
              <td>{customer.email}</td>
            </tr>
            <tr>
              <td className="font-semibold">Phone:</td>
              <td>{customer.phone}</td>
            </tr>
            <tr>
              <td className="font-semibold">City:</td>
              <td>{customer.city}</td>
            </tr>
            <tr>
              <td className="font-semibold">Road No:</td>
              <td>{customer.roadNo}</td>
            </tr>
            <tr>
              <td className="font-semibold">House No:</td>
              <td>{customer.houseNo}</td>
            </tr>
            <tr>
              <td className="font-semibold">Additional Details:</td>
              <td>{customer.additionalDetails}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={handleEdit}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
      <div className="flex flex-col items-center">
        <img
          src={profilePicture}
          alt="Profile"
          className="w-60 h-60 rounded-lg mb-2" 
        />
        {/* File input for uploading a new profile picture */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="cursor-pointer border p-2 rounded"
        />
      </div>
    </div>
  );
};

export default CustomerDetails;
