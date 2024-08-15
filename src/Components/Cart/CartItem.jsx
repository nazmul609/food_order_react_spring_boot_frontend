import React from 'react';

const CartItem = ({ item, onAdd, onRemove }) => {
  return (
    <div className="flex items-center py-4 border-b">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-4" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600">${item.price}</p>
        <div className="flex items-center mt-2">
          <button onClick={() => onRemove(item.id)} className="px-2 py-1 border rounded">
            -
          </button>
          <span className="mx-4">{item.quantity}</span>
          <button onClick={() => onAdd(item.id)} className="px-2 py-1 border rounded">
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
