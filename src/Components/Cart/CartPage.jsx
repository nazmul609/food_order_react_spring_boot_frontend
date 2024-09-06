import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import jsPDF from 'jspdf';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCartItems);
  }, []);

  const handleAddQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
    updateLocalStorage(id, 1);
  };
  
  const handleRemoveQuantity = (id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map((item) =>
          item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
  
      // Update local storage and handle empty cart scenario
      updateLocalStorage(id, -1, updatedItems);
  
      // Return the updated items for the state
      return updatedItems;
    });
  };
  
  const updateLocalStorage = (id, change, updatedItems) => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCartItems = savedCartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + change } : item
      )
      .filter((item) => item.quantity > 0);
  
    // If the cart is empty, remove the restaurant info and refresh the page
    if (updatedCartItems.length === 0) {
      localStorage.removeItem('restaurantInfo');
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      console.log('Cart is empty, restaurant info removed from local storage');
  
      // Refresh the page to reflect changes
      window.location.reload();
    } else {
      // Update the cart items in local storage
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
  };
  
  

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = 5;
  const platformFee = 2;
  const restaurantFee = 3;
  const totalCost = totalPrice + deliveryFee + platformFee + restaurantFee;

  const handleOrderNow = async () => {
    const restaurantInfo = JSON.parse(localStorage.getItem('restaurantInfo'));
    const userId = JSON.parse(localStorage.getItem('userId'));
    
    const order = {
      customerId: userId,
      restaurantId: restaurantInfo.id,
      pickupTime: '60 min',
      status: 'pending',
      items: cartItems,
      totalCost,
    };
  
    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(
        'http://localhost:8080/order/createOrder',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        setOrderData(data);
        setShowModal(true);
  
        // Clear local storage
        localStorage.removeItem('cartItems');
        localStorage.removeItem('restaurantInfo');
  
        // Reset state
        setCartItems([]);
        setOrderData(null);
  
      } else {
        alert('Failed to create order. Please try again.');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    }
  };
  
  const generateReceipt = () => {
    const doc = new jsPDF();

    const restaurantInfo = JSON.parse(localStorage.getItem('restaurantInfo'));
    doc.text(`Receipt for Order`, 20, 20);
    doc.text(`Restaurant: ${restaurantInfo.name}`, 20, 30);
    doc.text(`Cuisine: ${cartItems[0].cuisine}`, 20, 40);

    let yPosition = 50;
    cartItems.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name} - Quantity: ${item.quantity} - Price: $${item.price * item.quantity}`, 20, yPosition);
      yPosition += 10;
    });

    doc.text(`Total Cost: $${totalCost}`, 20, yPosition + 10);

    doc.save('receipt.pdf');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img src="https://cdn.pixabay.com/photo/2024/06/12/07/02/shopping-bag-8824561_640.jpg" alt="Banner" className="w-full h-48 object-cover" />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Order List</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onAdd={handleAddQuantity}
                  onRemove={handleRemoveQuantity}
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
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleOrderNow}
          >
            Order Now
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Order Successful!</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">Your order has been placed successfully.</p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  className="px-4 py-2 bg-indigo-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={generateReceipt}
                >
                  Download Receipt
                </button>
                <button
                  className="px-4 py-2 mt-3 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  onClick={() => setShowModal(false)}
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




//// we can hold the payment to a state until the order has been placed then 
/// we can give the option to download the receipt or else return the money