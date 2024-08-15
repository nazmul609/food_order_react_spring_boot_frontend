import React, { useState } from 'react';

const MyProfile = () => {
  const [profilePicture, setProfilePicture] = useState('https://cdn.pixabay.com/photo/2023/10/16/09/43/korea-8318827_640.jpg'); // Default profile picture
  const [profileDetails, setProfileDetails] = useState({
    Name: 'Vendor Name',
    CuisineType: 'Cuisine Type',
    OpeningHours: '09:00',
    ClosingHours: '22:00',
    Country: 'Country',
    City: 'City',
    State: 'State',
    RoadNo: '12',
    HouseNo: '34',
    Email: 'vendor@example.com',
    ContactNo: '1234567890',
    SocialMedia: '@vendorSocial',
  });

  const handleEdit = () => {
    // Handle edit functionality here
    alert('Edit functionality to be implemented.');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Update the profile picture state
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-start space-y-4 ">
      <div className="flex items-center w-full">
        <div className="flex-1 bg-white border rounded-lg shadow-md p-4 mr-4">
          <table className="min-w-full border-collapse border border-gray-300">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Name:</td>
                <td className="border border-gray-300 p-2">{profileDetails.Name}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Cuisine Type:</td>
                <td className="border border-gray-300 p-2">{profileDetails.CuisineType}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Opening Hours:</td>
                <td className="border border-gray-300 p-2">
                  {profileDetails.OpeningHours} - {profileDetails.ClosingHours}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Profile image and upload option */}
        <div className="flex flex-col items-center">
          <img src={profilePicture} alt="Profile" className="w-32 h-32 rounded-lg mb-2 mt-8" />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border rounded p-2 cursor-pointer"
          />
        </div>
      </div>

      {/* Second table for address */}
      
      <div className="bg-white border rounded-lg shadow-md p-4 w-full">
        <table className="min-w-full border-collapse border border-gray-300">
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Country:</td>
              <td className="border border-gray-300 p-2">{profileDetails.Country}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">City:</td>
              <td className="border border-gray-300 p-2">{profileDetails.City}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">State:</td>
              <td className="border border-gray-300 p-2">{profileDetails.State}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Road No:</td>
              <td className="border border-gray-300 p-2">{profileDetails.RoadNo}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">House No:</td>
              <td className="border border-gray-300 p-2">{profileDetails.HouseNo}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Third table for contact information */}
      <div className="bg-white border rounded-lg shadow-md p-4 w-full">
        <table className="min-w-full border-collapse border border-gray-300">
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Email:</td>
              <td className="border border-gray-300 p-2">{profileDetails.Email}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Contact No:</td>
              <td className="border border-gray-300 p-2">{profileDetails.ContactNo}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Social Media:</td>
              <td className="border border-gray-300 p-2">{profileDetails.SocialMedia}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button onClick={handleEdit} className="mt-4 py-2 px-4 bg-green-600 text-white rounded">
        Edit Profile
      </button>
    </div>
  );
};

export default MyProfile;
