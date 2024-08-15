import React, { useState } from 'react';

const MenuManagement = () => {
  const [restaurants, setRestaurants] = useState([
    { id: 1, name: 'Pizza Place' },
    { id: 2, name: 'Burger Joint' },
    { id: 3, name: 'Biryani House' },
  ]);

  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      restaurantId: 1,
      image: 'https://via.placeholder.com/150',
      title: 'Margherita Pizza',
      description: 'Classic cheese and tomato pizza',
      category: 'Pizza',
      price: '$10.00',
      availability: 'In Stock',
    },
    {
      id: 2,
      restaurantId: 1,
      image: 'https://via.placeholder.com/150',
      title: 'Pepperoni Pizza',
      description: 'Spicy pepperoni with cheese',
      category: 'Pizza',
      price: '$12.00',
      availability: 'Out of Stock',
    },
    // Add more menu items as needed
  ]);

  const handleRestaurantSelect = (event) => {
    setSelectedRestaurantId(Number(event.target.value));
  };

  const handleImageUpload = (event, menuId) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMenuItems((prevItems) =>
          prevItems.map((item) =>
            item.id === menuId ? { ...item, image: reader.result } : item
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvailabilityChange = (menuId) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === menuId
          ? { ...item, availability: item.availability === 'In Stock' ? 'Out of Stock' : 'In Stock' }
          : item
      )
    );
  };

  const handleInputChange = (menuId, field, value) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === menuId ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAddNewMenu = () => {
    const newMenuItem = {
      id: menuItems.length + 1,
      restaurantId: selectedRestaurantId,
      image: 'https://via.placeholder.com/150',
      title: 'New Menu Item',
      description: 'Description of new item',
      category: 'Category',
      price: '$0.00',
      availability: 'In Stock',
    };
    setMenuItems((prevItems) => [...prevItems, newMenuItem]);
  };

  const filteredMenuItems = menuItems.filter(
    (item) => item.restaurantId === selectedRestaurantId
  );

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Menu Management</h2>

      <label className="block mb-2">
        Select Restaurant:
        <select
          onChange={handleRestaurantSelect}
          className="border rounded p-2 ml-2"
        >
          <option value="">-- Select a Restaurant --</option>
          {restaurants.map((restaurant) => (
            <option key={restaurant.id} value={restaurant.id}>
              {restaurant.name}
            </option>
          ))}
        </select>
      </label>

      <button
        onClick={handleAddNewMenu}
        className="mb-4 py-2 px-4 bg-blue-600 text-white rounded"
      >
        Add New Menu Item
      </button>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Restaurant Name</th>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Availability</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredMenuItems.map((item) => (
            <tr key={item.id}>
              <td className="border border-gray-300 p-2">{item.id}</td>
              <td className="border border-gray-300 p-2">{restaurants.find(r => r.id === item.restaurantId)?.name}</td>
              <td className="border border-gray-300 p-2">
                <img src={item.image} alt={item.title} className="w-20 h-20" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, item.id)}
                  className="mt-2 border rounded p-1 cursor-pointer"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleInputChange(item.id, 'title', e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleInputChange(item.id, 'description', e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={item.category}
                  onChange={(e) => handleInputChange(item.id, 'category', e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={item.price}
                  onChange={(e) => handleInputChange(item.id, 'price', e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <span
                  onClick={() => handleAvailabilityChange(item.id)}
                  className={`cursor-pointer ${item.availability === 'In Stock' ? 'text-green-600' : 'text-red-600'}`}
                >
                  {item.availability}
                </span>
              </td>
              <td className="border border-gray-300 p-2">
                <button className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuManagement;
