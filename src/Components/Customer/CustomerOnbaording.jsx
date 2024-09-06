import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      const response = await fetch('http://localhost:8080/customers', {
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
    <div className="customer-onboarding-container p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Customer Onboarding</h1>
      
      <div className="flex justify-between space-x-10">
        {/* Basic Information Form */}
        <form onSubmit={handleSubmit} className="w-1/2 bg-white p-6 shadow-md rounded-md">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          
          <div className="mb-4">
            <label className="block mb-1">
              Name: <span className="text-red-500">*</span>
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
              Email: <span className="text-red-500">*</span>
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
              Age: <span className="text-red-500">*</span>
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
              Occupation:
            </label>
            <input
              type="text"
              name="occupation"
              value={customerDetails.occupation}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-1">
              Gender: <span className="text-red-500">*</span>
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
              Contact Number: <span className="text-red-500">*</span>
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
        </form>
  
        {/* Address Information Form */}
        <form className="w-1/2 bg-white p-6 shadow-md rounded-md">
          <h2 className="text-xl font-semibold mb-4">Address Information</h2>

          {customerDetails.addresses.map((address, index) => (
            <div key={index}>
              <div className="mb-4">
                <label className="block mb-1">
                  Address Line 1: <span className="text-red-500">*</span>
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

              <div className="mb-4">
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

              <div className="mb-4">
                <label className="block mb-1">
                  City: <span className="text-red-500">*</span>
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

              <div className="mb-4">
                <label className="block mb-1">
                  State: <span className="text-red-500">*</span>
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

              <div className="mb-4">
                <label className="block mb-1">
                  Postal Code: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={address.postalCode}
                  onChange={(e) => handleAddressChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">
                  Country: <span className="text-red-500">*</span>
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
            </div>
          ))}
        </form>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={handleSubmit}
          className="p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
};

export default CustomerOnboarding;
