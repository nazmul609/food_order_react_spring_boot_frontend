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
      // Retrieve the cart from localStorage or initialize an empty array
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

      const newItem = {
        restaurantId,
        restaurantName,
        cuisineId: id,
        cuisineName,
        cuisinePrice: price,
        quantity: 1,
      };

      // Check if the same cuisine from the same restaurant is already in the cart
      const existingItemIndex = cartItems.findIndex(
        item => item.restaurantId === restaurantId && item.cuisineId === id
      );

      if (existingItemIndex !== -1) {
        // If the item already exists, increase its quantity
        cartItems[existingItemIndex].quantity += 1;
      } else {
        // Otherwise, add the new item to the cart
        cartItems.push(newItem);
      }

      // Store the updated cart in localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      console.log('Item added to cart');
      
     
      window.location.reload(); // quick refresh to reflect cart changes
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
