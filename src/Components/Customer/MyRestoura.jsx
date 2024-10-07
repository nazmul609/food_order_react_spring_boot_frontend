// MyRestoura.js
import React from 'react';
import Navigation from './Navigation';
import { Route, Routes } from 'react-router-dom';
import OrdersHistory from './OrdersHistory';
import FavoriteRestaurants from './FavoriteRestaurants';
import Notifications from './Notifications';
import { faShoppingBag, faHeart, faBell } from '@fortawesome/free-solid-svg-icons';

const userId = localStorage.getItem('userId');

// Menu with the other three options
const myRestouraMenu = [
  { title: "Orders and History", icon: faShoppingBag, path: `/my-restoura/orders-history/${userId}` },
  { title: "Favorite Restaurants", icon: faHeart, path: `/my-restoura/favorites/${userId}` },
  { title: "Notifications", icon: faBell, path: `/my-restoura/notifications/${userId}` }
];

function MyRestoura() {
  return (
    <div className="flex">
      <Navigation menu={myRestouraMenu} />
      <div className="flex-1 p-8">
        <Routes>
          <Route path="orders-history/:id" element={<OrdersHistory />} />
          <Route path="favorites/:id" element={<FavoriteRestaurants />} />
          <Route path="notifications/:id" element={<Notifications />} />
        </Routes>
      </div>
    </div>
  );
}

export default MyRestoura;
