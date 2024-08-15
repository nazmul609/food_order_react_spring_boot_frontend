import React from 'react';
import ProfileNavigation from './ProfileNavigation';
import { Route, Routes } from 'react-router-dom';
import CustomerDetails from './CustomerDetails';
import OrdersHistory from './OrdersHistory';
import FavoriteRestaurants from './FavoriteRestaurants';
import Notifications from './Notifications';

function Profile() {
  return (
    <div className="flex mt-16 h-screen">
      <div className="w-1/4  p-4">
        <ProfileNavigation />
      </div>
      <div className="w-3/4 p-6">
        <Routes>
          <Route path="customer-details" element={<CustomerDetails />} />
          
          <Route path="orders-history" element={<OrdersHistory />} />
          <Route path="favorites" element={<FavoriteRestaurants />} />
          <Route path="notifications" element={<Notifications />} />
        </Routes>
      </div>
    </div>
  );
}

export default Profile;
