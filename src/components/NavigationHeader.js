// src/components/NavigationHeader.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const NavigationHeader = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Hospital Display</h1>
          <nav className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                  Admin Panel
                </Link>
                <button
                  onClick={signOut}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;