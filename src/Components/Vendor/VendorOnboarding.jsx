import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VendorOnboarding = () => {
  const navigate = useNavigate();
  const [vendorDetails, setVendorDetails] = useState({
    name: '',
    contactNo: '',
    ssn: '',
    age: '',
    sex: '',
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

    // Fetch email, userId, and token from local storage
    const email = localStorage.getItem('email');
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!email || !userId || !token) {
      alert('Error: Email, User ID, or Token is missing from local storage.');
      return;
    }

    const vendorData = {
      email,
      user_id: userId,
      ...vendorDetails,
    };

    try {
      // Submit vendor details
      const response = await fetch(`http://localhost:8080/vendor/addVendor/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(vendorData),
      });

      if (response.ok) {
        console.log('Vendor Details submitted successfully:', vendorData);

        // Upload the image 
        if (image) {
          const formData = new FormData();
          formData.append('image', image);

          const imageUploadResponse = await fetch(`http://localhost:8080/vendor/uploadImage/${userId}`, {
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
        navigate(`/vendor-profile/my-profile/${userId}`);
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
      <h2 className="text-3xl font-bold mb-6">Vendor Onboarding</h2>
      <form onSubmit={handleSubmit}>
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
          <label className="block text-lg font-medium text-gray-700">Contact No</label>
          <input
            type="tel"
            name="contactNo"
            value={vendorDetails.contactNo}
            onChange={handleChange}
            className="mt-2 p-3 block w-full border rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">SSN</label>
          <input
            type="text"
            name="ssn"
            value={vendorDetails.ssn}
            onChange={handleChange}
            className="mt-2 p-3 block w-full border rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={vendorDetails.age}
            onChange={handleChange}
            className="mt-2 p-3 block w-full border rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Sex</label>
          <select
            name="sex"
            value={vendorDetails.sex}
            onChange={handleChange}
            className="mt-2 p-3 block w-full border rounded"
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Profile Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 p-3 block w-full border rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={localStorage.getItem('email') || ''}
            className="mt-2 p-3 block w-full border rounded bg-gray-100"
            readOnly
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
