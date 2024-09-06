import React, { useState, useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MenuCard = ({ id, cuisineName, category, description, price, availability, restaurantId, restaurantName }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchCuisineImage = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:8080/cuisine/downloadImage/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const imageBlob = await response.blob();
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setImageUrl(imageObjectURL);
        } else {
          console.error('Failed to fetch cuisine image');
        }
      } catch (error) {
        console.error('Error fetching cuisine image:', error);
      }
    };

    fetchCuisineImage();
  }, [id]);

  const handleAddToCart = () => {
    if (availability) {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const newItem = {
        id,
        name: cuisineName,
        price,
        quantity: 1,
        
      };

      // Check if the item already exists in the cart
      const existingItemIndex = cartItems.findIndex(item => item.id === id);
      if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += 1; // Increase quantity if it already exists
      } else {
        cartItems.push(newItem); // Add new item to the cart
      }

      // Store updated cart
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      // Check if restaurant ID and name are already stored
      const storedRestaurant = JSON.parse(localStorage.getItem('restaurantInfo')) || {};
      if (!storedRestaurant.id || storedRestaurant.id !== restaurantId) {
        // Save restaurant ID and name to local storage if not already saved
        localStorage.setItem('restaurantInfo', JSON.stringify({
          id: restaurantId,
          name: restaurantName,
        }));
        console.log('Restaurant info saved to local storage');
      }

      console.log('Item added to cart');
      // Optionally reload the page to reflect changes
      window.location.reload();
    } else {
      console.log('Out of stock');
    }
  };

  return (
    <Accordion className="shadow-lg mb-4 rounded-lg overflow-hidden">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1-content'
        id='panel1-header'
        className="bg-gray-100 hover:bg-gray-200"
      >
        <div className='flex items-center w-full space-x-4'>
          <img
            className='w-24 h-24 object-cover rounded-lg shadow-md'
            src={imageUrl}
            alt="item pic"
          />
          <div className='flex-1 space-y-2'>
            <div className='text-lg font-semibold text-gray-800'>{cuisineName || "Cuisine Name goes here"}</div>
            <div className='flex items-center space-x-3'>
              <span className='bg-yellow-300 text-black text-md font-medium px-3 py-1 rounded-full'>
                ${price || "Price goes here"}
              </span>
            </div>
            <div className='flex items-center space-x-3'>
            <div className='text-gray-500'>{description || "Description goes here."}</div>
              <span className='bg-blue-100 text-blue-800 text-md font-medium px-3 py-1 rounded-full'>
                {category || "Category goes here"}
              </span>
            </div>
            

          </div>


        </div>
      </AccordionSummary>
      <AccordionDetails className="bg-gray-50">
        <div className='flex justify-start p-4'>
          {availability ? (
            <Button variant='contained' color='primary' onClick={handleAddToCart} className="text-white">
              Add to Cart
            </Button>
          ) : (
            <Button variant='outlined' color='secondary' disabled>
              Out of Stock
            </Button>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCard;

