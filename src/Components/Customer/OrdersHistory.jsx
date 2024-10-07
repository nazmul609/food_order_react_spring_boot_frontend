import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import API_BASE_URL from '../../apiConfig';

const OrdersHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const customerId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/order/getAllOrders`, {
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
      const response = await fetch(`${API_BASE_URL}/order/getOrderById/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const order = await response.json();
        order.status = 'Canceled:Customer';

        const updateResponse = await fetch(`${API_BASE_URL}/order/changeStatus/${orderId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(order),
        });

        if (updateResponse.ok) {
          setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'Canceled:Customer' } : o));
          setShowCancelModal(false);
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

  const handleReviewClick = (order) => {
    setSelectedOrder(order);
    setShowReviewModal(true);
  };

  const submitReview = () => {
    console.log(`Rated order ${selectedOrder.id} with ${rating} stars and feedback: ${feedback}`);
    setShowReviewModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500 text-white';
      case 'Order Placed':
        return 'bg-green-500 text-white';
      case 'Canceled:Customer':
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
      <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 py-6 shadow-lg rounded-t-lg">
        <h2 className="text-3xl font-bold text-white tracking-wide mb-2 text-center">
          Orders & History
        </h2>
        <p className="text-gray-300 text-center text-sm">
          Track your past and current orders with ease
        </p>
      </div>

      <div className="mt-8"></div> 

      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="py-3 px-4 border-b">ID</th>
            <th className="py-3 px-4 border-b">Cuisine</th>
            <th className="py-3 px-4 border-b">Status</th>
            <th className="py-3 px-4 border-b">Pickup Time</th>
            <th className="py-3 px-4 border-b">Actions</th>
            <th className="py-3 px-4 border-b">Review</th>
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
              <td className="py-4 px-4 border-b">{order.pickupTime}</td>
              <td className="py-4 px-4 border-b">
                {order.status === 'Pending' ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOrderToCancel(order.id);
                      setShowCancelModal(true);
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
                <button
                  disabled={order.status !== 'Delivered'}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReviewClick(order);
                  }}
                  className={`px-4 py-2 rounded-lg ${
                    order.status === 'Delivered' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } transition`}
                >
                  Submit Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Order Details Modal */}
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

      {/* Cancel Order Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Confirm Cancellation</h3>
            <p className="text-gray-600 mb-4">Are you sure you want to cancel this order?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                No
              </button>
              <button
                onClick={() => handleCancelOrder(orderToCancel)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Yes, Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            {/* Centered Title */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Give Review
            </h3>

            {/* Star Rating with Text Feedback */}
            <div className="flex items-center justify-center space-x-2 mb-4">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`cursor-pointer ${rating >= index + 1 ? 'text-yellow-500' : 'text-gray-300'}`}
                  onClick={() => setRating(index + 1)}
                />
              ))}
              <span className="text-gray-700 text-sm font-medium">
                {rating === 1
                  ? 'Poor'
                  : rating === 2
                  ? 'Fair'
                  : rating === 3
                  ? 'Good'
                  : rating === 4
                  ? 'Very Good'
                  : rating === 5
                  ? 'Excellent'
                  : ''}
              </span>
            </div>

            {/* Feedback Label and Textarea */}
            <label className="block text-gray-700 font-medium mb-1">Feedback</label>
            <textarea
              placeholder="We Value Your Opinion – Share Your Experience!"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={submitReview}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default OrdersHistory;
