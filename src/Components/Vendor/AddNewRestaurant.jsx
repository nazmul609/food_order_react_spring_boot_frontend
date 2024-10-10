import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../apiConfig';


const RestaurantManagement = () => {
  const [restaurantData, setRestaurantData] = useState({
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
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  

  // Validate form whenever restaurantData or imageFile changes
  useEffect(() => {
    const { name, cuisineType, operatingHours, contactNo, city, state, postalCode, country } = restaurantData;
    setIsFormValid(name && cuisineType && operatingHours && imageFile && contactNo && city && state && postalCode && country);
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
        description: '',
        contactNo: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
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



  return (
    <div className="flex flex-col flex-1 p-8 bg-gray-100 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 py-8 shadow-lg rounded-t-lg">
        <h2 className="text-4xl font-bold text-white tracking-wide text-center">
          Create New Restaurant
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
          <div className="grid grid-cols-2 gap-6">
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
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="contactNo"
                value={restaurantData.contactNo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
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

          {/* Address Section */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Address Line 1 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="addressLine1"
                value={restaurantData.addressLine1}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Address Line 2
              </label>
              <input
                type="text"
                name="addressLine2"
                value={restaurantData.addressLine2}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={restaurantData.city}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="state"
                value={restaurantData.state}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Postal Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="postalCode"
                value={restaurantData.postalCode}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="country"
                value={restaurantData.country}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {/* Operating Hours Section */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Operating Hours <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-6">
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

          {/* Additional Options */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="partyOrderAvailable"
                checked={restaurantData.partyOrderAvailable}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-gray-700 text-sm">Party Order Available</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="offHourDeliveryAvailable"
                checked={restaurantData.offHourDeliveryAvailable}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-gray-700 text-sm">Off-Hour Delivery Available</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="openOrClosed"
                checked={restaurantData.openOrClosed}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-gray-700 text-sm">Restaurant Currently Open</label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-3 text-white font-semibold rounded-lg shadow-lg ${
              isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!isFormValid}
          >
            Submit
          </button>
      </form>
      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                Restaurant Created Successfully! 🎉
              </h2>
              <p>Your restaurant creation request has been sent for approval. Please Wait for the approval to Add menu to your Restaurant</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => setIsSuccessModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default RestaurantManagement;
