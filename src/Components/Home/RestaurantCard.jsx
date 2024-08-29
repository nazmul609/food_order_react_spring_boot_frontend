import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faClock, faUtensils } from '@fortawesome/free-solid-svg-icons';

const RestaurantCard = ({ restaurant }) => {
  const { id, name, openOrClosed, operatingHours, cuisineType } = restaurant;
  const [imageUrl, setImageUrl] = useState('');
  const ratings = 4.5;
  const isOpen = openOrClosed === true; 

  useEffect(() => {
    const fetchImage = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:8080/restaurant/downloadImage/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          setImageUrl(imageUrl);
        } else {
          console.error('Failed to fetch image');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchImage();
  }, [id]);

  return (
    <div className="rounded-lg overflow-hidden shadow-lg relative">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className={`w-full h-64 object-cover object-center ${!isOpen ? 'opacity-50' : ''}`}
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Loading image...</span>
        </div>
      )}
      {!isOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <span className="text-white font-bold text-lg">Closed</span>
        </div>
      )}
      <div className="p-4 bg-white">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <button className="text-gray-600 hover:text-red-500 focus:outline-none">
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <FontAwesomeIcon icon={faUtensils} className="mr-2" />
          <p>{cuisineType}</p>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            <p>{operatingHours}</p>
          </div>
          <p className="text-yellow-500">⭐ {ratings}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
