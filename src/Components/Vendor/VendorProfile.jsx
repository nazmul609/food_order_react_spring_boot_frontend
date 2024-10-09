import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfileNavigation from './ProfileNavigation';
import MyProfile from './MyProfile';
import { faUser} from '@fortawesome/free-solid-svg-icons';

const userId = localStorage.getItem('userId'); 

const vendor_menu = [
  { title: "My Profile", icon: faUser, path: `/vendor-profile/my-profile/${userId}` },
];

const VendorProfile = () => {
  return (
    <div className="flex">
      <ProfileNavigation menu={vendor_menu} />

      <div className="flex-1 p-8">
        <Routes>
          <Route path="my-profile/:id" element={<MyProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default VendorProfile;
