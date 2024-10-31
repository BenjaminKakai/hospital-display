import React from 'react';

// Main Card Component
const Card = ({ children }) => {
  return (
    <div className="border rounded shadow p-4 mb-4 bg-white">
      {children}
    </div>
  );
};

// CardHeader Component
export const CardHeader = ({ children }) => {
  return (
    <div className="mb-2">
      {children}
    </div>
  );
};

// CardTitle Component
export const CardTitle = ({ children }) => {
  return (
    <h2 className="text-xl font-bold">{children}</h2>
  );
};

// CardContent Component
export const CardContent = ({ children }) => {
  return (
    <div className="my-2">
      {children}
    </div>
  );
};

// Exporting all components
export { Card };
export default Card;
