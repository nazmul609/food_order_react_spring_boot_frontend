import React, { useState } from 'react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    { id: 1, customer: 'John Doe', restaurant: 'Pizza Place', price: '$20.00', item: 'Pizza', status: 'Pending' },
    { id: 2, customer: 'Jane Smith', restaurant: 'Burger Point', price: '$15.00', item: 'Burger', status: 'Order Placed' },
    { id: 3, customer: 'Alice Johnson', restaurant: 'Biryani House', price: '$25.00', item: 'Biriyani', status: 'Delivered' },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-600'; 
      case 'Order Placed':
        return 'text-blue-600'; 
      case 'Delivered':
        return 'text-green-600'; 
      default:
        return 'text-gray-600'; 
    }
  };

  const handleStatusUpdate = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => 
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Customer</th>
            <th className="border border-gray-300 p-2">Restaurant</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Item</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Update</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border border-gray-300 p-2">{order.id}</td>
              <td className="border border-gray-300 p-2">{order.customer}</td>
              <td className="border border-gray-300 p-2">{order.restaurant}</td>
              <td className="border border-gray-300 p-2">{order.price}</td>
              <td className="border border-gray-300 p-2">{order.item}</td>
              <td className={`border border-gray-300 p-2 ${getStatusColor(order.status)}`}>
                {order.status}
              </td>
              <td className="border border-gray-300 p-2">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
