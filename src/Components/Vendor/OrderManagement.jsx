import React, { useState, useEffect } from 'react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [restaurantIds, setRestaurantIds] = useState([]);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Fetch all restaurants and filter by ownerId
  const fetchRestaurants = async () => {
    try {
      const response = await fetch('http://localhost:8080/restaurant/allRestaurants', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const filteredRestaurantIds = data
          .filter((restaurant) => restaurant.ownerId === parseInt(userId))
          .map((restaurant) => restaurant.id);
        setRestaurantIds(filteredRestaurantIds);
        fetchOrders(filteredRestaurantIds); // Fetch orders once we have the restaurant IDs
      } else {
        console.error('Failed to fetch restaurants');
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  // Fetch all orders and filter by restaurantIds
  const fetchOrders = async (restaurantIds) => {
    try {
      const response = await fetch('http://localhost:8080/order/getAllOrders', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const filteredOrders = data.filter((order) =>
          restaurantIds.includes(order.restaurantId)
        );
        setOrders(filteredOrders); // Set the orders based on the filtered restaurants
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Generate a random pickup time (40 to 60 minutes)
  const generateRandomPickupTime = () => {
    const randomMinutes = Math.floor(Math.random() * (60 - 40 + 1)) + 40;
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + randomMinutes);
    return currentTime.toISOString(); 
  };

  // Update order status with confirmation and additional details
  const handleStatusUpdate = async (orderId, newStatus, customerId, restaurantId) => {
    const isConfirmed = window.confirm(`Are you sure you want to change the status to ${newStatus}?`);
    if (!isConfirmed) return;

    const pickupTime = generateRandomPickupTime(); 

    try {
      const response = await fetch(`http://localhost:8080/order/changeStatus/${orderId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
          customerId: customerId,
          restaurantId: restaurantId,
          pickupTime: pickupTime,
        }),
      });

      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-200';
      case 'Order Placed':
        return 'bg-blue-200';
      case 'Delivered':
        return 'bg-green-200';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Customer Id</th>
            <th className="border border-gray-300 p-2">Restaurant Id</th>
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
              <td className="border border-gray-300 p-2">{order.customerId}</td>
              <td className="border border-gray-300 p-2">{order.restaurantId}</td>
              <td className="border border-gray-300 p-2">{order.price}</td>
              <td className="border border-gray-300 p-2">{order.item}</td>
              <td className={`border border-gray-300 p-2 ${getStatusColor(order.status)}`}>
                {order.status}
              </td>
              <td className="border border-gray-300 p-2">
                {order.status === 'Pending' && (
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusUpdate(order.id, e.target.value, order.customerId, order.restaurantId)
                    }
                    className="border rounded p-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Order Placed">Order Placed</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
