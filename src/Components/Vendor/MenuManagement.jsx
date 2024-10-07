import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../apiConfig';


const MenuManagement = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [menuItemToDelete, setMenuItemToDelete] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [newMenuItem, setNewMenuItem] = useState({
    cuisineName: '',
    category: '',
    description: '',
    price: '',
    availability: 'In Stock',
  });

  const userId = parseInt(localStorage.getItem('userId'), 10);
  const bearerToken = localStorage.getItem('token');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/restaurant/allRestaurants`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
        }

        const textData = await response.text();
        const restaurantsData = JSON.parse(textData);
        const vendorRestaurants = restaurantsData.filter(
          (restaurant) => parseInt(restaurant.ownerId, 10) === userId
        );

        setRestaurants(vendorRestaurants);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, [userId, bearerToken]);

  const fetchMenuItems = async (restaurantId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cuisine/allCuisines/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      const cuisines = await response.json();

      // Fetch images for all cuisines
      const cuisinesWithImages = await Promise.all(
        cuisines.map(async (cuisine) => {
          const imageResponse = await fetch(
            `${API_BASE_URL}/cuisine/downloadImage/${cuisine.id}`,
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
            }
          );
          const imageBlob = await imageResponse.blob();
          const imageUrl = URL.createObjectURL(imageBlob);

          return { ...cuisine, imageUrl };
        })
      );

      setMenuItems(cuisinesWithImages);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleRestaurantSelect = (event) => {
    const restaurantId = Number(event.target.value);
    setSelectedRestaurantId(restaurantId);
    fetchMenuItems(restaurantId);
  };

  const handleNewMenuInputChange = (field, value) => {
    setNewMenuItem((prevItem) => ({
      ...prevItem,
      [field]: value,
    }));
  };

  const handleImageUploadChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleAddNewMenu = async () => {
    if (!newMenuItem.cuisineName || !newMenuItem.category || !newMenuItem.price) {
      alert('Please fill in all required fields marked with *');
      return;
    }

    try {
      // Add new cuisine
      const response = await fetch(`${API_BASE_URL}/cuisine/addCuisine/${selectedRestaurantId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(newMenuItem),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error adding new menu item:', errorText);
        alert(`Error: ${errorText}`);
        return;
      }

      // Get the created cuisine ID
      const cuisineId = await response.text();

      // Upload the image
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const imageUploadResponse = await fetch(
          `${API_BASE_URL}/cuisine/uploadImage/${cuisineId}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
            body: formData,
          }
        );

        if (!imageUploadResponse.ok) {
          throw new Error(`Failed to upload image: ${imageUploadResponse.statusText}`);
        }
      }

      // Refresh menu items after adding new menu and uploading image
      fetchMenuItems(selectedRestaurantId);

      // Reset input fields
      setNewMenuItem({
        cuisineName: '',
        category: '',
        description: '',
        price: '',
        availability: 'In Stock',
      });
      setImageFile(null);
      alert('Cuisine created successfully!');
    } catch (error) {
      console.error('Error adding new menu item:', error);
    }
  };

  // to be updated need api
  const handleDeleteMenu = async () => {
    try {
      await fetch(`${API_BASE_URL}/cuisine/delete/${menuItemToDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      setMenuItems((prevItems) => prevItems.filter((item) => item.id !== menuItemToDelete));
      setShowDeletePopup(false);
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const openDeletePopup = (menuId) => {
    setMenuItemToDelete(menuId);
    setShowDeletePopup(true);
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
    setMenuItemToDelete(null);
  };

  return (
    <div className="overflow-x-auto p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 py-8 shadow-lg rounded-t-lg">
        <h2 className="text-4xl font-bold text-white tracking-wide text-center">
          Menu Management
        </h2>
      </div>
  
      <div className="mt-10"></div> 
  
      {/* Restaurant Selector */}
      <label className="block mb-4 text-lg font-semibold text-gray-700">
        Select Your Restaurant:
        <select
          onChange={handleRestaurantSelect}
          className="border rounded p-3 ml-2 text-gray-800 bg-white focus:ring focus:ring-blue-300 transition duration-200"
        >
          <option value=""></option>
          {restaurants.map((restaurant) => (
            <option key={restaurant.id} value={restaurant.id}>
              {restaurant.name}
            </option>
          ))}
        </select>
      </label>
  
      {/* Menu Item Inputs */}
      <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Cuisine Name*"
          value={newMenuItem.cuisineName}
          onChange={(e) => handleNewMenuInputChange('cuisineName', e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:ring focus:ring-blue-300 transition duration-200"
          required
        />
        <input
          type="text"
          placeholder="Category*"
          value={newMenuItem.category}
          onChange={(e) => handleNewMenuInputChange('category', e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:ring focus:ring-blue-300 transition duration-200"
          required
        />
        <input
          type="text"
          placeholder="Price*"
          value={newMenuItem.price}
          onChange={(e) => handleNewMenuInputChange('price', e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:ring focus:ring-blue-300 transition duration-200"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newMenuItem.description}
          onChange={(e) => handleNewMenuInputChange('description', e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:ring focus:ring-blue-300 transition duration-200"
        />
        <div className="w-full">
          <label htmlFor="image-upload" className="block font-semibold text-gray-700 mb-2">
            Upload Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUploadChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300 transition duration-200"
            id="image-upload"
            required
          />
        </div>
  
        {/* Add Menu Button */}
        <button
          onClick={handleAddNewMenu}
          className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg focus:ring focus:ring-blue-300 transition duration-200"
          disabled={!newMenuItem.cuisineName || !newMenuItem.category || !newMenuItem.price}
        >
          Add New Menu
        </button>
      </div>
  
      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform scale-105">
            <p className="text-lg font-semibold mb-6">Are you sure you want to delete this menu item?</p>
            <div className="flex justify-between">
              <button
                onClick={handleDeleteMenu}
                className="py-2 px-6 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-200"
              >
                Yes
              </button>
              <button
                onClick={closeDeletePopup}
                className="py-2 px-6 bg-gray-300 text-black rounded-lg shadow hover:bg-gray-400 transition duration-200"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
  
      {/* Menu Table */}
      <table className="min-w-full mt-8 bg-white border border-gray-300 shadow-lg rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-4 px-6 border-b text-left font-semibold">ID</th>
            <th className="py-4 px-6 border-b text-left font-semibold">Name</th>
            <th className="py-4 px-6 border-b text-left font-semibold">Category</th>
            <th className="py-4 px-6 border-b text-left font-semibold">Description</th>
            <th className="py-4 px-6 border-b text-left font-semibold">Price</th>
            <th className="py-4 px-6 border-b text-left font-semibold">Availability</th>
            <th className="py-4 px-6 border-b text-left font-semibold">Image</th>
            <th className="py-4 px-6 border-b text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.id}>
              <td className="py-4 px-6 border-b">{item.id}</td>
              <td className="py-4 px-6 border-b">{item.cuisineName}</td>
              <td className="py-4 px-6 border-b">{item.category}</td>
              <td className="py-4 px-6 border-b">{item.description}</td>
              <td className="py-4 px-6 border-b">${item.price}</td>
              <td className="py-4 px-6 border-b">{item.availability}</td>
              <td className="py-4 px-6 border-b">
                {item.imageUrl && <img src={item.imageUrl} alt={item.cuisineName} className="w-16 h-16 object-cover rounded-lg" />}
              </td>
              <td className="py-4 px-6 border-b">
                <button
                  onClick={() => openDeletePopup(item.id)}
                  className="py-2 px-4 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default MenuManagement;
