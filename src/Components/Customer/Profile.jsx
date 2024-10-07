import React from 'react';
import Navigation from './Navigation';
import { Route, Routes } from 'react-router-dom';
import CustomerDetails from './CustomerDetails';
import AddressManagement from './AddressManagement'; 
import PaymentMethod from './PaymentMethod'; 
import { faUser, faCreditCard, faAddressCard } from '@fortawesome/free-solid-svg-icons';

const userId = localStorage.getItem('userId');

// Menu with Customer Details and Payment Method
const customerDetailsMenu = [
  { title: "Customer Details", icon: faUser, path: `/customer-profile/my-profile/${userId}` },
  { title: "Address Management", icon: faAddressCard, path: `/customer-profile/address-management/${userId}` },
  { title: "Payment Method", icon: faCreditCard, path: `/customer-profile/payment-method/${userId}` }
];

function Profile() {
  return (
    <div className="flex">
      <Navigation menu={customerDetailsMenu} />
      <div className="flex-1 p-8">
        <Routes>
          <Route path="my-profile/:id" element={<CustomerDetails />} />
          <Route path="address-management/:id" element={<AddressManagement />} />
          <Route path="payment-method/:id" element={<PaymentMethod />} />
        </Routes>
      </div>
    </div>
  );
}

export default Profile;
