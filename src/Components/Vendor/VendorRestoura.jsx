import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfileNavigation from './ProfileNavigation';
import RestaurantManagement from './NewRestaurantCreate';
import OrderManagement from './OrderManagement';
import MenuManagement from './MenuManagement';
import ReportsAndAnalytics from './ReportsAndAnalytics';
import OffersAndPromo from './OffersAndPromo';
import VendorRestaurantsPage from './VendorRestaurantsPage';


import { faShoppingBag, faUtensils, faBowlFood, faEnvelopeOpen, faMagnifyingGlassDollar, faStore } from '@fortawesome/free-solid-svg-icons';

const userId = localStorage.getItem('userId'); 

const vendor_menu = [ 
    { title: "Restaurant Management", icon: faStore, path: `/vendor-restoura/my-restaurants/${userId}` },
  { title: "Create Restaurant", icon: faUtensils, path: `/vendor-restoura/restaurant-management/${userId}` },
  { title: "Order Management", icon: faBowlFood, path: `/vendor-restoura/order-management/${userId}` },
  { title: "Menu Management", icon: faShoppingBag, path: `/vendor-restoura/menu-management/${userId}` },
  { title: "Offers/Promo", icon: faEnvelopeOpen, path: `/vendor-restoura/offers-promo/${userId}` },
  { title: "Report & Analytics", icon: faMagnifyingGlassDollar, path: `/vendor-restoura/report-analytics/${userId}` }

];

const VendorRestoura = () => {
  return (
    <div className="flex">
      <ProfileNavigation menu={vendor_menu} />
      <div className="flex-1 p-8">
        <Routes>
          <Route path="my-restaurants/:id" element={<VendorRestaurantsPage />} /> 
          <Route path="restaurant-management/:id" element={<RestaurantManagement />} />
          <Route path="order-management/:id" element={<OrderManagement />} />
          <Route path="menu-management/:id" element={<MenuManagement />} />
          <Route path="report-analytics/:id" element={<ReportsAndAnalytics />} />
          <Route path="offers-promo/:id" element={<OffersAndPromo />} />

        </Routes>
      </div>
    </div>
  );
};

export default VendorRestoura;
