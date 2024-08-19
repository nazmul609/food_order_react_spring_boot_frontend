import React, { useState } from 'react';
import { FaStar, FaFileDownload, FaHeadset } from 'react-icons/fa';

const OrdersHistory = () => {
  const [orders, setOrders] = useState([
    { itemName: 'Biryani', restaurantName: 'Restaurant A', status: 'Pending', date: '1 July, 2024', rating: 0, feedback: '', estimatedDelivery: '30 min', actualDelivery: '' },
    { itemName: 'Pizza', restaurantName: 'Restaurant B', status: 'Delivered', date: '10 July, 2024', rating: 4, feedback: 'Great pizza!', estimatedDelivery: '40 min', actualDelivery: '35 min' },
  ]);

  const handleCancelOrder = (index) => {
    // Add functionality to cancel the order
    console.log(`Order ${index + 1} canceled`);
  };

  const handleRating = (index, rating) => {
    const updatedOrders = [...orders];
    updatedOrders[index].rating = rating;
    setOrders(updatedOrders);
  };

  const handleDownloadInvoice = (index) => {
    // Add functionality to download invoice
    console.log(`Invoice for Order ${index + 1} downloaded`);
  };

  const handleSupport = (index) => {
    // Add functionality to contact support
    console.log(`Contacting support for Order ${index + 1}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100';
      case 'Delivered':
        return 'bg-green-100';
      case 'Canceled':
        return 'bg-red-100';
      default:
        return 'bg-white';
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-600';
      case 'Delivered':
        return 'text-green-600';
      case 'Canceled':
        return 'text-red-600';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <div className="flex flex-col flex-1 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Orders and History</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="py-3 px-4 border-b">Item Name</th>
            <th className="py-3 px-4 border-b">Restaurant Name</th>
            <th className="py-3 px-4 border-b">Order Status</th>
            <th className="py-3 px-4 border-b">Order Date</th>
            <th className="py-3 px-4 border-b">Estimated Delivery Time</th>
            <th className="py-3 px-4 border-b">Actual Delivery Time</th>
            <th className="py-3 px-4 border-b">Actions</th>
            <th className="py-3 px-4 border-b">Rating</th>
            <th className="py-3 px-4 border-b">Feedback</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className={getStatusColor(order.status)}>
              <td className="py-4 px-4 border-b">{order.itemName}</td>
              <td className="py-4 px-4 border-b">{order.restaurantName}</td>
              <td className={`py-4 px-4 border-b ${getStatusTextColor(order.status)}`}>{order.status}</td>
              <td className="py-4 px-4 border-b">{order.date}</td>
              <td className="py-4 px-4 border-b">{order.estimatedDelivery}</td>
              <td className="py-4 px-4 border-b">{order.actualDelivery || 'N/A'}</td>
              <td className="py-4 px-4 border-b">
                {order.status === 'Pending' && (
                  <button
                    onClick={() => handleCancelOrder(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                )}
                {order.status === 'Delivered' && (
                  <>
                    <button
                      onClick={() => handleDownloadInvoice(index)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition mr-2"
                    >
                      <FaFileDownload size={16} className="inline mr-1" />
                      Invoice
                    </button>
                    <button
                      onClick={() => handleSupport(index)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      <FaHeadset size={16} className="inline mr-1" />
                      Support
                    </button>
                  </>
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
                            onClick={() => handleRating(index, ratingValue)}
                            className="hidden"
                          />
                          <FaStar
                            size={24}
                            className={`cursor-pointer ${
                              ratingValue <= order.rating
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
                    value={order.feedback}
                    onChange={(e) => {
                      const updatedOrders = [...orders];
                      updatedOrders[index].feedback = e.target.value;
                      setOrders(updatedOrders);
                    }}
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
