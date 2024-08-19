import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const AdminReportsAndAnalytics = () => {
  // Placeholder data for charts
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Total Sales',
        data: [1200, 1500, 1700, 2000, 2200, 2400, 2600],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const customerData = {
    labels: ['New Customers', 'Returning Customers'],
    datasets: [
      {
        label: 'Customer Segmentation',
        data: [65, 35],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const topSellingItemsData = {
    labels: ['Pizza', 'Burger', 'Biryani', 'Pasta', 'Sushi'],
    datasets: [
      {
        label: 'Top-Selling Items',
        data: [500, 300, 200, 150, 100],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Placeholder action handlers
  const handleAdjustPlatformFee = () => {
    alert("Adjust Platform Fee");
  };

  const handleViewVendorDetails = () => {
    alert("View Vendor Details");
  };

  const handleManageVendor = () => {
    alert("Manage Vendor Status");
  };

  const handleViewAnalytics = () => {
    alert("View Detailed Analytics");
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Admin Reports & Analytics</h2>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Sales Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-xl mb-4">Total Sales</h4>
            <Line data={salesData} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-xl mb-4">Total Orders</h4>
            <Bar
              data={salesData}
              options={{
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Vendor Performance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-xl mb-4">Top-Selling Items</h4>
            <Bar data={topSellingItemsData} />
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              onClick={handleViewVendorDetails}
            >
              View Vendor Details
            </button>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-xl mb-4">Platform Fee</h4>
            <div className="text-center text-2xl font-bold">$200</div>
            <button
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
              onClick={handleAdjustPlatformFee}
            >
              Adjust Platform Fee
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Vendor Management</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-xl mb-4">Manage Vendor Status</h4>
            <button
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
              onClick={handleManageVendor}
            >
              Active/Deactivate Vendor
            </button>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-xl mb-4">View Detailed Analytics</h4>
            <button
              className="mt-4 bg-purple-500 text-white py-2 px-4 rounded"
              onClick={handleViewAnalytics}
            >
              View Analytics
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Customer Insights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-xl mb-4">Customer Segmentation</h4>
            <Pie data={customerData} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-xl mb-4">Returning Customers</h4>
            <div className="text-center text-2xl font-bold">35%</div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Financial Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-xl mb-4">Profit Margins</h4>
            <div className="text-center text-2xl font-bold">20%</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-xl mb-4">Net Profit/Loss</h4>
            <div className="text-center text-2xl font-bold">$5000</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReportsAndAnalytics;
