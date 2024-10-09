import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantCard from '../Home/RestaurantCard';
import API_BASE_URL from '../../apiConfig';

const VendorRestaurantsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [vendorRestaurants, setVendorRestaurants] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); 
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const fetchVendorRestaurants = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/restaurant/allRestaurants`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const restaurants = await response.json();
          const filteredRestaurants = await Promise.all(
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
                const imageUrl = imageResponse.ok
                  ? URL.createObjectURL(await imageResponse.blob())
                  : null;
                return { ...restaurant, imageUrl };
              })
          );
          setVendorRestaurants(filteredRestaurants);
        } else {
          console.error('Failed to fetch restaurants');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchVendorRestaurants();
  }, [userId, token]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRestaurantClick = (restaurant) => {
    if (restaurant.openOrClosed === true) {
      navigate(`/restaurant/${restaurant.name}/${restaurant.id}`);
    }
  };

  const handleEditClick = (restaurant) => {
    // Ensure correct URL path with restaurant name and ID
    navigate(`/restaurant_edit_info/${restaurant.name}/${restaurant.id}`);
  };

  const filteredVendorRestaurants = vendorRestaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-green-50 overflow-x-hidden">
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for your restaurants"
            className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="text-2xl font-semibold mb-4 text-gray-800"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredVendorRestaurants.map((restaurant) => (
            <div key={restaurant.id}>
              <div
                className={`rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform transform hover:scale-105 ${
                  restaurant.openOrClosed !== true ? 'pointer-events-none opacity-50' : ''
                }`}
                onClick={() => handleRestaurantClick(restaurant)}
              >
                <RestaurantCard 
                  restaurant={{
                    id: restaurant.id,
                    name: restaurant.name,
                    openOrClosed: restaurant.openOrClosed,
                    operatingHours: restaurant.operatingHours,
                    cuisineType: restaurant.cuisineType,
                    imageUrl: restaurant.imageUrl,
                  }}
                />
              </div>
              {/* Edit Button with full width matching the card */}
              <div className="mt-4">
                <button
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => handleEditClick(restaurant)} // Pass the entire restaurant object
                >
                  Edit Restaurant
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorRestaurantsPage;
