import React, { useState, useEffect } from 'react';
import { FormControlLabel, Typography, RadioGroup, Divider, FormControl, Radio, Slider } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import InfoIcon from '@mui/icons-material/Info';
import MenuCard from './MenuCard';
import { useParams } from 'react-router-dom';
import API_BASE_URL from '../../apiConfig';

const RestaurantDetails = () => {
  const [restaurant, setRestaurant] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [cuisines, setCuisines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [maxPrice, setMaxPrice] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`${API_BASE_URL}/restaurant/allRestaurants`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const restaurantDetails = data.find((item) => item.id === parseInt(id));

          if (restaurantDetails) {
            setRestaurant(restaurantDetails);

            const imageResponse = await fetch(`${API_BASE_URL}/restaurant/downloadImage/${id}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });

            if (imageResponse.ok) {
              const imageBlob = await imageResponse.blob();
              const imageObjectURL = URL.createObjectURL(imageBlob);
              setImageUrl(imageObjectURL);
            }

            const cuisinesResponse = await fetch(`${API_BASE_URL}/cuisine/allCuisines/${id}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });

            if (cuisinesResponse.ok) {
              const cuisinesData = await cuisinesResponse.json();
              setCuisines(cuisinesData);

              const uniqueCategories = [...new Set(cuisinesData.map(cuisine => cuisine.category))];
              setCategories(uniqueCategories);

              const maxPriceValue = Math.max(...cuisinesData.map(cuisine => cuisine.price));
              setMaxPrice(maxPriceValue);
            }
          }
        } else {
          console.error('Failed to fetch restaurant details');
        }
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };


  const filteredCuisines = cuisines.filter(cuisine =>
    (selectedCategory === '' || cuisine.category === selectedCategory) &&
    cuisine.price >= priceRange[0] && cuisine.price <= priceRange[1] &&
    cuisine.cuisineName.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="px-4 lg:px-16 bg-green-50 min-h-screen pb-20">
      {/* Restaurant Information Section */}
      <section className="mt-4 flex flex-col lg:flex-row items-center lg:items-start">
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start lg:pr-6">
          <div className="w-full max-w-md lg:max-w-full lg:h-[400px]">
            <img
              className="w-full h-[250px] sm:h-[300px] lg:h-[400px] object-cover rounded-xl shadow-lg"
              src={imageUrl}
              alt="Restaurant"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 mt-6 lg:mt-0 text-center lg:text-left">
          <h1 className="text-gray-800 font-extrabold text-2xl sm:text-3xl lg:text-4xl drop-shadow-md mb-4">
            {restaurant.name || "Restaurant Name"}
          </h1>
          <div className="space-y-4">
            <p className="text-gray-600 flex items-center justify-center lg:justify-start gap-3">
              <MailOutlineIcon /> <span>{restaurant.email || "email@example.com"}</span>
            </p>
            <p className="text-gray-600 flex items-center justify-center lg:justify-start gap-3">
              <RestaurantMenuIcon /> <span>{restaurant.cuisineType || "Cuisine Type"}</span>
            </p>
            <p className="text-gray-600 flex items-center justify-center lg:justify-start gap-3">
              <CalendarTodayIcon /> <span>{restaurant.operatingHours || "Operating Hours"}</span>
            </p>
            <p className="text-gray-600 flex items-center justify-center lg:justify-start gap-3">
              <InfoIcon /> <span>{restaurant.description || "Restaurant description goes here."}</span>
            </p>
          </div>
        </div>
      </section>

      <Divider className="my-8" />

      {/* Search and Cuisine Types Section */}

      <div className="flex flex-col gap-4 mt-8">
        <div className="flex items-center gap-4">
        {/* Search Menu */}
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-40 rounded-full px-3 py-2 bg-white/50 backdrop-blur-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        {/* Cuisine Types */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-40 px-3 py-2 rounded-full text-sm font-semibold 
                ${selectedCategory === category ? 'bg-black text-white' : 'bg-gray-300 text-gray-700'} 
                hover:bg-gray-500 hover:text-white transition-all`}
            >
              {category} ({cuisines.filter(cuisine => cuisine.category === category).length})
            </button>
          ))}
        </div>
      </div>

     {/* Display Filtered Cuisine Count */}
      <div className="text-gray-600 text-sm mt-2">
        Showing {filteredCuisines.length} items for "{selectedCategory || 'All Categories'}"
      </div>
    </div>




      {/* Filter and Menu Section */}
      <section className="pt-8 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/4 lg:sticky lg:top-28 mb-8 lg:mb-0 space-y-6">
          <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
            <Typography variant="h5" className="pb-4 font-semibold text-gray-800">
              Price Range
            </Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={maxPrice}
              step={1}
              aria-labelledby="price-range-slider"
            />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
            <Typography variant="h5" className="pb-4 font-semibold text-gray-800">
              Category
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup onChange={handleCategoryChange} name="food_type" value={selectedCategory}>
                <FormControlLabel value="" control={<Radio />} label="All" />
                {categories.map((category) => (
                  <FormControlLabel
                    key={category}
                    value={category}
                    control={<Radio />}
                    label={category}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        {/* Menu Items Section */}
        <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 lg:pl-8">
          {filteredCuisines.map((cuisine) => (
            <MenuCard
              key={cuisine.id}
              id={cuisine.id}
              cuisineName={cuisine.cuisineName}
              category={cuisine.category}
              description={cuisine.description}
              price={cuisine.price}
              availability={cuisine.availability}
              restaurantId={id}
              restaurantName={restaurant.name}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetails;
