import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const ReportsAndAnalytics = () => {
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

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Reports & Analytics</h2>

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
        <h3 className="text-2xl font-semibold mb-2">Order Analytics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-xl mb-4">Top-Selling Items</h4>
            <Bar data={topSellingItemsData} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-xl mb-4">Low-Selling Items</h4>
            <div className="text-center text-2xl font-bold">Pasta - 100 Sales</div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Restaurant Performance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-xl mb-4">Operational Hours Efficiency</h4>
            <Line data={salesData} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-xl mb-4">Order Cancellations</h4>
            <div className="text-center text-2xl font-bold">5%</div>
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

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Customer Feedback & Reviews</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-xl mb-4">Average Rating</h4>
            <div className="text-center text-2xl font-bold">4.5 Stars</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-xl mb-4">Review Breakdown</h4>
            <Pie data={customerData} />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Promotions & Offers Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-xl mb-4">Promotional Sales Impact</h4>
            <Bar data={topSellingItemsData} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-xl mb-4">Most Effective Offers</h4>
            <div className="text-center text-2xl font-bold">Buy 1 Get 1 Free</div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Real-Time Dashboard</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-xl mb-4">Live Order Status</h4>
            <div className="text-center text-2xl font-bold">3 Orders in Progress</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-xl mb-4">Real-Time Revenue</h4>
            <div className="text-center text-2xl font-bold">$200 in Last Hour</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAndAnalytics;
