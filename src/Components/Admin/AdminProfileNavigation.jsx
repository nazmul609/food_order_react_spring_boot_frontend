import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Divider } from '@mui/material';

const menu = [
  { title: "Vendor Management", icon: faUsers, path: "/admin-profile/vendor-management" },
  { title: "Reports & Analytics", icon: faChartLine, path: "/admin-profile/report-analytics" },
];

const AdminProfileNavigation = () => {
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

export default AdminProfileNavigation;
