import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const OrdersHistory = () => {
  const [orders, setOrders] = useState([]);
  const [sortOrder, setSortOrder] = useState('Pending');
  const customerId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8080/order/getAllOrders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const filteredOrders = data.filter(order => order.customerId === parseInt(customerId));
        setOrders(filteredOrders);
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8080/order/deleteOrder/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setOrders(orders.filter(order => order.id !== orderId));
        console.log(`Order ${orderId} canceled`);
      } else {
        console.error('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  const handleSort = (status) => {
    setSortOrder(status);
  };

  const sortedOrders = orders.sort((a, b) => {
    if (sortOrder === 'Pending') {
      return a.status === 'Pending' ? -1 : 1;
    } else {
      return a.status.localeCompare(b.status);
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'Delivered':
        return 'bg-green-100 text-green-600';
      case 'Canceled':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-white text-gray-800';
    }
  };

  return (
    <div className="flex flex-col flex-1 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Orders and History</h2>
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2">Sort by:</label>
        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => handleSort(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="py-3 px-4 border-b">Order ID</th>
            <th className="py-3 px-4 border-b">Restaurant ID</th>
            <th className="py-3 px-4 border-b">Status</th>
            <th className="py-3 px-4 border-b">Pickup Time</th>
            <th className="py-3 px-4 border-b">Actions</th>
            <th className="py-3 px-4 border-b">Rating</th>
            <th className="py-3 px-4 border-b">Feedback</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((order, index) => (
            <tr key={index} className={getStatusColor(order.status)}>
              <td className="py-4 px-4 border-b">{order.id}</td>
              <td className="py-4 px-4 border-b">{order.restaurantId}</td>
              <td className={`py-4 px-4 border-b ${getStatusColor(order.status)}`}>{order.status}</td>
              <td className="py-4 px-4 border-b">{order.pickupTime}</td>
              <td className="py-4 px-4 border-b">
                {order.status === 'pending' ? (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                  >
                    Cancel
                  </button>
                )}
              </td>
              <td className="py-4 px-4 border-b">
                {order.status === 'Delivered' && (
                  <div className="flex items-center">
                    {[...Array(5)].map((star, i) => {
                      const ratingValue = i + 1;
                      return (
                        <label key={i}>
                          <input
                            type="radio"
                            name={`rating-${index}`}
                            value={ratingValue}
                            onClick={() => console.log(`Rated order ${order.id} with ${ratingValue} stars`)}
                            className="hidden"
                          />
                          <FaStar
                            size={24}
                            className={`cursor-pointer ${
                              ratingValue <= 3 
                                ? 'text-yellow-500'
                                : 'text-gray-300'
                            }`}
                          />
                        </label>
                      );
                    })}
                  </div>
                )}
              </td>
              <td className="py-4 px-4 border-b">
                {order.status === 'Delivered' && (
                  <textarea
                    value={'Dummy feedback'}
                    onChange={() => console.log(`Feedback changed for order ${order.id}`)}
                    placeholder="Leave your feedback here..."
                    className="w-full p-2 border rounded-lg mt-1"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersHistory;
