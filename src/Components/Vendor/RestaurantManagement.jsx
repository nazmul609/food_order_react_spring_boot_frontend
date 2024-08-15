import React, { useState } from 'react';
import RestaurantCard from '../Home/RestaurantCard';

const RestaurantManagement = () => {
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: 'Restaurant 1',
      image: 'https://via.placeholder.com/300',
      ratings: 4.5,
      location: 'Location 1',
      isOpen: true,
    },
    {
      id: 2,
      name: 'Restaurant 2',
      image: 'https://via.placeholder.com/300',
      ratings: 3.5,
      location: 'Location 2',
      isOpen: false,
    },
  ]);

  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    image: '',
    foodCategory: '',
    openingHours: '',
    closingHours: '',
  });

  const handleCreateRestaurant = () => {
    // Handle new restaurant creation logic here
    const createdRestaurant = {
      id: restaurants.length + 1,
      ...newRestaurant,
      ratings: 0,
      location: 'New Location',
      isOpen: true,
    };
    setRestaurants([...restaurants, createdRestaurant]);
    setNewRestaurant({ name: '', image: '', foodCategory: '', openingHours: '', closingHours: '' });
    alert('New restaurant created (admin approval required).');
  };

  const toggleRestaurantStatus = (id) => {
    setRestaurants(
      restaurants.map((restaurant) =>
        restaurant.id === id ? { ...restaurant, isOpen: !restaurant.isOpen } : restaurant
      )
    );
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Restaurant Management</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="border rounded-lg p-4 shadow-md">
            <RestaurantCard restaurant={restaurant} />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-semibold">
                Status: {restaurant.isOpen ? 'Open' : 'Closed'}
              </span>
              <button
                onClick={() => toggleRestaurantStatus(restaurant.id)}
                className={`py-1 px-3 rounded ${restaurant.isOpen ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
              >
                {restaurant.isOpen ? 'Close' : 'Open'} Restaurant
              </button>
            </div>
          </div>
        ))}
      </div>
      <h4 className="text-xl font-semibold mb-4">Create New Restaurant</h4>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Restaurant Name"
          value={newRestaurant.name}
          onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
          className="p-2 border rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Food Category"
          value={newRestaurant.foodCategory}
          onChange={(e) => setNewRestaurant({ ...newRestaurant, foodCategory: e.target.value })}
          className="p-2 border rounded mb-2 w-full"
        />
        <input
          type="time"
          placeholder="Opening Hours"
          value={newRestaurant.openingHours}
          onChange={(e) => setNewRestaurant({ ...newRestaurant, openingHours: e.target.value })}
          className="p-2 border rounded mb-2 w-full"
        />
        <input
          type="time"
          placeholder="Closing Hours"
          value={newRestaurant.closingHours}
          onChange={(e) => setNewRestaurant({ ...newRestaurant, closingHours: e.target.value })}
          className="p-2 border rounded mb-2 w-full"
        />
        <button onClick={handleCreateRestaurant} className="py-2 px-4 bg-blue-600 text-white rounded">
          Create Restaurant
        </button>
      </div>
    </div>
  );
};

export default RestaurantManagement;
