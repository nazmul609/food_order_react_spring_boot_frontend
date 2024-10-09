import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../apiConfig';
import { useNavigate } from 'react-router-dom';

const RestaurantManagement = () => {
  const [restaurantData, setRestaurantData] = useState({
    name: '',
    cuisineType: '',
    operatingHours: { open: '', close: '' }, 
    partyOrderAvailable: false,
    offHourDeliveryAvailable: false,
    openOrClosed: false,
    description: '', 
  });
  
  const [isFormValid, setIsFormValid] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  // Validate form whenever restaurantData or imageFile changes
  useEffect(() => {
    const { name, cuisineType, operatingHours } = restaurantData;
    setIsFormValid(name && cuisineType && operatingHours && imageFile);
  }, [restaurantData, imageFile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRestaurantData({
      ...restaurantData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const formattedOperatingHours = `${restaurantData.operatingHours.open} to ${restaurantData.operatingHours.close}`;

      const response = await fetch(
        `${API_BASE_URL}/restaurant/addRestaurant/${userId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...restaurantData,
            operatingHours: formattedOperatingHours,
            ownerId: userId,
            email: email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to create restaurant: ${response.statusText}`);
      }

      const restaurantId = await response.text();
      console.log('Restaurant created successfully with ID:', restaurantId);

      await handleImageUpload(restaurantId);

      // Show success modal after restaurant creation
      setIsSuccessModalOpen(true);

      // Reset form
      setRestaurantData({
        name: '',
        cuisineType: '',
        operatingHours: { open: '', close: '' },
        partyOrderAvailable: false,
        offHourDeliveryAvailable: false,
        openOrClosed: false,
      });
      setImageFile(null);
    } catch (error) {
      console.error('Failed to create restaurant:', error);
    }
  };

  const handleImageUpload = async (restaurantId) => {
    if (!imageFile || !restaurantId) {
      console.error('Image file or restaurant ID is missing.');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch(
        `${API_BASE_URL}/restaurant/uploadImage/${restaurantId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to upload image: ${response.statusText}`);
      }

      console.log('Image uploaded successfully');
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };
  

  const handleNavigateToMenuManagement = () => {
    navigate(`/vendor-restoura/menu-management/${userId}`);
  };

  return (
    <div className="flex flex-col flex-1 p-8 bg-gray-100 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 py-8 shadow-lg rounded-t-lg">
        <h2 className="text-4xl font-bold text-white tracking-wide text-center">
          Manage Your Restaurant
        </h2>
      </div>
      <div className="mt-10"></div> 

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload Section */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Restaurant Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Basic Information Section */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Restaurant Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={restaurantData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Cuisine Type <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="cuisineType"
            value={restaurantData.cuisineType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={restaurantData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Operating Hours <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4">
            <input
              type="time"
              name="open"
              value={restaurantData.operatingHours.open}
              onChange={(e) =>
                setRestaurantData({
                  ...restaurantData,
                  operatingHours: {
                    ...restaurantData.operatingHours,
                    open: e.target.value,
                  },
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="time"
              name="close"
              value={restaurantData.operatingHours.close}
              onChange={(e) =>
                setRestaurantData({
                  ...restaurantData,
                  operatingHours: {
                    ...restaurantData.operatingHours,
                    close: e.target.value,
                  },
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        {/* Checkbox Options */}
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="partyOrderAvailable"
              checked={restaurantData.partyOrderAvailable}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-400"
            />
            <label className="ml-2 text-gray-700 text-sm font-medium">
              Party Order
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="offHourDeliveryAvailable"
              checked={restaurantData.offHourDeliveryAvailable}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-400"
            />
            <label className="ml-2 text-gray-700 text-sm font-medium">
              Off-Hour Delivery
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="openOrClosed"
              checked={restaurantData.openOrClosed}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-400"
            />
            <label className="ml-2 text-gray-700 text-sm font-medium">
              Is Open
            </label>
          </div>
        </div>

        {/* Submit and View Restaurants Buttons */}
        <div className="space-y-4">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2 px-4 text-white font-bold rounded-md shadow-md focus:outline-none focus:ring-2 ${
              isFormValid
                ? 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Create Restaurant
          </button>

        </div>
      </form>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center space-y-4">
            <h3 className="text-xl font-bold text-gray-800">
              Restaurant Created Successfully!
            </h3>
            <p className="text-gray-600">
              Your restaurant has been created. Please add your Menu
            </p>
            <div className="space-y-2">
              <button
                onClick={handleNavigateToMenuManagement}
                className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Go to Menu Management
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantManagement;
