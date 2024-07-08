import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const RestaurantCard = ({ restaurant }) => {
  const { name, image, ratings, location, isOpen } = restaurant;

  return (
    <div className="rounded-lg overflow-hidden shadow-lg relative">
      <img
        src={image}
        alt={name}
        className={`w-full h-64 object-cover object-center ${!isOpen ? 'opacity-50' : ''}`}
      />
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
        <div className="flex justify-between text-sm text-gray-600">
          <p>{location}</p>
          <p className="text-yellow-500">⭐ {ratings}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
