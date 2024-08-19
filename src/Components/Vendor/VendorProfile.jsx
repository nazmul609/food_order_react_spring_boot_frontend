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
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="restaurant-management" element={<RestaurantManagement />} />
          <Route path="order-management" element={<OrderManagement/>} />
          <Route path="menu-management" element={<MenuManagement/>} />
          <Route path="report-analytics" element={<ReportsAndAnalytics/>} />
          <Route path="offers-promo" element={<OffersAndPromo/>} />
          {/* Add routes for other management  */}
        </Routes>
      </div>
    </div>
  );
};

export default VendorProfile;
