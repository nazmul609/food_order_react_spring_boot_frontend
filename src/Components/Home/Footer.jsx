import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">

          {/* Helpful Links */}
          <div className="w-full sm:w-1/3 mb-6">
            <h3 className="text-xl font-semibold mb-2">Helpful Links</h3>
            <ul>
              <li className="mb-1">
                <Link to="/about" className="hover:underline">About Us</Link>
              </li>
              <li className="mb-1">
                <Link to="/faq" className="hover:underline">FAQ</Link>
              </li>
              <li className="mb-1">
                <Link to="/support" className="hover:underline">Support</Link>
              </li>
              <li className="mb-1">
                <Link to="/terms" className="hover:underline">Terms & Conditions</Link>
              </li>
              <li className="mb-1">
                <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full sm:w-1/3 mb-6">
            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
            <p className="mb-1">Email: support@restoura.com</p>
            <p className="mb-1">Phone: (123) 456-7890</p>
            <p>Address: 123 Main St, Ontario, Canada</p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p>&copy; 2024 Restoura. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
