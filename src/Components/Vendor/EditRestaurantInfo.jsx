import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../apiConfig';

const EditRestaurantInfo = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  // Initial state to store fetched restaurant info and user-input fields
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: '',
    cuisineType: '',
    operatingHours: { open: '', close: '' },
    partyOrderAvailable: false,
    offHourDeliveryAvailable: false,
    openOrClosed: false,
    description: '',
    contactNo: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    // Additional non-editable fields to include in the PUT request
    email: '',
    status: '',
  });

  // Fetch restaurant details on component mount
  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/restaurant/getRestaurant?restaurantId=${restaurantId}`);
        setRestaurantInfo(response.data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };
    fetchRestaurantInfo();
  }, [restaurantId]);

  // Handle input change for editable fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setRestaurantInfo((prev) => ({ ...prev, [name]: checked }));
    } else if (name.includes('operatingHours')) {
      const field = name.split('.')[1];
      setRestaurantInfo((prev) => ({
        ...prev,
        operatingHours: { ...prev.operatingHours, [field]: value },
      }));
    } else {
      setRestaurantInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission to update restaurant info
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/updateRestaurant/${restaurantId}`, restaurantInfo);
      alert('Successfully updated restaurant information');
      navigate(`/vendor-restaurants/${localStorage.getItem('userId')}`); // Navigate to the desired page
    } catch (error) {
      console.error('Error updating restaurant info:', error);
      alert('Failed to update restaurant info');
    }
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        await axios.post(`${API_BASE_URL}/restaurant/uploadImage/${restaurantId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('New image uploaded successfully');
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image');
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 py-8 shadow-lg rounded-t-lg">
        <h2 className="text-4xl font-bold text-white tracking-wide text-center">
          Create New Restaurant
        </h2>
      </div>
      <div className="mt-10"></div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Restaurant Name */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Restaurant Name
            </label>
            <input
              type="text"
              name="name"
              value={restaurantInfo.name}
              onChange={handleInputChange}
              placeholder="Restaurant Name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
  
          {/* Cuisine Type */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Cuisine Type
            </label>
            <input
              type="text"
              name="cuisineType"
              value={restaurantInfo.cuisineType}
              onChange={handleInputChange}
              placeholder="Cuisine Type"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
  
          {/* Operating Hours */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Opening Time
              </label>
              <input
                type="time"
                name="operatingHours.open"
                value={restaurantInfo.operatingHours.open}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Closing Time
              </label>
              <input
                type="time"
                name="operatingHours.close"
                value={restaurantInfo.operatingHours.close}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
  
          {/* Description */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={restaurantInfo.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-indigo-500"
              rows="4"
            />
          </div>
  
          {/* Contact Number */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Contact Number
            </label>
            <input
              type="text"
              name="contactNo"
              value={restaurantInfo.contactNo}
              onChange={handleInputChange}
              placeholder="Contact Number"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
  
          {/* Address */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Address Line 1
            </label>
            <input
              type="text"
              name="addressLine1"
              value={restaurantInfo.addressLine1}
              onChange={handleInputChange}
              placeholder="Address Line 1"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Address Line 2
            </label>
            <input
              type="text"
              name="addressLine2"
              value={restaurantInfo.addressLine2}
              onChange={handleInputChange}
              placeholder="Address Line 2"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={restaurantInfo.city}
                onChange={handleInputChange}
                placeholder="City"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                name="state"
                value={restaurantInfo.state}
                onChange={handleInputChange}
                placeholder="State"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={restaurantInfo.postalCode}
                onChange={handleInputChange}
                placeholder="Postal Code"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={restaurantInfo.country}
                onChange={handleInputChange}
                placeholder="Country"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
  
          {/* Checkboxes */}
          <div className="flex items-center space-x-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="partyOrderAvailable"
                checked={restaurantInfo.partyOrderAvailable}
                onChange={handleInputChange}
                className="mr-2"
              />
              Party Order Available
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="offHourDeliveryAvailable"
                checked={restaurantInfo.offHourDeliveryAvailable}
                onChange={handleInputChange}
                className="mr-2"
              />
              Off-Hour Delivery Available
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="openOrClosed"
                checked={restaurantInfo.openOrClosed}
                onChange={handleInputChange}
                className="mr-2"
              />
              Open
            </label>
          </div>
  
          {/* Image Upload */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Upload New Image
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
  
          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
            >
              Update Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default EditRestaurantInfo;
