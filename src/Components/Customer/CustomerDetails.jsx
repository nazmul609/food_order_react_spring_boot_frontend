import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState("https://cdn.pixabay.com/photo/2024/04/25/12/32/ai-generated-8719680_640.jpg");
  const [customer, setCustomer] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const email = localStorage.getItem('email');
        const token = localStorage.getItem('token'); 
        
        const response = await axios.get(`http://localhost:8080/customers/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setCustomer(response.data);
          // Fetch the addresses using the customer ID
          fetchAddresses(response.data.id);
        }
      } catch (error) {
        console.error("Failed to fetch customer details", error);
      }
    };

    // Fetch the addresses by customer ID
    const fetchAddresses = async (customerId) => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`http://localhost:8080/addresses/${customerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setAddresses(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch addresses", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, []);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col space-y-6 p-6 bg-gray-100 rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
      {/* Profile header section */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">Customer Profile</h2>
          <p className="text-gray-600">Manage your profile information</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={profilePicture} alt="Profile" className="w-40 h-40 object-cover rounded-lg shadow-md mb-2" />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="profile-picture-upload"
          />
          <label
            htmlFor="profile-picture-upload"
            className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition"
          >
            Upload New Image
          </label>
        </div>
      </div>

      {/* Profile details section */}
      {customer && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-lg shadow-md p-4">
            <table className="w-full text-left">
              <tbody>
                <tr>
                  <td className="font-semibold text-gray-700 py-2">Name:</td>
                  <td className="text-gray-800">{customer.name}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-700 py-2">Email:</td>
                  <td className="text-gray-800">{customer.email}</td>
                </tr>
              <tr>
                <td className="font-semibold text-gray-700 py-2">Age:</td>
                <td className="text-gray-800">{customer.age}</td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-700 py-2">Gender:</td>
                <td className="text-gray-800">{customer.sex}</td>
              </tr>
                <tr>
                  <td className="font-semibold text-gray-700 py-2">Phone:</td>
                  <td className="text-gray-800">{customer.contactNo}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-700 py-2">Occupation:</td>
                  <td className="text-gray-800">{customer.occupation}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white border rounded-lg shadow-md p-4">
          <h3 className="font-semibold text-gray-700 mb-4">Addresses</h3>
          {addresses.length > 0 ? (
            <table className="w-full text-left">
              <tbody>
                {addresses.map((address, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td className="font-semibold text-gray-700 py-2">Address Line 1:</td>
                      <td className="text-gray-800">{address.addressLine1}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-gray-700 py-2">Address Line 2:</td>
                      <td className="text-gray-800">{address.addressLine2}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-gray-700 py-2">City:</td>
                      <td className="text-gray-800">{address.city}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-gray-700 py-2">State:</td>
                      <td className="text-gray-800">{address.state}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-gray-700 py-2">Postal Code:</td>
                      <td className="text-gray-800">{address.postalCode}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-gray-700 py-2">Country:</td>
                      <td className="text-gray-800">{address.country}</td>
                    </tr>
                    {index < addresses.length - 1 && <tr><td colSpan="2"><hr className="my-4" /></td></tr>}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">No addresses found.</p>
          )}
        </div>
      </div>
      )}

      <button
        onClick={handleEdit}
        className="self-center py-2 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        {isEditing ? "Save" : "Edit Profile"}
      </button>
    </div>
  );
};

export default CustomerDetails;
