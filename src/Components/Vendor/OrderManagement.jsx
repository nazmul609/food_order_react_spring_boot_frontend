import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../apiConfig';



const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [restaurantIds, setRestaurantIds] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [showPopup, setShowPopup] = useState(false); 
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Fetch all restaurants and filter by ownerId
  const fetchRestaurants = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/restaurant/allRestaurants`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const filteredRestaurantIds = data
          .filter((restaurant) => restaurant.ownerId === parseInt(userId))
          .map((restaurant) => restaurant.id);
        setRestaurantIds(filteredRestaurantIds);
        fetchOrders(filteredRestaurantIds); 
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
      const response = await fetch(`${API_BASE_URL}/order/getAllOrders`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const filteredOrders = data.filter((order) =>
          restaurantIds.includes(order.restaurantId)
        );
        setOrders(filteredOrders); 
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Generate a random pickup time (45 to 60 minutes) with the desired format
  const generateRandomPickupTime = () => {
    const randomMinutes = Math.floor(Math.random() * (60 - 45 + 1)) + 45;
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + randomMinutes);
    const formattedDate = currentTime.toLocaleDateString(); // Get the current date
    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Get time in HH:mm format
    return `${formattedDate} ${formattedTime}`; // Combine date and time
  };

  // Handle status update with confirmation
  const handleStatusUpdate = async (newStatus) => {
    if (!selectedOrder) return;
    const isConfirmed = window.confirm(`Are you sure you want to change the status to ${newStatus}?`);
    if (!isConfirmed) return;

    const pickupTime = generateRandomPickupTime();

    try {
      const response = await fetch(`${API_BASE_URL}/order/changeStatus/${selectedOrder.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedOrder.id,
          cuisineId: selectedOrder.cuisineId,
          customerId: selectedOrder.customerId,
          restaurantId: selectedOrder.restaurantId,
          cuisineName: selectedOrder.cuisineName,
          restaurantName: selectedOrder.restaurantName,
          cuisinePrice: selectedOrder.cuisinePrice, 
          quantity: selectedOrder.quantity,
          pickupTime: pickupTime, 
          status: newStatus,
        }),
      });

      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === selectedOrder.id ? { ...order, status: newStatus } : order
          )
        );
        setShowPopup(false); 
        setSelectedOrder(null); 
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
        return 'bg-yellow-500 text-white';
      case 'Order Placed':
        return 'bg-green-500 text-white';
      case 'Canceled:Vendor':
        return 'bg-red-500 text-white';
      case 'Delivered':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const handleStatusChange = (order) => {
    setSelectedOrder(order);
    setShowPopup(true);
  };

  return (
    <div className="flex flex-col flex-1 p-8 bg-gray-100 min-h-screen">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-800 py-8 shadow-lg rounded-t-lg">
          <h2 className="text-4xl font-bold text-white tracking-wide text-center">
            order Management
          </h2>
        </div>
        <div className="mt-10"></div> 
  
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              {['ID', 'Customer', 'Restaurant', 'Cuisine', 'Price', 'Quantity', 'Status', 'Update'].map((header) => (
                <th key={header} className="py-3 px-4 text-left font-semibold border-b">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition duration-150">
                <td className="py-4 px-4 border-b">{order.id}</td>
                <td className="py-4 px-4 border-b">{order.customerId}</td>
                <td className="py-4 px-4 border-b">{order.restaurantName}</td>
                <td className="py-4 px-4 border-b">{order.cuisineName}</td>
                <td className="py-4 px-4 border-b">
                  ${(order.cuisinePrice * order.quantity).toFixed(2)}
                </td>
                <td className="py-4 px-4 border-b">{order.quantity}</td>
                <td className="py-4 px-4 border-b">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4 border-b">
                  {['Pending', 'Order Placed'].includes(order.status) ? (
                    <button
                      className="group relative inline-block rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-[1px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                      onClick={() => handleStatusChange(order)}
                    >
                      <span className="block rounded-full bg-white px-6 py-2 text-xs font-semibold text-gray-800 group-hover:bg-transparent group-hover:text-white transition-all duration-300">
                        Update Status
                      </span>
                    </button>

                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      {/* Popup for status update */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4 text-center">Update Order Status</h3>
            <div className="flex flex-col space-y-4">
              {selectedOrder.status === 'Pending' && (
                <>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    onClick={() => handleStatusUpdate('Order Placed')}
                  >
                    Place Order
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    onClick={() => handleStatusUpdate('Canceled:Vendor')}
                  >
                    Cancel Order
                  </button>
                </>
              )}
              {selectedOrder.status === 'Order Placed' && (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  onClick={() => handleStatusUpdate('Delivered')}
                >
                  Delivered
                </button>
              )}
              <button
                className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default OrderManagement;
