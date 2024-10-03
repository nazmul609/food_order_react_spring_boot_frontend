import React, { useState, useEffect } from 'react'
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
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const { id } = useParams(); // Extracting id from the URL

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
            // Fetch the image after getting restaurant details
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

            // Fetch the cuisines for the restaurant
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
              
              // Extract unique categories
              const uniqueCategories = [...new Set(cuisinesData.map(cuisine => cuisine.category))];
              setCategories(uniqueCategories);
              
              console.log('Cuisines:', cuisinesData); // debug the data
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
    cuisine.price >= priceRange[0] && cuisine.price <= priceRange[1]
  );

  return (
    <div className='px-4 lg:px-20 bg-green-50 min-h-screen pb-20'>
      <section className='mt-4'>
      <div className='flex justify-center'>
            <div className="w-full max-w-full max-h-[400px]">
              <img
                className='w-full max-h-[400px] object-cover rounded-xl shadow-lg'
                src={imageUrl}
                alt="Restaurant"
              />
            </div>
      </div>

        <div className='pt-6 pb-8'>
          <h1 className='text-gray-800 font-extrabold text-4xl drop-shadow-md'>
            {restaurant.name || "Restaurant Name"}
          </h1>
          <div className='space-y-4 mt-4'>
            <p className='text-gray-600 flex items-center gap-3'>
              <MailOutlineIcon /> <span>{restaurant.email || "email@example.com"}</span>
            </p>
            <p className='text-gray-600 flex items-center gap-3'>
              <RestaurantMenuIcon /> <span>{restaurant.cuisineType || "Cuisine Type"}</span>
            </p>
            <p className='text-gray-600 flex items-center gap-3'>
              <CalendarTodayIcon /> <span>{restaurant.operatingHours || "Operating Hours"}</span>
            </p>
            <p className='text-gray-600 flex items-center gap-3'>
              <InfoIcon /> <span>{restaurant.description || "Restaurant description goes here."}</span>
            </p>
          </div>
        </div>
      </section>
      <Divider className="my-8" />
      <section className='pt-8 lg:flex'>
        <div className='space-y-8 lg:w-1/4 lg:sticky lg:top-28'>
          <div className='bg-white shadow-xl rounded-lg p-6'>
            <Typography variant="h5" className="pb-4 font-semibold text-gray-800">
              Price Range
            </Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              step={1}
              aria-labelledby="price-range-slider"
            />
          </div>
          <Divider />
          <div className='bg-white shadow-xl rounded-lg p-6'>
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
        <div className='space-y-6 lg:w-3/4 lg:pl-10'>
          {filteredCuisines.map((cuisine) => (
            <MenuCard
              key={cuisine.id}
              id={cuisine.id}
              cuisineName={cuisine.cuisineName}
              category={cuisine.category}
              description={cuisine.description}
              price={cuisine.price}
              availability={cuisine.availability}
              restaurantId={id}          // Pass restaurant ID
              restaurantName={restaurant.name}  
            />
          ))}
        </div>
      </section>
    </div>

  );
  
  
};

export default RestaurantDetails;
