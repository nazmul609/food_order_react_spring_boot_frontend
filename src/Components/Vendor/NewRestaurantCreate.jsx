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
    email: '',
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
  const [successMessage, setSuccessMessage] = useState('');

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  

  // Validate form whenever restaurantData or imageFile changes
  useEffect(() => {
    const { name, cuisineType, operatingHours, email, contactNo, addressLine1, city, state, postalCode, country } = restaurantData;
    setIsFormValid(
      name &&
      cuisineType &&
      operatingHours.open &&
      operatingHours.close &&
      email &&
      contactNo &&
      addressLine1 &&
      city &&
      state &&
      postalCode &&
      country &&
      imageFile
    );
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
      console.log('Restaurant creation request sent successfully with ID:', restaurantId);

      await handleImageUpload(restaurantId);

      // Show success modal with admin approval message
      setSuccessMessage("Your restaurant creation request has been sent to the admin for approval. Please wait for the admin's approval.");
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
        email: '',
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
        <div className="text-center text-xl font-semibold mb-4">Address Information</div>
        {/* Address Fields */}
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

        {/* Additional Options */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="partyOrderAvailable"
            checked={restaurantData.partyOrderAvailable}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700 text-sm">Party Orders Available</label>
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
          <label className="text-gray-700 text-sm">Open or Closed</label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full p-2 text-white font-semibold rounded-md ${
              isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Create Restaurant
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold">Success</h2>
            <p>{successMessage}</p>
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantManagement;
