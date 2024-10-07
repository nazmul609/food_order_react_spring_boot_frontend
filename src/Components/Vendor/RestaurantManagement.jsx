import React, { useState, useEffect } from 'react';
import RestaurantCard from '../Home/RestaurantCard';
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
  });
  
  const [isFormValid, setIsFormValid] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [restaurantList, setRestaurantList] = useState([]);

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  // Validate form whenever restaurantData or imageFile changes
  useEffect(() => {
    const { name, cuisineType, operatingHours } = restaurantData;
    setIsFormValid(name && cuisineType && operatingHours && imageFile);
  }, [restaurantData, imageFile]);

  // Fetch and display the restaurants along with their images
  const fetchRestaurants = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/restaurant/allRestaurants`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }

      const textData = await response.text();
      const restaurants = JSON.parse(textData);

      const vendorRestaurants = await Promise.all(
        restaurants
          .filter((restaurant) => parseInt(restaurant.ownerId, 10) === parseInt(userId, 10))
          .map(async (restaurant) => {
            const imageResponse = await fetch(
              `${API_BASE_URL}/restaurant/downloadImage/${restaurant.id}`,
              {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (imageResponse.ok) {
              const imageBlob = await imageResponse.blob();
              const imageUrl = URL.createObjectURL(imageBlob);
              return { ...restaurant, imageUrl };
            } else {
              return { ...restaurant, imageUrl: null };
            }
          })
      );

      setRestaurantList(vendorRestaurants);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  useEffect(() => {
    fetchRestaurants(); // initial restaurant list
  }, [userId, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRestaurantData({
      ...restaurantData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Add restaurants
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const formattedOperatingHours = `${restaurantData.operatingHours.open} to ${restaurantData.operatingHours.close}`;
      // Create the restaurant
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

      // Get the created restaurant ID
      const restaurantId = await response.text();
      console.log('Restaurant created successfully with ID:', restaurantId);

      if (!restaurantId) {
        throw new Error('Restaurant ID is undefined or null after creation.');
      }

      await handleImageUpload(restaurantId);

      await fetchRestaurants();

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
      console.log(`Uploading image for restaurant ID: ${restaurantId}`);
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
  }
  
  


  return (
    <>
      <div className="max-w-6xl mx-auto  p-6 bg-gray-50 shadow-lg rounded-lg">
        {/* Restaurant Creation Section */}
        <div className="mb-10 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 py-4 shadow rounded-md">
            Create Your Restaurant
          </h2>
  
          <div className="mt-10"></div> 
          <form onSubmit={handleSubmit}>
            {/* Image Upload Section */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Restaurant Image <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="block w-full p-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
  
            {/* Basic Information Section */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Restaurant Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={restaurantData.name}
                onChange={handleChange}
                className="block w-full p-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
  
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Cuisine Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="cuisineType"
                value={restaurantData.cuisineType}
                onChange={handleChange}
                className="block w-full p-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
  
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={restaurantData.description}
                onChange={handleChange}
                className="block w-full p-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="3"
              />
            </div>
  
            <div className="mb-6">
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
                  className="block w-full p-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <span className="text-gray-700 self-center">-</span>
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
                  className="block w-full p-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>
  
            {/* Checkbox Options */}
            <div className="mb-6 space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="partyOrderAvailable"
                  checked={restaurantData.partyOrderAvailable}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-400"
                />
                <label className="ml-2 text-gray-700 text-sm font-medium">Party Order</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="offHourDeliveryAvailable"
                  checked={restaurantData.offHourDeliveryAvailable}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-400"
                />
                <label className="ml-2 text-gray-700 text-sm font-medium">Off-Hour Delivery</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="openOrClosed"
                  checked={restaurantData.openOrClosed}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-400"
                />
                <label className="ml-2 text-gray-700 text-sm font-medium">Open</label>
              </div>
            </div>
  
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:from-blue-600 hover:to-indigo-700 transition ${
                !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Create Restaurant
            </button>
          </form>
        </div>
      </div>
  
      {/* Restaurant Display Section */}
      <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-50 shadow-lg rounded-lg">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">My Restaurants</h3>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {restaurantList.length > 0 ? (
              restaurantList.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={{
                    id: restaurant.id,
                    name: restaurant.name,
                    openOrClosed: restaurant.openOrClosed,
                    operatingHours: restaurant.operatingHours,
                    cuisineType: restaurant.cuisineType,
                  }}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center w-full">No restaurants available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
  
  
  
};

export default RestaurantManagement;