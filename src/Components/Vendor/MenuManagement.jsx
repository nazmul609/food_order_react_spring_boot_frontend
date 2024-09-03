import React, { useState, useEffect } from 'react';

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
        const response = await fetch('http://localhost:8080/restaurant/allRestaurants', {
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
      const response = await fetch(`http://localhost:8080/cuisine/allCuisines/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      const cuisines = await response.json();

      // Fetch images for all cuisines
      const cuisinesWithImages = await Promise.all(
        cuisines.map(async (cuisine) => {
          const imageResponse = await fetch(
            `http://localhost:8080/cuisine/downloadImage/${cuisine.id}`,
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
      const response = await fetch(`http://localhost:8080/cuisine/addCuisine/${selectedRestaurantId}`, {
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
          `http://localhost:8080/cuisine/uploadImage/${cuisineId}`,
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
      await fetch(`http://localhost:8080/cuisine/delete/${menuItemToDelete}`, {
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
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Menu Management</h2>

      <label className="block mb-2">
        Select Restaurant:
        <select onChange={handleRestaurantSelect} className="border rounded p-2 ml-2">
          <option value="">-- Select a Restaurant --</option>
          {restaurants.map((restaurant) => (
            <option key={restaurant.id} value={restaurant.id}>
              {restaurant.name}
            </option>
          ))}
        </select>
      </label>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Cuisine Name*"
          value={newMenuItem.cuisineName}
          onChange={(e) => handleNewMenuInputChange('cuisineName', e.target.value)}
          className="w-full p-1 border rounded mb-2"
          required
        />
        <input
          type="text"
          placeholder="Category*"
          value={newMenuItem.category}
          onChange={(e) => handleNewMenuInputChange('category', e.target.value)}
          className="w-full p-1 border rounded mb-2"
          required
        />
        <input
          type="text"
          placeholder="Price*"
          value={newMenuItem.price}
          onChange={(e) => handleNewMenuInputChange('price', e.target.value)}
          className="w-full p-1 border rounded mb-2"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newMenuItem.description}
          onChange={(e) => handleNewMenuInputChange('description', e.target.value)}
          className="w-full p-1 border rounded mb-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUploadChange}
          className="w-full p-1 border rounded mb-2"
        />

        <button
          onClick={handleAddNewMenu}
          className="mb-4 py-2 px-4 bg-blue-600 text-white rounded"
          disabled={!newMenuItem.cuisineName || !newMenuItem.category || !newMenuItem.price}
        >
          Add New Menu
        </button>
      </div>

      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <p>Are you sure you want to delete this menu item?</p>
            <button onClick={handleDeleteMenu} className="mr-2 py-2 px-4 bg-red-500 text-white rounded">
              Yes
            </button>
            <button onClick={closeDeletePopup} className="py-2 px-4 bg-gray-300 text-black rounded">
              No
            </button>
          </div>
        </div>
      )}

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Availability</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b">{item.id}</td>
              <td className="py-2 px-4 border-b">{item.cuisineName}</td>
              <td className="py-2 px-4 border-b">{item.category}</td>
              <td className="py-2 px-4 border-b">{item.description}</td>
              <td className="py-2 px-4 border-b">${item.price}</td>
              <td className="py-2 px-4 border-b">{item.availability}</td>
              <td className="py-2 px-4 border-b">
                {item.imageUrl && <img src={item.imageUrl} alt={item.cuisineName} className="w-16 h-16" />}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => openDeletePopup(item.id)}
                  className="py-1 px-3 bg-red-500 text-white rounded"
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
