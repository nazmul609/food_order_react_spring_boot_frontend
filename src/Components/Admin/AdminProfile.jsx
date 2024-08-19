import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminProfileNavigation from './AdminProfileNavigation';
import VendorManagement from './VendorManagement';
import ReportsAndAnalytics from './ReportsAndAnalytics';

const AdminProfile = () => {
  return (
    <div className="flex">
      <AdminProfileNavigation />
      <div className="flex-1 p-8">
        <Routes>
          <Route path="vendor-management" element={<VendorManagement />} />
          <Route path="report-analytics" element={<ReportsAndAnalytics />} />
         
        </Routes>
      </div>
    </div>
  );
};

export default AdminProfile;
