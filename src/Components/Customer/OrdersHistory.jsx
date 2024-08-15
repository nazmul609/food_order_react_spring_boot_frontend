import React from 'react';

const OrdersHistory = () => {
  const orders = [
    { itemName: 'Biryani', restaurantName: 'Restaurant A', status: 'Pending', date: '1 July, 2024' },
    { itemName: 'Pizza', restaurantName: 'Restaurant B', status: 'Delivered', date: '10 July, 2024' },
  ];

  const handleCancelOrder = (index) => {
    // Add functionality to cancel the order
    console.log(`Order ${index + 1} canceled`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Orders and History</h2>
      <table className="min-w-full text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2">Items Name</th>
            <th className="py-2">Rest. Name</th>
            <th className="py-2">Order Status</th>
            <th className="py-2">Order Date</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className={order.status === 'Pending' ? 'bg-yellow-100' : 'bg-white'}>
              <td>{order.itemName}</td>
              <td>{order.restaurantName}</td>
              <td>{order.status}</td>
              <td>{order.date}</td>
              <td>
                {order.status === 'Pending' && (
                  <button
                    onClick={() => handleCancelOrder(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Cancel
                  </button>
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
