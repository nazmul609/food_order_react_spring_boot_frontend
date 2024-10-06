import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../apiConfig';

// const baseURL = process.env.RESTOURA_API_BASE_URL;

const CustomerOnboarding = () => {
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: localStorage.getItem('email') || '', 
    age: '',
    occupation: '',
    sex: '',
    contactNo: '',
    addresses: [{
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({
      ...customerDetails,
      [name]: value,
    });
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAddresses = [...customerDetails.addresses];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      [name]: value,
    };
    setCustomerDetails({
      ...customerDetails,
      addresses: updatedAddresses,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!customerDetails.email || !token) {
      alert('Error: Email or Token is missing from local storage.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(customerDetails),
      });

      if (response.ok) {
        const createdCustomer = await response.json();
        console.log('Customer Details submitted successfully:', createdCustomer);

        localStorage.setItem('customerId', createdCustomer.id);
        alert('Customer created successfully!');

        navigate('/login');
      } else {
        console.error('Failed to submit customer details:', response.statusText);
        alert('Failed to create the customer. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the customer. Please try again.');
    }
  };


  return (
    <div className="bg-white mt-4 p-8 rounded-lg shadow-md max-w-3xl mx-auto">
      <div className="bg-gray-600 py-4">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Customer Onboarding</h2>
      </div>
      <div className="mt-8"></div>

      {/* Basic Information Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label className="block mb-1">
            <span className="text-red-500">*</span>Name:
          </label>
          <input
            type="text"
            name="name"
            value={customerDetails.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">
            <span className="text-red-500">*</span>Email:
          </label>
          <input
            type="email"
            name="email"
            value={customerDetails.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">
            <span className="text-red-500">*</span>Age:
          </label>
          <input
            type="number"
            name="age"
            value={customerDetails.age}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">
            <span className="text-red-500">*</span>Gender:
          </label>
          <select
            name="sex"
            value={customerDetails.sex}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">
            <span className="text-red-500">*</span>Contact Number:
          </label>
          <input
            type="text"
            name="contactNo"
            value={customerDetails.contactNo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">
            Occupation <span className="text-gray-500">(Optional)</span>:
          </label>
          <input
            type="text"
            name="occupation"
            value={customerDetails.occupation}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </form>

      {/* Separator */}
      <div className="my-8 text-center">
        <hr className="border-gray-300" />
        <p className="text-lg font-semibold text-gray-700 my-4">Address Information</p>
        <hr className="border-gray-300" />
      </div>

      {/* Address Information Form */}
      <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
        {customerDetails.addresses.map((address, index) => (
          <div key={index} className="mb-6 bg-white p-6 shadow-md rounded-md space-y-4">
            <div>
              <label className="block mb-1">
                <span className="text-red-500">*</span>Address Line 1:
              </label>
              <input
                type="text"
                name="addressLine1"
                value={address.addressLine1}
                onChange={(e) => handleAddressChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block mb-1">
                Address Line 2 <span className="text-gray-500">(Optional)</span>:
              </label>
              <input
                type="text"
                name="addressLine2"
                value={address.addressLine2}
                onChange={(e) => handleAddressChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1">
                <span className="text-red-500">*</span>Country:
              </label>
              <input
                type="text"
                name="country"
                value={address.country}
                onChange={(e) => handleAddressChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block mb-1">
                <span className="text-red-500">*</span>City:
              </label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={(e) => handleAddressChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block mb-1">
                <span className="text-red-500">*</span>State:
              </label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={(e) => handleAddressChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block mb-1">
                Postal Code <span className="text-gray-500">(Optional)</span>:
              </label>
              <input
                type="text"
                name="postalCode"
                value={address.postalCode}
                onChange={(e) => handleAddressChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default CustomerOnboarding;


