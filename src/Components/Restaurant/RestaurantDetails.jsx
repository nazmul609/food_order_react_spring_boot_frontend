import React, { useState, useEffect } from 'react'
import { FormControlLabel, Grid, Typography, RadioGroup, Divider, FormControl, Radio, Slider } from '@mui/material'; 
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import InfoIcon from '@mui/icons-material/Info';
import MenuCard from './MenuCard';
import { useParams } from 'react-router-dom';

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
        const response = await fetch('http://localhost:8080/restaurant/allRestaurants', {
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
            const imageResponse = await fetch(`http://localhost:8080/restaurant/downloadImage/${id}`, {
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
            const cuisinesResponse = await fetch(`http://localhost:8080/cuisine/allCuisines/${id}`, {
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
    <div className='px-4 lg:px-20 bg-green-50 min-h-screen pb-10'>
      <section className='mt-2'>
        <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <img
              className='w-full h-[40vh] object-cover rounded-lg'
              src={imageUrl}
              alt="Restaurant"
            />
          </Grid>
        </Grid>

        </div>
        <div className='pt-3 pb-5'>
          <h1 className='text-gray-800 py-2 mt-2 block font-extrabold text-3xl drop-shadow-md'>
            {restaurant.name || "Restaurant Name"}
          </h1>
          <div className='space-y-3 mt-3'>
            <p className='text-gray-500 flex items-center gap-3'>
              <MailOutlineIcon /> <span>{restaurant.email || "email@example.com"}</span>
            </p>
            <p className='text-gray-500 flex items-center gap-3'>
              <RestaurantMenuIcon /> <span>{restaurant.cuisineType || "Cuisine Type"}</span>
            </p>
            <p className='text-gray-500 flex items-center gap-3'>
              <CalendarTodayIcon /> <span>{restaurant.operatingHours || "Operating Hours"}</span>
            </p>
            <p className='text-gray-500 flex items-center gap-3'>
              <InfoIcon /> <span>{restaurant.description || "Restaurant description goes here."}</span>
            </p>
          </div>
        </div>
      </section>
      <Divider />
      <section className='pt-8 lg:flex'>
        <div className='space-y-10 lg:w-1/4 lg:sticky lg:top-28'>
          <div className='bg-white shadow-lg rounded-lg p-5 mb-5'>
            <Typography variant="h5" className="pb-4">
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
          <div className='bg-white shadow-lg rounded-lg p-5'>
            <Typography variant="h5" className="pb-4">
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
        <div className='space-y-4 lg:w-3/4 lg:pl-8'>
          {filteredCuisines.map((cuisine) => (
            <MenuCard
              key={cuisine.id}
              id={cuisine.id}
              cuisineName={cuisine.cuisineName}
              category={cuisine.category}
              description={cuisine.description}
              price={cuisine.price}
              availability={cuisine.availability}
            />
          ))}
        </div>
      </section>
    </div>
  );
  
  
};

export default RestaurantDetails;
