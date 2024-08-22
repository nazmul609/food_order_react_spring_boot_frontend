import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfileNavigation from './ProfileNavigation';
import MyProfile from './MyProfile';
import RestaurantManagement from './RestaurantManagement';
import OrderManagement from './OrderManagement';
import MenuManagement from './MenuManagement';
import ReportsAndAnalytics from './ReportsAndAnalytics';
import OffersAndPromo from './OffersAndPromo';


const VendorProfile = () => {
  return (
    <div className="flex">
      <ProfileNavigation />
      <div className="flex-1 p-8">
        <Routes>
          <Route path="my-profile/:id" element={<MyProfile />} />
          <Route path="restaurant-management/:id" element={<RestaurantManagement />} />
          <Route path="order-management/:id" element={<OrderManagement/>} />
          <Route path="menu-management/:id" element={<MenuManagement/>} />
          <Route path="report-analytics/:id" element={<ReportsAndAnalytics/>} />
          <Route path="offers-promo/:id" element={<OffersAndPromo/>} />
          
        </Routes>
      </div>
    </div>
  );
};

export default VendorProfile;
