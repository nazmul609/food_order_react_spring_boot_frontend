import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantCard from '../Home/RestaurantCard';

const AllRestaurantsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({
    sortBy: '',
    offers: false,
    price: '',
    cuisine: '',
  });
  const [restaurants, setRestaurants] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      const token = localStorage.getItem('token'); 
  
      try {
        const response = await fetch('http://localhost:8080/restaurant/allRestaurants', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setRestaurants(data);
        } else {
          console.error('Failed to fetch restaurants');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchRestaurants();
  }, []);
  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  //click a particular restaurant
  const handleRestaurantClick = (restaurant) => {
    if (restaurant.openOrClosed === true) {
      navigate(`/restaurant/${restaurant.name}/${restaurant.id}`);
    }
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    return (
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.location?.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
  });

  return (
    <div className="w-full min-h-screen bg-green-50 overflow-x-hidden">
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row">
          {/* Filters Section */}
          <div className="w-full md:w-1/5 md:pr-4 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Filters</h2>
            <div className="flex flex-wrap gap-4 mb-6">
              <select
                name="sortBy"
                value={filter.sortBy}
                onChange={handleFilterChange}
                className="block w-full rounded bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow focus:outline-none focus:ring"
              >
                <option value="">Sort by</option>
                <option value="distance">Distance</option>
                <option value="relevance">Relevance</option>
              </select>
              <select
                name="price"
                value={filter.price}
                onChange={handleFilterChange}
                className="block w-full rounded bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow focus:outline-none focus:ring"
              >
                <option value="">Price</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <select
                name="cuisine"
                value={filter.cuisine}
                onChange={handleFilterChange}
                className="block w-full rounded bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow focus:outline-none focus:ring"
              >
                <option value="">Cuisine</option>
                {/* Add cuisine options here */}
              </select>
              <label className="w-full flex items-center rounded bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow focus:outline-none focus:ring">
                <input
                  type="checkbox"
                  name="offers"
                  checked={filter.offers}
                  onChange={() => setFilter({ ...filter, offers: !filter.offers })}
                />
                <span className="ml-2">Offers</span>
              </label>
            </div>
          </div>
          {/* Restaurants Section */}
          <div className="w-full md:w-4/5">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search for restaurants, dishes, cuisines"
                className="w-full rounded bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow focus:outline-none focus:ring"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <h2 className="text-2xl font-bold mb-4">All Restaurants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant, index) => (
                <div
                  key={index}
                  className={`rounded-lg overflow-hidden shadow-lg cursor-pointer ${restaurant.openOrClosed !== true ? 'pointer-events-none opacity-50' : ''}`}
                  onClick={() => handleRestaurantClick(restaurant)}
                >
                  <RestaurantCard 
                    restaurant={{
                      id: restaurant.id,
                      name: restaurant.name,
                      openOrClosed: restaurant.openOrClosed,
                      operatingHours: restaurant.operatingHours,
                      cuisineType: restaurant.cuisineType
                    }} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRestaurantsPage;
