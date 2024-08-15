import React, { useState } from 'react';

const OffersAndPromo = () => {
  const [offers, setOffers] = useState([
    {
      id: 1,
      title: '10% Off on All Pizzas',
      description: 'Enjoy 10% discount on all pizzas. Use code PIZZA10.',
      discountType: 'Percentage',
      discountValue: 10,
      startDate: '2024-08-01',
      endDate: '2024-08-31',
      status: 'Active',
      redemptions: 150,
      revenueImpact: '$1500',
    },
    // Add more offers as needed
  ]);

  const [newOffer, setNewOffer] = useState({
    title: '',
    description: '',
    discountType: 'Percentage',
    discountValue: '',
    startDate: '',
    endDate: '',
    status: 'Active',
  });

  const handleCreateOffer = () => {
    const createdOffer = {
      id: offers.length + 1,
      ...newOffer,
      redemptions: 0,
      revenueImpact: '$0',
    };
    setOffers([...offers, createdOffer]);
    setNewOffer({
      title: '',
      description: '',
      discountType: 'Percentage',
      discountValue: '',
      startDate: '',
      endDate: '',
      status: 'Active',
    });
  };

  const handleStatusToggle = (id) => {
    setOffers(offers.map(offer => 
      offer.id === id ? { ...offer, status: offer.status === 'Active' ? 'Inactive' : 'Active' } : offer
    ));
  };

  const handleDeleteOffer = (id) => {
    setOffers(offers.filter(offer => offer.id !== id));
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Offers and Promotions</h2>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={newOffer.title}
          onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
          className="p-2 border rounded mb-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={newOffer.description}
          onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
          className="p-2 border rounded mb-2 w-full"
        />
        <select
          value={newOffer.discountType}
          onChange={(e) => setNewOffer({ ...newOffer, discountType: e.target.value })}
          className="p-2 border rounded mb-2 w-full"
        >
          <option value="Percentage">Percentage</option>
          <option value="Flat">Flat Amount</option>
        </select>
        <input
          type="text"
          placeholder="Discount Value"
          value={newOffer.discountValue}
          onChange={(e) => setNewOffer({ ...newOffer, discountValue: e.target.value })}
          className="p-2 border rounded mb-2 w-full"
        />
        <input
          type="date"
          placeholder="Start Date"
          value={newOffer.startDate}
          onChange={(e) => setNewOffer({ ...newOffer, startDate: e.target.value })}
          className="p-2 border rounded mb-2 w-full"
        />
        <input
          type="date"
          placeholder="End Date"
          value={newOffer.endDate}
          onChange={(e) => setNewOffer({ ...newOffer, endDate: e.target.value })}
          className="p-2 border rounded mb-2 w-full"
        />
        <button
          onClick={handleCreateOffer}
          className="py-2 px-4 bg-blue-600 text-white rounded"
        >
          Create Offer
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-4">Manage Offers</h3>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Discount</th>
            <th className="border border-gray-300 p-2">Validity</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Redemptions</th>
            <th className="border border-gray-300 p-2">Revenue Impact</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.id}>
              <td className="border border-gray-300 p-2">{offer.id}</td>
              <td className="border border-gray-300 p-2">{offer.title}</td>
              <td className="border border-gray-300 p-2">{offer.description}</td>
              <td className="border border-gray-300 p-2">
                {offer.discountType === 'Percentage' ? `${offer.discountValue}%` : `$${offer.discountValue}`}
              </td>
              <td className="border border-gray-300 p-2">{offer.startDate} to {offer.endDate}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleStatusToggle(offer.id)}
                  className={`py-1 px-2 rounded ${offer.status === 'Active' ? 'bg-green-500' : 'bg-red-500'} text-white`}
                >
                  {offer.status}
                </button>
              </td>
              <td className="border border-gray-300 p-2">{offer.redemptions}</td>
              <td className="border border-gray-300 p-2">{offer.revenueImpact}</td>
              <td className="border border-gray-300 p-2">
                <button onClick={() => handleDeleteOffer(offer.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OffersAndPromo;
