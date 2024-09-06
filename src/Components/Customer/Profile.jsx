import React from 'react';
import ProfileNavigation from './ProfileNavigation';
import { Route, Routes } from 'react-router-dom';
import CustomerDetails from './CustomerDetails';
import OrdersHistory from './OrdersHistory';
import FavoriteRestaurants from './FavoriteRestaurants';
import Notifications from './Notifications';

function Profile() {
  return (
    <div className="flex">
      
        <ProfileNavigation />
      
      <div className="flex-1 p-8">
        <Routes>
          <Route path="my-profile/:id" element={<CustomerDetails />} />
          <Route path="orders-history/:id" element={<OrdersHistory />} />
          <Route path="favorites/:id" element={<FavoriteRestaurants />} />
          <Route path="notifications/:id" element={<Notifications />} />
        </Routes>
      </div>
    </div>
  );
}

export default Profile;
