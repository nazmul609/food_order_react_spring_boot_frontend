import React, { useState } from 'react';
import CartItem from './CartItem';
import AddressForm from './AddressForm';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    // Dummy data for cart items
    { id: 1, name: 'Pizza', price: 10, quantity: 1, image: 'https://cdn.pixabay.com/photo/2020/06/08/16/49/pizza-5275191_640.jpg' },
    { id: 2, name: 'Burger', price: 5, quantity: 2, image: 'https://cdn.pixabay.com/photo/2021/01/19/08/47/sandwich-5930496_640.jpg' },
  ]);
  const [address, setAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleAddQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const handleRemoveQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const handleSaveAddress = (newAddress) => {
    setAddress(newAddress);
    setShowAddressForm(false);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = 5;
  const platformFee = 2;
  const restaurantFee = 3;
  const totalCost = totalPrice + deliveryFee + platformFee + restaurantFee;

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

          <hr className="my-6" />

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
            {address ? (
              <div className="space-y-2">
                <p>{address.country}</p>
                <p>{address.state}</p>
                <p>{address.roadNo}</p>
                <p>{address.houseNo}</p>
                <p>{address.additionalDetails}</p>
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit Address
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAddressForm(true)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Address
              </button>
            )}
            {showAddressForm && <AddressForm onSave={handleSaveAddress} />}
          </div>

          <button
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => alert('Proceed to payment')}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
