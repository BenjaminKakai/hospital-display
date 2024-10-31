import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Settings } from 'lucide-react';

const NavigationHeader = () => {
  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 hover:text-gray-300 transition-colors"
        >
          <Monitor className="w-5 h-5" />
          <span className="font-semibold">Hospital Display</span>
        </Link>
        
        <Link 
          to="/admin" 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span>Admin Panel</span>
        </Link>
      </div>
    </div>
  );
};

export default NavigationHeader;