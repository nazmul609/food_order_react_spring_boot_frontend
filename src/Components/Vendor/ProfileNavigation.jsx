import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider } from '@mui/material';



const ProfileNavigation = ({ menu }) => {
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

export default ProfileNavigation;
