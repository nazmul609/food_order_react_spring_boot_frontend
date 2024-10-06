import React, { useState, useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import API_BASE_URL from '../../apiConfig';

const MenuCard = ({ id, cuisineName, category, description, price, availability, restaurantId, restaurantName }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchUserRole = () => {
      const role = localStorage.getItem('role');
      setUserRole(role);
    };
    
    const fetchCuisineImage = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${API_BASE_URL}/cuisine/downloadImage/${id}`, {
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

    fetchUserRole();
    fetchCuisineImage();
  }, [id]);

  const handleAddToCart = () => {
    if (availability) {
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

      const newItem = {
        restaurantId,
        restaurantName,
        cuisineId: id,
        cuisineName,
        cuisinePrice: price,
        quantity: 1,
      };

      const existingItemIndex = cartItems.findIndex(
        item => item.restaurantId === restaurantId && item.cuisineId === id
      );

      if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += 1;
      } else {
        cartItems.push(newItem);
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      
      console.log('Item added to cart');
      window.location.reload(); // quick refresh to reflect cart changes
    } else {
      console.log('Out of stock');
    }
  };

  return (
    <div className="max-w-md mx-auto w-full">
      <Accordion className="shadow-lg mb-6 rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 ease-in-out">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className="bg-gray-100 hover:bg-gray-200 p-4"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex-1 space-y-3 text-left pr-4">
              <div className="text-xl font-semibold text-gray-800">
                {cuisineName || "Cuisine Name goes here"}
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-yellow-300 text-black text-lg font-medium px-4 py-1 rounded-full">
                  ${price || "Price goes here"}
                </span>
              </div>
              <div className="flex items-center space-x-3 mt-1">
                <p className="text-gray-600">{description || "Description goes here."}</p>
              </div>
            </div>
            <img
              className="w-24 h-24 object-cover rounded-lg shadow-md"
              src={imageUrl}
              alt="item pic"
            />
          </div>
        </AccordionSummary>
        <AccordionDetails className="bg-gray-50 p-4">
          <div className="flex justify-start">
            {availability ? (
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleAddToCart} 
                className="text-white"
                disabled={userRole !== 'customer'} // Disable if role is not 'customer'
              >
                Add to Cart
              </Button>
            ) : (
              <Button variant="outlined" color="secondary" disabled>
                Out of Stock
              </Button>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MenuCard;
