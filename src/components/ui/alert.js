// src/ui/Alert.js
import React from 'react';

const Alert = ({ message, type = 'info', onClose }) => {
  const alertStyles = {
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    success: 'bg-green-100 border-green-500 text-green-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    error: 'bg-red-100 border-red-500 text-red-700',
  };

  return (
    <div className={`border-l-4 p-4 mb-4 ${alertStyles[type]} rounded`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p>{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
