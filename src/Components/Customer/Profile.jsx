import React from 'react';
import Navigation from './Navigation';
import { Route, Routes } from 'react-router-dom';
import CustomerDetails from './CustomerDetails';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const userId = localStorage.getItem('userId');

// Menu with only Customer Details
const customerDetailsMenu = [
  { title: "Customer Details", icon: faUser, path: `/customer-profile/my-profile/${userId}` }
];

function Profile() {
  return (
    <div className="flex">
      <Navigation menu={customerDetailsMenu} />
      <div className="flex-1 p-8">
        <Routes>
          <Route path="my-profile/:id" element={<CustomerDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default Profile;
