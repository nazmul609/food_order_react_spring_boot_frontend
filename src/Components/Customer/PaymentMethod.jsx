import React from 'react';

function PaymentMethod() {
  // Dummy payment methods data
  const paymentMethods = [
    { id: 1, type: "Credit Card", number: "**** **** **** 1234", expiry: "12/24" },
    { id: 2, type: "Debit Card", number: "**** **** **** 5678", expiry: "08/23" },
    { id: 3, type: "PayPal", email: "user@example.com" }
  ];

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Methods</h2>

      {/* List of payment methods */}
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="p-6 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-700">{method.type}</h3>
            {method.type === "PayPal" ? (
              <p className="text-gray-600">Email: {method.email}</p>
            ) : (
              <>
                <p className="text-gray-600">Card Number: {method.number}</p>
                <p className="text-gray-600">Expiry Date: {method.expiry}</p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Add Payment Method Button */}
      <div className="mt-8 flex justify-end">
        <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
          Add Payment Method
        </button>
      </div>
    </div>
  );
}

export default PaymentMethod;
