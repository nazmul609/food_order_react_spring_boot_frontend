import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../apiConfig';



const CartItem = ({ item, onAdd, onRemove }) => {
  const [imageUrl, setImageUrl] = useState('');



  useEffect(() => {
    const fetchCuisineImage = async () => {
      const token = localStorage.getItem('token');
      // const baseURL = process.env.RESTOURA_API_BASE_URL;
      try {
        const response = await fetch(`${API_BASE_URL}/cuisine/downloadImage/${item.cuisineId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const imageBlob = await response.blob();
          const imageObjectUrl = URL.createObjectURL(imageBlob);
          setImageUrl(imageObjectUrl); // Set the image URL in state
        } else {
          console.error('Failed to fetch image');
        }
      } catch (error) {
        console.error('Error fetching cuisine image:', error);
      }
    };

    fetchCuisineImage();
  }, [item.cuisineId]);

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        {imageUrl ? (
          <img src={imageUrl} alt={item.cuisineName} className="w-16 h-16 object-cover rounded-lg" />
        ) : (
          <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
        )}
        <div>
          <h2 className="text-lg font-semibold">{item.cuisineName}</h2>
          <p className="text-gray-600">Price: ${item.cuisinePrice}</p>
          <p className="text-gray-600">Quantity: {item.quantity}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onAdd(item.cuisineId)}
          className="px-2 py-1 bg-green-500 text-white rounded"
        >
          +
        </button>
        <button
          onClick={() => onRemove(item.cuisineId)}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default CartItem;
