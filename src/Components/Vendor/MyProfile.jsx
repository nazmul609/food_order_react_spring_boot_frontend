import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../../apiConfig';



const MyProfile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [profileDetails, setProfileDetails] = useState({
    name: '',
    country: '',
    city: '',
    province: '',
    postalCode: '',
    streetNo: '',
    streetNo2: '',
    email: '',
    contactNo: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    const userId = localStorage.getItem('userId'); 

    if (token && userId) {
      // Fetch Vendor Profile Details
      fetch(`${API_BASE_URL}/vendor/getVendor/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch vendor data');
          }
          return response.json();
        })
        .then((data) => {
          setProfileDetails({
            name: data.lastName,
            email: data.email,
            contactNo: data.contactNo,
            country: data.country,
            city: data.city,
            province: data.province,
            streetNo: data.streetNo,
            streetNo2: data.streetNo2,
            postalCode: data.postalCode

          });
        })
        .catch((error) => {
          console.error('Error fetching vendor data:', error);
        });

      // Fetch Profile Picture
      fetch(`${API_BASE_URL}/vendor/downloadImage/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch profile image');
          }
          return response.blob(); 
        })
        .then((blob) => {
          const imageUrl = URL.createObjectURL(blob); // Create a URL for the image
          setProfilePicture(imageUrl);
        })
        .catch((error) => {
          console.error('Error fetching profile image:', error);
        });
    } else {
      console.error('Token or userId not found in local storage');
    }
  }, []);

  const handleEdit = () => {
    alert('Edit functionality to be implemented.');
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
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">Vendor Profile</h2>
          <p className="text-gray-600">Manage your profile information</p>
        </div>
        <div className="flex flex-col items-center mt-4 md:mt-0">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-lg shadow-md mb-2"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-300 rounded-lg shadow-md mb-2 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
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
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg shadow-md p-4">
          <table className="w-full text-left">
            <tbody>
              <tr>
                <td className="font-semibold text-gray-700 py-2">Name:</td>
                <td className="text-gray-800">{profileDetails.name}</td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-700 py-2">Email:</td>
                <td className="text-gray-800">{profileDetails.email}</td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-700 py-2">Contact No:</td>
                <td className="text-gray-800">{profileDetails.contactNo}</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div className="bg-white border rounded-lg shadow-md p-4">
          <table className="w-full text-left">
            <tbody>
              <tr>
                <td className="font-semibold text-gray-700 py-2">Country:</td>
                <td className="text-gray-800">{profileDetails.country}</td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-700 py-2">City:</td>
                <td className="text-gray-800">{profileDetails.city}</td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-700 py-2">Province:</td>
                <td className="text-gray-800">{profileDetails.province}</td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-700 py-2">Street No 1:</td>
                <td className="text-gray-800">{profileDetails.streetNo}</td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-700 py-2">Street No 2:</td>
                <td className="text-gray-800">{profileDetails.streetNo2}</td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-700 py-2">Postal Code:</td>
                <td className="text-gray-800">{profileDetails.postalCode}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <button
        onClick={handleEdit}
        className="self-center py-2 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Edit Profile
      </button>
    </div>
  );
  
  
};

export default MyProfile;
