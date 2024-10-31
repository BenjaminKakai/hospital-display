// src/components/CardComponent.js
import React from 'react';
import './CardComponent.css'; // Create this CSS file for styling

const CardComponent = ({ title, content, footer }) => {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-content">{content}</div>
      <div className="card-footer">{footer}</div>
    </div>
  );
};

export default CardComponent;
