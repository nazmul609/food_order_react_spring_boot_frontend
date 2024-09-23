import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const OrdersHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  
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
  const handleCancelOrder = (orderId) => {
    setOrderToCancel(orderId);
    setShowCancelModal(true);
  };
  
  const confirmCancelOrder = async () => {
    try {
      const response = await fetch(`http://localhost:8080/order/getOrderById/${orderToCancel}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const order = await response.json();
        order.status = 'Canceled';
  
        const updateResponse = await fetch(`http://localhost:8080/order/changeStatus/${orderToCancel}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(order),
        });
  
        if (updateResponse.ok) {
          setOrders(orders.map(o => o.id === orderToCancel ? { ...o, status: 'Canceled' } : o));
          console.log(`Order ${orderToCancel} canceled`);
          setShowCancelModal(false); // Close the modal after cancellation
        } else {
          console.error('Failed to update order status');
        }
      } else {
        console.error('Failed to fetch order details');
      }
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };
  
  //   try {
  //     const response = await fetch(`http://localhost:8080/order/getOrderById/${orderId}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });

  //     if (response.ok) {
  //       const order = await response.json();
  //       order.status = 'Canceled';

  //       const updateResponse = await fetch(`http://localhost:8080/order/changeStatus/${orderId}`, {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(order),
  //       });

  //       if (updateResponse.ok) {
  //         setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'Canceled' } : o));
  //         console.log(`Order ${orderId} canceled`);
  //       } else {
  //         console.error('Failed to update order status');
  //       }
  //     } else {
  //       console.error('Failed to fetch order details');
  //     }
  //   } catch (error) {
  //     console.error('Error canceling order:', error);
  //   }
  // };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500 text-white';
      case 'Order Placed':
        return 'bg-green-500 text-white';
      case 'Canceled':
        return 'bg-red-500 text-white';
      case 'Delivered':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col flex-1 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Orders and History</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="py-3 px-4 border-b">ID</th>
            <th className="py-3 px-4 border-b">Cuisine</th>
            <th className="py-3 px-4 border-b">Status</th>
            {/* <th className="py-3 px-4 border-b">Pickup Time</th> */}
            <th className="py-3 px-4 border-b">Actions</th>
            <th className="py-3 px-4 border-b">Rating</th>
            <th className="py-3 px-4 border-b">Feedback</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleOrderClick(order)}>
              <td className="py-4 px-4 border-b">{order.id}</td>
              <td className="py-4 px-4 border-b">{order.cuisineName}</td>
              <td className="py-4 px-4 border-b">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </span>
              </td>
              {/* <td className="py-4 px-4 border-b">{order.pickupTime}</td> */}
              <td className="py-4 px-4 border-b">
                {order.status === 'Pending' ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelOrder(order.id);
                    }}
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
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log(`Rated order ${order.id} with ${ratingValue} stars`);
                            }}
                            className="hidden"
                          />
                          <FaStar
                            size={24}
                            className={`cursor-pointer ${ratingValue <= 3 ? 'text-yellow-500' : 'text-gray-300'}`}
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
                    onChange={(e) => {
                      e.stopPropagation();
                      console.log(`Feedback changed for order ${order.id}:`, e.target.value);
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
  
      {/* pop up window */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-gray-800">Order Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="mb-4 space-y-2">
              {/** Each label-value pair is aligned in flex */}
              <div className="flex justify-between text-gray-600">
                <span className="font-semibold">Order ID:</span>
                <span>{selectedOrder.id}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-semibold">Restaurant:</span>
                <span>{selectedOrder.restaurantName}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-semibold">Cuisine:</span>
                <span>{selectedOrder.cuisineName}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-semibold">Price:</span>
                <span>${selectedOrder.cuisinePrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-semibold">Quantity:</span>
                <span>{selectedOrder.quantity}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-semibold">Pickup Time:</span>
                <span>{selectedOrder.pickupTime}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-semibold">Status:</span>
                <span
                  className={`inline-block px-2 py-1 text-sm font-semibold rounded ${
                    selectedOrder.status === 'Pending'
                      ? 'bg-yellow-200 text-yellow-800'
                      : selectedOrder.status === 'Order Placed'
                      ? 'bg-green-200 text-green-800'
                      : selectedOrder.status === 'Delivered'
                      ? 'bg-blue-200 text-blue-800'
                      : 'bg-red-200 text-red-800'
                  }`}
                >
                  {selectedOrder.status}
                </span>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

  
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Confirm Cancellation</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to cancel this order?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                No
              </button>
              <button
                onClick={confirmCancelOrder}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Yes, Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default OrdersHistory;
