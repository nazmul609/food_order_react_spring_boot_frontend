import React, { useState } from 'react';
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

  const dummyRestaurants = [
    { id: 1, name: 'The Food Place', image: 'https://cdn.pixabay.com/photo/2017/07/15/13/45/french-restaurant-2506490_640.jpg', ratings: 4.9, location: '123 Main St', isOpen: true },
    { id: 2, name: 'Cuisine Corner', image: 'https://cdn.pixabay.com/photo/2022/11/14/10/37/chinese-lanterns-7591296_640.jpg', ratings: 4.8, location: '456 Elm St', isOpen: false },
    { id: 3, name: 'Taste Haven', image: 'https://cdn.pixabay.com/photo/2020/01/31/07/26/chef-4807317_640.jpg', ratings: 4.7, location: '789 Maple St', isOpen: true },
    { id: 4, name: 'Gourmet Delight', image: 'https://cdn.pixabay.com/photo/2015/09/14/11/43/restaurant-939435_640.jpg', ratings: 4.5, location: '101 Pine St', isOpen: true },
    { id: 5, name: 'Dine Divine', image: 'https://cdn.pixabay.com/photo/2017/03/27/14/21/chairs-2179044_640.jpg', ratings: 4.2, location: '202 Oak St', isOpen: true },
    { id: 6, name: 'Food Fiesta', image: 'https://cdn.pixabay.com/photo/2020/08/27/07/31/restaurant-5521372_640.jpg', ratings: 4.6, location: '303 Birch St', isOpen: true },
  ];

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleRestaurantClick = (restaurant) => {
    if (restaurant.isOpen) {
      navigate(`/restaurant/${restaurant.id}`);
    }
  };

  const filteredRestaurants = dummyRestaurants.filter((restaurant) => {
    return (
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.location.toLowerCase().includes(searchTerm.toLowerCase())
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
                  className={`rounded-lg overflow-hidden shadow-lg cursor-pointer ${!restaurant.isOpen ? 'pointer-events-none opacity-50' : ''}`}
                  onClick={() => handleRestaurantClick(restaurant)}
                >
                  <RestaurantCard restaurant={restaurant} />
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
