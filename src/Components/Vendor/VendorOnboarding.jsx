import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../apiConfig';



const VendorOnboarding = () => {
  const navigate = useNavigate();
  const [vendorDetails, setVendorDetails] = useState({
    firstName: '',
    lastName: '',
    email: localStorage.getItem('email') || '', 
    contactNo: '',
    streetNo: '',
    streetNo2: '',
    city: '',
    postalCode: '',
    province: '',
    country: '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorDetails({
      ...vendorDetails,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch userId and token from local storage
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!vendorDetails.email || !userId || !token) {
      alert('Error: Email, User ID, or Token is missing from local storage.');
      return;
    }

    try {
      // Submit vendor details
      const response = await fetch(`${API_BASE_URL}/vendor/addVendor/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(vendorDetails),
      });

      if (response.ok) {
        console.log('Vendor Details submitted successfully:', vendorDetails);

        // Upload the image
        if (image) {
          const formData = new FormData();
          formData.append('image', image);

          const imageUploadResponse = await fetch(`${API_BASE_URL}/vendor/uploadImage/${userId}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: formData,
          });

          if (imageUploadResponse.ok) {
            console.log('Image uploaded successfully');
          } else {
            console.error('Failed to upload image:', imageUploadResponse.statusText);
            alert('Failed to upload the image. Please try again.');
            return;
          }
        }

        alert('Your profile has been submitted successfully.');
       
        navigate('/login');
      } else {
        console.error('Failed to submit vendor details:', response.statusText);
        alert('Failed to submit your profile. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting your profile. Please try again.');
    }
  };

  return (
    <div className="bg-white mt-4 p-8 rounded-lg shadow-md max-w-3xl mx-auto">
      <div className="bg-gray-600 py-4">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Vendor Onboarding</h2>
      </div>
      <div className="mt-8"></div> 


      {/* First Form - Profile Information */}
      <form onSubmit={handleSubmit}>
        
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">
            Profile Image <span className="text-gray-500">(Optional)</span>
          </label>
          <div className="mt-2 flex items-center">
            <span className="inline-block h-16 w-16 rounded-full overflow-hidden bg-gray-100">
              {vendorDetails.image ? (
                <img
                  src={URL.createObjectURL(vendorDetails.image)}
                  alt="Profile Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <svg
                  className="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 0v24H0V0h24z" fill="none" />
                  <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9C16.9 4.4 14.7 2.2 12 2.2S7.1 4.4 7.1 7.1C7.1 9.8 9.3 12 12 12zm0 2.9c-3.2 0-9.6 1.6-9.6 4.9v1.6h19.2v-1.6c0-3.3-6.4-4.9-9.6-4.9z" />
                </svg>
              )}
            </span>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="ml-5 bg-gray-100 p-2 rounded-lg border border-gray-300 text-sm text-gray-700"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">
            <span className="text-red-500">*</span> First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={vendorDetails.firstName}
            onChange={handleChange}
            className="mt-2 p-3 block w-full border rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">
            <span className="text-red-500">*</span> Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={vendorDetails.lastName}
            onChange={handleChange}
            className="mt-2 p-3 block w-full border rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={vendorDetails.email}
            onChange={handleChange}
            className="mt-2 p-3 block w-full border rounded bg-gray-100"
            readOnly
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">
            <span className="text-red-500">*</span> Contact No
          </label>
          <input
            type="tel"
            name="contactNo"
            value={vendorDetails.contactNo}
            onChange={handleChange}
            className="mt-2 p-3 block w-full border rounded"
            required
          />
        </div>

      </form>

      {/* Separator */}
      <div className="my-8 text-center">
        <hr className="border-gray-300" />
        <p className="text-lg font-semibold text-gray-700 my-4">Address Information</p>
        <hr className="border-gray-300" />
      </div>

      {/* Second Form - Address Information */}
      <form onSubmit={handleSubmit} className="mt-10">
      <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">
            <span className="text-red-500">*</span> Country
          </label>
          <input
            type="text"
            name="country"
            value={vendorDetails.country}
            onChange={handleChange}
            className="mt-2 p-3 block w-full border rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">
            <span className="text-red-500">*</span> City
          </label>
          <input
            type="text"
            name="city"
            value={vendorDetails.city}
            onChange={handleChange}
            className="mt-2 p-3 block w-full border rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">
            <span className="text-red-500">*</span> Street No 1
          </label>
          <input
            type="text"
            name="streetNo"
            value={vendorDetails.streetNo}
            onChange={handleChange}
            className="mt-2 p-3 block w-full border rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Street No 2
            <span className="text-gray-500">(Optional)</span>
          </label>
          <input
            type="text"
            name="streetNo2"
            value={vendorDetails.streetNo2}
            onChange={handleChange}
            className="mt-2 p-3 block w-full border rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Postal Code
            <span className="text-gray-500">(Optional)</span>
          </label>
          <input
            type="text"
            name="postalCode"
            value={vendorDetails.postalCode}
            onChange={handleChange}
            className="mt-2 p-3 block w-full border rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">
            Province <span className="text-gray-500">(Optional)</span>
          </label>
          <input
            type="text"
            name="province"
            value={vendorDetails.province}
            onChange={handleChange}
            className="mt-2 p-3 block w-full border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Profile
        </button>
      </form>
    </div>

  );
};

export default VendorOnboarding;
