import React, { useState } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { message: '🍕 Your order is on the way!', date: '1 July, 2024' },
    { message: '💳 Payment received for your order.', date: '10 July, 2024' },
    { message: '🎉 New promotions available at your favorite restaurants!', date: '15 July, 2024' },
    { message: '📦 Your order has been delivered! Enjoy your meal!', date: '17 July, 2024' },
    { message: '⚠️ Restaurant A is temporarily closed. Check back later for updates.', date: '18 July, 2024' },
    { message: '⏰ Reminder: You have a scheduled order for tomorrow at 6 PM.', date: '19 July, 2024' },
    { message: '❌ Order #12345 has been cancelled successfully.', date: '20 July, 2024' },
    { message: '💬 You have a new message from Customer Support.', date: '21 July, 2024' },
    { message: '🔥 Don’t miss out! Your favorite dish is on sale this week.', date: '22 July, 2024' },
  ]);

  const handleRemoveNotification = (index) => {
    const newNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(newNotifications);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} className="py-2 border-b flex justify-between items-center">
            <div className="flex-1">
              <span>{notification.message}</span>
              <span className="text-gray-500 text-sm"> - {notification.date}</span>
            </div>
            <button
              onClick={() => handleRemoveNotification(index)}
              className="text-red-500 hover:text-red-700"
            >
              ✖️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
