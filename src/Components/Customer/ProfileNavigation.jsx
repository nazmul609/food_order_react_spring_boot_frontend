import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingBag, faHeart, faBell } from '@fortawesome/free-solid-svg-icons';
import { Divider } from '@mui/material';

const userId = localStorage.getItem('userId'); 
const menu = [
  { title: "Customer Details", icon: faUser, path: `/customer-profile/my-profile/${userId}`},
  { title: "Orders and History", icon: faShoppingBag, path: `/customer-profile/orders-history/${userId}`},
  { title: "Favorite Restaurants", icon: faHeart, path: `/customer-profile/favorites/${userId}` },
  { title: "Notifications", icon: faBell, path: `/customer-profile/notifications/${userId}` }
];

const CustomerProfileNavigation = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white mt-4 p-6 shadow-md rounded-lg w-64">
      <div className="flex flex-col h-full space-y-4">
        {menu.map((item, index) => (
          <React.Fragment key={index}>
            <div
              onClick={() => navigate(item.path)}
              className="flex items-center space-x-6 p-5 cursor-pointer hover:bg-gray-200 rounded-lg transition text-lg font-semibold"
            >
              <FontAwesomeIcon icon={item.icon} className="text-2xl" />
              <span>{item.title}</span>
            </div>
            {index < menu.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CustomerProfileNavigation;
