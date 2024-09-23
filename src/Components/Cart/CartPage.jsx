import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCartItems);
  }, []);

  const handleAddQuantity = (cuisineId) => {
    const updatedItems = cartItems.map((item) =>
      item.cuisineId === cuisineId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const handleRemoveQuantity = (cuisineId) => {
    const updatedItems = cartItems
      .map((item) =>
        item.cuisineId === cuisineId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0); // Remove items with quantity 0

    setCartItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const updateLocalStorage = (updatedItems) => {
    if (updatedItems.length === 0) {
      localStorage.removeItem('cartItems');
    } else {
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.cuisinePrice * item.quantity, 0);
  const deliveryFee = 5;
  const platformFee = 2;
  const restaurantFee = 3;
  const totalCost = totalPrice + deliveryFee + platformFee + restaurantFee;

  const handleOrderNow = () => {
    setShowConfirmationModal(true);
  };

  const confirmOrder = async () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    const token = localStorage.getItem('token');
  
    setIsLoading(true);
  
    try {
      const requests = cartItems.map(async (item) => {
        // Parsing the values to ensure correct data types
        const order = {
          customerId: parseInt(userId),
          restaurantId: parseInt(item.restaurantId),
          restaurantName: item.restaurantName, 
          cuisineName: item.cuisineName,  
          cuisineId: parseInt(item.cuisineId),  
          cuisinePrice: item.cuisinePrice,  
          quantity: parseInt(item.quantity),  
          pickupTime: '60 min',
          status: 'Pending',
        };
  
        const response = await fetch('http://localhost:8080/order/createOrder', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order),
        });
  
        if (!response.ok) {
          throw new Error('Failed to create order for item ' + item.cuisineId);
        }
  
        return response.json();
      });
  
      await Promise.all(requests);
      setShowConfirmationModal(false);
      setShowSuccessModal(true);
      
  
      // Clear cart info from local storage
      localStorage.removeItem('cartItems');
      setCartItems([]);
      window.location.reload();
    } catch (error) {
      console.error('Error creating orders:', error);
      alert('Failed to create one or more orders. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src="https://cdn.pixabay.com/photo/2024/06/12/07/02/shopping-bag-8824561_640.jpg"
          alt="Banner"
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Order List</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.cuisineId}
                  item={item}
                  onAdd={() => handleAddQuantity(item.cuisineId)}
                  onRemove={() => handleRemoveQuantity(item.cuisineId)}
                />
              ))}
            </div>
          </div>

          <hr className="my-6" />

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
            <div className="text-lg">
              <p>Total Item Cost: ${totalPrice}</p>
              <p>Delivery Fee: ${deliveryFee}</p>
              <p>Platform Fee: ${platformFee}</p>
              <p>Restaurant Fee: ${restaurantFee}</p>
              <p className="font-bold">Total Cost: ${totalCost}</p>
            </div>
          </div>

          <button
            className={`w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
              cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            onClick={handleOrderNow}
            disabled={cartItems.length === 0 || isLoading}
          >
            {isLoading ? 'Placing Orders...' : 'Order Now'}
          </button>
        </div>
      </div>

      {showConfirmationModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Confirm Your Order</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">Are you sure you want to place this order?</p>
              </div>
              <div className="flex justify-around items-center px-4 py-3">
                <button
                  className="px-4 py-2 mt-3 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  onClick={() => setShowConfirmationModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 mt-3 bg-indigo-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ml-4"
                  onClick={confirmOrder}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Order Successful!</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">Your orders have been made.</p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  className="px-4 py-2 mt-3 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  onClick={() => setShowSuccessModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
