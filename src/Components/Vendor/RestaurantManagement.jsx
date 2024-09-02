import React, { useState, useEffect } from 'react';
import RestaurantCard from '../Home/RestaurantCard';

const RestaurantManagement = () => {
  const [restaurantData, setRestaurantData] = useState({
    name: '',
    cuisineType: '',
    operatingHours: '',
    partyOrderAvailable: false,
    offHourDeliveryAvailable: false,
    openOrClosed: false,
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

  // Fetch and display the restaurants
  const fetchRestaurants = async () => {
    try {
      const response = await fetch('http://localhost:8080/restaurant/allRestaurants', {
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
      //console.log('Parsed restaurants:', restaurants);

      const vendorRestaurants = restaurants.filter(
        (restaurant) => parseInt(restaurant.ownerId, 10) === parseInt(userId, 10)
      );

      //console.log('Filtered restaurants for vendor:', vendorRestaurants);
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
      // Create the restaurant
      const response = await fetch(
        `http://localhost:8080/restaurant/addRestaurant/${userId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...restaurantData,
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
  
      
      setRestaurantData({
        name: '',
        cuisineType: '',
        operatingHours: '',
        partyOrderAvailable: false,
        offHourDeliveryAvailable: false,
        openOrClosed: false,
      });
      setImageFile(null);
  
      // Optionally, refresh the page
      window.location.reload();
  
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
        `http://localhost:8080/restaurant/uploadImage/${restaurantId}`,
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
    <>
      <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-100 shadow-md rounded-lg">
        {/* Restaurant Creation Section */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Restaurant</h2>
          <form onSubmit={handleSubmit}>
            {/* Image Upload Section */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Restaurant Image <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Basic Information Section */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Restaurant Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={restaurantData.name}
                onChange={handleChange}
                className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Cuisine Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="cuisineType"
                value={restaurantData.cuisineType}
                onChange={handleChange}
                className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Operating Hours <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="operatingHours"
                value={restaurantData.operatingHours}
                onChange={handleChange}
                className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
  
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                name="partyOrderAvailable"
                checked={restaurantData.partyOrderAvailable}
                onChange={handleChange}
                className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-gray-700 text-sm font-medium">
                Party Order 
              </label>
            </div>
  
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                name="offHourDeliveryAvailable"
                checked={restaurantData.offHourDeliveryAvailable}
                onChange={handleChange}
                className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-gray-700 text-sm font-medium">
                Off-Hour Delivery 
              </label>
            </div>
  
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                name="openOrClosed"
                checked={restaurantData.openOrClosed}
                onChange={handleChange}
                className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-gray-700 text-sm font-medium">
                Open 
              </label>
            </div>
  
            <button
              type="submit"
              disabled={!isFormValid}
              className={`bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Create Restaurant
            </button>
          </form>
        </div>
      </div>
  
      <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-100 shadow-md rounded-lg">
        {/* Restaurant Display Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">My Restaurants</h3>

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
              <p className="text-gray-500">No restaurants available.</p>
            )}
          </div>
        </div>
      </div>
    </>
    
  );
  
};

export default RestaurantManagement;
