import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../apiConfig';
import { useParams, useNavigate } from 'react-router-dom';

const RestaurantEdit = () => {
  const { restaurantId } = useParams(); // Fetch the restaurantId from the URL
  const pId = parseInt(restaurantId, 10); // Parse it as an integer

  const [restaurantData, setRestaurantData] = useState({
    name: '', // not editable, but needs to be sent
    cuisineType: '',
    description: '',
    operatingHours: { open: '', close: '' },
    partyOrderAvailable: false,
    offHourDeliveryAvailable: false,
    openOrClosed: false,
    contactNo: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    imageFilePath: '', // This will hold the URL of the uploaded image
    ownerId: null, // not editable, but needs to be sent
    email: '', // not editable, but needs to be sent
    status: '', // not editable, but needs to be sent
  });

  const [imageFile, setImageFile] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Fetch current restaurant data
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/restaurant/getRestaurant?restaurantId=${pId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch restaurant data');

        const data = await response.json();
        const [open, close] = data.operatingHours.split(' to ');
        setRestaurantData({
          ...data,
          operatingHours: { open, close },
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (!isNaN(pId)) {
      fetchRestaurantData(); // Only fetch if pId is a valid number
    }
  }, [pId, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRestaurantData({
      ...restaurantData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Update restaurant details
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const formattedOperatingHours = `${restaurantData.operatingHours.open} to ${restaurantData.operatingHours.close}`;

      const response = await fetch(`${API_BASE_URL}/updateRestaurant/${pId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...restaurantData,
          operatingHours: formattedOperatingHours,
        }),
      });

      if (!response.ok) throw new Error('Failed to update restaurant');

      console.log('Restaurant updated successfully');
      await handleImageUpload();
      setSuccessMessage('Restaurant updated successfully!'); // Show success message

      // After a brief delay, navigate to the restaurant page
      setTimeout(() => {
        navigate(`/restaurant/${restaurantData.name}/${pId}`);
      }, 2000); // Wait for 2 seconds before redirecting
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch(`${API_BASE_URL}/restaurant/uploadImage/${pId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload image');
      console.log('Image uploaded successfully');
    } catch (error) {
      console.error(error);
    }
  };

  // Enable form validation based on fields
  useEffect(() => {
    const { cuisineType, operatingHours } = restaurantData;
    setIsFormValid(cuisineType && operatingHours.open && operatingHours.close);
  }, [restaurantData]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-gradient-to-r from-green-600 to-teal-800 py-8 shadow-lg rounded-t-lg w-full max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-white">Edit Your Restaurant</h2>
      </div>

      {successMessage && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg w-full max-w-3xl mt-6 space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Restaurant Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border border-gray-300 rounded-md" />
        </div>

        {/* Cuisine Type */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Cuisine Type</label>
          <input type="text" name="cuisineType" value={restaurantData.cuisineType} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Description</label>
          <textarea name="description" value={restaurantData.description} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" rows="3" />
        </div>

        {/* Operating Hours */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Operating Hours</label>
          <div className="flex space-x-4">
            <input type="time" name="open" value={restaurantData.operatingHours.open} onChange={(e) => setRestaurantData({ ...restaurantData, operatingHours: { ...restaurantData.operatingHours, open: e.target.value } })} className="w-full p-2 border border-gray-300 rounded-md" />
            <input type="time" name="close" value={restaurantData.operatingHours.close} onChange={(e) => setRestaurantData({ ...restaurantData, operatingHours: { ...restaurantData.operatingHours, close: e.target.value } })} className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Contact Number</label>
          <input type="text" name="contactNo" value={restaurantData.contactNo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
        </div>

        {/* Address Information */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Address Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Address Line 1</label>
              <input type="text" name="addressLine1" value={restaurantData.addressLine1} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Address Line 2</label>
              <input type="text" name="addressLine2" value={restaurantData.addressLine2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">City</label>
              <input type="text" name="city" value={restaurantData.city} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">State</label>
              <input type="text" name="state" value={restaurantData.state} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Postal Code</label>
              <input type="text" name="postalCode" value={restaurantData.postalCode} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Country</label>
              <input type="text" name="country" value={restaurantData.country} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        </div>

        {/* Update Button */}
        <div className="flex justify-end">
          <button type="submit" className={`py-2 px-4 text-white rounded-md ${isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`} disabled={!isFormValid}>
            Update Restaurant
          </button>
        </div>
      </form>
    </div>
  );
};

export default RestaurantEdit;
