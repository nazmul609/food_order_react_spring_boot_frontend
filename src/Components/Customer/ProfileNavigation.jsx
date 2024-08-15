import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingBag, faHeart, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Divider } from '@mui/material';

const menu = [
  { title: "Customer Details", icon: faUser, path: "/customer-profile/customer-details" },
  { title: "Orders and History", icon: faShoppingBag, path: "/customer-profile/orders-history" },
  { title: "Favorite Restaurants", icon: faHeart, path: "/customer-profile/favorites" },
  { title: "Notifications", icon: faBell, path: "/customer-profile/notifications" },
  { title: "Logout", icon: faSignOutAlt, path: "/logout" },
];

const ProfileNavigation = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      {menu.map((item, index) => (
        <React.Fragment key={index}>
          <div
            onClick={() => navigate(item.path)}
            className="flex items-center space-x-4 p-3 cursor-pointer hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={item.icon} className="text-lg" />
            <span>{item.title}</span>
          </div>
          
          {index < menu.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProfileNavigation;
