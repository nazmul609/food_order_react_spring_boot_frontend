import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, removeFromCart, updateCartItemQuantity }) => {
  const navigate = useNavigate();

  const handleOrderNow = () => {
    navigate('/payment');
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-bold mb-4">Cart</h3>
      {cart.length > 0 ? (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div>
                <h4 className="text-xl font-bold">{item.name}</h4>
                <div className="flex items-center">
                  <button onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button onClick={handleOrderNow} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded w-full">Order Now</button>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
