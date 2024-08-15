import React, { useState } from 'react';
import RestaurantCard from '../Home/RestaurantCard';

const FavoriteRestaurants = () => {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([
    {
      name: "Restaurant A",
      image: "https://via.placeholder.com/400x300",
      ratings: 4.5,
      location: "Location A",
      isOpen: true,
    },
    {
      name: "Restaurant B",
      image: "https://via.placeholder.com/400x300",
      ratings: 4.0,
      location: "Location B",
      isOpen: false,
    },
  ]);

  const removeRestaurant = (indexToRemove) => {
    const confirmRemove = window.confirm("Are you sure you want to remove this restaurant from your favorites?");
    if (confirmRemove) {
      setFavoriteRestaurants((prevRestaurants) =>
        prevRestaurants.filter((_, index) => index !== indexToRemove)
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Favorite Restaurants</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {favoriteRestaurants.length > 0 ? (
          favoriteRestaurants.map((restaurant, index) => (
            <div key={index} className="relative">
              <RestaurantCard restaurant={restaurant} />
              <button
                onClick={() => removeRestaurant(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 text-sm"
                aria-label="Remove from favorites"
              >
                ❌
              </button>
            </div>
          ))
        ) : (
          <p>No favorite restaurants available.</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteRestaurants;
